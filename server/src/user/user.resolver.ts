import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { BudgetResult } from './dto/budget.dto';
import { LoginInput, LoginResult } from './dto/login.dto';
import { MeResult } from './dto/me.dto';
import { RegisterInput, RegisterResult } from './dto/register.dto';
import { User } from './user.decorator';
import { UserModule } from './user.module';
import { UserService } from './user.service';

@Resolver(() => UserModule)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Query(() => MeResult)
  async Me(@User() id: string | undefined): Promise<MeResult> {
    if (!id) {
      return {
        ok: false,
        error: 'Not Authorized',
      };
    }

    const user = await this.userService.getUserByID(id);
    return {
      ok: true,
      data: user,
    };
  }

  @Mutation(() => RegisterResult)
  async Register(@Args('input') input: RegisterInput): Promise<RegisterResult> {
    try {
      const token = await this.userService.CreateUser(input);
      return {
        ok: true,
        error: 'Not Authenticated',
        token: token,
      };
    } catch (error) {
      if (error.message.includes('duplicate key')) {
        return {
          ok: false,
          error: 'user with email already exists',
        };
      }
      return {
        ok: false,
        error: error.message,
      };
    }
  }

  @Mutation(() => LoginResult)
  async Login(
    @Args('input') { email, password }: LoginInput,
  ): Promise<LoginResult> {
    try {
      const token = await this.userService.CheckUser(email, password);
      return {
        ok: true,
        token,
      };
    } catch (error) {
      return {
        ok: false,
        error: error.message,
      };
    }
  }

  @Mutation(() => BudgetResult)
  async ChangeBudget(
    @Args('value') value: number,
    @User() userID: string,
  ): Promise<BudgetResult> {
    try {
      if (!userID)
        return {
          ok: false,
          error: 'Not Authenticated',
        };
      const currentValue = await this.userService.changeBudget(value, userID);
      return {
        ok: true,
        currentValue,
      };
    } catch (error) {
      return {
        ok: false,
        error: error.message,
      };
    }
  }
}
