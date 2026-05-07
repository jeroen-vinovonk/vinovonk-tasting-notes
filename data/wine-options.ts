// Wine tasting options — bilingual labels (nl/en).
// Use `localizeOpties(arr, termsLang)` to map to UI shape `{ waarde, label, hex? }`.

import type { TermsLang } from "../lib/terms-lang";

export interface BiOptie {
	readonly waarde: string;
	readonly nl: string;
	readonly en: string;
	readonly hex?: string;
	readonly beschrijving?: { readonly nl: string; readonly en: string };
}

export function localizeOpties<T extends BiOptie>(
	arr: readonly T[],
	termsLang: TermsLang,
): {
	waarde: T["waarde"];
	label: string;
	hex?: string;
	beschrijving?: string;
}[] {
	return arr.map((o) => ({
		waarde: o.waarde,
		label: termsLang === "nl" ? o.nl : o.en,
		hex: o.hex,
		beschrijving: o.beschrijving
			? termsLang === "nl"
				? o.beschrijving.nl
				: o.beschrijving.en
			: undefined,
	}));
}

export const wijnTypeOptiesBi = [
	{ waarde: "wit", nl: "Wit", en: "White" },
	{ waarde: "rosé", nl: "Rosé", en: "Rosé" },
	{ waarde: "rood", nl: "Rood", en: "Red" },
	{ waarde: "mousserend", nl: "Mousserend", en: "Sparkling" },
	{ waarde: "versterkt", nl: "Versterkt", en: "Fortified" },
] as const;

export const helderheidOptiesBi = [
	{ waarde: "helder", nl: "Helder", en: "Clear" },
	{ waarde: "troebel", nl: "Troebel", en: "Hazy" },
] as const;

export const intensiteitDrieOptiesBi = [
	{ waarde: "bleek", nl: "Bleek", en: "Pale" },
	{ waarde: "medium", nl: "Medium", en: "Medium" },
	{ waarde: "diep", nl: "Diep", en: "Deep" },
] as const;

export const kleurWitOptiesBi = [
	{ waarde: "citroengeel-groen", nl: "Citroengeel-groen", en: "Lemon-green", hex: "#e8e5a0" },
	{ waarde: "citroengeel", nl: "Citroengeel", en: "Lemon", hex: "#f0e68c" },
	{ waarde: "goud", nl: "Goud", en: "Gold", hex: "#daa520" },
	{ waarde: "amber", nl: "Amber", en: "Amber", hex: "#cf8f2e" },
	{ waarde: "bruin", nl: "Bruin", en: "Brown", hex: "#8b6914" },
] as const;

export const kleurRoséOptiesBi = [
	{ waarde: "roze", nl: "Roze", en: "Pink", hex: "#ffb6c1" },
	{ waarde: "zalm", nl: "Zalm", en: "Salmon", hex: "#fa8072" },
	{ waarde: "oranje", nl: "Oranje", en: "Orange", hex: "#e8915a" },
] as const;

export const kleurRoodOptiesBi = [
	{ waarde: "paars", nl: "Paars", en: "Purple", hex: "#722f6b" },
	{ waarde: "robijn", nl: "Robijn", en: "Ruby", hex: "#9b111e" },
	{ waarde: "granaat", nl: "Granaat", en: "Garnet", hex: "#7b3f3f" },
	{ waarde: "tawny", nl: "Tawny", en: "Tawny", hex: "#a0522d" },
	{ waarde: "bruin", nl: "Bruin", en: "Brown", hex: "#6b3a2e" },
] as const;

export const conditieOptiesBi = [
	{ waarde: "schoon", nl: "Schoon", en: "Clean" },
	{ waarde: "onzuiver", nl: "Onzuiver", en: "Unclean" },
] as const;

export const intensiteitVijfOptiesBi = [
	{ waarde: "licht", nl: "Licht", en: "Light" },
	{ waarde: "medium-", nl: "Medium-", en: "Medium-" },
	{ waarde: "medium", nl: "Medium", en: "Medium" },
	{ waarde: "medium+", nl: "Medium+", en: "Medium+" },
	{ waarde: "uitgesproken", nl: "Uitgesproken", en: "Pronounced" },
] as const;

export const ontwikkelingOptiesBi = [
	{ waarde: "jeugdig", nl: "Jeugdig", en: "Youthful" },
	{ waarde: "in_ontwikkeling", nl: "In ontwikkeling", en: "Developing" },
	{ waarde: "volledig_ontwikkeld", nl: "Volledig ontwikkeld", en: "Fully developed" },
	{ waarde: "voorbij_hoogtepunt", nl: "Voorbij hoogtepunt", en: "Tired / past its best" },
] as const;

export const mousseOptiesBi = [
	{ waarde: "delicaat", nl: "Delicaat", en: "Delicate" },
	{ waarde: "romig", nl: "Romig", en: "Creamy" },
	{ waarde: "agressief", nl: "Agressief", en: "Aggressive" },
] as const;

