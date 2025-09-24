import EntitiesLayout from "@shared/ui/layouts/entietiesLayout/ui/EntitiesLayout";
import type { ObjectType } from "@entities/Objects/types/objects.type";
import ObjectForm from "@widgets/objects/ui/ObjectForm/ObjectForm";
import { useLoaderData, useRevalidator } from "react-router-dom";

export default function ObjectUnit() {
	const object = useLoaderData() as ObjectType;
	const { revalidate } = useRevalidator();

	return (
		<EntitiesLayout
			treeLink={`/tree/${object._id}`}
			title={object.objectName}
			subTitle={`Артикул: ${object._id} `}
			form={
				<ObjectForm
					object={object}
					mode="save"
					parentStorageId={object.parentStorageId}
					onSaved={revalidate}
				/>
			}
			entitie={object}
		/>
	);
}
