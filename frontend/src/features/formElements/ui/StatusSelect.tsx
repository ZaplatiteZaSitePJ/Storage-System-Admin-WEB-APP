import type { FC } from "react";
import { CustomSelect } from "@shared/ui/ui-kit/select/ui/Select";
import type { OptionSelect } from "@shared/ui/ui-kit/select/types/option.type";
import type { CustomSelectProps } from "@shared/ui/ui-kit";

const options: OptionSelect[] = [
	{ value: "STORED", label: "На хранении" },
	{ value: "WRITTEN_OFF", label: "Списано" },
	{ value: "BORROWED", label: "Выдано" },
	{ value: "RESERVED", label: "Зарезервировано" },
];

const StatusSelect: FC<CustomSelectProps> = ({
	register,
	defaultValue,
	label = "Статус",
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

export default StatusSelect;
