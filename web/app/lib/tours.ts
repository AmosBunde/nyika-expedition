// ============================================================
// NYIKA EXPEDITIONS — Tour data + booking pricing
// Ported verbatim from the original script.js so prices match.
// ============================================================

export type TourSlug = "mara" | "amboseli" | "samburu" | "laikipia"
export type TierKey = "standard" | "premium" | "flagship"
export type TransferKey = "heli" | "bush" | "4x4" | "sedan"

export interface Tour {
  id: number
  slug: TourSlug
  num: string
  name: string
  sub: string
  region: string
  coords: string
  days: number
  nights: number
  price: number
  season: string
  group: string
  level: string
  /** 1200px card image */
  image: string
  /** 800px dossier/thumbnail image */
  thumb: string
  alt: string
  camps: string[]
  desc: string
}

const img = (id: string, w: number) =>
  `https://images.unsplash.com/${id}?w=${w}&q=85&auto=format&fit=crop`

export const TOURS: Record<TourSlug, Tour> = {
  mara: {
    id: 1,
    slug: "mara",
    num: "01",
    name: "Maasai Mara",
    sub: "Migration Corridor",
    region: "Narok County",
    coords: "S 01°30′ · E 35°00′",
    days: 5,
    nights: 4,
    price: 4280,
    season: "Jul – Oct",
    group: "2–8",
    level: "Moderate",
    image: img("photo-1535082623926-b39352a03fb7", 1200),
    thumb: img("photo-1535082623926-b39352a03fb7", 800),
    alt: "Wildebeest herd and safari vehicle on the open plains of the Maasai Mara, Kenya",
    camps: ["Angama Mara", "Mara Plains Camp", "Saruni Mara"],
    desc: "Five days tracking the Great Migration across the Mara plains. Private access to the Olare Motorogi Conservancy, dawn balloon ascents, and the legendary river crossings.",
  },
  amboseli: {
    id: 2,
    slug: "amboseli",
    num: "02",
    name: "Amboseli",
    sub: "Under Kilimanjaro",
    region: "Kajiado County",
    coords: "S 02°39′ · E 37°15′",
    days: 4,
    nights: 3,
    price: 3640,
    season: "Jun – Mar",
    group: "2–6",
    level: "Easy",
    image: img("photo-1613061445510-e296bfedb73e", 1200),
    thumb: img("photo-1613061445510-e296bfedb73e", 800),
    alt: "Mount Kilimanjaro with acacia trees in Amboseli National Park, Kenya",
    camps: ["Ol Donyo Lodge", "Tortilis Camp", "Angama Amboseli"],
    desc: "Four days among the celebrated elephant families of the fifty-year Amboseli Trust research project. Kilimanjaro rises clear across the Tanzanian border at dawn and dusk.",
  },
  samburu: {
    id: 3,
    slug: "samburu",
    num: "03",
    name: "Samburu",
    sub: "The Arid North",
    region: "Samburu County",
    coords: "N 00°34′ · E 37°32′",
    days: 6,
    nights: 5,
    price: 5120,
    season: "Year-round",
    group: "2–6",
    level: "Moderate",
    image: img("photo-1535342604578-a175d3fc4f22", 1200),
    thumb: img("photo-1535342604578-a175d3fc4f22", 800),
    alt: "The Samburu hills rising above the arid landscape of northern Kenya",
    camps: ["Sasaab", "Saruni Samburu", "Elephant Bedroom Camp"],
    desc: "Six days in the semi-arid frontier where reticulated giraffe, Grevy's zebra, gerenuk, and beisa oryx roam. Palm-fringed rivers and Samburu warrior escorts on morning walks.",
  },
  laikipia: {
    id: 4,
    slug: "laikipia",
    num: "04",
    name: "Laikipia",
    sub: "Private Rangelands",
    region: "Laikipia Plateau",
    coords: "N 00°22′ · E 36°52′",
    days: 7,
    nights: 6,
    price: 6890,
    season: "Year-round",
    group: "2–4",
    level: "Demanding",
    image: img("photo-1535338454770-8be927b5a00b", 1200),
    thumb: img("photo-1535338454770-8be927b5a00b", 800),
    alt: "Black rhino mother and calf at Lewa Wildlife Conservancy, Kenya",
    camps: ["Segera Retreat", "Borana Lodge", "Lewa Wilderness"],
    desc: "Seven days across Laikipia's private conservancies. Black rhino mothers and calves at Lewa, the world's two remaining northern white rhinos at Ol Pejeta, horseback safari, helicopter transfer.",
  },
}

