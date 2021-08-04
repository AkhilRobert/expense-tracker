import { Field, InputType, ObjectType, OmitType } from '@nestjs/graphql';
import { UserEntity } from '../user.entity';
import { Result } from './result.dto';

@InputType()
export class RegisterInput extends OmitType(UserEntity, ['id'], InputType) {
  @Field()
  password: string;
}

@ObjectType()
export class RegisterResult extends Result {
  @Field({ nullable: true })
  token?: string | null;
}
