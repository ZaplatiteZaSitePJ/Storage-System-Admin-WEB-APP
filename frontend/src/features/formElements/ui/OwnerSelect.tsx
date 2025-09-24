import type { FC } from "react";
import { CustomSelect } from "@shared/ui/ui-kit/select/ui/Select";
import type { OptionSelect } from "@shared/ui/ui-kit/select/types/option.type";
import type { CustomSelectProps } from "@shared/ui/ui-kit";

const options: OptionSelect[] = [
	{ value: "Мужик Мужиков", label: "Мужик Мужиков" },
	{ value: "Женщина Женщинова", label: "Женщина Женщинова" },
	{ value: "Человек Человеков", label: "Человек Человеков" },
];

const OwnerSelect: FC<CustomSelectProps> = ({
	register,
	defaultValue,
	label,
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

export default OwnerSelect;
