// import styles from "./FormSearch.module.scss";
// import { useForm } from "react-hook-form";
// import { Input } from "@shared/ui/ui-kit";
// import { useEffect, useState } from "react";
// import SearchSelect from "@features/formElements/ui/SearchSelect";
// import { objectBaseAtributes } from "@entities/Objects/atrinutes/objectsBaseAtributes";
// import ObjectList from "../../ObjectList/ObjectList";
// import StorageSelect from "@features/formElements/ui/StorageSelect";

// type SearchObjectByAtribute = {
// 	parentStorageId: number;
// 	atribute: string;
// 	start?: string | number | Date | undefined;
// 	end?: string | number | Date | undefined;
// };

// export default function FormSearchOnly() {
// 	const { register, watch, getValues } = useForm<SearchObjectByAtribute>();

// 	const [paramsObject, setParamsObject] = useState<SearchObjectByAtribute>({
// 		parentStorageId: 0,
// 		atribute: "",
// 		start: undefined,
// 		end: undefined,
// 	});

// 	const atributeName = watch("atribute");
// 	const startValue = watch("start");
// 	const endValue = watch("end");
// 	const parentStorageId = watch("parentStorageId");

// 	const findtype = (atribute: string) => {
// 		const currentAtribute = objectBaseAtributes.find(
// 			(element) => element.value === atribute
// 		);
// 		return currentAtribute?.type;
// 	};

// 	useEffect(() => {
// 		if (!atributeName) return;

// 		let { start, end, parentStorageId } = getValues();

// 		const type = findtype(atributeName);

// 		if (type === "number") {
// 			if (start !== undefined) start = Number(start);
// 			if (end !== undefined) end = Number(end);
// 		}

// 		if (type === "date") {
// 			if (start) start = new Date(start);
// 			if (end) end = new Date(end);
// 		}

// 		setParamsObject({
// 			atribute: atributeName,
// 			start,
// 			end,
// 			parentStorageId,
// 		});
// 	}, [atributeName, startValue, endValue, parentStorageId]);

// 	return (
// 		<div className={styles.objectFormSearch}>
// 			<form className={styles.objectFormSearch__filter}>
// 				<StorageSelect register={register("parentStorageId")} />
// 				<div className={styles.objectFormSearch__filterContainer}>
// 					<SearchSelect register={register("atribute")} />

// 					{atributeName && (
// 						<>
// 							<Input
// 								register={register("start", {
// 									setValueAs: (v) =>
// 										v === "" ? undefined : v,
// 								})}
// 								width="160px"
// 								placeholder="Начало"
// 								type={findtype(atributeName)}
// 								label={`Аргумент (${findtype(atributeName)})`}
// 							/>

// 							<span>—</span>
// 							<Input
// 								register={register("end", {
// 									setValueAs: (v) =>
// 										v === "" ? undefined : v,
// 								})}
// 								width="160px"
// 								placeholder="Конец"
// 								type={findtype(atributeName)}
// 								label={`Аргумент (${findtype(atributeName)})`}
// 								isAvailable={
// 									findtype(atributeName) !== "string"
// 								}
// 							/>
// 						</>
// 					)}
// 				</div>
// 			</form>

// 			<div className={styles.objectFormSearch__objectListPlace}>
// 				<ObjectList
// 					parentStorageId={paramsObject.parentStorageId}
// 					atributeName={paramsObject.atribute}
// 					start={paramsObject.start}
// 					end={paramsObject.end}
// 				/>
// 			</div>
// 		</div>
// 	);
// }
