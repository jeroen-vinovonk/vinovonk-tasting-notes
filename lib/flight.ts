// Serverloze flight-deling: de hele line-up zit in de URL (geen backend).
// Gastheer bouwt een flight → compacte payload in de hash → QR/link →
// deelnemer opent → lokale sessie met vooraf ingevulde wijnnamen.

export interface FlightPayload {
	n: string; // sessienaam
	w: string[]; // wijnnamen in volgorde
}

// Unicode-veilige base64url (wijnnamen kunnen accenten/é/ü bevatten).
export function encodeFlight(payload: FlightPayload): string {
	const json = JSON.stringify(payload);
	const bytes = new TextEncoder().encode(json);
	let bin = "";
	for (const b of bytes) bin += String.fromCharCode(b);
	return btoa(bin).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

export function decodeFlight(str: string): FlightPayload | null {
	try {
		const b64 = str.replace(/-/g, "+").replace(/_/g, "/");
		const bin = atob(b64);
		const bytes = Uint8Array.from(bin, (c) => c.charCodeAt(0));
		const json = new TextDecoder().decode(bytes);
		const obj = JSON.parse(json);
		if (
			!obj ||
			typeof obj.n !== "string" ||
			!Array.isArray(obj.w) ||
			!obj.w.every((x: unknown) => typeof x === "string")
		) {
			return null;
		}
		return { n: obj.n, w: obj.w };
	} catch {
		return null;
	}
}

// Textarea (één wijn per regel) → schone namen-array.
export function parseWineLines(text: string): string[] {
	return text
		.split("\n")
		.map((l) => l.trim())
		.filter(Boolean);
}

// Bouwt de deelbare URL voor de juiste taal-app.
export function buildFlightUrl(
	payload: FlightPayload,
	lang: "nl" | "en",
	origin: string,
): string {
	const base = lang === "en" ? "/en/tasting/app/" : "/proeven/app/";
	return `${origin}${base}#/flight/${encodeFlight(payload)}`;
}
