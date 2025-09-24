import { axiosBase } from "../../axiosBase";

const deleteObject = async (id: string) => {
	try {
		const response = await axiosBase.delete(`v1/items/delete/${id}`, {
			headers: { "Content-Type": "application/json" },
		});

		return response.data;
	} catch (error) {
		console.log(error);
	}
};

export default deleteObject;
