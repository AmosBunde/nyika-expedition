# Nyika Expeditions

A production-ready static website for a Kenya-based safari outfitter. Editorial expedition aesthetic, real Kenya photography from Unsplash, four signature tours (Maasai Mara, Amboseli, Samburu, Laikipia), and a four-step booking flow with airport transfer selection.

## Contents

```
nyika-expeditions/
├── index.html       Main page (all sections, booking modal, confirmation)
├── styles.css       Complete stylesheet
├── script.js        Booking flow logic and UI interactions
└── README.md        This file
```

## Quick Preview (Local)

No build step needed. Just open `index.html` in a browser, or serve the folder:

```bash
# Python 3
python3 -m http.server 8000

# Node (with npx)
npx serve .

# PHP
php -S localhost:8000
```

Then visit `http://localhost:8000`.

## Deployment

This is a pure static site. Deploy to any of the following in under five minutes:

### Netlify (drag and drop)
1. Go to `app.netlify.com`
2. Drag the `nyika-expeditions` folder onto the deployment area
3. Site is live with a free subdomain; add a custom domain in settings

### Vercel
```bash
npm i -g vercel
cd nyika-expeditions
vercel
```

### GitHub Pages
1. Create a new GitHub repo, push the contents
2. Settings → Pages → Source: `main` branch, `/` root
3. Site lives at `https://<username>.github.io/<repo-name>`

### Cloudflare Pages
1. Push to GitHub (as above)
2. `dash.cloudflare.com` → Pages → Connect to Git
3. Framework preset: None. Build output: `/`

## Deploy via GitHub Actions (recommended)

This repo ships a CI/CD pipeline under `.github/workflows/`:

- **`deploy.yml`** — on every push to `main`, assembles a clean publish directory (excluding dev/CI files and any `*.zip`) and deploys to GitHub Pages via the official Pages actions. Enable it once under **Settings → Pages → Build and deployment → Source: GitHub Actions**.
- **`ci.yml`** — on every push and pull request: JS syntax check, JSON / manifest / JSON-LD validation, sitemap XML validation, HTML validation (`html-validate`), CSS lint (`stylelint`), a Lighthouse CI run (performance/a11y/SEO/best-practices), and a broken-link check.

No build step and no committed `node_modules`: the lint tools are fetched on demand via `npx` in CI only. The deployed site stays pure static HTML/CSS/JS.

## Production Hardening

This site is configured for production deployment. What's included:

### Security
- **Content Security Policy** delivered via `<meta http-equiv>` (GitHub Pages cannot set HTTP headers). It pins `script-src 'self'`, `object-src 'none'`, `base-uri 'self'`, and explicitly allowlists only Google Fonts and Unsplash. There are **no inline scripts or inline styles**, so the CSP needs no `'unsafe-inline'`.
- `referrer` policy, `color-scheme`, and `theme-color` meta.
- **Known limitation:** `frame-ancestors` (clickjacking), `Strict-Transport-Security` (HSTS), and `X-Content-Type-Options` **cannot** be set from a `<meta>` tag — they require real HTTP response headers. GitHub Pages does not let you set those. To get them, front the site with **Cloudflare (free)** and add a Transform Rule / `_headers` equivalent, or move to a host that supports custom headers (Netlify/Vercel/Cloudflare Pages). A ready-to-use header set is documented below.
- `/.well-known/security.txt` provides a vulnerability disclosure contact (RFC 9116).

Recommended HTTP headers to add at the edge (Cloudflare/Netlify/Vercel):

```
Strict-Transport-Security: max-age=63072000; includeSubDomains; preload
X-Content-Type-Options: nosniff
X-Frame-Options: DENY
Referrer-Policy: strict-origin-when-cross-origin
Permissions-Policy: geolocation=(), microphone=(), camera=()
```

### SEO & discoverability
- Canonical URL, robots meta, Open Graph + Twitter Card tags.
- **schema.org JSON-LD**: `TravelAgency` (with address, contact, aggregate rating), `WebSite`, and an `ItemList` of the four expeditions as `TouristTrip` offers with prices.
- `robots.txt` and `sitemap.xml`.

### Performance & PWA
- `site.webmanifest`, full favicon/icon set (SVG + ICO + PNG + Apple touch icon), generated from `favicon.svg`.
- **Service worker** (`sw.js`): precaches the app shell, runtime-caches fonts and imagery, and serves an offline fallback. Bump `VERSION` in `sw.js` whenever assets change to invalidate old caches.
- Images carry explicit `width`/`height` (no layout shift), `loading="lazy"`/`eager`, and `decoding="async"`; `preconnect` hints for fonts and Unsplash.

