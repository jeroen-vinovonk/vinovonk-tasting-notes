import { ChevronLeft, ChevronRight } from "lucide-react";
import type { ReactNode } from "react";
import type { Lang } from "../lib/form-labels";
import { setLevel } from "../lib/level";
import { Button } from "../ui/Button";

export interface WizardStep {
	id: string;
	titel: string;
	hint: string;
}

export const WIJN_STEPS_NL: WizardStep[] = [
	{
		id: "appearance",
		titel: "Kijk",
		hint: "Houd het glas tegen iets wits en let op kleur en helderheid.",
	},
	{
		id: "nose",
		titel: "Ruik",
		hint: "Eerst zonder zwenken, daarna zwenken en opnieuw ruiken. Verandert er iets?",
	},
	{
		id: "palate",
		titel: "Proef",
		hint: "Neem een slok en laat rondspoelen. Let op zoet, zuur, body en afdronk.",
	},
	{
		id: "conclusions",
		titel: "Oordeel",
		hint: "Wat vond je ervan? Goed gemaakt, in balans, en zou je hem nog eens drinken?",
	},
];

export const CHAMPAGNE_STEPS_NL: WizardStep[] = [
	{
		id: "visueel",
		titel: "Kijk",
		hint: "Kleur is leuk maar de bellen vertellen meer. Hoe fijn en hoe lang houden ze stand?",
	},
	{
		id: "neus",
		titel: "Ruik",
		hint: "Champagne ruikt vaak naar bloesem, citrus en brood. Wat herken jij?",
	},
	{
		id: "mondgevoel",
		titel: "Proef",
		hint: "Voel hoe de mousse landt op je tong. Hoe droog of zoet is hij, en hoe lang blijft hij hangen?",
	},
	{
		id: "conclusie",
		titel: "Oordeel",
		hint: "Hoe goed is hij gemaakt, en zou je hem nog eens openen voor een speciaal moment?",
	},
];

export const CHAMPAGNE_STEPS_EN: WizardStep[] = [
	{
		id: "visueel",
		titel: "Look",
		hint: "Colour matters but the bubbles tell you more. How fine, and how long do they last?",
	},
	{
		id: "neus",
		titel: "Smell",
		hint: "Champagne often smells of blossom, citrus and bread. What can you spot?",
	},
	{
		id: "mondgevoel",
		titel: "Taste",
		hint: "Feel how the mousse lands on your tongue. How dry or sweet is it, and how long does it linger?",
	},
	{
		id: "conclusie",
		titel: "Judge",
		hint: "How well made is it, and would you open another for a special moment?",
	},
];

export const SPIRITS_STEPS_NL: WizardStep[] = [
	{
		id: "appearance",
		titel: "Kijk",
		hint: "Let op kleur en helderheid. Donker hoeft niet rijp te zijn, kleur kan ook uit een vat komen.",
	},
	{
		id: "nose",
		titel: "Ruik",
		hint: "Houd het glas op afstand, alcohol prikt sneller dan bij wijn. Wat ruik je als je dichterbij komt?",
	},
	{
		id: "palate",
		titel: "Proef",
		hint: "Neem een kleine slok. Hoe vol voelt hij, hoe zoet, en hoe lang blijft hij hangen?",
	},
	{
		id: "conclusions",
		titel: "Oordeel",
		hint: "Hoe vond je hem? Goed gebalanceerd, en zou je hem nog eens schenken?",
	},
];

export const SPIRITS_STEPS_EN: WizardStep[] = [
	{
		id: "appearance",
		titel: "Look",
		hint: "Notice colour and clarity. Dark doesn't always mean aged, colour can come from the cask.",
	},
	{
		id: "nose",
		titel: "Smell",
		hint: "Hold the glass at a distance, alcohol stings faster than wine. What do you smell as you bring it closer?",
	},
	{
		id: "palate",
		titel: "Taste",
		hint: "Take a small sip. How full does it feel, how sweet, and how long does it linger?",
	},
	{
		id: "conclusions",
		titel: "Judge",
		hint: "How was it? Balanced, and would you pour another?",
	},
];

export const ALCOHOLVRIJ_STEPS_NL: WizardStep[] = [
	{
		id: "appearance",
		titel: "Kijk",
		hint: "Veel alcoholvrije dranken hebben een andere kleur dan hun alcoholische versie. Wat valt je op?",
	},
	{
		id: "nose",
		titel: "Ruik",
		hint: "Wat ruik je? Alcoholvrije dranken hebben vaak een lichtere, frissere geur.",
	},
	{
		id: "palate",
		titel: "Proef",
		hint: "Voel de zoetheid, het zuur en de body. Mist er iets vergeleken met de echte versie?",
	},
	{
		id: "conclusions",
		titel: "Oordeel",
		hint: "Hoe goed staat deze drank op zichzelf, los van wat hij probeert te vervangen?",
	},
];

export const ALCOHOLVRIJ_STEPS_EN: WizardStep[] = [
	{
		id: "appearance",
		titel: "Look",
		hint: "Many alcohol-free drinks look different from their alcoholic version. What stands out?",
	},
	{
		id: "nose",
		titel: "Smell",
		hint: "What can you smell? Alcohol-free drinks often have a lighter, fresher aroma.",
	},
	{
		id: "palate",
		titel: "Taste",
		hint: "Feel the sweetness, the acidity and the body. Is anything missing compared to the real version?",
	},
	{
		id: "conclusions",
		titel: "Judge",
		hint: "How well does this drink stand on its own, separate from what it's trying to replace?",
	},
];

