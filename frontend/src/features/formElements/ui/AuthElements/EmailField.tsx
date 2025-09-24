import type { InputProps } from "@shared/ui/ui-kit";
import { Input } from "@shared/ui/ui-kit";
import type { FC } from "react";

const EmailField: FC<InputProps> = ({
	register,
	sx,
	subContent,
	isAvailable,
}) => {
	return (
		<Input
			label="Почта"
			register={register}
			fullWidth
			type="email"
			isAvailable={isAvailable}
			sx={sx}
			subContent={subContent}
		/>
	);
};

export default EmailField;
