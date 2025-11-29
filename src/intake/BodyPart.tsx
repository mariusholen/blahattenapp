import { TitleH2, SubHeader } from "@/components/PageTitle";
import { CardSection } from "@/components/CardSection";
import { BodyMap } from "@/components/BodyMap";
import type { BodyPartQuestion } from "@/components/src/data/intakeQuestions";

type BodyPartProps = {
	question: BodyPartQuestion;
	answer: string;
	onAnswer: (value: string) => void;
};

export const BodyPart = ({ question, answer, onAnswer }: BodyPartProps) => (
	<>
		<CardSection>
			<TitleH2 text={question.question} />
			{question.description && <SubHeader text={question.description} />}
		</CardSection>
		<CardSection className="flex justify-center">
			<BodyMap answer={answer} onAnswer={onAnswer} />
		</CardSection>
	</>
);
