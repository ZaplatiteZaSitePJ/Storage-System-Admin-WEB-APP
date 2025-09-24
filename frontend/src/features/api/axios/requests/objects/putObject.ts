import { axiosBase } from "../../axiosBase";
import type { ObjectType } from "@entities/Objects/types/objects.type";

const putObject = async (request: ObjectType, id: string) => {
	const {
		objectName,
		type,
		status,
		size,
		parentStorageId,
		photoId,
		customAttributes,
	} = request;

	const requestJSON = JSON.stringify({
		type,
		objectName,
		parentStorageId,
		size,
		status,
		photoId,
		customAttributes,
	});

	try {
		const response = await axiosBase.put(
			`v1/items/update/${id}`,
			requestJSON,
			{
				headers: { "Content-Type": "application/json" },
			}
		);
		return response;
	} catch (error) {
		console.log(error);
	}
};

export default putObject;
