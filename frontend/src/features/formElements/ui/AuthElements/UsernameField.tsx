import type { InputProps } from "@shared/ui/ui-kit";
import { Input } from "@shared/ui/ui-kit";
import type { FC } from "react";

const UsernameField: FC<InputProps> = ({
	register,
	sx,
	subContent,
	isAvailable,
}) => {
	return (
		<Input
			label="Имя пользователя (на английском)"
			register={register}
			fullWidth
			type="text"
			isAvailable={isAvailable}
			sx={sx}
			subContent={subContent}
		/>
	);
};

export default UsernameField;
