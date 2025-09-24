import { axiosBase } from "../../axiosBase";
import getStorageSize from "./getStorageSize";

const getStorages = async () => {
	const ownerId = localStorage.getItem("userId");

	const response = await axiosBase.get(`v1/storages/owner/${ownerId}/all`, {
		headers: { "Content-Type": "application/json" },
	});

	let sizedArray = [];

	for (let i = 0; i < response.data.length; i++) {
		const size = await getStorageSize(response.data[i].id);

		sizedArray[i] = { ...response.data[i], items: size };
	}

	return sizedArray;
};

export default getStorages;
