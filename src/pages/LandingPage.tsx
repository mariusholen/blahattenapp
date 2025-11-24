import { useNavigate } from "react-router-dom";
import { Button } from "../components/ui/button";
import { Card } from "../components/ui/card";
import { CheckCircle2 } from "lucide-react";

const LandingPage = () => {
	const navigate = useNavigate();

	return (
		<div className="min-h-screen bg-background flex items-center justify-center p-4">
			<Card className="max-w-2xl w-full p-8 md:p-12 space-y-8">
				<div className="space-y-4 text-center">
					<h1 className="text-4xl md:text-5xl font-bold text-foreground">
						Digital assessment for muscle and joint pain
					</h1>
					<p className="text-lg text-muted-foreground max-w-xl mx-auto">
						Get personalized insights about your musculoskeletal symptoms in
						just a few minutes. This assessment tool helps you understand
						potential causes and next steps for your care.
					</p>
					<p className="text-sm text-muted-foreground italic">
						Note: This is a digital assessment tool, not a replacement for
						professional medical advice.
					</p>
				</div>

				<div className="space-y-4 py-6">
					{[
						"Takes 2–3 minutes",
						"Based on professional knowledge",
						"No login required",
					].map((point, index) => (
						<div key={index} className="flex items-center gap-3">
							<CheckCircle2 className="h-6 w-6 text-secondary flex-shrink-0" />
							<span className="text-lg text-foreground">{point}</span>
						</div>
					))}
				</div>

				<Button
					onClick={() => navigate("/intake")}
					size="lg"
					className="w-full text-lg py-6"
				>
					Start assessment
				</Button>
			</Card>
		</div>
	);
};

export default LandingPage;
