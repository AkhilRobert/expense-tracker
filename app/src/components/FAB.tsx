import React, { FC } from 'react';
import { TouchableOpacity } from 'react-native';
import { PRIMARY_COLOR } from '../utils/constants';

interface Props {
  onPress: () => void;
  bottom?: number;
}

export const FAB: FC<Props> = ({ onPress, children, bottom = 40 }) => {
  return (
    <TouchableOpacity
      style={{
        alignItems: 'center',
        justifyContent: 'center',
        width: 70,
        position: 'absolute',
        bottom,
        right: 20,
        height: 70,
        backgroundColor: PRIMARY_COLOR,
        borderRadius: 100,
        zIndex: 10,
      }}
      onPress={onPress}
    >
      {children}
    </TouchableOpacity>
  );
};
