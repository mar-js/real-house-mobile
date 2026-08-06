import type { IVerifyAccountSignUp } from "@/global/interfaces";
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { JSX } from "react/jsx-runtime";
import { Button } from "./button";

export const VerifyAccount = ({
  code,
  setCode,
  isLoading,
  errors,
  handlerVerifyCodePress,
  handlerRetryVerifyCodePress,
}: IVerifyAccountSignUp): JSX.Element => (
  <View
    style={{
      gap: 15
    }}
  >
    <TextInput
      style={{
        ...styles.input,
        width: "100%",
      }}
      placeholder="Enter verification code"
      placeholderTextColor="#d6d6d6"
      autoCapitalize="none"
      value={code}
      onChangeText={setCode}
      keyboardType="number-pad"
    />
    {errors.fields.code && (
      <Text
        style={{
          color: "#F05656",
          marginBottom: 10
        }}
      >{errors.fields.code.message}</Text>
    )}
    <Button
      text="Verify"
      handlerPress={handlerVerifyCodePress}
      isDisabled={isLoading}
    />
    <TouchableOpacity
      onPress={handlerRetryVerifyCodePress}
    >
      <Text style={{ color: "#5F9CED" }}>I need a new code</Text>
    </TouchableOpacity>
  </View>
)

const styles = StyleSheet.create({
  input: {
    borderColor: "#bababa",
    borderWidth: 1,
    borderStyle: "solid",
    borderRadius: 10,
    padding: 10,
  }
})
