import { colors, spacing } from "@/theme";
import type { IAuthSectionHeader } from "@/types/auth";
import { Text, View } from "react-native";
import type { JSX } from "react/jsx-runtime";

export const AuthSectionHeader = ({
	title,
	subtitle,
}: IAuthSectionHeader): JSX.Element => (
	<View style={{ marginBlock: spacing.sm }}>
		<Text
			style={{
				fontSize: 30,
				fontWeight: "bold",
				color: colors.textPrimary,
			}}
		>
			{title}
		</Text>
		<Text style={{ color: colors.textSubtitle }}>{subtitle}</Text>
	</View>
);
