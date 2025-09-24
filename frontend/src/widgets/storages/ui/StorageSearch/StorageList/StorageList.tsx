import type { FC } from "react";
import StorageItem from "../StorageItem/StorageItem";
import styles from "./StorageList.module.scss";
import storageFiltration from "./storageFilter";
import { useLoaderData } from "react-router-dom";

type StorageListProps = {
	name: string | undefined;
	sortBy: string | undefined;
};

const StorageList: FC<StorageListProps> = ({ name, sortBy }) => {
	const storageList = useLoaderData();

	const storageFiltred = storageFiltration(name, sortBy, storageList);
	return (
		<div className={styles.storageList}>
			{storageFiltred.map((element) => {
				return (
					<StorageItem
						key={element.id}
						ownerId={element?.ownerId}
						parentStorageId={element?.parentStorageId}
						storageName={element.storageName}
						capacity={element.capacity}
						id={element.id}
						isCell={element.isCell}
						items={element.items}
					/>
				);
			})}
		</div>
	);
};

export default StorageList;
