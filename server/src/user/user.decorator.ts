import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { MyContext } from 'src/types/my-context';
import jwt from 'jsonwebtoken';

export const User = createParamDecorator(
  (_: unknown, context: ExecutionContext): string | undefined => {
    const ctx = GqlExecutionContext.create(context).getContext<MyContext>();
    const token = ctx.req.headers.authorization;
    if (!token) {
      return undefined;
    }
    const id = verifyToken(token.split(' ')[1]);
    if (id === undefined) {
      return undefined;
    }
    return id;
  },
);

const verifyToken = (token: string): string | undefined => {
  try {
    const id = jwt.verify(token, process.env.JWT_SECRET);
    return id['id'] as string;
  } catch (error) {
    return undefined;
  }
};
