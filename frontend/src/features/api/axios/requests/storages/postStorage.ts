import type { StorageType } from "@entities/Storages/types/storages.type";
import { axiosBase } from "../../axiosBase";

const postStorage = async (request: StorageType) => {
	const { storageName, ownerId, capacity, parentStorageId, isCell } = request;

	const requestJSON = JSON.stringify({
		storageName,
		parentStorageId,
		capacity,
		isCell,
		ownerId,
	});

	const response = await axiosBase.post("v1/storages/insert", requestJSON, {
		headers: { "Content-Type": "application/json" },
	});
	return response;
};

export default postStorage;
