import { axiosBase } from "../../axiosBase";
import type { LoaderFunctionArgs } from "react-router-dom";
import getStorageSize from "./getStorageSize";

const getStorageUnit = async ({ params }: LoaderFunctionArgs) => {
	const { id } = params;

	const size = await getStorageSize(Number(id));

	const response = await axiosBase.get(`v1/storages/storage/${id}`, {
		headers: { "Content-Type": "application/json" },
	});

	return { ...response.data, items: size };
};

export default getStorageUnit;
