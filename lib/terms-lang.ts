import { useEffect, useState } from "react";
import type { Lang } from "./form-labels";

export type TermsLang = "nl" | "en";

const STORAGE_KEY = "vv-terms-lang";

export function getTermsLang(siteLang: Lang = "nl"): TermsLang {
	if (typeof window === "undefined") return siteLang;
	const v = window.localStorage.getItem(STORAGE_KEY);
	if (v === "nl" || v === "en") return v;
	return siteLang;
}

export function setTermsLang(lang: TermsLang): void {
	if (typeof window === "undefined") return;
	window.localStorage.setItem(STORAGE_KEY, lang);
	window.dispatchEvent(new CustomEvent("vv-terms-lang-change", { detail: lang }));
}

export function useTermsLang(siteLang: Lang = "nl"): [TermsLang, (l: TermsLang) => void] {
	const [lang, setLangState] = useState<TermsLang>(() => getTermsLang(siteLang));

	useEffect(() => {
		const handler = (e: Event) => {
			const detail = (e as CustomEvent<TermsLang>).detail;
			if (detail) setLangState(detail);
		};
		window.addEventListener("vv-terms-lang-change", handler);
		return () => window.removeEventListener("vv-terms-lang-change", handler);
	}, []);

	return [
		lang,
		(l: TermsLang) => {
			setTermsLang(l);
			setLangState(l);
		},
	];
}
