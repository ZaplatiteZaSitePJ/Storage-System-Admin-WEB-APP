import type { ObjectType } from "@entities/Objects/types/objects.type";
import styles from "./EntitieDeleteModal.module.scss";
import type { FC } from "react";
import { ButtonText } from "@shared/ui/ui-kit";
import deleteObject from "@features/api/axios/requests/objects/deleteObject";
import { useNavigate } from "react-router-dom";

type ObjectDeleteModalProps = {
	object: ObjectType;
	handleClose?: () => void;
};

const ObjectDeleteModal: FC<ObjectDeleteModalProps> = ({
	object,
	handleClose,
}) => {
	const navigate = useNavigate();
	const handleDelete = async () => {
		try {
			await deleteObject(object._id as string);
			navigate("/storages");
		} catch (error) {
			console.log(error);
		}
	};
	return (
		<div className={styles.deleteModule}>
			<p className={styles.deleteModule__info}>
				{object.objectName} ({object.size} шт.)
			</p>

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

export default ObjectDeleteModal;
