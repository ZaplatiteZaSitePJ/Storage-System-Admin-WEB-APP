import type { FC } from "react";
import { CustomSelect } from "@shared/ui/ui-kit/select/ui/Select";
import type { OptionSelect } from "@shared/ui/ui-kit/select/types/option.type";
import type { CustomSelectProps } from "@shared/ui/ui-kit";

const options: OptionSelect[] = [
	{ value: "Socks", label: "Носки" },
	{ value: "T-shirt", label: "Футболки" },
	{ value: "Jeans", label: "Джинсы" },
	{ value: "Instroments", label: "Инструменты" },
];

const CategorySelect: FC<CustomSelectProps> = ({
	register,
	defaultValue,
	label = "Категория",
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

export default CategorySelect;
