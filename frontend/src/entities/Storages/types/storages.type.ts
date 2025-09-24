export type StorageType = {
	id: number;
	parentStorageId?: number | null;
	storageName: string;
	capacity: number;
	ownerId?: string | null;
	isCell: boolean;
	items: number;
	innerStoragesIds?: [number];
};
