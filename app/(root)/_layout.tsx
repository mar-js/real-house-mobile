import { useAuth } from "@clerk/expo";
import { Redirect } from "expo-router";

export default function RootLayout() {
  const { isSignedIn, isLoaded } = useAuth()

  // clerk + supabase

  if (!isLoaded) return null

  if (isSignedIn) return <Redirect href="/(root)/(tabs)" />

  return <Redirect href="/sign-in" />
}
