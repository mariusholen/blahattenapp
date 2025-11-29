import { CardSection } from "@/components/CardSection";
import { SubHeader, TitleH2 } from "@/components/PageTitle";
import { QuestionOption } from "@/components/QuestionOption";
import type { SingleChoiceQuestion } from "@/components/src/data/intakeQuestions";

type SingleChoiceProps = {
	question: SingleChoiceQuestion;
	answer: string;
	onAnswer: (value: string) => void;
};

export const SingleChoice = ({
	question,
	answer,
	onAnswer,
}: SingleChoiceProps) => {
	return (
		<>
			<CardSection>
				<TitleH2 text={question.question} />
				{question.description && (<SubHeader text={question.description} />)}
			</CardSection>
			<CardSection>
				<QuestionOption
					options={question.options}
					selectedOption={answer}
					handleSelect={onAnswer}
				/>
			</CardSection>
		</>
	);
};
