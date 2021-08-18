import { Platform } from 'react-native';

export const PRIMARY_COLOR = '#21CE99';

export const BASE_URL =
  Platform.OS === 'android'
    ? 'http://10.0.2.2:3000/graphql'
    : 'http://127.0.0.1:3000/graphql';
