import { axiosBase } from "../../axiosBase";
import type { ObjectType } from "@entities/Objects/types/objects.type";

const getSomeObjects = async (
	request: object[]
): Promise<ObjectType[] | undefined> => {
	let response;

	const headers = {
		"Content-Type": "application/json",
	};

	if (request.length > 0) {
		response = await axiosBase.request({
			url: `v1/items/owner/${localStorage.getItem(
				"userId"
			)}/satisfyingAll`,
			method: "POST",
			data: request,
			headers,
		});
	} else {
		response = await axiosBase.get(
			`v1/items/owner/${localStorage.getItem("userId")}`,
			{ headers }
		);
	}

	return response?.data;
};

export default getSomeObjects;
