const formatIsoToDDMMYYYY = (dateStr?: string) => {
	if (!dateStr) return dateStr;
	const isoDateRegex = /^\d{4}-\d{2}-\d{2}$/;
	if (!isoDateRegex.test(dateStr)) return dateStr;

	const [year, month, day] = dateStr.split("-");
	return `${day}.${month}.${year}`;
};

export const formatedDateForPost = (attrs: Record<string, any>) => {
	const formatted: Record<string, any> = {};

	for (const key in attrs) {
		const value = attrs[key];

		if (typeof value === "string") {
			formatted[key] = formatIsoToDDMMYYYY(value);
		} else {
			formatted[key] = value;
		}
	}

	return formatted;
};
