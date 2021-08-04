import { Field, ObjectType } from '@nestjs/graphql';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@ObjectType()
@Entity('user')
export class UserEntity {
  @Field()
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
}