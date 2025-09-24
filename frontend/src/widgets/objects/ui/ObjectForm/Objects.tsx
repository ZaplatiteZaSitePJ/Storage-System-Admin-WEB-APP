import ButtonText from "@shared/ui/ui-kit/buttons/ButtonText";
import styles from "./Objects.module.scss";
import ObjectSearch from "@widgets/objects/ui/ObjectSearch/ObjectSearch";
import { useState } from "react";
import Modal from "@features/modal/Modal";
import TreeItem from "@features/tree/ui/TreeItems/TreeItem";
import type { StorageType } from "@entities/Storages/types/storages.type";
import ObjectForm from "@widgets/objects/ui/ObjectForm/ObjectForm";

type Step = "Idle" | "ChoosingCell" | "Creating";

export default function Objects() {
	const [step, setStep] = useState<Step>("Idle");
	const [place, setPlace] = useState<StorageType | undefined>();

	const handleCreateStorage = () => setStep("ChoosingCell");

	const chooseCell = (newStorage: StorageType | undefined) => {
		if (
			newStorage?.isCell &&
			newStorage.capacity - newStorage.items !== 0
		) {
			setPlace(newStorage);
			setStep("Creating");
		}
	};

	return (
		<main className={styles.main}>
			<div className={styles.main__topContainer}>
				<h1>Выбор объектов</h1>
				<ButtonText
					textColor="var(--green-color)"
					textSize="36px"
					onClick={handleCreateStorage}
				>
					+
				</ButtonText>
			</div>

			<div className={styles.main__mainContainer}>
				<ObjectSearch />
			</div>

			{step === "ChoosingCell" && (
				<Modal
					title="Выберите ячейку для объекта"
					onClose={() => setStep("Idle")}
				>
					<TreeItem
						entitie={undefined}
						opened={true}
						sideFunction={chooseCell}
						onlyCell
					/>
				</Modal>
			)}

			{step === "Creating" && place && (
				<Modal title="Создание объекта" onClose={() => setStep("Idle")}>
					<ObjectForm
						mode="create"
						parentStorageId={place.id}
						handleClose={() => setStep("Idle")}
					/>
				</Modal>
			)}
		</main>
	);
}
