import axios from "axios";

let navigateCallback: ((path: string) => void) | null = null;

// Функция для установки navigate из компонента
export const setNavigate = (cb: (path: string) => void) => {
	navigateCallback = cb;
};

export const axiosBase = axios.create({
	baseURL: import.meta.env.VITE_API_BASE_URL,
	timeout: 10000,
	withCredentials: true,
});

// Request interceptor — добавляем токен
axiosBase.interceptors.request.use(
	(config) => {
		const token = localStorage.getItem("accessToken");
		if (token) {
			config.headers.Authorization = `Bearer ${token}`;
		}
		return config;
	},
	(error) => Promise.reject(error)
);

// Response interceptor — глобальная обработка 401/403
axiosBase.interceptors.response.use(
	(response) => response,
	(error) => {
		if (
			error.response?.status === 401 ||
			error.response?.status === 403 ||
			!localStorage.getItem("accessToken")
		) {
			localStorage.clear();
			// Редирект через React Router, если установлен navigate
			if (navigateCallback) {
				navigateCallback("/auth");
			} else {
				// fallback: перезагрузка страницы
				window.location.replace("/auth");
			}
		}
		return Promise.reject(error);
	}
);
