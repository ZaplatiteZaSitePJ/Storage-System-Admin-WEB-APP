import type { ReactNode } from "react";
import type { UseFormRegisterReturn } from "react-hook-form";
import type { TextFieldProps } from "@mui/material/TextField";

export type InputProps = TextFieldProps & {
	register?: UseFormRegisterReturn;
	subContent?: ReactNode;
	isAvailable?: boolean;
	width?: string;
	type?: string;
	variant?: string;
	min?: number;
};
