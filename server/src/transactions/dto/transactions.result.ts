import { Field, ObjectType } from '@nestjs/graphql';
import { Result } from 'src/common/common-result.dto';
import { TransactionEntity } from '../transaction.entity';

@ObjectType()
export class TranscationsResult extends Result {
  @Field(() => [TransactionEntity], { nullable: true })
  data?: TransactionEntity[];
}
