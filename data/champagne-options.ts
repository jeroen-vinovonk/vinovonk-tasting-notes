// Champagne tasting options

export const cuveeTypeOpties = [
	{
		waarde: "nv",
		label: "Non-vintage (NV)",
		beschrijving: "Blend of multiple years",
	},
	{
		waarde: "millesime",
		label: "Millésimé",
		beschrijving: "Single harvest year",
	},
	{
		waarde: "prestige",
		label: "Prestige cuvée",
		beschrijving: "Top-tier single cuvée",
	},
] as const;

export const stijlOpties = [
	{
		waarde: "blanc_de_blancs",
		label: "Blanc de Blancs",
		beschrijving: "100% Chardonnay",
	},
	{
		waarde: "blanc_de_noirs",
		label: "Blanc de Noirs",
		beschrijving: "Pinot Noir and/or Meunier",
	},
	{
		waarde: "assemblage",
		label: "Assemblage",
		beschrijving: "Blend of Chardonnay, Pinot Noir, Meunier",
	},
	{
		waarde: "rose_assemblage",
		label: "Rosé (assemblage)",
		beschrijving: "Blended with still red wine",
	},
	{
		waarde: "rose_saignee",
		label: "Rosé (saignée)",
		beschrijving: "Maceration method",
	},
] as const;

export const dosageOpties = [
	{ waarde: "brut_nature", label: "Brut Nature", beschrijving: "0–3 g/L" },
	{ waarde: "extra_brut", label: "Extra Brut", beschrijving: "0–6 g/L" },
	{ waarde: "brut", label: "Brut", beschrijving: "<12 g/L" },
	{ waarde: "extra_sec", label: "Extra Sec", beschrijving: "12–17 g/L" },
	{ waarde: "sec", label: "Sec", beschrijving: "17–32 g/L" },
	{ waarde: "demi_sec", label: "Demi-sec", beschrijving: "32–50 g/L" },
	{ waarde: "doux", label: "Doux", beschrijving: ">50 g/L" },
] as const;

export const producerTypeOpties = [
	{ waarde: "nm", label: "NM", beschrijving: "Négociant-Manipulant (Maison)" },
	{ waarde: "rm", label: "RM", beschrijving: "Récoltant-Manipulant (Grower)" },
	{ waarde: "cm", label: "CM", beschrijving: "Coopérative de Manipulation" },
	{ waarde: "rc", label: "RC", beschrijving: "Récoltant-Coopérateur" },
	{ waarde: "sr", label: "SR", beschrijving: "Société de Récoltants" },
	{ waarde: "nd", label: "ND", beschrijving: "Négociant-Distributeur" },
	{
		waarde: "ma",
		label: "MA",
		beschrijving: "Marque d'Acheteur (Buyer's Own Brand)",
	},
] as const;

export const classificatieOpties = [
	{ waarde: "grand_cru", label: "Grand Cru (100%)" },
	{ waarde: "premier_cru", label: "Premier Cru (90–99%)" },
	{ waarde: "village", label: "Village (80–89%)" },
] as const;

export const champagneDruivenRassen: string[] = [
	"Chardonnay",
	"Pinot Noir",
	"Meunier",
	"Chardonnay Rosé",
	"Pinot Blanc",
	"Pinot Gris",
	"Arbane",
	"Petit Meslier",
];

