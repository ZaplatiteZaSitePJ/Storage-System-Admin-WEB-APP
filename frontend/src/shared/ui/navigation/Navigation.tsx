import { NavLink } from "react-router-dom";
import styles from "./Navigation.module.scss";
import Logo from "@shared/assets/t1-Logo.svg?react";
import cn from "classnames";

export default function Navigation() {
	return (
		<div className={styles.container}>
			<Logo className={styles.logo} />

			<nav className={styles.navigation}>
				<NavLink
					to={"/storages"}
					className={({ isActive }) =>
						cn(styles.navigation__pages, {
							[styles.navigation__active]: isActive,
						})
					}
				>
					Хранилища
				</NavLink>

				<NavLink
					to={"/objects"}
					className={({ isActive }) =>
						cn(styles.navigation__pages, {
							[styles.navigation__active]: isActive,
						})
					}
				>
					Объекты
				</NavLink>

				<NavLink
					to={"/tree"}
					className={({ isActive }) =>
						cn(styles.navigation__pages, {
							[styles.navigation__active]: isActive,
						})
					}
				>
					Дерево
				</NavLink>

				{/* <NavLink
					to={"/history"}
					className={({ isActive }) =>
						cn(styles.navigation__pages, {
							[styles.navigation__active]: isActive,
						})
					}
				>
					История
				</NavLink> */}

				<NavLink
					to={"/settings"}
					className={({ isActive }) =>
						cn(styles.navigation__pages, {
							[styles.navigation__active]: isActive,
						})
					}
				>
					Настройки
				</NavLink>
			</nav>
		</div>
	);
}
