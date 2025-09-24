export const formatDatesForView = (
	obj: Record<string, any>
): Record<string, any> => {
	const formatted: Record<string, any> = {};

	for (const key in obj) {
		const value = obj[key];

		if (typeof value === "string") {
			// если ISO с T
			if (/^\d{4}-\d{2}-\d{2}T/.test(value)) {
				formatted[key] = value.substring(0, 10); // yyyy-MM-dd
			}
			// если dd.MM.yyyy
			else if (/^(\d{2})\.(\d{2})\.(\d{4})$/.test(value)) {
				const [, day, month, year] = value.match(
					/^(\d{2})\.(\d{2})\.(\d{4})$/
				)!;
				formatted[key] = `${year}-${month}-${day}`;
			} else {
				formatted[key] = value;
			}
		} else if (
			value &&
			typeof value === "object" &&
			!Array.isArray(value)
		) {
			formatted[key] = formatDatesForView(value);
		} else {
			formatted[key] = value;
		}
	}

	return formatted;
};
