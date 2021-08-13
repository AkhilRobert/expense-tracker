import {
  ApolloClient,
  ApolloProvider,
  createHttpLink,
  InMemoryCache,
  from,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { TokenContext } from './src/context/TokenContext';
import { Routes } from './src/screens/Index';
import AppLoading from 'expo-app-loading';

const httpLink = createHttpLink({
  uri: 'http://localhost:3000/graphql',
});

const newAuthLink = setContext(async (_, { headers }) => {
  const token = await AsyncStorage.getItem('token');
  return {
    ...headers,
    headers: {
      authorization: `Bearer ${token}`,
    },
  };
});

const client = new ApolloClient({
  link: from([newAuthLink, httpLink]),
  cache: new InMemoryCache(),
});

export default function App() {
  const [token, setToken] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getToken().then((token) => {
      if (token) {
        setToken(token);
      }
      setLoading(false);
    });
  }, []);

  const updateToken = async (token: string) => {
    try {
      setToken(token);
      await AsyncStorage.setItem('token', token);
    } catch (error) {
      console.log(error);
    }
  };

  const removeToken = async () => {
    try {
      await AsyncStorage.removeItem('token');
      setToken('');
    } catch (error) {
      console.log(error);
    }
  };

  const getToken = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      return token;
    } catch (error) {
      console.log(error);
    }
  };

  if (loading) {
    return <AppLoading />;
  }

  return (
    <ApolloProvider client={client}>
      <TokenContext.Provider value={{ token, updateToken, removeToken }}>
        <Routes />
      </TokenContext.Provider>
    </ApolloProvider>
  );
}
