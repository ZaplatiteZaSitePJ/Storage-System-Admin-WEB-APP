import type { AdditionalParamsType } from "@entities/Objects/types/objects.type";
import { axiosBase } from "@features/api/axios/axiosBase";

export const convertObjectData = async (
	objectCustomAttributes: Record<string, string | number | Date>
): Promise<AdditionalParamsType[]> => {
	try {
		const requests = Object.entries(objectCustomAttributes).map(
			async ([attributeName, value]) => {
				const response = await axiosBase.get<AdditionalParamsType>(
					`v1/attributeType/get/${attributeName}`,
					{
						headers: { "Content-Type": "application/json" },
					}
				);
				return { ...response.data, attributeName, value };
			}
		);

		return await Promise.all(requests);
	} catch (error) {
		console.error(error);
		return [];
	}
};
