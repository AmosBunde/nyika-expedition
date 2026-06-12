import { ArrowRight, Plane, ShieldCheck } from "lucide-react"
import { Link } from "react-router"

import { Button } from "~/components/ui/button"
import { Badge } from "~/components/ui/badge"
import { TRANSFERS, fmt } from "~/lib/tours"

const CREDENTIALS = [
  ["KATO", "No. 00412"],
  ["KWS", "Partner"],
  ["B-Corp", "Certified"],
  ["ISO", "9001:2015"],
  ["PAWS", "Founding"],
  ["ATTA", "Member"],
] as const

export function Credentials() {
  return (
    <section className="border-y bg-secondary/40">
      <div className="mx-auto flex max-w-7xl flex-col gap-6 px-5 py-8 sm:px-8 lg:flex-row lg:items-center lg:gap-12">
        <div className="font-mono-accent shrink-0 text-[11px] tracking-wide text-muted-foreground">
          Accredited &amp; Certified
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
            meteorological forecast, assembled by our research fellow in
            Nairobi. It arrives at your door four weeks before you do.
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
            Airport Transfers
          </div>
          <h2 className="font-display mt-3 text-4xl leading-tight sm:text-5xl">
            From JKIA to the bush.
          </h2>
          <p className="mt-5 text-pretty text-background/70">
            Four tiers of transfer from Jomo Kenyatta International or Wilson
            Airport directly to camp. Drivers track your flight in real time,
            meet you past immigration, handle luggage, and brief you on day one
            en route.
          </p>
          <div className="font-mono-accent mt-6 inline-flex items-center gap-2 rounded-md border border-background/20 px-3 py-2 text-xs text-background/80">
            <ShieldCheck className="size-4" />
            24-hour flight monitoring
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
            <a href="#expeditions">
              Select an Expedition <ArrowRight className="size-4" />
            </a>
          </Button>
          <div className="font-mono-accent text-sm text-muted-foreground">
            Or call · +254 20 440 1211
          </div>
        </div>
      </div>
    </section>
  )
}

const FOOTER_COLS = [
  {
    title: "Expeditions",
    links: [
      "Maasai Mara",
      "Amboseli",
      "Samburu",
      "Laikipia",
      "Private Journeys",
    ],
  },
  {
    title: "Offices",
    links: ["Nairobi · HQ", "Arusha · TZ", "Kigali · RW", "London · UK"],
  },
  {
    title: "The Guild",
    links: ["Field Journal", "Our Guides", "Conservation", "Press"],
  },
] as const

export function Footer() {
  return (
    <footer id="guild" className="border-t bg-background">
      <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8">
        <div className="grid gap-10 lg:grid-cols-[1.5fr_1fr_1fr_1fr]">
          <div>
            <div className="font-display text-xl">Nyika</div>
            <div className="font-mono-accent text-[10px] tracking-wide text-muted-foreground">
              Expeditions · MMXI
            </div>
            <p className="mt-4 max-w-xs text-sm text-muted-foreground">
              Riverside Drive, Westlands. We occupy the second floor of a
              restored 1942 warehouse, six blocks from Wilson Airport.
            </p>
            <div className="font-mono-accent mt-4 space-y-1 text-sm">
              <div>Nairobi 00100, Kenya</div>
              <div>+254 20 440 1211</div>
              <div>dossier@nyika.co.ke</div>
            </div>
          </div>
          {FOOTER_COLS.map((col) => (
            <div key={col.title}>
              <div className="font-mono-accent text-[11px] tracking-wide text-muted-foreground">
                {col.title}
              </div>
              <ul className="mt-3 space-y-2 text-sm">
                {col.links.map((l) => (
                  <li key={l}>
                    <a
                      href="#expeditions"
                      className="transition-colors hover:text-primary"
                    >
                      {l}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="font-mono-accent mt-12 flex flex-col gap-3 border-t pt-6 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <div>© MMXXVI Nyika Expeditions Ltd. · KATO No. 00412</div>
          <div className="flex flex-wrap gap-x-5 gap-y-1">
            <Link to="/privacy" className="hover:text-foreground">
              Privacy
            </Link>
            <Link to="/terms" className="hover:text-foreground">
              Terms
            </Link>
            <span>S 01°17′ · E 36°49′</span>
            <span>Composed in Nairobi</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
