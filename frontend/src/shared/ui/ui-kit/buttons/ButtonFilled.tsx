import Button from "@mui/material/Button";
import type { ButtonProps } from "@mui/material/Button";
import { styled } from "@mui/material/styles";

interface CustomButtonFilledProps extends ButtonProps {
	bgColor?: string;
	textColor?: string;
}

const ButtonFilled = styled(Button)<CustomButtonFilledProps>(
	({ bgColor = "var(--blue-color)", textColor = "var(--white-color)" }) => ({
		backgroundColor: bgColor,
		color: textColor,
		width: "fit-content",
		fontSize: "var(--normal-font-size)",
		fontFamily: "ALSHauss",
		fontWeight: 500,
		borderRadius: "1rem",
		border: `0.2rem solid ${bgColor}`,
		padding: "0.5rem 2rem",
		textTransform: "none",
		transition: "ease 0.2s",
		lineHeight: 1.25,
		"&:hover": {
			backgroundColor: "var(--light-blue-color)",
			border: "0.2rem solid var(--light-blue-color)",
		},
	})
);

export default ButtonFilled;
