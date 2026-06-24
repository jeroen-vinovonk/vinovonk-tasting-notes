import type { CSSProperties, ReactNode } from "react";
import { navigate } from "../router";

// Gedeelde "← Terug" knop. WCAG 2.2 AA 2.5.8: target minstens 24px hoog.
// Visuele stijl matcht de oude hand-gerolde back-links; geef extra
// marges of een afwijkende kleur mee via `style`.
const backButtonStyle: CSSProperties = {
	display: "inline-flex",
	alignItems: "center",
	gap: "0.35rem",
	minHeight: "24px",
	background: "none",
	border: "none",
	cursor: "pointer",
	fontFamily: "var(--font-body)",
	fontSize: "0.72rem",
	fontWeight: 700,
	letterSpacing: "0.1em",
	textTransform: "uppercase",
	color: "var(--color-gray)",
	padding: 0,
};

interface BackButtonProps {
	/** Inhoud van de knop: arrow + label of een icoon + label. */
	children: ReactNode;
	/** Eigen click-handler (bv. goBack of navigate naar sessie). */
	onClick?: () => void;
	/** Doel voor de standaard navigate() als geen onClick is gegeven. */
	to?: string;
	/** Extra stijl: marges, of afwijkende kleur. */
	style?: CSSProperties;
}

export function BackButton({ children, onClick, to = "/", style }: BackButtonProps) {
	return (
		<button
			type="button"
			onClick={onClick ?? (() => navigate(to))}
			style={{ ...backButtonStyle, ...style }}
		>
			{children}
		</button>
	);
}
