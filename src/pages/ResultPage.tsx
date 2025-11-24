import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "../components/ui/button";
import { Card } from "../components/ui/card";
import { AlertCircle, Home } from "lucide-react";

type FormData = {
	bodyPart: string;
	duration: string;
	painType: string;
	aggravatingFactors: string;
	previousIssues: string;
};

const mockResults: Record<string, { condition: string; description: string }> =
	{
		Neck: {
			condition: "Possible cervical strain or tension",
			description:
				"Neck pain is commonly caused by muscle tension, poor posture, or strain from prolonged positioning. It may also be related to cervical spine issues.",
		},
		Shoulder: {
			condition: "Possible rotator cuff issue or shoulder impingement",
			description:
				"Shoulder pain often results from rotator cuff problems, impingement, or overuse injuries. These conditions can affect range of motion and daily activities.",
		},
		Elbow: {
			condition: "Possible tennis elbow or golfer's elbow",
			description:
				"Elbow pain is frequently caused by repetitive strain injuries affecting the tendons, commonly known as tennis elbow or golfer's elbow.",
		},
		Back: {
			condition: "Possible lumbar strain or disc-related issue",
			description:
				"Back pain can result from muscle strain, ligament sprain, or disc-related problems. It's one of the most common musculoskeletal complaints.",
		},
		Knee: {
			condition: "Possible meniscus or ligament issue",
			description:
				"Knee pain may be related to meniscus tears, ligament injuries, or patellofemoral problems. These can affect mobility and stability.",
		},
		"Ankle/Foot": {
			condition: "Possible sprain or plantar fasciitis",
			description:
				"Ankle and foot pain commonly results from sprains, strains, or conditions like plantar fasciitis affecting the heel and sole.",
		},
	};

const ResultPage = () => {
	const navigate = useNavigate();
	const location = useLocation();
	const formData = location.state as FormData;

	if (!formData) {
		navigate("/intake");
		return null;
	}

	const result = mockResults[formData.bodyPart] || mockResults["Back"];

	return (
		<div className="min-h-screen bg-background flex items-center justify-center p-4">
			<Card className="max-w-2xl w-full p-8 md:p-12 space-y-8">
				<div className="space-y-4">
					<h1 className="text-3xl md:text-4xl font-bold text-foreground">
						Assessment Results
					</h1>
					<div className="p-4 bg-secondary/10 border border-secondary/20 rounded-lg">
						<h2 className="text-xl font-semibold text-secondary mb-2">
							{result.condition}
						</h2>
						<p className="text-foreground">{result.description}</p>
					</div>
				</div>

				<div className="space-y-4">
					<h3 className="text-xl font-semibold text-foreground">
						General Recommendations
					</h3>
					<ul className="space-y-3">
						{[
							"Consider consulting with a healthcare professional for a proper diagnosis",
							"Apply ice or heat as appropriate for pain management",
							"Avoid activities that aggravate the pain",
							"Gentle stretching and movement may help, but don't push through severe pain",
							"Monitor your symptoms and seek immediate care if pain worsens significantly",
						].map((recommendation, index) => (
							<li key={index} className="flex gap-3 text-foreground">
								<span className="text-secondary mt-1">•</span>
								<span>{recommendation}</span>
							</li>
						))}
					</ul>
				</div>

				<div className="p-4 bg-muted/50 border border-border rounded-lg flex gap-3">
					<AlertCircle className="h-5 w-5 text-muted-foreground flex-shrink-0 mt-0.5" />
					<div className="text-sm text-muted-foreground">
						<strong className="text-foreground">Important:</strong> This
						assessment is for informational purposes only and does not
						constitute medical advice. Please consult with a qualified
						healthcare provider for proper diagnosis and treatment.
					</div>
				</div>

				<Button onClick={() => navigate("/")} size="lg" className="w-full">
					<Home className="mr-2 h-5 w-5" />
					Back to Home
				</Button>
			</Card>
		</div>
	);
};

export default ResultPage;
