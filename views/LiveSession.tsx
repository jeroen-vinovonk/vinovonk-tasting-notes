import { ArrowLeft, ArrowRight, Check } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { v4 as uuidv4 } from "uuid";
import {
	intensiteitDrieOptiesBi,
	kleurRoodOptiesBi,
	kleurRoséOptiesBi,
	kleurWitOptiesBi,
} from "../data/wine-options";
import { AromaPicker } from "../features/AromaPicker";
import {
	getAfdronkOpties,
	getBodyOpties,
	getDrieSchaalOpties,
	getHelderheidOpties,
	getIntensiteitOpties,
	getWijnTypeOpties,
	getZoetheidOpties,
} from "../lib/form-labels";
import { addFles, getSession, updateFles } from "../lib/storage";
import { navigate } from "../router";
import {
	type AfdronkLengte,
	type Body,
	createEmptyWineTasting,
	type Helderheid,
	type IntensiteitDrie,
	type IntensiteitVijf,
	type SchaalVijf,
	type TastingNote,
	type WijnKleur,
	type WijnType,
	type Zoetheid,
} from "../types";

// Kleur-palet hoort bij het wijntype (zelfde sets als het volledige formulier).
function kleurOptiesVoor(type: WijnType | undefined, lang: "nl" | "en") {
	const bi =
		type === "wit" || type === "mousserend"
			? kleurWitOptiesBi
			: type === "rosé"
				? kleurRoséOptiesBi
				: type === "rood" || type === "versterkt"
					? kleurRoodOptiesBi
					: [];
	return bi.map((o) => ({
		waarde: o.waarde,
		label: lang === "en" ? o.en : o.nl,
		hex: o.hex,
	}));
}

interface LiveSessionProps {
	sessionId: string;
	lang?: "nl" | "en";
}

const T = {
	nl: {
		eyebrow: "Live proeven",
		intro: "Sla per wijn een snelle indruk op. Verfijn later thuis.",
		wineWord: "Wijn",
		saved: "opgeslagen",
		naamLabel: "Naam of nummer (optioneel)",
		lekkerLabel: "Vind ik het lekker?",
		lekkerOpties: [
			["nee", "Nee"],
			["gaatwel", "Gaat wel"],
			["ja", "Ja"],
		],
		kopenLabel: "Zou ik 'm zelf kopen?",
		kopenOpties: [
			["nee", "Nee"],
			["misschien", "Misschien"],
			["ja", "Ja"],
		],
		scoreLabel: "Cijfer (optioneel)",
		typeLabel: "Soort wijn",
		helderheidLabel: "Helderheid",
		intensiteitLabel: "Intensiteit",
		kleurLabel: "Kleur",
		stageKijken: "1 · Kijken",
		stageRuiken: "2 · Ruiken",
		stageProeven: "3 · Proeven",
		stageProefnotitie: "4 · Proefnotitie",
		stageConclusie: "5 · Conclusie",
		smaakLabel: "Smaakcategorieën",
		zoetheidLabel: "Zoetheid",
		zuurLabel: "Zuurgraad",
		tannineLabel: "Tannine",
		alcoholLabel: "Alcohol",
		bodyLabel: "Body",
		afdronkLabel: "Afdronk",
		notitieLabel: "Korte notitie (optioneel)",
		notitiePlaceholder: "Eén indruk in een paar woorden...",
		volgende: "Volgende wijn",
		vorige: "Vorige wijn",
		klaar: "Klaar",
		terug: "Terug",
		nietGevonden: "Sessie niet gevonden",
		opgeslagenToast: "opgeslagen",
		leegToast: "Niks ingevuld — volgende wijn",
	},
	en: {
		eyebrow: "Live tasting",
		intro: "Capture a quick impression per wine. Refine later at home.",
		wineWord: "Wine",
		saved: "saved",
		naamLabel: "Name or number (optional)",
		lekkerLabel: "Do I like it?",
		lekkerOpties: [
			["nee", "No"],
			["gaatwel", "So-so"],
			["ja", "Yes"],
		],
		kopenLabel: "Would I buy it?",
		kopenOpties: [
			["nee", "No"],
			["misschien", "Maybe"],
			["ja", "Yes"],
		],
		scoreLabel: "Score (optional)",
		typeLabel: "Wine type",
		helderheidLabel: "Clarity",
		intensiteitLabel: "Intensity",
		kleurLabel: "Colour",
		stageKijken: "1 · Look",
		stageRuiken: "2 · Smell",
		stageProeven: "3 · Taste",
		stageProefnotitie: "4 · Note",
		stageConclusie: "5 · Conclusion",
		smaakLabel: "Flavour categories",
		zoetheidLabel: "Sweetness",
		zuurLabel: "Acidity",
		tannineLabel: "Tannin",
		alcoholLabel: "Alcohol",
		bodyLabel: "Body",
		afdronkLabel: "Finish",
		notitieLabel: "Quick note (optional)",
		notitiePlaceholder: "One impression in a few words...",
		volgende: "Next wine",
		vorige: "Previous wine",
		klaar: "Done",
		terug: "Back",
		nietGevonden: "Session not found",
		opgeslagenToast: "saved",
		leegToast: "Nothing entered — next wine",
	},
};

