import type { IButtonActionSignUp } from "@/global/interfaces";
import {
	ActivityIndicator,
	StyleSheet,
	Text,
	TouchableOpacity,
} from "react-native";
import type { JSX } from "react/jsx-runtime";

export const Button = ({
	text,
	handlerPress,
	isDisabled,
}: IButtonActionSignUp): JSX.Element => (
	<TouchableOpacity
		onPress={handlerPress}
		disabled={isDisabled}
		style={{ ...styles.button }}
	>
		{isDisabled ? (
			<ActivityIndicator color="white" />
		) : (
			<Text
				style={{
					color: "#ffffff",
					fontWeight: "bold",
				}}
			>
				{text}
			</Text>
		)}
	</TouchableOpacity>
);

const styles = StyleSheet.create({
	button: {
		width: "100%",
		borderColor: "transparent",
		borderWidth: 1,
		borderStyle: "solid",
		borderRadius: 10,
		padding: 10,
		backgroundColor: "#5F9CED",
		alignItems: "center",
	},
});