export const TOUR_LIST: Tour[] = [
  TOURS.mara,
  TOURS.amboseli,
  TOURS.samburu,
  TOURS.laikipia,
]

export interface Transfer {
  key: TransferKey
  name: string
  desc: string
  time: string
  tag: string
  price: number
  /** Priced once per charter rather than per traveller. */
  single: boolean
}

export const TRANSFERS: Transfer[] = [
  {
    key: "heli",
    name: "Helicopter Charter",
    desc: "Tropic Air R44 · Wilson to camp",
    time: "75 min direct",
    tag: "Premium",
    price: 2400,
    single: true,
  },
  {
    key: "bush",
    name: "Bush Flight",
    desc: "Safarilink Cessna Caravan",
    time: "45 min flight",
    tag: "Recommended",
    price: 385,
    single: false,
  },
  {
    key: "4x4",
    name: "Private Land Cruiser",
    desc: "Custom game-viewer overland",
    time: "5 – 8 hours",
    tag: "Classic",
    price: 220,
    single: false,
  },
  {
    key: "sedan",
    name: "Private Sedan",
    desc: "Airport to Nairobi hotel",
    time: "40 min",
    tag: "Standard",
    price: 95,
    single: false,
  },
]

export const TRANSFER_NAMES: Record<TransferKey, string> = {
  heli: "Helicopter Charter",
  bush: "Bush Flight",
  "4x4": "Private Land Cruiser",
  sedan: "Private Sedan",
}

export interface Tier {
  key: TierKey
  label: string
  blurb: string
  mult: number
}

export const TIERS: Tier[] = [
  {
    key: "standard",
    label: "Standard",
    blurb: "Classic tented camps",
    mult: 1,
  },
  {
    key: "premium",
    label: "Premium",
    blurb: "Signature lodges · plunge pools",
    mult: 1.35,
  },
  {
    key: "flagship",
    label: "Flagship",
    blurb: "Exclusive-use suites · butler",
    mult: 1.8,
  },
]

export const TIER_MULT: Record<TierKey, number> = {
  standard: 1,
  premium: 1.35,
  flagship: 1.8,
}
export const TIER_LABEL: Record<TierKey, string> = {
  standard: "Standard",
  premium: "Premium",
  flagship: "Flagship",
}

export interface BookingForm {
  date: string
  travelers: number
  tier: TierKey
  transfer: TransferKey | null
  flight: string
  time: string
  name: string
  email: string
  phone: string
  nationality: string
  notes: string
}

export const emptyForm = (): BookingForm => ({
  date: "",
  travelers: 2,
  tier: "premium",
  transfer: null,
  flight: "",
  time: "",
  name: "",
  email: "",
  phone: "",
  nationality: "",
  notes: "",
})

export interface Totals {
  sub: number
  transfer: number
  conservation: number
  total: number
}

/** Mirrors calcTotals() from the original script.js exactly. */
export function calcTotals(tour: Tour | null, form: BookingForm): Totals {
  if (!tour) return { sub: 0, transfer: 0, conservation: 0, total: 0 }
  const sub = Math.round(tour.price * form.travelers * TIER_MULT[form.tier])
  const t = form.transfer
    ? TRANSFERS.find((x) => x.key === form.transfer)
    : null
  const transferMult = t?.single ? 1 : form.travelers
  const transfer = t ? t.price * transferMult : 0
  const conservation = Math.round(sub * 0.03)
  return { sub, transfer, conservation, total: sub + transfer + conservation }
}

export const fmt = (n: number) => "$" + Math.round(n).toLocaleString()

export const formatDate = (iso: string, month: "short" | "long" = "short") =>
  iso
    ? new Date(iso).toLocaleDateString("en-GB", {
        day: "numeric",
        month,
        year: "numeric",
      })
    : "—"
