import { IMenuItem } from "@/global/interfaces";
import { radius, size, spacing } from "@/theme";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Text, TouchableOpacity, View } from "react-native";
import { JSX } from "react/jsx-runtime";

export const MenuItem = ({ icon, label, onPress }: IMenuItem): JSX.Element => (
  <TouchableOpacity
    onPress={onPress}
    style={{
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      padding: spacing.md,
      borderRadius: radius.lg,
      marginBlock: spacing.xs,
      borderStyle: "solid",
      borderWidth: 1,
      borderColor: "#6b7280"
    }}
  >
    <View
      style={{
        flexDirection: "row",
        gap: spacing.xs,
      }}
    >
      <Ionicons
        name={icon}
        size={size.sm}
        color="#6b7280"
      />
      <Text
        style={{
          color: "#2a2a2a",
          fontWeight: "medium",
        }}
      >{label}</Text>
    </View>
    <Ionicons
      name="chevron-forward-circle-outline"
      size={size.xs}
      color="#6b7280"
    />
  </TouchableOpacity>
)
