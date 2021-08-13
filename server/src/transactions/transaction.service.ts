import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserService } from 'src/user/user.service';
import { Repository } from 'typeorm';
import { NewTranscationInput } from './dto/new-transaction.result';
import { TransactionEntity, Type } from './transaction.entity';

@Injectable()
export class TransactionService {
  constructor(
    @InjectRepository(TransactionEntity)
    private transactionRepository: Repository<TransactionEntity>,
    private userService: UserService,
  ) {}

  async getAll(userID: string): Promise<TransactionEntity[]> {
    return this.transactionRepository
      .createQueryBuilder('transaction')
      .where('user.id = :id', { id: userID })
      .leftJoinAndSelect('transaction.user', 'user')
      .getMany();
  }

  async addTranscation(userID: string, data: NewTranscationInput) {
    const user = await this.userService.getUserByID(userID);
    if (!user) throw new Error('Not a valid user');

    const transcation = this.transactionRepository.create({ ...data, user });

    if (data.type === Type.INCOME) {
      user.income += data.amount;
      user.balance += data.amount;
      await this.transactionRepository.save(transcation);
      await this.userService.save(user);
    }

    if (data.type === Type.EXPENSE) {
      user.expense += data.amount;
      user.balance -= data.amount;
      await this.transactionRepository.save(transcation);
      await this.userService.save(user);
    }
  }
}
