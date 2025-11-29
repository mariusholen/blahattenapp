import { Card } from "../components/ui/card";
import { QuestionTracker } from "@/components/QuestionTracker";
import { NavButtons } from "@/components/NavButtons";
import { BodyPart } from "@/intake/BodyPart";
import { SingleChoice } from "@/intake/SingleChoice";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { intakeQuestions } from "@/components/src/data/intakeQuestions";
import { extractNumber } from "@/lib/utils";

const IntakePage = () => {
	const navigate = useNavigate();
	const questions = intakeQuestions;
	const questionTotalCount = questions.length; //TODO
	const [questionCounter, setQuestionCounter] = useState(1);
	const [answers, setAnswers] = useState<{ [questionId: string]: string }>({});
	const [previousQuestion, setPreviousQuestion] = useState<string>("0");
	const [currentQuestion, setCurrentQuestion] = useState<string>("1");
	const [nextQuestion, setNextQuestion] = useState<string>("2");

	const getCurrentQuestion = () => {
		return questions.find((q) => q.id === currentQuestion);
	};

	/*const onChangeNextQuestion = (questionId: string) => {
		setNextQuestion(questionId);
	};*/

	const goToPreviousPage = () => {
		if (previousQuestion === "0") navigate("/");
		setPreviousQuestion((extractNumber(previousQuestion) - 1).toString());
		setCurrentQuestion(previousQuestion);
		setNextQuestion(currentQuestion);
		setQuestionCounter((prev) => prev - 1);
	};

	const goToNextPage = () => {
		if (questionCounter === questionTotalCount)
			navigate("/summary", {
				state: {
					bodyPart: getAnswer("1"),
					duration: getAnswer("2"),
					painType: getAnswer("4"),
					aggravatingFactors: "",
					selfTest: "",
					previousIssues: "",
				},
			});

		setPreviousQuestion(currentQuestion);
		setCurrentQuestion(nextQuestion);
		setNextQuestion((extractNumber(nextQuestion) + 1)?.toString());
		setQuestionCounter((prev) => prev + 1);
	};

	const getAnswer = (questionId: string): string => answers[questionId] ?? "";
	const currentQuestionIsAnswered = answers[currentQuestion] !== undefined;
	const onAnswer = (questionId: string, value: string) => {
		setAnswers((prev) => ({
			...prev,
			[questionId]: value,
		}));
	};

	const renderQuestion = () => {
		const question = getCurrentQuestion();
		if (!question) return null;

		if (question.type === "bodyPart")
			return (
				<BodyPart
					question={question}
					answer={getAnswer(question.id)}
					onAnswer={(value) => onAnswer(question.id, value)}
				/>
			);
		if (question.type === "singleChoice")
			return (
				<SingleChoice
					question={question}
					answer={getAnswer(question.id)}
					onAnswer={(value) => onAnswer(question.id, value)}
				/>
			);
	};

	return (
		<div className="min-h-screen bg-background flex items-center justify-center p-4">
			<Card className="max-w-2xl w-full p-8 md:p-12 space-y-4">
				<QuestionTracker
					currentStep={questionCounter}
					totalSteps={questionTotalCount}
				/>
				{renderQuestion()}
				<NavButtons
					isAnswered={currentQuestionIsAnswered}
					isLastStep={questionCounter === questionTotalCount}
					handleNext={goToNextPage}
					handleBack={goToPreviousPage}
				/>
			</Card>
		</div>
	);
};

export default IntakePage;
