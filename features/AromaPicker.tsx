import { Plus, Search, X } from "lucide-react";
import { useState } from "react";
import {
	type AromaCategorie,
	EN_AROMA_LABELS,
	EN_CATEGORIE_LABELS,
	EN_SUBCATEGORIE_LABELS,
	primaireAromas,
	secundaireAromas,
	tertiaireAromas,
} from "../data/aroma-lexicon";
import type { Lang } from "../lib/form-labels";
import { useTermsLang } from "../lib/terms-lang";

interface AromaPickerProps {
	primair: string[];
	secundair: string[];
	tertiair: string[];
	onPrimairChange: (aromas: string[]) => void;
	onSecundairChange: (aromas: string[]) => void;
	onTertiairChange: (aromas: string[]) => void;
	lang?: Lang;
	mode?: "list" | "tiles";
	// Overschrijft het kop-label in tiles-modus (bv. "Smaakcategorieën" i.p.v. aroma).
	tilesLabel?: string;
}

const TILE_CATEGORIES_NL = [
	"Fruit",
	"Bloem",
	"Kruid",
	"Specerij",
	"Aarde",
	"Hout",
	"Boter",
	"Brood",
	"Anders",
];

const TILE_CATEGORIES_EN: Record<string, string> = {
	Fruit: "Fruit",
	Bloem: "Floral",
	Kruid: "Herb",
	Specerij: "Spice",
	Aarde: "Earth",
	Hout: "Oak",
	Boter: "Butter",
	Brood: "Bread",
	Anders: "Other",
};

const SECTION_LABEL = {
	primair: "Primary",
	secundair: "Secondary",
	tertiair: "Tertiary",
};

const BADGE_COLORS = {
	primair: {
		bg: "var(--color-primary)",
		color: "#fff",
		border: "var(--color-primary)",
	},
	secundair: {
		bg: "var(--color-surface-high)",
		color: "var(--color-on-surface)",
		border: "var(--color-border)",
	},
	tertiair: {
		bg: "transparent",
		color: "var(--color-on-surface)",
		border: "var(--color-border)",
	},
};

