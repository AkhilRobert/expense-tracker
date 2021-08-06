import { Field, InputType, ObjectType, PickType } from '@nestjs/graphql';
import { Result } from 'src/common/common-result.dto';
import { UserEntity } from '../user.entity';

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
