// ============================================================
// NYIKA EXPEDITIONS — Pan-African catalog
// Regions → Destinations → Expeditions. All copy follows the
// house voice: restrained, editorial, field-log specific.
// ============================================================

export type RegionKey = "east" | "southern" | "north"

export interface Region {
  key: RegionKey
  name: string
  blurb: string
}

export const REGIONS: Region[] = [
  {
    key: "east",
    name: "East Africa",
    blurb:
      "The great grass kingdoms — the Mara, the Serengeti, the volcano forests of the Albertine Rift. Where the migration turns and the gorillas hold their ground.",
  },
  {
    key: "southern",
    name: "Southern Africa",
    blurb:
      "Water and sand in argument — the Okavango's flooded channels, the Zambezi's slow power, the oldest desert on Earth meeting a cold Atlantic coast.",
  },
  {
    key: "north",
    name: "North Africa",
    blurb:
      "The continent's high, dry attic — Berber villages stacked above the Atlas snowline and a sand sea that begins where the last road gives up.",
  },
]

export interface Season {
  /** e.g. "Jun – Oct" */
  months: string
  label: string
  note: string
}

export interface Destination {
  slug: string
  name: string
  country: string
  region: RegionKey
  /** Short editorial epithet, e.g. "The Grass Kingdom" */
  tagline: string
  coords: string
  /** One-sentence card copy */
  blurb: string
  /** 2–3 paragraphs for the destination page */
  overview: string[]
  /** 1600px hero image */
  image: string
  /** 800px card/thumbnail image */
  thumb: string
  alt: string
  bestTime: string
  seasons: Season[]
  gateway: { airport: string; code: string; city: string }
  /** Practical notes: [label, value] — visas, health, currency, flight time */
  facts: [string, string][]
  featured?: boolean
}

export interface ItineraryLeg {
  /** e.g. "1 – 2" */
  days: string
  title: string
  body: string
  camp?: string
}

export interface Expedition {
  slug: string
  /** Two-digit expedition number, "01" … "12" */
  num: string
  name: string
  sub: string
  /** Destination slug this expedition belongs to */
  destination: string
  /** Display region line, e.g. "Narok County · Kenya" */
  region: string
  coords: string
  days: number
  nights: number
  /** From-price, USD per traveller, standard tier */
  price: number
  season: string
  group: string
  level: "Easy" | "Moderate" | "Demanding"
  /** 1200px card image */
  image: string
  /** 800px dossier/thumbnail image */
  thumb: string
  alt: string
  camps: string[]
  /** One-paragraph card copy */
  desc: string
  /** Longer page overview, 2 paragraphs */
  overview: string[]
  itinerary: ItineraryLeg[]
  includes: string[]
  excludes: string[]
  featured?: boolean
}

export { img } from "./img"

import { KENYA_DESTINATION, KENYA_EXPEDITIONS } from "./data/kenya"
import { AFRICA_DESTINATIONS, AFRICA_EXPEDITIONS } from "./data/africa"

export const DESTINATIONS: Destination[] = [
  KENYA_DESTINATION,
  ...AFRICA_DESTINATIONS,
]

export const EXPEDITIONS: Expedition[] = [
  ...KENYA_EXPEDITIONS,
  ...AFRICA_EXPEDITIONS,
].sort((a, b) => a.num.localeCompare(b.num))

export const destinationBySlug = (slug: string | undefined) =>
  DESTINATIONS.find((d) => d.slug === slug)

export const expeditionBySlug = (slug: string | undefined) =>
  EXPEDITIONS.find((e) => e.slug === slug)

export const expeditionsFor = (destinationSlug: string) =>
  EXPEDITIONS.filter((e) => e.destination === destinationSlug)

export const destinationsIn = (region: RegionKey) =>
  DESTINATIONS.filter((d) => d.region === region)

export const regionOf = (destination: Destination) =>
  REGIONS.find((r) => r.key === destination.region)!

export const FEATURED_EXPEDITIONS = () => EXPEDITIONS.filter((e) => e.featured)