export const zoetheidOptiesBi = [
	{ waarde: "droog", nl: "Droog", en: "Dry" },
	{ waarde: "off-dry", nl: "Off-dry", en: "Off-dry" },
	{ waarde: "medium-droog", nl: "Medium-droog", en: "Medium-dry" },
	{ waarde: "medium-zoet", nl: "Medium-zoet", en: "Medium-sweet" },
	{ waarde: "zoet", nl: "Zoet", en: "Sweet" },
	{ waarde: "luscious", nl: "Stroperig", en: "Luscious" },
] as const;

export const schaalVijfOptiesBi = [
	{ waarde: "laag", nl: "Laag", en: "Low" },
	{ waarde: "medium-", nl: "Medium-", en: "Medium-" },
	{ waarde: "medium", nl: "Medium", en: "Medium" },
	{ waarde: "medium+", nl: "Medium+", en: "Medium+" },
	{ waarde: "hoog", nl: "Hoog", en: "High" },
] as const;

export const bodyOptiesBi = [
	{ waarde: "licht", nl: "Licht", en: "Light" },
	{ waarde: "medium-", nl: "Medium-", en: "Medium-" },
	{ waarde: "medium", nl: "Medium", en: "Medium" },
	{ waarde: "medium+", nl: "Medium+", en: "Medium+" },
	{ waarde: "vol", nl: "Vol", en: "Full" },
] as const;

export const afdronkLengteOptiesBi = [
	{ waarde: "kort", nl: "Kort", en: "Short" },
	{ waarde: "medium-", nl: "Medium-", en: "Medium-" },
	{ waarde: "medium", nl: "Medium", en: "Medium" },
	{ waarde: "medium+", nl: "Medium+", en: "Medium+" },
	{ waarde: "lang", nl: "Lang", en: "Long" },
] as const;

export const kwaliteitOptiesBi = [
	{
		waarde: "gebrekkig",
		nl: "Gebrekkig",
		en: "Faulty",
		beschrijving: {
			nl: "Wijn met een duidelijk gebrek",
			en: "Wine with a clear flaw",
		},
	},
	{
		waarde: "slecht",
		nl: "Slecht",
		en: "Poor",
		beschrijving: {
			nl: "Geen BLIC-elementen aanwezig",
			en: "No BLIC elements present",
		},
	},
	{
		waarde: "acceptabel",
		nl: "Acceptabel",
		en: "Acceptable",
		beschrijving: {
			nl: "1 BLIC-element aanwezig",
			en: "1 BLIC element present",
		},
	},
	{
		waarde: "goed",
		nl: "Goed",
		en: "Good",
		beschrijving: {
			nl: "2 BLIC-elementen aanwezig",
			en: "2 BLIC elements present",
		},
	},
	{
		waarde: "zeer_goed",
		nl: "Zeer goed",
		en: "Very good",
		beschrijving: {
			nl: "3 BLIC-elementen aanwezig",
			en: "3 BLIC elements present",
		},
	},
	{
		waarde: "uitmuntend",
		nl: "Uitmuntend",
		en: "Outstanding",
		beschrijving: {
			nl: "Alle 4 BLIC-elementen aanwezig",
			en: "All 4 BLIC elements present",
		},
	},
] as const;

export const drinkbaarheidOptiesBi = [
	{
		waarde: "nu_niet_geschikt",
		nl: "Drink nu, niet geschikt voor rijping",
		en: "Drink now, not suitable for ageing",
	},
	{
		waarde: "nu_met_potentieel",
		nl: "Kan nu, met rijpingspotentieel",
		en: "Can drink now, potential for ageing",
	},
	{
		waarde: "te_jong",
		nl: "Te jong om te drinken",
		en: "Too young to drink",
	},
	{ waarde: "te_oud", nl: "Te oud", en: "Too old" },
] as const;

// Backwards-compat exports (default = English, matches old behavior).
// Forms should migrate to localizeOpties(...Bi, termsLang).
export const wijnTypeOpties = localizeOpties(wijnTypeOptiesBi, "en");
export const helderheidOpties = localizeOpties(helderheidOptiesBi, "en");
export const intensiteitDrieOpties = localizeOpties(intensiteitDrieOptiesBi, "en");
export const kleurWitOpties = localizeOpties(kleurWitOptiesBi, "en");
export const kleurRoséOpties = localizeOpties(kleurRoséOptiesBi, "en");
export const kleurRoodOpties = localizeOpties(kleurRoodOptiesBi, "en");
export const conditieOpties = localizeOpties(conditieOptiesBi, "en");
export const intensiteitVijfOpties = localizeOpties(intensiteitVijfOptiesBi, "en");
export const ontwikkelingOpties = localizeOpties(ontwikkelingOptiesBi, "en");
export const mousseOpties = localizeOpties(mousseOptiesBi, "en");
export const zoetheidOpties = localizeOpties(zoetheidOptiesBi, "en");
export const schaalVijfOpties = localizeOpties(schaalVijfOptiesBi, "en");
export const bodyOpties = localizeOpties(bodyOptiesBi, "en");
export const afdronkLengteOpties = localizeOpties(afdronkLengteOptiesBi, "en");
export const kwaliteitOpties = localizeOpties(kwaliteitOptiesBi, "en");
export const drinkbaarheidOpties = localizeOpties(drinkbaarheidOptiesBi, "en");
