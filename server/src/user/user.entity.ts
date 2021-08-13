import { Field, ID, ObjectType } from '@nestjs/graphql';
import { TransactionEntity } from 'src/transactions/transaction.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@ObjectType()
@Entity('user')
export class UserEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field()
  @Column('varchar', { unique: true })
  email: string;

  @Field()
  @Column('varchar')
  username: string;

  @Column('varchar')
  password: string;

  @Column({ default: 0 })
  @Field()
  income: number;

  @Column({ default: 0 })
  @Field()
  expense: number;

  @Column({ default: 0 })
  @Field()
  balance: number;

  @OneToMany(() => TransactionEntity, (transcation) => transcation.user, {
    cascade: ['remove'],
  })
  transactions: TransactionEntity[];
}
