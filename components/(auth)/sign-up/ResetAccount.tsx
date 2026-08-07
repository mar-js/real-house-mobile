import { IResetAccount } from "@/global/interfaces";
import { Text, TouchableOpacity } from "react-native";
import { JSX } from "react/jsx-runtime";

export const ResetAccount = ({ handlerCancelSignUpPress }: IResetAccount): JSX.Element => (
  <TouchableOpacity onPress={handlerCancelSignUpPress}>
    <Text
      style={{
        color: "#fc6d6d",
      }}
    >Try again with another email</Text>
  </TouchableOpacity>
)
