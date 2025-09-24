import type { InputProps } from "@shared/ui/ui-kit";
import { Input } from "@shared/ui/ui-kit";
import type { FC } from "react";

const PasswordField: FC<InputProps> = ({ register, sx, subContent, label }) => {
	return (
		<Input
			label={label ? label : "Пароль"}
			register={register}
			fullWidth
			type="password"
			sx={sx}
			subContent={subContent}
		/>
	);
};

export default PasswordField;
