import { StackNavigationProp } from "@react-navigation/stack";
import { useFormik } from "formik";
import React from "react";
import { Keyboard, SafeAreaView, Text, View } from "react-native";
import tailwind from "tailwind-rn";
import * as yup from "yup";
import { CustomInput } from "../components/Input";
import { PrimaryButton } from "../components/PrimaryButton";
import { RootStackParamList } from "../Routes";

interface Props {
  navigation: StackNavigationProp<RootStackParamList, "Login">;
}

export const Login = ({ navigation }: Props) => {
  const validationSchema = yup.object().shape({
    email: yup
      .string()
      .email("Not a valid email")
      .required("email is a required field"),
    password: yup.string().required("password is a required field").min(3),
  });

  const { values, handleChange, handleSubmit, errors, handleBlur, touched } =
    useFormik({
      initialValues: {
        email: "",
        password: "",
      },
      onSubmit: (value) => {
        Keyboard.dismiss();
        console.log(value);
      },
      validationSchema,
    });

  return (
    <SafeAreaView style={tailwind("flex-1 bg-white")}>
      <View style={tailwind("flex-col h-full justify-between")}>
        <View style={tailwind("mt-8 mx-4 bg-white")}>
          <Text style={tailwind("font-bold text-3xl")}>Welcome,</Text>
          <Text style={tailwind("font-bold text-gray-400 text-xl")}>
            Sign in to continue
          </Text>

          <View style={tailwind("mt-8")}>
            <CustomInput
              label="Email"
              value={values.email}
              onChange={handleChange("email")}
              onBlur={handleBlur("email")}
            />
            <View style={tailwind("my-2")}>
              <Text style={tailwind("text-red-500 font-bold text-base")}>
                {touched.email && errors.email}
              </Text>
            </View>
            <CustomInput
              label="Password"
              value={values.password}
              onChange={handleChange("password")}
              onBlur={handleBlur("password")}
              secureTextEntry
            />
            <View style={tailwind("my-2")}>
              <Text style={tailwind("text-red-500 font-bold text-base")}>
                {touched.password && errors.password}
              </Text>
            </View>
            <View style={tailwind("mt-6")} />
            <PrimaryButton text="Login" onPress={handleSubmit} />
          </View>
        </View>
        <View style={tailwind("flex-row justify-center")}>
          <Text style={tailwind("text-lg")}>Don't have an account?</Text>
          <Text
            style={{ ...tailwind("text-lg font-bold"), color: "#21CE99" }}
            onPress={() => navigation.replace("Register")}
          >
            {" "}
            Register Now.
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
};