export function LiveSession({ sessionId, lang = "nl" }: LiveSessionProps) {
	const t = T[lang];
	const [sessieNaam, setSessieNaam] = useState<string | null>(null);
	const [found, setFound] = useState(true);

	// Huidige kaart
	const [index, setIndex] = useState(1);
	const [savedCount, setSavedCount] = useState(0);
	const [editingId, setEditingId] = useState<string | undefined>(undefined);
	const [naam, setNaam] = useState("");
	const [wijnType, setWijnType] = useState<WijnType | undefined>(undefined);
	const [helderheid, setHelderheid] = useState<Helderheid | undefined>(
		undefined,
	);
	const [intensiteit, setIntensiteit] = useState<IntensiteitDrie | undefined>(
		undefined,
	);
	const [kleur, setKleur] = useState<WijnKleur | undefined>(undefined);
	const [neusIntensiteit, setNeusIntensiteit] = useState<
		IntensiteitVijf | undefined
	>(undefined);
	const [zoetheid, setZoetheid] = useState<Zoetheid | undefined>(undefined);
	const [zuur, setZuur] = useState<SchaalVijf | undefined>(undefined);
	const [tannine, setTannine] = useState<SchaalVijf | undefined>(undefined);
	const [alcohol, setAlcohol] = useState<SchaalVijf | undefined>(undefined);
	const [body, setBody] = useState<Body | undefined>(undefined);
	const [afdronk, setAfdronk] = useState<AfdronkLengte | undefined>(undefined);
	const [lekker, setLekker] = useState<TastingNote["lekker"]>(undefined);
	const [zouKopen, setZouKopen] = useState<TastingNote["zouKopen"]>(undefined);
	const [score, setScore] = useState<number | undefined>(undefined);
	const [aroma, setAroma] = useState<string[]>([]);
	const [smaak, setSmaak] = useState<string[]>([]);
	const [notitie, setNotitie] = useState("");
	const [busy, setBusy] = useState(false);
	const [flightWines, setFlightWines] = useState<string[]>([]);
	const touchStart = useRef<{ x: number; y: number } | null>(null);

	useEffect(() => {
		const sessie = getSession(sessionId);
		if (!sessie) {
			setFound(false);
			return;
		}
		setSessieNaam(sessie.naam);
		const startIndex = sessie.flessen.length + 1;
		setIndex(startIndex);
		setSavedCount(sessie.flessen.length);
		const fw = sessie.flightWines ?? [];
		setFlightWines(fw);
		// Pre-vul de wijnnaam uit een gedeelde flight (deelnemer hoeft niks te typen).
		setNaam(fw[startIndex - 1] ?? "");
	}, [sessionId]);

	const heeftData =
		wijnType !== undefined ||
		helderheid !== undefined ||
		intensiteit !== undefined ||
		kleur !== undefined ||
		neusIntensiteit !== undefined ||
		zoetheid !== undefined ||
		zuur !== undefined ||
		tannine !== undefined ||
		alcohol !== undefined ||
		body !== undefined ||
		afdronk !== undefined ||
		lekker !== undefined ||
		zouKopen !== undefined ||
		score !== undefined ||
		aroma.length > 0 ||
		smaak.length > 0 ||
		notitie.trim().length > 0;

	// Verse, lege kaart voor wijn op positie pos.
	function freshCard(pos: number) {
		setNaam(flightWines[pos - 1] ?? "");
		setWijnType(undefined);
		setHelderheid(undefined);
		setIntensiteit(undefined);
		setKleur(undefined);
		setNeusIntensiteit(undefined);
		setZoetheid(undefined);
		setZuur(undefined);
		setTannine(undefined);
		setAlcohol(undefined);
		setBody(undefined);
		setAfdronk(undefined);
		setLekker(undefined);
		setZouKopen(undefined);
		setScore(undefined);
		setAroma([]);
		setSmaak([]);
		setNotitie("");
		setEditingId(undefined);
		setIndex(pos);
	}

	// Laad een bestaande fles terug in de kaart om te corrigeren.
	function loadCard(note: TastingNote, pos: number) {
		const td = note.tastingData as unknown as Record<string, unknown>;
		const neus = td?.neus as {
			aromaKenmerken?: { primair?: string[] };
			intensiteit?: IntensiteitVijf;
		};
		const gehemelte = td?.gehemelte as {
			smaakKenmerken?: { primair?: string[] };
			zoetheid?: Zoetheid;
			zuurgraad?: SchaalVijf;
			tannine?: SchaalVijf;
			alcohol?: SchaalVijf;
			body?: Body;
			afdronk?: { lengte?: AfdronkLengte };
		};
		const uiterlijk = td?.uiterlijk as {
			helderheid?: Helderheid;
			intensiteit?: IntensiteitDrie;
			kleur?: WijnKleur;
		};
		setNaam((td?.wijnNaam as string) ?? "");
		setWijnType(td?.wijnType as WijnType | undefined);
		setHelderheid(uiterlijk?.helderheid ?? undefined);
		setIntensiteit(uiterlijk?.intensiteit ?? undefined);
		setKleur(uiterlijk?.kleur ?? undefined);
		setNeusIntensiteit(neus?.intensiteit ?? undefined);
		setZoetheid(gehemelte?.zoetheid ?? undefined);
		setZuur(gehemelte?.zuurgraad ?? undefined);
		setTannine(gehemelte?.tannine ?? undefined);
		setAlcohol(gehemelte?.alcohol ?? undefined);
		setBody(gehemelte?.body ?? undefined);
		setAfdronk(gehemelte?.afdronk?.lengte ?? undefined);
		setAroma(neus?.aromaKenmerken?.primair ?? []);
		setSmaak(gehemelte?.smaakKenmerken?.primair ?? []);
		setNotitie(note.persoonlijkeNotitie ?? "");
		setLekker(note.lekker);
		setZouKopen(note.zouKopen);
		setScore(note.score);
		setEditingId(note.id);
		setIndex(pos);
	}

	function commit(): boolean {
		if (!heeftData) return false;

		const data = createEmptyWineTasting();
		data.wijnNaam = naam.trim() || `${t.wineWord} ${index}`;
		if (wijnType) data.wijnType = wijnType;
		data.uiterlijk.helderheid = helderheid ?? null;
		data.uiterlijk.intensiteit = intensiteit ?? null;
		data.uiterlijk.kleur = kleur ?? null;
		data.neus.intensiteit = neusIntensiteit ?? null;
		data.neus.aromaKenmerken.primair = aroma;
		data.gehemelte.zoetheid = zoetheid ?? null;
		data.gehemelte.zuurgraad = zuur ?? null;
		data.gehemelte.tannine = tannine ?? null;
		data.gehemelte.alcohol = alcohol ?? null;
		data.gehemelte.body = body ?? null;
		data.gehemelte.afdronk.lengte = afdronk ?? null;
		data.gehemelte.smaakKenmerken.primair = smaak;

		if (editingId) {
			updateFles(sessionId, editingId, {
				tastingData: data,
				persoonlijkeNotitie: notitie.trim() || undefined,
				lekker,
				zouKopen,
				score,
			});
		} else {
			const now = new Date().toISOString();
			addFles(sessionId, {
				id: uuidv4(),
				drankType: "wijn",
				tastingData: data,
				persoonlijkeNotitie: notitie.trim() || undefined,
				lekker,
				zouKopen,
				score,
				createdAt: now,
				updatedAt: now,
			});
		}
		return true;
	}

	// Spring naar positie pos (1-based): laad bestaande fles of verse kaart.
	function goToPos(pos: number) {
		const ses = getSession(sessionId);
		const flessen = ses?.flessen ?? [];
		setSavedCount(flessen.length);
		if (pos >= 1 && pos <= flessen.length) {
			loadCard(flessen[pos - 1], pos);
		} else {
			freshCard(Math.max(1, pos));
		}
	}

	function handleVolgende() {
		if (busy) return;
		setBusy(true);
		try {
			const opgeslagen = commit();
			if (opgeslagen) {
				const naamLabel = naam.trim() || `${t.wineWord} ${index}`;
				toast.success(`${naamLabel} ${t.opgeslagenToast}`);
			} else {
				toast(t.leegToast);
			}
			goToPos(index + 1);
		} finally {
			setBusy(false);
		}
	}

	function handleVorige() {
		if (busy || index <= 1) return;
		setBusy(true);
		try {
			commit();
			goToPos(index - 1);
		} finally {
			setBusy(false);
		}
	}

	function handleKlaar() {
		if (busy) return;
		setBusy(true);
		try {
			commit();
		} finally {
			navigate(`/sessie/${sessionId}`);
		}
	}

	function onTouchEnd(e: React.TouchEvent) {
		const st = touchStart.current;
		touchStart.current = null;
		if (!st) return;
		const tch = e.changedTouches[0];
		const dx = tch.clientX - st.x;
		const dy = tch.clientY - st.y;
		// Alleen duidelijke horizontale swipes; verticaal scrollen niet kapen.
		if (Math.abs(dx) > 80 && Math.abs(dx) > Math.abs(dy) * 1.5) {
			if (dx < 0) handleVolgende();
			else handleVorige();
		}
	}

	if (!found) {
		return (
			<div
				style={{
					maxWidth: "640px",
					margin: "0 auto",
					padding: "3rem var(--gap)",
					textAlign: "center",
					fontFamily: "var(--font-body)",
				}}
			>
				<p style={{ fontSize: "1.1rem" }}>{t.nietGevonden}</p>
				<button type="button" onClick={() => navigate("/")} style={linkBtn}>
					← Dashboard
				</button>
			</div>
		);
	}

	const score10 = Array.from({ length: 10 }, (_, i) => i + 1);

	return (
		<div
			onTouchStart={(e) => {
				const tch = e.touches[0];
				touchStart.current = { x: tch.clientX, y: tch.clientY };
			}}
			onTouchEnd={onTouchEnd}
			style={{
				maxWidth: "640px",
				margin: "0 auto",
				padding: "1.5rem var(--gap) 7rem",
				fontFamily: "var(--font-body)",
			}}
		>
			{/* Header */}
			<div
				style={{
					display: "flex",
					justifyContent: "space-between",
					alignItems: "center",
					marginBottom: "1rem",
				}}
			>
				<button
					type="button"
					onClick={() => navigate(`/sessie/${sessionId}`)}
					style={linkBtn}
				>
					<ArrowLeft size={14} /> {t.terug}
				</button>
				<span
					style={{
						fontFamily: "var(--font-body)",
						fontSize: "0.72rem",
						fontWeight: 700,
						letterSpacing: "0.1em",
						textTransform: "uppercase",
						color: "var(--color-gray)",
					}}
				>
					{savedCount} {t.saved}
				</span>
			</div>

			<span
				style={{
					display: "block",
					fontFamily: "var(--font-body)",
					fontWeight: 700,
					fontSize: "0.68rem",
					letterSpacing: "0.18em",
					textTransform: "uppercase",
					color: "var(--color-primary)",
					marginBottom: "0.35rem",
				}}
			>
				{t.eyebrow}
				{sessieNaam ? ` · ${sessieNaam}` : ""}
			</span>
			<h1
				style={{
					fontSize: "clamp(1.8rem, 6vw, 2.6rem)",
					margin: "0 0 0.35rem",
				}}
			>
				{t.wineWord} {index}
			</h1>
			<p
				style={{
					fontSize: "0.85rem",
					color: "var(--color-gray)",
					margin: "0 0 1.5rem",
				}}
			>
				{t.intro}
			</p>

			{/* Naam / nummer */}
			<input
				value={naam}
				onChange={(e) => setNaam(e.target.value)}
				placeholder={`${t.wineWord} ${index}`}
				aria-label={t.naamLabel}
				style={{
					width: "100%",
					padding: "0.75rem 0.9rem",
					fontFamily: "var(--font-body)",
					fontSize: "1rem",
					border: "4px solid var(--color-border)",
					background: "var(--color-white)",
					color: "var(--color-on-surface)",
					outline: "none",
					boxSizing: "border-box",
					marginBottom: "1.5rem",
				}}
			/>

			{/* Proefvolgorde: kijken → ruiken → proeven → conclusie */}

			{/* 1 · Kijken — wijntype + leg de fles/het glas vast */}
			<StageHeader>{t.stageKijken}</StageHeader>
			<span style={sectionLabel}>{t.typeLabel}</span>
			<div
				style={{
					display: "flex",
					flexWrap: "wrap",
					gap: "4px",
					marginBottom: "1.5rem",
				}}
			>
				{getWijnTypeOpties(lang).map((opt) => {
					const sel = wijnType === opt.waarde;
					return (
						<button
							key={opt.waarde}
							type="button"
							onClick={() =>
								setWijnType(sel ? undefined : (opt.waarde as WijnType))
							}
							aria-pressed={sel}
							style={{
								minHeight: 48,
								padding: "0.5rem 1rem",
								fontFamily: "var(--font-body)",
								fontWeight: 700,
								fontSize: "0.85rem",
								letterSpacing: "0.04em",
								cursor: "pointer",
								background: sel ? "var(--color-primary)" : "var(--color-white)",
								color: sel ? "#fff" : "var(--color-on-surface)",
								border: `4px solid ${sel ? "var(--color-primary)" : "var(--color-border)"}`,
								boxShadow: sel ? "4px 4px 0 var(--color-on-surface)" : "none",
							}}
						>
							{opt.label}
						</button>
					);
				})}
			</div>
			{/* Uiterlijk — helderheid, intensiteit, kleur (zoals in het hoofdformulier) */}
			<VerdictRow
				label={t.helderheidLabel}
				options={getHelderheidOpties(lang).map((o) => [o.waarde, o.label])}
				value={helderheid}
				onChange={(v) => setHelderheid(v as Helderheid | undefined)}
			/>
			<VerdictRow
				label={t.intensiteitLabel}
				options={intensiteitDrieOptiesBi.map((o) => [
					o.waarde,
					lang === "en" ? o.en : o.nl,
				])}
				value={intensiteit}
				onChange={(v) => setIntensiteit(v as IntensiteitDrie | undefined)}
			/>
			{kleurOptiesVoor(wijnType, lang).length > 0 && (
				<>
					<span style={sectionLabel}>{t.kleurLabel}</span>
					<div
						style={{
							display: "flex",
							flexWrap: "wrap",
							gap: "4px",
							marginBottom: "1.5rem",
						}}
					>
						{kleurOptiesVoor(wijnType, lang).map((opt) => {
							const sel = kleur === opt.waarde;
							return (
								<button
									key={opt.waarde}
									type="button"
									onClick={() =>
										setKleur(sel ? undefined : (opt.waarde as WijnKleur))
									}
									aria-pressed={sel}
									style={{
										display: "inline-flex",
										alignItems: "center",
										gap: "0.4rem",
										minHeight: 48,
										padding: "0.5rem 0.9rem",
										fontFamily: "var(--font-body)",
										fontWeight: 700,
										fontSize: "0.82rem",
										cursor: "pointer",
										background: sel
											? "var(--color-primary)"
											: "var(--color-white)",
										color: sel ? "#fff" : "var(--color-on-surface)",
										border: `4px solid ${sel ? "var(--color-primary)" : "var(--color-border)"}`,
										boxShadow: sel
											? "4px 4px 0 var(--color-on-surface)"
											: "none",
									}}
								>
									<span
										style={{
											width: 16,
											height: 16,
											borderRadius: "50%",
											background: opt.hex,
											border: "2px solid var(--color-border)",
											flex: "0 0 auto",
										}}
									/>
									{opt.label}
								</button>
							);
						})}
					</div>
				</>
			)}

			{/* 2 · Ruiken — intensiteit + aroma-tegels */}
			<StageHeader>{t.stageRuiken}</StageHeader>
			<VerdictRow
				label={t.intensiteitLabel}
				options={getIntensiteitOpties(lang).map((o) => [o.waarde, o.label])}
				value={neusIntensiteit}
				onChange={(v) => setNeusIntensiteit(v as IntensiteitVijf | undefined)}
			/>
			<div style={{ marginBottom: "2rem" }}>
				<AromaPicker
					mode="tiles"
					primair={aroma}
					secundair={[]}
					tertiair={[]}
					onPrimairChange={setAroma}
					onSecundairChange={() => {}}
					onTertiairChange={() => {}}
					lang={lang}
				/>
			</div>

			{/* 3 · Proeven — smaak-tegels (gehemelte), los van de notitie */}
			<StageHeader>{t.stageProeven}</StageHeader>
			<div style={{ marginBottom: "2rem" }}>
				<AromaPicker
					mode="tiles"
					tilesLabel={t.smaakLabel}
					primair={smaak}
					secundair={[]}
					tertiair={[]}
					onPrimairChange={setSmaak}
					onSecundairChange={() => {}}
					onTertiairChange={() => {}}
					lang={lang}
				/>
			</div>
			<VerdictRow
				label={t.zoetheidLabel}
				options={getZoetheidOpties(lang).map((o) => [o.waarde, o.label])}
				value={zoetheid}
				onChange={(v) => setZoetheid(v as Zoetheid | undefined)}
			/>
			<VerdictRow
				label={t.zuurLabel}
				options={getDrieSchaalOpties(lang).map((o) => [o.waarde, o.label])}
				value={zuur}
				onChange={(v) => setZuur(v as SchaalVijf | undefined)}
			/>
			{(wijnType === "rood" || wijnType === "versterkt") && (
				<VerdictRow
					label={t.tannineLabel}
					options={getDrieSchaalOpties(lang).map((o) => [o.waarde, o.label])}
					value={tannine}
					onChange={(v) => setTannine(v as SchaalVijf | undefined)}
				/>
			)}
			<VerdictRow
				label={t.alcoholLabel}
				options={getDrieSchaalOpties(lang).map((o) => [o.waarde, o.label])}
				value={alcohol}
				onChange={(v) => setAlcohol(v as SchaalVijf | undefined)}
			/>
			<VerdictRow
				label={t.bodyLabel}
				options={getBodyOpties(lang).map((o) => [o.waarde, o.label])}
				value={body}
				onChange={(v) => setBody(v as Body | undefined)}
			/>
			<VerdictRow
				label={t.afdronkLabel}
				options={getAfdronkOpties(lang).map((o) => [o.waarde, o.label])}
				value={afdronk}
				onChange={(v) => setAfdronk(v as AfdronkLengte | undefined)}
			/>

			{/* 4 · Proefnotitie — korte notitie in eigen woorden */}
			<StageHeader>{t.stageProefnotitie}</StageHeader>
			<textarea
				value={notitie}
				onChange={(e) => setNotitie(e.target.value)}
				placeholder={t.notitiePlaceholder}
				aria-label={t.notitieLabel}
				rows={2}
				style={{
					width: "100%",
					padding: "0.75rem 0.9rem",
					fontFamily: "var(--font-body)",
					fontSize: "0.95rem",
					border: "4px solid var(--color-border)",
					background: "var(--color-white)",
					color: "var(--color-on-surface)",
					outline: "none",
					boxSizing: "border-box",
					resize: "vertical",
					marginBottom: "2rem",
				}}
			/>

			{/* 5 · Conclusie — eenvoudige gut-check + optioneel cijfer */}
			<StageHeader>{t.stageConclusie}</StageHeader>
			<VerdictRow
				label={t.lekkerLabel}
				options={t.lekkerOpties}
				value={lekker}
				onChange={(v) => setLekker(v as TastingNote["lekker"])}
			/>
			<VerdictRow
				label={t.kopenLabel}
				options={t.kopenOpties}
				value={zouKopen}
				onChange={(v) => setZouKopen(v as TastingNote["zouKopen"])}
			/>
			<span style={sectionLabel}>{t.scoreLabel}</span>
			<div
				style={{
					display: "grid",
					gridTemplateColumns: "repeat(5, 1fr)",
					gap: "4px",
					marginBottom: "1rem",
				}}
			>
				{score10.map((n) => {
					const sel = score === n;
					return (
						<button
							key={n}
							type="button"
							onClick={() => setScore(sel ? undefined : n)}
							aria-pressed={sel}
							style={{
								minHeight: 56,
								fontFamily: "var(--font-headline)",
								fontWeight: 900,
								fontSize: "1.25rem",
								cursor: "pointer",
								background: sel ? "var(--color-primary)" : "var(--color-white)",
								color: sel ? "#fff" : "var(--color-on-surface)",
								border: `4px solid ${sel ? "var(--color-primary)" : "var(--color-border)"}`,
								boxShadow: sel ? "4px 4px 0 var(--color-on-surface)" : "none",
							}}
						>
							{n}
						</button>
					);
				})}
			</div>

			{/* Vaste actiebalk onderaan */}
			<div
				style={{
					position: "fixed",
					left: 0,
					right: 0,
					bottom: 0,
					display: "flex",
					gap: "2px",
					padding: "0.75rem var(--gap)",
					background: "var(--color-background)",
					borderTop: "4px solid var(--color-border)",
					zIndex: 20,
				}}
			>
				<div
					style={{
						display: "flex",
						gap: "2px",
						width: "100%",
						maxWidth: "640px",
						margin: "0 auto",
					}}
				>
					<button
						type="button"
						onClick={handleVorige}
						disabled={busy || index <= 1}
						aria-label={t.vorige}
						style={{
							...actionBtn,
							background: "var(--color-white)",
							color: "var(--color-on-surface)",
							flex: "0 0 auto",
							minWidth: 54,
							opacity: index <= 1 ? 0.35 : 1,
						}}
					>
						<ArrowLeft size={18} />
					</button>
					<button
						type="button"
						onClick={handleKlaar}
						disabled={busy}
						style={{
							...actionBtn,
							background: "var(--color-white)",
							color: "var(--color-on-surface)",
							flex: "0 0 auto",
							minWidth: 96,
						}}
					>
						<Check size={16} /> {t.klaar}
					</button>
					<button
						type="button"
						onClick={handleVolgende}
						disabled={busy}
						style={{
							...actionBtn,
							background: "var(--color-primary)",
							color: "#fff",
							flex: 1,
							opacity: busy ? 0.6 : 1,
						}}
					>
						{t.volgende} <ArrowRight size={16} />
					</button>
				</div>
			</div>
		</div>
	);
}

