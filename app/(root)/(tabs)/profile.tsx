import { MenuItem } from "@/components/ui";
import { colors, radius, size, spacing } from "@/theme";
import { useAuth, useUser } from "@clerk/expo";
import Ionicons from "@expo/vector-icons/Ionicons";
import { launchImageLibraryAsync, requestMediaLibraryPermissionsAsync } from "expo-image-picker";
import { useRouter } from "expo-router";
import { useState } from "react";
import { ActivityIndicator, Alert, Image, Linking, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const ADMIN_EMAIL = process.env.ADMIN_EMAIL || ""

export default function Profile() {
	const router = useRouter()
	const { signOut } = useAuth()
	const { user, isLoaded } = useUser()
	const [isUpdating, setIsUpdating] = useState(false)

	const handlerSignOutPress = async () => {
		try {
			await signOut()
			router.replace("/sign-in")
		} catch (error) {
			throw new Error("Error signing out:" + String(error));
		}
	}

	const handlerUpdateProfileImagePress = async () => {
		try {
			const permissionResult = await requestMediaLibraryPermissionsAsync()

			if (!permissionResult.granted) {
				Alert.alert("Permission Required", "Please alllow access to your photo library to update your profile picture.")
				return
			}

			const result = await launchImageLibraryAsync({
				mediaTypes: "images",
				allowsEditing: true,
				aspect: [1, 1],
				quality: 0.8,
				base64: true
			})

			if (result.canceled) return

			setIsUpdating(true)

			const base64Image = result.assets[0].base64
			const uri = result.assets[0].uri
			const filename = uri.split("/").pop() || "profile.jpg"
			const match = /\.(\w+)$/.exec(filename)
			const mimeType = match ? `image/${match[1]}` : "image/jpeg"
			const dataUrl = `data:${mimeType};base64,${base64Image}`

			await user?.setProfileImage({ file: dataUrl })

			Alert.alert("Success", "Profile picture updated successfully!")
		} catch (error) {
			setIsUpdating(false)
		}
	}

	const handlerMenuItemSavedPropertiesPress = () => {
		router.push("/(root)/(tabs)/saved")
	}

	const handlerMenuItemNotificationsPress = () => {
		Alert.alert("Coming Soon", "Notification coming soon!")
	}

	const handlerMenuItemSettingsPress = () => {
		Alert.alert("Coming Soon", "Settings coming soon!")
	}

	const handlerMenuItemHelpPress = () => {
		Linking.openURL(`mailto:${ADMIN_EMAIL}?subject=Help%20%26%20Support%20-%20Real%20House%20App`)
	}

	if (!isLoaded || !user) {
		return (
			<SafeAreaView
				style={{
					padding: spacing.sm,
					backgroundColor: colors.background,
					alignItems: "center"
				}}
			>
				<ActivityIndicator
					size="large"
					color="#3b82f6"
				/>
			</SafeAreaView>
		)
	}

	return (
		<SafeAreaView
			style={{
				backgroundColor: colors.background,
				padding: spacing.sm
			}}
		>
			<View
				style={{
					alignItems: "center",
				}}
			>
				<View
					style={{
						position: "relative"
					}}
				>
					<Image
						source={{
							uri: user.imageUrl
						}}
						style={{
							width: 100,
							height: 100,
							borderRadius: "100%",
							marginBottom: spacing.xs
						}}
					/>
					<TouchableOpacity
						onPress={handlerUpdateProfileImagePress}
						disabled={isUpdating}
						style={{
							position: "absolute",
							right: -5,
							bottom: 5,
							backgroundColor: "#375fff",
							padding: spacing.xs,
							borderRadius: "100%",
						}}
					>
						{isUpdating ? (
							<ActivityIndicator
								size="small"
								color="#ffffff"
							/>
						) : (
							<Ionicons
								name="camera-outline"
								size={size.xs}
								color="#ffffff"
							/>
						)}
					</TouchableOpacity>
				</View>
				<Text
					style={{
						fontSize: size.sm,
						fontWeight: "bold",
						color: "#292929"
					}}
				>{user.firstName} {user.lastName}</Text>
				<Text
					style={{
						color: "#626262",
						marginBlock: spacing.md
					}}
				>{user.emailAddresses[0].emailAddress}</Text>
			</View>
			<View
				style={{
					gap: spacing.xs
				}}
			>
				<MenuItem
					icon="heart-outline"
					label="Saved Properties"
					onPress={handlerMenuItemSavedPropertiesPress}
				/>
				<MenuItem
					icon="notifications-outline"
					label="Notifications"
					onPress={handlerMenuItemNotificationsPress}
				/>
				<MenuItem
					icon="settings-outline"
					label="Settings"
					onPress={handlerMenuItemSettingsPress}
				/>
				<MenuItem
					icon="help-circle-outline"
					label="Help & Support"
					onPress={handlerMenuItemHelpPress}
				/>
			</View>
			<View
				style={{
					marginTop: spacing["2xl"] + spacing["2xl"]
				}}
			>
				<TouchableOpacity
					onPress={handlerSignOutPress}
					style={{
						flexDirection: "row",
						alignItems: "center",
						justifyContent: "center",
						gap: spacing.xs,
						backgroundColor: "#fee3e3",
						padding: spacing.md,
						borderRadius: radius.lg,
						borderStyle: "solid",
						borderColor: "#fa4848",
						borderWidth: 1
					}}
				>
					<Ionicons
						name="log-out-outline"
						size={size.sm}
						color="#ef4444"
					/>
					<Text
						style={{
							color: "#fa4848",
							fontWeight: "semibold",
						}}
					>Sign Out</Text>
				</TouchableOpacity>
			</View>
		</SafeAreaView>
	)
}
