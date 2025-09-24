import Input from "@shared/ui/ui-kit/inputs/ui/Input";
import styles from "./StorageSearch.module.scss";
import StorageSortSelect from "./FormElements/StorageSortSelect";
import StorageList from "./StorageList/StorageList";
import { useForm } from "react-hook-form";
import type { SearchCriteria } from "./storageSearchCriteria";

export default function StorageSearch() {
	const { register, watch } = useForm<SearchCriteria>();

	const sortBy = watch("sortBy");
	const name = watch("name");

	return (
		<div className={styles.storageSearch}>
			<form className={styles.storageSearch__form}>
				<div>
					<StorageSortSelect
						register={register("sortBy")}
						defaultValue="topLevel"
						label="Вид хранилищ"
					/>
				</div>

				<Input
					placeholder="Введите название хранилища"
					width="400px"
					register={register("name")}
					label="Название хранилища"
				/>
			</form>

			<div className={styles.storageSearch__list}>
				<StorageList sortBy={sortBy} name={name} />
			</div>
		</div>
	);
}
