import React from 'react';
import { Text, TextInput, View } from 'react-native';
import tailwind from 'tailwind-rn';

interface Props {
  label: string;
  value: string;
  onChange: (text: string) => void;
  onBlur: (e: any) => void;
  secureTextEntry?: boolean | undefined;
}

export const CustomInput = ({
  label,
  value,
  onChange,
  onBlur,
  secureTextEntry,
}: Props) => {
  return (
    <View>
      <Text style={tailwind('font-bold text-base')}>{label}</Text>
      <TextInput
        value={value}
        onChangeText={onChange}
        style={tailwind('p-4 border rounded-xl border-gray-400 mt-2')}
        autoCapitalize="none"
        onBlur={onBlur}
        secureTextEntry={secureTextEntry}
      />
    </View>
  );
};
