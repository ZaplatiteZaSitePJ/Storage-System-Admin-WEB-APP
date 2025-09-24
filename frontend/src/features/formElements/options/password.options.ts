export const passwordOption = {
	required: "Пароль обязателен",
	pattern: {
		value: /^(?=.*[A-Z])(?=.*[!@#$%^&*()_\-+=\[{\]};:'",.<>/?\\|`~])(?=.{8,})/,
		message: "",
	},
};
