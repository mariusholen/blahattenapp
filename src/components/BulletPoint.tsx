import { CheckCircle2 } from "lucide-react";

type BulletPointProps = {
	text: string;
};

export const BulletPoint = ({ text }: BulletPointProps) => {
	return (
		<div className="flex items-center gap-3">
			<CheckCircle2 className="h-6 w-6 text-secondary flex-shrink-0" />
			<span className="text-lg text-foreground">{text}</span>
		</div>
	);
};
