# Changelog

## [Unreleased] — 2026-05-06 — Tasting levels, term language, dark mode

Three-tier tasting flow plus a term-language toggle.

### Added

- **NiveauChooser** — when you add a bottle the app asks how you want to taste it. Three cards: Beginner (4-step wizard), Advanced (all fields), Expert (extra detail). Beginner is preselected with a "Recommended" badge. The choice is per-bottle and you can switch any time without losing data.
- **BeginnerWizard** — four-step guided flow (Look · Smell · Taste · Verdict) for wine, champagne, spirits and non-alcoholic. Aroma categories render as tiles instead of long lists.
- **JargonTip** — `?` icons next to technical labels in beginner mode. Tap for a plain-language explanation. Twenty-five terms covered (helderheid, intensiteit, ontwikkeling, BLIC, autolytisch, oxidatief, dosage, drinkrijpheid, kleur …).
- **Term language toggle** — field labels (Clear/Hazy vs Helder/Troebel, Lemon/Gold vs Citroengeel/Goud) can now be switched independently of the UI language. Live, no reload. Default matches UI language. Exposed in Settings → Term language. Implemented via `useTermsLang()` hook + `localizeOpties()` over bilingual `*Bi` data arrays.
- **Switch-link banner** — at the bottom of the beginner wizard, a subtle "Want more fields? → Switch to advanced" banner upgrades the level without leaving the bottle.
- **Dark mode text legibility** — `.tasting-app` wrapper class plus a scoped `--color-on-surface` token override so all inline text colours flip correctly in dark mode while active-button backgrounds stay readable.

### Changed

- **Settings** — the three-button level block + explanatory paragraph were replaced by two compact one-row entries (level + term language). Less ceremonial, faster to scan.
- **BottleTasting** — the compact level selector card at the top is gone; level is set via the chooser at the start of each bottle and via the switch-link banner during the wizard.
- **Spirits + Alcoholvrij forms** — added `fase` prop so beginner mode shows metadata (name, brand, type) on a separate "Info" step before the wizard starts. Matches the existing wine/champagne flow.
- **Tab label** — Dutch tab label "Gehemelte" renamed to "Mond" (more natural). English tab stays "Palate". Internal data key `gehemelte` unchanged for backwards compatibility.
- **VIBE field** — label is no longer italic and the textarea placeholder is now Dutch when the UI is Dutch.

### Files added

- `views/NiveauChooser.tsx`
- `views/BeginnerWizard.tsx`
- `ui/JargonTip.tsx`
- `ui/LevelSelector.tsx`
- `lib/level.ts`
- `lib/level-config.ts`
- `lib/jargon.ts`
- `lib/terms-lang.ts`

### localStorage keys

| Key | Type | Default |
|---|---|---|
| `vv-tasting-level` | `"beginner"` \| `"gevorderd"` \| `"expert"` | `"expert"` |
| `vv-terms-lang` | `"nl"` \| `"en"` | matches UI language |

Existing notes are unaffected — both keys are read with safe fallbacks.

---

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
