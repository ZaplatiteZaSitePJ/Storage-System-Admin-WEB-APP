const entitieRussificator = (type: string) => {
	switch (type) {
		case "cell":
			return { ruType: "ячейка", ruNumberTitle: "свободных мест" };
		case "storage":
			return { ruType: "хранилище", ruNumberTitle: "свободных мест" };
		case "object":
			return { ruType: "объект", ruNumberTitle: "количество" };
		default:
			return { ruType: "ошибка", ruNumberTitle: "ошибка" };
	}
};

export default entitieRussificator;
