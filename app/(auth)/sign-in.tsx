import {
	AuthScreenLayout,
	AuthSectionHeader,
	AuthVerifySection,
	SignInForm,
} from "@/components/auth";
import { useSignIn } from "@clerk/expo";
import { useRouter } from "expo-router";
import { useState } from "react";

export default function SignIn() {
	const { signIn, errors, fetchStatus } = useSignIn();
	const router = useRouter();
	const [emailAddress, setEmailAddress] = useState("");
	const [password, setPassword] = useState("");
	const [code, setCode] = useState("");
	const isLoading = fetchStatus === "fetching";
	const [forceReset, setForceReset] = useState(false);

	const conditionVerifyCode =
		!forceReset && signIn.status === "needs_client_trust";

	const handlerSignInPress = async () => {
		setForceReset(false);

		const { error } = await signIn.password({
			emailAddress,
			password,
		});

		if (error) {
			alert(error.message);
			return;
		}

		if (signIn.status === "complete") {
			await signIn.finalize({
				navigate: ({ session, decorateUrl }) => {
					if (session?.currentTask) {
						console.log(session?.currentTask)
						return
					}

					const url = decorateUrl("/") as any;
					router.replace(url);
				},
			});
		}

		if (signIn.status === "needs_second_factor") {
			await signIn.mfa.sendPhoneCode();
			return;
		}

		if (signIn.status === "needs_client_trust") {
			const emailCodeFactor = signIn.supportedFirstFactors.find(
				(factor) => factor.strategy === "email_code",
			);

			if (emailCodeFactor) {
				await signIn.mfa.sendEmailCode();
			}

			return;
		}

		alert(`Sign in attempt not complete ${signIn}`);
	};

	const handlerVerifyCodePress = async () => {
		await signIn.mfa.verifyEmailCode({ code });

		if (signIn.status === "complete") {
			await signIn.finalize({
				navigate: ({ session, decorateUrl }) => {
					if (session?.currentTask) {
						console.log(session?.currentTask);
						return;
					}

					const url = decorateUrl("/") as any;
					router.replace(url);
				},
			});
		}
	};

	const handlerRetryVerifyCodePress = () => {
		signIn.mfa.sendEmailCode();
	};

	const handlerCancelSignUpPress = () => {
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
						title="Welcome back"
						subtitle="Sign in to your account"
					/>
					<SignInForm
						emailAddress={emailAddress}
						setEmailAddress={setEmailAddress}
						password={password}
						setPassword={setPassword}
						errors={errors}
						isLoading={isLoading}
						handlerSignInPress={handlerSignInPress}
					/>
				</>
			)}
		</AuthScreenLayout>
	);
}
