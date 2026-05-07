import type { Level } from "./level";

export type FormKind =
	| "wijn"
	| "champagne"
	| "spirits"
	| "alcoholvrij"
	| "generic";

export type TabKey =
	| "appearance"
	| "nose"
	| "palate"
	| "conclusions"
	| "details"
	| "visueel"
	| "neus"
	| "mondgevoel"
	| "conclusies";

export const VISIBLE_TABS: Record<FormKind, Record<Level, Set<TabKey>>> = {
	wijn: {
		beginner: new Set(["appearance", "nose", "palate", "conclusions"]),
		gevorderd: new Set(["appearance", "nose", "palate", "conclusions"]),
		expert: new Set(["appearance", "nose", "palate", "conclusions", "details"]),
	},
	champagne: {
		beginner: new Set(["visueel", "neus", "mondgevoel", "conclusies"]),
		gevorderd: new Set(["visueel", "neus", "mondgevoel", "conclusies"]),
		expert: new Set(["visueel", "neus", "mondgevoel", "conclusies", "details"]),
	},
	spirits: {
		beginner: new Set(["appearance", "nose", "palate", "conclusions"]),
		gevorderd: new Set(["appearance", "nose", "palate", "conclusions"]),
		expert: new Set(["appearance", "nose", "palate", "conclusions"]),
	},
	alcoholvrij: {
		beginner: new Set(["appearance", "nose", "palate", "conclusions"]),
		gevorderd: new Set(["appearance", "nose", "palate", "conclusions"]),
		expert: new Set(["appearance", "nose", "palate", "conclusions"]),
	},
	generic: {
		beginner: new Set(["appearance", "nose", "palate", "conclusions"]),
		gevorderd: new Set(["appearance", "nose", "palate", "conclusions"]),
		expert: new Set(["appearance", "nose", "palate", "conclusions"]),
	},
};

/** Field-level visibility per niveau. Keys per form. Beginner = absolute kernset. */
export const VISIBLE_FIELDS: Record<FormKind, Record<Level, Set<string>>> = {
	wijn: {
		beginner: new Set([
			"kleur",
			"zoetheid",
			"aromakenmerken",
			"kwaliteitsniveau",
			"persoonlijkeNotitie",
			"score",
		]),
		gevorderd: new Set([
			"helderheid",
			"intensiteitVisueel",
			"kleur",
			"glanzendheid",
			"intensiteitNeus",
			"aromakenmerken",
			"ontwikkeling",
			"zoetheid",
			"zuurgraad",
			"tannine",
			"alcoholgevoel",
			"body",
			"intensiteitMond",
			"afdronk",
			"kwaliteitsniveau",
			"persoonlijkeNotitie",
			"score",
		]),
		expert: new Set(["*"]),
	},
	champagne: {
		beginner: new Set([
			"kleur",
			"zoetheid",
			"aromakenmerken",
			"kwaliteitsniveau",
			"persoonlijkeNotitie",
			"score",
		]),
		gevorderd: new Set([
			"helderheid",
			"intensiteitVisueel",
			"kleur",
			"mousse",
			"intensiteitNeus",
			"aromakenmerken",
			"zoetheid",
			"zuurgraad",
			"body",
			"afdronk",
			"kwaliteitsniveau",
			"persoonlijkeNotitie",
			"score",
		]),
		expert: new Set(["*"]),
	},
	spirits: {
		beginner: new Set([
			"kleur",
			"aromakenmerken",
			"kwaliteitsniveau",
			"persoonlijkeNotitie",
			"score",
		]),
		gevorderd: new Set([
			"kleur",
			"intensiteitNeus",
			"aromakenmerken",
			"body",
			"afdronk",
			"kwaliteitsniveau",
			"persoonlijkeNotitie",
			"score",
		]),
		expert: new Set(["*"]),
	},
	alcoholvrij: {
		beginner: new Set([
			"kleur",
			"zoetheid",
			"aromakenmerken",
			"kwaliteitsniveau",
			"persoonlijkeNotitie",
			"score",
		]),
		gevorderd: new Set([
			"kleur",
			"intensiteitNeus",
			"aromakenmerken",
			"zoetheid",
			"zuurgraad",
			"body",
			"afdronk",
			"kwaliteitsniveau",
			"persoonlijkeNotitie",
			"score",
		]),
		expert: new Set(["*"]),
	},
	generic: {
		beginner: new Set(["kleur", "aromakenmerken", "score", "persoonlijkeNotitie"]),
		gevorderd: new Set(["*"]),
		expert: new Set(["*"]),
	},
};

export function isTabVisible(
	form: FormKind,
	level: Level,
	tab: TabKey,
): boolean {
	return VISIBLE_TABS[form][level].has(tab);
}

export function isFieldVisible(
	form: FormKind,
	level: Level,
	field: string,
): boolean {
	const set = VISIBLE_FIELDS[form][level];
	return set.has("*") || set.has(field);
}

/** Hidden in beginner: anything beyond beginner-set. Hidden in gevorderd: details + niche fields. */
export function shouldHideField(
	form: FormKind,
	level: Level,
	field: string,
): boolean {
	if (level === "expert") return false;
	const allowed = VISIBLE_FIELDS[form][level];
	if (allowed.has("*")) return false;
	return !allowed.has(field);
}
