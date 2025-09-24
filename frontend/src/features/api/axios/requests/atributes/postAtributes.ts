import { axiosBase } from "../../axiosBase";
import type { AtributesType } from "@widgets/atributes/types/atribute.type";

const postAtribute = async (request: AtributesType) => {
	const { attributeName, russianLabel, type } = request;

	const requestJSON = JSON.stringify({
		attributeName,
		russianLabel,
		type,
	});

	const response = await axiosBase.post(
		"v1/attributeType/insert",
		requestJSON,
		{
			headers: { "Content-Type": "application/json" },
		}
	);
	return response;
};

export default postAtribute;
