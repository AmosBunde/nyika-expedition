import { ArrowRight, CalendarRange, Plane } from "lucide-react"
import { Link } from "react-router"

import type { Route } from "./+types/destination"
import { PageHero } from "~/components/page-hero"
import { ExpeditionCard } from "~/components/expedition-card"
import { Button } from "~/components/ui/button"
import {
  destinationBySlug,
  expeditionsFor,
  regionOf,
} from "~/lib/catalog"

const ORIGIN = "https://amosbunde.github.io/nyika-expedition/"

export function meta({ params }: Route.MetaArgs) {
  const dest = destinationBySlug(params.slug)
  if (!dest) return [{ title: "Territory not found · Nyika Expeditions" }]
  const title = `${dest.name} · ${dest.tagline} · Nyika Expeditions`
  const url = `${ORIGIN}destinations/${dest.slug}/`
  return [
    { title },
    { name: "description", content: dest.blurb },
    { tagName: "link", rel: "canonical", href: url },
    { property: "og:title", content: title },
    { property: "og:description", content: dest.blurb },
    { property: "og:type", content: "website" },
    { property: "og:url", content: url },
    { property: "og:image", content: dest.image },
    {
      "script:ld+json": {
        "@context": "https://schema.org",
        "@type": "TouristDestination",
        name: `${dest.name} — ${dest.tagline}`,
        description: dest.blurb,
        url,
        touristType: "Luxury expedition travellers",
        geo: { "@type": "GeoCoordinates", name: dest.coords },
      },
    },
  ]
}

export default function DestinationPage({ params }: Route.ComponentProps) {
  const dest = destinationBySlug(params.slug)

  if (!dest) {
    return (
      <div className="mx-auto flex min-h-[60svh] max-w-2xl flex-col items-start justify-center px-5 pt-24 sm:px-8">
        <div className="font-mono-accent text-[11px] tracking-wide text-primary">
          Off the map · 404
        </div>
        <h1 className="font-display mt-3 text-4xl">
          No such territory in the registry.
        </h1>
        <Button asChild className="mt-6">
          <Link to="/destinations">All eight territories</Link>
        </Button>
      </div>
    )
  }

  const region = regionOf(dest)
  const expeditions = expeditionsFor(dest.slug)

  return (
    <>
      <PageHero
        image={dest.image}
        alt={dest.alt}
        crumbs={[
          { to: "/", label: "Field Log" },
          { to: "/destinations", label: "Territories" },
        ]}
        kicker={`${region.name} · ${dest.tagline}`}
        title={dest.name}
        intro={dest.blurb}
        meta={`${dest.coords}\nGateway · ${dest.gateway.code}`}
      />

      {/* Overview + practical file */}
      <section className="mx-auto grid max-w-7xl gap-12 px-5 py-20 sm:px-8 sm:py-24 lg:grid-cols-[1fr_20rem]">
        <div>
          <div className="font-mono-accent text-[11px] tracking-wide text-primary">
            The Territory
          </div>
          <div className="mt-5 space-y-5">
            {dest.overview.map((p, i) => (
              <p
                key={i}
                className={
                  i === 0
                    ? "font-display text-2xl leading-snug sm:text-3xl"
                    : "max-w-2xl leading-relaxed text-pretty text-muted-foreground"
                }
              >
                {p}
              </p>
            ))}
          </div>
        </div>

        <aside className="h-fit rounded-xl border bg-secondary/40 p-6 lg:sticky lg:top-24">
          <div className="font-mono-accent text-[11px] tracking-wide text-muted-foreground">
            Territory File · {dest.coords}
          </div>
          <dl className="mt-4 space-y-4 text-sm">
            <div>
              <dt className="font-mono-accent flex items-center gap-1.5 text-[10px] tracking-wide text-muted-foreground uppercase">
                <Plane className="size-3.5" /> Gateway
              </dt>
              <dd className="mt-1">
                {dest.gateway.airport} ({dest.gateway.code}) ·{" "}
                {dest.gateway.city}
              </dd>
            </div>
            <div>
              <dt className="font-mono-accent flex items-center gap-1.5 text-[10px] tracking-wide text-muted-foreground uppercase">
                <CalendarRange className="size-3.5" /> Best time
              </dt>
              <dd className="mt-1">{dest.bestTime}</dd>
            </div>
            {dest.facts.map(([label, value]) => (
              <div key={label}>
                <dt className="font-mono-accent text-[10px] tracking-wide text-muted-foreground uppercase">
                  {label}
                </dt>
                <dd className="mt-1">{value}</dd>
              </div>
            ))}
          </dl>
        </aside>
      </section>

      {/* Seasons */}
      <section className="border-y bg-secondary/30">
        <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-20">
          <div className="font-mono-accent text-[11px] tracking-wide text-primary">
            The Calendar
          </div>
          <h2 className="font-display mt-3 text-3xl sm:text-4xl">
            When to go
          </h2>
          <div className="mt-8 grid gap-px overflow-hidden rounded-xl border bg-border sm:grid-cols-3">
            {dest.seasons.map((s) => (
              <div key={s.months} className="reveal bg-card p-6">
                <div className="font-mono-accent text-sm text-primary">
                  {s.months}
                </div>
                <div className="mt-2 font-medium">{s.label}</div>
                <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                  {s.note}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Expeditions here */}
      <section className="mx-auto max-w-7xl px-5 py-20 sm:px-8 sm:py-24">
        <header className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
          <div>
            <div className="font-mono-accent text-[11px] tracking-wide text-primary">
              Routes in this territory ·{" "}
              {String(expeditions.length).padStart(2, "0")}
            </div>
            <h2 className="font-display mt-3 text-3xl sm:text-4xl">
              The {dest.name} expeditions
            </h2>
          </div>
          <Button asChild variant="outline">
            <Link to="/expeditions">
              Full registry <ArrowRight className="size-4" />
            </Link>
          </Button>
        </header>
        <div className="mt-10 grid gap-6 sm:grid-cols-2">
          {expeditions.map((e) => (
            <ExpeditionCard key={e.slug} exp={e} />
          ))}
        </div>
      </section>
    </>
  )
}
