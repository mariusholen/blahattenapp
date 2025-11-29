import { cn } from "@/lib/utils";

type CardSectionProps = {
	size?: "xs" | "sm" | "md";
	className?: string;
	children: React.ReactNode;
};

export const CardSection = ({
	size = "sm",
	className,
	children,
}: CardSectionProps) => {
	const getSize = () => {
		switch (size) {
			case "xs":
				return "space-y-3";
			case "sm":
				return "space-y-4";
			case "md":
				return "space-y-6";
		}
	};
	return <div className={cn(getSize(), className)}>{children}</div>;
};
