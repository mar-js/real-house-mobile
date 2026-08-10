import type { IAuthSectionHeader } from "@/types/auth";
import { Text, View } from "react-native";
import type { JSX } from "react/jsx-runtime";

export const AuthSectionHeader = ({
	title,
	subtitle,
}: IAuthSectionHeader): JSX.Element => (
	<View style={{ marginBlock: 10 }}>
		<Text
			style={{
				fontSize: 30,
				fontWeight: "bold",
				color: "#1f2937",
			}}
		>
			{title}
		</Text>
		<Text style={{ color: "#bababa" }}>{subtitle}</Text>
	</View>
);
