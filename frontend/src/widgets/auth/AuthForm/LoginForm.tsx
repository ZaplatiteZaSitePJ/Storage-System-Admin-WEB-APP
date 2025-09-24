import { useForm } from "react-hook-form";
import EmailField from "@features/formElements/ui/AuthElements/EmailField";
import PasswordField from "@features/formElements/ui/AuthElements/PasswordField";
import styles from "./AuthForm.module.scss";
import type { UserType } from "@entities/User/types/user.type";
import { ButtonText } from "@shared/ui/ui-kit";
import signIn from "@features/api/axios/requests/auth/sighIn";
import { useState } from "react";
import cn from "classnames";
import { useNavigate } from "react-router-dom";

export default function LoginForm() {
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [error, setIsError] = useState<boolean>(false);

	const navigate = useNavigate();

	const { register, handleSubmit, reset, getValues } =
		useForm<Pick<UserType, "email" | "password">>();

	const onLogin = async () => {
		setIsLoading(true);

		try {
			await signIn(getValues());
			reset();
			navigate("/", { replace: true });
		} catch {
			setIsLoading(false);
			setIsError(true);
		}
	};

	return (
		<>
			<form className={styles.authForm} onSubmit={handleSubmit(onLogin)}>
				<h1>Вход в систему</h1>

				<EmailField register={register("email")} />
				<PasswordField register={register("password")} />

				<div className={styles.authForm__buttonsContainer}>
					<ButtonText textColor="var(--white-color)" type="submit">
						Войти
					</ButtonText>
				</div>
			</form>

			<div
				className={cn(styles.authForm__animationContainer, {
					[styles.authForm__isLoading]: isLoading,
				})}
			></div>

			{error && (
				<p className={styles.errorResponse}>
					Ошибка! Неверная почта или пароль
				</p>
			)}
		</>
	);
}
