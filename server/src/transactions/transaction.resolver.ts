import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Result } from 'src/common/common-result.dto';
import { User } from 'src/user/user.decorator';
import { NewTranscationInput } from './dto/new-transaction.result';
import { TranscationsResult } from './dto/transactions.result';
import { TransactionService } from './transaction.service';

@Resolver()
export class TransactionResolver {
  constructor(private transcationService: TransactionService) {}

  @Query(() => TranscationsResult)
  async Transactions(@User() user: string): Promise<TranscationsResult> {
    try {
      if (!user) {
        return {
          ok: false,
          error: 'Not authenticated',
        };
      }
      const transactions = await this.transcationService.getAll(user);
      return {
        ok: true,
        data: transactions,
      };
    } catch (error) {
      return {
        ok: false,
        error: error.message,
      };
    }
  }

  @Mutation(() => Result)
  async NewTranscation(
    @User() userID: string,
    @Args('input') input: NewTranscationInput,
  ): Promise<Result> {
    try {
      if (!userID) {
        return {
          ok: false,
          error: 'Not Authenticated',
        };
      }

      await this.transcationService.addTranscation(userID, input);

      return {
        ok: true,
      };
    } catch (error) {
      return {
        ok: false,
        error: error.message,
      };
    }
  }
}
