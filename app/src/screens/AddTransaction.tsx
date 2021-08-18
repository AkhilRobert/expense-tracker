import React from 'react';
import {
  Text,
  SafeAreaView,
  TextInput,
  View,
  Pressable,
  Platform,
  Keyboard,
} from 'react-native';
import tailwind from 'tailwind-rn';
import { AntDesign } from '@expo/vector-icons';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from './Index';
import { PRIMARY_COLOR } from '../utils/constants';
import {
  TransactionsDocument,
  TranscationType,
  useNewTransactionMutation,
} from '../__generated__/graphql';
import { SelectItem } from '../components/SelectItem';
import { FAB } from '../components/FAB';
import { Octicons } from '@expo/vector-icons';
import { useKeyboardHeight } from '../hooks/useKeyboardHeight';
import { useFormik } from 'formik';
import * as yup from 'yup';

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
        Keyboard.dismiss();
        console.log(typeof value.amount);

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
        <Octicons name="check" size={24} color="white" />
      </FAB>
    </>
  );
};
