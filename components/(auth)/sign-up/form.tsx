import type { IFormSignUp } from "@/global/interfaces"
import { Link } from "expo-router"
import { StyleSheet, Text, TextInput, View } from "react-native"
import type { JSX } from "react/jsx-runtime"
import { Button } from "./button"

export const Form = ({
  firstName,
  setFirstName,
  lastName,
  setLastName,
  emailAddress,
  setEmailAddress,
  password,
  setPassword,
  errors,
  isLoading,
  handlerSignUpPress
}: IFormSignUp): JSX.Element => (
  <View
    style={{
      gap: 15
    }}
  >
    <View
      style={{
        flexDirection: "row",
        gap: 15
      }}
    >
      <TextInput
        style={{
          ...styles.input,
          flexGrow: 1,
        }}
        placeholder="First name"
        placeholderTextColor="#d6d6d6"
        autoCapitalize="words"
        value={firstName}
        onChangeText={setFirstName}
      />
      <TextInput
        style={{
          ...styles.input,
          flexGrow: 1,
        }}
        placeholder="Last name"
        placeholderTextColor="#d6d6d6"
        autoCapitalize="words"
        value={lastName}
        onChangeText={setLastName}
      />
    </View>
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
    {errors.fields.emailAddress && (
      <Text
        style={{
          color: "#F05656",
          marginBottom: 10
        }}
      >{errors.fields.emailAddress.message}</Text>
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
          marginBottom: 10
        }}
      >{errors.fields.password.message}</Text>
    )}
    <Button
      text="Sign Up"
      handlerPress={handlerSignUpPress}
      isDisabled={isLoading}
    />
    <View
      style={{
        flexDirection: "row",
        justifyContent: "center",
        gap: 5
      }}
    >
      <Text
        style={{
          color: "#9E9E9E"
        }}
      >Already have an account?</Text>
      <Link
        href="/sign-in"
      >
        <Text
          style={{
            color: "#5696F0"
          }}
        >Sign In</Text>
      </Link>
    </View>
    <View nativeID="clerk-captcha" />
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
