import type { FC } from "react";
import { CustomSelect } from "@shared/ui/ui-kit/select/ui/Select";
import type { OptionSelect } from "@shared/ui/ui-kit/select/types/option.type";
import type { CustomSelectProps } from "@shared/ui/ui-kit";

const options: OptionSelect[] = [
	{ value: "LESS", label: "Меньше" },
	{ value: "GREATER", label: "Больше" },
];

const ComparisonSelect: FC<CustomSelectProps> = ({
	register,
	defaultValue,
	label = "Метод сравнения",
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

export default ComparisonSelect;
