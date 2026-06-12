import { ArrowRight } from "lucide-react"

import { TOUR_LIST, type Tour, fmt } from "~/lib/tours"
import { cn } from "~/lib/utils"

export function Expeditions({
  onReserve,
}: {
  onReserve: (tour: Tour) => void
}) {
  return (
    <section
      id="expeditions"
      className="mx-auto max-w-7xl px-5 py-24 sm:px-8 sm:py-32"
    >
      <header className="max-w-2xl">
        <div className="font-mono-accent text-[11px] tracking-wide text-primary">
          The Expeditions · MMXXVI
        </div>
        <h2 className="font-display mt-3 text-4xl leading-tight sm:text-5xl">
          Four routes. Fully outfitted.
        </h2>
        <p className="mt-4 text-pretty text-muted-foreground">
          Each itinerary is a framework, not a script. Your guide carries the
          authority to abandon the plan the moment a leopard descends a fig
          tree. Transfers, park fees, camp accommodation, and full board
          included.
        </p>
      </header>

      <div className="mt-12 grid gap-6 sm:grid-cols-2">
        {TOUR_LIST.map((tour, i) => (
          <TourCard
            key={tour.slug}
            tour={tour}
            onReserve={onReserve}
            priority={i < 2}
          />
        ))}
      </div>
    </section>
  )
}

function TourCard({
  tour,
  onReserve,
  priority,
}: {
  tour: Tour
  onReserve: (tour: Tour) => void
  priority: boolean
}) {
  return (
    <article
      className={cn(
        "reveal group flex flex-col overflow-hidden rounded-xl border bg-card transition-shadow hover:shadow-lg"
      )}
    >
      <button
        type="button"
        onClick={() => onReserve(tour)}
        className="relative aspect-[16/10] overflow-hidden text-left focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none focus-visible:ring-inset"
        aria-label={`Reserve the ${tour.name} expedition`}
      >
        <img
          src={tour.image}
          alt={tour.alt}
          width={1200}
          height={750}
          loading={priority ? "eager" : "lazy"}
          decoding="async"
          className="size-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/55 to-transparent" />
        <div className="font-mono-accent absolute inset-x-0 bottom-0 flex items-end justify-between p-4 text-[11px] tracking-wide text-white/85">
          <span>No. {tour.num}</span>
          <span>{tour.coords}</span>
        </div>
        <div className="font-display absolute top-3 right-4 text-3xl text-white">
          {tour.days}
          <span className="align-top text-base">D</span>
        </div>
      </button>

      <div className="flex flex-1 flex-col p-6">
        <div className="flex items-baseline justify-between">
          <h3 className="font-display text-2xl">{tour.name}</h3>
          <span className="font-mono-accent text-xs text-muted-foreground">
            {tour.region}
          </span>
        </div>
        <div className="text-sm text-primary">{tour.sub}</div>
        <p className="mt-3 text-sm leading-relaxed text-pretty text-muted-foreground">
          {tour.desc}
        </p>

        <dl className="mt-5 grid grid-cols-4 gap-2 border-y py-3 text-center">
          {(
            [
              ["Days", `${tour.days}/${tour.nights}`],
              ["Group", tour.group],
              ["Level", tour.level],
              ["Season", tour.season.split(" ")[0]],
            ] as [string, string][]
          ).map(([k, v]) => (
            <div key={k}>
              <dt className="font-mono-accent text-[9px] tracking-wide text-muted-foreground uppercase">
                {k}
              </dt>
              <dd className="mt-0.5 text-sm font-medium">{v}</dd>
            </div>
          ))}
        </dl>

        <div className="mt-auto flex items-center justify-between pt-5">
          <div>
            <div className="font-mono-accent text-[10px] tracking-wide text-muted-foreground">
              From · per traveller
            </div>
            <div className="font-display text-2xl">{fmt(tour.price)}</div>
          </div>
          <button
            type="button"
            onClick={() => onReserve(tour)}
            className="inline-flex items-center gap-1.5 rounded-md bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:outline-none"
          >
            Reserve <ArrowRight className="size-4" />
          </button>
        </div>
      </div>
    </article>
  )
}