export function AromaPicker({
	primair,
	secundair,
	tertiair,
	onPrimairChange,
	onSecundairChange,
	onTertiairChange,
	lang = "nl",
	mode = "list",
	tilesLabel,
}: AromaPickerProps) {
	const [zoekterm, setZoekterm] = useState("");
	const [customAroma, setCustomAroma] = useState("");
	const isEN = lang === "en";
	const [termsLang] = useTermsLang(lang);
	const isENterms = termsLang === "en";

	const alle = [...primair, ...secundair, ...tertiair];

	if (mode === "tiles") {
		const toggleTile = (cat: string) => {
			const key = cat.toLowerCase();
			if (primair.includes(key)) {
				onPrimairChange(primair.filter((p) => p !== key));
			} else {
				onPrimairChange([...primair, key]);
			}
		};
		return (
			<div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
				<span
					style={{
						fontFamily: "var(--font-body)",
						fontWeight: 700,
						fontSize: "0.68rem",
						letterSpacing: "0.12em",
						textTransform: "uppercase",
						color: "var(--color-on-surface)",
					}}
				>
					{tilesLabel ?? (isEN ? "Aroma categories" : "Aromacategorieën")}
				</span>
				<p
					style={{
						fontFamily: "var(--font-body)",
						fontSize: "0.78rem",
						color: "var(--color-gray)",
						margin: 0,
					}}
				>
					{isEN
						? "Pick one or more categories. You can refine later by switching to a higher level."
						: "Kies één of meer categorieën. Later kun je verfijnen door naar een hoger niveau te schakelen."}
				</p>
				<div
					style={{
						display: "grid",
						gridTemplateColumns: "repeat(auto-fill, minmax(120px, 1fr))",
						gap: "4px",
					}}
				>
					{TILE_CATEGORIES_NL.map((cat) => {
						const key = cat.toLowerCase();
						const sel = primair.includes(key);
						const label = isENterms ? TILE_CATEGORIES_EN[cat] : cat;
						return (
							<button
								key={cat}
								type="button"
								onClick={() => toggleTile(cat)}
								aria-pressed={sel}
								style={{
									minHeight: 60,
									padding: "0.75rem",
									fontFamily: "var(--font-body)",
									fontSize: "0.85rem",
									fontWeight: 700,
									letterSpacing: "0.08em",
									textTransform: "uppercase",
									cursor: "pointer",
									background: sel
										? "var(--color-primary)"
										: "var(--color-white)",
									color: sel ? "#fff" : "var(--color-on-surface)",
									border: `4px solid ${sel ? "var(--color-primary)" : "var(--color-border)"}`,
									boxShadow: sel ? "4px 4px 0 var(--color-on-surface)" : "none",
								}}
							>
								{label}
							</button>
						);
					})}
				</div>
			</div>
		);
	}

	const labelStyle = {
		fontFamily: "var(--font-body)",
		fontWeight: 700,
		fontSize: "0.68rem",
		letterSpacing: "0.12em",
		textTransform: "uppercase" as const,
		color: "var(--color-on-surface)",
	};

	return (
		<div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
			<span style={labelStyle}>
				{isEN ? "Aroma & flavour characteristics" : "Aromakenmerken"}
			</span>

			{/* Geselecteerde aroma's */}
			{alle.length > 0 && (
				<div
					style={{
						display: "flex",
						flexWrap: "wrap",
						gap: "4px",
						maxHeight: "120px",
						overflowY: "auto",
						padding: "0.5rem",
						border: "2px solid var(--color-border)",
						background: "var(--color-surface)",
					}}
				>
					{(["primair", "secundair", "tertiair"] as const).map((type) => {
						const lijst =
							type === "primair"
								? primair
								: type === "secundair"
									? secundair
									: tertiair;
						const onChange =
							type === "primair"
								? onPrimairChange
								: type === "secundair"
									? onSecundairChange
									: onTertiairChange;
						const c = BADGE_COLORS[type];
						return lijst.map((a) => (
							<span
								key={`${type}-${a}`}
								style={{
									display: "inline-flex",
									alignItems: "center",
									gap: "0.25rem",
									padding: "0.2rem 0.4rem",
									fontFamily: "var(--font-body)",
									fontSize: "0.72rem",
									fontWeight: 600,
									background: c.bg,
									color: c.color,
									border: `2px solid ${c.border}`,
								}}
							>
								{isENterms ? (EN_AROMA_LABELS[a] ?? a) : a}
								<button
									type="button"
									onClick={() => onChange(lijst.filter((x) => x !== a))}
									style={{
										background: "none",
										border: "none",
										cursor: "pointer",
										padding: 0,
										display: "flex",
										color: "inherit",
										opacity: 0.7,
									}}
									aria-label={isEN ? `Remove ${a}` : `${a} verwijderen`}
								>
									<X size={11} />
								</button>
							</span>
						));
					})}
				</div>
			)}

			{/* Zoekbalk */}
			<div style={{ position: "relative" }}>
				<Search
					size={14}
					style={{
						position: "absolute",
						left: "0.75rem",
						top: "50%",
						transform: "translateY(-50%)",
						color: "var(--color-gray)",
					}}
				/>
				<input
					placeholder={isEN ? "Search aroma..." : "Zoek aroma..."}
					value={zoekterm}
					onChange={(e) => setZoekterm(e.target.value)}
					style={{
						width: "100%",
						padding: "0.6rem 0.75rem 0.6rem 2.25rem",
						fontFamily: "var(--font-body)",
						fontSize: "0.9rem",
						border: "4px solid var(--color-border)",
						background: "var(--color-white)",
						color: "var(--color-on-surface)",
						outline: "none",
						boxSizing: "border-box",
					}}
				/>
			</div>

			{/* Primary / Secondary / Tertiary */}
			{(["primair", "secundair", "tertiair"] as const).map((type) => {
				const categorieen =
					type === "primair"
						? primaireAromas
						: type === "secundair"
							? secundaireAromas
							: tertiaireAromas;
				const geselecteerd =
					type === "primair"
						? primair
						: type === "secundair"
							? secundair
							: tertiair;
				const onChange =
					type === "primair"
						? onPrimairChange
						: type === "secundair"
							? onSecundairChange
							: onTertiairChange;

				return (
					<div key={type}>
						<p
							style={{
								fontFamily: "var(--font-body)",
								fontWeight: 700,
								fontSize: "0.65rem",
								letterSpacing: "0.15em",
								textTransform: "uppercase",
								color: "var(--color-gray)",
								marginBottom: "0.5rem",
							}}
						>
							{SECTION_LABEL[type]}
						</p>
						<AromaLijst
							categorieen={categorieen}
							geselecteerd={geselecteerd}
							onChange={onChange}
							zoekterm={zoekterm}
							lang={lang}
						/>
					</div>
				);
			})}

			{/* Custom aroma */}
			<div style={{ display: "flex", gap: "4px" }}>
				<input
					placeholder={isEN ? "Add custom aroma..." : "Voeg eigen aroma toe..."}
					value={customAroma}
					onChange={(e) => setCustomAroma(e.target.value)}
					onKeyDown={(e) => {
						if (e.key === "Enter" && customAroma.trim()) {
							e.preventDefault();
							onPrimairChange([...primair, customAroma.trim()]);
							setCustomAroma("");
						}
					}}
					style={{
						flex: 1,
						padding: "0.6rem 0.75rem",
						fontFamily: "var(--font-body)",
						fontSize: "0.9rem",
						border: "4px solid var(--color-border)",
						background: "var(--color-white)",
						color: "var(--color-on-surface)",
						outline: "none",
					}}
				/>
				<button
					type="button"
					onClick={() => {
						if (customAroma.trim()) {
							onPrimairChange([...primair, customAroma.trim()]);
							setCustomAroma("");
						}
					}}
					style={{
						padding: "0.6rem 0.875rem",
						background: "var(--color-primary)",
						color: "#fff",
						border: "4px solid var(--color-border)",
						cursor: "pointer",
						display: "flex",
						alignItems: "center",
					}}
					aria-label={isEN ? "Add aroma" : "Aroma toevoegen"}
				>
					<Plus size={16} />
				</button>
			</div>
		</div>
	);
}

