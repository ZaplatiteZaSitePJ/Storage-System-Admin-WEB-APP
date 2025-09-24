import Button from "@mui/material/Button";
import type { ButtonProps } from "@mui/material/Button";
import { styled } from "@mui/material/styles";

interface CustomButtonTextProps extends ButtonProps {
	textColor?: string;
	textSize?: string;
	textWeight?: number;
}

const ButtonText = styled(Button)<CustomButtonTextProps>(
	({
		textColor = "var(--white-color)",
		textSize = "var(--large-font-size)",
		textWeight = 500,
	}) => ({
		backgroundColor: "transparent",
		width: "fit-content",
		color: textColor,
		padding: "0 0",
		fontFamily: "ALSHauss",
		fontSize: textSize,
		fontWeight: textWeight,
		textTransform: "none",
		transition: "ease 0.2s",
		"&:hover": {
			transform: "scale(1.2)",
		},
	})
);

export default ButtonText;
