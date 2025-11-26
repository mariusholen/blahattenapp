type CardSectionProps = {
	children: React.ReactNode;
};

export const CardSection = ({ children }: CardSectionProps) => (
	<div className="space-y-4">{children}</div>
);
