import React from 'react';
import {
  Keyboard,
  Platform,
  SafeAreaView,
  StatusBar,
  Text,
  View,
} from 'react-native';
import * as yup from 'yup';
import { useFormik } from 'formik';
import tailwind from 'tailwind-rn';
import { CustomInput } from '../components/Input';
import { PrimaryButton } from '../components/PrimaryButton';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../Routes';
import { useRegisterMutation } from '../__generated__/graphql';

interface Props {
  navigation: StackNavigationProp<RootStackParamList, 'Register'>;
}

const validationSchema = yup.object().shape({
  email: yup
    .string()
    .email('Not a valid email')
    .required('email is a required field'),
  password: yup.string().required('password is a required field').min(3),
  username: yup.string().required('username is a required field'),
});

export const Register = ({ navigation }: Props) => {
  const [register, { loading, data }] = useRegisterMutation();

  const { values, handleChange, handleSubmit, errors, handleBlur, touched } =
    useFormik({
      initialValues: {
        email: '',
        password: '',
        username: '',
      },
      onSubmit: async (value) => {
        Keyboard.dismiss();
        await register({ variables: { input: value } });
        if (data) {
          alert(data.register.token);
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
          <Text style={tailwind('font-bold text-3xl')}>Create Account,</Text>
          <Text style={tailwind('font-bold text-gray-400 text-xl')}>
            Register to get started
          </Text>

          <View style={tailwind('mt-8')}>
            <CustomInput
              label="Username"
              value={values.username}
              onChange={handleChange('username')}
              onBlur={handleBlur('username')}
            />

            <View style={tailwind('my-2')}>
              <Text style={tailwind('text-red-500 font-bold text-base')}>
                {touched.username && errors.username}
              </Text>
            </View>

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

            {data && !data.register.ok && (
              <View
                style={tailwind(
                  'mt-5 flex-row justify-center bg-red-300 p-4 rounded-xl'
                )}
              >
                <Text style={tailwind('font-bold text-base')}>
                  {data.register.error}
                </Text>
              </View>
            )}

            <View style={tailwind('mt-6')} />
            <PrimaryButton
              text="Register Now"
              onPress={handleSubmit}
              loading={loading}
            />
          </View>
        </View>
        <View style={tailwind('flex-row justify-center')}>
          <Text style={tailwind('text-lg')}>Already Have an account?</Text>
          <Text
            style={{ ...tailwind('text-lg font-bold'), color: '#21CE99' }}
            onPress={() => navigation.replace('Login')}
          >
            {' '}
            Login Now.
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
};
