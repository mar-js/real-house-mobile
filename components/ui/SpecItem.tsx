import { ISpecItem } from "@/global/interfaces"
import { size, spacing } from "@/theme"
import Ionicons from "@expo/vector-icons/Ionicons"
import { Text, View } from "react-native"
import { JSX } from "react/jsx-runtime"

export const SpecItem = ({ icon, label, value }: ISpecItem): JSX.Element =>  (
  <View
    style={{
      alignItems: "center",
      gap: spacing.xs
    }}
  >
    <Ionicons
      name={icon}
      size={size.sm}
      color="#2563eb"
    />
    <Text
      style={{
        color: "#3f3f3f",
        fontWeight: "bold",
        textTransform: "capitalize"
      }}
    >{value}</Text>
    <Text
      style={{
        color: "#9c9c9c",
        fontWeight: "bold"
      }}
    >{label}</Text>
  </View>
)
