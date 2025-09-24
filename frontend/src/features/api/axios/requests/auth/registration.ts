import type { UserType } from "@entities/User/types/user.type";
import { axiosBase } from "./axiosAuthBase";

type RegisterType = Pick<UserType, "email" | "password" | "userName">;

const registration = async (request: RegisterType) => {
	const { userName, password, email } = request;

	const requestJSON = JSON.stringify({ userName, password, email });

	const response = await axiosBase.post("auth/registration", requestJSON, {
		headers: {
			"Content-Type": "application/json",
		},
	});
	return response;
};

export default registration;
