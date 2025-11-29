import { useNavigate } from "react-router-dom";
import { Card } from "../components/ui/card";
import { Note, SubHeader, TitleH11 } from "@/components/PageTitle";
import { CTA } from "@/components/CTA";
import { CardSection } from "@/components/CardSection";
import { BulletPoint } from "@/components/BulletPoint";

const LandingPage = () => {
	const navigate = useNavigate();

	const bulletPoints = [
		"Tar 2–3 minutter å fullføre",
		"Basert på kliniske retningslinjer",
		"Ingen innlogging eller lagring av data",
	];

	return (
		<div className="min-h-screen bg-background flex items-center justify-center p-4">
			<Card className="max-w-2xl w-full p-8 md:p-12 space-y-8">
				<CardSection className="text-center">
					<TitleH11 text="Digital vurdering av muskel- og skjelettplager" />
					<SubHeader text="Få en enkel, rask og strukturert vurdering av smerter i muskler og ledd." />
					<Note text="Merk: Dette er en prototype og viser hvordan en digital vurdering kan fungere. Det er ikke et alternativ til å oppsøke profesjonell medisinsk rådgivning." />
				</CardSection>

				<CardSection className="py-6">
					{bulletPoints.map((point, index) => (
						<BulletPoint key={index} text={point} />
					))}
				</CardSection>
				<CTA text="Start vurdering" onClick={() => navigate("/intake")} />
			</Card>
		</div>
	);
};

export default LandingPage;
