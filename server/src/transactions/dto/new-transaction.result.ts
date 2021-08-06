import { Field, InputType } from '@nestjs/graphql';
import { Type } from '../transaction.entity';

@InputType()
export class NewTranscationInput {
  @Field()
  amount: number;

  @Field(() => Type)
  type: Type;
}
