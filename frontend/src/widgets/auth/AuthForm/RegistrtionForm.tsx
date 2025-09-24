import { useForm } from "react-hook-form";
import EmailField from "@features/formElements/ui/AuthElements/EmailField";
import PasswordField from "@features/formElements/ui/AuthElements/PasswordField";
import styles from "./AuthForm.module.scss";
import type { UserType } from "@entities/User/types/user.type";
import { ButtonText } from "@shared/ui/ui-kit";
import registration from "@features/api/axios/requests/auth/registration";
import { useState } from "react";
import cn from "classnames";
import UsernameField from "@features/formElements/ui/AuthElements/UsernameField";
import { emailOption } from "@features/formElements/options/email.options";
import { passwordOption } from "@features/formElements/options/password.options";
import signIn from "@features/api/axios/requests/auth/sighIn";
import { useNavigate } from "react-router-dom";

type RegistrationFormType = Pick<
	UserType,
	"email" | "password" | "userName"
> & {
	confirmPassword: string;
};

export default function RegistrationForm() {
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [error, setIsError] = useState<boolean>(false);
	const navigate = useNavigate();

	const {
		register,
		handleSubmit,
		getValues,
		formState: { errors },
	} = useForm<RegistrationFormType>();

	const onRegistration = async () => {
		setIsLoading(true);

		try {
			const response = await registration(getValues());
			localStorage.setItem("userId", response.data.id);

			await signIn({
				email: getValues("email"),
				password: getValues("password"),
			});

			navigate("/", { replace: true });
		} catch {
			setIsLoading(false);
			setIsError(true);
		}
	};

	return (
		<>
			<form
				className={styles.authForm}
				onSubmit={handleSubmit(onRegistration)}
			>
				<h1>Регистрация</h1>

				<EmailField
					register={register("email", emailOption)}
					subContent={
						<>
							<p className={styles.authForm__subInfo}>
								{!!errors.email && (
									<span className={styles.errorDiv}>
										Ошибка! Некорректная почта
									</span>
								)}
							</p>
						</>
					}
				/>

				<UsernameField
					register={register("userName", {
						required: "Введите имя пользователя",
					})}
					subContent={
						<>
							<p className={styles.authForm__subInfo}>
								{!!errors.userName && (
									<span className={styles.errorDiv}>
										Ошибка! Некорректное имя
									</span>
								)}
							</p>
						</>
					}
				/>

				<div className={styles.authForm__passwordContainer}>
					<PasswordField
						register={register("password", passwordOption)}
						subContent={
							<>
								<p className={styles.authForm__subInfo}>
									{!!errors.password && (
										<span className={styles.errorDiv}>
											Ошибка!
										</span>
									)}
									{
										"> 8 символов, 1 спец. знака, заглавной буквы и цифры"
									}
								</p>
							</>
						}
					/>

					<PasswordField
						width="100%"
						label="Подтвердите пароль"
						register={register("confirmPassword", {
							required: "Подтвердите пароль",
							validate: (value) =>
								value === getValues("password") ||
								"Пароли не совпадают",
						})}
						subContent={
							<>
								<p className={styles.authForm__subInfo}>
									{!!errors.confirmPassword && (
										<span className={styles.errorDiv}>
											Ошибка: Пароли не совпадают
										</span>
									)}
								</p>
							</>
						}
					/>
				</div>

				<div className={styles.authForm__buttonsContainer}>
					<ButtonText textColor="var(--white-color)" type="submit">
						Создать аккаунт
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
					Ошибка! Пользователь уже существует!
				</p>
			)}
		</>
	);
}
