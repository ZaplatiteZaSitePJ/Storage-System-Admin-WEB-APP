import { useEffect, useState } from "react";
import styles from "./TreeItem.module.scss";
import type { ObjectType } from "@entities/Objects/types/objects.type";
import type { StorageType } from "@entities/Storages/types/storages.type";
import entitieColorSheet from "@features/tree/lib/entitieColorSheet";
import entitieRussificator from "@features/tree/lib/entitieRussificator";
import getSubEntities from "@features/api/axios/requests/tree/getSubEntities";
import { useNavigate } from "react-router-dom";
import entitieType from "@features/tree/lib/entitieParse";
import { useSingleAndDoubleClick } from "@features/hooks/useSingleAndDoubleClick";

const TreeItem = ({
	entitie,
	opened = false,
	depth = 0,
	way = [],
	sideFunction,
	onlyCell,
}: {
	entitie: ObjectType | StorageType | undefined;
	opened: boolean;
	depth?: number;
	way?: (string | number | undefined)[];
	sideFunction?: (storage: StorageType | undefined) => void;
	onlyCell?: boolean;
}) => {
	const [isOpened, setIsOpened] = useState<boolean>(opened);
	const [subComponents, setSubComponents] = useState<
		(ObjectType | StorageType | undefined)[]
	>([]);

	const openEntitiePage = () => {
		if (depth === 0) return;

		if (entitie && "capacity" in entitie) {
			navigate(
				`/${type !== "object" ? "storage" : "object"}s/${entitie?.id}`
			);
		}
		if (entitie && "size" in entitie) {
			navigate(
				`/${type !== "object" ? "storage" : "object"}s/${entitie?._id}`
			);
		}
		setIsOpened(false);
	};

	// автo-открытие по "way"
	useEffect(() => {
		if (
			way.length > 0 &&
			entitie &&
			"size" in entitie &&
			way[way.length - 1] === entitie?._id
		) {
			setIsOpened(true);
		}

		if (
			way.length > 0 &&
			entitie &&
			"capacity" in entitie &&
			way[way.length - 1] === entitie?.id
		) {
			setIsOpened(true);
		}
	}, [way, entitie]);

	// загрузка поддерева
	useEffect(() => {
		if (isOpened) {
			getSubEntities(entitie, onlyCell).then((newSubEntities) => {
				setSubComponents(newSubEntities);
			});
		}
	}, [isOpened, entitie]);

	const navigate = useNavigate();

	const type = entitieType(entitie);

	let { ruType, ruNumberTitle } = entitieRussificator(type);

	const title = (() => {
		if (!entitie) return "Список всех сущностей";

		if ("storageName" in entitie) {
			return entitie.storageName;
		}

		if ("objectName" in entitie) {
			return entitie.objectName;
		}
	})();

	const numberValue = () => {
		if (!entitie) return "∞";

		if (
			(type === "storage" || type === "cell") &&
			"capacity" in entitie &&
			"items" in entitie
		) {
			return (entitie.capacity || 0) - (entitie.items || 0);
		} else if (type === "object" && "size" in entitie) {
			return entitie.size;
		}

		return null;
	};

	const handleClick = useSingleAndDoubleClick(
		() => setIsOpened((v) => !v),
		() => {
			if (sideFunction && entitie && "capacity" in entitie) {
				sideFunction(entitie);
				setIsOpened(true);
			} else {
				openEntitiePage();
			}
		},
		{ delay: 250, stopPropagation: true, preventDefault: true }
	);

	<div onClick={handleClick}>...</div>;

	const colorSheet = entitieColorSheet(type as "storage" | "cell" | "object");

	return (
		<div className={styles.container}>
			<div className={styles.treeItem__subInfo}>
				<p className={styles.treeItem__type}>{ruType}</p>

				<p className={styles.treeItem__numberTitle}>{ruNumberTitle}</p>
			</div>

			<div
				className={`${styles.treeItem} ${
					isOpened ? styles.opened : ""
				}`}
				style={{
					border: colorSheet?.border,
					backgroundColor: colorSheet?.backgroundColor,
				}}
				onClick={handleClick}
			>
				<div
					className={styles.treeItem__mainInfo}
					style={
						isOpened
							? {
									backgroundColor:
										colorSheet?.backgroundColor,
									marginBottom: "0px",
									marginTop: "0px",
							  }
							: {
									backgroundColor:
										colorSheet?.backgroundColor,
									marginBottom: "8px",
									marginTop: "8px",
							  }
					}
				>
					<p
						className={styles.treeItem__title}
						style={{ color: colorSheet?.color }}
					>
						{title}
					</p>

					<p
						className={styles.treeItem__numberInfo}
						style={{ color: colorSheet?.color }}
					>
						{numberValue()}
					</p>
				</div>

				{isOpened && (
					<hr
						className={styles.treeItem__divider}
						style={{ backgroundColor: colorSheet?.color }}
					/>
				)}

				{isOpened && (
					<div className={styles.treeItem__innerContent}>
						{subComponents.map((ent) => {
							if (!ent) return null;

							const key =
								"id" in ent
									? ent.id
									: "_id" in ent
									? ent._id
									: undefined;

							return (
								<TreeItem
									key={key}
									entitie={ent}
									opened={false}
									depth={depth + 1}
									way={way.slice(0, -1)}
									sideFunction={sideFunction}
									onlyCell={onlyCell}
								/>
							);
						})}
					</div>
				)}
			</div>
		</div>
	);
};

export default TreeItem;
