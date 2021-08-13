import React from 'react';
import { View, Text } from 'react-native';
import tailwind from 'tailwind-rn';
import { formatCurrency } from '../utils/format';

interface Props {
  id: string;
  value: number;
}

export const TotalTransaction = ({ id, value }: Props) => {
  const finalValue = formatCurrency(value);

  return (
    <View style={tailwind('px-4')}>
      <Text style={tailwind('text-white text-2xl font-bold mb-2')}>{id}</Text>
      <Text style={tailwind('text-white text-xl mb-2')}>{finalValue}</Text>
    </View>
  );
};