function StageHeader({ children }: { children: string }) {
	return (
		<div
			style={{
				borderTop: "4px solid var(--color-border)",
				paddingTop: "1rem",
				marginBottom: "1rem",
			}}
		>
			<span
				style={{
					display: "block",
					fontFamily: "var(--font-headline)",
					fontWeight: 900,
					fontSize: "1.05rem",
					letterSpacing: "0.02em",
					textTransform: "uppercase",
					color: "var(--color-primary)",
				}}
			>
				{children}
			</span>
		</div>
	);
}

function VerdictRow({
	label,
	options,
	value,
	onChange,
}: {
	label: string;
	options: string[][];
	value?: string;
	onChange: (v: string | undefined) => void;
}) {
	return (
		<div style={{ marginBottom: "1.5rem" }}>
			<span style={sectionLabel}>{label}</span>
			<div
				style={{
					display: "grid",
					gridTemplateColumns: `repeat(${options.length}, 1fr)`,
					gap: "4px",
				}}
			>
				{options.map(([val, lbl]) => {
					const sel = value === val;
					return (
						<button
							key={val}
							type="button"
							onClick={() => onChange(sel ? undefined : val)}
							aria-pressed={sel}
							style={{
								minHeight: 52,
								fontFamily: "var(--font-body)",
								fontWeight: 700,
								fontSize: "0.9rem",
								letterSpacing: "0.04em",
								cursor: "pointer",
								background: sel ? "var(--color-primary)" : "var(--color-white)",
								color: sel ? "#fff" : "var(--color-on-surface)",
								border: `4px solid ${sel ? "var(--color-primary)" : "var(--color-border)"}`,
								boxShadow: sel ? "4px 4px 0 var(--color-on-surface)" : "none",
							}}
						>
							{lbl}
						</button>
					);
				})}
			</div>
		</div>
	);
}

const sectionLabel = {
	display: "block",
	fontFamily: "var(--font-body)",
	fontWeight: 700,
	fontSize: "0.68rem",
	letterSpacing: "0.12em",
	textTransform: "uppercase" as const,
	color: "var(--color-on-surface)",
	marginBottom: "0.5rem",
};

const actionBtn = {
	display: "inline-flex",
	alignItems: "center",
	justifyContent: "center",
	gap: "0.4rem",
	minHeight: 54,
	fontFamily: "var(--font-body)",
	fontWeight: 700,
	fontSize: "0.85rem",
	letterSpacing: "0.1em",
	textTransform: "uppercase" as const,
	border: "4px solid var(--color-border)",
	cursor: "pointer",
};

const linkBtn = {
	display: "inline-flex",
	alignItems: "center",
	gap: "0.3rem",
	background: "none",
	border: "none",
	cursor: "pointer",
	fontFamily: "var(--font-body)",
	fontSize: "0.78rem",
	fontWeight: 700,
	letterSpacing: "0.06em",
	color: "var(--color-primary)",
	padding: 0,
};
