import { convertObjectData } from "@features/attributes/convertObjectData";

const parseFormSearch = async (values: object) => {
	try {
		const parsed = await convertObjectData(
			values as Record<string, string | number | Date>
		);

		const request = parsed.map((atribute) => {
			switch (true) {
				case atribute.value === "":
				case atribute.value === null:
				case atribute.value === undefined:
					return {
						filterMethod: "EXISTS",
						attributeName: atribute.attributeName,
						val: atribute.value,
					};

				// непустое значение
				case atribute.type === "STRING":
					return {
						filterMethod: "STARTS_WITH",
						attributeName: atribute.attributeName,
						val: atribute.value,
					};

				case atribute.type === "DATE":
					return {
						filterMethod: "EQUALS",
						attributeName: atribute.attributeName,
						val: atribute.value,
					};

				case atribute.type === "NUMBER":
					return {
						filterMethod: "EQUALS",
						attributeName: atribute.attributeName,
						val: Number(atribute.value),
					};

				default:
					return {
						filterMethod: "EQUALS",
						attributeName: atribute.attributeName,
						val: atribute.value,
					};
			}
		});

		return request;
	} catch (error) {
		console.error(error);
		return [];
	}
};

export default parseFormSearch;
