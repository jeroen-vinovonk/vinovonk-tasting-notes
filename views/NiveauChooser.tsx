import type { Lang } from "../lib/form-labels";
import type { Level } from "../lib/level";
import { Button } from "../ui/Button";

interface Props {
	lang?: Lang;
	value: Level;
	onChange: (level: Level) => void;
	onContinue: () => void;
	onBack: () => void;
}

const COPY = {
	nl: {
		heading: "Hoe wil je deze fles proeven?",
		sub: "Kies een methode. Wisselen kan altijd.",
		recommended: "Aanbevolen",
		back: "← Terug",
		next: "Volgende →",
		levels: {
			beginner: {
				title: "Beginner",
				desc: "4 stappen door de systematische proefmethode. Korte uitleg bij vaktermen.",
				meta: "~3 min · je eerste keer proeven",
			},
			gevorderd: {
				title: "Gevorderd",
				desc: "Alle velden tegelijk. Vier tabs, geen uitleg-icoontjes.",
				meta: "~6 min · je weet wat tannine is",
			},
			expert: {
				title: "Expert",
				desc: "Volledige systematische proefmethode plus drinkrijpheid en kwaliteitsoordeel.",
				meta: "~10 min · vakproever, sommelier",
			},
		},
	},
	en: {
		heading: "How do you want to taste this bottle?",
		sub: "Pick a method. You can switch later.",
		recommended: "Recommended",
		back: "← Back",
		next: "Next →",
		levels: {
			beginner: {
				title: "Beginner",
				desc: "Four steps through the systematic tasting method. Plain language with hints on jargon.",
				meta: "~3 min · your first tastings",
			},
			gevorderd: {
				title: "Advanced",
				desc: "All fields visible. Four tabs, no hint icons.",
				meta: "~6 min · you already know tannin",
			},
			expert: {
				title: "Expert",
				desc: "Full systematic tasting method plus readiness and quality verdict.",
				meta: "~10 min · trade taster, sommelier",
			},
		},
	},
};

const LEVELS: Level[] = ["beginner", "gevorderd", "expert"];

export function NiveauChooser({
	lang = "nl",
	value,
	onChange,
	onContinue,
	onBack,
}: Props) {
	const c = COPY[lang];

	return (
		<div
			style={{
				maxWidth: "800px",
				margin: "0 auto",
				padding: "2rem var(--gap)",
			}}
		>
			<button
				onClick={onBack}
				style={{
					background: "none",
					border: "none",
					padding: "0.5rem 0",
					marginBottom: "1.5rem",
					fontFamily: "var(--font-body)",
					fontWeight: 700,
					fontSize: "0.78rem",
					letterSpacing: "0.1em",
					textTransform: "uppercase",
					color: "inherit",
					cursor: "pointer",
				}}
			>
				{c.back}
			</button>

			<h1
				style={{
					fontFamily: "var(--font-headline)",
					fontWeight: 900,
					textTransform: "uppercase",
					fontSize: "1.6rem",
					margin: "0 0 0.5rem",
					letterSpacing: "0.02em",
				}}
			>
				{c.heading}
			</h1>
			<p
				style={{
					color: "var(--color-gray)",
					margin: "0 0 1.75rem",
					fontSize: "0.95rem",
				}}
			>
				{c.sub}
			</p>

			<div
				style={{
					display: "grid",
					gridTemplateColumns: "repeat(3, 1fr)",
					gap: "0.75rem",
					marginBottom: "1.5rem",
				}}
				className="niveau-chooser-grid"
			>
				{LEVELS.map((lv) => {
					const sel = value === lv;
					const item = c.levels[lv];
					return (
						<button
							key={lv}
							type="button"
							onClick={() => onChange(lv)}
							aria-pressed={sel}
							style={{
								background: sel ? "var(--color-primary)" : "var(--color-white)",
								color: sel ? "#fff" : "inherit",
								border: `3px solid ${sel ? "var(--color-primary)" : "var(--color-border)"}`,
								boxShadow: sel ? "4px 4px 0 var(--color-border)" : "none",
								transform: sel ? "translate(-2px, -2px)" : "none",
								padding: "1.25rem 1rem",
								textAlign: "left",
								fontFamily: "var(--font-body)",
								cursor: "pointer",
								transition: "transform 120ms, box-shadow 120ms",
							}}
						>
							{lv === "beginner" && (
								<span
									style={{
										display: "inline-block",
										fontSize: "0.6rem",
										letterSpacing: "0.12em",
										textTransform: "uppercase",
										fontWeight: 700,
										padding: "0.2rem 0.5rem",
										background: sel ? "#fff" : "var(--color-surface)",
										color: sel ? "var(--color-primary)" : "inherit",
										border: `1.5px solid ${sel ? "#fff" : "var(--color-border)"}`,
										marginBottom: "0.6rem",
									}}
								>
									{c.recommended}
								</span>
							)}
							<div
								style={{
									fontFamily: "var(--font-headline)",
									fontWeight: 900,
									textTransform: "uppercase",
									fontSize: "1.1rem",
									marginBottom: "0.4rem",
									letterSpacing: "0.02em",
								}}
							>
								{item.title}
							</div>
							<p style={{ fontSize: "0.85rem", lineHeight: 1.4, margin: 0 }}>
								{item.desc}
							</p>
							<p
								style={{
									fontSize: "0.72rem",
									opacity: sel ? 0.9 : 0.7,
									marginTop: "0.6rem",
									marginBottom: 0,
									lineHeight: 1.4,
								}}
							>
								{item.meta}
							</p>
						</button>
					);
				})}
			</div>

			<div style={{ display: "flex", gap: "0.5rem" }}>
				<Button
					variant="outline"
					onClick={onBack}
					style={{ flex: 1 }}
				>
					{c.back}
				</Button>
				<Button onClick={onContinue} style={{ flex: 1 }}>
					{c.next}
				</Button>
			</div>

			<style>{`
				@media (max-width: 720px) {
					.niveau-chooser-grid { grid-template-columns: 1fr !important; }
				}
			`}</style>
		</div>
	);
}
