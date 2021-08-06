import { Field, ObjectType } from '@nestjs/graphql';
import { Result } from 'src/common/common-result.dto';

@ObjectType()
export class BudgetResult extends Result {
  @Field({ nullable: true })
  currentValue?: number;
}
