// Spirits tasting options

export const spiritTypeOpties = [
	{ waarde: "whisky", label: "Whisky" },
	{ waarde: "gin", label: "Gin" },
	{ waarde: "rum", label: "Rum" },
	{ waarde: "cognac", label: "Cognac/Brandy" },
	{ waarde: "vodka", label: "Vodka" },
	{ waarde: "tequila", label: "Tequila/Mezcal" },
	{ waarde: "brandy", label: "Brandy" },
	{ waarde: "likeur", label: "Likeur" },
	{ waarde: "anders", label: "Anders" },
] as const;

export const spiritsHelderheidOpties = [
	{ waarde: "helder", label: "Clear" },
	{ waarde: "troebel", label: "Hazy" },
] as const;

export const spiritsKleurIntensiteitOpties = [
	{ waarde: "waterhelder", label: "Water-white" },
	{ waarde: "bleek", label: "Pale" },
	{ waarde: "medium", label: "Medium" },
	{ waarde: "diep", label: "Deep" },
	{ waarde: "opaak", label: "Opaque" },
] as const;

export const spiritsKleurOpties = [
	{ waarde: "kleurloos", label: "Colourless" },
	{ waarde: "lemon", label: "Lemon" },
	{ waarde: "goud", label: "Gold" },
	{ waarde: "amber", label: "Amber" },
	{ waarde: "bruin", label: "Brown" },
] as const;

export const spiritsConditieOpties = [
	{ waarde: "schoon", label: "Clean" },
	{ waarde: "onzuiver", label: "Unclean" },
] as const;

export const spiritsIntensiteitOpties = [
	{ waarde: "neutraal", label: "Neutral" },
	{ waarde: "licht", label: "Light" },
	{ waarde: "medium-", label: "Medium-" },
	{ waarde: "medium", label: "Medium" },
	{ waarde: "medium+", label: "Medium+" },
	{ waarde: "uitgesproken", label: "Pronounced" },
] as const;

export const spiritsZoetheidOpties = [
	{ waarde: "droog", label: "Dry" },
	{ waarde: "off-dry", label: "Off-dry" },
	{ waarde: "medium", label: "Medium" },
	{ waarde: "zoet", label: "Sweet" },
] as const;

export const spiritsTextuurOpties = [
	{ waarde: "ruw", label: "Rough" },
	{ waarde: "glad", label: "Smooth" },
	{ waarde: "waterig", label: "Watery" },
	{ waarde: "mondvullend", label: "Mouthfilling" },
	{ waarde: "verwarmend", label: "Warming" },
] as const;

export const spiritsAfdronkLengteOpties = [
	{ waarde: "kort", label: "Short" },
	{ waarde: "medium-", label: "Medium-" },
	{ waarde: "medium", label: "Medium" },
	{ waarde: "medium+", label: "Medium+" },
	{ waarde: "lang", label: "Long" },
] as const;

export const spiritsComplexiteitOpties = [
	{ waarde: "neutraal", label: "Neutral" },
	{ waarde: "eenvoudig", label: "Simple" },
	{ waarde: "enige_complexiteit", label: "Some complexity" },
	{ waarde: "zeer_complex", label: "Very complex" },
] as const;

export const spiritsKwaliteitOpties = [
	{ waarde: "gebrekkig", label: "Faulty" },
	{ waarde: "slecht", label: "Poor" },
	{ waarde: "acceptabel", label: "Acceptable" },
	{ waarde: "goed", label: "Good" },
	{ waarde: "zeer_goed", label: "Very good" },
	{ waarde: "uitmuntend", label: "Outstanding" },
] as const;

// =====================================================================
// BILINGUAL (NL/EN) VERSIONS — used via localizeOpties(arr, termsLang).
// =====================================================================

export const spiritTypeOptiesBi = [
	{ waarde: "whisky", nl: "Whisky", en: "Whisky" },
	{ waarde: "gin", nl: "Gin", en: "Gin" },
	{ waarde: "rum", nl: "Rum", en: "Rum" },
	{ waarde: "cognac", nl: "Cognac/Brandy", en: "Cognac/Brandy" },
	{ waarde: "vodka", nl: "Wodka", en: "Vodka" },
	{ waarde: "tequila", nl: "Tequila/Mezcal", en: "Tequila/Mezcal" },
	{ waarde: "brandy", nl: "Brandy", en: "Brandy" },
	{ waarde: "likeur", nl: "Likeur", en: "Liqueur" },
	{ waarde: "anders", nl: "Anders", en: "Other" },
] as const;

export const spiritsHelderheidOptiesBi = [
	{ waarde: "helder", nl: "Helder", en: "Clear" },
	{ waarde: "troebel", nl: "Troebel", en: "Hazy" },
] as const;

export const spiritsKleurIntensiteitOptiesBi = [
	{ waarde: "waterhelder", nl: "Waterhelder", en: "Water-white" },
	{ waarde: "bleek", nl: "Bleek", en: "Pale" },
	{ waarde: "medium", nl: "Medium", en: "Medium" },
	{ waarde: "diep", nl: "Diep", en: "Deep" },
	{ waarde: "opaak", nl: "Opaak", en: "Opaque" },
] as const;

