import styles from "./EntitieDeleteModal.module.scss";
import { useState, type FC } from "react";
import { ButtonText } from "@shared/ui/ui-kit";
import type { StorageType } from "@entities/Storages/types/storages.type";
import TreeItem from "@features/tree/ui/TreeItems/TreeItem";
import deleteStorage from "@features/api/axios/requests/storages/deleteStorages";
import { useNavigate } from "react-router-dom";

type StorageDeleteModalProps = {
	storage: StorageType;
	handleClose?: () => void;
};

const StorageDeleteModal: FC<StorageDeleteModalProps> = ({
	storage,
	handleClose,
}) => {
	const [newPlace, setNewPlace] = useState<StorageType | undefined>();
	const [openTree, setOpenTree] = useState<boolean>(false);
	const navigate = useNavigate();

	const chooseCell = (newStorage: StorageType | undefined) => {
		if (
			newStorage?.isCell &&
			storage.id !== newStorage.id &&
			newStorage.capacity - newStorage.items >= storage.items
		) {
			setNewPlace(newStorage);
			setOpenTree(false);
		}
	};

	const handleDelete = async () => {
		try {
			await deleteStorage(storage.id, newPlace?.id);
			handleClose?.();
			navigate("/storages");
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<div className={styles.deleteModule}>
			<div className={styles.deleteModule__infoContainer}>
				<p className={styles.deleteModule__info}>
					{storage.storageName} ({storage.items} шт.)
				</p>

				<p className={styles.deleteModule__info}>→</p>

				<p className={styles.deleteModule__info}>
					{newPlace
						? `${newPlace.storageName} (${
								(newPlace.capacity || 0) - (newPlace.items || 0)
						  } свободно)`
						: "Потеря объектов"}
				</p>
			</div>

			{storage.isCell && (
				<div className={styles.deleteModule__replaceContainer}>
					<ButtonText
						textSize="var(--smallest-font-size)"
						textWeight={100}
						className={styles.deleteModule__openTreeButton}
						onClick={() => setOpenTree((prev) => !prev)}
					>
						Выбрать ячейку для перемещания предметов ↓
					</ButtonText>

					{openTree && (
						<div>
							<TreeItem
								entitie={undefined}
								opened={true}
								sideFunction={(storage) => chooseCell(storage)}
								onlyCell={true}
							/>
						</div>
					)}
				</div>
			)}

			<div className={styles.deleteModule__buttonContainer}>
				<ButtonText
					type="button"
					textSize="var(--normal-font-size)"
					textColor="var(--white-color)"
					onClick={handleClose}
				>
					Отмена
				</ButtonText>

				<ButtonText
					textWeight={100}
					textSize="var(--normal-font-size)"
					textColor="var(--white-color)"
					type="button"
					onClick={handleDelete}
				>
					Удалить
				</ButtonText>
			</div>
		</div>
	);
};

export default StorageDeleteModal;
