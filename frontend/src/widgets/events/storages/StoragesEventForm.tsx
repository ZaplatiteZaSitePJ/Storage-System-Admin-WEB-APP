import ComparisonSelect from "@features/formElements/ui/Events/ComparisonSelect";
import styles from "./StoragesEventForm.module.scss";
import { useForm } from "react-hook-form";
import { ButtonText, Input } from "@shared/ui/ui-kit";
import StoragesFieldSelect from "@features/formElements/ui/Events/StoragesFieldSelect";
import type { EventComparisonType } from "@entities/Event/type/event.type";
import StorageSelect from "@features/formElements/ui/StorageSelect";
import postEvent from "@features/api/axios/requests/events/postEvent";

export default function StoragesEventForm() {
	const { register, getValues, handleSubmit, reset } =
		useForm<EventComparisonType>();

	const handleAdd = async () => {
		const value = getValues();
		let comparedValue = getValues("comparedValue");

		if (getValues("fieldName") === "ITEMS_SIZE_PERCENTILE") {
			comparedValue = getValues("comparedValue") / 100;
		}

		try {
			await postEvent({ ...value, comparedValue: comparedValue });
			reset();
		} catch (error) {
			console.log(error);
		}
	};
	return (
		<>
			<form className={styles.form} onSubmit={handleSubmit(handleAdd)}>
				<h2>Добавить уведомление на хранилища</h2>
				<div className={styles.form__fieldsContainer}>
					<StorageSelect register={register("objectId")} />

					<ComparisonSelect
						register={register("eventComparingMethod")}
						width="240px"
					/>
					<StoragesFieldSelect
						register={register("fieldName")}
						width="240px"
					/>
					<Input
						register={register("comparedValue")}
						type="number"
						width="240px"
						label="Значение"
					/>
					<Input
						register={register("messageOnEvent")}
						type="string"
						fullWidth
						width="832px"
						label="Сообщение"
					/>
				</div>

				<div className={styles.form__buttonsContainer}>
					<ButtonText
						type="submit"
						textSize="var(--normal-font-size)"
					>
						Добавить
					</ButtonText>
				</div>
			</form>
		</>
	);
}
