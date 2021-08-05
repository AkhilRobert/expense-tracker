import { Field, ObjectType } from '@nestjs/graphql';
import { UserEntity } from '../user.entity';
import { Result } from './result.dto';

@ObjectType()
export class MeResult extends Result {
  @Field({ nullable: true })
  data?: UserEntity;
}
