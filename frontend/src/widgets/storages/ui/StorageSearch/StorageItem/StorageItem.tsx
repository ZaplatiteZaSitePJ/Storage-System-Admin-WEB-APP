import { useEffect, useState, type FC } from "react";
import styles from "./StorageItem.module.scss";
import { Link } from "react-router-dom";
import type { StorageType } from "@entities/Storages/types/storages.type";
import getStorageSize from "@features/api/axios/requests/storages/getStorageSize";

const StorageItem: FC<StorageType> = ({ storageName, capacity, id }) => {
	const [size, setSize] = useState<number>(0);

	useEffect(() => {
		const getSize = async () => {
			try {
				const response = await getStorageSize(id);
				setSize(response);
			} catch (err) {
				console.error("Ошибка при получении размера:", err);
			}
		};

		getSize();
	}, [id]);

	const fillnes = Math.floor((size / capacity) * 100);

	return (
		<Link to={`/storages/${id}`} className={styles.storageItem}>
			<div className={styles.storageItem__box}>
				<div
					className={styles.storageItem__filling}
					style={{
						height: `${fillnes}%`,
						backgroundColor:
							fillnes < 90
								? "var(--light-blue-color)"
								: "var(--red-color)",
					}}
				>
					<p className={styles.storageItem__fillnes}>{fillnes}%</p>
				</div>
			</div>
			<h2 className={styles.storageItem__name}>{storageName}</h2>
		</Link>
	);
};

export default StorageItem;
