import { Button } from "./ui/button";

type CTAProps = {
	text: string;
	onClick?: () => void;
};

export const CTA = ({ text, onClick }: CTAProps) => {
	return (
		<Button onClick={onClick} size="lg" className="w-full text-lg py-6">
			{text}
		</Button>
	);
};
