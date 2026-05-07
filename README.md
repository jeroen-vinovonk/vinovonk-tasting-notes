# vinovonk-tasting

[![Deploy to GitHub Pages](https://github.com/vinovonk/vinovonk-tasting/actions/workflows/deploy.yml/badge.svg)](https://github.com/vinovonk/vinovonk-tasting/actions/workflows/deploy.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

> Independent wine tasting note app. Not affiliated with WSET, CIVC, or any wine education institution.

Personal wine tasting note tool that runs entirely in your browser. No account, no server, no tracking — all data stored locally via `localStorage`.

**Live:** [vinovonk.com/en/tasting/](https://vinovonk.com/en/tasting/) (EN) · [vinovonk.com/proeven/](https://vinovonk.com/proeven/) (NL)

---

## Features

| | |
|---|---|
| **Tasting levels** | Beginner (4-step wizard with jargon hints), Advanced (all fields, four tabs), Expert (full method + readiness + quality verdict). Pick per bottle. |
| **Term language** | Field labels independent of UI language — switch tasting terms between Dutch and English at any time. |
| **Wine form** | Structured tasting method — Appearance, Nose, Palate, Conclusions + BLIC quality assessment |
| **Champagne form** | Extended with mousse, bubble size, autolytic/oxidative character, dosage, disgorgement |
| **Spirits form** | Whisky, cognac, gin, rum and more — distillate-specific aroma picker |
| **Non-alcoholic** | Wines, beers, kombucha, tea, mocktails — with comparison field |
| **Aroma picker** | Structured clusters: primary fruit, secondary fermentation, tertiary oxidative/maturation. Beginner mode shows tile categories. |
| **Jargon hints** | Tap the `?` icon next to any technical label in beginner mode for a plain-language explanation (25 terms covered). |
| **Biodynamic calendar** | Today's day type (fruit/flower/leaf/root) + 14-day overview + moon phase |
| **Photo capture** | Bottle photo via camera or file library |
| **Archive & search** | Search and filter all notes across sessions |
| **Export / Import** | JSON backup; import on another device |
| **Bilingual UI** | Full Dutch (NL) and English (EN) interface |
| **Privacy** | 100% client-side — zero server, zero analytics |

---

## How tasting levels work

When you add a bottle the app asks how you want to taste it. The choice is per-bottle and you can switch any time without losing data.

**Beginner** (~3 min) — A four-step wizard walks you through Look, Smell, Taste, Verdict. Each technical term shows a `?` icon you can tap for a short explanation. Aroma categories appear as tiles instead of long lists. Aimed at first-time tasters or anyone who wants to focus on essentials.

**Advanced** (~6 min) — All fields visible at once across four tabs (Appearance, Nose, Palate, Conclusions). No hint icons, no wizard. Aimed at people who already know the structured tasting method.

**Expert** (~10 min) — Same as Advanced plus extra fields for readiness assessment, quality dimensions (BLIC) and detail observations. Aimed at trade tasters and sommeliers.

The level you picked is shown at the top of the bottle screen. A subtle "Want more fields?" banner under the beginner wizard lets you escalate without leaving your data.

---

## Term language vs UI language

The app has two language settings:

1. **UI language** — the language of buttons, headings and instructions (Dutch or English, set per page).
2. **Term language** — the language of tasting vocabulary (Clear/Hazy vs Helder/Troebel, Lemon/Gold vs Citroengeel/Goud).

By default the term language matches the UI language, but you can override it in **Settings → Term language**. Useful when you read English wine literature but want a Dutch interface, or vice versa. The toggle is live — terms switch instantly without a reload.

---

## Quick start

```bash
git clone https://github.com/vinovonk/vinovonk-tasting.git
cd vinovonk-tasting/standalone
npm install
npm run dev
# → http://localhost:5173
```

---

## Repository structure

This repo is a **subtree export** of `src/components/proeven/` from the [vinovonk mono-repo](https://vinovonk.com). The `standalone/` directory contains the Vite wrapper to run the app outside of Astro.

```
vinovonk-tasting/
├── TastingApp.tsx          # Root island + hash router
├── router.ts               # useHashRoute() hook
├── types.ts                # Zod schemas: TastingNote, WijnProef, etc.
├── ui/                     # Brutalist UI kit (Button, Card, Tabs, Dialog, JargonTip, LevelSelector…)
├── views/                  # Page views (Dashboard, SessionDetail, BottleTasting, NiveauChooser, BeginnerWizard, Archive…)
├── forms/                  # WijnForm, ChampagneForm, SpiritsForm, AlcoholVrijForm, GenericForm
├── features/               # AromaPicker, DruivenInput, FotoCapture, BiodynamischBadge
├── data/                   # Option arrays (bilingual via *Bi suffix), aroma lexicon, grape/region database
├── lib/
│   ├── storage.ts          # localStorage CRUD
│   ├── biodynamisch.ts     # Moon position + biodynamic day type (Jean Meeus)
│   ├── form-labels.ts      # Bilingual UI strings (FL.nl / FL.en)
│   ├── level.ts            # useLevel() hook + tasting level state
│   ├── terms-lang.ts       # useTermsLang() hook + term language state
│   └── jargon.ts           # 25 plain-language explanations of tasting terms
└── standalone/             # Vite wrapper for running outside Astro
    ├── index.html
    ├── package.json
    ├── vite.config.ts
    ├── ATTRIBUTIONS.md
    └── src/
        ├── main.tsx        # Mounts TastingApp with auto-detected lang
        └── index.css       # CSS tokens (brutalist design system)
```

---

## Tasting methodologies

- **Structured wine tasting** — Appearance, Nose, Palate, Conclusions
- **Champagne tasting format** — extended sparkling-wine parameters (mousse, bubble size, autolysis, dosage)
- **Biodynamic calendar** — Maria Thun framework, computed via Jean Meeus astronomical algorithm

See [standalone/ATTRIBUTIONS.md](standalone/ATTRIBUTIONS.md) for full credits.

---

## Contributing

Issues and PRs welcome. See [standalone/CONTRIBUTING.md](standalone/CONTRIBUTING.md).

This repo is a subtree export — the canonical source is the vinovonk mono-repo. Significant changes will be coordinated upstream.

---

## License

MIT — see [LICENSE](LICENSE)
