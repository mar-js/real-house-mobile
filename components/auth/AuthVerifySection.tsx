import { spacing } from "@/theme";
import type { IAuthVerifySection } from "@/types/auth";
import { View } from "react-native";
import type { JSX } from "react/jsx-runtime";
import { AuthSectionHeader } from "./AuthSectionHeader";
import { ResetAccount } from "./ResetAccount";
import { VerifyAccount } from "./VerifyAccount";

export const AuthVerifySection = ({
	emailAddress,
	code,
	setCode,
	isLoading,
	errors,
	handlerVerifyCodePress,
	handlerRetryVerifyCodePress,
	handlerCancelSignUpPress,
}: IAuthVerifySection): JSX.Element => (
	<>
		<AuthSectionHeader
			title="Verify your account"
			subtitle={`We sent a code to ${emailAddress}`}
		/>
		<View style={{ gap: spacing.xl }}>
			<VerifyAccount
				code={code}
				setCode={setCode}
				errors={errors}
				isLoading={isLoading}
				handlerVerifyCodePress={handlerVerifyCodePress}
				handlerRetryVerifyCodePress={handlerRetryVerifyCodePress}
			/>
			<ResetAccount handlerCancelSignUpPress={handlerCancelSignUpPress} />
		</View>
	</>
);
