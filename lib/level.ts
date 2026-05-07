import { useEffect, useState } from "react";

export type Level = "beginner" | "gevorderd" | "expert";

const STORAGE_KEY = "vv-tasting-level";
const DEFAULT_LEVEL: Level = "expert";

export function getLevel(): Level {
	if (typeof window === "undefined") return DEFAULT_LEVEL;
	const v = window.localStorage.getItem(STORAGE_KEY);
	if (v === "beginner" || v === "gevorderd" || v === "expert") return v;
	return DEFAULT_LEVEL;
}

export function setLevel(level: Level): void {
	if (typeof window === "undefined") return;
	window.localStorage.setItem(STORAGE_KEY, level);
	window.dispatchEvent(new CustomEvent("vv-level-change", { detail: level }));
}

export function useLevel(): [Level, (l: Level) => void] {
	const [level, setLevelState] = useState<Level>(() => getLevel());

	useEffect(() => {
		const handler = (e: Event) => {
			const detail = (e as CustomEvent<Level>).detail;
			if (detail) setLevelState(detail);
		};
		window.addEventListener("vv-level-change", handler);
		return () => window.removeEventListener("vv-level-change", handler);
	}, []);

	return [
		level,
		(l: Level) => {
			setLevel(l);
			setLevelState(l);
		},
	];
}

export const LEVEL_LABELS = {
	nl: {
		beginner: "Beginner",
		gevorderd: "Gevorderd",
		expert: "Expert",
		beginnerHint: "Minimale velden, uitleg bij vakjargon, stap-voor-stap",
		gevorderdHint: "Kernvelden zonder alle subcategorieën",
		expertHint: "Volledige proefmethode met alle velden",
	},
	en: {
		beginner: "Beginner",
		gevorderd: "Intermediate",
		expert: "Expert",
		beginnerHint: "Minimal fields, jargon explanations, step-by-step",
		gevorderdHint: "Core fields without all subcategories",
		expertHint: "Full tasting method with all fields",
	},
} as const;
