# Nyika Expeditions

A production-grade marketing site for a Kenya-based safari outfitter. Editorial
premium-travel aesthetic, real Kenya photography from Unsplash, four signature
expeditions (Maasai Mara, Amboseli, Samburu, Laikipia), and a four-step booking
flow with airport-transfer selection and live pricing.

Built as a **React** app and shipped as **prerendered static HTML** to GitHub
Pages — so it keeps the SEO and first-paint of a static site while gaining a
real component architecture.

## Stack

- **React 19** + **React Router 7** (framework mode, `ssr: false` + prerender → SSG)
- **TypeScript**, **Vite 8**
- **Tailwind CSS v4** + **shadcn/ui** (Radix primitives)
- Output is fully static; no server runtime at deploy time.

## Project layout

```
.
├── web/                        The application (all source lives here)
│   ├── app/
│   │   ├── root.tsx            HTML shell: CSP, fonts, icons, manifest, JSON-LD
│   │   ├── routes.ts           Route table (home, /privacy, /terms, * 404)
│   │   ├── routes/             home.tsx, privacy.tsx, terms.tsx, $.tsx
│   │   ├── components/         Nav, Hero, Expeditions, BookingModal, sections…
│   │   │   └── ui/             shadcn primitives
│   │   ├── lib/                tours.ts (data + pricing), use-scroll.ts, utils.ts
│   │   └── app.css             Design tokens (Tailwind v4 @theme) + base styles
│   ├── public/                 favicons, manifest, robots, sitemap, sw.js, .well-known
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
npm run build      # prerender to build/client/
npm run preview    # serve the production build
```

## Deployment (GitHub Pages, via Actions)

`.github/workflows/deploy.yml` runs on every push to `main`: it builds the app,
flattens the prerendered routes to the publish root, maps the SPA fallback to
`404.html`, writes `.nojekyll`, and deploys with the official Pages actions.
Enable it once under **Settings → Pages → Build and deployment → Source: GitHub
Actions**.

The site is served from a **project subpath** (`/nyika-expedition/`). That path
is configured in `web/vite.config.ts` (`base`) and `web/react-router.config.ts`
(`basename`); change both if the repo name changes.

`ci.yml` runs on every push/PR: a blocking **build** job (typecheck + prerender +
content assertions) and a non-blocking **audit** job (lychee link-check +
Lighthouse CI against the prerendered routes).

## Production hardening

### Security

- **Content Security Policy** via `<meta http-equiv>` in `root.tsx`. Everything
  is locked down (`default-src 'self'`, `object-src 'none'`, `base-uri 'self'`,
  imagery/fonts allowlisted to Unsplash + Google Fonts) **except** `script-src`
  and `style-src`, which include `'unsafe-inline'` — required because React
  Router's streaming-hydration scripts and Radix's inline style attributes
  cannot be nonce/hash-signed on static GitHub Pages.
- **Known limitation:** a strict hash/nonce CSP, `frame-ancestors` (clickjacking),
  HSTS, and `X-Content-Type-Options` need real HTTP response headers, which
  GitHub Pages cannot set. Front the site with **Cloudflare (free)** or a host
  that supports custom headers to add:

  ```
  Content-Security-Policy: ...                 # hash/nonce-based, no 'unsafe-inline'
  Strict-Transport-Security: max-age=63072000; includeSubDomains; preload
  X-Content-Type-Options: nosniff
  X-Frame-Options: DENY
  Referrer-Policy: strict-origin-when-cross-origin
  Permissions-Policy: geolocation=(), microphone=(), camera=()
  ```

- `/.well-known/security.txt` provides a vulnerability-disclosure contact (RFC 9116).

### SEO & PWA

- Per-route `meta()` (title, description, canonical, OG/Twitter), plus schema.org
  **JSON-LD** (`TravelAgency`, `WebSite`, `ItemList` of the four expeditions) in
  `root.tsx`.
- `robots.txt`, `sitemap.xml`, `site.webmanifest`, full favicon/icon set, and an
  offline-first **service worker** (`web/public/sw.js`). Bump `VERSION` in the SW
  when assets change.

### Accessibility

- Skip links, `<main>` landmark, shadcn/Radix dialogs (focus trap, ESC, ARIA),
  visible `:focus-visible` rings, WCAG-AA-minded contrast, and a global
  `prefers-reduced-motion` block.

### Legal

- `/privacy` and `/terms` routes (linked in the footer) and a branded 404.
- **These are a starting template — have them reviewed by counsel before relying on them.**

## Customization

- **Brand tokens** — `web/app/app.css` (`:root` + `@theme`). Palette is a warm
  off-white stone canvas with a single deep forest-green accent reserved for CTAs.
  Fonts: Fraunces (display), Inter (body), JetBrains Mono (accents).
- **Tours / transfers / tier multipliers** — all data and the pricing logic
  (`calcTotals`) live in `web/app/lib/tours.ts`. Add or edit an entry there and
  the cards + booking modal update together.

## Wire the booking flow for production

The flow currently completes in-browser (a confirmation screen with a random
reference). To go live, replace the `confirm()` handler in
`web/app/components/booking-modal.tsx` with a POST to your backend, Formspree,
or booking provider, using the assembled `form` + `calcTotals(tour, form)`.

## Image credits

All photography is from Unsplash (free license; credited in the footer):

| Location | Photographer | Photo ID |
|---|---|---|
| Hero (Kilimanjaro from Amboseli) | Sergey Pesterev | `photo-1489392191049-fc10c97e64b6` |
| Maasai Mara (wildebeest + safari vehicle) | David Clode | `photo-1535082623926-b39352a03fb7` |
| Amboseli (Kilimanjaro with acacias) | Sergey Pesterev | `photo-1613061445510-e296bfedb73e` |
| Samburu (hills from Lewa) | David Clode | `photo-1535342604578-a175d3fc4f22` |
| Laikipia (black rhino mother and calf) | David Clode | `photo-1535338454770-8be927b5a00b` |

## License

Code: yours to use, modify, and ship.
Photography: Unsplash License. Fonts: Fraunces, Inter, JetBrains Mono — SIL Open Font License.
