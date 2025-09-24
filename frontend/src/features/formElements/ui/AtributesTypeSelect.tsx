import type { FC } from "react";
import { CustomSelect } from "@shared/ui/ui-kit/select/ui/Select";
import type { OptionSelect } from "@shared/ui/ui-kit/select/types/option.type";
import type { CustomSelectProps } from "@shared/ui/ui-kit";

const options: OptionSelect[] = [
	{ value: "STRING", label: "Строка" },
	{ value: "NUMBER", label: "Число" },
	{ value: "DATE", label: "Дата" },
];

const AtributesTypeSelect: FC<CustomSelectProps> = ({
	register,
	defaultValue,
	label = "Тип атрибута",
	isAvailable,
	width,
}) => {
	return (
		<CustomSelect
			options={options}
			defaultValue={defaultValue}
			register={register}
			label={label}
			isAvailable={isAvailable}
			width={width}
		/>
	);
};

export default AtributesTypeSelect;
