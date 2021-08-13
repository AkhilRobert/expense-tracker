import { FontAwesome } from '@expo/vector-icons';
import React from 'react';
import { Pressable, Text, View } from 'react-native';
import tailwind from 'tailwind-rn';

interface Props {
  username: string;
  handleLogout: () => void;
}

export const Header = ({ username, handleLogout }: Props) => {
  return (
    <View
      style={tailwind(
        'flex justify-between px-8 py-4 justify-between flex-row'
      )}
    >
      <Pressable onPress={handleLogout}>
        <FontAwesome name="sign-out" size={32} color={'black'} />
      </Pressable>
      <Text style={tailwind('font-bold text-2xl')}>{username}</Text>
    </View>
  );
};
