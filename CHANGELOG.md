# Changelog

## [Unreleased] — 2026-04-28 — Trademark rebrand

Removed third-party trademark references (WSET, SAT, CIVC, Comité Interprofessionnel du vin de Champagne) from the codebase, documentation and UI strings. Reason: prepare the standalone repository for open-source publication as `vinovonk-tasting-notes` without invoking trademarks of wine-education institutions or trade bodies.

### Replaced

| Was | Now (NL) | Now (EN) |
|---|---|---|
| `Systematic Approach to Tasting (SAT)` | `gestructureerde proefmethode` | `structured tasting method` |
| `SAT-methode` / `SAT method` | `proefmethode` | `tasting method` |
| `CIVC-format` / `CIVC Champagne Tasting Methodology` | `Champagne-proefformat` | `Champagne tasting format` |
| `Comité Interprofessionnel du vin de Champagne (CIVC) — champagne.fr` (BronnenView attribution) | `Jeroen volgde gevorderde Champagne-trainingen.` | `Jeroen completed advanced Champagne trainings.` |

### Files changed

- `README.md` — removed SAT/CIVC bullets; added independence disclaimer.
- `standalone/README.md` — same.
- `standalone/ATTRIBUTIONS.md` — rewrote tasting-methodology section, dropped CIVC organisation block.
- `standalone/package.json` — `description` rewritten without SAT/CIVC.
- `views/BronnenView.tsx` — NL + EN attributions rewritten (kept `satName`/`civcName` JSX keys for stability).
- `views/HoeGebruikView.tsx` — NL + EN copy rewritten.
- `forms/WijnForm.tsx` — top comment.
- `forms/ChampagneForm.tsx` — top comment.
- `types.ts` — section comments.
- `data/wine-options.ts`, `data/spirits-options.ts`, `data/champagne-options.ts` — file headers.

### Skipped (per plan)

- `Wset → Wine TS` rename (rule #4): no-op. Codebase already uses Dutch identifiers (`WijnProef`, `WijnForm`, `WijnFormHandle`, `createEmptyWineTasting`). No `Wset*` symbols present.
- Data option-array audit: no literal trademark descriptor copy found. localStorage keys (NL strings) preserved unchanged for backward-compat with existing user data.

### Disclaimer added

Top of each README and ATTRIBUTIONS.md:

> Independent wine tasting note app. Not affiliated with WSET, CIVC, or any wine education institution.

### Verification

```bash
grep -rE "\b(WSET|SAT|CIVC|Systematic Approach)\b" . \
  --include="*.ts" --include="*.tsx" --include="*.md" --include="*.json" \
  --exclude-dir=node_modules --exclude=CHANGELOG.md
```

Result: 0 hits outside the explicit "Not affiliated with WSET, CIVC" disclaimer.
