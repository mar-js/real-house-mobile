import { SpecItem } from "@/components/ui";
import { IProperty } from "@/global/interfaces";
import { useSavedProperty } from "@/hooks/useSavedProperty";
import { useSupabase } from "@/hooks/useSupabase";
import { useUserStore } from "@/store/userStore";
import { colors, radius, size, spacing } from "@/theme";
import { supabase } from "@/utils/supabase";
import { useAuth } from "@clerk/expo";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useCallback, useEffect, useState } from "react";
import { Alert, Dimensions, FlatList, Image, Linking, NativeScrollEvent, NativeSyntheticEvent, ScrollView, Text, TouchableOpacity, View } from "react-native";
import ImageViewing from "react-native-image-viewing";
import { SafeAreaView } from "react-native-safe-area-context";
import { WebView } from "react-native-webview";

const ADMIN_PHONE = process.env.ADMIN_PHONE || 0

export default function Property() {
  const { id } = useLocalSearchParams<{ id: string }>()
  const { userId } = useAuth()
  const router = useRouter()
  const { isAdmin } = useUserStore()
  const [property, setProperty] = useState<IProperty | null>(null)
  const [loading, setLoading] = useState(true)
  const [activeIndex, setActiveIndex] = useState(0)
  const [expanded, seetExpanded] = useState(false)
  const [imageViewerVisible, setImageViewerVisible] = useState(false)
  const client = useSupabase()
  const { width: widthWindow } = Dimensions.get("window")
  const { isSaved, saveLoading, toggleSave} = useSavedProperty({propertyId: id ?? ""})
  const isLongDesc = (property?.description?.length ?? 0) > 150
  const displayDesc = expanded || !isLongDesc ? property?.description : property?.description?.slice(0, 150) + "..."
  const mapUrl = `https://www.openstreetmap.org/export/embed.html?bbox=${
    (property?.longitude || 0) - 0.003
  }%2C${
    (property?.latitude || 0) - 0.003
  }%2C${
    (property?.longitude || 0) + 0.003
  }%2C${
    (property?.latitude || 0) + 0.003
  }&layer=mapnik&marker=${
    property?.latitude
  }%2C${
    property?.longitude
  }`

  const fetchProperty = useCallback(async () => {
    try {
      const { data } = await supabase
        .from("properties")
        .select("*")
        .eq("id", id)
        .single()
      setProperty(data)
      setLoading(false)
    } catch (error) {
      setProperty(null)
      setLoading(false)
    }
  }, [id])

  const handlerImagesScroll = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    const index = Math.round(e.nativeEvent.contentOffset.x / widthWindow)
    setActiveIndex(index)
  }

  const handlerImageViewerVisiblePress = () => {
    setImageViewerVisible(true)
  }

  const handlerIconBackPress = () => {
    router.back()
  }

  const handlerExpandedPress = () => {
    seetExpanded(!expanded)
  }

  const handlerPropertyMapPress = () => {
    router.push({
      pathname: "/(root)/property/map",
      params: {
        latitude: property?.latitude,
        longitude: property?.longitude,
        title: property?.title,
        address: `${property?.address}, ${property?.city}`,
      }
    })
  }

  const handlerContactPress = () => {
    const message = `Hi! I'm interested in the property: ${property?.title}`
    const url = `https://wa.me/${ADMIN_PHONE}?text=${encodeURIComponent(message)}`
    Linking.openURL(url)
  }

  const handlerMarkSoldPress = () => {
    Alert.alert("Mark as Sold", "Are you sure?", [
      {
        text: "Cancel",
        style: "cancel"
      },
      {
        text: "Mark Sold",
        onPress: async () => {
          try {
            await client
              .from("properties")
              .update({
                is_sold: true
              })
              .eq("id", id)
            setProperty((prevProperty) => (prevProperty ? { ...prevProperty, is_sold: true } : prevProperty))
          } catch (error) {
            throw new Error("Failed for sold property");
          }
        }
      }
    ])
  }

  const handlerDeletePress = () => {
    Alert.alert("Delete Property", "Are you sure?", [
      {
        text: "Cancel",
        style: "cancel"
      },
      {
        text: "Delete",
        style: "destructive",
        onPress: async () => {
          try {
            await client
              .from("properties")
              .delete()
              .eq("id", id)
          } catch (error) {
            throw new Error("Failed for delete property");
          }
        }
      }
    ])
  }

  const handlerRequestClosePress = () => {
    setImageViewerVisible(false)
  }

  useEffect(() => {
    fetchProperty()
  }, [id])

  if (!property) return (
    <View
      style={{
        alignItems: "center",
        justifyContent: "center"
      }}
    >
      <Text
        style={{
          color: colors.border
        }}
      >Property not found</Text>
    </View>
  )

  return (
    <View
      style={{
        backgroundColor: colors.background
      }}
    >
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          backgroundColor: colors.background
        }}
      >
        <View
          style={{
            position: "relative",
          }}
        >
          <SafeAreaView
            style={{
              position: "absolute",
              top: spacing.sm,
              borderRadius: radius.lg,
              zIndex: 100
            }}
            >
              <View
                style={{
                  width: "100%",
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                  paddingInline: spacing.sm
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
                <TouchableOpacity
                  onPress={toggleSave}
                  disabled={saveLoading}
                  style={{
                    backgroundColor: colors.background,
                    borderRadius: radius.lg,
                    padding: spacing.xs
                  }}
                >
                  <Ionicons
                    name={isSaved ? "heart" : "heart-outline"}
                    size={size.sm}
                    color={isSaved ? "#ef4444" : "#9ca3af"}
                  />
                </TouchableOpacity>
              </View>
          </SafeAreaView>
          <View
            style={{
              opacity: property.is_sold ? 0.5 : 1
            }}
          >
            <FlatList
              data={property.images}
              keyExtractor={(item) => item}
              showsHorizontalScrollIndicator={false}
              horizontal
              pagingEnabled
              onScroll={handlerImagesScroll}
              scrollEventThrottle={spacing.md}
              renderItem={({ item }) => (
                <TouchableOpacity
                  onPress={handlerImageViewerVisiblePress}
                >
                  <Image
                    source={{
                      uri: item
                    }}
                    style={{
                      width: widthWindow,
                      height: 300
                    }}
                    resizeMode="cover"
                  />
                </TouchableOpacity>
              )}
            />
          </View>
          <View
            style={{
              position: "absolute",
              bottom: spacing.sm,
              right: 0,
              paddingInline: spacing.sm
            }}
          >
            <View
              style={{
                paddingInline: spacing.md,
                paddingBlock: spacing.xs,
                borderRadius: radius.lg,
                backgroundColor: colors.textPrimary,
              }}
            >
              <Text
                style={{
                  color: colors.background,
                }}
              >{activeIndex + 1}/{property.images.length}</Text>
            </View>
          </View>
        </View>
        <View
          style={{
            paddingInline: spacing.xs,
            paddingTop: spacing.lg,
            paddingBottom: spacing.sm,
            opacity: property.is_sold ? 0.5 : 1
          }}
        >
          <View
            style={{
              flexDirection: "row",
              flexWrap: "wrap",
              gap: spacing.sm,
              marginBottom: spacing.lg
            }}
          >
            <View
              style={{
                backgroundColor: "#e1edff",
                padding: spacing.sm,
                borderRadius: radius.lg
              }}
            >
              <Text
                style={{
                  color: colors.primary,
                  fontWeight: "semibold",
                  textTransform: "capitalize"
                }}
              >{property.type}</Text>
            </View>
            {property.is_featured && (
              <View
                style={{
                  backgroundColor: "#ffe9d1",
                  padding: spacing.sm,
                  borderRadius: radius.lg
                }}
              >
                <Text
                  style={{
                    color: "#ff982b",
                    fontWeight: "semibold",
                    textTransform: "capitalize"
                  }}
                >Featured</Text>
              </View>
            )}
            {property.is_sold && (
              <View
                style={{
                  backgroundColor: "#ffcfcf",
                  padding: spacing.sm,
                  borderRadius: radius.lg
                }}
              >
                <Text
                  style={{
                    color: "#ff7777",
                    fontWeight: "semibold",
                    textTransform: "capitalize"
                  }}
                >Sold</Text>
              </View>
            )}
          </View>
          <Text
            style={{
              fontSize: size.md,
              fontWeight: "bold",
              color: "#4b4b4b",
              marginBottom: spacing.xs
            }}
          >{property.title}</Text>
          <Text
            style={{
              fontSize: size.md,
              fontWeight: "bold",
              color: "#4276fb",
            }}
          >${property.price}</Text>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              borderRadius: radius.lg,
              padding: spacing.xs,
              marginBlock: spacing.md
            }}
          >
            <SpecItem
              icon="bed-outline"
              label="Beds"
              value={String(property.bedrooms)}
            />
            <SpecItem
              icon="water-outline"
              label="Baths"
              value={String(property.bathrooms)}
            />
            <SpecItem
              icon="expand-outline"
              label="Area"
              value={String(property.area_sqft) + "mt²"}
            />
            <SpecItem
              icon="home-outline"
              label="Type"
              value={property.type}
            />
          </View>
          <Text
            style={{
              fontWeight: "bold",
              color: "#444444",
              marginBottom: spacing.xs
            }}
          >Description</Text>
          <Text
            style={{
              color: "#8b8b8b",
              marginBottom: spacing.md
            }}
          >{displayDesc}</Text>
          {isLongDesc && (
            <TouchableOpacity
              onPress={handlerExpandedPress}
            >
              <Text
                style={{
                  color: "#1164ff",
                  fontWeight: "medium",
                  marginBottom: spacing.xs
                }}
              >{expanded ? "Show less" : "Read more"}</Text>
            </TouchableOpacity>
          )}
          <Text
            style={{
              fontWeight: "bold",
              color: "#444444",
              marginBottom: spacing.xs
            }}
          >Location</Text>
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
              color="#6b7280"
            />
            <Text
              style={{
                color: "#545454"
              }}
            >{property.address}, {property.city}</Text>
          </View>
          <TouchableOpacity
            onPress={handlerPropertyMapPress}
            activeOpacity={0.9}
            style={{
              position: "relative",
              borderRadius: radius.lg,
              overflow: "hidden",
              marginBottom: spacing.xs,
              height: 200
            }}
          >
            <WebView
              source={{
                uri: mapUrl
              }}
              scrollEnabled={false}
              pointerEvents="none"
            />
            <View
              style={{
                position: "absolute",
                bottom: spacing.xs,
                right: spacing.xs,
                backgroundColor: colors.background,
                paddingBlock: spacing.xs,
                paddingInline: spacing.sm,
                borderRadius: radius.lg,
                flexDirection: "row",
                alignItems: "center",
                gap: spacing.xs
              }}
            >
              <Ionicons
                name="expand-outline"
                size={size.xs}
                color="#374151"
              />
              <Text
                style={{
                  color: "#3f3f3f",
                  fontWeight: "medium"
                }}
              >Tap to expand</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={handlerContactPress}
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              gap: spacing.xs,
              backgroundColor: "#6bcd1f",
              borderRadius: radius.lg,
              marginBlock: spacing.xs,
              padding: spacing.md
            }}
          >
            <Ionicons
              name="logo-whatsapp"
              size={size.sm}
              color={colors.background}
            />
            <Text
              style={{
                color: colors.background,
                fontWeight: "bold",
                fontSize: size.xs
              }}
            >Contact Agent</Text>
          </TouchableOpacity>
          {isAdmin && (
            <>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: spacing.xs,
                  backgroundColor: "#ffdab0",
                  borderRadius: radius.lg,
                  marginBlock: spacing.xs,
                  padding: spacing.md
                }}
              >
                {!property.is_sold && (
                  <TouchableOpacity
                    onPress={handlerMarkSoldPress}
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: spacing.xs,
                    }}
                  >
                    <Ionicons
                      name="checkmark-circle-outline"
                      size={size.sm}
                      color="#d97706"
                    />
                    <Text
                      style={{
                        color: "#d97706",
                        fontWeight: "bold",
                        fontSize: size.xs
                      }}
                    >Mark Sold</Text>
                  </TouchableOpacity>
                )}
              </View>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: spacing.xs,
                  backgroundColor: "#ffa4a4",
                  borderRadius: radius.lg,
                  marginBlock: spacing.xs,
                  padding: spacing.md
                }}
              >
                <TouchableOpacity
                  onPress={handlerDeletePress}
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: spacing.xs,
                  }}
                >
                  <Ionicons
                    name="trash-outline"
                    size={size.sm}
                    color="#d90606"
                  />
                  <Text
                    style={{
                      color: "#d90606",
                      fontWeight: "bold",
                      fontSize: size.xs
                    }}
                  >Delete</Text>
                </TouchableOpacity>
              </View>
            </>
          )}
        </View>
      </ScrollView>
      <ImageViewing
        images={property.images.map((uri) => ({ uri }))}
        imageIndex={activeIndex}
        visible={imageViewerVisible}
        onRequestClose={handlerRequestClosePress}
      />
    </View>
  )
}
