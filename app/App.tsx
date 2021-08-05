import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import React from 'react';
import { useState } from 'react';
import { TokenContext } from './src/context/TokenContext';
import { Routes } from './src/screens/Index';

const client = new ApolloClient({
  uri: 'http://localhost:3000/graphql',
  cache: new InMemoryCache(),
});

export default function App() {
  const [token, setToken] = useState('');

  const updateToken = (token: string) => setToken(token);
  const removeToken = () => setToken('');

  return (
    <ApolloProvider client={client}>
      <TokenContext.Provider value={{ token, updateToken, removeToken }}>
        <Routes />
      </TokenContext.Provider>
    </ApolloProvider>
  );
}
