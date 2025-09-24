import type { SelectProps } from "@mui/material/Select";
import type { UseFormRegisterReturn } from "react-hook-form";
import type { OptionSelect } from "../types/option.type";

export type CustomSelectProps = SelectProps & {
	label?: string;
	register?: UseFormRegisterReturn;
	options?: OptionSelect[];
	defaultValues?: string | undefined;
	isAvailable?: boolean;
	width?: string;
};
