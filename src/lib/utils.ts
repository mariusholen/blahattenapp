import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export const extractNumber = (input: string): number => {
	const match = input.trim().match(/^(\d{1,2})[a-zA-Z]?$/);
	console.log("extractNumber input:", input, "match:", match);

	if (!match) return 1;

	return Number(match[1]);
};
