import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
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
    try {
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
    } catch (error) {
      return {
        ok: false,
        error: error.message,
      };
    }
  }

  @Mutation(() => RegisterResult)
  async Register(@Args('input') input: RegisterInput): Promise<RegisterResult> {
    try {
      const token = await this.userService.createUser(input);
      return {
        ok: true,
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
      const token = await this.userService.checkUser(email, password);
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
