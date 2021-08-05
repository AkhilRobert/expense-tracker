import { createContext } from 'react';

interface TokenType {
  token: string;
  updateToken: (token: string) => void;
  removeToken: () => void;
}

export const TokenContext = createContext<TokenType>({
  token: '',
  updateToken: () => {},
  removeToken: () => {},
});
