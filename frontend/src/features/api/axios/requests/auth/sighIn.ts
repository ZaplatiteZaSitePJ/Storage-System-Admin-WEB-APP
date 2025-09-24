import type { UserType } from "@entities/User/types/user.type";
import { axiosBase } from "./axiosAuthBase";

type SignInType = Pick<UserType, "email" | "password">;

const signIn = async (request: SignInType) => {
	const response = await axiosBase.post("auth/sign-in", request, {
		headers: {
			"Content-Type": "application/json",
		},
	});
	const { token, refreshToken, userId } = response.data;

	localStorage.setItem("accessToken", token);
	localStorage.setItem("refreshToken", refreshToken);
	localStorage.setItem("userId", userId);

	return response.data;
};

export default signIn;
