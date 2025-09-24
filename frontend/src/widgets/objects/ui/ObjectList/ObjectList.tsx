import { useEffect, useState, type FC } from "react";
import styles from "./ObjectList.module.scss";
import getSomeObjects from "@features/api/axios/requests/objects/getSomeObjects";
import type { ObjectType } from "@entities/Objects/types/objects.type";
import ObjectItem from "../ObjectItem/ObjectItem";

type ObjectFilterType = {
	request?: object[];
};

const ObjectList: FC<ObjectFilterType> = ({ request }) => {
	const [objects, setObjects] = useState<ObjectType[]>([]);

	useEffect(() => {
		const fetchObjects = async () => {
			if (!request) return;

			try {
				const newObjects = await getSomeObjects(request);
				setObjects(newObjects ?? []);
			} catch (error) {
				console.error("Ошибка при получении объектов:", error);
				setObjects([]);
			}
		};

		fetchObjects();
	}, [request]);

	return (
		<div className={styles.objectList}>
			{objects.length > 0 ? (
				objects.map((el) => <ObjectItem object={el} />)
			) : (
				<p>Выберите способ фильрации объектов</p>
			)}
		</div>
	);
};

export default ObjectList;
