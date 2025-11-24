import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../components/ui/button";
import { Card } from "../components/ui/card";
import { Progress } from "../components/ui/progress";
import { ArrowLeft, ArrowRight } from "lucide-react";

type BodyPart = "Neck" | "Shoulder" | "Elbow" | "Back" | "Knee" | "Ankle/Foot";

type FormData = {
	bodyPart: BodyPart | "";
	duration: string;
	painType: string;
	aggravatingFactors: string;
	selfTest: string;
	previousIssues: string;
};

type SelfTest = {
	title: string;
	question: string;
	options: string[];
};

type BaseStep = {
	id: keyof FormData;
};

type QuestionStep = BaseStep & {
	kind: "question";
	question: string;
	options: string[];
};

type SelfTestStep = BaseStep & {
	kind: "selfTest";
	id: "selfTest";
};

type Step = QuestionStep | SelfTestStep;

const baseQuestionSteps: QuestionStep[] = [
	{
		kind: "question",
		id: "bodyPart",
		question: "Where do you feel the pain most?",
		options: ["Neck", "Shoulder", "Elbow", "Back", "Knee", "Ankle/Foot"],
	},
	{
		kind: "question",
		id: "duration",
		question: "How long have you had this issue?",
		options: ["<1 week", "1–4 weeks", "1–3 months", ">3 months"],
	},
	{
		kind: "question",
		id: "painType",
		question: "How would you describe the pain?",
		options: ["Sharp", "Dull", "Radiating", "Sharp with movement"],
	},
	{
		kind: "question",
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
		kind: "question",
		id: "previousIssues",
		question: "Have you experienced similar issues before?",
		options: ["Yes", "No"],
	},
];

const steps: Step[] = [
	...baseQuestionSteps.slice(0, baseQuestionSteps.length - 1),
	{
		kind: "selfTest",
		id: "selfTest",
	},
	baseQuestionSteps[baseQuestionSteps.length - 1],
];

const mockSelfTest: Record<BodyPart, SelfTest> = {
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
};

const IntakePage = () => {
	const navigate = useNavigate();
	const [currentStep, setCurrentStep] = useState(0);
	const [formData, setFormData] = useState<FormData>({
		bodyPart: "",
		duration: "",
		painType: "",
		aggravatingFactors: "",
		selfTest: "",
		previousIssues: "",
	});

	const totalSteps = steps.length;
	const stepDef = steps[currentStep];
	const isSelfTestStep = stepDef.kind === "selfTest";

	let fieldId: keyof FormData = stepDef.id;
	let questionText: string;
	let options: string[];
	let selfTestTitle: string | null = null;

	if (stepDef.kind === "question") {
		questionText = stepDef.question;
		options = stepDef.options;
	} else {
		const selectedBodyPart = formData.bodyPart;
		let test: SelfTest;
		if (selectedBodyPart) {
			// Type guard: ensure we only index with a valid BodyPart
			test = mockSelfTest[selectedBodyPart as BodyPart];
		} else {
			test = mockSelfTest.Back;
		}

		selfTestTitle = test.title;
		questionText = test.question;
		options = test.options;
	}

	const progress = ((currentStep + 1) / totalSteps) * 100;
	const isAnswered = formData[fieldId] !== "";

	const handleSelect = (value: string) => {
		setFormData((prev) => ({
			...prev,
			[fieldId]: value,
		}));
	};

	const handleNext = () => {
		if (currentStep < totalSteps - 1) {
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

	return (
		<div className="min-h-screen bg-background flex items-center justify-center p-4">
			<Card className="max-w-2xl w-full p-8 md:p-12 space-y-8">
				<div className="space-y-4">
					<div className="flex justify-between items-center text-sm text-muted-foreground">
						<span>
							Step {currentStep + 1} of {totalSteps}
						</span>
					</div>
					<Progress value={progress} className="h-2" />
				</div>

				<div className="space-y-6">
					{isSelfTestStep && selfTestTitle && (
						<p className="text-sm font-medium text-primary uppercase tracking-wide">
							Self-test: {selfTestTitle}
						</p>
					)}
					<h2 className="text-2xl md:text-3xl font-semibold text-foreground">
						{questionText}
					</h2>

					<div className="grid gap-3">
						{options.map((option) => (
							<button
								key={option}
								onClick={() => handleSelect(option)}
								className={`p-4 text-left rounded-lg border-2 transition-all hover:border-primary ${
									formData[fieldId] === option
										? "border-primary bg-primary/5"
										: "border-border bg-card"
								}`}
							>
								<span className="text-lg text-foreground">{option}</span>
							</button>
						))}
					</div>
				</div>

				<div className="flex gap-3 pt-4">
					<Button
						onClick={handleBack}
						variant="outline"
						size="lg"
						className="flex-1"
					>
						<ArrowLeft className="mr-2 h-5 w-5" />
						Back
					</Button>
					<Button
						onClick={handleNext}
						disabled={!isAnswered}
						size="lg"
						className="flex-1"
					>
						{currentStep === totalSteps - 1 ? "Review" : "Next"}
						<ArrowRight className="ml-2 h-5 w-5" />
					</Button>
				</div>
			</Card>
		</div>
	);
};

export default IntakePage;
