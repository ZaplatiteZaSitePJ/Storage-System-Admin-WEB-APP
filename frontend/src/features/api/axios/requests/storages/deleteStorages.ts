import { axiosBase } from "../../axiosBase";

const deleteStorage = async (id: number, replaceId: number | undefined) => {
	switch (replaceId) {
		case undefined:
			try {
				const response = await axiosBase.delete(
					`v1/storages/delete/${id}`,
					{
						headers: { "Content-Type": "application/json" },
					}
				);

				return response.data;
			} catch (error) {
				console.log(error);
			}
			return;

		case replaceId:
			try {
				const response = await axiosBase.delete(
					`v1/storages/delete/${id}/move/${replaceId}`,
					{
						headers: { "Content-Type": "application/json" },
					}
				);

				return response.data;
			} catch (error) {
				console.log(error);
			}
			return;

		default:
			return;
	}
};

export default deleteStorage;
