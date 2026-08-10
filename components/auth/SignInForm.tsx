import type { IFormSignIn } from "@/types/auth";
import { Link } from "expo-router";
import { Text, TextInput, View } from "react-native";
import type { JSX } from "react/jsx-runtime";
import { authStyles } from "@/styles/auth";
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
	<View style={{ gap: 15 }}>
		<TextInput
			style={[authStyles.input, { width: "100%" }]}
			placeholder="Email address"
			placeholderTextColor="#d6d6d6"
			autoCapitalize="none"
			keyboardType="email-address"
			value={emailAddress}
			onChangeText={setEmailAddress}
		/>
		<FieldError message={errors.fields.identifier?.message} />
		<TextInput
			style={[authStyles.input, { width: "100%" }]}
			placeholder="Password"
			placeholderTextColor="#d6d6d6"
			value={password}
			onChangeText={setPassword}
			secureTextEntry
		/>
		<FieldError message={errors.fields.password?.message} />
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
			<Text style={authStyles.mutedText}>Don't have an account?</Text>
			<Link href="/sign-up">
				<Text style={authStyles.linkText}>Sign Up</Text>
			</Link>
		</View>
		<View nativeID="clerk-captcha" />
	</View>
);
