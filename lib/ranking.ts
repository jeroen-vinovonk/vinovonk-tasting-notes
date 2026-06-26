// Ranking-helpers voor de live-modus: sorteer geproefde wijnen op cijfer en
// voorspel waar een nieuw cijfer zou landen t.o.v. wat al genoteerd is.

import type { TastingNote } from "../types";

// Haal een toonbare naam uit een note, ongeacht het dranktype.
// wijn → wijnNaam, champagne → cuveeNaam, rest → naam.
export function noteNaam(note: TastingNote, fallback = "?"): string {
	const td = note.tastingData as unknown as Record<string, unknown>;
	const naam =
		(td?.wijnNaam as string) ??
		(td?.cuveeNaam as string) ??
		(td?.naam as string) ??
		"";
	return naam.trim() || fallback;
}

export interface RankedNote {
	note: TastingNote;
	naam: string;
	score: number;
	rank: number; // 1-based, gedeelde score → opvolgende rang (stabiel)
}

// Alle notes met een cijfer, gesorteerd hoog → laag.
export function rankNotes(notes: TastingNote[]): RankedNote[] {
	return notes
		.filter((n): n is TastingNote & { score: number } => n.score != null)
		.sort((a, b) => b.score - a.score)
		.map((n, i) => ({
			note: n,
			naam: noteNaam(n),
			score: n.score,
			rank: i + 1,
		}));
}

export interface RankPrediction {
	rank: number; // waar de wijn zou landen (1-based)
	total: number; // totaal aantal gerangschikte wijnen ná invoegen
	above: RankedNote | null; // buurman erboven (hoger of gelijk cijfer)
	below: RankedNote | null; // buurman eronder (lager cijfer)
}

// Voorspel de rang van een hypothetisch cijfer t.o.v. de al genoteerde wijnen.
// excludeId sluit de wijn die je nu bewerkt uit (anders telt 'ie dubbel).
export function predictRank(
	notes: TastingNote[],
	score: number,
	excludeId?: string,
): RankPrediction {
	const ranked = rankNotes(notes.filter((n) => n.id !== excludeId));
	// Plaats het nieuwe cijfer ná wijnen met een gelijk of hoger cijfer.
	const insertIndex = ranked.filter((r) => r.score >= score).length;
	return {
		rank: insertIndex + 1,
		total: ranked.length + 1,
		above: ranked[insertIndex - 1] ?? null,
		below: ranked[insertIndex] ?? null,
	};
}
