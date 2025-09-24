import Button from "@mui/material/Button";
import type { ButtonProps } from "@mui/material/Button";
import { styled } from "@mui/material/styles";

interface CustomButtonProps extends ButtonProps {
	borderColor?: string;
	textColor?: string;
}

const ButtonBordered = styled(Button)<CustomButtonProps>(
	({ borderColor = "var(--white-color)" }) => ({
		backgroundColor: "transparent",
		width: "fit-content",
		color: "var(--white-color)",
		fontSize: "var(--normal-font-size)",
		fontWeight: "bold",
		borderRadius: "1rem",
		border: `0.2rem solid ${borderColor}`,
		padding: "0.5rem 2rem",
		textTransform: "none",
		transition: "ease-in 0.2s",
		lineHeight: 1.25,
		"&:hover": {
			backgroundColor: borderColor,
		},
	})
);

export default ButtonBordered;
