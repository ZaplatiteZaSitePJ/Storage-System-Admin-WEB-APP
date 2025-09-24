const entitieColorSheet = (type: "storage" | "cell" | "object") => {
	switch (type) {
		case "cell":
			return {
				color: "var(--white-color)",
				backgroundColor: "var(--blue-color)",
				border: "3px solid var(--blue-color)",
			};
		case "storage":
			return {
				color: "var(--white-color)",
				backgroundColor: "var(--dark-blue-color)",
				border: "3px solid #6F757B",
			};
		case "object":
			return {
				color: "var(--dark-blue-color)",
				backgroundColor: "#e2e2e2ff",
				border: "3px solid #e2e2e2ff",
			};
		default:
			return;
	}
};

export default entitieColorSheet;
