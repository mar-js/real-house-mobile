import { IPropertyCard } from "@/global/interfaces";
import { useSavedProperty } from "@/hooks/useSavedProperty";
import { colors, radius, shadow, size, spacing } from "@/theme";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useRouter } from "expo-router";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { JSX } from "react/jsx-runtime";

export const PropertyCard = ({ property, onUnsave, showSave }: IPropertyCard): JSX.Element => {
  const router = useRouter()
  const { isSaved, saveLoading, toggleSave } = useSavedProperty({ propertyId: property.id, onUnsave })

  const handlerNavigationProperty = () => (
    router.push(`/(root)/property/${property.id}`)
  )

  return (
    <TouchableOpacity
      onPress={handlerNavigationProperty}
      style={{
        position: "relative",
        flexDirection: "row",
        margin: spacing.xs,
        gap: spacing.md,
        opacity: property.is_sold ? shadow.xl : 1,
      }}
    >
      <Image
        source={{
          uri: property.images.length > 0 ? property.images[0] : require("@/assets/images/logo.png")
        }}
        style={{
          width: "35%",
          height: 100,
          borderRadius: radius.md
        }}
        resizeMode="cover"
      />
      <View
        style={{
          width: "50%",
          justifyContent: "space-between",
        }}
      >
        <View>
          {property.is_sold && (
            <View
              style={{
                alignItems: "center",
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
              gap: spacing.xs,
              marginBottom: spacing.xs
            }}
          >
            <Ionicons
              name="location-outline"
              color={colors.border}
            />
            <Text
              style={{
                color: colors.border
              }}
              numberOfLines={1}
            >{property.city}</Text>
          </View>
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
                name="expand-outline"
                color={colors.border}
              />
              <Text
                style={{
                  color: colors.border
                }}
              >{property.area_sqft} mt²</Text>
            </View>
          </View>
        </View>
      </View>
      <TouchableOpacity
        onPress={toggleSave}
        disabled={saveLoading}
        style={{
          position: "absolute",
          top: 0,
          right: 10
        }}
      >
        <Ionicons
          name={isSaved ? "heart" : "heart-outline"}
          size={size.xs}
          color={isSaved ? "#ef4444" : "#9ca3af"}
        />
      </TouchableOpacity>
    </TouchableOpacity>
  )
}
