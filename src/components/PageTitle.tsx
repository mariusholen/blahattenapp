type TitleProps = {
	text: string;
};

export const TitleH11 = ({ text }: TitleProps) => {
	return (
		<h1 className="text-4xl md:text-5xl font-bold text-foreground">{text}</h1>
	);
};

export const TitleH12 = ({ text }: TitleProps) => {
	return (
		<h1 className="text-3xl md:text-4xl font-bold text-foreground">{text}</h1>
	);
};

export const TitleH2 = ({ text }: TitleProps) => {
	return (
		<h2 className="text-2xl md:text-3xl font-semibold text-foreground">
			{text}
		</h2>
	);
};

type SubHeaderProps = {
	text: string;
};

export const SubHeader = ({ text }: SubHeaderProps) => {
	return (
		<p className="text-lg text-muted-foreground max-w-xl mx-auto">{text}</p>
	);
};

export const SubHeader2 = ({ text }: SubHeaderProps) => {
	return <p className="text-muted-foreground">{text}</p>;
};

export const Note = ({ text }: SubHeaderProps) => {
	return <p className="text-sm text-muted-foreground italic">{text}</p>;
};
