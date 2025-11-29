export type QuestionType = "bodyPart" | "singleChoice" | "slider";

export type BaseQuestion = {
	id: string;
	question: string;
	description?: string;
	type: QuestionType;
	nextQuestionId?: string;
};

export type SingleChoiceQuestion = BaseQuestion & {
	type: "singleChoice";
	options: string[];
};

export type SliderQuestion = BaseQuestion & {
	type: "slider";
	range: [number, number];
};

export type BodyPartQuestion = BaseQuestion & {
	type: "bodyPart";
};

export type Question = BodyPartQuestion | SingleChoiceQuestion | SliderQuestion;

export const intakeQuestions: Question[] = [
	{
		id: "1",
		question: "Hvor har du mest vondt?",
		description:
			"Trykk på området som best samsvarer med der du opplever smerte.",
		type: "bodyPart",
	},
	{
		id: "2",
		question: "Når startet plagene?",
		type: "singleChoice",
		options: [
			"I dag",
			"For noen dager siden",
			"Mellom 4 og 14 dager siden",
			"Mer enn 14 dager siden",
		],
	},
	{
		id: "3",
		question: "Hvordan oppstod plagene?",
		type: "singleChoice",
		options: ["Akutt", "Gradvis", "Vet ikke"],
	},
	{
		id: "4",
		question: "Hvordan vil du beskrive smertene?",
		type: "singleChoice",
		options: ["Strålende", "Verkende", "Sviende", "Skyting", "Annen"],
	},
	/*{
		id: "5",
		question: "Hvor vondt har du?",
		description:
			"På en skala fra 1 til 10, der 1 er minst vondt og 10 er verst mulig vondt.",
		type: "slider",
		range: [1, 10],
	},*/
];
