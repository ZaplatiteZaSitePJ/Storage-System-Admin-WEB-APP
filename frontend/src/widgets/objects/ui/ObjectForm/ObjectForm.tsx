import { useForm } from "react-hook-form";
import { useState, useEffect, type FC } from "react";
import styles from "./ObjectForm.module.scss";
import NameField from "@features/formElements/ui/NameField";
import { nameOption } from "@features/formElements/options/name.options";
import { ButtonText, Input } from "@shared/ui/ui-kit";
import StatusSelect from "@features/formElements/ui/StatusSelect";
import postObject from "@features/api/axios/requests/objects/postObject";
import type { ObjectType } from "@entities/Objects/types/objects.type";
import postPhoto from "@features/api/axios/requests/objects/postPhoto";
import putObject from "@features/api/axios/requests/objects/putObject";
import putPhoto from "@features/api/axios/requests/objects/putPhoto";
import { formatedDateForPost } from "@features/formElements/lib/formatedDateForPost";
import { formatDatesForView } from "@features/formElements/lib/formatedDateForView";
import { convertObjectData } from "@features/attributes/convertObjectData";
import AtributeInput from "@features/formElements/ui/AtributesInput";
import Image from "../image/Image";

type ObjectFormType = {
	object?: ObjectType;
	mode: "save" | "create";
	handleClose?: () => void;
	isReadOnly?: boolean;
	parentStorageId: number;
	onSaved?: () => void;
	setReadOnly?: () => void;
};

const ObjectForm: FC<ObjectFormType> = ({
	object,
	mode,
	handleClose,
	isReadOnly = false,
	parentStorageId,
	onSaved,
	setReadOnly,
}) => {
	const { register, reset, getValues, handleSubmit, watch } =
		useForm<ObjectType>();
	const [photoFile, setPhotoFile] = useState<File | null>(null);

	const watchedCustomAttributes = watch("customAttributes") || [];

	const setetdAtributes = watchedCustomAttributes.map(
		(atr) => atr.attributeName
	);

	let len = object?.customAttributes
		? Object.keys(object.customAttributes).length
		: 0;

	const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		if (!file) return;

		const validTypes = ["image/jpeg", "image/png"];
		if (!validTypes.includes(file.type)) {
			alert("Можно загружать только jpeg или png");
			return;
		}

		setPhotoFile(file);
	};

	useEffect(() => {
		if (object) {
			const formattedAttributes = formatDatesForView(
				object.customAttributes ?? {}
			);

			const fetchAttributes = async () => {
				const formattedObject = await convertObjectData(
					formattedAttributes
				);

				reset({
					...object,
					customAttributes: formattedObject || [],
				});
			};

			fetchAttributes();
		}
	}, [object, reset]);

	const onSubmit = async () => {
		const values = getValues();

		let atributesReTransform = values.customAttributes?.reduce(
			(acc, atribute) => {
				acc[atribute.attributeName] = atribute.value || "";
				return acc;
			},
			{} as Record<string, string | number | Date>
		);

		let newValues = { ...values, customAttributes: atributesReTransform };

		const formattedAttributes = formatedDateForPost(
			newValues.customAttributes ?? {}
		);

		let photoIdRequest = 0;

		if (mode === "create" && handleClose) {
			try {
				if (photoFile) {
					photoIdRequest = await postPhoto(photoFile, "object_photo");
				}

				await postObject({
					...getValues(),
					parentStorageId,
					photoId: photoIdRequest || 0,
					customAttributes: (formattedAttributes ||
						{}) as unknown as [],
				});
				handleClose();
			} catch {
				console.log("Что-то пошло не так");
			}
		}

		if (mode === "save" && object) {
			try {
				if (photoFile) {
					photoIdRequest = await putPhoto(
						photoFile,
						"object_photo",
						object.photoId
					);
				}

				await putObject(
					{
						...getValues(),
						parentStorageId,
						photoId: object.photoId || 0,
						customAttributes: (formattedAttributes as []) || {},
					},
					object._id
				);
				setReadOnly?.();
				onSaved?.();
			} catch {
				console.log("Что-то пошло не так");
			}
		}
	};

	return (
		<form className={styles.objectForm} onSubmit={handleSubmit(onSubmit)}>
			<NameField
				register={register("objectName", nameOption)}
				subContent={
					<p className={styles.objectForm__subInfo}>
						{"< 50 символов"}
					</p>
				}
				isAvailable={!isReadOnly}
			/>

			<div className={styles.objectForm__secondContainer}>
				<Image
					photoId={object?.photoId || 0}
					alt={object?.objectName}
					className={styles.objectForm__img}
					classNamePlaceholder={styles.objectForm__imgPlaceholder}
				/>

				<div className={styles.objectForm__selectContainer}>
					<Input
						register={register("size")}
						type="number"
						label={"Количество"}
						width="240px"
						isAvailable={!isReadOnly}
					/>
					<Input
						label={"Категория"}
						width="240px"
						register={register("type")}
						isAvailable={!isReadOnly}
						type="string"
					/>

					<StatusSelect
						defaultValue={object?.status}
						register={register("status")}
						isAvailable={!isReadOnly}
					/>
				</div>
			</div>

			<div className={styles.objectForm__dateContainer}></div>

			{!isReadOnly && (
				<div className={styles.objectForm__photoContainer}>
					<input
						type="file"
						id="photoUpload"
						accept="image/jpeg, image/png"
						onChange={handleFileChange}
						className={styles.hiddenInput}
					/>
					<label htmlFor="photoUpload" className={styles.customLabel}>
						{photoFile?.name
							? photoFile.name
							: "Изменить фото (jpeg/png)"}
					</label>
				</div>
			)}

			{len !== 0 && (
				<div className={styles.objectForm__additionalContainer}>
					<h2>Дополнительные параметры:</h2>

					{Array.isArray(watchedCustomAttributes) &&
						watchedCustomAttributes.map(
							(atribute, index) =>
								index < len && (
									<Input
										key={atribute.id ?? index}
										type={atribute.type}
										label={atribute.russianLabel}
										register={register(
											`customAttributes.${index}.value`
										)}
										isAvailable={!isReadOnly}
									/>
								)
						)}
				</div>
			)}

			{!isReadOnly && (
				<div className={styles.objectForm__addParamsContainer}>
					<h2>Добавить параметры:</h2>
					<div className={styles.objectForm__addParamsInput}>
						<AtributeInput
							register={register}
							index={len}
							userAtributes={setetdAtributes}
							hiddenAdd={mode === "create" ? true : false}
						/>
					</div>
				</div>
			)}

			{!isReadOnly && (
				<div className={styles.objectForm__buttonsContainer}>
					<ButtonText
						textWeight={100}
						textSize="var(--normal-font-size)"
						textColor="var(--grey-color)"
						onClick={() => reset()}
					>
						Сбросить
					</ButtonText>

					<ButtonText
						textSize="var(--normal-font-size)"
						textColor="var(--green-color)"
						type="submit"
					>
						{mode === "save" ? "Сохранить" : "Создать"}
					</ButtonText>
				</div>
			)}
		</form>
	);
};

export default ObjectForm;
