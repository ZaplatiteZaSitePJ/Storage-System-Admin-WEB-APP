import Modal from "@features/modal/Modal";
import { ButtonFilled } from "@shared/ui/ui-kit";
import StorageForm from "@widgets/storages/ui/StorageForm/StorageForm";
import { useState } from "react";

const StorageButton = ({ parentStorageId }: { parentStorageId: number }) => {
	const [isCreation, setIsCreation] = useState<boolean>(false);

	const handleCreateStorage = () => {
		setIsCreation(true);
	};

	return (
		<>
			{isCreation && (
				<Modal
					title="Создание Хранилища"
					onClose={() => setIsCreation(false)}
				>
					<StorageForm
						mode="create"
						handleClose={() => setIsCreation(false)}
						isCell={false}
						parentStorageId={parentStorageId}
					/>
				</Modal>
			)}

			<ButtonFilled
				textColor="white"
				bgColor="var(--bg-blue-color)"
				onClick={handleCreateStorage}
			>
				<span
					style={{ color: "var(--green-color)", marginRight: "8px" }}
				>
					+
				</span>
				хранилище
			</ButtonFilled>
		</>
	);
};

export default StorageButton;
