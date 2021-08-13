import React from 'react';
import { useContext } from 'react';
import { View, Text, Button, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import tailwind from 'tailwind-rn';
import { TokenContext } from '../context/TokenContext';
import { useMeQuery } from '../__generated__/graphql';

export const Home = () => {
  const { data, error, loading } = useMeQuery();
  const { removeToken } = useContext(TokenContext);

  if (error || !data?.Me.ok) {
    const message = error?.message || data?.Me.error || 'An error ocurred';

    if (data?.Me.error?.includes('Not Authorized')) removeToken();
    if (data?.Me.error?.includes('Not a valid user')) removeToken();

    return (
      <View style={tailwind('flex-1 items-center justify-center')}>
        <Text style={tailwind('font-bold text-xl text-red-500')}>
          {message}
        </Text>
      </View>
    );
  }

  if (typeof data !== 'undefined' && loading) {
    return (
      <View style={tailwind('flex-1 items-center justify-center')}>
        <Text style={tailwind('font-bold text-xl text-red-500')}>
          <ActivityIndicator />
        </Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={tailwind('bg-white')}>
      <View style={{ ...tailwind('flex-col justify-between') }}>
        <View style={tailwind('flex-col bg-white h-full')}></View>
      </View>
    </SafeAreaView>
  );
};
