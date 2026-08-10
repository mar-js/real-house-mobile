import type { IVerifyAccount } from "@/types/auth";
import { Text, TextInput, TouchableOpacity, View } from "react-native";
import type { JSX } from "react/jsx-runtime";
import { authStyles } from "@/styles/auth";
import { Button } from "./Button";

export const VerifyAccount = ({
	code,
	setCode,
	isLoading,
	errors,
	handlerVerifyCodePress,
	handlerRetryVerifyCodePress,
}: IVerifyAccount): JSX.Element => (
	<View style={{ gap: 15 }}>
		<TextInput
			style={[authStyles.input, { width: "100%" }]}
			placeholder="Enter verification code"
			placeholderTextColor="#d6d6d6"
			autoCapitalize="none"
			value={code}
			onChangeText={setCode}
			keyboardType="number-pad"
		/>
		{errors.fields.code && (
			<Text style={authStyles.errorText}>{errors.fields.code.message}</Text>
		)}
		<Button
			text="Verify"
			handlerPress={handlerVerifyCodePress}
			isDisabled={isLoading}
		/>
		<TouchableOpacity onPress={handlerRetryVerifyCodePress}>
			<Text style={authStyles.retryText}>I need a new code</Text>
		</TouchableOpacity>
	</View>
);
