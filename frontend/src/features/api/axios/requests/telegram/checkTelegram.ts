import { axiosBase } from "../../axiosBase";

const checkTelegram = async (userId: number) => {
	const response = await axiosBase.get(`v1/telegram/check-status/${userId}`, {
		headers: { "Content-Type": "application/json" },
	});
	return response;
};

export default checkTelegram;
