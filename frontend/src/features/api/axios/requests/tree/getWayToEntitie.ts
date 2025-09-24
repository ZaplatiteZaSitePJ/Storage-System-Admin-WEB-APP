import type { StorageType } from "@entities/Storages/types/storages.type";
import { axiosBase } from "../../axiosBase";
import type { ObjectType } from "@entities/Objects/types/objects.type";

export const getWayToEntitie = async (id: string) => {
	const way: (string | number)[] = [];
	const entitiesArray: (StorageType | ObjectType)[] = [];

	try {
		if (!isNaN(Number(id)) && Number.isInteger(Number(id))) {
			const { data } = await axiosBase.get(`v1/storages/storage/${id}`, {
				headers: { "Content-Type": "application/json" },
			});

			way.push(data.id);
			entitiesArray.push(data);
		} else {
			const { data } = await axiosBase.get(`v1/items/item/${id}`, {
				headers: { "Content-Type": "application/json" },
			});

			way.push(data.id);
			entitiesArray.push(data);
		}
	} catch (error) {
		console.log(error);
	} finally {
		while (entitiesArray[entitiesArray.length - 1].parentStorageId) {
			try {
				const { data } = await axiosBase.get(
					`v1/storages/storage/${
						entitiesArray[entitiesArray.length - 1].parentStorageId
					}`,
					{
						headers: { "Content-Type": "application/json" },
					}
				);
				way.push(data.id);
				entitiesArray.push(data);
			} catch (error) {
				console.log(error);
			}
		}
	}

	way.push(0);

	return way;
};
