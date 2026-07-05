# Brief: price update

Effective date: <!-- when this should be live -->

## From-price changes (per traveller, standard tier, USD)

| Expedition slug | Current | New |
| --- | --- | --- |
|  |  |  |

## Tier / transfer changes (if any)

<!-- e.g. "flagship multiplier 1.8 → 1.9", "heli charter 2400 → 2600" -->

## Notes for the agent

- Prices live in `web/app/lib/data/*.ts` (`price` fields) and
  `web/app/lib/booking.ts` (tiers/transfers).
- The e2e suite derives expected totals from the rendered price, so no test
  updates should be needed — if one is, stop and flag it instead.
