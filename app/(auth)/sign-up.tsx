import {
	AuthScreenLayout,
	AuthSectionHeader,
	AuthVerifySection,
	SignUpForm,
} from "@/components/auth";
import { useAuth, useSignUp } from "@clerk/expo";
import { useRouter } from "expo-router";
import { useState } from "react";

export default function SignUp() {
	const { isSignedIn, isLoaded: authLoaded } = useAuth();
	const { signUp, errors, fetchStatus } = useSignUp();
	const router = useRouter();
	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");
	const [emailAddress, setEmailAddress] = useState("");
	const [password, setPassword] = useState("");
	const [code, setCode] = useState("");
	const isLoading = fetchStatus === "fetching";
	const [forceReset, setForceReset] = useState(false);

	if (!authLoaded) return null;
	if (isSignedIn) return null;

	const conditionVerifyCode =
		!forceReset &&
		signUp?.status === "missing_requirements" &&
		signUp?.unverifiedFields?.includes("email_address") &&
		signUp?.missingFields?.length === 0;

	if (signUp?.status === "complete") return null;

	const handlerSignUpPress = async () => {
		setForceReset(false);

		const { error } = await signUp.password({
			firstName,
			lastName,
			emailAddress,
			password,
		});

		if (error) {
			alert(error.message);
			return;
		}

		await signUp.verifications.sendEmailCode();
	};

	const handlerVerifyCodePress = async () => {
		await signUp.verifications.verifyEmailCode({ code })

		if (signUp.status === "complete") {
			await signUp.finalize({
				navigate: ({ decorateUrl }) => {
					const url = decorateUrl("/") as any;
					router.replace(url);
				},
			});
		}
	};

	const handlerRetryVerifyCodePress = () => {
		signUp.verifications.sendEmailCode();
	};

	const handlerCancelSignUpPress = () => {
		setFirstName("");
		setLastName("");
		setEmailAddress("");
		setPassword("");
		setCode("");
		setForceReset(true);
	};

	return (
		<AuthScreenLayout>
			{conditionVerifyCode ? (
				<AuthVerifySection
					emailAddress={emailAddress}
					code={code}
					setCode={setCode}
					errors={errors}
					isLoading={isLoading}
					handlerVerifyCodePress={handlerVerifyCodePress}
					handlerRetryVerifyCodePress={handlerRetryVerifyCodePress}
					handlerCancelSignUpPress={handlerCancelSignUpPress}
				/>
			) : (
				<>
					<AuthSectionHeader
						title="Create account"
						subtitle="Find your dream home today"
					/>
					<SignUpForm
						firstName={firstName}
						setFirstName={setFirstName}
						lastName={lastName}
						setLastName={setLastName}
						emailAddress={emailAddress}
						setEmailAddress={setEmailAddress}
						password={password}
						setPassword={setPassword}
						errors={errors}
						isLoading={isLoading}
						handlerSignUpPress={handlerSignUpPress}
					/>
				</>
			)}
		</AuthScreenLayout>
	);
}
