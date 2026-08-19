import { colors, radius, size, spacing } from "@/theme"
import Ionicons from "@expo/vector-icons/Ionicons"
import { useLocalSearchParams, useRouter } from "expo-router"
import { Linking, Text, TouchableOpacity, View } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import WebView from "react-native-webview"

export default function Map() {
  const {
    latitude,
    longitude,
    title,
    address
  } = useLocalSearchParams<{
    latitude: string
    longitude: string
    title: string
    address: string
  }>()
  const router = useRouter()
  const lat = parseFloat(latitude)
  const lng = parseFloat(longitude)
  const mapUrl = `https://www.openstreetmap.org/export/embed.html?bbox=${
    (lng || 0) - 0.003
  }%2C${
    (lat || 0) - 0.003
  }%2C${
    (lng || 0) + 0.003
  }%2C${
    (lat || 0) + 0.003
  }&layer=mapnik&marker=${
    lat
  }%2C${
    lng
  }`

  const handlerIconBackPress = () => {
    router.back()
  }

  const handlerOpenMapPress = () => {
    Linking.openURL(`https://www.google.com/maps?q=${lat},${lng}`)
  }

  return (
    <SafeAreaView
      style={{
        backgroundColor: colors.background
      }}
    >
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          padding: spacing.xs,
          gap: spacing.xs,
          backgroundColor: colors.background
        }}
      >
        <TouchableOpacity
          onPress={handlerIconBackPress}
          style={{
            backgroundColor: colors.background,
            borderRadius: radius.lg,
            padding: spacing.xs
          }}
        >
          <Ionicons
            name="arrow-back"
            size={size.sm}
            color="#111827"
          />
        </TouchableOpacity>
        <View
          style={{
            marginInline: spacing.xs
          }}
        >
          <Text
            style={{
              color: "#363636",
              fontWeight: "semibold",
              fontSize: 12
            }}
            numberOfLines={1}
          >{title}</Text>
          <Text
            style={{
              color: "#d4d4d4",
              fontSize: 12
            }}
          >{address}</Text>
        </View>
        <TouchableOpacity
          onPress={handlerOpenMapPress}
          style={{
            flexDirection: "row",
            alignItems: "center",
            gap: spacing.xs,
            backgroundColor: "#c7e7ff",
            padding: spacing.xs,
            borderRadius: radius.lg
          }}
        >
          <Ionicons
            name="navigate-outline"
            size={size.xs}
            color="#2563eb"
          />
          <Text
            style={{
              color: "#4961ff",
              fontWeight: "semibold",
              fontSize: 10
            }}
          >Google Maps</Text>
        </TouchableOpacity>
      </View>
      <View
        style={{
          height: "90%"
        }}
      >
        <WebView
          source={{
            uri: mapUrl
          }}
          style={{
            flex: 1,
          }}
        />
      </View>
    </SafeAreaView>
  )
}
