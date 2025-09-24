import { axiosBase } from "../../axiosBase";

const getCategories = async (prefix: string) => {
	try {
		const response = await axiosBase.get(
			`v1/category/startsWith/${prefix}`,
			{
				headers: { "Content-Type": "application/json" },
			}
		);
		return response.data;
	} catch (error) {
		console.log(error);
	}
};

export default getCategories;
