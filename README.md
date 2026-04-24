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