const CHAMPAGNE_PRODUCENTEN = [
	"Moët & Chandon",
	"Veuve Clicquot",
	"Krug",
	"Dom Pérignon",
	"Bollinger",
	"Taittinger",
	"Pol Roger",
	"Louis Roederer",
	"Laurent-Perrier",
	"Perrier-Jouët",
	"Nicolas Feuillatte",
	"Mumm",
	"Piper-Heidsieck",
	"Charles Heidsieck",
	"Salon",
	"Billecart-Salmon",
	"Deutz",
	"Gosset",
	"Henriot",
	"Jacquesson",
	"Ayala",
	"Ruinart",
	"Lanson",
	"Pommery",
	"Canard-Duchêne",
	"De Castellane",
	"Duval-Leroy",
	"Drappier",
	"AR Lenoble",
	"Palmer & Co",
	"Egly-Ouriet",
	"Ulysse Collin",
	"Jérôme Prévost",
	"Jacques Selosse",
	"Cédric Bouchard",
	"Pierre Péters",
	"Agrapart & Fils",
	"Chartogne-Taillet",
	"Marie-Courtin",
	"Bérêche et Fils",
	"R. Pouillon",
	"Mouzon-Leroux",
	"Benoît Lahaye",
	"Vincent Charlot",
	"Marguet",
	"Laherte Frères",
	"Gatinois",
	"Gaston Chiquet",
	"André Clouet",
	"Tarlant",
];

const CHAMPAGNE_VILLAGES = [
	"Aÿ",
	"Ambonnay",
	"Avize",
	"Beaumont-sur-Vesle",
	"Bouzy",
	"Chouilly",
	"Cramant",
	"Le Mesnil-sur-Oger",
	"Louvois",
	"Mailly-Champagne",
	"Oger",
	"Oiry",
	"Puisieulx",
	"Sillery",
	"Tours-sur-Marne",
	"Verzenay",
	"Verzy",
	"Épernay",
	"Reims",
	"Châlons-en-Champagne",
	"Troyes",
	"Montagne de Reims",
	"Côte des Blancs",
	"Vallée de la Marne",
	"Côte des Bar",
	"Côte de Sézanne",
	"Hautvillers",
	"Tauxières",
	"Mutigny",
	"Mareuil-sur-Aÿ",
	"Dizy",
	"Cumières",
	"Damery",
	"Fleury-la-Rivière",
	"Vinay",
	"Moussy",
	"Vertus",
	"Villers-Marmery",
	"Trépail",
	"Rilly-la-Montagne",
	"Ludes",
	"Chigny-les-Roses",
	"Montbré",
	"Sermiers",
	"Villedommange",
	"Ecueil",
	"Pargny-lès-Reims",
	"Sacy",
	"Jouy-lès-Reims",
	"Bar-sur-Aube",
	"Bar-sur-Seine",
	"Les Riceys",
];

export function zoekChampagneProducenten(query: string): string[] {
	if (!query || query.length < 1) return [];
	const q = query.toLowerCase();
	return CHAMPAGNE_PRODUCENTEN.filter((p) => p.toLowerCase().includes(q)).slice(
		0,
		8,
	);
}

export function zoekChampagneVillages(query: string): string[] {
	if (!query || query.length < 1) return [];
	const q = query.toLowerCase();
	return CHAMPAGNE_VILLAGES.filter((v) => v.toLowerCase().includes(q)).slice(
		0,
		8,
	);
}

export const champagneKleurOpties = [
	{ waarde: "lemon", label: "Lemon", hex: "#f5f0a0" },
	{ waarde: "gold", label: "Gold", hex: "#e8c84a" },
	{ waarde: "deep_gold", label: "Deep gold", hex: "#c8a820" },
	{ waarde: "amber", label: "Amber", hex: "#cf8f2e" },
	{ waarde: "copper", label: "Copper", hex: "#b87333" },
	{ waarde: "salmon", label: "Salmon (rosé)", hex: "#fa8072" },
	{ waarde: "pink", label: "Pink (rosé)", hex: "#ffb6c1" },
	{ waarde: "deep_pink", label: "Deep pink (rosé)", hex: "#e75480" },
] as const;

export const belGrootteOpties = [
	{ waarde: "fine", label: "Fine" },
	{ waarde: "medium", label: "Medium" },
	{ waarde: "coarse", label: "Coarse" },
] as const;

export const belPersistentieOpties = [
	{ waarde: "persistent", label: "Persistent" },
	{ waarde: "moderate", label: "Moderate" },
	{ waarde: "weak", label: "Weak" },
] as const;

