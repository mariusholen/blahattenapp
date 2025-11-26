import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card } from "../components/ui/card";
import type { BodyPart } from "../types";
import { QuestionOption } from "../components/QuestionOption";
import { TitleH2 } from "../components/PageTitle";
import { QuestionTracker } from "@/components/QuestionTracker";
import { NavButtons } from "@/components/NavButtons";

type FormData = {
	bodyPart: BodyPart | "";
	duration: string;
	painType: string;
	aggravatingFactors: string;
	//selfTest: string;
	previousIssues: string;
};

const questions = [
	{
		id: "bodyPart",
		question: "Where do you feel the pain most?",
		options: ["Neck", "Shoulder", "Elbow", "Back", "Knee", "Ankle/Foot"],
	},
	{
		id: "duration",
		question: "How long have you had this issue?",
		options: ["<1 week", "1–4 weeks", "1–3 months", ">3 months"],
	},
	{
		id: "painType",
		question: "How would you describe the pain?",
		options: ["Sharp", "Dull", "Radiating", "Sharp with movement"],
	},
	{
		id: "aggravatingFactors",
		question: "When does the pain tend to get worse?",
		options: [
			"During activity",
			"During rest",
			"At night",
			"During specific movements",
		],
	},
	{
		id: "previousIssues",
		question: "Have you experienced similar issues before?",
		options: ["Yes", "No"],
	},
];

/*const mockSelfTest: Record<BodyPart, SelfTest> = {
	Neck: {
		title: "Spurling’s Test",
		question:
			"Can you try a quick neck self-test? Gently tilt your head toward the painful side and apply light downward pressure with your hand. Does this reproduce your usual pain or tingling down the arm?",
		options: ["Yes", "No", "Not sure"],
	},
	Shoulder: {
		title: "Painful Arc Test",
		question:
			"Can you try lifting your arm slowly out to the side (like making a half-circle) until it is above your head? Did the pain increase specifically between shoulder height and ear level?",
		options: ["Yes", "No", "Not sure"],
	},
	Elbow: {
		title: "Cozen’s Test",
		question:
			"Can you place your affected arm straight out in front of you, make a fist, and bend your wrist upward? Use your other hand to gently push the wrist downward while resisting. Does this reproduce your elbow pain on the outside of the joint?",
		options: ["Yes", "No", "Not sure"],
	},
	Back: {
		title: "Forward Flexion Test",
		question:
			"Can you try bending forward slowly as if reaching for your toes? Does this movement reproduce your usual lower-back pain or cause sharp or radiating discomfort?",
		options: ["Yes", "No", "Not sure"],
	},
	Knee: {
		title: "Single-Leg Squat Test",
		question:
			"Can you try doing a slow single-leg squat on the affected side, going down about 30–40 degrees? Does this bring out your typical knee pain at the front or inside the knee?",
		options: ["Yes", "No", "Not sure"],
	},
	"Ankle/Foot": {
		title: "Calf Raise Pain Test",
		question:
			"Can you stand on the affected foot and slowly raise your heel off the ground (a single-leg calf raise)? Does this reproduce the pain in your ankle or foot?",
		options: ["Yes", "No", "Not sure"],
	},
};*/

const IntakePage = () => {
	const navigate = useNavigate();
	const [currentStep, setCurrentStep] = useState(0);
	const [formData, setFormData] = useState<FormData>({
		bodyPart: "",
		duration: "",
		painType: "",
		aggravatingFactors: "",
		//selfTest: "",
		previousIssues: "",
	});

	const currentQuestion = questions[currentStep];

	const handleSelect = (value: string) => {
		setFormData((prev) => ({ ...prev, [currentQuestion.id]: value }));
	};
	const handleNext = () => {
		if (currentStep < questions.length - 1) {
			setCurrentStep((prev) => prev + 1);
		} else {
			navigate("/summary", { state: formData });
		}
	};
	const handleBack = () => {
		if (currentStep > 0) {
			setCurrentStep((prev) => prev - 1);
		} else {
			navigate("/");
		}
	};
	const isAnswered = formData[currentQuestion.id as keyof FormData] !== "";

	return (
		<div className="min-h-screen bg-background flex items-center justify-center p-4">
			<Card className="max-w-2xl w-full p-8 md:p-12 space-y-8">
				<QuestionTracker
					currentStep={currentStep + 1}
					totalSteps={questions.length}
				/>

				<div className="space-y-6">
					<TitleH2 text={currentQuestion.question} />
					<QuestionOption
						selectedOption={
							formData[currentQuestion.id as keyof FormData] as string
						}
						options={currentQuestion.options}
						handleSelect={handleSelect}
					/>
				</div>

				<NavButtons
					isAnswered={isAnswered}
					lastStep={currentStep === questions.length - 1}
					handleNext={handleNext}
					handleBack={handleBack}
				/>
			</Card>
		</div>
	);
};

export default IntakePage;
