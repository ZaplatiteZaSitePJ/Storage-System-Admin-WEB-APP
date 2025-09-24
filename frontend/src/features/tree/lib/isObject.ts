import type { ObjectType } from "@entities/Objects/types/objects.type";
import type { StorageType } from "@entities/Storages/types/storages.type";

export function isObjectType(
	entitie: ObjectType | StorageType
): entitie is ObjectType {
	return "_id" in entitie;
}
