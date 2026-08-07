import { Form } from "@/components/(auth)/sign-in/form";
import { ResetAccount } from "@/components/(auth)/sign-in/resetAccount";
import { VerifyAccount } from "@/components/(auth)/sign-in/verifyAccount";
import { useSignIn } from "@clerk/expo";
import { useRouter } from "expo-router";
import { useState } from "react";
import { Image, ScrollView, Text, View } from "react-native";

export default function SignIn() {
	const { signIn, errors, fetchStatus } = useSignIn();
	const router = useRouter();
	const [emailAddress, setEmailAddress] = useState("");
	const [password, setPassword] = useState("");
	const [code, setCode] = useState("");
	const isLoading = fetchStatus === "fetching";

	const [forceReset, setForceReset] = useState(false);

	const conditionVerifyCode = !forceReset && signIn.status === "needs_client_trust"

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
			await signIn.mfa.sendPhoneCode()
			return
		}

		if (signIn.status === "needs_client_trust") {
			const emailCodeFactor = signIn.supportedFirstFactors.find((factor) => factor.strategy === "email_code")

			if (emailCodeFactor) {
				await signIn.mfa.sendEmailCode()
			}

			return
		}

		alert(`Sign in attempt not complete ${signIn}`)
	};

	const handlerVerifyCodePress = async () => {
		await signIn.mfa.verifyEmailCode({
			code,
		});

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
		<ScrollView
			contentContainerStyle={{
				flexGrow: 1,
				backgroundColor: "#ffffff",
			}}
			keyboardShouldPersistTaps="handled"
		>
			<View
				style={{
					flexGrow: 1,
					justifyContent: "center",
					padding: 20,
				}}
			>
				<Image
					source={require("@/assets/images/logo.png")}
					style={{
						width: 100,
						height: 100,
					}}
					resizeMode="contain"
				/>
				{conditionVerifyCode ? (
					<>
						<View
							style={{
								marginBlock: 10,
							}}
						>
							<Text
								style={{
									fontSize: 30,
									fontWeight: "bold",
									color: "#1f2937",
								}}
							>
								Verify your account
							</Text>
							<Text
								style={{
									color: "#bababa",
								}}
							>
								We sent a code to {emailAddress}
							</Text>
						</View>
						<View style={{ gap: 50 }}>
							<VerifyAccount
								code={code}
								setCode={setCode}
								errors={errors}
								isLoading={isLoading}
								handlerVerifyCodePress={handlerVerifyCodePress}
								handlerRetryVerifyCodePress={handlerRetryVerifyCodePress}
							/>
							<ResetAccount
								handlerCancelSignUpPress={handlerCancelSignUpPress}
							/>
						</View>
					</>
				) : (
					<>
						<View
							style={{
								marginBlock: 10,
							}}
						>
							<Text
								style={{
									fontSize: 30,
									fontWeight: "bold",
									color: "#1f2937",
								}}
							>
								Welcome back
							</Text>
							<Text
								style={{
									color: "#bababa",
								}}
							>
								Sign in to your account
							</Text>
						</View>
						<Form
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
			</View>
		</ScrollView>
	);
}
