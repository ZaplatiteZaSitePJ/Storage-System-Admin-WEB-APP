import QrScanner from "qr-scanner";
import styles from "./QrSearch.module.scss";
import { useState } from "react";

export default function QrSearch() {
	const [result, setResult] = useState<string | null>(
		"Вставьте изображение Qr-кода"
	);

	const handleFileChange = async (
		event: React.ChangeEvent<HTMLInputElement>
	) => {
		const file = event.target.files?.[0];
		if (!file) return;

		try {
			const qrResult = await QrScanner.scanImage(file, {
				returnDetailedScanResult: true,
			});
			setResult(qrResult.data);
			window.open(qrResult.data);
		} catch (err) {
			console.error("QR not found", err);
			setResult(null);
		}
	};

	return (
		<div className={styles.qrSearch}>
			<input
				id="qr-upload"
				className={styles.qrSearch__input}
				type="file"
				accept="image/png, image/jpeg"
				onChange={handleFileChange}
			/>
			<label htmlFor="qr-upload" className={styles.qrSearch__label}>
				Вставьте
				<br /> QR-код
			</label>

			{result ? (
				<p className={styles.qrSearch__result}>{result}</p>
			) : (
				<p className={styles.qrSearch__error}>
					Ошибка! Не удалось считать QR-код
				</p>
			)}
		</div>
	);
}
