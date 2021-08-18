import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions =  {}
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** A date-time string at UTC, such as 2019-12-03T09:54:33Z, compliant with the date-time format. */
  DateTime: any;
};


export type LoginInput = {
  email: Scalars['String'];
  password: Scalars['String'];
};

export type LoginResult = {
  __typename?: 'LoginResult';
  ok: Scalars['Boolean'];
  error?: Maybe<Scalars['String']>;
  token?: Maybe<Scalars['String']>;
};

export type MeResult = {
  __typename?: 'MeResult';
  ok: Scalars['Boolean'];
  error?: Maybe<Scalars['String']>;
  data?: Maybe<UserEntity>;
};

export type Mutation = {
  __typename?: 'Mutation';
  Register: RegisterResult;
  Login: LoginResult;
  NewTranscation: Result;
};


export type MutationRegisterArgs = {
  input: RegisterInput;
};


export type MutationLoginArgs = {
  input: LoginInput;
};


export type MutationNewTranscationArgs = {
  input: NewTranscationInput;
};

export type NewTranscationInput = {
  title: Scalars['String'];
  amount: Scalars['Float'];
  type: TranscationType;
};

export type Query = {
  __typename?: 'Query';
  Me: MeResult;
  Transactions: TranscationsResult;
};

export type RegisterInput = {
  email: Scalars['String'];
  username: Scalars['String'];
  password: Scalars['String'];
};

export type RegisterResult = {
  __typename?: 'RegisterResult';
  ok: Scalars['Boolean'];
  error?: Maybe<Scalars['String']>;
  token?: Maybe<Scalars['String']>;
};

export type Result = {
  __typename?: 'Result';
  ok: Scalars['Boolean'];
  error?: Maybe<Scalars['String']>;
};

export type TransactionEntity = {
  __typename?: 'TransactionEntity';
  id: Scalars['ID'];
  amount: Scalars['Float'];
  title: Scalars['String'];
  type: TranscationType;
  createdAt: Scalars['DateTime'];
};

export enum TranscationType {
  Expense = 'EXPENSE',
  Income = 'INCOME'
}

export type TranscationsResult = {
  __typename?: 'TranscationsResult';
  ok: Scalars['Boolean'];
  error?: Maybe<Scalars['String']>;
  data?: Maybe<Array<TransactionEntity>>;
};

export type UserEntity = {
  __typename?: 'UserEntity';
  id: Scalars['ID'];
  email: Scalars['String'];
  username: Scalars['String'];
  income: Scalars['Float'];
  expense: Scalars['Float'];
  balance: Scalars['Float'];
};

export type NewTransactionMutationVariables = Exact<{
  input: NewTranscationInput;
}>;


export type NewTransactionMutation = { __typename?: 'Mutation', NewTranscation: { __typename?: 'Result', ok: boolean, error?: Maybe<string> } };

export type LoginMutationVariables = Exact<{
  input: LoginInput;
}>;


export type LoginMutation = { __typename?: 'Mutation', Login: { __typename?: 'LoginResult', ok: boolean, error?: Maybe<string>, token?: Maybe<string> } };

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = { __typename?: 'Query', Me: { __typename?: 'MeResult', ok: boolean, error?: Maybe<string>, data?: Maybe<{ __typename?: 'UserEntity', id: string, email: string, username: string, balance: number, income: number, expense: number }> } };

export type RegisterMutationVariables = Exact<{
  input: RegisterInput;
}>;


export type RegisterMutation = { __typename?: 'Mutation', Register: { __typename?: 'RegisterResult', ok: boolean, error?: Maybe<string>, token?: Maybe<string> } };

export type TransactionsQueryVariables = Exact<{ [key: string]: never; }>;


export type TransactionsQuery = { __typename?: 'Query', Transactions: { __typename?: 'TranscationsResult', ok: boolean, error?: Maybe<string>, data?: Maybe<Array<{ __typename?: 'TransactionEntity', amount: number, type: TranscationType, id: string, title: string, createdAt: any }>> } };


export const NewTransactionDocument = gql`
    mutation NewTransaction($input: NewTranscationInput!) {
  NewTranscation(input: $input) {
    ok
    error
  }
}
    `;
export type NewTransactionMutationFn = Apollo.MutationFunction<NewTransactionMutation, NewTransactionMutationVariables>;

