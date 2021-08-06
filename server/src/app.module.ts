import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './user/user.entity';
import { UserModule } from './user/user.module';
import { TransactionsModule } from './transactions/transaction.module';
import { CommonModule } from './common/common.module';
import Joi from 'joi';
import { TransactionEntity } from './transactions/transaction.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      validationSchema: Joi.object({
        JWT_SECRET: Joi.string(),
      }),
    }),
    GraphQLModule.forRoot({
      autoSchemaFile: true,
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'akhilrobert',
      password: 'postgres',
      database: 'expense_tracker',
      synchronize: true,
      logging: true,
      entities: [UserEntity, TransactionEntity],
    }),
    UserModule,
    TransactionsModule,
    CommonModule,
  ],
})
export class AppModule {}
