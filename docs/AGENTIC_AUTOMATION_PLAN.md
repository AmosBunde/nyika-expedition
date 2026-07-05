# Agentic Automation Plan — Nyika Expeditions

_Drafted 2026-07-05, against the pan-African rebuild (27 prerendered routes,
data-driven catalog, GitHub Pages)._

The site is a **data-driven static build**: every page derives from
`web/app/lib/data/*.ts`, CI verifies (typecheck → prerender → content
assertions), and Pages deploys. That shape is exactly what agentic systems
automate well — an agent's output is a **reviewable pull request**, and the
existing pipeline becomes the safety harness for machine-written changes.

---

## Surface-by-surface: what's manual today, what an agent replaces

### 1. The content catalog (destinations + expeditions)

Adding or updating a territory means hand-writing ~150 lines of typed data:
overview essays, seasonal calendars, visa/health/currency facts, itineraries,
camp lists. The biggest recurring cost and the most automatable:

- **Content agent** — takes a one-line brief ("add Uganda: Bwindi gorillas +
  Murchison, 6 days, ~$6,800") and produces the full data-file diff in house
  voice, following `data/kenya.ts` as the style exemplar.
- **Freshness agent** — monthly cron; re-verifies perishable facts (visa
  rules, permit prices, seasonal notes, flight times) against current sources
  and opens a PR only when something changed, with citations in the PR
  description.

### 2. Imagery

Every image must be a verified Unsplash ID passing the CSP. An **image agent**
handles the whole loop: search by subject, check licensing fit, verify the CDN
returns HTTP 200, check aspect/contrast against the dark-hero requirement,
write accurate alt text. A weekly **link-rot check** re-curls all IDs in the
catalog and swaps any that die.

### 3. Pricing and the booking engine

Tier multipliers, transfer prices, and from-prices are constants in
`lib/booking.ts`. A **pricing agent** fed an ops spreadsheet (or seasonal
rules like "raise migration-season Mara 8% when >70% booked") emits the diff;
the end-to-end browser QA script — which fills the whole booking flow and
asserts the grand total — becomes the regression gate for every pricing
change.

### 4. Enquiries and bookings (the one real gap)

The forms are client-side only because Pages has no server. Automation here
needs one thin piece of infrastructure — a form endpoint (Cloudflare Worker,
Formspree, or GitHub-Issues-as-inbox) — and then agents do the rest:

- **Triage agent** — reads each enquiry, extracts dates/party/route/budget,
  checks against seasonal availability notes, and drafts the reply in house
  voice for a human to approve and send.
- **Dossier agent** — assembles the pre-departure brief the brand promises
  (itinerary, camp biographies, seasonal indicators, packing notes) from the
  same catalog data, as a rendered PDF per booking.

### 5. SEO, sitemap, and structured data

JSON-LD and meta already derive from the catalog; the sitemap is the one
manual file. Step one: generate it in CI from the prerender list (removing a
whole class of drift). Then an **SEO agent** runs monthly: crawls the deployed
site, checks canonical/OG/schema validity, watches search signals, and
proposes copy/meta tweaks as PRs.

### 6. Quality and design regression

Lighthouse + link-check already run in CI; agents deepen it:

- **Visual QA agent** — screenshots every route on deploy (desktop + mobile),
  diffs against approved baselines, and — being a vision model, not a pixel
  differ — flags *semantic* regressions: hero text unreadable over a new
  photo, orphaned headlines, broken reveal states.
- **Copy-voice agent** — reviews any content PR against the house rules in
  CLAUDE.md (field-log register, no exclamation marks, token roles).

### 7. Testimonials, journal, and marketing

The "Correspondence" letters and a future Field Journal are periodic
editorial work: an agent drafts journal entries from guide field notes or
seasonal events (migration arrival, flood peak in the delta), and a **social
agent** cuts each new expedition or journal post into announcement copy.
Human editorial approval stays in the loop via PR review.

---

## The step-by-step build plan

### Phase 1 — Make the repo fully agent-operable (1–2 days)

1. Generate `sitemap.xml` in CI from the prerender list instead of by hand.
2. Move the browser QA script (`qa.mjs`) into the repo and run it in CI
   against the staged build — booking flow, filters, and forms become
   enforced contracts.
3. Add an `ops/` brief format: a small YAML/markdown file an agent (or human)
   drops in to request a change ("new expedition", "price update"), giving
   every automation a single entry point.

### Phase 2 — Content pipeline agents (week 1)

4. Scheduled **freshness agent** (monthly cron — Claude Code scheduled
   routine or GitHub Action): verify facts, image URLs, and external links;
   open PRs with citations.
5. On-demand **catalog agent**: brief in → full destination/expedition PR
   out, images pre-verified, CI harness proving the build. Human merges.

### Phase 3 — The enquiry loop (week 2; the only new infrastructure)

6. Stand up a form endpoint (Cloudflare Worker keeps it serverless); wire the
   contact and booking forms to it — the site itself stays static.
7. **Triage agent** consumes the inbox: structured extraction, availability
   check, drafted reply, escalation rules (high-value or ambiguous → straight
   to a human).
8. **Dossier agent** generates the pre-departure PDF per confirmed booking
   from catalog data.

### Phase 4 — Quality and growth agents (week 3+)

9. **Visual QA agent** on every deploy with screenshot baselines and semantic
   diff review.
10. **SEO agent** monthly: crawl, validate schema, propose meta/copy PRs.
11. **Editorial agent** for the Field Journal + social cuts, keyed to the
    seasonal calendar (the catalog knows when each territory peaks).

---

## What stays human

Merge approval on every PR, final send on client correspondence, pricing
sign-off, and brand-direction changes. The architecture makes that oversight
cheap: every agent output arrives as a diff that the full CI harness has
already judged.
