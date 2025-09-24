import { axiosBase } from "../../axiosBase";
import type { LoaderFunctionArgs } from "react-router-dom";

const getObjectUnit = async ({ params }: LoaderFunctionArgs) => {
	const { id } = params;

	const response = await axiosBase.get(`v1/items/item/${id}`, {
		headers: { "Content-Type": "application/json" },
	});

	return response.data;
};

export default getObjectUnit;
