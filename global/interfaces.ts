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

export interface IButtonActionSignUp {
  text: string
  handlerPress: () => Promise<void>
  isDisabled: boolean
}

export interface IVerifyAccountSignUp {
  code: string
  setCode: Dispatch<SetStateAction<string>>
  isLoading: boolean
  errors: SignUpErrors
  handlerVerifyCodePress: () => Promise<void>
}
