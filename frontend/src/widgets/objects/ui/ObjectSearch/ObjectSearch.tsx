import { useState } from "react";
import styles from "./ObjectSearch.module.scss";
import cn from "classnames";
import QrSearch from "./qrSearch/QrSearch";
import FormSearch from "./formSearch/FormSearch";

type searchModeType = "qr" | "description";

export default function ObjectSearch() {
	const [searchMode, setSearchMode] = useState<searchModeType>("description");

	const switchMode = (mode: searchModeType) => setSearchMode(mode);

	return (
		<div className={styles.searchMode}>
			<div className={styles.searchMode__switchButton}>
				<button
					type="button"
					onClick={() => switchMode("description")}
					className={cn({
						[styles.searchMode__active]:
							searchMode === "description",
					})}
				>
					Описание
				</button>
				<span>/</span>
				<button
					type="button"
					onClick={() => switchMode("qr")}
					className={cn({
						[styles.searchMode__active]: searchMode === "qr",
					})}
				>
					QR-код
				</button>
			</div>

			<div className={styles.searchMode__searcherWidgetPlace}>
				{searchMode === "description" && <FormSearch />}
				{searchMode === "qr" && <QrSearch />}
			</div>
		</div>
	);
}