export const mousseKwaliteitOpties = [
	{ waarde: "fine_creamy", label: "Fine & creamy" },
	{ waarde: "pleasant", label: "Pleasant" },
	{ waarde: "coarse", label: "Coarse" },
] as const;

export const champagneHelderheidOpties = [
	{ waarde: "clear", label: "Clear" },
	{ waarde: "hazy", label: "Hazy" },
	{ waarde: "cloudy", label: "Cloudy" },
] as const;

export const champagneIntensiteitOpties = [
	{ waarde: "low", label: "Low" },
	{ waarde: "medium-", label: "Medium-" },
	{ waarde: "medium", label: "Medium" },
	{ waarde: "medium+", label: "Medium+" },
	{ waarde: "pronounced", label: "Pronounced" },
] as const;

export const autolytischKarakterOpties = [
	{ waarde: "none", label: "None", beschrijving: "No autolytic character" },
	{ waarde: "light", label: "Light", beschrijving: "Subtle bread/yeast notes" },
	{
		waarde: "pronounced",
		label: "Pronounced",
		beschrijving: "Dominant brioche, toast, pastry",
	},
] as const;

export const oxidatiefKarakterOpties = [
	{ waarde: "none", label: "None", beschrijving: "Fresh, reductive style" },
	{
		waarde: "light",
		label: "Light",
		beschrijving: "Subtle honey, dried fruit notes",
	},
	{
		waarde: "pronounced",
		label: "Pronounced",
		beschrijving: "Prominent nuts, caramel, dried fruit",
	},
] as const;

export const champagneAromaCategorieen = [
	{
		categorie: "Floral",
		aromas: [
			"White flowers",
			"Acacia",
			"Rose",
			"Honeysuckle",
			"Jasmine",
			"Elder flower",
		],
	},
	{
		categorie: "Citrus",
		aromas: [
			"Lemon",
			"Lime",
			"Grapefruit",
			"Orange zest",
			"Yuzu",
			"Lemon curd",
		],
	},
	{
		categorie: "Green / White fruit",
		aromas: [
			"Green apple",
			"Golden apple",
			"Pear",
			"Quince",
			"White peach",
			"Nectarine",
		],
	},
	{
		categorie: "Stone fruit",
		aromas: ["Peach", "Apricot", "Plum", "Mirabelle"],
	},
	{
		categorie: "Tropical fruit",
		aromas: ["Pineapple", "Mango", "Passion fruit", "Lychee"],
	},
	{
		categorie: "Red fruit",
		aromas: [
			"Red cherry",
			"Strawberry",
			"Raspberry",
			"Redcurrant",
			"Pomegranate",
		],
	},
	{
		categorie: "Dried / Candied fruit",
		aromas: [
			"Dried apricot",
			"Candied lemon",
			"Fig",
			"Raisins",
			"Prune",
			"Marmalade",
		],
	},
	{
		categorie: "Autolytic",
		aromas: [
			"Brioche",
			"Biscuit",
			"Toast",
			"Pastry",
			"Cream",
			"Butter",
			"Almond",
			"Hazelnut",
			"Walnut",
			"Yeast",
			"Dough",
		],
	},
	{
		categorie: "Mineral",
		aromas: ["Chalk", "Flint", "Wet stone", "Oyster shell", "Iodine", "Smoke"],
	},
	{
		categorie: "Spice",
		aromas: ["Ginger", "White pepper", "Cinnamon", "Anise", "Liquorice"],
	},
	{
		categorie: "Oxidative / Aged",
		aromas: [
			"Honey",
			"Beeswax",
			"Dried flowers",
			"Toffee",
			"Caramel",
			"Dried nuts",
			"Coffee",
			"Chocolate",
			"Tobacco",
			"Mushroom",
		],
	},
	{ categorie: "Oak", aromas: ["Vanilla", "Cedar", "Coconut", "Clove"] },
];

