import TreeItem from "@features/tree/ui/TreeItems/TreeItem";
import styles from "./TreePage.module.scss";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getWayToEntitie } from "@features/api/axios/requests/tree/getWayToEntitie";

export default function TreePage() {
	const { id } = useParams<{ id?: string }>();
	const [way, setWay] = useState<(string | number | undefined)[]>([]);

	useEffect(() => {
		if (!id) return;

		const fetchWay = async () => {
			try {
				const newWay = await getWayToEntitie(id);
				setWay(newWay);
			} catch (err) {
				console.error("Ошибка при загрузке пути:", err);
			}
		};

		fetchWay();
	}, [id]);

	return (
		<main className={styles.main}>
			<div className={styles.main__topContainer}>
				<h1>Дерево сущностей</h1>
			</div>

			<div className={styles.main__mainContainer}>
				<TreeItem entitie={undefined} opened={true} way={way} />
			</div>
		</main>
	);
}
