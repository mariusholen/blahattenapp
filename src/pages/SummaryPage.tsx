import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "../components/ui/button";
import { Card } from "../components/ui/card";
import { ArrowLeft, ArrowRight } from "lucide-react";

type FormData = {
	bodyPart: string;
	duration: string;
	painType: string;
	aggravatingFactors: string;
	selfTest: string;
	previousIssues: string;
};

const SummaryPage = () => {
	const navigate = useNavigate();
	const location = useLocation();
	const formData = location.state as FormData;

	if (!formData) {
		navigate("/intake");
		return null;
	}

	const summaryItems = [
		{ label: "Body part", value: formData.bodyPart },
		{ label: "Duration", value: formData.duration },
		{ label: "Pain type", value: formData.painType },
		{ label: "Aggravating factors", value: formData.aggravatingFactors },
		{ label: "Pain provoked with self-test", value: formData.selfTest },
		{ label: "Previous issues", value: formData.previousIssues },
	];

	return (
		<div className="min-h-screen bg-background flex items-center justify-center p-4">
			<Card className="max-w-2xl w-full p-8 md:p-12 space-y-8">
				<div className="space-y-4">
					<h1 className="text-3xl md:text-4xl font-bold text-foreground">
						Review your answers
					</h1>
					<p className="text-muted-foreground">
						Please review the information you've provided before seeing your
						results.
					</p>
				</div>

				<div className="space-y-4">
					{summaryItems.map((item, index) => (
						<div
							key={index}
							className="p-4 rounded-lg bg-muted/50 border border-border"
						>
							<div className="text-sm text-muted-foreground mb-1">
								{item.label}
							</div>
							<div className="text-lg font-medium text-foreground">
								{item.value}
							</div>
						</div>
					))}
				</div>

				<div className="flex gap-3 pt-4">
					<Button
						onClick={() => navigate("/intake")}
						variant="outline"
						size="lg"
						className="flex-1"
					>
						<ArrowLeft className="mr-2 h-5 w-5" />
						Back to intake
					</Button>
					<Button
						onClick={() => navigate("/result", { state: formData })}
						size="lg"
						className="flex-1"
					>
						See possible cause
						<ArrowRight className="ml-2 h-5 w-5" />
					</Button>
				</div>
			</Card>
		</div>
	);
};

export default SummaryPage;
