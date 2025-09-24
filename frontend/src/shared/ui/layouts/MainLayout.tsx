import Navigation from "../navigation/Navigation";
import styles from "./MainLayout.module.scss";
import { Outlet } from "react-router-dom";

export default function MainLayout() {
	return (
		<div className={styles.background}>
			<div className={styles.layout}>
				<aside className={styles.layout__aside}>
					<Navigation />
				</aside>

				<div className={styles.layout__content}>
					<div className={styles.layout__wrapper}>
						<Outlet />
					</div>
				</div>

				<footer className={styles.layout__footer}></footer>
			</div>
		</div>
	);
}
