import type { SignInErrors, SignUpErrors } from "@clerk/expo/types";
import type { Dispatch, SetStateAction } from "react";

export interface IButtonActionSignIn {
	text: string;
	handlerPress: () => Promise<void>;
	isDisabled: boolean;
}

export interface IVerifyAccountSignIn {
	code: string;
	setCode: Dispatch<SetStateAction<string>>;
	isLoading: boolean;
	errors: SignInErrors;
	handlerVerifyCodePress: () => Promise<void>;
	handlerRetryVerifyCodePress: () => void;
}


export interface IFormSignIn {
	emailAddress: string;
	setEmailAddress: Dispatch<SetStateAction<string>>;
	password: string;
	setPassword: Dispatch<SetStateAction<string>>;
	errors: SignInErrors;
	isLoading: boolean;
	handlerSignInPress: () => Promise<void>;
}

export interface IResetAccount {
	handlerCancelSignUpPress: () => void
}

export interface IFormSignUp {
	firstName: string;
	setFirstName: Dispatch<SetStateAction<string>>;
	lastName: string;
	setLastName: Dispatch<SetStateAction<string>>;
	emailAddress: string;
	setEmailAddress: Dispatch<SetStateAction<string>>;
	password: string;
	setPassword: Dispatch<SetStateAction<string>>;
	errors: SignUpErrors;
	isLoading: boolean;
	handlerSignUpPress: () => Promise<void>;
}

export interface IButtonActionSignUp {
	text: string;
	handlerPress: () => Promise<void>;
	isDisabled: boolean;
}

export interface IVerifyAccountSignUp {
	code: string;
	setCode: Dispatch<SetStateAction<string>>;
	isLoading: boolean;
	errors: SignUpErrors;
	handlerVerifyCodePress: () => Promise<void>;
	handlerRetryVerifyCodePress: () => void;
}
