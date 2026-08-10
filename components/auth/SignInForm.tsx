import { authStyles } from "@/styles/auth";
import { colors, spacing } from "@/theme";
import type { IFormSignIn } from "@/types/auth";
import { Link } from "expo-router";
import { Text, TextInput, View } from "react-native";
import type { JSX } from "react/jsx-runtime";
import { Button } from "./Button";
import { FieldError } from "./FieldError";

export const SignInForm = ({
	emailAddress,
	setEmailAddress,
	password,
	setPassword,
	errors,
	isLoading,
	handlerSignInPress,
}: IFormSignIn): JSX.Element => (
	<View style={{ gap: spacing.md }}>
		<TextInput
			style={[authStyles.input, { width: "100%" }]}
			placeholder="Email address"
			placeholderTextColor={colors.placeholder}
			autoCapitalize="none"
			keyboardType="email-address"
			value={emailAddress}
			onChangeText={setEmailAddress}
		/>
		<FieldError message={errors?.fields?.identifier?.message} />
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
			text="Sign In"
			handlerPress={handlerSignInPress}
			isDisabled={isLoading}
		/>
		<View
			style={{
				flexDirection: "row",
				justifyContent: "center",
				gap: spacing.xs,
			}}
		>
			<Text style={authStyles.mutedText}>Don't have an account?</Text>
			<Link href="/sign-up">
				<Text style={authStyles.linkText}>Sign Up</Text>
			</Link>
		</View>
		<View nativeID="clerk-captcha" />
	</View>
);