export const champagneAanvalOpties = [
	{
		waarde: "fresh",
		label: "Fresh",
		beschrijving: "Lively, high acidity on entry",
	},
	{
		waarde: "ripe",
		label: "Ripe",
		beschrijving: "Generous, fruit-forward entry",
	},
	{ waarde: "soft", label: "Soft", beschrijving: "Gentle, low-acid entry" },
] as const;

export const champagneZoetheidOpties = [
	{
		waarde: "bone_dry",
		label: "Bone dry",
		beschrijving: "Brut Nature / Extra Brut",
	},
	{ waarde: "dry", label: "Dry", beschrijving: "Brut" },
	{ waarde: "off_dry", label: "Off-dry", beschrijving: "Extra Sec" },
	{ waarde: "medium_dry", label: "Medium dry", beschrijving: "Sec" },
	{ waarde: "medium_sweet", label: "Medium sweet", beschrijving: "Demi-sec" },
	{ waarde: "sweet", label: "Sweet", beschrijving: "Doux" },
] as const;

export const champagneZuurgraadOpties = [
	{ waarde: "low", label: "Low" },
	{ waarde: "medium-", label: "Medium-" },
	{ waarde: "medium", label: "Medium" },
	{ waarde: "medium+", label: "Medium+" },
	{ waarde: "high", label: "High" },
] as const;

export const champagneBodyOpties = [
	{ waarde: "light", label: "Light" },
	{ waarde: "medium", label: "Medium" },
	{ waarde: "full", label: "Full" },
] as const;

export const champagneAfdronkOpties = [
	{ waarde: "short", label: "Short" },
	{ waarde: "medium", label: "Medium" },
	{ waarde: "long", label: "Long" },
] as const;

export const champagneComplexiteitOpties = [
	{ waarde: "simple", label: "Simple" },
	{ waarde: "medium", label: "Some complexity" },
	{ waarde: "complex", label: "Complex" },
] as const;

export const champagneKwaliteitOpties = [
	{
		waarde: "acceptable",
		label: "Acceptable",
		beschrijving: "One quality dimension present",
	},
	{
		waarde: "good",
		label: "Good",
		beschrijving: "Two quality dimensions present",
	},
	{
		waarde: "very_good",
		label: "Very good",
		beschrijving: "Three quality dimensions present",
	},
	{
		waarde: "outstanding",
		label: "Outstanding",
		beschrijving:
			"All quality dimensions: balance, length, intensity, complexity",
	},
] as const;

export const champagneDrinkbaarheidOpties = [
	{ waarde: "drink_now", label: "Drink now" },
	{ waarde: "can_age", label: "Can age (has potential)" },
	{ waarde: "needs_age", label: "Needs more time" },
	{ waarde: "past_peak", label: "Past its peak" },
] as const;

// =====================================================================
// BILINGUAL (NL/EN) VERSIONS — used via localizeOpties(arr, termsLang).
// Forms should import the *Bi versions and convert at render-time.
// =====================================================================

export const cuveeTypeOptiesBi = [
	{ waarde: "nv", nl: "Non-millésime (NV)", en: "Non-vintage (NV)", beschrijving: { nl: "Blend van meerdere oogstjaren", en: "Blend of multiple years" } },
	{ waarde: "millesime", nl: "Millésimé", en: "Millésimé", beschrijving: { nl: "Eén oogstjaar", en: "Single harvest year" } },
	{ waarde: "prestige", nl: "Prestige cuvée", en: "Prestige cuvée", beschrijving: { nl: "Top-cuvée", en: "Top-tier single cuvée" } },
] as const;

