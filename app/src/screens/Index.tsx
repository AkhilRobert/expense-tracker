import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React, { useContext } from 'react';
import { TokenContext } from '../context/TokenContext';
import { AddTransaction } from './AddTransaction';
import { Home } from './Home';
import { Login } from './Login';
import { Register } from './Register';

export type RootStackParamList = {
  Login: undefined;
  Register: undefined;
  Home: undefined;
  AddTransaction: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

export const Routes = () => {
  const { token } = useContext(TokenContext);

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {!(token.length > 0) ? (
          <>
            <Stack.Screen
              name="Login"
              component={Login}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Register"
              component={Register}
              options={{ headerShown: false }}
            />
          </>
        ) : (
          <>
            <Stack.Screen
              name="Home"
              component={Home}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="AddTransaction"
              component={AddTransaction}
              options={{ headerShown: false }}
            />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};
