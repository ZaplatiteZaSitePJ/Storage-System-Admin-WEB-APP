import type { FC } from "react";
import { CustomSelect } from "@shared/ui/ui-kit/select/ui/Select";
import type { OptionSelect } from "@shared/ui/ui-kit/select/types/option.type";
import type { CustomSelectProps } from "@shared/ui/ui-kit";

const options: OptionSelect[] = [
	{ value: "ITEMS_SIZE", label: "Количество объектов (шт.)" },
	{ value: "ITEMS_SIZE_PERCENTILE", label: "Заполненность (% )" },
];

const StoragesFieldSelect: FC<CustomSelectProps> = ({
	register,
	defaultValue,
	label = "Параметр",
	isAvailable,
}) => {
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

export default StoragesFieldSelect;
