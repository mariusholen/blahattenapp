import { useState } from "react";

type BodyPartSelectOptions =
	| "Nakke"
	| "Venstre skulder"
	| "Høyre skulder"
	| "Venstre albue"
	| "Høyre albue"
	| "Midtrygg"
	| "Korsrygg"
	| "Venstre kne"
	| "Høyre kne"
	| "Venstre ankel"
	| "Høyre ankel"
	| "Venstre fot"
	| "Høyre fot"
	| "";

type BodyPartButtonProps = {
	title: BodyPartSelectOptions;
	xPosition: string;
	yPosition: string;
	selectedPart?: string;
	onClick: (title: BodyPartSelectOptions) => void;
};

export const BodyPartButton = ({
	title,
	xPosition,
	yPosition,
	selectedPart,
	onClick,
}: BodyPartButtonProps) => {
	const [hover, setHover] = useState(false);
	const isSelected = selectedPart === title;

	const showTooltip = hover || isSelected;
	return (
		<div
			className={`absolute ${yPosition} ${xPosition}`}
			onMouseEnter={() => setHover(true)}
			onMouseLeave={() => setHover(false)}
		>
			{/* Tooltip */}
			{showTooltip && (
				<div className="absolute -top-5 left-1/2 -translate-x-1/2 px-2 py-1 text-sm bg-black text-white rounded shadow-lg whitespace-nowrap z-50">
					{title}
				</div>
			)}
			<button
				onClick={() => onClick(title)}
				className={`bg-red-500 p-1.5 rounded-full shadow-md transition border-2 ${
					isSelected
						? "border-grey"
						: showTooltip
						? "border-grey-light"
						: "border-transparent"
				}`}
			/>
		</div>
	);
};
