import type { InputProps } from "@shared/ui/ui-kit";
import { Input } from "@shared/ui/ui-kit";
import type { FC } from "react";

const NameField: FC<InputProps> = ({
	register,
	sx,
	subContent,
	label = "Название",
	isAvailable,
}) => {
	return (
		<Input
			label={label}
			register={register}
			fullWidth
			sx={sx}
			subContent={subContent}
			isAvailable={isAvailable}
		/>
	);
};

export default NameField;
