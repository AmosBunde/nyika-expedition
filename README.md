# Nyika Expeditions

An enterprise-grade marketing and booking site for a pan-African expedition
outfitter. Editorial premium-travel aesthetic ("field log" design language),
real Africa photography from Unsplash, **eight destinations** across three
regions (Kenya, Tanzania, Rwanda, Botswana, Zambia, Namibia, South Africa,
Morocco), **twelve expeditions** with full day-by-day itineraries, and a
four-step booking flow with gateway-transfer selection and live pricing.

Built as a **React** app and shipped as **prerendered static HTML** to GitHub
Pages — so it keeps the SEO and first-paint of a static site while gaining a
real component architecture. All 27 routes are prerendered; there is no server
runtime at deploy time.

## Stack

- **React 19** + **React Router 7** (framework mode, `ssr: false` + prerender → SSG)
- **TypeScript**, **Vite 8**
- **Tailwind CSS v4** + **shadcn/ui** (Radix primitives)
- Output is fully static; deployable to any static host.

## Site map

```
/                      Flagship page: hero, trust bar, territories, featured
                       expeditions, method, transfers, conservation, letters
/destinations          Region-grouped index of the eight territories
/destinations/:slug    Territory dossier: overview, seasons, practical file,
                       gateway, routes in the territory
/expeditions           Filterable registry of all twelve routes
/expeditions/:slug     Expedition dossier: day-by-day itinerary, camps,
                       included/excluded, tier pricing, booking modal
/about                 The Guild: story, timeline, numbers, conservation levy
/contact               Desks + enquiry form (client-side, static-host safe)
/privacy /terms        Legal (lightweight document chrome)
```

## Project layout

```
.
├── web/                        The application (all source lives here)
│   ├── app/
│   │   ├── root.tsx            HTML shell: CSP, fonts, icons, manifest, JSON-LD
│   │   ├── routes.ts           Route table (marketing layout + legal + 404)
│   │   ├── routes/             layout, home, destinations, destination,
│   │   │                       expeditions, expedition, about, contact, legal, $
│   │   ├── components/         Nav, Hero, PageHero, cards, sections, BookingModal…
│   │   │   └── ui/             shadcn primitives
│   │   ├── lib/
│   │   │   ├── catalog.ts      Types + region/destination/expedition registry
│   │   │   ├── data/           kenya.ts + africa.ts (content, verified imagery)
│   │   │   ├── booking.ts      Tiers, gateway transfers, pricing engine
│   │   │   └── use-scroll.ts   Scroll/reveal hooks
│   │   └── app.css             Design tokens (Tailwind v4 @theme) + base styles
│   ├── public/                 favicons, manifest, robots, sitemap, sw.js
│   ├── lighthouserc.json       Lighthouse CI config (subpath-aware)
│   └── package.json
└── .github/workflows/          ci.yml (typecheck/build/audit) + deploy.yml (Pages)
```

## Local development

```bash
cd web
npm install
npm run dev        # http://localhost:5173/nyika-expedition/
```

Other scripts:

```bash
npm run typecheck  # react-router typegen && tsc
npm run build      # prerender all 27 routes to build/client/
npm run preview    # serve the production build
```

## Deployment (GitHub Pages, via Actions)

`.github/workflows/deploy.yml` runs on every push to `main`: it builds the app,
flattens the prerendered routes to the publish root, maps the SPA fallback to
`404.html`, writes `.nojekyll`, and deploys with the official Pages actions.
Enable it once under **Settings → Pages → Build and deployment → Source: GitHub
Actions**.

Adding a destination or expedition is a data-only change: extend
`web/app/lib/data/`, and the routes, prerender list, footer, JSON-LD, and cards
pick it up automatically (update `public/sitemap.xml` alongside).
