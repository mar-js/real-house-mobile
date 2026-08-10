import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import type { JSX } from "react/jsx-runtime";

interface PlaceholderScreenProps {
	title: string;
}

export const PlaceholderScreen = ({
	title,
}: PlaceholderScreenProps): JSX.Element => (
	<SafeAreaView>
		<View>
			<Text>{title}</Text>
		</View>
	</SafeAreaView>
);
