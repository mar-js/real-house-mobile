import { StyleSheet } from "react-native";

export const authStyles = StyleSheet.create({
	input: {
		borderColor: "#bababa",
		borderWidth: 1,
		borderStyle: "solid",
		borderRadius: 10,
		padding: 10,
	},
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
	buttonText: {
		color: "#ffffff",
		fontWeight: "bold",
	},
	errorText: {
		color: "#F05656",
		marginBottom: 10,
	},
	linkText: {
		color: "#5696F0",
	},
	mutedText: {
		color: "#9E9E9E",
	},
	resetText: {
		color: "#fc6d6d",
	},
	retryText: {
		color: "#5F9CED",
	},
});
