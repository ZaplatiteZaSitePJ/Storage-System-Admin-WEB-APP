import { useState } from "react";
import { ButtonText, Input } from "@shared/ui/ui-kit";
import type { AtributesType } from "@widgets/atributes/types/atribute.type";
import styles from "./AddAtributesForm.module.scss";
import { useForm, type SubmitHandler } from "react-hook-form";
import AtributesTypeSelect from "@features/formElements/ui/AtributesTypeSelect";
import postAtributes from "@features/api/axios/requests/atributes/postAtributes";

const AddAtributesForm = ({ handleClose }: { handleClose?: () => void }) => {
	const [atributeExist, setAtributeExist] = useState<boolean | undefined>();

	const { register, handleSubmit, setValue, getValues } =
		useForm<AtributesType>({
			defaultValues: {
				russianLabel: "",
				attributeName: "",
				type: "STRING",
			},
		});

	const onSubmit: SubmitHandler<AtributesType> = async (data) => {
		try {
			await postAtributes(data);
			setAtributeExist(false);
			setTimeout(() => handleClose?.(), 2000);
		} catch (error) {
			setAtributeExist(true);
			console.error(error);
		}
	};

	return (
		<form onSubmit={handleSubmit(onSubmit)} className={styles.addAtributes}>
			<div className={styles.addAtributes__atribute}>
				<Input
					register={register("russianLabel", {
						required: "Обязательное поле",
						minLength: { value: 3, message: "Минимум 3 символа" },
						maxLength: {
							value: 30,
							message: "Максимум 30 символов",
						},
					})}
					label="Атрибут на русском"
					placeholder="Название атрибута (ru)"
					width="220px"
				/>

				<Input
					register={register("attributeName", {
						onChange: (e) => {
							const onlyLatin = e.target.value.replace(
								/[^a-zA-Z\s]/g,
								""
							);
							const formatted = onlyLatin
								.replace(/\s+/g, "_")
								.trim();
							setValue("attributeName", formatted, {
								shouldValidate: true,
								shouldDirty: true,
							});
						},
						required: "Обязательное поле",
						minLength: { value: 3, message: "Минимум 3 символа" },
						maxLength: {
							value: 30,
							message: "Максимум 30 символов",
						},
						pattern: {
							value: /^[A-Za-z_]+$/,
							message: "Допускаются только латинские буквы и '_'",
						},
					})}
					placeholder="Название атрибута (en)"
					label="Атрибут на английском"
					width="220px"
				/>

				<AtributesTypeSelect
					register={register("type")}
					defaultValue={"STRING"}
					width="120px"
				/>
			</div>

			<div className={styles.addAtributes__isExist}>
				{atributeExist && (
					<p style={{ color: "var(--red-color)" }}>
						Параметр с таким названием уже существует!
					</p>
				)}

				{atributeExist === false && (
					<p style={{ color: "var(--green-color)" }}>
						Параметр {getValues("russianLabel")} создан!
					</p>
				)}
			</div>

			<div className={styles.addAtributes__buttonContainer}>
				<ButtonText type="submit" textColor="var(--green-color)">
					Создать
				</ButtonText>
			</div>
		</form>
	);
};

export default AddAtributesForm;
