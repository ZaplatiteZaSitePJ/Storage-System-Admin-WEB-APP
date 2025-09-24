import { useState, type FC } from "react";
import styles from "./EntitiesLayout.module.scss";
import type { EntitiesLayoutProps } from "../types/entitiesLayout.type";
import { ButtonFilled } from "@shared/ui/ui-kit";
import { ButtonBorderred } from "@shared/ui/ui-kit/";
import FormPanel from "@widgets/formPanel/FormPanel";
import Tree from "@widgets/tree/ui/Tree";
import { useNavigate } from "react-router-dom";
import Modal from "@features/modal/Modal";
import ObjectDeleteModal from "@widgets/objects/ui/ObjectDeleteModal/ObjectDeleteModal";
import StorageDeleteModal from "@widgets/objects/ui/ObjectDeleteModal/StorageDeleteModal";
import QrCodeGen from "@widgets/qr-codes/QrCodeGen";

const EntitiesLayout: FC<EntitiesLayoutProps> = ({
	title,
	treeLink,
	subTitle,
	statistic,
	form,
	entitie,
}) => {
	const navigate = useNavigate();

	const [isDeleting, setIsDeleting] = useState<boolean>(false);
	const [qrVisible, setQrVisible] = useState<boolean>(false);

	const handleCloseModal = () => {
		setIsDeleting(false);
	};

	const openInTree = () => {
		if (treeLink) {
			navigate(treeLink);
		} else {
			return;
		}
	};
	return (
		<main className={styles.main}>
			<div className={styles.main__topContainer}>
				<div className={styles.main__titlePlace}>
					<h1 className={styles.main__title}>{title}</h1>

					{subTitle && (
						<button
							type="button"
							className={styles.main__article}
							onClick={() => setQrVisible(true)}
						>
							{subTitle}
						</button>
					)}
				</div>

				<div className={styles.main__buttonsBlock}>
					<ButtonFilled onClick={openInTree}>
						Открыть в дереве
					</ButtonFilled>

					<ButtonBorderred
						borderColor="var(--red-color)"
						onClick={() => setIsDeleting(true)}
					>
						Удалить
					</ButtonBorderred>
				</div>
			</div>

			<div className={styles.main__mainContainer}>
				<FormPanel>{form}</FormPanel>

				{statistic && (
					<div className={styles.main__statisticPlace}>
						{statistic}
					</div>
				)}
			</div>

			<div className={styles.main__tree}>
				{entitie && <Tree entitie={entitie} />}
			</div>

			{isDeleting && entitie && (
				<Modal
					title="Удаление"
					onClose={() => setIsDeleting(false)}
					bgColor="var(--red-color)"
				>
					{"capacity" in entitie ? (
						<StorageDeleteModal
							storage={entitie}
							handleClose={handleCloseModal}
						/>
					) : (
						<ObjectDeleteModal
							object={entitie}
							handleClose={handleCloseModal}
						/>
					)}
				</Modal>
			)}

			{qrVisible && entitie && (
				<Modal title={``} onClose={() => setQrVisible(false)}>
					{entitie && "capacity" in entitie && (
						<QrCodeGen id={entitie.id} />
					)}

					{entitie && "size" in entitie && (
						<QrCodeGen id={entitie._id} />
					)}
				</Modal>
			)}
		</main>
	);
};

export default EntitiesLayout;
