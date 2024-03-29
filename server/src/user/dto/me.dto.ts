import { Field, ObjectType } from '@nestjs/graphql';
import { Result } from 'src/common/common-result.dto';
import { UserEntity } from '../user.entity';

@ObjectType()
export class MeResult extends Result {
  @Field({ nullable: true })
  data?: UserEntity;
}
