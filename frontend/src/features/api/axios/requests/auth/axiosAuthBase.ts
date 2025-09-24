import axios from "axios";

export const axiosBase = axios.create({
	baseURL: import.meta.env.VITE_API_BASE_URL,
	timeout: 10000,
	//withCredentials: true,
});
