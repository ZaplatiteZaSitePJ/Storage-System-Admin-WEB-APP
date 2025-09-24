import type { ObjectType } from "@entities/Objects/types/objects.type";
import type { StorageType } from "@entities/Storages/types/storages.type";

const entitieType = (entitie: StorageType | ObjectType | undefined) => {
	if (!entitie) return "storage";
	if (entitie !== undefined && "isCell" in entitie) {
		switch (entitie.isCell) {
			case true:
				return "cell";
			case false:
				return "storage";
		}
	}

	return "object";
};

export default entitieType;
