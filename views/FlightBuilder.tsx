import { ArrowLeft, Check, Copy, Share2 } from "lucide-react";
import QRCode from "qrcode";
import { useState } from "react";
import { toast } from "sonner";
import {
	buildFlightUrl,
	type FlightPayload,
	parseWineLines,
} from "../lib/flight";
import { createSession, updateSession } from "../lib/storage";
import { navigate } from "../router";
import { Button } from "../ui/Button";

interface FlightBuilderProps {
	lang?: "nl" | "en";
}

const T = {
	nl: {
		eyebrow: "Flight delen",
		title: "Deel je line-up",
		intro:
			"Vul de wijnen vooraf in. Deelnemers scannen de QR of openen de link en hoeven alleen nog te scoren — geen namen typen tijdens het proeven.",
		naamLabel: "Naam van de proeverij",
		naamPlaceholder: "Bijv. Champagne-avond 22 juni",
		wijnenLabel: "Wijnen — één per regel, op volgorde van schenken",
		wijnenPlaceholder:
			"Champagne Monmarthe Le Nid d'Agace 2018\nKünstler Hölle GG Riesling\nRioja Vega Maturana Blanca\n...",
		genereer: "Genereer QR + link",
		scan: "Laat deelnemers dit scannen",
		kopieer: "Kopieer link",
		gekopieerd: "Gekopieerd",
		deel: "Deel link",
		zelf: "Zelf proeven met deze flight",
		terug: "Terug",
		leeg: "Vul een naam en minstens één wijn in.",
		teGroot:
			"Te veel wijnen voor één QR-code — gebruik de deel-link in plaats daarvan.",
		aantal: (n: number) => `${n} ${n === 1 ? "wijn" : "wijnen"}`,
	},
	en: {
		eyebrow: "Share flight",
		title: "Share your line-up",
		intro:
			"Add the wines up front. Guests scan the QR or open the link and only have to score — no typing names while tasting.",
		naamLabel: "Tasting name",
		naamPlaceholder: "E.g. Champagne evening 22 June",
		wijnenLabel: "Wines — one per line, in pouring order",
		wijnenPlaceholder:
			"Champagne Monmarthe Le Nid d'Agace 2018\nKünstler Hölle GG Riesling\nRioja Vega Maturana Blanca\n...",
		genereer: "Generate QR + link",
		scan: "Have guests scan this",
		kopieer: "Copy link",
		gekopieerd: "Copied",
		deel: "Share link",
		zelf: "Taste this flight yourself",
		terug: "Back",
		leeg: "Add a name and at least one wine.",
		teGroot: "Too many wines for one QR code — use the share link instead.",
		aantal: (n: number) => `${n} ${n === 1 ? "wine" : "wines"}`,
	},
};

