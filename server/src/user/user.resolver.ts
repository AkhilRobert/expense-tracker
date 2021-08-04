import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { LoginInput, LoginResult } from './dto/login.dto';
import { MeResult } from './dto/me.dto';
import { RegisterInput, RegisterResult } from './dto/register.dto';
import { UserModule } from './user.module';
import { UserService } from './user.service';

@Resolver(() => UserModule)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Query(() => MeResult)
  async me(@Args('token') token: string): Promise<MeResult> {
    try {
      const user = await this.userService.getUserByToken(token);
      return {
        ok: true,
        user,
      };
    } catch (error) {
      return {
        ok: false,
        error: error.message,
      };
    }
  }

  @Mutation(() => RegisterResult)
  async register(@Args('input') input: RegisterInput): Promise<RegisterResult> {
    try {
      const token = await this.userService.CreateUser(input);
      return {
        ok: true,
        error: null,
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
  async login(
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
}