export const stijlOptiesBi = [
	{ waarde: "blanc_de_blancs", nl: "Blanc de Blancs", en: "Blanc de Blancs", beschrijving: { nl: "100% Chardonnay", en: "100% Chardonnay" } },
	{ waarde: "blanc_de_noirs", nl: "Blanc de Noirs", en: "Blanc de Noirs", beschrijving: { nl: "Pinot Noir en/of Meunier", en: "Pinot Noir and/or Meunier" } },
	{ waarde: "assemblage", nl: "Assemblage", en: "Assemblage", beschrijving: { nl: "Blend van Chardonnay, Pinot Noir, Meunier", en: "Blend of Chardonnay, Pinot Noir, Meunier" } },
	{ waarde: "rose_assemblage", nl: "Rosé (assemblage)", en: "Rosé (assemblage)", beschrijving: { nl: "Geblend met stille rode wijn", en: "Blended with still red wine" } },
	{ waarde: "rose_saignee", nl: "Rosé (saignée)", en: "Rosé (saignée)", beschrijving: { nl: "Macereermethode", en: "Maceration method" } },
] as const;

export const dosageOptiesBi = [
	{ waarde: "brut_nature", nl: "Brut Nature", en: "Brut Nature", beschrijving: { nl: "0–3 g/L", en: "0–3 g/L" } },
	{ waarde: "extra_brut", nl: "Extra Brut", en: "Extra Brut", beschrijving: { nl: "0–6 g/L", en: "0–6 g/L" } },
	{ waarde: "brut", nl: "Brut", en: "Brut", beschrijving: { nl: "<12 g/L", en: "<12 g/L" } },
	{ waarde: "extra_sec", nl: "Extra Sec", en: "Extra Sec", beschrijving: { nl: "12–17 g/L", en: "12–17 g/L" } },
	{ waarde: "sec", nl: "Sec", en: "Sec", beschrijving: { nl: "17–32 g/L", en: "17–32 g/L" } },
	{ waarde: "demi_sec", nl: "Demi-sec", en: "Demi-sec", beschrijving: { nl: "32–50 g/L", en: "32–50 g/L" } },
	{ waarde: "doux", nl: "Doux", en: "Doux", beschrijving: { nl: ">50 g/L", en: ">50 g/L" } },
] as const;

export const producerTypeOptiesBi = [
	{ waarde: "nm", nl: "NM", en: "NM", beschrijving: { nl: "Négociant-Manipulant (Maison)", en: "Négociant-Manipulant (Maison)" } },
	{ waarde: "rm", nl: "RM", en: "RM", beschrijving: { nl: "Récoltant-Manipulant (Wijnboer)", en: "Récoltant-Manipulant (Grower)" } },
	{ waarde: "cm", nl: "CM", en: "CM", beschrijving: { nl: "Coopérative de Manipulation", en: "Coopérative de Manipulation" } },
	{ waarde: "rc", nl: "RC", en: "RC", beschrijving: { nl: "Récoltant-Coopérateur", en: "Récoltant-Coopérateur" } },
	{ waarde: "sr", nl: "SR", en: "SR", beschrijving: { nl: "Société de Récoltants", en: "Société de Récoltants" } },
	{ waarde: "nd", nl: "ND", en: "ND", beschrijving: { nl: "Négociant-Distributeur", en: "Négociant-Distributeur" } },
	{ waarde: "ma", nl: "MA", en: "MA", beschrijving: { nl: "Marque d'Acheteur (huismerk)", en: "Marque d'Acheteur (Buyer's Own Brand)" } },
] as const;

export const classificatieOptiesBi = [
	{ waarde: "grand_cru", nl: "Grand Cru (100%)", en: "Grand Cru (100%)" },
	{ waarde: "premier_cru", nl: "Premier Cru (90–99%)", en: "Premier Cru (90–99%)" },
	{ waarde: "village", nl: "Village (80–89%)", en: "Village (80–89%)" },
] as const;

