type ButtonGroupProps = {
	children?: React.ReactNode;
};

export const ButtonGroup = ({ children }: ButtonGroupProps) => {
	return <div className="flex gap-3 pt-4">{children}</div>;
};
