import { axiosBase } from "../../axiosBase";
import type { ObjectType } from "@entities/Objects/types/objects.type";

const postObject = async (request: ObjectType) => {
	const {
		type,
		parentStorageId,
		size,
		status,
		photoId,
		customAttributes,
		objectName,
	} = request;

	const requestJSON = JSON.stringify({
		type,
		objectName,
		parentStorageId,
		size: Number(size),
		status,
		photoId,
		customAttributes,
	});

	const response = await axiosBase.post("v1/items/insert", requestJSON, {
		headers: { "Content-Type": "application/json" },
	});
	return response;
};

export default postObject;