export const spiritsKleurOptiesBi = [
	{ waarde: "kleurloos", nl: "Kleurloos", en: "Colourless" },
	{ waarde: "lemon", nl: "Citroengeel", en: "Lemon" },
	{ waarde: "goud", nl: "Goud", en: "Gold" },
	{ waarde: "amber", nl: "Amber", en: "Amber" },
	{ waarde: "bruin", nl: "Bruin", en: "Brown" },
] as const;

export const spiritsConditieOptiesBi = [
	{ waarde: "schoon", nl: "Schoon", en: "Clean" },
	{ waarde: "onzuiver", nl: "Onzuiver", en: "Unclean" },
] as const;

export const spiritsIntensiteitOptiesBi = [
	{ waarde: "neutraal", nl: "Neutraal", en: "Neutral" },
	{ waarde: "licht", nl: "Licht", en: "Light" },
	{ waarde: "medium-", nl: "Medium-", en: "Medium-" },
	{ waarde: "medium", nl: "Medium", en: "Medium" },
	{ waarde: "medium+", nl: "Medium+", en: "Medium+" },
	{ waarde: "uitgesproken", nl: "Uitgesproken", en: "Pronounced" },
] as const;

export const spiritsZoetheidOptiesBi = [
	{ waarde: "droog", nl: "Droog", en: "Dry" },
	{ waarde: "off-dry", nl: "Off-dry", en: "Off-dry" },
	{ waarde: "medium", nl: "Medium", en: "Medium" },
	{ waarde: "zoet", nl: "Zoet", en: "Sweet" },
] as const;

export const spiritsTextuurOptiesBi = [
	{ waarde: "ruw", nl: "Ruw", en: "Rough" },
	{ waarde: "glad", nl: "Glad", en: "Smooth" },
	{ waarde: "waterig", nl: "Waterig", en: "Watery" },
	{ waarde: "mondvullend", nl: "Mondvullend", en: "Mouthfilling" },
	{ waarde: "verwarmend", nl: "Verwarmend", en: "Warming" },
] as const;

export const spiritsAfdronkLengteOptiesBi = [
	{ waarde: "kort", nl: "Kort", en: "Short" },
	{ waarde: "medium-", nl: "Medium-", en: "Medium-" },
	{ waarde: "medium", nl: "Medium", en: "Medium" },
	{ waarde: "medium+", nl: "Medium+", en: "Medium+" },
	{ waarde: "lang", nl: "Lang", en: "Long" },
] as const;

export const spiritsComplexiteitOptiesBi = [
	{ waarde: "neutraal", nl: "Neutraal", en: "Neutral" },
	{ waarde: "eenvoudig", nl: "Eenvoudig", en: "Simple" },
	{ waarde: "enige_complexiteit", nl: "Enige complexiteit", en: "Some complexity" },
	{ waarde: "zeer_complex", nl: "Zeer complex", en: "Very complex" },
] as const;

export const spiritsKwaliteitOptiesBi = [
	{ waarde: "gebrekkig", nl: "Gebrekkig", en: "Faulty" },
	{ waarde: "slecht", nl: "Slecht", en: "Poor" },
	{ waarde: "acceptabel", nl: "Acceptabel", en: "Acceptable" },
	{ waarde: "goed", nl: "Goed", en: "Good" },
	{ waarde: "zeer_goed", nl: "Zeer goed", en: "Very good" },
	{ waarde: "uitmuntend", nl: "Uitmuntend", en: "Outstanding" },
] as const;

export const spiritsAromaCategorieen = {
	grondstof: {
		label: "Raw materials",
		aromas: [
			"graan",
			"mout",
			"brood",
			"koekje",
			"haver",
			"suikerriet",
			"melasse",
			"honing",
			"druif",
			"appel",
			"peer",
			"pruim",
			"agave",
			"peper",
			"rokerig",
			"jeneverbes",
			"koriander",
			"angelica",
			"aardappel",
			"mais",
			"rogge",
			"tarwe",
		],
	},
	verwerking: {
		label: "Processing",
		aromas: [
			"gist",
			"brood",
			"biscuit",
			"bloemen",
			"fruit",
			"citrus",
			"tropisch fruit",
			"banaan",
			"ananas",
			"ester",
			"solvent",
		],
	},
	rijping: {
		label: "Oak & maturation",
		aromas: [
			"vanille",
			"karamel",
			"toffee",
			"butterscotch",
			"chocolade",
			"koffie",
			"cacao",
			"kaneel",
			"kruidnagel",
			"nootmuskaat",
			"cederhout",
			"eikenhout",
			"sandelhout",
			"rook",
			"turf",
			"as",
			"leer",
			"tabak",
			"noten",
			"amandel",
			"hazelnoot",
			"gedroogd fruit",
			"rozijnen",
			"dadels",
		],
	},
	overig: {
		label: "Other",
		aromas: [
			"mineraal",
			"zeezout",
			"jodium",
			"kruiden",
			"munt",
			"eucalyptus",
			"hars",
			"was",
			"honingraat",
		],
	},
} as const;
