// ============================================================
// NYIKA EXPEDITIONS — Booking engine
// Tiers, gateway transfers, and pricing. The maths is unchanged
// from the launch catalogue; transfers are now gateway-generic
// so they read correctly for every destination.
// ============================================================
import type { Expedition } from "./catalog"

export type TierKey = "standard" | "premium" | "flagship"
export type TransferKey = "heli" | "bush" | "4x4" | "sedan"

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
    desc: "Private rotor charter · gateway to camp",
    time: "60 – 90 min direct",
    tag: "Premium",
    price: 2400,
    single: true,
  },
  {
    key: "bush",
    name: "Bush Flight",
    desc: "Scheduled light aircraft · gateway to airstrip",
    time: "45 – 90 min flight",
    tag: "Recommended",
    price: 385,
    single: false,
  },
  {
    key: "4x4",
    name: "Private 4×4",
    desc: "Custom game-viewer overland",
    time: "4 – 8 hours",
    tag: "Classic",
    price: 220,
    single: false,
  },
  {
    key: "sedan",
    name: "Private Sedan",
    desc: "Airport to city hotel",
    time: "30 – 60 min",
    tag: "Standard",
    price: 95,
    single: false,
  },
]

export const TRANSFER_NAMES: Record<TransferKey, string> = {
  heli: "Helicopter Charter",
  bush: "Bush Flight",
  "4x4": "Private 4×4",
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

/** Same maths as the launch catalogue's calcTotals(). */
export function calcTotals(exp: Expedition | null, form: BookingForm): Totals {
  if (!exp) return { sub: 0, transfer: 0, conservation: 0, total: 0 }
  const sub = Math.round(exp.price * form.travelers * TIER_MULT[form.tier])
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
