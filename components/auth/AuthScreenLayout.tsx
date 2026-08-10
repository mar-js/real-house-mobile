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
			backgroundColor: "#ffffff",
		}}
		keyboardShouldPersistTaps="handled"
	>
		<View
			style={{
				flexGrow: 1,
				justifyContent: "center",
				padding: 20,
			}}
		>
			<Image
				source={require("@/assets/images/logo.png")}
				style={{
					width: 100,
					height: 100,
				}}
				resizeMode="contain"
			/>
			{children}
		</View>
	</ScrollView>
);
