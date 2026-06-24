import { ArrowLeft, Copy, Download, Share2, Star } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { exportSession, getSession } from "../lib/storage";
import { navigate } from "../router";
import { BackButton } from "../ui/BackButton";
import type { TastingNote, TastingSession } from "../types";

interface SessionRecapProps {
	id: string;
	lang?: "nl" | "en";
}

const T = {
	nl: {
		terug: "Sessie",
		eyebrow: "Overzicht",
		shortlist: "Zou ik kopen",
		ranking: "Ranglijst",
		geenData: "Nog niks geproefd in deze sessie.",
		nietGevonden: "Sessie niet gevonden",
		kopieer: "Kopieer samenvatting",
		gekopieerd: "Gekopieerd",
		deel: "Deel",
		backup: "Backup (bestand)",
		geenScore: "—",
		lekkerJa: "Lekker",
		lekkerGaatwel: "Gaat wel",
		lekkerNee: "Niet lekker",
		kopenJa: "Ja",
		kopenMisschien: "Misschien",
		kopenNee: "Nee",
		wijn: "Wijn",
		niksKopen: "Niks aangevinkt als koop-waardig.",
		samenvattingTitel: "Proefnotities",
	},
	en: {
		terug: "Session",
		eyebrow: "Overview",
		shortlist: "Would buy",
		ranking: "Ranking",
		geenData: "Nothing tasted in this session yet.",
		nietGevonden: "Session not found",
		kopieer: "Copy summary",
		gekopieerd: "Copied",
		deel: "Share",
		backup: "Backup (file)",
		geenScore: "—",
		lekkerJa: "Liked",
		lekkerGaatwel: "So-so",
		lekkerNee: "Not for me",
		kopenJa: "Yes",
		kopenMisschien: "Maybe",
		kopenNee: "No",
		wijn: "Wine",
		niksKopen: "Nothing marked as worth buying.",
		samenvattingTitel: "Tasting notes",
	},
};

function flesNaam(note: TastingNote, fallback: string): string {
	const td = note.tastingData as unknown as Record<string, unknown>;
	return (
		(td?.wijnNaam as string) ||
		(td?.cuveeNaam as string) ||
		(td?.naam as string) ||
		fallback
	);
}

// Hoog = beter: zou-kopen weegt zwaarst, dan score, dan lekker.
const KOPEN_RANK: Record<string, number> = { ja: 2, misschien: 1, nee: 0 };
const LEKKER_RANK: Record<string, number> = { ja: 2, gaatwel: 1, nee: 0 };
function rankValue(note: TastingNote): number {
	const kopen = KOPEN_RANK[note.zouKopen ?? ""] ?? -1;
	const lekker = LEKKER_RANK[note.lekker ?? ""] ?? -1;
	const score = note.score ?? -1;
	return kopen * 1000 + score * 10 + lekker;
}

