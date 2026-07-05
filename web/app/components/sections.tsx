import { ArrowRight, Leaf, Plane, ShieldCheck } from "lucide-react"
import { Link } from "react-router"

import { Button } from "~/components/ui/button"
import { Badge } from "~/components/ui/badge"
import { DestinationCard } from "~/components/destination-card"
import { ExpeditionCard } from "~/components/expedition-card"
import {
  DESTINATIONS,
  FEATURED_EXPEDITIONS,
  REGIONS,
} from "~/lib/catalog"
import { TRANSFERS } from "~/lib/booking"
import { fmt } from "~/lib/booking"

const CREDENTIALS = [
  ["KATO", "No. 00412"],
  ["ATTA", "Member"],
  ["B-Corp", "Certified"],
  ["ISO", "9001:2015"],
  ["ATOL", "T7684"],
  ["PAWS", "Founding"],
] as const

export function Credentials() {
  return (
    <section className="border-y bg-secondary/40">
      <div className="mx-auto flex max-w-7xl flex-col gap-6 px-5 py-8 sm:px-8 lg:flex-row lg:items-center lg:gap-12">
        <div className="font-mono-accent shrink-0 text-[11px] tracking-wide text-muted-foreground">
          Accredited &amp; Financially Protected
        </div>
        <div className="grid grow grid-cols-3 gap-x-6 gap-y-4 sm:grid-cols-6">
          {CREDENTIALS.map(([name, sub]) => (
            <div key={name}>
              <div className="font-display text-lg leading-none">{name}</div>
              <div className="font-mono-accent text-[10px] tracking-wide text-muted-foreground">
                {sub}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export function Territories() {
  const featured = DESTINATIONS.filter((d) => d.featured)
  return (
    <section className="mx-auto max-w-7xl px-5 py-24 sm:px-8 sm:py-32">
      <header className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
        <div className="max-w-2xl">
          <div className="font-mono-accent text-[11px] tracking-wide text-primary">
            The Territories · {REGIONS.length} Regions
          </div>
          <h2 className="font-display mt-3 text-4xl leading-tight sm:text-5xl">
            Eight territories.
            <br />
            One registry of routes.
          </h2>
          <p className="mt-4 text-pretty text-muted-foreground">
            From the grass kingdoms of East Africa to the fog deserts of the
            southern coast and the high attic of the Atlas — every territory in
            the registry is one we have worked for years, with resident guides
            and camps held by long relationship.
          </p>
        </div>
        <Button asChild variant="outline">
          <Link to="/destinations">
            All eight territories <ArrowRight className="size-4" />
          </Link>
        </Button>
      </header>

      <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {featured.map((d, i) => (
          <DestinationCard key={d.slug} dest={d} priority={i < 2} />
        ))}
      </div>
    </section>
  )
}

export function FeaturedExpeditions() {
  const featured = FEATURED_EXPEDITIONS()
  return (
    <section className="border-y bg-secondary/30">
      <div className="mx-auto max-w-7xl px-5 py-24 sm:px-8 sm:py-32">
        <header className="max-w-2xl">
          <div className="font-mono-accent text-[11px] tracking-wide text-primary">
            The Expeditions · MMXXVI
          </div>
          <h2 className="font-display mt-3 text-4xl leading-tight sm:text-5xl">
            Twelve routes. Fully outfitted.
          </h2>
          <p className="mt-4 text-pretty text-muted-foreground">
            Each itinerary is a framework, not a script. Your guide carries the
            authority to abandon the plan the moment a leopard descends a fig
            tree. Transfers, park fees, camp accommodation, and full board
            included. Five of the registry's most requested routes below.
          </p>
        </header>

        <div className="mt-12 grid gap-6 sm:grid-cols-2">
          {featured.map((e, i) => (
            <ExpeditionCard key={e.slug} exp={e} priority={i < 2} />
          ))}
          <div className="reveal flex flex-col items-start justify-center rounded-xl border border-dashed p-8">
            <div className="font-mono-accent text-[11px] tracking-wide text-muted-foreground">
              Routes 01 – 12
            </div>
            <h3 className="font-display mt-2 text-3xl">
              The full registry holds{" "}
              <span className="text-primary italic">twelve</span> routes.
            </h3>
            <p className="mt-3 text-sm text-pretty text-muted-foreground">
              Walking valleys, gorilla highlands, flooded deltas, two souths
              and one sand sea — filter by region, season, or how far you like
              to be from a road.
            </p>
            <Button asChild className="mt-6">
              <Link to="/expeditions">
                Browse all expeditions <ArrowRight className="size-4" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}

const STEPS = [
  ["Route drafted", "28 days prior"],
  ["Guides briefed", "14 days prior"],
  ["Transfers confirmed", "72 hours prior"],
  ["First sighting", "Day one"],
] as const

export function Method() {
  return (
    <section
      id="method"
      className="mx-auto max-w-7xl px-5 py-24 sm:px-8 sm:py-32"
    >
      <div className="grid gap-12 lg:grid-cols-[16rem_1fr]">
        <div>
          <div className="font-mono-accent text-[11px] tracking-wide text-primary">
            The Method
          </div>
          <div className="font-display mt-2 text-3xl">A composed approach</div>
        </div>
        <div>
          <p className="font-display max-w-2xl text-2xl leading-snug sm:text-3xl">
            Every expedition begins with a{" "}
            <span className="text-primary italic">dossier</span> — a hand-bound
            brief of terrain notes, seasonal indicators, camp biographies, and a
            meteorological forecast, assembled by our research fellows in
            Nairobi and Cape Town. It arrives at your door four weeks before
            you do.
          </p>
          <div className="mt-12 grid gap-px overflow-hidden rounded-xl border bg-border sm:grid-cols-2 lg:grid-cols-4">
            {STEPS.map(([label, when], i) => (
              <div key={label} className="reveal bg-card p-6">
                <div className="font-mono-accent text-[11px] text-muted-foreground">
                  {String(i + 1).padStart(2, "0")}
                </div>
                <div className="mt-3 font-medium">{label}</div>
                <div className="font-mono-accent mt-1 text-sm text-primary">
                  {when}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export function Transfers() {
  return (
    <section id="transfers" className="bg-foreground text-background">
      <div className="mx-auto grid max-w-7xl gap-12 px-5 py-24 sm:px-8 sm:py-32 lg:grid-cols-[24rem_1fr]">
        <div>
          <div className="font-mono-accent text-[11px] tracking-wide text-background/60">
            Gateway Transfers
          </div>
          <h2 className="font-display mt-3 text-4xl leading-tight sm:text-5xl">
            From the gateway to the bush.
          </h2>
          <p className="mt-5 text-pretty text-background/70">
            Four tiers of transfer from every gateway airport in the registry —
            Nairobi, Kilimanjaro, Kigali, Maun, Windhoek, Cape Town, Marrakech
            — directly to camp. Drivers track your flight in real time, meet
            you past immigration, handle luggage, and brief you on day one en
            route.
          </p>
          <div className="font-mono-accent mt-6 inline-flex items-center gap-2 rounded-md border border-background/20 px-3 py-2 text-xs text-background/80">
            <ShieldCheck className="size-4" />
            24-hour flight monitoring · every gateway
          </div>
        </div>

        <div className="divide-y divide-background/10">
          {TRANSFERS.map((t, i) => (
            <div key={t.key} className="reveal flex items-center gap-5 py-5">
              <div className="font-mono-accent w-8 text-sm text-background/40">
                {String(i + 1).padStart(2, "0")}
              </div>
              <Plane className="size-5 shrink-0 text-background/60" />
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <h3 className="font-display text-xl">{t.name}</h3>
                  <Badge
                    variant="secondary"
                    className="font-mono-accent bg-background/15 text-[10px] text-background"
                  >
                    {t.tag}
                  </Badge>
                </div>
                <div className="text-sm text-background/75">
                  {t.desc} · {t.time}
                </div>
              </div>
              <div className="text-right">
                <div className="font-display text-xl">{fmt(t.price)}</div>
                <div className="font-mono-accent text-[10px] text-background/70">
                  {t.single ? "per charter" : "per traveller"}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

const CONSERVATION_PARTNERS = [
  "Northern Rangelands Trust",
  "Amboseli Trust for Elephants",
  "Gorilla Doctors",
  "Okavango Wilderness Project",
  "Save the Rhino Trust Namibia",
  "South Luangwa Conservation Society",
]

export function Conservation() {
  return (
    <section className="border-y bg-secondary/40">
      <div className="mx-auto grid max-w-7xl gap-12 px-5 py-24 sm:px-8 sm:py-32 lg:grid-cols-[24rem_1fr]">
        <div>
          <div className="font-mono-accent flex items-center gap-2 text-[11px] tracking-wide text-primary">
            <Leaf className="size-3.5" />
            The Levy
          </div>
          <h2 className="font-display mt-3 text-4xl leading-tight sm:text-5xl">
            Three percent, without exception.
          </h2>
          <p className="mt-5 text-pretty text-muted-foreground">
            Every invoice since MMXI has carried a three percent conservation
            levy, placed directly with the field organisations working the
            landscapes we travel — never a marketing fund, always a named
            project in your dossier.
          </p>
          <Button asChild variant="outline" className="mt-6">
            <Link to="/about#conservation">
              Where the levy lands <ArrowRight className="size-4" />
            </Link>
          </Button>
        </div>

        <div className="flex flex-col justify-center">
          <div className="grid gap-px overflow-hidden rounded-xl border bg-border sm:grid-cols-3">
            {(
              [
                ["USD 1.4M", "placed since MMXI"],
                ["6", "field partners"],
                ["100%", "traceable to project"],
              ] as const
            ).map(([value, label]) => (
              <div key={label} className="reveal bg-card p-6">
                <div className="font-display text-3xl">{value}</div>
                <div className="font-mono-accent mt-1 text-[11px] tracking-wide text-muted-foreground">
                  {label}
                </div>
              </div>
            ))}
          </div>
          <ul className="font-mono-accent mt-6 flex flex-wrap gap-x-6 gap-y-2 text-xs text-muted-foreground">
            {CONSERVATION_PARTNERS.map((p) => (
              <li key={p}>· {p}</li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}

export function Cta() {
  return (
    <section className="mx-auto max-w-7xl px-5 py-24 sm:px-8 sm:py-32">
      <div className="flex flex-col items-start justify-between gap-8 rounded-2xl border bg-secondary/50 p-10 sm:p-14 lg:flex-row lg:items-center">
        <div>
          <div className="font-mono-accent text-[11px] tracking-wide text-primary">
            Begin
          </div>
          <h2 className="font-display mt-3 text-4xl leading-tight sm:text-5xl">
            Your <span className="text-primary italic">dossier</span> is waiting
            <br className="hidden sm:block" /> to be composed.
          </h2>
        </div>
        <div className="flex flex-col items-start gap-3">
          <Button asChild size="lg">
            <Link to="/expeditions">
              Select an Expedition <ArrowRight className="size-4" />
            </Link>
          </Button>
          <div className="font-mono-accent text-sm text-muted-foreground">
            Or call · +254 20 440 1211 · 24/7 field desk
          </div>
        </div>
      </div>
    </section>
  )
}
