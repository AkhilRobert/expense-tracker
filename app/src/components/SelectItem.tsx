import { MaterialCommunityIcons } from '@expo/vector-icons';
import React from 'react';
import { Text, View } from 'react-native';
import tailwind from 'tailwind-rn';
import { PRIMARY_COLOR } from '../utils/constants';

interface SelectItemProps {
  label: string;
  selected: boolean;
}

export const SelectItem = ({ label, selected }: SelectItemProps) => {
  return (
    <View style={tailwind('flex-row justify-between py-3 px-7')}>
      <Text style={tailwind('font-bold text-base')}>{label}</Text>
      {selected ? (
        <MaterialCommunityIcons
          name="checkbox-marked-circle"
          size={24}
          color={PRIMARY_COLOR}
        />
      ) : (
        <MaterialCommunityIcons
          name="checkbox-blank-circle-outline"
          size={24}
          color="black"
        />
      )}
    </View>
  );
};
