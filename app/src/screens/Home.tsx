import React, { useContext } from 'react';
import { ActivityIndicator, Text, View, FlatList } from 'react-native';
import tailwind from 'tailwind-rn';
import { Header } from '../components/Header';
import { TotalTransaction } from '../components/TotalTranscation';
import { Transaction } from '../components/Transaction';
import { TokenContext } from '../context/TokenContext';
import { PRIMARY_COLOR } from '../utils/constants';
import { formatCurrency } from '../utils/format';
import { useMeQuery, useTransactionsQuery } from '../__generated__/graphql';

export const Home = () => {
  const { client, data, error, loading } = useMeQuery();
  const {
    data: transactionData,
    error: transactionError,
    loading: transactionLoading,
  } = useTransactionsQuery();
  const { removeToken } = useContext(TokenContext);

  const handleLogout = async () => {
    try {
      const val = await client.clearStore();
      removeToken();
    } catch {}
  };

  if (
    error ||
    transactionError ||
    !data?.Me.ok ||
    !transactionData?.Transactions.ok
  ) {
    const message =
      error?.message ||
      data?.Me.error ||
      transactionError?.message ||
      transactionData?.Transactions.error;

    if (
      data?.Me.error?.includes('Not Authorized') ||
      data?.Me.error?.includes('Not a valid user')
    ) {
      client
        .clearStore()
        .then(() => {
          removeToken();
        })
        .catch();
    }

    return (
      <View style={tailwind('flex-1 items-center justify-center')}>
        <Text style={tailwind('font-bold text-xl text-red-500')}>
          {message}
        </Text>
      </View>
    );
  }

  if (
    (!data && loading) ||
    (!transactionData.Transactions.data && transactionLoading)
  ) {
    return (
      <View style={tailwind('flex-1 items-center justify-center')}>
        <Text style={tailwind('font-bold text-xl text-red-500')}>
          <ActivityIndicator />
        </Text>
      </View>
    );
  }

  const value = formatCurrency(data.Me.data?.balance!);

  return (
    <View style={{ ...tailwind('h-full'), backgroundColor: PRIMARY_COLOR }}>
      <View style={{ ...tailwind('mt-10'), backgroundColor: PRIMARY_COLOR }}>
        <Header
          username={data.Me.data?.username!}
          handleLogout={handleLogout}
        />
        <View style={tailwind('px-4 mt-4')}>
          <Text style={tailwind('text-white text-3xl font-bold mb-2')}>
            Your Balance
          </Text>
          <Text style={tailwind('text-white text-2xl mb-2')}>{value}</Text>
        </View>
      </View>
      <View style={tailwind('flex-row justify-between my-4')}>
        <TotalTransaction id="Income" value={data.Me.data?.income!} />
        <View style={tailwind('px-4')}>
          <TotalTransaction id="Expense" value={data.Me.data?.expense!} />
        </View>
      </View>
      <View style={tailwind('bg-white h-full rounded-t-3xl')}>
        <View style={tailwind('mx-4 my-8')}>
          {!transactionData.Transactions.data ||
          transactionData.Transactions.data.length === 0 ? (
            <View>
              <Text>Not transcations found</Text>
            </View>
          ) : (
            <FlatList
              style={tailwind('h-full')}
              data={transactionData.Transactions.data}
              renderItem={(v) => (
                <Transaction
                  amount={v.item.amount}
                  title={v.item.title}
                  type={v.item.type}
                />
              )}
            />
          )}
        </View>
      </View>
    </View>
  );
};
