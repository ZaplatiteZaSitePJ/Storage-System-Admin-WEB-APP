import { axiosBase } from "../../axiosBase";
import type { EventComparisonType } from "@entities/Event/type/event.type";

const postEvent = async (request: EventComparisonType) => {
	const {
		eventComparingMethod,
		comparedValue,
		fieldName,
		messageOnEvent,
		objectId,
	} = request;

	const requestJSON = JSON.stringify({
		userId: Number(localStorage.getItem("userId")),
		messageOnEvent: messageOnEvent,
		objectId: objectId.toString(),
		isStorageEvent: true,
		fieldName: fieldName,
		eventComparingMethod: eventComparingMethod,
		comparedValue: Number(comparedValue),
	});

	const response = await axiosBase.post("v1/events/insert", requestJSON, {
		headers: { "Content-Type": "application/json" },
	});
	return response;
};

export default postEvent;
