import { toast } from "sonner";
import type { Lang } from "../lib/form-labels";
import { LEVEL_LABELS, type Level, useLevel } from "../lib/level";

interface LevelSelectorProps {
	lang?: Lang;
	compact?: boolean;
}

export function LevelSelector({ lang = "nl", compact = false }: LevelSelectorProps) {
	const [level, setLevel] = useLevel();
	const L = LEVEL_LABELS[lang];
	const opties: Level[] = ["beginner", "gevorderd", "expert"];

	const hint =
		level === "beginner"
			? L.beginnerHint
			: level === "gevorderd"
				? L.gevorderdHint
				: L.expertHint;

	return (
		<div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
			<div
				style={{
					display: "flex",
					gap: "2px",
					border: "4px solid var(--color-border)",
					padding: 0,
				}}
			>
				{opties.map((opt) => {
					const sel = opt === level;
					return (
						<button
							key={opt}
							type="button"
							onClick={() => {
								if (opt === level) return;
								setLevel(opt);
								toast.success(
									lang === "en"
										? `Level: ${L[opt]}`
										: `Niveau: ${L[opt]}`,
								);
							}}
							aria-pressed={sel}
							style={{
								flex: 1,
								minHeight: 44,
								padding: compact ? "0.6rem 0.5rem" : "0.75rem 0.75rem",
								fontFamily: "var(--font-body)",
								fontSize: compact ? "0.72rem" : "0.8rem",
								fontWeight: 700,
								letterSpacing: "0.08em",
								textTransform: "uppercase",
								background: sel ? "var(--color-primary)" : "var(--color-white)",
								color: sel ? "#fff" : "var(--color-on-surface)",
								border: "none",
								cursor: "pointer",
								outlineOffset: "-4px",
							}}
							onFocus={(e) => {
								e.currentTarget.style.outline =
									"3px solid var(--color-primary)";
							}}
							onBlur={(e) => {
								e.currentTarget.style.outline = "none";
							}}
						>
							{L[opt]}
						</button>
					);
				})}
			</div>
			{!compact && (
				<p
					style={{
						fontFamily: "var(--font-body)",
						fontSize: "0.78rem",
						color: "var(--color-gray)",
						margin: 0,
					}}
				>
					{hint}
				</p>
			)}
		</div>
	);
}
