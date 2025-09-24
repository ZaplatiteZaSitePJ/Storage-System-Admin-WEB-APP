import type { ObjectType } from "@entities/Objects/types/objects.type";
import { axiosBase } from "../../axiosBase";
import type { StorageType } from "@entities/Storages/types/storages.type";
import getStorageSize from "../storages/getStorageSize";

const isStorage = (e: any): e is StorageType => {
	return e && "isCell" in e;
};

const getSubEntities = async (
	entitie: StorageType | ObjectType | undefined,
	onlyCell?: boolean
) => {
	let subStorages: StorageType[] = [];
	let subObjects: ObjectType[] = [];
	let rootStorages: StorageType[] = [];

	if (!entitie) {
		const ownerId = localStorage.getItem("userId");
		const response = await axiosBase.get(
			`v1/storages/owner/${ownerId}/roots`,
			{
				headers: { "Content-Type": "application/json" },
			}
		);
		rootStorages = await Promise.all(
			response.data.map(async (storage: StorageType) => {
				const size = await getStorageSize(storage.id);
				return { ...storage, items: size };
			})
		);
	}

	if (isStorage(entitie) && entitie?.innerStoragesIds) {
		const response = await axiosBase.get<StorageType[]>(
			`v1/storages/storage/${entitie.id}/inner`,
			{
				headers: { "Content-Type": "application/json" },
			}
		);

		subStorages = await Promise.all(
			response.data.map(async (storage) => {
				const size = await getStorageSize(storage.id);
				return { ...storage, items: size };
			})
		);
	}

	if (isStorage(entitie) && entitie?.isCell === true && !onlyCell) {
		const response = await axiosBase.get(
			`v1/items/storage/${entitie?.id}`,
			{
				headers: { "Content-Type": "application/json" },
			}
		);
		subObjects = response.data;
	}

	return [...subStorages, ...subObjects, ...rootStorages];
};

export default getSubEntities;