### Accessibility
- Skip-to-content link, `<main>` landmark, named `<aside>` landmarks, `aria-hidden` on the decorative ticker, keyboard `:focus-visible` rings, and a `prefers-reduced-motion` block. HTML passes `html-validate` (including its WCAG rules) with zero errors.

### Legal
- `privacy.html` and `terms.html` (linked in the footer) and a branded `404.html`.
- **These legal pages are a starting template — have them reviewed by counsel before relying on them.**

### Configuration

The production URL `https://amosbunde.github.io/nyika-expedition/` is referenced in:
`index.html` (canonical, Open Graph, JSON-LD), `privacy.html`, `terms.html`, `robots.txt`, `sitemap.xml`, and `.well-known/security.txt`.

**Using a custom domain?** Add a `CNAME` file containing your domain, set it under Settings → Pages, then find-and-replace the URL above across those files. Update the `security.txt` contact and the `Expires` date too.

> Note: `nyika-expeditions.zip` is a stale packaged copy of the site. It is excluded from deploys and git-ignored going forward; you can safely `git rm` it.

## Images

All photography is from Unsplash (free license, no attribution required but provided in the footer):

| Location | Photographer | Photo ID |
|---|---|---|
| Hero (Kilimanjaro from Amboseli) | Sergey Pesterev | `photo-1489392191049-fc10c97e64b6` |
| Maasai Mara (wildebeest + safari vehicle) | David Clode | `photo-1535082623926-b39352a03fb7` |
| Amboseli (Kilimanjaro with acacias) | Sergey Pesterev | `photo-1613061445510-e296bfedb73e` |
| Samburu (hills from Lewa) | David Clode | `photo-1535342604578-a175d3fc4f22` |
| Laikipia (black rhino mother and calf) | David Clode | `photo-1535338454770-8be927b5a00b` |

Images are loaded directly from `images.unsplash.com`. If you prefer to host them locally, download each photo from Unsplash, save to `/images/`, and update the `src` attributes in `index.html` and the image URLs in `script.js`.

## Customization

### Brand

The visual system lives in CSS custom properties at the top of `styles.css`:

```css
:root {
  --cream: #F2EDE2;
  --sand: #EDE6D8;
  --ochre: #E8A872;
  --rust: #C05621;
  --brown: #58341C;
  --dark: #1A140C;

  --font-display: 'Fraunces', Georgia, serif;
  --font-body: 'Inter', ..., sans-serif;
  --font-mono: 'JetBrains Mono', ui-monospace, monospace;
}
```

Change those and the entire site re-palettes cleanly.

### Tours

Edit two places to add, remove, or edit a tour:

1. **`index.html`**: Copy an `<article class="tour">` block in the `.tours` grid and update copy, image, pricing.
2. **`script.js`**: Add a matching entry to the `TOURS` object at the top.

The `data-tour="..."` attribute on the article must match the key in `TOURS` so the booking modal can look up the right data.

### Transfers

Transfer tiers are defined in both `index.html` (display) and `script.js` (`TRANSFER_NAMES` plus the `data-price` attributes on the radio inputs). Keep them in sync.

### Accommodation multipliers

In `script.js`:

```js
const TIER_MULT = { standard: 1, premium: 1.35, flagship: 1.8 };
```

## What to Wire for Production

Right now the booking flow completes locally (shows a confirmation screen with a random reference number). Before going live, replace the `$('#confirmBtn').addEventListener(...)` handler in `script.js` with an actual POST to your backend, Formspree, Netlify Forms, or whatever booking system you use.

Example with Formspree:

```js
$('#confirmBtn').addEventListener('click', async () => {
  const res = await fetch('https://formspree.io/f/YOUR_FORM_ID', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
    body: JSON.stringify({
      tour: state.currentTour.name,
      ...state.form,
      total: calcTotals().total
    })
  });
  if (res.ok) {
    closeModal();
    populateConfirm();
    openConfirm();
  }
});
```

## Browser Support

- Modern evergreen browsers (Chrome, Firefox, Safari, Edge)
- Uses CSS Grid, CSS Custom Properties, `aspect-ratio`, `backdrop-filter`, `IntersectionObserver`
- No transpilation required; ships as ES2020

## License

Code: yours to use, modify, and ship.
Photography: Unsplash License (free for commercial and non-commercial use, no attribution required though credits are in the footer).
Fonts: Fraunces, Inter, JetBrains Mono — all SIL Open Font License.
