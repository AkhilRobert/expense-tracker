import React from "react";
import { Pressable, Text, View } from "react-native";
import tailwind from "tailwind-rn";

interface Props {
  text: string;
  onPress: () => void;
}

export const PrimaryButton = ({ text, onPress }: Props) => {
  return (
    <Pressable
      onPress={onPress}
      style={{
        ...tailwind("flex items-center justify-center p-4 rounded-xl"),
        backgroundColor: "#21CE99",
      }}
    >
      <Text
        style={{
          ...tailwind("font-bold text-base tracking-wide text-white"),
        }}
      >
        {text}
      </Text>
    </Pressable>
  );
};
