import TelegramIntegration from "@widgets/setting/Telegram/TelegramIntegration";
import styles from "./Settings.module.scss";
import logout from "@features/api/axios/requests/auth/logout";
import { useNavigate } from "react-router-dom";

export default function Settings() {
	const navigation = useNavigate();

	const handleLogout = async () => {
		try {
			await logout();
			navigation("/auth");
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<main className={styles.main}>
			<div className={styles.main__topContainer}>
				<h1>Ваши настройки </h1>
				<button
					className={styles.main__logoutButton}
					type="button"
					onClick={handleLogout}
				>
					Выйти из аккаунта
				</button>
			</div>

			<div className={styles.main__mainContainer}>
				<div className={styles.telegramPlace}>
					<TelegramIntegration />
				</div>
				<div className={styles.atributesPlace}></div>
			</div>
		</main>
	);
}
