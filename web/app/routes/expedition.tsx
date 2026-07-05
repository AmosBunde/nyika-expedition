import * as React from "react"
import {
  ArrowRight,
  Check,
  Minus,
  Plane,
  ShieldCheck,
  Tent,
} from "lucide-react"
import { Link } from "react-router"

import type { Route } from "./+types/expedition"
import { PageHero } from "~/components/page-hero"
import { ExpeditionCard } from "~/components/expedition-card"
import { BookingModal } from "~/components/booking-modal"
import { Button } from "~/components/ui/button"
import {
  destinationBySlug,
  expeditionBySlug,
  expeditionsFor,
} from "~/lib/catalog"
import { TIERS, fmt } from "~/lib/booking"

const ORIGIN = "https://amosbunde.github.io/nyika-expedition/"

export function meta({ params }: Route.MetaArgs) {
  const exp = expeditionBySlug(params.slug)
  if (!exp) return [{ title: "Route not found · Nyika Expeditions" }]
  const title = `${exp.name} · ${exp.sub} · Expedition No. ${exp.num} · Nyika Expeditions`
  const url = `${ORIGIN}expeditions/${exp.slug}/`
  return [
    { title },
    { name: "description", content: exp.desc },
    { tagName: "link", rel: "canonical", href: url },
    { property: "og:title", content: title },
    { property: "og:description", content: exp.desc },
    { property: "og:type", content: "website" },
    { property: "og:url", content: url },
    { property: "og:image", content: exp.image },
    {
      "script:ld+json": {
        "@context": "https://schema.org",
        "@type": "TouristTrip",
        name: `${exp.name} · ${exp.sub}`,
        description: exp.desc,
        url,
        provider: { "@id": `${ORIGIN}#organization` },
        itinerary: {
          "@type": "ItemList",
          itemListElement: exp.itinerary.map((leg, i) => ({
            "@type": "ListItem",
            position: i + 1,
            name: leg.title,
          })),
        },
        offers: {
          "@type": "Offer",
          price: String(exp.price),
          priceCurrency: "USD",
          availability: "https://schema.org/InStock",
          url,
        },
      },
    },
  ]
}

