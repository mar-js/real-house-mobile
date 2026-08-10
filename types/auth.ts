import type { SignInErrors, SignUpErrors } from "@clerk/expo/types";
import type { Dispatch, SetStateAction } from "react";

export interface IButtonAction {
	text: string;
	handlerPress: () => Promise<void>;
	isDisabled: boolean;
}

export interface IResetAccount {
	handlerCancelSignUpPress: () => void;
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

export interface IVerifyAccount {
	code: string;
	setCode: Dispatch<SetStateAction<string>>;
	isLoading: boolean;
	errors: SignInErrors | SignUpErrors;
	handlerVerifyCodePress: () => Promise<void>;
	handlerRetryVerifyCodePress: () => void;
}

export interface IAuthSectionHeader {
	title: string;
	subtitle: string;
}

export interface IAuthVerifySection extends IVerifyAccount, IResetAccount {
	emailAddress: string;
}
