import { Feather } from '@expo/vector-icons';
import React from 'react';
import { Text, View } from 'react-native';
import tailwind from 'tailwind-rn';
import { formatCurrency } from '../utils/format';
import { TranscationType } from '../__generated__/graphql';

export interface TransactionProps {
  title?: string;
  amount?: number;
  type?: TranscationType;
}

export const Transaction = ({ title, amount, type }: TransactionProps) => {
  return (
    <View style={tailwind('m-4 flex flex-row items-center justify-between ')}>
      <View>
        {type === TranscationType.Income ? (
          <Feather name="arrow-up-right" size={24} color="red" />
        ) : (
          <Feather name="arrow-down-left" size={24} color="green" />
        )}
      </View>
      <Text style={tailwind('flex-1 mx-5 font-bold text-base')}>{title}</Text>
      <Text style={{ ...tailwind('font-bold text-base'), color: '#FA804B' }}>
        {formatCurrency(amount!)}
      </Text>
    </View>
  );
};
