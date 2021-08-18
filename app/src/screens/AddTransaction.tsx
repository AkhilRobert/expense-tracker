import { AntDesign, Octicons } from '@expo/vector-icons';
import { StackNavigationProp } from '@react-navigation/stack';
import { useFormik } from 'formik';
import React, { useState } from 'react';
import {
  ActivityIndicator,
  Keyboard,
  Platform,
  Pressable,
  SafeAreaView,
  Text,
  TextInput,
  View,
} from 'react-native';
import tailwind from 'tailwind-rn';
import * as yup from 'yup';
import { FAB } from '../components/FAB';
import { SelectItem } from '../components/SelectItem';
import { useKeyboardHeight } from '../hooks/useKeyboardHeight';
import { PRIMARY_COLOR } from '../utils/constants';
import {
  TransactionsDocument,
  TranscationType,
  useNewTransactionMutation,
} from '../__generated__/graphql';
import { RootStackParamList } from './Index';

interface Props {
  navigation: StackNavigationProp<RootStackParamList, 'AddTransaction'>;
}

const schema = yup.object().shape({
  amount: yup.number().positive().required().min(1),
  title: yup.string().required(),
  transactionType: yup
    .string()
    .oneOf([TranscationType.Income, TranscationType.Expense]),
});

export const AddTransaction = ({ navigation }: Props) => {
  const [addTrasaction] = useNewTransactionMutation();
  const [loading, setLoading] = useState<boolean>(false);

  const {
    handleSubmit,
    values,
    handleChange,
    setFieldValue,
    errors,
    touched,
    handleBlur,
  } = useFormik({
    initialValues: {
      amount: 0,
      title: '',
      transactionType: TranscationType.Expense,
    },
    validationSchema: schema,
    onSubmit: async (value) => {
      try {
        setLoading(true);
        Keyboard.dismiss();

        const { data } = await addTrasaction({
          variables: {
            input: {
              amount: parseInt(value.amount.toString()),
              title: value.title,
              type: value.transactionType,
            },
          },
          refetchQueries: [TransactionsDocument],
        });
        setLoading(false);

        if (data?.NewTranscation.ok) navigation.goBack();
      } catch (error) {
        console.log(error);
      }
    },
  });

  const keyboardHeight = useKeyboardHeight();

  return (
    <>
      <SafeAreaView style={tailwind('flex-1')}>
        <View
          style={{ paddingTop: Platform.OS === 'android' ? 45 : undefined }}
        >
          <Pressable onPress={() => navigation.goBack()}>
            <AntDesign
              name="close"
              size={36}
              color="black"
              style={tailwind('ml-3')}
            />
          </Pressable>
        </View>
        <View>
          <View>
            <View style={tailwind('flex-row justify-center')}>
              <View
                style={{
                  backgroundColor: PRIMARY_COLOR,
                  ...tailwind('p-4 rounded-3xl w-20 items-center mx-5 mt-12'),
                }}
              >
                <Text
                  style={{
                    ...tailwind('text-white text-xl font-bold'),
                  }}
                >
                  INR
                </Text>
              </View>
              <TextInput
                value={values.amount.toString()}
                onChangeText={handleChange('amount')}
                style={tailwind('text-2xl flex-1 mt-10 font-bold pr-3')}
                maxLength={16}
                keyboardType="numeric"
                autoFocus={true}
                onBlur={handleBlur('amount')}
              />
            </View>
            <Text
              style={tailwind('font-bold text-red-500 py-2 px-7 text-base')}
            >
              {touched.amount && errors.amount}
            </Text>
          </View>
          <View>
            <View style={tailwind('flex-row my-8 items-end')}>
              <Text style={tailwind('font-bold text-xl mx-5')}>Title</Text>
              <TextInput
                value={values.title}
                onChangeText={handleChange('title')}
                style={tailwind(
                  'flex-1 text-xl  mr-4 pb-2 border-b-2 border-gray-400'
                )}
                onBlur={handleBlur('title')}
              />
            </View>
            <Text style={tailwind('font-bold text-red-500 px-7 text-base')}>
              {touched.title && errors.title}
            </Text>
          </View>
          <View>
            <Pressable
              onPress={() =>
                setFieldValue('transactionType', TranscationType.Expense)
              }
            >
              <SelectItem
                label="Expense"
                selected={values.transactionType == TranscationType.Expense}
              />
            </Pressable>
            <Pressable
              onPress={() =>
                setFieldValue('transactionType', TranscationType.Income)
              }
            >
              <SelectItem
                label="Income"
                selected={values.transactionType == TranscationType.Income}
              />
            </Pressable>
          </View>
        </View>
      </SafeAreaView>
      <FAB
        onPress={handleSubmit}
        bottom={Platform.OS === 'ios' ? keyboardHeight + 40 : undefined}
      >
        {loading ? (
          <ActivityIndicator color="white" />
        ) : (
          <Octicons name="check" size={24} color="white" />
        )}
      </FAB>
    </>
  );
};
