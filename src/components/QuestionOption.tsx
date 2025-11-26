type QuestionOptionProps = {
	selectedOption: string;
	options: string[];
	handleSelect: (option: string) => void;
};

export const QuestionOption = ({
	selectedOption,
	options,
	handleSelect,
}: QuestionOptionProps) => {
	return (
		<div className="grid gap-3">
			{options.map((option) => (
				<button
					key={option}
					onClick={() => handleSelect(option)}
					className={`p-4 text-left rounded-lg border-2 transition-all hover:border-primary ${
						selectedOption === option
							? "border-primary bg-primary/5"
							: "border-border bg-card"
					}`}
				>
					<span className="text-lg text-foreground">{option}</span>
				</button>
			))}
		</div>
	);
};
