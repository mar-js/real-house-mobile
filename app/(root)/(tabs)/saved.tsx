import { PropertyCard } from "@/components/ui";
import { ISavedProperty } from "@/global/interfaces";
import { useSupabase } from "@/hooks/useSupabase";
import { colors, radius, size, spacing } from "@/theme";
import { useAuth } from "@clerk/expo";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useFocusEffect, useRouter } from "expo-router";
import { useCallback, useId, useState } from "react";
import { ActivityIndicator, FlatList, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Saved() {
	const { userId } = useAuth()
	const client = useSupabase()
	const router = useRouter()
	const [saved, setSaved] = useState<ISavedProperty[]>([])
	const [loading, setLoading] = useState(false)

	const fetchSaved = useCallback(async () => {
		if (!userId) return
		setLoading(true)
		try {
			const { data } = await client
				.from("saved_properties")
				.select("id, property_id, properties(*)")
				.eq("user_clerck_id", userId)
				.order("id", { ascending: true })
			setSaved((data as unknown as ISavedProperty[]) || [])
			setLoading(false)
		} catch (error) {
			setSaved([])
			setLoading(false)
		}
	}, [useId])

	const handlerSavedPress = (id: string) => {
		setSaved((prev) => prev.filter((s) => s.id !== id))
	}

	useFocusEffect(useCallback(() => {
		fetchSaved()
	}, [fetchSaved]))

	return (
		<SafeAreaView
			style={{
				backgroundColor: colors.background
			}}
		>
			<View
				style={{
					padding: spacing.xs
				}}
			>
				<Text
					style={{
						color: "#222222",
						fontSize: size.sm,
						fontWeight: "bold",
						marginBottom: spacing.xs
					}}
				>Saved</Text>
				{!loading && (
					<Text
						style={{
							color: "#6b6b6b"
						}}
					>{saved.length} {saved.length === 1 ? "property" : "properties"} saved</Text>
				)}
			</View>
			{loading ? (
				<View
					style={{
						alignItems: "center",
						justifyContent: "center"
					}}
				>
					<ActivityIndicator
						size="large"
						color="#2563eb"
					/>
				</View>
			) : (
				<FlatList
					data={saved}
					keyExtractor={(item) => item.id}
					contentContainerStyle={{
						padding: spacing.lg,
						paddingBottom: spacing["2xl"]
					}}
					showsVerticalScrollIndicator={false}
					renderItem={({ item }) => (
						<PropertyCard
							property={item.properties}
							onUnsave={() => handlerSavedPress(item.id)}
							showSave
						/>
					)}
					ListEmptyComponent={
						<View
							style={{
								alignItems: "center",
								justifyContent: "center",
								paddingBlock: spacing.lg
							}}
						>
							<View
								style={{
									width: 200,
									height: 200,
									alignItems: "center",
									justifyContent: "center",
									borderRadius: radius.lg
								}}
							>
								<Ionicons
									name="heart-outline"
									size={size.xl}
									color="#ef4444"
								/>
							</View>
							<Text
								style={{
									color: "#5d5d5d",
									fontSize: size.sm,
									fontWeight: "bold",
									marginBlock: spacing.sm
								}}
							>No saved properties</Text>
							<Text
								style={{
									color: "#919090",
									textAlign: "center",
									paddingInline: spacing.xs
								}}
							>Tap the heart icon on any property to save it here</Text>
						</View>
					}
				/>
			)}
		</SafeAreaView>
	);
}
