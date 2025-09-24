import type { StorageType } from "@entities/Storages/types/storages.type";

const selectFilter = (array: StorageType[], sortBy: string | undefined) => {
	switch (sortBy) {
		case "topLevel":
			return [...array].filter(
				(storage) => storage.parentStorageId === null
			);
		case "with_cell":
			return [...array];

		case "all":
			return [...array].filter((storage) => storage.isCell === false);

		default:
			return array;
	}
};

const nameFilter = (array: StorageType[], name: string | undefined) => {
	if (array === undefined || name === undefined) {
		return array;
	}

	return [...array].filter((element) => {
		const elementName = element.storageName.toLowerCase();
		const nameSort = name.toLowerCase();

		return elementName.includes(nameSort);
	});
};

export default function storageFiltration(
	name: string | undefined,
	sortBy: string | undefined,
	array: StorageType[]
) {
	const filtredBySort = selectFilter(array, sortBy);
	const filtredByName = nameFilter(filtredBySort, name);
	return filtredByName;
}