function AromaLijst({
	categorieen,
	geselecteerd,
	onChange,
	zoekterm,
	lang = "nl",
}: {
	categorieen: AromaCategorie[];
	geselecteerd: string[];
	onChange: (aromas: string[]) => void;
	zoekterm: string;
	lang?: Lang;
}) {
	const isEN = lang === "en";
	const [termsLang] = useTermsLang(lang);
	const isENterms = termsLang === "en";
	const toggle = (aroma: string) =>
		geselecteerd.includes(aroma)
			? onChange(geselecteerd.filter((a) => a !== aroma))
			: onChange([...geselecteerd, aroma]);

	const term = zoekterm.toLowerCase();

	const matchesSearch = (a: string) => {
		if (!term) return true;
		if (a.toLowerCase().includes(term)) return true;
		if (isENterms)
			return (EN_AROMA_LABELS[a] ?? "").toLowerCase().includes(term);
		return false;
	};

	const gefilterd = categorieen
		.map((cat) => ({
			...cat,
			subcategorieen: cat.subcategorieen
				.map((sub) => ({
					...sub,
					aromas: sub.aromas.filter(matchesSearch),
				}))
				.filter((sub) => sub.aromas.length > 0),
		}))
		.filter((cat) => cat.subcategorieen.length > 0);

	if (gefilterd.length === 0)
		return (
			<p
				style={{
					fontFamily: "var(--font-body)",
					fontSize: "0.82rem",
					color: "var(--color-gray)",
				}}
			>
				{isEN ? "No aromas found" : "Geen aromas gevonden"}
			</p>
		);

	return (
		<div
			style={{
				border: "4px solid var(--color-border)",
				padding: "0.75rem",
				background: "var(--color-surface)",
				display: "flex",
				flexDirection: "column",
				gap: "0.75rem",
			}}
		>
			{gefilterd.map((cat) => (
				<div key={cat.categorie}>
					<h4
						style={{
							fontFamily: "var(--font-body)",
							fontWeight: 700,
							fontSize: "0.65rem",
							letterSpacing: "0.15em",
							textTransform: "uppercase",
							color: "var(--color-gray)",
							marginBottom: "0.5rem",
						}}
					>
						{isENterms
							? (EN_CATEGORIE_LABELS[cat.categorie] ?? cat.categorie)
							: cat.categorie}
					</h4>
					{cat.subcategorieen.map((sub) => (
						<div key={sub.naam} style={{ marginBottom: "0.5rem" }}>
							<p
								style={{
									fontFamily: "var(--font-body)",
									fontSize: "0.72rem",
									color: "var(--color-gray)",
									marginBottom: "0.375rem",
								}}
							>
								{isENterms
									? (EN_SUBCATEGORIE_LABELS[sub.naam] ?? sub.naam)
									: sub.naam}
							</p>
							<div style={{ display: "flex", flexWrap: "wrap", gap: "2px" }}>
								{sub.aromas.map((aroma) => {
									const sel = geselecteerd.includes(aroma);
									const label = isENterms
										? (EN_AROMA_LABELS[aroma] ?? aroma)
										: aroma;
									return (
										<button
											key={aroma}
											type="button"
											onClick={() => toggle(aroma)}
											style={{
												fontFamily: "var(--font-body)",
												fontSize: "0.72rem",
												fontWeight: 600,
												padding: "0.3rem 0.6rem",
												cursor: "pointer",
												background: sel
													? "var(--color-primary)"
													: "var(--color-white)",
												color: sel ? "#fff" : "var(--color-on-surface)",
												border: `2px solid ${sel ? "var(--color-primary)" : "var(--color-border)"}`,
												transition: "background 100ms, color 100ms",
											}}
										>
											{label}
										</button>
									);
								})}
							</div>
						</div>
					))}
				</div>
			))}
		</div>
	);
}
