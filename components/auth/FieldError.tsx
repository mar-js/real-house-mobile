import { Text } from "react-native";
import type { JSX } from "react/jsx-runtime";
import { authStyles } from "@/styles/auth";

interface FieldErrorProps {
	message?: string;
}

export const FieldError = ({ message }: FieldErrorProps): JSX.Element | null => {
	if (!message) return null;

	return <Text style={authStyles.errorText}>{message}</Text>;
};
