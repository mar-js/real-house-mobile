import { colors, radius, spacing } from "@/theme";
import { StyleSheet } from "react-native";

export const authStyles = StyleSheet.create({
	input: {
		borderColor: colors.border,
		borderWidth: 1,
		borderStyle: "solid",
		borderRadius: radius.md,
		padding: spacing.sm,
	},
	button: {
		width: "100%",
		borderColor: colors.transparent,
		borderWidth: 1,
		borderStyle: "solid",
		borderRadius: radius.md,
		padding: spacing.sm,
		backgroundColor: colors.primary,
		alignItems: "center",
	},
	buttonText: {
		color: colors.textInverse,
		fontWeight: "bold",
	},
	errorText: {
		color: colors.error,
		marginBottom: spacing.sm,
	},
	linkText: {
		color: colors.link,
	},
	mutedText: {
		color: colors.textMuted,
	},
	resetText: {
		color: colors.danger,
	},
	retryText: {
		color: colors.primary,
	},
});
