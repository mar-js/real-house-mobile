import type { SignUpErrors } from "@clerk/expo/types"
import type { Dispatch, SetStateAction } from "react"

export interface IFormSignUp {
  firstName: string
  setFirstName: Dispatch<SetStateAction<string>>
  lastName: string
  setLastName: Dispatch<SetStateAction<string>>
  emailAddress: string
  setEmailAddress: Dispatch<SetStateAction<string>>
  password: string
  setPassword: Dispatch<SetStateAction<string>>
  errors: SignUpErrors
  isLoading: boolean
  handlerSignUpPress: () => Promise<void>
}
