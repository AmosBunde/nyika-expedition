import { ArrowRight } from "lucide-react"
import { Link } from "react-router"

import { type Destination, expeditionsFor } from "~/lib/catalog"

export function DestinationCard({
  dest,
  priority = false,
}: {
  dest: Destination
  priority?: boolean
}) {
  const routes = expeditionsFor(dest.slug).length
  return (
    <article className="reveal group relative overflow-hidden rounded-xl border">
      <div className="relative aspect-[4/5] overflow-hidden sm:aspect-[3/4]">
        <img
          src={dest.thumb}
          alt={dest.alt}
          width={800}
          height={1000}
          loading={priority ? "eager" : "lazy"}
          decoding="async"
          className="size-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/25" />

        <div className="font-mono-accent absolute inset-x-0 top-0 flex items-start justify-between p-4 text-[11px] tracking-wide text-white/80">
          <span>{dest.coords}</span>
          <span>
            {routes} {routes === 1 ? "route" : "routes"}
          </span>
        </div>

        <div className="absolute inset-x-0 bottom-0 p-5">
          <div className="font-mono-accent text-[11px] tracking-wide text-white/70">
            {dest.tagline}
          </div>
          <h3 className="font-display mt-1 text-3xl text-white">
            <Link
              to={`/destinations/${dest.slug}`}
              className="after:absolute after:inset-0 focus-visible:outline-none"
            >
              {dest.name}
            </Link>
          </h3>
          <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-white/80">
            {dest.blurb}
          </p>
          <div className="mt-3 inline-flex items-center gap-1.5 text-sm font-medium text-white">
            Open the territory{" "}
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
          </div>
        </div>
      </div>
    </article>
  )
}
