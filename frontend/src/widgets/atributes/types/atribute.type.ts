export type AtributesType = {
	id: number;
	attributeName: string;
	russianLabel: string;
	type: "STRING" | "NUMBER" | "DATE";
	value?: string | number | Date;
};
