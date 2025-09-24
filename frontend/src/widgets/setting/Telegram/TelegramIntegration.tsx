import { ButtonFilled } from "@shared/ui/ui-kit";
import styles from "./TelegramIntegration.module.scss";
import { QRCodeSVG } from "qrcode.react";
import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import postUuid from "@features/api/axios/requests/telegram/postUuid";
import checkTelegram from "@features/api/axios/requests/telegram/checkTelegram";
import StoragesEventForm from "@widgets/events/storages/StoragesEventForm";

export default function TelegramIntegration() {
	const [uuid, setUuid] = useState<string | undefined>(
		localStorage.getItem("uuid") || undefined
	);

	const [hasTg, setHasTg] = useState<string | undefined>(
		localStorage.getItem("tg-integration") || undefined
	);

	const generateUUID = () => {
		const existingUUID = localStorage.getItem("uuid");

		if (existingUUID) {
			setUuid(existingUUID);
		} else {
			const newUUID = uuidv4();
			localStorage.setItem("uuid", newUUID);
			localStorage.setItem(
				"endTime",
				(Date.now() + 180 * 1000).toString()
			);
			setUuid(newUUID);
		}
	};

	// Запрос на создание uuid
	useEffect(() => {
		if (!uuid) return;

		try {
			postUuid({
				userId: Number(localStorage.getItem("userId")),
				userUuid: uuid,
			});
		} catch (err) {
			console.log(err);
		}
	}, [uuid]);

	// Проверка подключения интеграции
	useEffect(() => {
		if (!uuid && hasTg) return;

		const interval = setInterval(async () => {
			try {
				const response = await checkTelegram(
					Number(localStorage.getItem("userId"))
				);

				if (response.data === true) {
					localStorage.setItem("tg-integration", "true");
					localStorage.removeItem("endTime");
					localStorage.removeItem("uuid");
					setHasTg("true");

					clearInterval(interval);
				}
			} catch (err) {
				console.error("Ошибка при проверке Telegram:", err);
			}
		}, 10_000);

		return () => clearInterval(interval);
	}, [uuid]);

	const failledAuth = () => {
		localStorage.removeItem("uuid");
		localStorage.removeItem("endTime");
		setUuid(undefined);
	};

	return (
		<div className={styles.TelegramIntegration}>
			<h2 className={styles.TelegramIntegration__title}>
				Интеграция с Telegram
			</h2>

			<p className={styles.TelegramIntegration__title}>
				Подключите свой telegram-аккаунт к нашему боту, чтобы получать
				пользовательские уведомления
			</p>

			{hasTg && (
				<p style={{ color: "var(--green-color)" }}>
					✓ Интеграция прошла успешно!
				</p>
			)}

			{!hasTg && !uuid && (
				<ButtonFilled
					bgColor={"var(--dark-blue-color)"}
					onClick={generateUUID}
					disabled={!!uuid}
				>
					Начать
				</ButtonFilled>
			)}

			{!hasTg && uuid && (
				<div className={styles.TelegramIntegration__mainContainer}>
					<div className={styles.TelegramIntegration__textContainer}>
						<div>
							<Countdown onClose={failledAuth} />
						</div>

						<p>Отсканируйте QR-код</p>

						<QRCodeSVG
							value={`https://t.me/T1_Storage_Notification_bot?start=${uuid}`}
							size={256}
							level="M"
							bgColor="#ffffff"
							fgColor="#000000"
						/>

						<p className={styles.TelegramIntegration__subText}>
							или{" "}
							<a
								href={`https://t.me/T1_Storage_Notification_bot?start=${uuid}`}
								className={styles.TelegramIntegration__link}
								target="_blank"
								rel="noopener noreferrer"
							>
								{"перейдите по ссылке"}
							</a>
						</p>
					</div>
				</div>
			)}

			{hasTg && (
				<div className={styles.TelegramIntegration__EventsPlace}>
					<StoragesEventForm />
				</div>
			)}
		</div>
	);
}

const Countdown = ({ onClose }: { onClose: () => void }) => {
	const [timeLeft, setTimeLeft] = useState<number>(() => {
		const saved = localStorage.getItem("endTime");
		if (saved) {
			const diff = Math.floor((parseInt(saved) - Date.now()) / 1000);
			return diff > 0 ? diff : 0;
		}
		return 0;
	});
	const minutes = Math.floor(timeLeft / 60);
	const seconds = timeLeft % 60;
	const viewTime = `${String(minutes).padStart(2, "0")} : ${String(
		seconds
	).padStart(2, "0")}`;

	useEffect(() => {
		const interval = setInterval(() => {
			const saved = localStorage.getItem("endTime");
			if (saved) {
				const diff = Math.floor((parseInt(saved) - Date.now()) / 1000);
				setTimeLeft(diff > 0 ? diff : 0);
			}
		}, 1000);

		return () => clearInterval(interval);
	}, []);

	useEffect(() => {
		if (timeLeft <= 0) {
			onClose();
		}
	}, [timeLeft, onClose]);

	return <p className={styles.countdown}>{viewTime}</p>;
};
