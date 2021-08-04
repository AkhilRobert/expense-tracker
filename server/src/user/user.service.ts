import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RegisterInput } from './dto/register.dto';
import { UserEntity } from './user.entity';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

@Injectable()
export class UserService {
  private JWT_SECRET: string;
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {
    this.JWT_SECRET = process.env.JWT_SECRET;
  }

  private generateToken(id: string): string {
    return jwt.sign({ id }, this.JWT_SECRET);
  }

  async getUserByToken(token: string): Promise<UserEntity> {
    const user = jwt.verify(token, this.JWT_SECRET);
    return this.userRepository.findOne({ id: (user as any).id });
  }

  async CreateUser(data: RegisterInput): Promise<string> {
    const exists = await this.userRepository.findOne({
      email: data.email,
    });
    if (exists) {
      throw new Error('User already exists');
    }

    const hashedPassword = await bcrypt.hash(data.password, 12);
    let user = this.userRepository.create({
      ...data,
      password: hashedPassword,
    });
    user = await this.userRepository.save(user);
    return this.generateToken(user.id);
  }

  async CheckUser(email: string, password: string): Promise<string> {
    const user = await this.userRepository.findOne({ email: email });
    if (!user) {
      throw new Error('Invalid username or password');
    }

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) {
      throw new Error('Invalid username or password');
    }

    return this.generateToken(user.id);
  }
}
