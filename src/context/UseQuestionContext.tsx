import type { BodyPart } from "../types";
import { createContext, useContext, useState, type ReactNode } from "react";

export type BodyPartSelectOptions = BodyPart | "";

type QuestionContextValue = {
	bodyPart: BodyPartSelectOptions;
	onChangeBodyPart: (value: BodyPartSelectOptions) => void;
};

const initialContextValue: QuestionContextValue = {
	bodyPart: "",
	onChangeBodyPart: () => {},
};

const QuestionContext =
	createContext<QuestionContextValue>(initialContextValue);

type QuestionContextProviderProps = {
	children: ReactNode;
};

export const QuestionContextProvider = ({
	children,
}: QuestionContextProviderProps) => {
	const [bodyPart, setBodyPart] = useState<BodyPartSelectOptions>("");
	//const [duration, setDuration] = useState<string>("");
	//const [painType, setPainType] = useState<string>("");
	//const [aggravatingFactors, setAggravatingFactors] = useState<string>("");
	//const [selfTest, setSelfTest] = useState<string>("");
	//const [previousIssues, setPreviousIssues] = useState<string>("");
	return (
		<QuestionContext.Provider
			value={{
				bodyPart,
				onChangeBodyPart: setBodyPart,
			}}
		>
			{children}
		</QuestionContext.Provider>
	);
};

export const useQuestionContext = () => {
	return useContext(QuestionContext);
};
