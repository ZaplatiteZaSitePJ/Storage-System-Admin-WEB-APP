import { Outlet } from "react-router-dom";
import styles from "./AuthLayout.module.scss";

export default function AuthLayout() {
	return (
		<div className={styles.background}>
			<div className={styles.layout}>
				<div className={styles.layout__content}>
					<div className={styles.layout__wrapper}>
						<Outlet />
					</div>
				</div>
			</div>
		</div>
	);
}