export const champagneKleurOptiesBi = [
	{ waarde: "lemon", nl: "Citroengeel", en: "Lemon", hex: "#f5f0a0" },
	{ waarde: "gold", nl: "Goud", en: "Gold", hex: "#e8c84a" },
	{ waarde: "deep_gold", nl: "Diep goud", en: "Deep gold", hex: "#c8a820" },
	{ waarde: "amber", nl: "Amber", en: "Amber", hex: "#cf8f2e" },
	{ waarde: "copper", nl: "Koper", en: "Copper", hex: "#b87333" },
	{ waarde: "salmon", nl: "Zalm (rosé)", en: "Salmon (rosé)", hex: "#fa8072" },
	{ waarde: "pink", nl: "Roze (rosé)", en: "Pink (rosé)", hex: "#ffb6c1" },
	{ waarde: "deep_pink", nl: "Diep roze (rosé)", en: "Deep pink (rosé)", hex: "#e75480" },
] as const;

export const belGrootteOptiesBi = [
	{ waarde: "fine", nl: "Fijn", en: "Fine" },
	{ waarde: "medium", nl: "Medium", en: "Medium" },
	{ waarde: "coarse", nl: "Grof", en: "Coarse" },
] as const;

export const belPersistentieOptiesBi = [
	{ waarde: "persistent", nl: "Aanhoudend", en: "Persistent" },
	{ waarde: "moderate", nl: "Matig", en: "Moderate" },
	{ waarde: "weak", nl: "Zwak", en: "Weak" },
] as const;

export const mousseKwaliteitOptiesBi = [
	{ waarde: "fine_creamy", nl: "Fijn & romig", en: "Fine & creamy" },
	{ waarde: "pleasant", nl: "Prettig", en: "Pleasant" },
	{ waarde: "coarse", nl: "Grof", en: "Coarse" },
] as const;

export const champagneHelderheidOptiesBi = [
	{ waarde: "clear", nl: "Helder", en: "Clear" },
	{ waarde: "hazy", nl: "Wazig", en: "Hazy" },
	{ waarde: "cloudy", nl: "Troebel", en: "Cloudy" },
] as const;

export const champagneIntensiteitOptiesBi = [
	{ waarde: "low", nl: "Laag", en: "Low" },
	{ waarde: "medium-", nl: "Medium-", en: "Medium-" },
	{ waarde: "medium", nl: "Medium", en: "Medium" },
	{ waarde: "medium+", nl: "Medium+", en: "Medium+" },
	{ waarde: "pronounced", nl: "Uitgesproken", en: "Pronounced" },
] as const;

export const autolytischKarakterOptiesBi = [
	{ waarde: "none", nl: "Geen", en: "None", beschrijving: { nl: "Geen autolytisch karakter", en: "No autolytic character" } },
	{ waarde: "light", nl: "Licht", en: "Light", beschrijving: { nl: "Subtiele brood/gist-tonen", en: "Subtle bread/yeast notes" } },
	{ waarde: "pronounced", nl: "Uitgesproken", en: "Pronounced", beschrijving: { nl: "Dominante brioche, toast, gebak", en: "Dominant brioche, toast, pastry" } },
] as const;

export const oxidatiefKarakterOptiesBi = [
	{ waarde: "none", nl: "Geen", en: "None", beschrijving: { nl: "Fris, reductieve stijl", en: "Fresh, reductive style" } },
	{ waarde: "light", nl: "Licht", en: "Light", beschrijving: { nl: "Subtiele honing, gedroogd fruit", en: "Subtle honey, dried fruit notes" } },
	{ waarde: "pronounced", nl: "Uitgesproken", en: "Pronounced", beschrijving: { nl: "Prominent noten, karamel, gedroogd fruit", en: "Prominent nuts, caramel, dried fruit" } },
] as const;

export const champagneAanvalOptiesBi = [
	{ waarde: "fresh", nl: "Fris", en: "Fresh", beschrijving: { nl: "Levendig, hoge zuren bij intrede", en: "Lively, high acidity on entry" } },
	{ waarde: "ripe", nl: "Rijp", en: "Ripe", beschrijving: { nl: "Genereus, fruit-voorwaarts bij intrede", en: "Generous, fruit-forward entry" } },
	{ waarde: "soft", nl: "Zacht", en: "Soft", beschrijving: { nl: "Mild, lage zuren bij intrede", en: "Gentle, low-acid entry" } },
] as const;

