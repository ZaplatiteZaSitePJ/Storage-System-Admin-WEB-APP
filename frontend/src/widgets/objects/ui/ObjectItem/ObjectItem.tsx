import { type FC } from "react";
import styles from "./ObjectItem.module.scss";
import type { ObjectType } from "@entities/Objects/types/objects.type";
import { Link } from "react-router-dom";
import Image from "../image/Image";

type ObjectItemProps = {
	object: ObjectType;
};

const ObjectItem: FC<ObjectItemProps> = ({ object }) => {
	return (
		<div className={styles.objectItem}>
			<Link to={`/objects/${object._id}`}>
				<Image
					photoId={object.photoId || 1}
					alt={object.objectName}
					className={styles.objectItem__img}
				/>
				<p>{object.objectName ?? `${object.objectName}`}</p>
			</Link>
		</div>
	);
};

export default ObjectItem;
