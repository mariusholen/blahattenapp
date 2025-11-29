import { ArrowLeft, ArrowRight } from "lucide-react";
import { ButtonGroup } from "./ButtonGroup";
import { Button } from "./ui/button";

type NavButtonsProps = {
	backText?: string;
	nextText?: string;
	isAnswered: boolean;
	isLastStep: boolean;
	handleBack: () => void;
	handleNext: () => void;
};

export const NavButtons = ({
	backText = "Tilbake",
	nextText = "Neste",
	isAnswered,
	isLastStep,
	handleNext,
	handleBack,
}: NavButtonsProps) => {
	return (
		<ButtonGroup>
			<Button
				onClick={handleBack}
				variant="outline"
				size="lg"
				className="flex-1"
			>
				<ArrowLeft className="mr-2 h-5 w-5" />
				{backText}
			</Button>
			<Button
				onClick={handleNext}
				disabled={!isAnswered}
				size="lg"
				className="flex-1"
			>
				{isLastStep ? "Oppsummering" : nextText}
				<ArrowRight className="ml-2 h-5 w-5" />
			</Button>
		</ButtonGroup>
	);
};
