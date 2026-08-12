import { FeaturedCard, PropertyCard } from "@/components/ui";
import { IProperty } from "@/global/interfaces";
import { colors, radius, size, spacing } from "@/theme";
import { supabase } from "@/utils/supabase";
import { useUser } from "@clerk/expo";
import Ionicons from '@expo/vector-icons/Ionicons';
import { useFocusEffect, useRouter } from "expo-router";
import { useCallback, useState } from "react";
import { ActivityIndicator, FlatList, Image, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Home() {
	const { user } = useUser()
	const router = useRouter()
	const [featured, setFeatured] = useState<IProperty[] | []>([])
	const [recommended, setRecommended] = useState<IProperty[] | []>([])
	const [loading, setLoading] = useState(false)

	const fetchProperties = useCallback(async () => {
		setLoading(true)

		const { data: featuredData } = await supabase
			.from("properties")
			.select("*")
			.eq("is_featured", true)
			.order("created_at", {
				ascending: false
			})

		const { data: recommendedData } = await supabase
			.from("properties")
			.select("*")
			.eq("is_featured", false)
			.order("created_at", {
				ascending: false
			})

		setFeatured(featuredData ?? [])
		setRecommended(recommendedData ?? [])
		setLoading(false)
	}, [])

	const handlerNavigationSearchPress = (isOpenFilters: boolean = false) => (
		router.push(`/(root)/(tabs)/search?openFilters=${isOpenFilters}"`)
	)

	useFocusEffect(() => {
		fetchProperties()
	})

	return (
		<SafeAreaView>
			<FlatList
				data={recommended}
				keyExtractor={(property) => property.id}
				contentContainerStyle={{
					paddingInline: spacing.sm,
					paddingBottom: spacing["2xl"]
				}}
				showsVerticalScrollIndicator={false}
				ListHeaderComponent={
					<View
						style={{
							marginBottom: spacing.sm
						}}
					>
						<View
							style={{
								flexDirection: "row",
								alignItems: "center",
								justifyContent: "space-between",
								padding: spacing.sm
							}}
						>
							<Image
								source={require("@/assets/images/logo.png")}
								style={{
									width: size["4xl"],
									height: size["4xl"]
								}}
								resizeMode="contain"
							/>
							<View>
								<Text>Good Morning</Text>
								<Text
									style={{
										color: colors.border,
										fontWeight: "bold"
									}}
								>{user?.firstName ?? "User"}</Text>
							</View>
						</View>
						<TouchableOpacity
							style={{
								flexDirection: "row",
								justifyContent: "space-between",
								alignItems: "center",
								gap: spacing.xs,
								marginBottom: spacing.sm,
								padding: spacing.sm,
								borderRadius: radius.md,
								boxShadow: "1px 1px 6px gray",
								elevation: 2
							}}
							onPress={() => handlerNavigationSearchPress}
						>
							<View
								style={{
									flexDirection: "row",
									gap: spacing.xs,
									alignItems: "center"
								}}
							>
								<Ionicons
									name="search-outline"
									size={size.xs}
									color={colors.placeholder}
								/>
								<Text
									style={{
										color: colors.placeholder,
										fontSize: size.xs
									}}
								>Search properties, cities</Text>
							</View>
							<TouchableOpacity
								onPress={() => handlerNavigationSearchPress(true)}
							>
								<Ionicons
									name="options-outline"
									size={size.xs}
									color={colors.primary}
								/>
							</TouchableOpacity>
						</TouchableOpacity>
						<View>
							<Text
								style={{
									fontSize: size.sm,
									fontWeight: "bold"
								}}
							>Featured</Text>
							{loading ? (
								<ActivityIndicator
									size="small"
									color={colors.link}
									style={{
										margin: spacing.sm
									}}
								/>
							) : (
								<FlatList
									data={featured}
									keyExtractor={(item) => item.id}
									horizontal
									showsHorizontalScrollIndicator={false}
									renderItem={({ item }) => (
										<FeaturedCard property={item} />
									)}
								/>
							)}
						</View>
						<Text
							style={{
								fontSize: size.sm,
								fontWeight: "bold"
							}}
						>Recommended</Text>
					</View>
				}
				renderItem={({ item }) => (
					<View
						style={{
							paddingBlock: spacing.xs
						}}
					>
						<PropertyCard property={item} />
					</View>
				)}
				ListEmptyComponent={
					loading ? null : (
						<View>
							<Text>No properties found</Text>
						</View>
					)
				}
			/>
		</SafeAreaView>
	)
}
