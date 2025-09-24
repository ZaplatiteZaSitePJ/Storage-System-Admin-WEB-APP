import { FormControl, Select, MenuItem } from "@mui/material";
import type { FC } from "react";
import type { CustomSelectProps } from "../types/customSelectProps.type";

export const CustomSelect: FC<CustomSelectProps> = ({
	register,
	options,
	label,
	isAvailable = true,
	sx,
	defaultValue,
	width = "240px",
	...rest
}) => {
	return (
		<FormControl
			sx={{
				minWidth: width,
				paddingBottom: "6px",
			}}
		>
			{label && (
				<p
					style={{
						fontWeight: "100",
						marginBottom: "8px",
						fontSize: "var(--small-font-size)",
					}}
				>
					{label}
				</p>
			)}

			<Select
				disabled={!isAvailable}
				{...register}
				{...rest}
				defaultValue={defaultValue}
				sx={{
					fontSize: "var(--normal-font-size)",
					fontWeight: 500,
					transition: "ease 0.25s",
					minWidth: width,

					"& .MuiSelect-select": {
						color: "var(--dark-blue-color)",
						fontWeight: 700,
						backgroundColor: "var(--white-color)",
						transition: "ease 0.25s",
						padding: "8px",
					},

					"& .MuiSelect-select.Mui-disabled": {
						cursor: "not-allowed",
					},

					"& .MuiSelect-icon": {
						color: isAvailable
							? "var(--dark-blue-color)"
							: "var(--white-color)",
						transition: "ease 0.25s",
					},

					"& .MuiOutlinedInput-notchedOutline": {
						borderColor: "var(--white-color)",
					},

					"&:hover .MuiOutlinedInput-notchedOutline": {
						borderColor: "var(--white-color)",
					},

					"&.Mui-focused .MuiOutlinedInput-notchedOutline": {
						borderColor: "var(--white-color)",
					},

					"&:hover": {
						"& .MuiSelect-icon": {
							color: isAvailable
								? "var(--light-blue-color)"
								: "var(--white-color)",
						},

						"& .MuiSelect-select": {
							color: "var(--light-blue-color)",
						},
					},

					...sx,
				}}
			>
				{options &&
					options.map((option) => (
						<MenuItem
							key={option.value}
							value={option.value}
							sx={{
								fontFamily: "ALSHauss",
								color: "var(--dark-blue-color)",
								fontSize: "var(--normal-font-size)",
								fontWeight: 100,
								transition: "ease-in 0.1s",

								"&:hover": {
									backgroundColor: "var(--light-blue-color)",
									color: "var(--white-color)",

									"&.Mui-selected:hover": {
										backgroundColor:
											"var(--light-blue-color)",
										color: "var(--white-color)",
									},
								},
							}}
						>
							{option.label}
						</MenuItem>
					))}
			</Select>
		</FormControl>
	);
};
