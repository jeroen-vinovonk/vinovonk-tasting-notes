import type { Lang } from "./form-labels";

export type JargonEntry = {
	nl: string;
	en: string;
};

export const JARGON: Record<string, JargonEntry> = {
	tannine: {
		nl: "Het droge, samentrekkende gevoel in je mond. Komt uit druivenschillen, pitten en eikenhout. Je voelt het vooral op je tandvlees en wangen.",
		en: "The dry, gripping sensation in your mouth. Comes from grape skins, seeds and oak. You feel it on your gums and cheeks.",
	},
	zuurgraad: {
		nl: "Het frisse effect onder je tong dat je mond doet wateren. Hoog zuur voelt sprankelend, laag zuur voelt zacht en rond.",
		en: "The fresh effect under your tongue that makes your mouth water. High acidity feels bright, low acidity feels soft and round.",
	},
	body: {
		nl: "Hoe zwaar of licht een wijn aanvoelt in je mond. Denk aan magere melk versus volle melk.",
		en: "How heavy or light a wine feels in your mouth. Think skim milk versus whole milk.",
	},
	afdronk: {
		nl: "De smaak die blijft hangen nadat je geslikt hebt. Lang en complex wijst meestal op kwaliteit.",
		en: "The flavour that lingers after you swallow. Long and complex usually points to quality.",
	},
	intensiteit: {
		nl: "Hoe sterk de geur of smaak is. Bij licht moet je moeite doen om iets op te pikken. Uitgesproken springt eruit zodra je het glas nadert.",
		en: "How strong the aroma or flavour is. With light, you have to work for it. Pronounced jumps out the moment the glass gets near.",
	},
	mousse: {
		nl: "De belletjes in mousserende wijn. Fijn en aanhoudend voelt elegant, grof en kortlevend voelt simpeler.",
		en: "The bubbles in sparkling wine. Fine and persistent feels elegant; coarse and short-lived feels simpler.",
	},
	dosage: {
		nl: "De suiker die ná de tweede gisting aan champagne wordt toegevoegd. Bepaalt hoe droog of zoet de fles uiteindelijk smaakt.",
		en: "The sugar added to champagne after the second fermentation. Determines how dry or sweet the bottle ends up.",
	},
	helderheid: {
		nl: "Of de wijn helder of troebel is. Troebel hoeft geen fout te zijn. Bij natuurwijn is het vaak normaal.",
		en: "Whether the wine is clear or hazy. Hazy isn't always a flaw. Natural wine is often cloudy on purpose.",
	},
	ontwikkeling: {
		nl: "Of de wijn nog jong en fruitig ruikt, of al rijpere geuren toont (leer, paddenstoel, gedroogd fruit).",
		en: "Whether the wine still smells young and fruity, or already shows mature notes (leather, mushroom, dried fruit).",
	},
	kwaliteitsniveau: {
		nl: "Je oordeel over de kwaliteit. Niet of je 'm lekker vindt, maar of de wijn goed gemaakt is en in balans zit.",
		en: "Your judgement of quality. Not whether you like it, but whether the wine is well made and in balance.",
	},
	zoetheid: {
		nl: "Hoeveel suiker je proeft. Droog is nauwelijks suiker, zoet is duidelijk merkbaar.",
		en: "How much sugar you taste. Dry is barely any, sweet is clearly perceptible.",
	},
	alcoholgevoel: {
		nl: "De warme tinteling achter in je mond. Hoge alcohol voelt vaak warm of brandend.",
		en: "The warm tingle at the back of your mouth. High alcohol often feels warm or burning.",
	},
	conditie: {
		nl: "Of de wijn schoon ruikt of een fout heeft. Kurk, oxidatie of azijn zijn klassieke fouten. Bij twijfel: ruik nog een keer.",
		en: "Whether the wine smells clean or has a fault. Cork taint, oxidation or vinegar are classic flaws. When in doubt, sniff again.",
	},
	drinkrijpheid: {
		nl: "Of de wijn nu klaar is om te drinken, of beter nog even op fles ligt. Te jong voelt gesloten, te oud is over zijn hoogtepunt.",
		en: "Whether the wine is ready to drink now, or needs more bottle age. Too young feels closed, too old is past its peak.",
	},
	aanval: {
		nl: "De eerste indruk zodra de wijn je tong raakt. Voorzichtig en aarzelend, of meteen luid en aanwezig?",
		en: "The first impression the moment the wine hits your tongue. Shy and hesitant, or loud and present right away?",
	},
	belgrootte: {
		nl: "Hoe groot of fijn de bellen zijn. Fijne, naaldfijne bellen wijzen meestal op langere fles-rijping.",
		en: "How large or fine the bubbles are. Fine, needle-like bubbles usually point to longer bottle ageing.",
	},
	belpersistentie: {
		nl: "Hoe lang de bellen blijven opstijgen na het inschenken. Aanhoudend = vakwerk, snel uitgewerkt = simpeler stijl.",
		en: "How long bubbles keep rising after pouring. Persistent = craftsmanship, fading fast = simpler style.",
	},
	moussekwaliteit: {
		nl: "De totale indruk van de mousse: fijn en romig, prettig, of grof en schuimig?",
		en: "The overall impression of the mousse: fine and creamy, pleasant, or coarse and foamy?",
	},
	autolytisch: {
		nl: "Brood-, gist- en briochetonen die ontstaan tijdens lange rijping op de gistcellen in de fles. Typisch voor goede champagne.",
		en: "Bread, yeast and brioche notes that develop during long ageing on the lees in the bottle. Typical of good champagne.",
	},
	oxidatief: {
		nl: "Honing-, noten- en gedroogd-fruittonen door bewust contact met zuurstof. Niet automatisch een fout — kan ook stijl zijn.",
		en: "Honey, nuts and dried-fruit notes from intentional oxygen contact. Not automatically a flaw — can be deliberate style.",
	},
	kleurintensiteit: {
		nl: "Hoe diep of bleek de kleur is. Veel licht-doorlatend = bleek, weinig licht = diep. Zegt iets over druif, klimaat en leeftijd.",
		en: "How deep or pale the colour is. Lots of light through = pale, little light = deep. Hints at grape, climate and age.",
	},
	bitterheid: {
		nl: "De licht bittere ondertoon, vaak van schillen, kruiden of thee. Kan structuur geven, maar te veel voelt streng.",
		en: "The slightly bitter undertone, often from skins, herbs or tea. Can add structure, but too much feels harsh.",
	},
	koolzuur: {
		nl: "De prikkelende belletjes. Geen koolzuur = stil, lichte prik = pétillant, volle bruis = mousserend.",
		en: "The tingly bubbles. No CO₂ = still, light fizz = pétillant, full sparkle = sparkling.",
	},
	afdronkComplexiteit: {
		nl: "Hoeveel verschillende lagen je nog proeft nadat je geslikt hebt. Eén toon of een hele waaier?",
		en: "How many different layers you still taste after swallowing. One note or a whole spectrum?",
	},
	smaakintensiteit: {
		nl: "Hoe sterk de smaak in de mond is, los van de geur. Zwak betekent dat je moet zoeken, krachtig vult de hele mond.",
		en: "How strong the flavour is in the mouth, separate from the aroma. Weak means you have to search, powerful fills the whole mouth.",
	},
	kleur: {
		nl: "De tint van de wijn. Zegt iets over druif, klimaat, vat-rijping en leeftijd. Witte wijn wordt donkerder met de tijd, rode wijn juist bleker.",
		en: "The shade of the wine. Hints at grape, climate, oak-ageing and age. White wine darkens over time; red wine fades.",
	},
};

export function getJargon(term: string, lang: Lang): string | null {
	const entry = JARGON[term.toLowerCase()];
	if (!entry) return null;
	return entry[lang];
}