export default function ExpeditionPage({ params }: Route.ComponentProps) {
  const exp = expeditionBySlug(params.slug)
  const [open, setOpen] = React.useState(false)

  if (!exp) {
    return (
      <div className="mx-auto flex min-h-[60svh] max-w-2xl flex-col items-start justify-center px-5 pt-24 sm:px-8">
        <div className="font-mono-accent text-[11px] tracking-wide text-primary">
          Off the map · 404
        </div>
        <h1 className="font-display mt-3 text-4xl">
          No such route in the registry.
        </h1>
        <Button asChild className="mt-6">
          <Link to="/expeditions">Browse all twelve routes</Link>
        </Button>
      </div>
    )
  }

  const dest = destinationBySlug(exp.destination)
  const related = expeditionsFor(exp.destination).filter(
    (e) => e.slug !== exp.slug
  )

  return (
    <>
      <PageHero
        image={exp.image.replace("w=1200", "w=2000")}
        alt={exp.alt}
        crumbs={[
          { to: "/", label: "Field Log" },
          { to: "/expeditions", label: "Registry" },
          ...(dest
            ? [{ to: `/destinations/${dest.slug}`, label: dest.name }]
            : []),
        ]}
        kicker={`Expedition No. ${exp.num} · ${exp.region}`}
        title={
          <>
            {exp.name}
            <span className="block text-3xl text-white/80 italic sm:text-5xl">
              {exp.sub}
            </span>
          </>
        }
        meta={`${exp.coords}\nSeason · ${exp.season}`}
      >
        {/* Stat strip + primary CTA */}
        <div className="mt-10 flex flex-col gap-6 border-t border-white/15 pt-6 lg:flex-row lg:items-end lg:justify-between">
          <dl className="flex flex-wrap gap-x-10 gap-y-4">
            {(
              [
                ["Duration", `${exp.days} days · ${exp.nights} nights`],
                ["Group", `${exp.group} travellers`],
                ["Level", exp.level],
                ["From", `${fmt(exp.price)} pp`],
              ] as [string, string][]
            ).map(([k, v]) => (
              <div key={k}>
                <dt className="font-mono-accent text-[10px] tracking-wide text-white/60 uppercase">
                  {k}
                </dt>
                <dd className="font-display mt-1 text-xl text-white sm:text-2xl">
                  {v}
                </dd>
              </div>
            ))}
          </dl>
          <Button size="lg" onClick={() => setOpen(true)}>
            Reserve this Expedition <ArrowRight className="size-4" />
          </Button>
        </div>
      </PageHero>

      {/* Overview + booking aside */}
      <section className="mx-auto grid max-w-7xl gap-12 px-5 py-20 sm:px-8 sm:py-24 lg:grid-cols-[1fr_20rem]">
        <div>
          <div className="font-mono-accent text-[11px] tracking-wide text-primary">
            The Brief
          </div>
          <div className="mt-5 space-y-5">
            {exp.overview.map((p, i) => (
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

          {/* Itinerary */}
          <div className="mt-16">
            <div className="font-mono-accent text-[11px] tracking-wide text-primary">
              Day by Day
            </div>
            <h2 className="font-display mt-3 text-3xl sm:text-4xl">
              The route, as drafted
            </h2>
            <p className="mt-3 max-w-xl text-sm text-muted-foreground">
              Drafted, not fixed — your guide re-routes the moment the field
              suggests better.
            </p>

            <ol className="mt-10 space-y-0 border-l">
              {exp.itinerary.map((leg) => (
                <li key={leg.days} className="reveal relative pb-10 pl-8">
                  <span
                    aria-hidden
                    className="absolute top-1.5 -left-[5px] size-2.5 rounded-full border-2 border-primary bg-background"
                  />
                  <div className="font-mono-accent text-[11px] tracking-wide text-muted-foreground">
                    Day {leg.days}
                  </div>
                  <h3 className="font-display mt-1 text-2xl">{leg.title}</h3>
                  <p className="mt-2 max-w-2xl leading-relaxed text-pretty text-muted-foreground">
                    {leg.body}
                  </p>
                  {leg.camp && (
                    <div className="font-mono-accent mt-3 inline-flex items-center gap-1.5 rounded-md border px-2.5 py-1 text-xs text-muted-foreground">
                      <Tent className="size-3.5 text-primary" />
                      {leg.camp}
                    </div>
                  )}
                </li>
              ))}
            </ol>
          </div>

          {/* Included / not included */}
          <div className="mt-12 grid gap-6 sm:grid-cols-2">
            <div className="rounded-xl border bg-secondary/40 p-6">
              <div className="font-mono-accent text-[11px] tracking-wide text-primary">
                Included
              </div>
              <ul className="mt-4 space-y-2.5">
                {exp.includes.map((item) => (
                  <li key={item} className="flex gap-2.5 text-sm">
                    <Check className="mt-0.5 size-4 shrink-0 text-primary" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-xl border p-6">
              <div className="font-mono-accent text-[11px] tracking-wide text-muted-foreground">
                Not included
              </div>
              <ul className="mt-4 space-y-2.5">
                {exp.excludes.map((item) => (
                  <li
                    key={item}
                    className="flex gap-2.5 text-sm text-muted-foreground"
                  >
                    <Minus className="mt-0.5 size-4 shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Booking aside */}
        <aside className="h-fit rounded-xl border bg-secondary/40 p-6 lg:sticky lg:top-24">
          <div className="font-mono-accent text-[11px] tracking-wide text-muted-foreground">
            Expedition No. {exp.num}
          </div>
          <div className="mt-3 flex items-baseline justify-between">
            <div>
              <div className="font-mono-accent text-[10px] tracking-wide text-muted-foreground">
                From · per traveller
              </div>
              <div className="font-display text-3xl">{fmt(exp.price)}</div>
            </div>
            <div className="font-mono-accent text-right text-xs text-muted-foreground">
              {exp.days}d / {exp.nights}n
            </div>
          </div>

          <div className="mt-5 space-y-2 border-t pt-4">
            {TIERS.map((t) => (
              <div
                key={t.key}
                className="flex items-baseline justify-between text-sm"
              >
                <span>{t.label}</span>
                <span className="font-mono-accent text-muted-foreground">
                  {fmt(exp.price * t.mult)} pp
                </span>
              </div>
            ))}
          </div>

          {dest && (
            <div className="mt-4 flex items-start gap-2 border-t pt-4 text-sm text-muted-foreground">
              <Plane className="mt-0.5 size-4 shrink-0 text-primary" />
              <span>
                Gateway · {dest.gateway.airport} ({dest.gateway.code}),{" "}
                {dest.gateway.city}
              </span>
            </div>
          )}

          <Button size="lg" className="mt-5 w-full" onClick={() => setOpen(true)}>
            Reserve this Expedition <ArrowRight className="size-4" />
          </Button>

          <div className="mt-4 flex items-start gap-2 rounded-md bg-background/60 p-3 text-xs text-muted-foreground">
            <ShieldCheck className="mt-0.5 size-4 shrink-0 text-primary" />
            <span>
              Refundable up to 30 days prior. Emergency evacuation cover and
              the 3% conservation levy included.
            </span>
          </div>
        </aside>
      </section>

      {/* Camps */}
      <section className="border-y bg-secondary/30">
        <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-20">
          <div className="font-mono-accent text-[11px] tracking-wide text-primary">
            The Camps
          </div>
          <h2 className="font-display mt-3 text-3xl sm:text-4xl">
            Where you sleep
          </h2>
          <div className="mt-8 grid gap-px overflow-hidden rounded-xl border bg-border sm:grid-cols-3">
            {exp.camps.map((camp, i) => (
              <div key={camp} className="reveal bg-card p-6">
                <div className="font-mono-accent text-[11px] text-muted-foreground">
                  {String(i + 1).padStart(2, "0")}
                </div>
                <div className="mt-3 flex items-center gap-2 font-medium">
                  <Tent className="size-4 text-primary" />
                  {camp}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Related routes */}
      {related.length > 0 && dest && (
        <section className="mx-auto max-w-7xl px-5 py-20 sm:px-8 sm:py-24">
          <header className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
            <div>
              <div className="font-mono-accent text-[11px] tracking-wide text-primary">
                Same territory
              </div>
              <h2 className="font-display mt-3 text-3xl sm:text-4xl">
                Other routes in {dest.name}
              </h2>
            </div>
            <Button asChild variant="outline">
              <Link to={`/destinations/${dest.slug}`}>
                The {dest.name} territory <ArrowRight className="size-4" />
              </Link>
            </Button>
          </header>
          <div className="mt-10 grid gap-6 sm:grid-cols-2">
            {related.map((e) => (
              <ExpeditionCard key={e.slug} exp={e} />
            ))}
          </div>
        </section>
      )}

      <BookingModal tour={exp} open={open} onOpenChange={setOpen} />
    </>
  )
}
