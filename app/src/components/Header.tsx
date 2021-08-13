import React, { useContext } from 'react';
import { View, Text, Pressable } from 'react-native';
import tailwind from 'tailwind-rn';
import { FontAwesome } from '@expo/vector-icons';
import { TokenContext } from '../context/TokenContext';

interface Props {
  username: string;
}

export const Header = ({ username }: Props) => {
  const { removeToken } = useContext(TokenContext);

  const handleLogout = () => removeToken();

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
