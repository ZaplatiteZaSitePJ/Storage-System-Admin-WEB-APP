import { useEffect, useState, type FC } from "react";
import { axiosBase } from "@features/api/axios/axiosBase";
import styles from "./Image.module.scss";

type ImageProps = {
	photoId?: number;
	alt?: string;
	width?: string | number;
	className?: string;
	classNamePlaceholder?: string;
};

const Image: FC<ImageProps> = ({
	photoId,
	alt = "Объект",
	width = 160,
	className,
	classNamePlaceholder,
}) => {
	const [imgSrc, setImgSrc] = useState<string | null>(null);

	useEffect(() => {
		const fetchPhoto = async () => {
			try {
				if (!photoId) return;
				const res = await axiosBase.get(`v1/photos/get/${photoId}`);
				const data = res.data;
				const base64Image = `data:${data.mediaType};base64,${data.photoBytes}`;
				setImgSrc(base64Image);
			} catch (err) {
				console.error("Ошибка загрузки фото:", err);
			}
		};

		fetchPhoto();
	}, [photoId]);

	if (!photoId) {
		return (
			<div className={`${styles.placeholder} ${classNamePlaceholder}`}>
				Нет фото
			</div>
		);
	}

	return imgSrc ? (
		<img
			src={imgSrc}
			alt={alt}
			width={width}
			className={`${styles.img} ${className}`}
		/>
	) : (
		<div className={`${styles.placeholder} ${classNamePlaceholder}`}>
			Загрузка...
		</div>
	);
};

export default Image;
