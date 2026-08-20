import { useAuth } from "@clerk/expo"
import { useCallback, useEffect, useId, useState } from "react"
import { useSupabase } from "./useSupabase"

interface IUseSavedProperty {
  propertyId: string
  onUnsave?: () => void
}

export const useSavedProperty = ({ propertyId, onUnsave }: IUseSavedProperty) => {
  const { userId } = useAuth()
  const client = useSupabase()
  const [isSaved, setIsSaved] = useState(false)
  const [saveLoading, setSaveLoading] = useState(false)

  const checkIfSaved = useCallback(async () => {
    if (!userId) return

    try {
      const { data } = await client
        .from("saved_properties")
        .select("id")
        .eq("user_clerk_id", userId)
        .eq("property_id", propertyId)
        .single()

      setIsSaved(Boolean(data) || false)
    } catch (error) {
      setIsSaved(false)
    }
  }, [propertyId, useId])

  const toggleSave = async () => {
    if (!userId || saveLoading) return

    setSaveLoading(true)

    if (isSaved) {
      try {
        await client
          .from("saved_properties")
          .delete()
          .eq("user_clerk_id", userId)
          .eq("property_id", propertyId)

        setIsSaved(false)
        onUnsave?.()
        setSaveLoading(false)
      } catch (error) {
        setIsSaved(false)
        setSaveLoading(false)
        throw new Error("Error in toggle saved property");
      }
    } else {
      try {
        await client
          .from("saved_properties")
          .insert({
            user_clerk_id: userId,
            property_id: propertyId
          })

        setIsSaved(true)
        setSaveLoading(false)
      } catch (error) {
        setIsSaved(false)
        setSaveLoading(false)
        throw new Error("Error in toggle save property");
      }
    }
  }

  useEffect(() => {
    checkIfSaved()
  }, [propertyId, useId])


  return {
    isSaved,
    saveLoading,
    toggleSave
  }
}
