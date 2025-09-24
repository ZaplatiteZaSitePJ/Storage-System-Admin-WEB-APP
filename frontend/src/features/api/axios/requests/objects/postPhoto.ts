import { axiosBase } from "../../axiosBase";

const postPhoto = async (file: File, photoName: string) => {
	const formData = new FormData();
	formData.append("photo", file);
	formData.append("photoName", photoName);

	try {
		const response = await axiosBase.post("/v1/photos/save", formData, {
			headers: {
				"Content-Type": "multipart/form-data",
			},
		});

		return response.data.id;
	} catch (error) {
		console.error("Ошибка загрузки фото:", error);
		throw error;
	}
};

export default postPhoto;
