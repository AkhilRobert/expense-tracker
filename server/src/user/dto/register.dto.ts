import { Field, InputType, ObjectType, OmitType } from '@nestjs/graphql';
import { Result } from 'src/common/common-result.dto';
import { UserEntity } from '../user.entity';

@InputType()
export class RegisterInput extends OmitType(
  UserEntity,
  ['id', 'balance', 'income', 'expense'],
  InputType,
) {
  @Field()
  password: string;
}

@ObjectType()
export class RegisterResult extends Result {
  @Field({ nullable: true })
  token?: string | null;
}
