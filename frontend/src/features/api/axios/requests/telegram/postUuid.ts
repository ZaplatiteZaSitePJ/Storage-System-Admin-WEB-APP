import { axiosBase } from "../../axiosBase";
type PostUuidProps = {
	userId: number;
	userUuid: string;
};

const postUuid = async (request: PostUuidProps) => {
	const { userId, userUuid } = request;

	const requestJSON = JSON.stringify({
		userId,
		userUuid,
	});

	const response = await axiosBase.post(
		"v1/telegram/post-uuid",
		requestJSON,
		{
			headers: { "Content-Type": "application/json" },
		}
	);
	return response;
};

export default postUuid;
