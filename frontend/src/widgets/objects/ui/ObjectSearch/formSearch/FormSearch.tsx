import type { ObjectType } from "@entities/Objects/types/objects.type";
import styles from "./FormSearch.module.scss";
import { useForm } from "react-hook-form";
import { Input } from "@shared/ui/ui-kit";
import { useState, useEffect } from "react";
import StatusSelect from "@features/formElements/ui/StatusSelect";
import cn from "classnames";
import ObjectList from "../../ObjectList/ObjectList";
import parseFormSearch from "@features/objectSearch/parseFormSearch";
import AtributeInput from "@features/formElements/ui/AtributesInput";
import StorageSelect from "@features/formElements/ui/StorageSelect";

export default function FormSearch() {
	const { register, watch } = useForm<ObjectType>();

	const [isWrapped, setWrapped] = useState<boolean>(false);
	const [request, setRequest] = useState<object[]>([]);

	const handleWrap = () => {
		setWrapped((prev) => !prev);
	};

	const formValues = watch();

	useEffect(() => {
		const fetchParsed = async () => {
			try {
				const parsed = await parseFormSearch(formValues);
				setRequest(parsed);
			} catch (error) {
				console.error("parseFormSearch error:", error);
			}
		};

		fetchParsed();
	}, [JSON.stringify(formValues)]);

	return (
		<div className={styles.objectFormSearch}>
			<form
				className={styles.objectFormSearch__filter}
				style={
					isWrapped
						? { height: "600px", overflow: "auto" }
						: { height: "138px", overflow: "hidden" }
				}
			>
				<div className={styles.objectFormSearch__filterContainer}>
					<Input
						label="Артикул"
						register={register("_id")}
						width="240px"
					/>
					<Input
						label="Название"
						register={register("objectName")}
						width="240px"
					/>
					<Input
						label="Размер"
						register={register("size")}
						width="240px"
						type="number"
					/>
				</div>

				<div
					className={styles.objectFormSearch__filterContainer}
					style={
						isWrapped ? { display: "flex" } : { display: "none" }
					}
				>
					<StatusSelect register={register("status")} />
					<Input
						label="Категория"
						register={register("type")}
						width="240px"
						type="string"
					/>
					<StorageSelect register={register("parentStorageId")} />
				</div>

				<div
					className={styles.objectFormSearch__additionalContainer}
					style={
						isWrapped ? { display: "block" } : { display: "none" }
					}
				>
					<h3>Дополнительная фильтрация:</h3>

					<AtributeInput register={register} mode="search" />
				</div>
			</form>

			<button
				className={cn(styles.objectFormSearch__unwrapButton, {
					[styles.wrapped]: isWrapped,
				})}
				type="button"
				onClick={handleWrap}
			>
				↓
			</button>

			<div className={styles.objectFormSearch__objectListPlace}>
				{<ObjectList request={request} />}
			</div>
		</div>
	);
}
