import { useEffect, useRef, useState } from "react";
import { decodeFlight } from "../lib/flight";
import { createSession, updateSession } from "../lib/storage";
import { navigate } from "../router";

interface FlightImportProps {
	payload: string;
	lang?: "nl" | "en";
}

const T = {
	nl: {
		laden: "Flight laden...",
		fout: "Deze flight-link is ongeldig of beschadigd.",
		terug: "← Naar de app",
	},
	en: {
		laden: "Loading flight...",
		fout: "This flight link is invalid or corrupted.",
		terug: "← To the app",
	},
};

export function FlightImport({ payload, lang = "nl" }: FlightImportProps) {
	const t = T[lang];
	const [error, setError] = useState(false);
	const ranRef = useRef(false);

	useEffect(() => {
		if (ranRef.current) return;
		ranRef.current = true;

		const flight = decodeFlight(payload);
		if (!flight) {
			setError(true);
			return;
		}

		const sessie = createSession(
			flight.n || (lang === "en" ? "Flight" : "Flight"),
		);
		updateSession(sessie.id, { flightWines: flight.w });
		navigate(`/sessie/${sessie.id}/live`);
	}, [payload, lang]);

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
			{error ? (
				<>
					<p style={{ fontSize: "1.1rem", marginBottom: "1rem" }}>{t.fout}</p>
					<button
						type="button"
						onClick={() => navigate("/")}
						style={{
							background: "none",
							border: "none",
							cursor: "pointer",
							fontFamily: "var(--font-body)",
							fontSize: "0.85rem",
							fontWeight: 700,
							color: "var(--color-primary)",
							textDecoration: "underline",
							padding: 0,
						}}
					>
						{t.terug}
					</button>
				</>
			) : (
				<p style={{ fontSize: "1.1rem" }}>{t.laden}</p>
			)}
		</div>
	);
}
