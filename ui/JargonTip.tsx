import { HelpCircle } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import type { Lang } from "../lib/form-labels";
import { getJargon } from "../lib/jargon";

interface JargonTipProps {
	term: string;
	lang?: Lang;
}

export function JargonTip({ term, lang = "nl" }: JargonTipProps) {
	const [open, setOpen] = useState(false);
	const ref = useRef<HTMLSpanElement>(null);
	const text = getJargon(term, lang);

	useEffect(() => {
		if (!open) return;
		const handler = (e: MouseEvent) => {
			if (ref.current && !ref.current.contains(e.target as Node)) {
				setOpen(false);
			}
		};
		document.addEventListener("mousedown", handler);
		return () => document.removeEventListener("mousedown", handler);
	}, [open]);

	if (!text) return null;

	return (
		<span
			ref={ref}
			style={{
				position: "relative",
				display: "inline-flex",
				alignItems: "center",
				marginLeft: "0.25rem",
			}}
		>
			<button
				type="button"
				onClick={(e) => {
					e.preventDefault();
					setOpen(!open);
				}}
				aria-label={lang === "en" ? `Explain ${term}` : `Uitleg ${term}`}
				aria-expanded={open}
				style={{
					background: "none",
					border: "none",
					padding: "0.625rem",
					margin: "-0.625rem",
					minWidth: 44,
					minHeight: 44,
					cursor: "pointer",
					display: "inline-flex",
					alignItems: "center",
					justifyContent: "center",
					color: "var(--color-primary)",
					opacity: 0.85,
					outlineOffset: 2,
				}}
				onFocus={(e) => {
					e.currentTarget.style.outline = "3px solid var(--color-primary)";
				}}
				onBlur={(e) => {
					e.currentTarget.style.outline = "none";
				}}
			>
				<HelpCircle size={14} />
			</button>
			{open && (
				<span
					role="tooltip"
					style={{
						position: "absolute",
						top: "calc(100% + 0.4rem)",
						left: 0,
						zIndex: 50,
						width: "min(280px, 80vw)",
						padding: "0.6rem 0.75rem",
						background: "var(--color-white)",
						border: "4px solid var(--color-on-surface)",
						boxShadow: "4px 4px 0 var(--color-on-surface)",
						fontFamily: "var(--font-body)",
						fontSize: "0.78rem",
						fontWeight: 400,
						lineHeight: 1.4,
						color: "var(--color-on-surface)",
						textTransform: "none",
						letterSpacing: "normal",
						whiteSpace: "normal",
					}}
				>
					{text}
				</span>
			)}
		</span>
	);
}
