# ops/ — the automation entry point

Every content or pricing change enters the pipeline as a **brief**: a small
markdown file describing *what* should change. An agent (or a human) turns
the brief into a data-only pull request; CI (typecheck → prerender → content
assertions → browser QA) judges the result before any human reviews it.

## How to request a change

1. Copy the matching template from `ops/templates/` into `ops/briefs/`
   (e.g. `ops/briefs/2026-08-uganda.md`).
2. Fill it in and commit it (any branch, or attach it to an issue).
3. Hand it to an agent — e.g. in Claude Code:
   `Execute the brief in ops/briefs/2026-08-uganda.md` — or run the
   catalog workflow when one is configured.
4. Review the resulting PR. The brief file is deleted in the same PR once
   executed (the git history is the archive).

## Templates

| Template | Produces |
| --- | --- |
| `new-destination.md` | A territory + at least one expedition in `web/app/lib/data/` |
| `new-expedition.md` | An expedition added to an existing territory |
| `price-update.md` | Changes to from-prices, tier multipliers, or transfer prices |

## Rules the executing agent must follow

- Content is **data-only**: edit `web/app/lib/data/*.ts` (and
  `web/app/lib/booking.ts` for pricing). Routes, sitemap, footer, JSON-LD,
  and cards all derive automatically.
- House voice and imagery rules live in the root `CLAUDE.md`. Every new
  Unsplash photo ID must be curl-verified (HTTP 200) before it is committed.
- Verify with `cd web && npm run typecheck && npm run build && npm run e2e`
  before opening the PR.
- One brief → one PR. Never batch unrelated briefs.
