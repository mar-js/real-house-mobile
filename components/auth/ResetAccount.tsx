import type { IResetAccount } from "@/types/auth";
import { Text, TouchableOpacity } from "react-native";
import type { JSX } from "react/jsx-runtime";
import { authStyles } from "@/styles/auth";

export const ResetAccount = ({
	handlerCancelSignUpPress,
}: IResetAccount): JSX.Element => (
	<TouchableOpacity onPress={handlerCancelSignUpPress}>
		<Text style={authStyles.resetText}>Try again with another email</Text>
	</TouchableOpacity>
);
