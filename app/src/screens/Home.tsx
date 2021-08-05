import React from 'react';
import { useContext } from 'react';
import { View, Text, Button, ActivityIndicator } from 'react-native';
import tailwind from 'tailwind-rn';
import { TokenContext } from '../context/TokenContext';
import { useMeQuery } from '../__generated__/graphql';

export const Home = () => {
  const { data, error, loading } = useMeQuery();
  const { removeToken } = useContext(TokenContext);

  if (error || !data?.me.ok) {
    const message = error?.message || data?.me.error || 'An error ocurred';

    if (data?.me.error?.includes('Not Authorized')) removeToken();

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
    <View style={tailwind('flex-1 items-center justify-center')}>
      <Text>Welcome {data?.me.data?.username}</Text>
      <Button title="logout" onPress={() => removeToken()} />
    </View>
  );
};
