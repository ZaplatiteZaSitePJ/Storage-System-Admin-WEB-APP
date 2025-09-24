import { axiosBase } from "../../axiosBase";

const getAtributesStartsWith = async (prefix: string) => {
	try {
		const response = await axiosBase.get(
			`v1/attributeType/russian/startsWith/${prefix}`,
			{
				headers: { "Content-Type": "application/json" },
			}
		);
		return response.data;
	} catch (error) {
		console.log(error);
	}
};

export default getAtributesStartsWith;
