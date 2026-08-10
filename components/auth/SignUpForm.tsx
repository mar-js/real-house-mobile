import { authStyles } from "@/styles/auth";
import { colors, spacing } from "@/theme";
import type { IFormSignUp } from "@/types/auth";
import { Link } from "expo-router";
import { Text, TextInput, View } from "react-native";
import type { JSX } from "react/jsx-runtime";
import { Button } from "./Button";
import { FieldError } from "./FieldError";

export const SignUpForm = ({
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
	handlerSignUpPress,
}: IFormSignUp): JSX.Element => (
	<View style={{ gap: spacing.md }}>
		<View
			style={{
				flexDirection: "row",
				justifyContent: "space-between",
				gap: spacing.md,
			}}
		>
			<TextInput
				style={[authStyles.input, { width: "47%" }]}
				placeholder="First name"
				placeholderTextColor={colors.placeholder}
				autoCapitalize="words"
				value={firstName}
				onChangeText={setFirstName}
			/>
			<TextInput
				style={[authStyles.input, { width: "47%" }]}
				placeholder="Last name"
				placeholderTextColor={colors.placeholder}
				autoCapitalize="words"
				value={lastName}
				onChangeText={setLastName}
			/>
		</View>
		<TextInput
			style={[authStyles.input, { width: "100%" }]}
			placeholder="Email address"
			placeholderTextColor={colors.placeholder}
			autoCapitalize="none"
			keyboardType="email-address"
			value={emailAddress}
			onChangeText={setEmailAddress}
		/>
		<FieldError message={errors?.fields?.emailAddress?.message} />
		<TextInput
			style={[authStyles.input, { width: "100%" }]}
			placeholder="Password"
			placeholderTextColor={colors.placeholder}
			value={password}
			onChangeText={setPassword}
			secureTextEntry
		/>
		<FieldError message={errors?.fields?.password?.message} />
		<Button
			text="Sign Up"
			handlerPress={handlerSignUpPress}
			isDisabled={isLoading}
		/>
		<View
			style={{
				flexDirection: "row",
				justifyContent: "center",
				gap: spacing.xs,
			}}
		>
			<Text style={authStyles.mutedText}>Already have an account?</Text>
			<Link href="/sign-in">
				<Text style={authStyles.linkText}>Sign In</Text>
			</Link>
		</View>
		<View nativeID="clerk-captcha" />
	</View>
);
