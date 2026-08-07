import { Form } from "@/components/(auth)/sign-up/form";
import { VerifyAccount } from "@/components/(auth)/sign-up/verifyAccount";
import { useAuth, useSignUp } from "@clerk/expo";
import { useRouter } from "expo-router";
import { useState } from "react";
import { Image, ScrollView, Text, View } from "react-native";

export default function SignUp() {
	const { signUp, errors, fetchStatus } = useSignUp();
	const { isSignedIn } = useAuth();
	const router = useRouter();
	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");
	const [emailAddress, setEmailAddress] = useState("");
	const [password, setPassword] = useState("");
	const [code, setCode] = useState("");
	const isLoading = fetchStatus === "fetching";
	const conditionVerifyCode =
		signUp.status === "missing_requirements" &&
		signUp.unverifiedFields.includes("email_address") &&
		signUp.missingFields.length === 0;

	if (signUp.status === "complete" || isSignedIn) return null;

	const handlerSignUpPress = async () => {
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
		await signUp.verifications.verifyEmailCode({
			code,
		});

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
						<VerifyAccount
							code={code}
							setCode={setCode}
							errors={errors}
							isLoading={isLoading}
							handlerVerifyCodePress={handlerVerifyCodePress}
							handlerRetryVerifyCodePress={handlerRetryVerifyCodePress}
						/>
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
								Create account
							</Text>
							<Text
								style={{
									color: "#bababa",
								}}
							>
								Find your dream home today
							</Text>
						</View>
						<Form
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
			</View>
		</ScrollView>
	);
}
