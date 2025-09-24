import { useState } from "react";
import Autocomplete from "@mui/material/Autocomplete";
import getAtributesStartsWith from "@features/api/axios/requests/atributes/getAtributesStartsWith";
import { ButtonFilled, Input } from "@shared/ui/ui-kit";
import type { AtributesType } from "@widgets/atributes/types/atribute.type";
import Modal from "@features/modal/Modal";
import AddAtributesForm from "@widgets/atributes/ui/addAtributes/AddAtributesForm";

const baseAtributes = ["object_name", "size", "status", "photoId", "type"];

const AtributeInput = ({
	register,
	index,
	userAtributes,
	hiddenAdd = false,
	mode = "create",
}: {
	register: any;
	index?: number;
	userAtributes?: string[];
	hiddenAdd?: boolean;
	mode?: "create" | "search";
}) => {
	const [options, setOptions] = useState<AtributesType[]>([]);
	const [loading, setLoading] = useState(false);
	const [selectedAttributes, setSelectedAttributes] = useState<
		AtributesType[]
	>([]);
	const [isCreating, setIsCreating] = useState<boolean>(false);

	const settedAtributes = [...baseAtributes, ...(userAtributes ?? [])];

	const fetchOptions = async (query: string) => {
		if (!query) {
			setOptions([]);
			return;
		}
		setLoading(true);
		try {
			const res = await getAtributesStartsWith(query);
			const filtredRes = res.filter(
				(atribute: AtributesType) =>
					!settedAtributes.includes(atribute.attributeName)
			);
			setOptions(filtredRes ?? []);
		} catch (err) {
			console.error(err);
		} finally {
			setLoading(false);
		}
	};

	const handleSelect = (value: AtributesType | string | null) => {
		if (value && typeof value !== "string") {
			if (!selectedAttributes.find((a) => a.id === value.id)) {
				setSelectedAttributes((prev) => [...prev, value]);
			}
		}
	};

	return (
		<div>
			<div
				style={{
					width: "100%",
					padding: "32px",
					backgroundColor: "var(--dark-blue-color)",
					borderRadius: "16px",
					display: "flex",
					justifyContent: "space-between",
					flexWrap: "wrap",
					gap: "40px",
				}}
			>
				<Autocomplete
					freeSolo
					options={options}
					getOptionLabel={(option) =>
						typeof option === "string"
							? option
							: `${option.russianLabel} (${option.attributeName} )`
					}
					loading={loading}
					onInputChange={(_, newInputValue) =>
						fetchOptions(newInputValue)
					}
					onChange={(_, value) => {
						handleSelect(value as AtributesType);
						settedAtributes.push();
					}}
					renderInput={(params) => (
						<Input
							{...params}
							label="Выберите параметр"
							width="240px"
						/>
					)}
				/>

				{!hiddenAdd && (
					<ButtonFilled
						onClick={() => setIsCreating(true)}
						bgColor="var(--bg-blue-color)"
					>
						Создать параметр
					</ButtonFilled>
				)}

				{isCreating && (
					<Modal
						title="Создание параметра"
						onClose={() => setIsCreating(false)}
					>
						<AddAtributesForm
							handleClose={() => setIsCreating(false)}
						/>
					</Modal>
				)}
			</div>

			<div
				style={{
					marginTop: "32px",
					width: "100%",
					display: "flex",
					flexWrap: "wrap",
					gap: "40px",
				}}
			>
				{mode == "create" &&
					selectedAttributes.map((attr, i) => (
						<>
							<input
								type="hidden"
								value={attr.attributeName}
								{...register(
									`customAttributes.${
										Number(index) + i
									}.attributeName`
								)}
							/>
							<Input
								key={i + Number(index) || i}
								label={attr.russianLabel}
								type={attr.type}
								register={register(
									`customAttributes.${
										Number(index) + i
									}.value`
								)}
							/>
						</>
					))}
				{mode == "search" &&
					selectedAttributes.map((attr, i) => (
						<>
							<Input
								key={i + Number(index) || i}
								label={attr.russianLabel}
								type={attr.type}
								register={register(attr.attributeName)}
							/>
						</>
					))}
			</div>
		</div>
	);
};

export default AtributeInput;
