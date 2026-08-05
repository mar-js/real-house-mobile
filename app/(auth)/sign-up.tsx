import { Image, ScrollView, View } from "react-native";

export default function SignUp() {
  return (
    <ScrollView
      className="bg-white flex-grow"
      keyboardShouldPersistTaps="handled"
    >
      <View className="flex-1 justify-center px-6 py-11">
        <Image
          source={require("@/assets/images/logo.png")}
          className="w-32 h-16 mb-8 object-contain"
        />
      </View>
    </ScrollView>
  )
}
