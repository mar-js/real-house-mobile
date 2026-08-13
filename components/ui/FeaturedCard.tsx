import { IFeaturedCard } from "@/global/interfaces";
import { colors, radius, shadow, size, spacing } from "@/theme";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useRouter } from "expo-router";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { JSX } from "react/jsx-runtime";

export const FeaturedCard = ({ property }: IFeaturedCard): JSX.Element => {
  const router = useRouter()

  const handlerNavigationProperty = () => (
    router.push(`/(root)/property/${property.id}`)
  )

  return (
    <TouchableOpacity
      onPress={handlerNavigationProperty}
      style={{
        position: "relative",
        width: 250,
        margin: spacing.xs,
        borderRadius: radius.md,
        boxShadow: "1px 1px 6px gray",
        opacity: property.is_sold ? shadow.xl : 1,
        overflow: "hidden"
      }}
    >
      <Image
        source={{
          uri: property.images.length > 0 ? property.images[0] : require("@/assets/images/logo.png")
        }}
        style={{
          width: "100%",
          height: 200,
        }}
        resizeMode="cover"
      />
      <View
        style={{
          position: "absolute",
          top: 10,
          left: 10,
          backgroundColor: colors.background + "90",
          padding: 5,
          borderRadius: radius.md
        }}
      >
        <Text
          style={{
            fontWeight: "semibold",
            color: colors.primary,
            textTransform: "capitalize"
          }}
        >{property.type}</Text>
      </View>
      {property.is_sold && (
        <View
          style={{
            position: "absolute",
            top: 10,
            right: 10,
            backgroundColor: colors.error,
            padding: 5,
            borderRadius: radius.md
          }}
        >
          <Text
            style={{
              fontWeight: "semibold",
              color: colors.background,
              textTransform: "capitalize"
            }}
          >Sold</Text>
        </View>
      )}
      <View
        style={{
          padding: spacing.md
        }}
      >
        <Text
          style={{
            fontWeight: "bold",
            color: colors.textPrimary,
            marginBottom: spacing.xs
          }}
          numberOfLines={1}
        >{property.title}</Text>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            gap: spacing.xs,
            marginBottom: spacing.xs
          }}
        >
          <Ionicons
            name="location-outline"
            size={size.xs}
            color={colors.border}
          />
          <Text
            style={{
              color: colors.border
            }}
            numberOfLines={1}
          >{property.address} {property.city}</Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between"
          }}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between"
            }}
          >
            <Text
              style={{
                color: colors.primary,
                fontWeight: "bold",
              }}
            >${property.price}</Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: spacing.xs
            }}
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                gap: spacing.xs
              }}
            >
              <Ionicons
                name="bed-outline"
                size={size.xs}
                color={colors.border}
              />
              <Text
                style={{
                  color: colors.border
                }}
              >{property.bedrooms}</Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                gap: spacing.xs
              }}
            >
              <Ionicons
                name="water-outline"
                size={size.xs}
                color={colors.border}
              />
              <Text
                style={{
                  color: colors.border
                }}
              >{property.bathrooms}</Text>
            </View>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  )
}
