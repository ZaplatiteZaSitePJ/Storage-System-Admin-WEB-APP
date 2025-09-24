import { useEffect, useState, type FC } from "react";
import { CustomSelect } from "@shared/ui/ui-kit/select/ui/Select";
import type { CustomSelectProps } from "@shared/ui/ui-kit";
import getStorages from "@features/api/axios/requests/storages/getStorages";

type StorageOption = {
	value: number;
	label: string;
};

const StorageSelect: FC<CustomSelectProps> = ({
	register,
	defaultValue,
	label = "Хранилище",
	isAvailable,
}) => {
	const [options, setOptions] = useState<StorageOption[]>([]);

	useEffect(() => {
		const fetchStorages = async () => {
			try {
				const response = await getStorages();
				const formattedOptions = response.map((storage: any) => ({
					value: storage.id,
					label: storage.storageName,
				}));
				setOptions(formattedOptions);
			} catch (err) {
				console.error("Ошибка загрузки хранилищ", err);
			}
		};

		fetchStorages();
	}, []);

	return (
		<CustomSelect
			options={options}
			defaultValue={defaultValue}
			register={register}
			label={label}
			isAvailable={isAvailable}
		/>
	);
};

export default StorageSelect;
