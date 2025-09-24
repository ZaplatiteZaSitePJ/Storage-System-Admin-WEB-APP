import { useEffect, useState } from "react";
import { axiosBase } from "@features/api/axios/axiosBase";

export default function QrCodeGen({ id }: { id: string | number | undefined }) {
	const [response, setResponse] = useState<string | null>(null);

	let urlPart: string;
	if (typeof id === "string") {
		urlPart = `/objects/${id}`;
	} else {
		urlPart = `/storages/${id}`;
	}

	useEffect(() => {
		if (!id) return;

		const fetchQr = async () => {
			try {
				const res = await axiosBase.post(
					"v1/qr-codes/generate",
					JSON.stringify({ urlPart }),
					{
						headers: { "Content-Type": "application/json" },
						responseType: "arraybuffer",
					}
				);

				const base64 = btoa(
					new Uint8Array(res.data).reduce(
						(data, byte) => data + String.fromCharCode(byte),
						""
					)
				);

				setResponse(`data:image/png;base64,${base64}`);
			} catch (error) {
				console.error("Ошибка при генерации QR:", error);
			}
		};

		fetchQr();
	}, [id]);

	return response ? (
		<div
			style={{ width: "100%", display: "flex", justifyContent: "center" }}
		>
			<img src={response} alt="QR-код" width="45%" />
		</div>
	) : (
		<div>Загрузка...</div>
	);
}