export function SessionRecap({ id, lang = "nl" }: SessionRecapProps) {
	const t = T[lang];
	const [sessie, setSessie] = useState<TastingSession | null>(null);
	const [found, setFound] = useState(true);
	const [copied, setCopied] = useState(false);

	useEffect(() => {
		const s = getSession(id);
		if (!s) {
			setFound(false);
			return;
		}
		setSessie(s);
	}, [id]);

	if (!found) {
		return (
			<div style={wrap}>
				<p style={{ fontSize: "1.1rem" }}>{t.nietGevonden}</p>
				<BackButton
					onClick={() => navigate("/")}
					style={{ color: "var(--color-primary)", marginBottom: "1rem" }}
				>
					← Dashboard
				</BackButton>
			</div>
		);
	}

	if (!sessie) return <div style={wrap}>…</div>;

	const flessen = [...sessie.flessen];
	const ranked = flessen
		.map((f, i) => ({ f, naam: flesNaam(f, `${t.wijn} ${i + 1}`) }))
		.sort((a, b) => rankValue(b.f) - rankValue(a.f));
	const buyList = ranked.filter((r) => r.f.zouKopen === "ja");

	const lekkerLabel = (v?: string) =>
		v === "ja"
			? t.lekkerJa
			: v === "gaatwel"
				? t.lekkerGaatwel
				: v === "nee"
					? t.lekkerNee
					: "";
	const kopenLabel = (v?: string) =>
		v === "ja"
			? t.kopenJa
			: v === "misschien"
				? t.kopenMisschien
				: v === "nee"
					? t.kopenNee
					: "";

	function buildSummary(): string {
		const lines: string[] = [];
		lines.push(`${t.samenvattingTitel} — ${sessie?.naam ?? ""}`.trim());
		lines.push("");
		if (buyList.length > 0) {
			lines.push(`★ ${t.shortlist}:`);
			for (const r of buyList) lines.push(`- ${r.naam}`);
			lines.push("");
		}
		lines.push(`${t.ranking}:`);
		ranked.forEach((r, i) => {
			const bits: string[] = [];
			if (r.f.score !== undefined) bits.push(`${r.f.score}/10`);
			if (r.f.zouKopen) bits.push(kopenLabel(r.f.zouKopen));
			else if (r.f.lekker) bits.push(lekkerLabel(r.f.lekker));
			lines.push(
				`${i + 1}. ${r.naam}${bits.length ? ` — ${bits.join(", ")}` : ""}`,
			);
		});
		lines.push("");
		lines.push("vinovonk.com/proeven/app");
		return lines.join("\n");
	}

	async function kopieer() {
		try {
			await navigator.clipboard.writeText(buildSummary());
			setCopied(true);
			setTimeout(() => setCopied(false), 2000);
			toast.success(t.gekopieerd);
		} catch {
			toast.error("Clipboard");
		}
	}

	async function deel() {
		const text = buildSummary();
		if (navigator.share) {
			try {
				await navigator.share({ title: sessie?.naam, text });
			} catch {
				/* geannuleerd */
			}
		} else {
			kopieer();
		}
	}

	function backup() {
		const json = exportSession(id);
		if (!json) return;
		const blob = new Blob([json], { type: "application/json" });
		const url = URL.createObjectURL(blob);
		const a = document.createElement("a");
		const slug = (sessie?.naam ?? "sessie")
			.toLowerCase()
			.replace(/[^a-z0-9]+/g, "-")
			.replace(/^-|-$/g, "");
		a.href = url;
		a.download = `vinovonk-${slug || "sessie"}.json`;
		a.click();
		URL.revokeObjectURL(url);
	}

	const hasData = flessen.length > 0;

	return (
		<div style={wrap}>
			<BackButton
				onClick={() => navigate(`/sessie/${id}`)}
				style={{ color: "var(--color-primary)", marginBottom: "1rem" }}
			>
				<ArrowLeft size={14} /> {t.terug}
			</BackButton>

			<span style={eyebrowStyle}>{t.eyebrow}</span>
			<h1
				style={{ fontSize: "clamp(1.8rem, 5vw, 2.4rem)", margin: "0 0 1.5rem" }}
			>
				{sessie.naam}
			</h1>

			{!hasData ? (
				<p style={{ color: "var(--color-gray)" }}>{t.geenData}</p>
			) : (
				<>
					{/* Koop-shortlist */}
					<div
						style={{
							border: "4px solid var(--color-primary)",
							boxShadow: "4px 4px 0 #000",
							padding: "1.25rem 1.5rem",
							marginBottom: "1.5rem",
							background: "var(--color-white)",
						}}
					>
						<span
							style={{
								...sectionLabel,
								color: "var(--color-primary)",
								display: "inline-flex",
								alignItems: "center",
								gap: "0.4rem",
							}}
						>
							<Star size={14} /> {t.shortlist}
						</span>
						{buyList.length === 0 ? (
							<p
								style={{
									margin: "0.5rem 0 0",
									color: "var(--color-gray)",
									fontSize: "0.9rem",
								}}
							>
								{t.niksKopen}
							</p>
						) : (
							<ul style={{ margin: "0.5rem 0 0", paddingLeft: "1.1rem" }}>
								{buyList.map((r) => (
									<li
										key={r.f.id}
										style={{
											fontFamily: "var(--font-headline)",
											fontWeight: 700,
											fontSize: "1.05rem",
											marginBottom: "0.2rem",
										}}
									>
										{r.naam}
									</li>
								))}
							</ul>
						)}
					</div>

					{/* Ranglijst */}
					<span style={sectionLabel}>{t.ranking}</span>
					<div
						style={{
							display: "flex",
							flexDirection: "column",
							gap: "2px",
							marginTop: "0.5rem",
							marginBottom: "1.5rem",
						}}
					>
						{ranked.map((r, i) => (
							<button
								key={r.f.id}
								type="button"
								onClick={() => navigate(`/sessie/${id}/fles/${r.f.id}`)}
								style={{
									display: "flex",
									alignItems: "center",
									gap: "0.75rem",
									border: "4px solid var(--color-border)",
									background: "var(--color-white)",
									padding: "0.75rem 1rem",
									cursor: "pointer",
									textAlign: "left",
									color: "var(--color-on-surface)",
								}}
							>
								<span
									style={{
										fontFamily: "var(--font-headline)",
										fontWeight: 900,
										fontSize: "1rem",
										color: "var(--color-gray)",
										minWidth: "1.5rem",
									}}
								>
									{i + 1}
								</span>
								<span
									style={{
										flex: 1,
										fontFamily: "var(--font-body)",
										fontWeight: 700,
										fontSize: "0.95rem",
									}}
								>
									{r.naam}
								</span>
								{r.f.score !== undefined && (
									<span
										style={{
											fontFamily: "var(--font-headline)",
											fontWeight: 900,
											fontSize: "1.1rem",
											color: "var(--color-primary)",
										}}
									>
										{r.f.score}
									</span>
								)}
								{r.f.zouKopen && (
									<span
										style={{
											fontFamily: "var(--font-body)",
											fontSize: "0.68rem",
											fontWeight: 700,
											letterSpacing: "0.06em",
											textTransform: "uppercase",
											padding: "0.2rem 0.5rem",
											border: "2px solid var(--color-border)",
											background:
												r.f.zouKopen === "ja"
													? "var(--color-primary)"
													: "transparent",
											color:
												r.f.zouKopen === "ja" ? "#fff" : "var(--color-gray)",
											whiteSpace: "nowrap",
										}}
									>
										{kopenLabel(r.f.zouKopen)}
									</span>
								)}
							</button>
						))}
					</div>

					{/* Acties */}
					<div
						style={{
							display: "flex",
							gap: "0.5rem",
							flexWrap: "wrap",
						}}
					>
						<button type="button" onClick={kopieer} style={actionBtn}>
							<Copy size={15} /> {copied ? t.gekopieerd : t.kopieer}
						</button>
						<button type="button" onClick={deel} style={actionBtn}>
							<Share2 size={15} /> {t.deel}
						</button>
						<button type="button" onClick={backup} style={actionBtn}>
							<Download size={15} /> {t.backup}
						</button>
					</div>
				</>
			)}
		</div>
	);
}

const wrap = {
	maxWidth: "640px",
	margin: "0 auto",
	padding: "1.5rem var(--gap) 4rem",
	fontFamily: "var(--font-body)",
};

const eyebrowStyle = {
	display: "block",
	fontFamily: "var(--font-body)",
	fontWeight: 700,
	fontSize: "0.68rem",
	letterSpacing: "0.18em",
	textTransform: "uppercase" as const,
	color: "var(--color-primary)",
	marginBottom: "0.35rem",
};

const sectionLabel = {
	display: "block",
	fontFamily: "var(--font-body)",
	fontWeight: 700,
	fontSize: "0.68rem",
	letterSpacing: "0.12em",
	textTransform: "uppercase" as const,
	color: "var(--color-on-surface)",
};

const actionBtn = {
	display: "inline-flex",
	alignItems: "center",
	gap: "0.4rem",
	minHeight: 48,
	padding: "0.5rem 1rem",
	fontFamily: "var(--font-body)",
	fontWeight: 700,
	fontSize: "0.78rem",
	letterSpacing: "0.06em",
	textTransform: "uppercase" as const,
	background: "var(--color-white)",
	color: "var(--color-on-surface)",
	border: "4px solid var(--color-border)",
	cursor: "pointer",
};