export const champagneZoetheidOptiesBi = [
	{ waarde: "bone_dry", nl: "Kurkdroog", en: "Bone dry", beschrijving: { nl: "Brut Nature / Extra Brut", en: "Brut Nature / Extra Brut" } },
	{ waarde: "dry", nl: "Droog", en: "Dry", beschrijving: { nl: "Brut", en: "Brut" } },
	{ waarde: "off_dry", nl: "Off-dry", en: "Off-dry", beschrijving: { nl: "Extra Sec", en: "Extra Sec" } },
	{ waarde: "medium_dry", nl: "Medium-droog", en: "Medium dry", beschrijving: { nl: "Sec", en: "Sec" } },
	{ waarde: "medium_sweet", nl: "Medium-zoet", en: "Medium sweet", beschrijving: { nl: "Demi-sec", en: "Demi-sec" } },
	{ waarde: "sweet", nl: "Zoet", en: "Sweet", beschrijving: { nl: "Doux", en: "Doux" } },
] as const;

export const champagneZuurgraadOptiesBi = [
	{ waarde: "low", nl: "Laag", en: "Low" },
	{ waarde: "medium-", nl: "Medium-", en: "Medium-" },
	{ waarde: "medium", nl: "Medium", en: "Medium" },
	{ waarde: "medium+", nl: "Medium+", en: "Medium+" },
	{ waarde: "high", nl: "Hoog", en: "High" },
] as const;

export const champagneBodyOptiesBi = [
	{ waarde: "light", nl: "Licht", en: "Light" },
	{ waarde: "medium", nl: "Medium", en: "Medium" },
	{ waarde: "full", nl: "Vol", en: "Full" },
] as const;

export const champagneAfdronkOptiesBi = [
	{ waarde: "short", nl: "Kort", en: "Short" },
	{ waarde: "medium", nl: "Medium", en: "Medium" },
	{ waarde: "long", nl: "Lang", en: "Long" },
] as const;

export const champagneComplexiteitOptiesBi = [
	{ waarde: "simple", nl: "Eenvoudig", en: "Simple" },
	{ waarde: "medium", nl: "Enige complexiteit", en: "Some complexity" },
	{ waarde: "complex", nl: "Complex", en: "Complex" },
] as const;

export const champagneKwaliteitOptiesBi = [
	{ waarde: "acceptable", nl: "Acceptabel", en: "Acceptable", beschrijving: { nl: "Eén kwaliteits-dimensie aanwezig", en: "One quality dimension present" } },
	{ waarde: "good", nl: "Goed", en: "Good", beschrijving: { nl: "Twee kwaliteits-dimensies aanwezig", en: "Two quality dimensions present" } },
	{ waarde: "very_good", nl: "Zeer goed", en: "Very good", beschrijving: { nl: "Drie kwaliteits-dimensies aanwezig", en: "Three quality dimensions present" } },
	{ waarde: "outstanding", nl: "Uitmuntend", en: "Outstanding", beschrijving: { nl: "Alle kwaliteits-dimensies: balans, lengte, intensiteit, complexiteit", en: "All quality dimensions: balance, length, intensity, complexity" } },
] as const;

export const champagneDrinkbaarheidOptiesBi = [
	{ waarde: "drink_now", nl: "Drink nu", en: "Drink now" },
	{ waarde: "can_age", nl: "Kan rijpen (potentieel)", en: "Can age (has potential)" },
	{ waarde: "needs_age", nl: "Heeft meer tijd nodig", en: "Needs more time" },
	{ waarde: "past_peak", nl: "Voorbij hoogtepunt", en: "Past its peak" },
] as const;
