# vinovonk-tasting-notes

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

> Independent wine tasting note app. Not affiliated with WSET, CIVC, or any wine education institution.

Personal wine tasting note tool that runs entirely in your browser. No account, no server, no tracking — all data stored locally via `localStorage`. Installable as an app and works offline.

**Live:** [vinovonk.com/en/tasting/](https://vinovonk.com/en/tasting/) (EN) · [vinovonk.com/proeven/](https://vinovonk.com/proeven/) (NL)

---

## Features

| | |
|---|---|
| **Live tasting mode** | Fast tap-only capture during a tasting — one card per wine, following the tasting order. No typing needed. Previous-wine button + swipe navigation. |
| **Share a flight (QR)** | Build a line-up up front, share a QR or link. Guests scan → the wines are pre-loaded → they only score. Fully serverless (the line-up is encoded in the URL). |
| **Session overview** | After tasting: a "would buy" shortlist + a ranking, shareable as text and backed up per session as a JSON file. |
| **Install as an app (PWA)** | Add to home screen for an app icon, full-screen launch and offline use. |
| **Tasting levels** | Beginner (4-step wizard with jargon hints), Advanced (all fields, four tabs), Expert (full method + readiness + quality verdict). Pick per bottle. |
| **Term language** | Field labels independent of UI language — switch tasting terms between Dutch and English at any time. |
| **Wine form** | Structured tasting method — Appearance, Nose, Palate, Conclusions + BLIC quality assessment. |
| **Champagne form** | Extended with mousse, bubble size, autolytic/oxidative character, dosage, disgorgement. |
| **Spirits form** | Whisky, cognac, gin, rum and more — distillate-specific aroma picker. |
| **Non-alcoholic** | Wines, beers, kombucha, tea, mocktails — with comparison field. |
| **Aroma picker** | Structured clusters: primary fruit, secondary fermentation, tertiary oxidative/maturation. Tile categories for quick capture. |
| **Jargon hints** | Tap the `?` icon next to any technical label in beginner mode for a plain-language explanation (25 terms). |
| **Biodynamic calendar** | Today's day type (fruit/flower/leaf/root) + 14-day overview + moon phase. |
| **Photo capture** | Bottle photo via camera or file library (full bottle form). |
| **Archive & search** | Search and filter all notes across sessions. |
| **Export / Import** | JSON backup of everything, or per-session; import on another device. |
| **Bilingual UI** | Full Dutch (NL) and English (EN) interface. |
| **Privacy** | 100% client-side — zero server, zero analytics. |

---

## Live tasting mode

Made for tasting fast — at a table of 5 to 100 people, everyone pouring at once, someone talking through the wines. Everything is a tap; nothing requires typing. Open a session and tap **⚡ Live tasting**.

Each wine is one card that follows the tasting order:

**1 · Look** — Wine type (White / Rosé / Red / Sparkling / Fortified), Clarity (Clear / Hazy), Intensity (Pale / Medium / Deep), Colour (swatches matched to the wine type).

**2 · Smell** — Intensity (Light / Medium / Pronounced) and aroma categories as tiles.

**3 · Taste** — Flavour categories as tiles, plus Sweetness (Dry / Off-dry / Medium / Sweet), Acidity, Tannin (red/fortified only), Alcohol, Body (Light / Medium / Full) and Finish (Short / Medium / Long).

**4 · Note** — One short free-text impression (optional).

**5 · Conclusion** — A simple gut-check that's quicker than a formal score: *Do I like it?* (No / So-so / Yes) and *Would I buy it?* (No / Maybe / Yes), with an optional 1–10 score underneath.

Every field is optional — tap only what you want. **Next wine** saves and moves on; **Previous wine** (or a left/right swipe) reopens a saved wine to correct it without creating a duplicate. Each wine is stored as a standard tasting note, so you can open it later in the full form to refine it at home.

---

## Share a flight (QR)

For a hosted tasting where the line-up is known up front. On the dashboard tap **⬡ Share flight (QR)**:

1. Enter a tasting name and the wines, one per line, in pouring order.
2. Generate a QR code and a shareable link. The whole line-up is encoded in the URL — there is **no server** and nothing is uploaded.
3. Guests scan the QR (or open the link). A local session is created on their device with the wines already filled in, and they drop straight into Live tasting mode — they only have to score.

You can also tap **Taste this flight yourself** to start the line-up on your own device.

---

## Session overview & backup

From a session, tap **★ Overview** for a recap:

- **Would-buy shortlist** — the wines you marked *Would buy: Yes*, up top.
- **Ranking** — all wines sorted by buy verdict → score → preference. Tap any wine to open it in the full form.
- **Copy summary** / **Share** — a plain-text recap (shortlist + ranking) via the clipboard or the native share sheet.
- **Backup (file)** — download the session as a JSON file. Re-import it on another device via **Settings → Import**.

Because everything lives in your browser's `localStorage`, exporting or backing up before you clear your browser is the way to keep your notes safe.

---

## Install as an app (PWA)

The app ships a web manifest and a service worker, so it can be installed and used offline.

- **iOS (Safari):** Share → *Add to Home Screen*.
- **Android / desktop (Chrome, Edge):** the install icon in the address bar, or menu → *Install*.

After the first online visit the app shell and assets are cached, so it opens without a connection. Your data was always local; the PWA layer just makes it feel and behave like a native app.

---

## How tasting levels work

When you add a bottle the app asks how you want to taste it. The choice is per-bottle and you can switch any time without losing data.

**Beginner** (~3 min) — A four-step wizard walks you through Look, Smell, Taste, Verdict. Each technical term shows a `?` icon you can tap for a short explanation. Aroma categories appear as tiles instead of long lists.

**Advanced** (~6 min) — All fields visible at once across four tabs (Appearance, Nose, Palate, Conclusions). No hint icons, no wizard.

**Expert** (~10 min) — Same as Advanced plus extra fields for readiness assessment, quality dimensions (BLIC) and detail observations.

The level you picked is shown at the top of the bottle screen. A subtle "Want more fields?" banner under the beginner wizard lets you escalate without leaving your data.

---

## Term language vs UI language

The app has two language settings:

1. **UI language** — the language of buttons, headings and instructions (Dutch or English, set per page).
2. **Term language** — the language of tasting vocabulary (Clear/Hazy vs Helder/Troebel, Lemon/Gold vs Citroengeel/Goud).

By default the term language matches the UI language, but you can override it in **Settings → Term language**. The toggle is live — terms switch instantly without a reload.

---

## Quick start

```bash
git clone https://github.com/jeroen-vinovonk/vinovonk-tasting-notes.git
cd vinovonk-tasting-notes/standalone
npm install
npm run dev
# → http://localhost:5173
```

Production build (the root-level library imports its dependencies from `standalone/node_modules`, so symlink it first):

```bash
cd vinovonk-tasting-notes/standalone
npm install
ln -sf node_modules ../node_modules
npm run build      # → standalone/dist/
```

---

## Repository structure

This repo is a **subtree export** of `src/components/proeven/` from the vinovonk site. The `standalone/` directory contains the Vite wrapper to run the app outside of Astro.

```
vinovonk-tasting-notes/
├── TastingApp.tsx          # Root island + hash router
├── router.ts               # useHashRoute() hook
├── types.ts                # Zod schemas: TastingNote, WijnProef, etc.
├── ui/                     # Brutalist UI kit (Button, Card, Tabs, Dialog, JargonTip, LevelSelector…)
├── views/                  # Page views
│   ├── Dashboard, SessionDetail, BottleTasting, NiveauChooser, BeginnerWizard, Archive, Settings…
│   ├── LiveSession.tsx     # Fast tap-only tasting card (Look → Smell → Taste → Note → Conclusion)
│   ├── FlightBuilder.tsx   # Host builds a line-up → QR + share link
│   ├── FlightImport.tsx    # Guest opens a shared flight → local session
│   └── SessionRecap.tsx    # Would-buy shortlist + ranking + share/backup
├── forms/                  # WijnForm, ChampagneForm, SpiritsForm, AlcoholVrijForm, GenericForm
├── features/               # AromaPicker, DruivenInput, FotoCapture, BiodynamischBadge
├── data/                   # Option arrays (bilingual via *Bi suffix), aroma lexicon, grape/region database
├── lib/
│   ├── storage.ts          # localStorage CRUD + per-session export
│   ├── flight.ts           # Serverless flight encode/decode (base64url in the URL)
│   ├── biodynamisch.ts     # Moon position + biodynamic day type (Jean Meeus)
│   ├── form-labels.ts      # Bilingual UI strings + option getters
│   ├── level.ts            # useLevel() hook + tasting level state
│   ├── terms-lang.ts       # useTermsLang() hook + term language state
│   └── jargon.ts           # 25 plain-language explanations of tasting terms
└── standalone/             # Vite wrapper for running outside Astro
    ├── index.html
    ├── package.json
    ├── vite.config.ts
    ├── public/             # PWA: manifest.webmanifest, sw.js, icons
    └── src/
        ├── main.tsx        # Mounts TastingApp, registers the service worker
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

This repo is a subtree export — the canonical source is the vinovonk site repo. Significant changes will be coordinated upstream.

---

## License

MIT — see [LICENSE](LICENSE)
