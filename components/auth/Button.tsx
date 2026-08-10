import type { IButtonAction } from "@/types/auth";
import { ActivityIndicator, Text, TouchableOpacity } from "react-native";
import type { JSX } from "react/jsx-runtime";
import { authStyles } from "@/styles/auth";

export const Button = ({
	text,
	handlerPress,
	isDisabled,
}: IButtonAction): JSX.Element => (
	<TouchableOpacity
		onPress={handlerPress}
		disabled={isDisabled}
		style={authStyles.button}
	>
		{isDisabled ? (
			<ActivityIndicator color="white" />
		) : (
			<Text style={authStyles.buttonText}>{text}</Text>
		)}
	</TouchableOpacity>
);
