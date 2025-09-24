import type { StorageType } from "@entities/Storages/types/storages.type";
import styles from "./Tree.module.scss";
import type { ObjectType } from "@entities/Objects/types/objects.type";
import type { FC } from "react";
import entitieParse from "../../../features/tree/lib/entitieParse";
import StorageButton from "@features/tree/ui/buttons/StorageButton";
import CellButton from "@features/tree/ui/buttons/CellButton";
import ObjectButton from "@features/tree/ui/buttons/ObjectButton";
import TreeItem from "@features/tree/ui/TreeItems/TreeItem";
import { Link } from "react-router-dom";

type TreeProps = {
	entitie?: StorageType | ObjectType | undefined;
};

const Tree: FC<TreeProps> = ({ entitie }) => {
	const type = entitieParse(entitie);

	return (
		<div className={styles.tree}>
			<div className={styles.tree__buttonContainer}>
				{entitie?.parentStorageId && (
					<div className={styles.tree__backLink}>
						<Link to={`/storages/${entitie?.parentStorageId}`}>
							← Назад по дереву
						</Link>
					</div>
				)}
				{entitie && "capacity" in entitie && type === "storage" && (
					<>
						<StorageButton
							parentStorageId={entitie?.id as number}
						/>
						<CellButton parentStorageId={entitie?.id as number} />
					</>
				)}

				{entitie && "capacity" in entitie && type === "cell" && (
					<ObjectButton parentStorageId={entitie?.id as number} />
				)}
			</div>

			<div className={styles.tree__entitieListContainer}>
				<TreeItem entitie={entitie} opened={false} />
			</div>
		</div>
	);
};

export default Tree;
