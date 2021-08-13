import { Field, ID, ObjectType, registerEnumType } from '@nestjs/graphql';
import { UserEntity } from 'src/user/user.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

export enum Type {
  EXPENSE,
  INCOME,
}

registerEnumType(Type, {
  name: 'TranscationType',
});

@Entity('transaction')
@ObjectType()
export class TransactionEntity {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => ID)
  id: string;

  @Column()
  @Field()
  amount: number;

  @Column()
  @Field()
  title: string;

  @Column({
    type: 'enum',
    enum: Type,
  })
  @Field(() => Type)
  type: Type;

  @ManyToOne(() => UserEntity, (user) => user.transactions)
  user: UserEntity;
}
