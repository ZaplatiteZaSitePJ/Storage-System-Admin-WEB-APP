import { axiosBase } from "../../axiosBase";

const putPhoto = async (file: File, photoName: string, id: number) => {
	const formData = new FormData();
	formData.append("photo", file);
	formData.append("photoName", photoName);

	try {
		const response = await axiosBase.put(
			`/v1/photos/update/${id}`,
			formData,
			{
				headers: {
					"Content-Type": "multipart/form-data",
				},
			}
		);

		return response.data.id;
	} catch (error) {
		console.error("Ошибка загрузки фото:", error);
		throw error;
	}
};

export default putPhoto;
