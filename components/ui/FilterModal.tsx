import { IFilterModal } from "@/global/interfaces";
import { PropertyType, useFilterStore } from "@/store/filterStore";
import { colors, radius, size, spacing } from "@/theme";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useState } from "react";
import { Modal, ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";
import { JSX } from "react/jsx-runtime";

const TYPES: { label: string; value: PropertyType }[] = [
  { label: "All", value: null },
  { label: "Apartment", value: "apartment" },
  { label: "House", value: "house" },
  { label: "Villa", value: "villa" },
  { label: "Studio", value: "studio" },
];

const BEDS = [
  { label: "Any", value: null },
  { label: "1", value: 1 },
  { label: "2", value: 2 },
  { label: "3", value: 3 },
  { label: "4+", value: 4 },
];

const PRICE_PRESETS = [
  { label: "Under ₹50L", min: null, max: 50 },
  { label: "₹50L – ₹1Cr", min: 50, max: 100 },
  { label: "₹1Cr – ₹2Cr", min: 100, max: 200 },
  { label: "Above ₹2Cr", min: 200, max: null },
];

export const FilterModal = ({ visible, onClose, activeCount }: IFilterModal): JSX.Element => {
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
  const [localMin, setLocalMin] = useState<string>(minPrice ? String(minPrice) : "")
  const [localMax, setLocalMax] = useState<string>(maxPrice ? String(maxPrice) : "")

  const dataPrice = [
    {
      label: "Min Price",
      value: localMin,
      onChange: setLocalMin,
      placeholder: "0"
    },
    {
      label: "Max Price",
      value: localMax,
      onChange: setLocalMax,
      placeholder: "Any"
    }
  ]

  const handlerApplyPress = (): void => {
    setMinPrice(localMin ? Number(localMin) : null)
    setMaxPrice(localMax ? Number(localMax) : null)
    onClose()
  }

  const handlerResetFiltersPress = (): void => {
    resetFilters()
  }

  const handlerSetterTypePress = (value: PropertyType): void => {
    setType(value)
  }

  const handlerSetterBedroomsPress = (value: number | null): void => {
    setBedrooms(value)
  }

  const handlerSetterPricePresetsPress = (min: number | null, max: number | null): void => {
    setLocalMin(min ? String(min) : "")
    setLocalMax(max ? String(max) : "")
    setMinPrice(min)
    setMaxPrice(max)
  }

  const activePrice = (min: number | null, max: number | null): boolean => minPrice === min && maxPrice === max

  return (
    <Modal
      visible={visible}
      animationType="slide"
      presentationStyle="pageSheet"
      onRequestClose={onClose}
    >
      <View>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            padding: spacing.lg,
          }}
        >
          <TouchableOpacity
            onPress={onClose}
          >
            <Ionicons
              name="close-outline"
              size={size.sm}
              color="#374151"
            />
          </TouchableOpacity>
          <Text
            style={{
              fontSize: size.sm,
              fontWeight: "bold",
              color: colors.textPrimary
            }}
          >Filters</Text>
          <TouchableOpacity
            onPress={handlerResetFiltersPress}
          >
            <Ionicons
              name="refresh"
              size={size.sm}
              color={colors.link}
            />
          </TouchableOpacity>
        </View>
        <ScrollView
          contentContainerStyle={{
            padding: spacing.lg,
          }}
          showsVerticalScrollIndicator={false}
        >
          <View
            style={{
              gap: spacing.xs,
              marginBottom: spacing.xl
            }}
          >
            <Text
              style={{
                fontWeight: "bold",
                color: colors.textMuted,
              }}
            >Property Type</Text>
            <View
              style={{
                flexDirection: "row",
                flexWrap: "wrap",
                gap: spacing.xs,
                marginBottom: spacing.xs
              }}
            >
              {TYPES.map((t) => (
                <TouchableOpacity
                  key={t.label}
                  onPress={() => handlerSetterTypePress(t.value)}
                  style={{
                    padding: spacing.sm,
                    borderRadius: radius.lg,
                    borderStyle: "solid",
                    borderWidth: 1,
                    borderColor: type === t.value ? colors.link : colors.border,
                    backgroundColor: type === t.value ? colors.link : colors.background
                  }}
                >
                  <Text
                    style={{
                      fontWeight: "semibold",
                      color: type === t.value ? colors.background : colors.border
                    }}
                  >{t.label}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
          <View
            style={{
              gap: spacing.xs,
              marginBottom: spacing.xl
            }}
          >
            <Text
              style={{
                fontWeight: "bold",
                color: colors.textMuted,
              }}
            >Bedrooms</Text>
            <View
              style={{
                flexDirection: "row",
                flexWrap: "wrap",
                gap: spacing.xs,
                marginBottom: spacing.xs
              }}
            >
              {BEDS.map((b) => (
                <TouchableOpacity
                  key={b.label}
                  onPress={() => handlerSetterBedroomsPress(b.value)}
                  style={{
                    paddingBlock: spacing.sm,
                    paddingInline: spacing.lg,
                    borderRadius: radius.lg,
                    borderStyle: "solid",
                    borderWidth: 1,
                    borderColor: bedrooms === b.value ? colors.link : colors.border,
                    backgroundColor: bedrooms === b.value ? colors.link : colors.background
                  }}
                >
                  <Text
                    style={{
                      fontWeight: "semibold",
                      color: bedrooms === b.value ? colors.background : colors.border
                    }}
                  >{b.label}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
          <View
            style={{
              gap: spacing.xs,
              marginBottom: spacing.xl
            }}
          >
            <Text
              style={{
                fontWeight: "bold",
                color: colors.textMuted,
              }}
            >Price Range</Text>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                marginBottom: spacing.xs
              }}
            >
              {dataPrice.map((price) => (
                <View
                  key={price.label}
                >
                  <Text
                    style={{
                      fontSize: size.xs,
                      color: colors.border,
                      marginBottom: spacing.xs,
                      fontWeight: "medium"
                    }}
                  >{price.label}</Text>
                  <View
                    style={{
                      minWidth: 160,
                      flexDirection: "row",
                      alignItems: "center",
                      gap: spacing.xs,
                      paddingBlock: spacing.sm,
                      paddingInline: spacing.lg,
                      borderRadius: radius.lg,
                      borderStyle: "solid",
                      borderWidth: 1,
                      borderColor: colors.border,
                      backgroundColor: colors.background
                    }}
                  >
                    <Text
                      style={{
                        fontSize: size.xs,
                        color: colors.border,
                        fontWeight: "medium"
                      }}
                    >$</Text>
                    <TextInput
                      style={{
                        paddingBlock: spacing.xs,
                        color: colors.textPrimary
                      }}
                      placeholder={price.placeholder}
                      placeholderTextColor="#9ca3af"
                      keyboardType="numeric"
                      value={price.value}
                      onChangeText={price.onChange}
                    />
                  </View>
                </View>
              ))}
            </View>
            <View
              style={{
                flexDirection: "row",
                flexWrap: "wrap",
                gap: spacing.xs,
                marginBottom: spacing.xs
              }}
            >
              {PRICE_PRESETS.map((pP) => (
                <TouchableOpacity
                  key={pP.label}
                  onPress={() => handlerSetterPricePresetsPress(pP.min, pP.max)}
                  style={{
                    paddingBlock: spacing.sm,
                    paddingInline: spacing.lg,
                    borderRadius: radius.lg,
                    borderStyle: "solid",
                    borderWidth: 1,
                    borderColor: activePrice(pP.min, pP.max) ? colors.link : colors.border,
                    backgroundColor: activePrice(pP.min, pP.max) ? colors.link : colors.background
                  }}
                >
                  <Text
                    style={{
                      fontWeight: "semibold",
                      color: activePrice(pP.min, pP.max) ? colors.background : colors.border
                    }}
                  >{pP.label}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </ScrollView>
        <View
          style={{
            padding: spacing.sm,
          }}
        >
          <TouchableOpacity
            onPress={handlerApplyPress}
            style={{
              alignItems: "center",
              padding: spacing.md,
              borderRadius: radius.lg,
              borderStyle: "solid",
              borderWidth: 1,
              borderColor: colors.link,
              backgroundColor: colors.link
            }}
          >
            <Text
              style={{
                color: colors.background,
                fontWeight: "bold"
              }}
            >Apply Filter{activeCount > 0 ? `(${activeCount})` : ""}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  )
}
