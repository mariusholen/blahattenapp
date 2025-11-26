import { useNavigate } from "react-router-dom";
import { Card } from "../components/ui/card";
import { CheckCircle2 } from "lucide-react";
import { Note, SubHeader, TitleH11 } from "@/components/PageTitle";
import { CTA } from "@/components/CTA";

const LandingPage = () => {
	const navigate = useNavigate();

	return (
		<div className="min-h-screen bg-background flex items-center justify-center p-4">
			<Card className="max-w-2xl w-full p-8 md:p-12 space-y-8">
				<div className="space-y-4 text-center">
					<TitleH11 text="Digital vurdering av muskel- og skjelettplager" />
					<SubHeader text="Få en enkel, rask og strukturert vurdering av smerter i muskler og ledd." />
					<Note text="Merk: Dette er en prototype og viser hvordan en digital vurdering kan fungere. Det er ikke et substitutt for profesjonell medisinsk rådgivning." />
				</div>

				<div className="space-y-4 py-6">
					{[
						"Tar 2–3 minutter å fullføre",
						"Basert på kliniske retningslinjer",
						"Ingen innlogging eller lagring av data",
					].map((point, index) => (
						<div key={index} className="flex items-center gap-3">
							<CheckCircle2 className="h-6 w-6 text-secondary flex-shrink-0" />
							<span className="text-lg text-foreground">{point}</span>
						</div>
					))}
				</div>
				<CTA text="Start vurdering" onClick={() => navigate("/intake")} />
			</Card>
		</div>
	);
};

export default LandingPage;
