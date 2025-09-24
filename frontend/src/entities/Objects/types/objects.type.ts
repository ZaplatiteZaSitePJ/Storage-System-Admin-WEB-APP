export type ObjectStatus =
	| "WRITTEN_OFF"
	| "STORED"
	| "BORROWED"
	| "RESERVED"
	| undefined;

export type AdditionalParamsType = {
	id: number;
	attributeName: string;
	russianLabel: string;
	type: string;
	value?: string | number | Date;
};

export type ObjectType = {
	type?: string;
	parentStorageId: number;
	size?: number;
	status?: ObjectStatus;
	photoId: number;

	_id: string;
	objectName?: string;

	customAttributes?: AdditionalParamsType[];
};
