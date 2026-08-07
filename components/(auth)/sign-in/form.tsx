import type { IFormSignIn } from "@/global/interfaces";
import { Link } from "expo-router";
import { StyleSheet, Text, TextInput, View } from "react-native";
import type { JSX } from "react/jsx-runtime";
import { Button } from "./button";

export const Form = ({
  emailAddress,
  setEmailAddress,
  password,
  setPassword,
  errors,
  isLoading,
  handlerSignInPress,
}: IFormSignIn): JSX.Element => (
  <View
    style={{
      gap: 15,
    }}
  >
    <TextInput
      style={{
        ...styles.input,
        width: "100%",
      }}
      placeholder="Email address"
      placeholderTextColor="#d6d6d6"
      autoCapitalize="none"
      keyboardType="email-address"
      value={emailAddress}
      onChangeText={setEmailAddress}
    />
    {errors.fields.identifier && (
      <Text
        style={{
          color: "#F05656",
          marginBottom: 10,
        }}
      >
        {errors.fields.identifier.message}
      </Text>
    )}
    <TextInput
      style={{
        ...styles.input,
        width: "100%",
      }}
      placeholder="Password"
      placeholderTextColor="#d6d6d6"
      value={password}
      onChangeText={setPassword}
      secureTextEntry
    />
    {errors.fields.password && (
      <Text
        style={{
          color: "#F05656",
          marginBottom: 10,
        }}
      >
        {errors.fields.password.message}
      </Text>
    )}
    <Button
      text="Sign In"
      handlerPress={handlerSignInPress}
      isDisabled={isLoading}
    />
    <View
      style={{
        flexDirection: "row",
        justifyContent: "center",
        gap: 5,
      }}
    >
      <Text
        style={{
          color: "#9E9E9E",
        }}
      >
        Don't have an account?
      </Text>
      <Link href="/sign-up">
        <Text
          style={{
            color: "#5696F0",
          }}
        >
          Sign Up
        </Text>
      </Link>
    </View>
    <View nativeID="clerk-captcha" />
  </View>
);

const styles = StyleSheet.create({
  input: {
    borderColor: "#bababa",
    borderWidth: 1,
    borderStyle: "solid",
    borderRadius: 10,
    padding: 10,
  },
});
