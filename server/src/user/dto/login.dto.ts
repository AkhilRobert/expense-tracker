import { Field, InputType, ObjectType, PickType } from '@nestjs/graphql';
import { UserEntity } from '../user.entity';
import { Result } from './result.dto';

@InputType()
export class LoginInput extends PickType(
  UserEntity,
  ['email', 'password'],
  InputType,
) {
  @Field()
  password: string;
}

@ObjectType()
export class LoginResult extends Result {
  @Field({ nullable: true })
  token?: string | null;
}
