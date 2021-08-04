import React from 'react';
import { Keyboard, SafeAreaView, Text, View } from 'react-native';
import * as yup from 'yup';
import { useFormik } from 'formik';
import tailwind from 'tailwind-rn';
import { CustomInput } from '../components/Input';
import { PrimaryButton } from '../components/PrimaryButton';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../Routes';

interface Props {
  navigation: StackNavigationProp<RootStackParamList, 'Register'>;
}

export const Register = ({ navigation }: Props) => {
  const validationSchema = yup.object().shape({
    email: yup
      .string()
      .email('Not a valid email')
      .required('email is a required field'),
    password: yup.string().required('password is a required field').min(3),
    username: yup.string().required('username is a required field'),
  });

  const { values, handleChange, handleSubmit, errors, handleBlur, touched } =
    useFormik({
      initialValues: {
        email: '',
        password: '',
        username: '',
      },
      onSubmit: (value) => {
        Keyboard.dismiss();
        console.log(value);
      },
      validationSchema,
    });

  return (
    <SafeAreaView style={tailwind('flex-1 bg-white')}>
      <View style={tailwind('flex-col h-full justify-between')}>
        <View style={tailwind('mt-8 mx-4 bg-white')}>
          <Text style={tailwind('font-bold text-3xl')}>Create Account,</Text>
          <Text style={tailwind('font-bold text-gray-400 text-xl')}>
            Register to get started
          </Text>

          <View style={tailwind('mt-8')}>
            <CustomInput
              label="Username"
              value={values.email}
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
            <View style={tailwind('my-2')}>
              <Text style={tailwind('text-red-500 font-bold text-base')}>
                {touched.password && errors.password}
              </Text>
            </View>
            <View style={tailwind('mt-6')} />
            <PrimaryButton text="Register Now" onPress={handleSubmit} />
          </View>
        </View>
        <View style={tailwind('flex-row justify-center')}>
          <Text style={tailwind('text-lg')}>Already Have an accoung?</Text>
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
