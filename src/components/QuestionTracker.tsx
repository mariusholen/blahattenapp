import { CardSection } from "./CardSection";
import { Progress } from "./ui/progress";

type QuestionTrackerProps = {
	currentStep: number;
	totalSteps: number;
};

export const QuestionTracker = ({
	currentStep,
	totalSteps,
}: QuestionTrackerProps) => {
	const progress = (currentStep / totalSteps) * 100;

	return (
		<CardSection>
			<div className="flex justify-between items-center text-sm text-muted-foreground">
				<span>
					Steg {currentStep} av {totalSteps}
				</span>
			</div>
			<Progress value={progress} className="h-2" />
		</CardSection>
	);
};
