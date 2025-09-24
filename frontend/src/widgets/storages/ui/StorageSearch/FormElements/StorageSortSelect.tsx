import type { FC } from "react";
import { CustomSelect } from "@shared/ui/ui-kit/select/ui/Select";
import type { OptionSelect } from "@shared/ui/ui-kit/select/types/option.type";
import type { CustomSelectProps } from "@shared/ui/ui-kit";

const options: OptionSelect[] = [
	{ value: "topLevel", label: "Только верхнеуровневые" },
	{ value: "all", label: "Все хранилища" },
	{ value: "with_cels", label: "Все хранилища и ячейки" },
];

const StorageSortSelect: FC<CustomSelectProps> = ({
	register,
	defaultValue,
	label,
}) => {
	return (
		<CustomSelect
			options={options}
			defaultValue={defaultValue}
			register={register}
			label={label}
		/>
	);
};

export default StorageSortSelect;
