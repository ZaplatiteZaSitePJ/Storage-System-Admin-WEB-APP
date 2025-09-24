import { axiosBase } from "../../axiosBase";

const getStorageSize = async (id: number) => {
	let response = { data: 0 };

	try {
		response = await axiosBase.get(`v1/storages/storage/${id}/size`, {
			headers: { "Content-Type": "application/json" },
		});
	} catch {
		response.data = 0;
	}

	return response.data;
};

export default getStorageSize;
