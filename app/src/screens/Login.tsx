import { StackNavigationProp } from '@react-navigation/stack';
import { useFormik } from 'formik';
import React, { useContext } from 'react';
import {
  Keyboard,
  Platform,
  SafeAreaView,
  StatusBar,
  Text,
  View,
} from 'react-native';
import tailwind from 'tailwind-rn';
import * as yup from 'yup';
import { CustomInput } from '../components/Input';
import { PrimaryButton } from '../components/PrimaryButton';
import { TokenContext } from '../context/TokenContext';
import { useLoginMutation } from '../__generated__/graphql';
import { RootStackParamList } from './Index';

interface Props {
  navigation: StackNavigationProp<RootStackParamList, 'Login'>;
}

const validationSchema = yup.object().shape({
  email: yup
    .string()
    .email('Not a valid email')
    .required('email is a required field'),
  password: yup.string().required('password is a required field').min(3),
});

export const Login = ({ navigation }: Props) => {
  const [login, { loading, data }] = useLoginMutation({
    fetchPolicy: 'no-cache',
  });

  const { updateToken } = useContext(TokenContext);

  const { values, handleChange, handleSubmit, errors, handleBlur, touched } =
    useFormik({
      initialValues: {
        email: '',
        password: '',
      },
      onSubmit: async (value) => {
        Keyboard.dismiss();
        const { data } = await login({ variables: { input: value } });
        const token = data?.Login.token;
        if (token) {
          updateToken(token);
        }
      },
      validationSchema,
    });

  const statusHeight = StatusBar.currentHeight;

  return (
    <SafeAreaView style={tailwind('flex-1 bg-white')}>
      <View style={tailwind('flex-col h-full justify-between')}>
        <View
          style={{
            ...tailwind('mx-4 bg-white'),
            marginTop:
              Platform.OS === 'android' && statusHeight
                ? statusHeight + 10
                : 10,
          }}
        >
          <Text style={tailwind('font-bold text-3xl')}>Welcome,</Text>
          <Text style={tailwind('font-bold text-gray-400 text-xl')}>
            Sign in to continue
          </Text>

          <View style={tailwind('mt-8')}>
            <CustomInput
              label="Email"
              value={values.email}
              onChange={handleChange('email')}
              onBlur={handleBlur('email')}
            />
            <View style={tailwind('my-2')}>
              <Text style={tailwind('text-red-500 font-bold text-base')}>
                {touched.email && errors.email}
              </Text>
            </View>

            <CustomInput
              label="Password"
              value={values.password}
              onChange={handleChange('password')}
              onBlur={handleBlur('password')}
              secureTextEntry
            />
            {touched.password && errors.password && (
              <View style={tailwind('my-2')}>
                <Text style={tailwind('text-red-500 font-bold text-base')}>
                  {touched.password && errors.password}
                </Text>
              </View>
            )}

            {data && !data.Login.ok && (
              <View
                style={tailwind(
                  'mt-5 flex-row justify-center bg-red-300 p-4 rounded-xl'
                )}
              >
                <Text style={tailwind('font-bold text-base')}>
                  {data.Login.error}
                </Text>
              </View>
            )}

            <View style={tailwind('mt-6')} />

            <PrimaryButton
              text="Login"
              onPress={handleSubmit}
              loading={loading}
            />
          </View>
        </View>

        <View style={tailwind('flex-row justify-center')}>
          <Text style={tailwind('text-lg')}>Don't have an account?</Text>
          <Text
            style={{ ...tailwind('text-lg font-bold'), color: '#21CE99' }}
            onPress={() => navigation.replace('Register')}
          >
            {' '}
            Register Now.
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
};