export function FlightBuilder({ lang = "nl" }: FlightBuilderProps) {
	const t = T[lang];
	const [naam, setNaam] = useState("");
	const [wijnenText, setWijnenText] = useState("");
	const [url, setUrl] = useState<string | null>(null);
	const [qr, setQr] = useState<string | null>(null);
	const [wineCount, setWineCount] = useState(0);
	const [copied, setCopied] = useState(false);

	async function genereer() {
		const wines = parseWineLines(wijnenText);
		if (!naam.trim() || wines.length === 0) {
			toast.error(t.leeg);
			return;
		}
		const payload: FlightPayload = { n: naam.trim(), w: wines };
		const shareUrl = buildFlightUrl(payload, lang, window.location.origin);
		setUrl(shareUrl);
		setWineCount(wines.length);
		setCopied(false);
		try {
			const dataUrl = await QRCode.toDataURL(shareUrl, {
				margin: 1,
				width: 320,
				color: { dark: "#1a1a1a", light: "#ffffff" },
			});
			setQr(dataUrl);
		} catch {
			setQr(null);
			toast.error(t.teGroot);
		}
	}

	async function kopieer() {
		if (!url) return;
		try {
			await navigator.clipboard.writeText(url);
			setCopied(true);
			setTimeout(() => setCopied(false), 2000);
		} catch {
			/* clipboard geweigerd: link staat zichtbaar om handmatig te kopiëren */
		}
	}

	async function deel() {
		if (!url) return;
		if (navigator.share) {
			try {
				await navigator.share({ title: naam.trim(), url });
			} catch {
				/* gebruiker annuleerde deel-dialoog */
			}
		} else {
			kopieer();
		}
	}

	function zelfProeven() {
		const wines = parseWineLines(wijnenText);
		if (!naam.trim() || wines.length === 0) {
			toast.error(t.leeg);
			return;
		}
		const sessie = createSession(naam.trim());
		updateSession(sessie.id, { flightWines: wines });
		navigate(`/sessie/${sessie.id}/live`);
	}

	const inputStyle = {
		width: "100%",
		padding: "0.75rem 0.9rem",
		fontFamily: "var(--font-body)",
		fontSize: "1rem",
		border: "4px solid var(--color-border)",
		background: "var(--color-white)",
		color: "var(--color-on-surface)",
		outline: "none",
		boxSizing: "border-box" as const,
	};
	const labelStyle = {
		display: "block",
		fontFamily: "var(--font-body)",
		fontWeight: 700,
		fontSize: "0.68rem",
		letterSpacing: "0.12em",
		textTransform: "uppercase" as const,
		color: "var(--color-on-surface)",
		marginBottom: "0.5rem",
	};

	return (
		<div
			style={{
				maxWidth: "640px",
				margin: "0 auto",
				padding: "1.5rem var(--gap) 4rem",
				fontFamily: "var(--font-body)",
			}}
		>
			<button
				type="button"
				onClick={() => navigate("/")}
				style={{
					display: "inline-flex",
					alignItems: "center",
					gap: "0.3rem",
					background: "none",
					border: "none",
					cursor: "pointer",
					fontFamily: "var(--font-body)",
					fontSize: "0.78rem",
					fontWeight: 700,
					color: "var(--color-primary)",
					padding: 0,
					marginBottom: "1rem",
				}}
			>
				<ArrowLeft size={14} /> {t.terug}
			</button>

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
			</span>
			<h1
				style={{ fontSize: "clamp(1.8rem, 5vw, 2.4rem)", margin: "0 0 0.5rem" }}
			>
				{t.title}
			</h1>
			<p
				style={{
					fontSize: "0.9rem",
					color: "var(--color-gray)",
					margin: "0 0 1.75rem",
				}}
			>
				{t.intro}
			</p>

			<label style={labelStyle} htmlFor="flight-naam">
				{t.naamLabel}
			</label>
			<input
				id="flight-naam"
				value={naam}
				onChange={(e) => setNaam(e.target.value)}
				placeholder={t.naamPlaceholder}
				style={{ ...inputStyle, marginBottom: "1.5rem" }}
			/>

			<label style={labelStyle} htmlFor="flight-wijnen">
				{t.wijnenLabel}
			</label>
			<textarea
				id="flight-wijnen"
				value={wijnenText}
				onChange={(e) => setWijnenText(e.target.value)}
				placeholder={t.wijnenPlaceholder}
				rows={7}
				style={{
					...inputStyle,
					resize: "vertical",
					marginBottom: "1.5rem",
					lineHeight: 1.5,
				}}
			/>

			<Button
				onClick={genereer}
				variant="primary"
				size="lg"
				style={{ width: "100%", justifyContent: "center" }}
			>
				{t.genereer}
			</Button>

			{url && (
				<div
					style={{
						marginTop: "2rem",
						border: "4px solid var(--color-border)",
						boxShadow: "4px 4px 0px 0px #000",
						padding: "1.5rem",
						background: "var(--color-white)",
						textAlign: "center",
					}}
				>
					<span style={{ ...labelStyle, marginBottom: "1rem" }}>
						{t.scan} · {t.aantal(wineCount)}
					</span>
					{qr && (
						<img
							src={qr}
							alt="QR"
							width={280}
							height={280}
							style={{
								width: "100%",
								maxWidth: 280,
								height: "auto",
								margin: "0 auto 1.25rem",
								display: "block",
								border: "4px solid var(--color-border)",
							}}
						/>
					)}
					<div
						style={{
							fontFamily: "var(--font-mono, monospace)",
							fontSize: "0.72rem",
							color: "var(--color-gray)",
							wordBreak: "break-all",
							marginBottom: "1.25rem",
							padding: "0.5rem",
							background: "var(--color-surface)",
							border: "2px solid var(--color-border)",
						}}
					>
						{url}
					</div>
					<div
						style={{
							display: "flex",
							gap: "0.5rem",
							flexWrap: "wrap",
							justifyContent: "center",
						}}
					>
						<Button onClick={kopieer} variant="outline" size="md">
							{copied ? <Check size={15} /> : <Copy size={15} />}{" "}
							{copied ? t.gekopieerd : t.kopieer}
						</Button>
						<Button onClick={deel} variant="outline" size="md">
							<Share2 size={15} /> {t.deel}
						</Button>
						<Button onClick={zelfProeven} variant="primary" size="md">
							{t.zelf} →
						</Button>
					</div>
				</div>
			)}
		</div>
	);
}
