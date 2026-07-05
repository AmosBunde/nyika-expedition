import * as React from "react"

import { PageHero } from "~/components/page-hero"
import { ExpeditionCard } from "~/components/expedition-card"
import { useReveal } from "~/lib/use-scroll"
import { cn } from "~/lib/utils"
import {
  EXPEDITIONS,
  REGIONS,
  type RegionKey,
  destinationBySlug,
} from "~/lib/catalog"

const ORIGIN = "https://amosbunde.github.io/nyika-expedition/"

export function meta() {
  const title = "Expeditions · Twelve Routes Across Africa · Nyika Expeditions"
  const description =
    "The full Nyika registry: twelve hand-composed expeditions across eight African territories — migration corridors, gorilla highlands, flooded deltas, walking valleys, desert coasts, and one sand sea."
  return [
    { title },
    { name: "description", content: description },
    { tagName: "link", rel: "canonical", href: `${ORIGIN}expeditions/` },
    { property: "og:title", content: title },
    { property: "og:description", content: description },
    { property: "og:type", content: "website" },
  ]
}

type Filter = "all" | RegionKey

export default function Expeditions() {
  const [filter, setFilter] = React.useState<Filter>("all")
  // Re-observe .reveal cards whenever the filter remounts them.
  useReveal(filter)

  const visible = EXPEDITIONS.filter(
    (e) =>
      filter === "all" || destinationBySlug(e.destination)?.region === filter
  )

  return (
    <>
      <PageHero
        compact
        image="https://images.unsplash.com/photo-1535082623926-b39352a03fb7?w=2000&q=85&auto=format&fit=crop"
        alt="Wildebeest herd and safari vehicle on the open plains of the Maasai Mara, Kenya"
        kicker="The Registry · MMXXVI"
        title={
          <>
            Twelve routes.
            <br />
            Fully outfitted.
          </>
        }
        intro="Each itinerary is a framework, not a script. Your guide carries the authority to abandon the plan the moment a leopard descends a fig tree."
        meta={"Routes 01 – 12\n184 departures · 2026"}
      />

      <section className="mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-20">
        {/* Region filter */}
        <div
          role="group"
          aria-label="Filter expeditions by region"
          className="flex flex-wrap items-center gap-2"
        >
          {(
            [
              { key: "all" as const, label: "All routes" },
              ...REGIONS.map((r) => ({ key: r.key, label: r.name })),
            ] as { key: Filter; label: string }[]
          ).map((f) => (
            <button
              key={f.key}
              type="button"
              onClick={() => setFilter(f.key)}
              aria-pressed={filter === f.key}
              className={cn(
                "rounded-md border px-4 py-2 text-sm transition-colors",
                filter === f.key
                  ? "border-primary bg-primary text-primary-foreground"
                  : "hover:border-primary/50 hover:text-primary"
              )}
            >
              {f.label}
            </button>
          ))}
          <span className="font-mono-accent ml-auto text-xs text-muted-foreground">
            {String(visible.length).padStart(2, "0")} of{" "}
            {String(EXPEDITIONS.length).padStart(2, "0")} routes
          </span>
        </div>

        <div className="mt-10 grid gap-6 sm:grid-cols-2">
          {visible.map((e, i) => (
            <ExpeditionCard key={e.slug} exp={e} priority={i < 2} />
          ))}
        </div>
      </section>
    </>
  )
}
