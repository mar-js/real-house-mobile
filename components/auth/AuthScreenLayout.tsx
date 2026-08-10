import { colors, spacing } from "@/theme";
import type { ReactNode } from "react";
import { Image, ScrollView, View } from "react-native";
import type { JSX } from "react/jsx-runtime";

interface AuthScreenLayoutProps {
	children: ReactNode;
}

export const AuthScreenLayout = ({
	children,
}: AuthScreenLayoutProps): JSX.Element => (
	<ScrollView
		contentContainerStyle={{
			flexGrow: 1,
			backgroundColor: colors.background,
		}}
		keyboardShouldPersistTaps="handled"
	>
		<View
			style={{
				flexGrow: 1,
				justifyContent: "center",
				padding: spacing.lg,
			}}
		>
			<Image
				source={require("@/assets/images/logo.png")}
				style={{
					width: spacing["2xl"],
					height: spacing["2xl"],
				}}
				resizeMode="contain"
			/>
			{children}
		</View>
	</ScrollView>
);
