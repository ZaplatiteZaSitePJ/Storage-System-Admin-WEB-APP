import Modal from "@features/modal/Modal";
import { ButtonFilled } from "@shared/ui/ui-kit";
import ObjectForm from "@widgets/objects/ui/ObjectForm/ObjectForm";
import { useState } from "react";

const ObjectButton = ({ parentStorageId }: { parentStorageId: number }) => {
	const [isCreation, setIsCreation] = useState<boolean>(false);

	const handleCreateStorage = () => {
		setIsCreation(true);
	};

	return (
		<>
			{isCreation && (
				<Modal
					title="Создание Объекта"
					onClose={() => setIsCreation(false)}
				>
					<ObjectForm
						mode="create"
						handleClose={() => setIsCreation(false)}
						parentStorageId={parentStorageId}
					/>
				</Modal>
			)}

			<ButtonFilled
				textColor="var(--dark-blue-color)"
				bgColor="white"
				onClick={handleCreateStorage}
			>
				<span style={{ marginRight: "8px" }}>+</span>
				объект
			</ButtonFilled>
		</>
	);
};

export default ObjectButton;
