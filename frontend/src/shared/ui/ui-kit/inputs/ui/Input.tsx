import { FormControl, TextField } from "@mui/material";
import type { InputProps } from "../types/input.type";
import type { FC } from "react";

const Input: FC<InputProps> = ({
	register,
	defaultValue,
	label,
	width,
	fullWidth = false,
	sx,
	multiline = false,
	subContent,
	type = "text",
	isAvailable = true,
	placeholder,
	variant = "standard",
	min,
	...props
}) => {
	return (
		<div style={{ height: "70px", display: "flex", alignItems: "end" }}>
			<FormControl fullWidth={!!fullWidth} sx={{ height: "56px" }}>
				<TextField
					label={label}
					defaultValue={defaultValue}
					fullWidth={!!fullWidth}
					multiline={!!multiline}
					placeholder={placeholder}
					variant={variant}
					type={type}
					{...register}
					disabled={!isAvailable}
					{...props}
					sx={{
						width,
						"& .MuiInputBase-root": {
							fontSize: "var(--normal-font-size)",
							fontWeight: 500,
							color: "var(--white-color)",
							fontFamily: "ALSHauss",
							cursor: isAvailable ? "pointer" : "not-allowed",
							paddingBottom: "4px",

							"&.Mui-disabled": {
								color: "var(--white-color)",
								cursor: "not-allowed",
							},
							"&.Mui-disabled input": {
								WebkitTextFillColor: "var(--white-color)",
								cursor: isAvailable ? "pointer" : "not-allowed",
								color: "var(--white-color)",
							},
						},
						"& .MuiInputLabel-root": {
							fontSize: "var(--small-font-size)",
							color: "var(--white-color)",
							fontFamily: "ALSHauss",
							fontWeight: 100,
							transform: "translate(0, -12px) scale(1)",

							"&.Mui-disabled": {
								color: "var(--white-color)",
								cursor: "not-allowed",
							},
						},
						"& .MuiInputLabel-root.Mui-focused": {
							color: "var(--white-color)",
						},
						"& .MuiInput-underline:before": {
							borderBottom: "2px solid var(--white-color)",
						},
						"& .MuiInput-underline:hover:before": {
							borderBottom:
								"2px solid var(--white-color) !important",
						},
						"& .MuiInput-underline:after": {
							borderBottom: "3px solid var(--white-color)",
						},
						"& .MuiInput-underline.Mui-disabled:before": {
							borderBottomStyle: "solid",
							borderBottomColor: "var(--white-color)",
						},
						...sx,
					}}
				/>
				{subContent}
			</FormControl>
		</div>
	);
};

export default Input;
