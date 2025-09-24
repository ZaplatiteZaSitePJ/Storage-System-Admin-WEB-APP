import ButtonText from "@shared/ui/ui-kit/buttons/ButtonText";
import styles from "./Storages.module.scss";
import StorageSearch from "@widgets/storages/ui/StorageSearch/StorageSearch";
import Modal from "@features/modal/Modal";
import StorageForm from "@widgets/storages/ui/StorageForm/StorageForm";
import { useState } from "react";
import { useRevalidator } from "react-router-dom";

export default function Storages() {
	const [isCreation, setIsCreation] = useState(false);
	const { revalidate } = useRevalidator();

	const handleCreateStorage = () => {
		setIsCreation(true);
	};

	return (
		<main className={styles.main}>
			<div className={styles.main__topContainer}>
				<h1>Ваши хранилища</h1>
				<ButtonText
					textColor="var(--green-color)"
					textSize="36px"
					onClick={handleCreateStorage}
				>
					+
				</ButtonText>
			</div>

			<div className={styles.main__mainContainer}>
				<StorageSearch />
			</div>

			{isCreation && (
				<Modal
					title="Создание Хранилища"
					onClose={() => setIsCreation(false)}
				>
					<StorageForm
						mode="create"
						handleClose={() => {
							setIsCreation(false);
							revalidate();
						}}
					/>
				</Modal>
			)}
		</main>
	);
}
