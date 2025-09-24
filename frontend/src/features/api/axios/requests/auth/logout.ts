import { axiosBase } from "../../../axios/axiosBase";

const logout = async () => {
	const response = await axiosBase.post("/logout", {
		headers: {
			"Content-Type": "application/json",
		},
	});

	localStorage.clear();

	return response.data;
};

export default logout;
