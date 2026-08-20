import { ICounter } from "@/global/interfaces";
import { colors, radius, size, spacing } from "@/theme";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Text, TouchableOpacity, View } from "react-native";
import { JSX } from "react/jsx-runtime";

export const Counter = ({ label, value, onChange }: ICounter): JSX.Element => (
  <View>
    <Text
      style={{
        fontWeight: "semibold",
        color: "#5c5c5c",
        marginBottom: spacing.xs
      }}
    >{label}</Text>
    <View
      style={{
        width: 150,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: colors.background,
        borderStyle: "solid",
        borderWidth: 1,
        borderColor: "#d9d7d7",
        borderRadius: radius.lg,
        overflow: "hidden"
      }}
    >
      <TouchableOpacity
        onPress={() => onChange(Math.max(1, value - 1))}
        style={{
          width: 50,
          height: 50,
          alignItems: "center",
          justifyContent: "center"
        }}
      >
        <Ionicons
          name="remove-circle-outline"
          size={size.sm}
          color="#374151"
        />
      </TouchableOpacity>
      <Text
        style={{
          textAlign: "center",
          color: "#313131",
          fontWeight: "bold",
        }}
      >{value}</Text>
      <TouchableOpacity
        onPress={() => onChange(value + 1)}
        style={{
          width: 50,
          height: 50,
          alignItems: "center",
          justifyContent: "center"
        }}
      >
        <Ionicons
          name="add-circle-outline"
          size={size.sm}
          color="#374151"
        />
      </TouchableOpacity>
    </View>
  </View>
)
