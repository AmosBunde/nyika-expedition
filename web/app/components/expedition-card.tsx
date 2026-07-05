import { ArrowRight } from "lucide-react"
import { Link } from "react-router"

import { type Expedition } from "~/lib/catalog"
import { fmt } from "~/lib/booking"

export function ExpeditionCard({
  exp,
  priority = false,
}: {
  exp: Expedition
  priority?: boolean
}) {
  return (
    <article className="reveal group relative flex flex-col overflow-hidden rounded-xl border bg-card transition-shadow hover:shadow-lg">
      <div className="relative aspect-[16/10] overflow-hidden">
        <img
          src={exp.image}
          alt={exp.alt}
          width={1200}
          height={750}
          loading={priority ? "eager" : "lazy"}
          decoding="async"
          className="size-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/55 to-transparent" />
        <div className="font-mono-accent absolute inset-x-0 bottom-0 flex items-end justify-between p-4 text-[11px] tracking-wide text-white/85">
          <span>No. {exp.num}</span>
          <span>{exp.coords}</span>
        </div>
        <div className="font-display absolute top-3 right-4 text-3xl text-white">
          {exp.days}
          <span className="align-top text-base">D</span>
        </div>
      </div>

      <div className="flex flex-1 flex-col p-6">
        <div className="flex items-baseline justify-between gap-3">
          <h3 className="font-display text-2xl">
            <Link
              to={`/expeditions/${exp.slug}`}
              className="after:absolute after:inset-0 focus-visible:outline-none"
            >
              {exp.name}
            </Link>
          </h3>
          <span className="font-mono-accent text-right text-xs text-muted-foreground">
            {exp.region}
          </span>
        </div>
        <div className="text-sm text-primary">{exp.sub}</div>
        <p className="mt-3 text-sm leading-relaxed text-pretty text-muted-foreground">
          {exp.desc}
        </p>

        <dl className="mt-5 grid grid-cols-4 gap-2 border-y py-3 text-center">
          {(
            [
              ["Days", `${exp.days}/${exp.nights}`],
              ["Group", exp.group],
              ["Level", exp.level],
              ["Season", exp.season.split(" ")[0]],
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
            <div className="font-display text-2xl">{fmt(exp.price)}</div>
          </div>
          <span className="inline-flex items-center gap-1.5 rounded-md bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground transition-colors group-hover:bg-primary/90">
            View Dossier <ArrowRight className="size-4" />
          </span>
        </div>
      </div>
    </article>
  )
}
