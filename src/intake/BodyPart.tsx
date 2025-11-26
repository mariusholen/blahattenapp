import { TitleH2, SubHeader } from "@/components/PageTitle";
import type { BodyPart as BodyPartType } from "../types";
import { QuestionOption } from "@/components/QuestionOption";
import {
	useQuestionContext,
	type BodyPartSelectOptions,
} from "@/context/UseQuestionContext";
import { CardSection } from "@/components/CardSection";

type BodyPartProps = {};

export const BodyPart = ({}: BodyPartProps) => {
	const { bodyPart, onChangeBodyPart } = useQuestionContext();
	const questionText = "Hvor har du mest vondt?";
	const questionDescription =
		"Trykk på området som best samsvarer med der du opplever smerte.";
	const options = [
		"Neck",
		"Shoulder",
		"Elbow",
		"Back",
		"Knee",
		"Ankle/Foot",
	] as BodyPartType[];

	return (
		<>
			<CardSection>
				<TitleH2 text={questionText} />
				<SubHeader text={questionDescription} />
			</CardSection>
			<CardSection>
				<QuestionOption
					selectedOption={bodyPart}
					options={options}
					handleSelect={(v) => onChangeBodyPart(v as BodyPartSelectOptions)}
				/>
			</CardSection>
		</>
	);
};
