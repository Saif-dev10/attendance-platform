# Presently — University Attendance Platform (Marketing Site)

A Next.js (App Router) + Tailwind CSS marketing site for a university attendance
management platform. Built with JSX, reusable components, responsive layouts,
and accessible semantic HTML.

## Getting started

```bash
npm install
npm run dev
```

Then open http://localhost:3000.

Other scripts:

```bash
npm run build   # production build
npm run start   # serve the production build
npm run lint    # ESLint
```

## Pages

- `/` — Home: hero, product preview, problem/solution, core benefits,
  How It Works preview, feature preview, institution-focused section, final CTA
- `/platform` — Lecturer / Student / Administrator experiences
- `/how-it-works` — the full seven-step attendance workflow
- `/features` — full feature catalogue, grouped by workflow stage

## Structure

```
app/
  layout.js            root layout, global metadata
  globals.css          design tokens (color, type, motion) + Tailwind import
  page.js              Home
  platform/page.js     Platform
  how-it-works/page.js How It Works
  features/page.js     Features
components/            all reusable UI (Nav, Footer, mockups, cards, icons…)
lib/photos.js          licensed photo references (Unsplash License)
```

## Design notes

- Palette: warm off-white, deep charcoal, graphite, and a muted bronze/gold
  accent, with a muted moss tone reserved for "verified/live" status —
  intentionally no blue/purple gradients or bright green.
- Type: an editorial serif for display headings paired with a clean system
  sans for body copy and a monospace face for codes/labels/data.
- Motion: gentle scroll reveals (`components/Reveal.jsx`, IntersectionObserver
  based), soft hover lift/shadow on cards, and a subtle animated scan line on
  the QR mockup. All motion respects `prefers-reduced-motion`.
- Photography: four Unsplash License photos (free for commercial use, no
  attribution required) depicting real lecture/campus scenes — see
  `lib/photos.js` for sources and photographer credit.
- All on-screen names, session codes, and attendance numbers are illustrative
  placeholder data for the product mockups, not real records.

## Notes on scope

No backend, authentication, or data-layer code is included — this is the
front-of-site experience only, as scoped. QR codes shown in mockups are
decorative (`components/QRGlyph.jsx`) and not functional/scannable codes.