export const WIJN_STEPS_EN: WizardStep[] = [
	{
		id: "appearance",
		titel: "Look",
		hint: "Hold the glass against something white and notice colour and clarity.",
	},
	{
		id: "nose",
		titel: "Smell",
		hint: "First without swirling, then swirl and smell again. Anything change?",
	},
	{
		id: "palate",
		titel: "Taste",
		hint: "Take a sip and let it coat your mouth. Notice sweetness, acidity, body and finish.",
	},
	{
		id: "conclusions",
		titel: "Judge",
		hint: "What did you think? Well made, balanced, and would you drink it again?",
	},
];

interface BeginnerWizardProps {
	steps: WizardStep[];
	currentStepId: string;
	onStepChange: (stepId: string) => void;
	lang?: Lang;
	children: ReactNode;
}

export function BeginnerWizard({
	steps,
	currentStepId,
	onStepChange,
	lang = "nl",
	children,
}: BeginnerWizardProps) {
	const idx = Math.max(
		0,
		steps.findIndex((s) => s.id === currentStepId),
	);
	const step = steps[idx];
	const isFirst = idx === 0;
	const isLast = idx === steps.length - 1;
	const T = {
		nl: {
			stap: "Stap",
			van: "van",
			vorige: "Vorige",
			volgende: "Volgende",
			toonAlles: "Toon alles tegelijk",
		},
		en: {
			stap: "Step",
			van: "of",
			vorige: "Previous",
			volgende: "Next",
			toonAlles: "Show all at once",
		},
	}[lang];

	return (
		<div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
			{/* Progress + step header */}
			<div
				style={{
					border: "4px solid var(--color-on-surface)",
					boxShadow: "4px 4px 0 var(--color-on-surface)",
					background: "var(--color-white)",
					padding: "1rem",
					display: "flex",
					flexDirection: "column",
					gap: "0.75rem",
				}}
			>
				<div
					style={{
						display: "flex",
						justifyContent: "space-between",
						alignItems: "center",
						gap: "0.5rem",
					}}
				>
					<span
						style={{
							fontFamily: "var(--font-body)",
							fontWeight: 700,
							fontSize: "0.68rem",
							letterSpacing: "0.12em",
							textTransform: "uppercase",
							color: "var(--color-gray)",
						}}
					>
						{T.stap} {idx + 1} {T.van} {steps.length}
					</span>
					<button
						type="button"
						onClick={() => setLevel("gevorderd")}
						style={{
							background: "none",
							border: "none",
							padding: "0.5rem",
							margin: "-0.5rem",
							fontFamily: "var(--font-body)",
							fontSize: "0.72rem",
							fontWeight: 700,
							letterSpacing: "0.08em",
							textTransform: "uppercase",
							color: "var(--color-primary)",
							cursor: "pointer",
							textDecoration: "underline",
						}}
					>
						{T.toonAlles}
					</button>
				</div>

				{/* Progress bar — 4 segments */}
				<div style={{ display: "flex", gap: "2px" }}>
					{steps.map((s, i) => (
						<button
							key={s.id}
							type="button"
							onClick={() => onStepChange(s.id)}
							aria-label={`${T.stap} ${i + 1}: ${s.titel}`}
							aria-current={i === idx ? "step" : undefined}
							style={{
								flex: 1,
								minHeight: 12,
								background:
									i <= idx
										? "var(--color-primary)"
										: "var(--color-surface)",
								border: `2px solid ${i <= idx ? "var(--color-primary)" : "var(--color-border)"}`,
								cursor: "pointer",
								padding: 0,
							}}
						/>
					))}
				</div>

				<h3
					style={{
						fontFamily: "var(--font-headline)",
						fontWeight: 900,
						fontSize: "1.5rem",
						textTransform: "uppercase",
						margin: 0,
						color: "var(--color-on-surface)",
					}}
				>
					{step.titel}
				</h3>
				<p
					style={{
						fontFamily: "var(--font-body)",
						fontSize: "0.85rem",
						lineHeight: 1.5,
						margin: 0,
						color: "var(--color-on-surface)",
					}}
				>
					{step.hint}
				</p>
			</div>

			{/* Form content */}
			{children}

			{/* Navigation */}
			<div
				style={{
					display: "flex",
					gap: "0.5rem",
					justifyContent: "space-between",
				}}
			>
				<Button
					variant="outline"
					onClick={() => !isFirst && onStepChange(steps[idx - 1].id)}
					disabled={isFirst}
					style={{
						display: "inline-flex",
						alignItems: "center",
						gap: "0.375rem",
						minHeight: 44,
					}}
				>
					<ChevronLeft size={16} /> {T.vorige}
				</Button>
				<Button
					onClick={() => !isLast && onStepChange(steps[idx + 1].id)}
					disabled={isLast}
					style={{
						display: "inline-flex",
						alignItems: "center",
						gap: "0.375rem",
						minHeight: 44,
					}}
				>
					{T.volgende} <ChevronRight size={16} />
				</Button>
			</div>
		</div>
	);
}
