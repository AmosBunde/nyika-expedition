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

### Phase 1 — Make the repo fully agent-operable — ✅ SHIPPED 2026-07-05

1. ~~Generate `sitemap.xml` in CI from the prerender list.~~ Done:
   `web/scripts/generate-sitemap.mjs` runs inside `npm run build` and derives
   the sitemap from the routes that actually prerendered.
2. ~~Move the browser QA script into the repo and run it in CI.~~ Done:
   `web/e2e/run.mjs` (`npm run e2e`) stages the exact Pages layout and drives
   nav, filters, the full booking flow (with totals derived from the rendered
   price), and the contact form; blocking `e2e` job in `ci.yml`.
3. ~~Add an `ops/` brief format.~~ Done: `ops/README.md` + templates for
   new-destination, new-expedition, and price-update briefs.

### Phase 2 — Content pipeline agents (week 1) — partially shipped

4. Scheduled **freshness agent** (monthly cron — Claude Code scheduled
   routine or GitHub Action): verify facts, image URLs, and external links;
   open PRs with citations.
   - ✅ Image link-rot half shipped as a script-only weekly Action
     (`image-check.yml`) — no LLM, no cost; opens an issue on rot.
   - ✅ Fact-freshness half scaffolded (`freshness-agent.yml`, monthly) —
     inert no-op until the `ANTHROPIC_API_KEY` repository secret is added.
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

## Cost implications

_Model pricing as of July 2026 (Claude API, per million tokens): Opus 4.8
$5 in / $25 out · Sonnet $3 / $15 (intro $2 / $10 through Aug 2026) ·
Haiku 4.5 $1 / $5. Estimates below are order-of-magnitude, at moderate
volume; actuals scale with traffic and content cadence._

### Infrastructure baseline — effectively $0

| Item | Cost |
| --- | --- |
| GitHub Pages hosting | $0 (public repo) |
| GitHub Actions CI/deploy | $0 on public repos (~3 min/run; private repos have 2,000 free min/mo — ample) |
| Unsplash imagery | $0 |
| Cloudflare Worker form endpoint (Phase 3) | $0 on the free tier (100k requests/day); ~$5/mo if upgraded |

The static-site architecture is what keeps this row near zero: there is no
server, database, or CMS licence anywhere in the stack.

### Agent run costs (LLM tokens)

| Agent | Model tier | Frequency | Est. tokens/run (in / out) | Est. cost |
| --- | --- | --- | --- | --- |
| Freshness agent (facts, visas, permits) | Sonnet + web search | Monthly | ~300k / 20k | ~$1–3 /mo |
| Image link-rot check | Script only (curl), no LLM | Weekly | — | ~$0 |
| Catalog agent (new destination/expedition) | Opus | On demand | ~250k / 20k | ~$2–5 /item |
| Visual QA (screenshots, ~10 routes × 2 viewports) | Sonnet (vision) | Per deploy | ~100k / 5k | ~$0.40 /deploy · ~$8 /mo at 20 deploys |
| Enquiry triage + drafted reply | Sonnet | Per enquiry | ~5k / 1k | ~$0.03 /enquiry · ~$6 /mo at 200 enquiries |
| Pre-departure dossier (PDF) | Opus + code execution | Per booking | ~100k / 20k | ~$1 /booking · ~$20 /mo at 20 bookings |
| SEO crawl + schema audit | Sonnet | Monthly | ~300k / 10k | ~$1 /mo |
| Editorial (journal + social cuts) | Opus | ~2 posts/mo | ~150k / 15k | ~$2–4 /mo |

**Steady-state total: roughly $40–70/month** at the volumes above. The two
terms that grow with the business — triage and dossiers — grow linearly with
enquiries and bookings, at cents and ~a dollar each respectively, which is
the right shape: cost tracks revenue events, not calendar time.

### Cost levers (can cut the above 50–90%)

- **Batches API** — 50% discount on anything non-urgent (freshness, SEO,
  editorial all qualify; nothing there needs a synchronous answer).
- **Prompt caching** — the catalog + house-voice prompt (~50k tokens) is the
  shared prefix of almost every agent call; cached reads bill at ~0.1×, so
  repeat runs pay pennies for context that would otherwise dominate.
- **Model tiering** — Haiku ($1/$5) for mechanical checks (link validation,
  schema lint), Sonnet for review/triage, Opus only where the output is
  customer-facing prose or brand-critical design judgment.
- **Scripts before models** — the image link-rot check is a curl loop; never
  spend tokens on work a shell script does deterministically.

### One-time build cost

Phases 1–4 are mostly authored *by* an agent (Claude Code session time):
realistically a few working sessions total. The Cloudflare Worker and webhook
wiring in Phase 3 is the only piece with genuinely new moving parts.

### The comparison that matters

A catalog update that costs the agent pipeline ~$3 is 2–3 hours of a
copywriter + a developer touch today; a triaged, drafted enquiry reply at
$0.03 replaces the first 15 minutes of every inbox pass. At this scale the
LLM bill is noise against even one hour of saved staff time per month —
the real budget question is review time, which the PR-based design keeps to
minutes per change.

---

## What stays human

Merge approval on every PR, final send on client correspondence, pricing
sign-off, and brand-direction changes. The architecture makes that oversight
cheap: every agent output arrives as a diff that the full CI harness has
already judged.
