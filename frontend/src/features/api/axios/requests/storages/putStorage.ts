import type { StorageType } from "@entities/Storages/types/storages.type";
import { axiosBase } from "../../axiosBase";

const putStorage = async (request: StorageType, id: number) => {
	const { storageName, ownerId, capacity, parentStorageId, isCell } = request;

	const requestJSON = JSON.stringify({
		storageName,
		parentStorageId,
		capacity,
		isCell,
		ownerId,
	});

	const response = await axiosBase.put(
		`v1/storages/update/${id}`,
		requestJSON,
		{
			headers: { "Content-Type": "application/json" },
		}
	);
	return response;
};

export default putStorage;