/**
 * __useNewTransactionMutation__
 *
 * To run a mutation, you first call `useNewTransactionMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useNewTransactionMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [newTransactionMutation, { data, loading, error }] = useNewTransactionMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useNewTransactionMutation(baseOptions?: Apollo.MutationHookOptions<NewTransactionMutation, NewTransactionMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<NewTransactionMutation, NewTransactionMutationVariables>(NewTransactionDocument, options);
      }
export type NewTransactionMutationHookResult = ReturnType<typeof useNewTransactionMutation>;
export type NewTransactionMutationResult = Apollo.MutationResult<NewTransactionMutation>;
export type NewTransactionMutationOptions = Apollo.BaseMutationOptions<NewTransactionMutation, NewTransactionMutationVariables>;
export const LoginDocument = gql`
    mutation Login($input: LoginInput!) {
  Login(input: $input) {
    ok
    error
    token
  }
}
    `;
export type LoginMutationFn = Apollo.MutationFunction<LoginMutation, LoginMutationVariables>;

/**
 * __useLoginMutation__
 *
 * To run a mutation, you first call `useLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginMutation, { data, loading, error }] = useLoginMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useLoginMutation(baseOptions?: Apollo.MutationHookOptions<LoginMutation, LoginMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument, options);
      }
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationResult = Apollo.MutationResult<LoginMutation>;
export type LoginMutationOptions = Apollo.BaseMutationOptions<LoginMutation, LoginMutationVariables>;
export const MeDocument = gql`
    query Me {
  Me {
    ok
    error
    data {
      id
      email
      username
      balance
      income
      expense
    }
  }
}
    `;

/**
 * __useMeQuery__
 *
 * To run a query within a React component, call `useMeQuery` and pass it any options that fit your needs.
 * When your component renders, `useMeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMeQuery({
 *   variables: {
 *   },
 * });
 */
export function useMeQuery(baseOptions?: Apollo.QueryHookOptions<MeQuery, MeQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<MeQuery, MeQueryVariables>(MeDocument, options);
      }
export function useMeLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MeQuery, MeQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<MeQuery, MeQueryVariables>(MeDocument, options);
        }
export type MeQueryHookResult = ReturnType<typeof useMeQuery>;
export type MeLazyQueryHookResult = ReturnType<typeof useMeLazyQuery>;
export type MeQueryResult = Apollo.QueryResult<MeQuery, MeQueryVariables>;
export const RegisterDocument = gql`
    mutation Register($input: RegisterInput!) {
  Register(input: $input) {
    ok
    error
    token
  }
}
    `;
export type RegisterMutationFn = Apollo.MutationFunction<RegisterMutation, RegisterMutationVariables>;

/**
 * __useRegisterMutation__
 *
 * To run a mutation, you first call `useRegisterMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRegisterMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [registerMutation, { data, loading, error }] = useRegisterMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useRegisterMutation(baseOptions?: Apollo.MutationHookOptions<RegisterMutation, RegisterMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RegisterMutation, RegisterMutationVariables>(RegisterDocument, options);
      }
export type RegisterMutationHookResult = ReturnType<typeof useRegisterMutation>;
export type RegisterMutationResult = Apollo.MutationResult<RegisterMutation>;
export type RegisterMutationOptions = Apollo.BaseMutationOptions<RegisterMutation, RegisterMutationVariables>;
export const TransactionsDocument = gql`
    query Transactions {
  Transactions {
    ok
    error
    data {
      amount
      type
      id
      title
      createdAt
    }
  }
}
    `;

/**
 * __useTransactionsQuery__
 *
 * To run a query within a React component, call `useTransactionsQuery` and pass it any options that fit your needs.
 * When your component renders, `useTransactionsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useTransactionsQuery({
 *   variables: {
 *   },
 * });
 */
export function useTransactionsQuery(baseOptions?: Apollo.QueryHookOptions<TransactionsQuery, TransactionsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<TransactionsQuery, TransactionsQueryVariables>(TransactionsDocument, options);
      }
export function useTransactionsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<TransactionsQuery, TransactionsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<TransactionsQuery, TransactionsQueryVariables>(TransactionsDocument, options);
        }
export type TransactionsQueryHookResult = ReturnType<typeof useTransactionsQuery>;
export type TransactionsLazyQueryHookResult = ReturnType<typeof useTransactionsLazyQuery>;
export type TransactionsQueryResult = Apollo.QueryResult<TransactionsQuery, TransactionsQueryVariables>;