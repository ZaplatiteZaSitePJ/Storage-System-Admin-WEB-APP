import EntitiesLayout from "@shared/ui/layouts/entietiesLayout/ui/EntitiesLayout";
import styles from "./StorageUnit.module.scss";
import StorageForm from "@widgets/storages/ui/StorageForm/StorageForm";
import { useLoaderData, useRevalidator } from "react-router-dom";
import type { StorageType } from "@entities/Storages/types/storages.type";
import type { FC } from "react";

export default function StorageUnit() {
	const storage: StorageType = useLoaderData();
	const { revalidate } = useRevalidator();

	return (
		<EntitiesLayout
			treeLink={`/tree/${storage.id}`}
			title={storage.storageName}
			subTitle={`${storage.isCell === false ? "Хранилище" : "Ячейка"}`}
			form={
				<StorageForm
					storage={storage}
					mode="save"
					parentStorageId={storage.parentStorageId}
					isCell={storage.isCell}
					onSaved={revalidate}
				/>
			}
			statistic={<StorageStatistic storage={storage} />}
			entitie={storage}
		/>
	);
}

const StorageStatistic: FC<{ storage: StorageType }> = ({ storage }) => {
	return (
		<div className={styles.statistic}>
			<h2>Статистика</h2>

			<div className={styles.statistic__container}>
				<h3 className={styles.statistic__title}>Доч. сущности</h3>
				<div>
					<ul>
						<li className={styles.statistic__textContainer}>
							<p className={styles.statistic__infoOnly}>
								{storage.innerStoragesIds?.length || 0}
							</p>
						</li>
					</ul>
				</div>
			</div>

			<div className={styles.statistic__container}>
				<h3 className={styles.statistic__title}>Объекты</h3>
				<p className={styles.statistic__infoOnly}>
					{storage.items} шт.
				</p>
			</div>

			<div className={styles.statistic__container}>
				<h3 className={styles.statistic__title}>Заполненность:</h3>
				<p className={styles.statistic__infoOnly}>
					{Math.floor(
						((storage.items || 0) / storage.capacity) * 100
					)}{" "}
					%
				</p>
			</div>
		</div>
	);
};
