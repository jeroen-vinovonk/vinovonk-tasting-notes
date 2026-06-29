# vinovonk-tasting-notes — project memory

> ⚠️ **DIT IS NIET DE LIVE BRON.** De live proef-app draait als subtree in
> `vinovonk-astro/src/components/proeven`. Dit repo is de **standalone mirror**
> (eigen MIT-repo voor publicatie/open-source). Wijzig features in
> `vinovonk-astro`, niet hier — anders driften de twee.

## Wat dit is

Independent wine tasting-note app. 100% client-side (localStorage), geen server,
geen tracking. PWA (offline + installeerbaar). Live tasting-modus, QR-flight sharing,
session-ranking. Bilingual NL/EN.

- Live: vinovonk.com/proeven/ (NL) · vinovonk.com/en/tasting/ (EN)
- Canonical source: zie global memory `reference_tasting_app_canonical_source`

## Stack

- React 19 + Vite 6 + TypeScript, Radix UI, zod, lucide-react, qrcode
- `standalone/` bevat de zelfstandig-buildbare versie (`node_modules` symlinkt hierheen)

## Build / dev

```bash
cd standalone
npm run dev        # vite
npm run build      # vite build
npm run typecheck  # tsc --noEmit
```

## Conventies

- Tasting-method = Appearance / Nose / Palate / Conclusions + BLIC; NIET de free-flowing
  VinoVonk-artikelstijl (dit is een gestructureerde tool, andere context).
- Term-taal los van UI-taal (NL/EN tasting-termen onafhankelijk schakelbaar).
- Privacy is een feature: nooit server-calls, analytics of accounts toevoegen.
- Onafhankelijk-disclaimer behouden (niet WSET/CIVC-affiliated).

## Sync-regel

Feature-werk → doe in `vinovonk-astro` subtree, push, daarna pas hierheen mirroren
als de open-source kopie moet bijlopen.
