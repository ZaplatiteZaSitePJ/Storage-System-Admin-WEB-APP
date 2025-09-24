import { useEffect, type ReactNode } from "react";
import { createPortal } from "react-dom";
import styles from "./Modal.module.scss";

const modalRoot = document.getElementById("modal-root") as HTMLElement;

interface ModalProps {
	onClose: () => void;
	children: ReactNode;
	title: string;
	bgColor?: string;
}

export default function Modal({
	children,
	title,
	onClose,
	bgColor = "var(--bg-blue-color)",
}: ModalProps) {
	const handleClose = () => {
		onClose();
	};

	useEffect(() => {
		const handleEsc = (e: KeyboardEvent) => {
			if (e.key === "Escape") {
				handleClose();
			}
		};
		document.addEventListener("keydown", handleEsc);
		return () => document.removeEventListener("keydown", handleEsc);
	}, []);

	return createPortal(
		<div className={styles.modal} onClick={handleClose}>
			<div
				className={styles.modal__container}
				style={{ backgroundColor: bgColor }}
				onClick={(e) => e.stopPropagation()}
			>
				<div className={styles.modal__header}>
					<h2>{title}</h2>

					<button
						className={styles.modal__closeButton}
						onClick={handleClose}
					>
						✕
					</button>
				</div>

				{children}
			</div>
		</div>,
		modalRoot
	);
}
