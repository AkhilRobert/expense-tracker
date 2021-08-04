import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Result {
  @Field()
  ok: boolean;

  @Field({ nullable: true })
  error?: string | null;
}
