import styles from "./Auth.module.scss";
import LoginForm from "@widgets/auth/AuthForm/LoginForm";
import Logo from "@shared/assets/t1-Logo.svg?react";
import { useState } from "react";
import cn from "classnames";
import RegistrationForm from "@widgets/auth/AuthForm/RegistrtionForm";

type AuthType = "login" | "registration";

export default function Auth() {
	const [authMode, setAuthMode] = useState<AuthType>("login");

	const handleChange = (mode: AuthType) => {
		setAuthMode(mode);
	};

	return (
		<main className={styles.main}>
			<Logo className={styles.main__logo} />

			<div className={styles.main__switchButton}>
				<button
					type="button"
					onClick={() => handleChange("login")}
					className={cn({
						[styles.main__active]: authMode === "login",
					})}
				>
					Вход
				</button>

				<span>/</span>

				<button
					type="button"
					onClick={() => handleChange("registration")}
					className={cn({
						[styles.main__active]: authMode === "registration",
					})}
				>
					Регистрация
				</button>
			</div>

			<div className={styles.main__mainContainer}>
				{authMode === "login" ? <LoginForm /> : <RegistrationForm />}
			</div>
		</main>
	);
}
