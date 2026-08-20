import { IToggle } from "@/global/interfaces";
import { radius, size, spacing } from "@/theme";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Text, TouchableOpacity, View } from "react-native";
import { JSX } from "react/jsx-runtime";

export const Toggle = ({
  label,
  value,
  onChange,
  description
}: IToggle): JSX.Element => (
  <TouchableOpacity
    onPress={() => onChange(!value)}
    style={{
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      padding: spacing.sm,
      borderRadius: radius.lg,
      borderStyle: "solid",
      borderWidth: 1,
      backgroundColor: value ? "#e5f7ff" : "#ffffff",
      borderColor: value ? "#b1e8ff" : "#e1e1e1",
    }}
  >
    <View>
      <Text
        style={{
          fontWeight: "semibold",
          color: value ? "#4e72ff" : "#585858"
        }}
      >{label}</Text>
      {description && (
        <Text
          style={{
            marginTop: spacing.xs,
            color: "#b4b4b4",
            fontSize: 10
          }}
        >{description}</Text>
      )}
    </View>
    <View
      style={{
        borderRadius: radius.lg,
        borderStyle: "solid",
        alignItems: "center",
        justifyContent: "center",
        borderWidth: 1,
        backgroundColor: value ? "#2c51e4" : "#a5a5a5",
        borderColor: value ? "#2c51e4" : "#a5a5a5",
        padding: spacing.xs
      }}
    >
      {value && (
        <Ionicons
          name="checkmark-done-outline"
          size={size.xs}
          color="#ffffff"
        />
      )}
    </View>
  </TouchableOpacity>
)
