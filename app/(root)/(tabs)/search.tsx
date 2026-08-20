import { FilterModal, PropertyCard } from "@/components/ui";
import { IProperty } from "@/global/interfaces";
import { useFilterStore } from "@/store/filterStore";
import { colors, radius, size, spacing } from "@/theme";
import { supabase } from "@/utils/supabase";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useLocalSearchParams } from "expo-router";
import { useCallback, useEffect, useState } from "react";
import { ActivityIndicator, FlatList, Text, TextInput, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Search() {
	const [results, setResults] = useState<IProperty[]>([])
	const [loading, setLoading] = useState<boolean>(false)
	const [showFilters, setShowFilters] = useState<boolean>(false)
	const { openFilters } = useLocalSearchParams<{openFilters?: string}>()
	const {
		search,
		type,
		bedrooms,
		minPrice,
		maxPrice,
		setSearch,
		setType,
		setBedrooms,
		setMinPrice,
		setMaxPrice,
		resetFilters
	} = useFilterStore()

	const activeFilterCount = [
		type,
		bedrooms,
		minPrice,
		maxPrice,
	].filter(value => value !== null).length

	const handlerResetSearchPress = () => {
		setSearch("")
	}

	const handlerShowFiltersOpenPress = () => {
		setShowFilters(true)
	}

	const handlerShowFiltersClosePress = () => {
		setShowFilters(false)
	}

	const handlerCloseTypePress = () => {
		setType(null)
	}

	const handlerCloseBedroomsPress = () => {
		setBedrooms(null)
	}

	const handlerClosePricesPress = () => {
		setMinPrice(null)
		setMaxPrice(null)
	}

	const fetchResults = useCallback(async () => {
		setLoading(true)
		let query = supabase
			.from("properties")
			.select("*")

		if (search) {
			query = query.or(`title.ilike.%${search}%,city.ilike.%${search}%`)
		}

		if (type) {
			query = query.eq("type", type)
		}

		if (bedrooms) {
			query = query.eq("bedrooms", bedrooms)
		}

		if (minPrice) {
			query = query.gte("price", minPrice)
		}

		if (maxPrice ) {
			query = query.lte("price", maxPrice )
		}

		try {
			const { data } = await query.order("created_at", { ascending: true })
			setResults(data || [])
			setLoading(false)
		} catch (error) {
			setResults([])
			setLoading(false)
		}
	}, [
		search,
		type,
		bedrooms,
		minPrice,
		maxPrice
	])

	useEffect(() => {
		if (openFilters === "true") {
			setShowFilters(true)
		}
	}, [openFilters])

	useEffect(() => {
		fetchResults()
	}, [
		search,
		type,
		bedrooms,
		minPrice,
		maxPrice
	])

	return (
		<SafeAreaView>
			<View
				style={{
					padding: spacing.md,
				}}
			>
				<Text
					style={{
						fontSize: size.md,
						fontWeight: "bold",
						color: colors.textPrimary,
						marginBottom: spacing.lg
					}}
				>Find Property</Text>
				<View
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
				>
					<View
						style={{
							flexDirection: "row",
							justifyContent: "center",
							alignItems: "center",
							gap: spacing.xs
						}}
					>
						<Ionicons
							name="search-outline"
							size={size.xs}
							color={colors.border}
						/>
						<TextInput
							placeholder="Search by title or city..."
							placeholderTextColor={colors.border}
							value={search}
							onChangeText={setSearch}
							autoCapitalize="none"
						/>
					</View>
					<View
						style={{
							flexDirection: "row",
							gap: spacing.xs
						}}
					>
						{search.length > 0 && (
							<TouchableOpacity
								onPress={handlerResetSearchPress}
							>
								<Ionicons
									name="close-circle-outline"
									size={size.xs}
									color={colors.border}
								/>
							</TouchableOpacity>
						)}
						<TouchableOpacity
							onPress={handlerShowFiltersOpenPress}
							style={{
								position: "relative"
							}}
						>
							<Ionicons
								name="options-outline"
								size={size.xs}
								color={activeFilterCount > 0 ? colors.primary : colors.border}
							/>
							{activeFilterCount > 0 && (
								<View
									style={{
										justifyContent: "center",
										alignItems: "center",
										position: "absolute",
										bottom: spacing.sm,
										left: spacing.sm,
										width: 10,
										height: 10,
										backgroundColor: colors.link,
										borderRadius: radius.xl
									}}
								>
									<Text
										style={{
											color: colors.background,
											fontWeight: "bold",
											fontSize: 6
										}}
									>{activeFilterCount}</Text>
								</View>
							)}
						</TouchableOpacity>
					</View>
				</View>
				{activeFilterCount > 0 && (
					<View
						style={{
							flexDirection: "row",
							flexWrap: "wrap",
							gap: spacing.xs,
							marginTop: spacing.xs
						}}
					>
						{type && (
							<View
								style={{
									flexDirection: "row",
									alignItems: "center",
									gap: spacing.xs,
									padding: spacing.sm,
									borderRadius: radius.lg,
									borderStyle: "solid",
									borderWidth: 1,
									borderColor: colors.link,
									backgroundColor: colors.background
								}}
							>
								<Text
									style={{
										color: colors.primary,
										fontWeight: "semibold",
										textTransform: "capitalize"
									}}
								>{type}</Text>
								<TouchableOpacity
									onPress={handlerCloseTypePress}
								>
									<Ionicons
										name="close-circle-outline"
										size={size.xs}
										color={colors.primary}
									/>
								</TouchableOpacity>
							</View>
						)}
						{bedrooms && (
							<View
								style={{
									flexDirection: "row",
									alignItems: "center",
									gap: spacing.xs,
									padding: spacing.sm,
									borderRadius: radius.lg,
									borderStyle: "solid",
									borderWidth: 1,
									borderColor: colors.link,
									backgroundColor: colors.background
								}}
							>
								<Ionicons
									name="bed-outline"
									size={size.xs}
									color={colors.primary}
								/>
								<Text
									style={{
										color: colors.primary,
										fontWeight: "semibold",
										textTransform: "capitalize"
									}}
								>{bedrooms === 4 ? "4+ beds" : `${bedrooms} bed${bedrooms > 1 ? "s" : ""}`}</Text>
								<TouchableOpacity
									onPress={handlerCloseBedroomsPress}
								>
									<Ionicons
										name="close-circle-outline"
										size={size.xs}
										color={colors.primary}
									/>
								</TouchableOpacity>
							</View>
						)}
						{[minPrice, maxPrice].every(price => price !== null) && (
							<View
								style={{
									flexDirection: "row",
									alignItems: "center",
									gap: spacing.xs,
									padding: spacing.sm,
									borderRadius: radius.lg,
									borderStyle: "solid",
									borderWidth: 1,
									borderColor: colors.link,
									backgroundColor: colors.background
								}}
							>
								<Text
									style={{
										color: colors.primary,
										fontWeight: "semibold",
										textTransform: "capitalize"
									}}
								>{minPrice && maxPrice ? `$${minPrice} - $${maxPrice}` : minPrice ? `From $${minPrice}` : `Up to $${maxPrice}`}</Text>
								<TouchableOpacity
									onPress={handlerClosePricesPress}
								>
									<Ionicons
										name="close-circle-outline"
										size={size.xs}
										color={colors.primary}
									/>
								</TouchableOpacity>
							</View>
						)}
					</View>
				)}
			</View>
			<FlatList
				data={results}
				keyExtractor={(property) => property.id}
				contentContainerStyle={{
					paddingInline: spacing.sm,
					paddingBottom: spacing["2xl"]
				}}
				showsVerticalScrollIndicator={false}
				ListHeaderComponent={
					<Text
						style={{
							color: colors.border,
							marginBottom: spacing.xs
						}}
					>{loading ? "Searching..." : `${results.length} properties found`}</Text>
				}
				renderItem={({ item }) => (
					<PropertyCard property={item} />
				)}
				ListEmptyComponent={
					loading ? (
						<ActivityIndicator
							size="large"
							color="#2563eb"
							style={{
								paddingBlock: spacing.sm
							}}
						/>
					) : (
						<View
							style={{
								alignItems: "center",
								paddingBlock: spacing.xs
							}}
						>
							<Text
								style={{
									color: colors.border,
									marginTop: spacing.xs
								}}
							>No properties found</Text>
							<Text
								style={{
									color: colors.placeholder,
									marginTop: spacing.xs
								}}
							>Try a different search or adjust filters</Text>
						</View>
					)
				}
			/>
			<FilterModal
				visible={showFilters}
				onClose={handlerShowFiltersClosePress}
				activeCount={activeFilterCount}
			/>
		</SafeAreaView>
	)
}
