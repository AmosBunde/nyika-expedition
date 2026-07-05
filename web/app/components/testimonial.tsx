import { Star } from "lucide-react"

const LETTERS = [
  {
    id: "LXXIII",
    quote:
      "We landed at midnight. By two we were drinking bush tea at a camp above the Mara. By six we watched a leopard descend a fig tree fifty metres from our Land Cruiser. Nyika moves as if the continent itself had been briefed on our arrival.",
    highlight:
      "Nyika moves as if the continent itself had been briefed on our arrival.",
    name: "H. Nakamura",
    detail: "Returning guest · Kyoto",
  },
  {
    id: "LXXXI",
    quote:
      "The dossier arrived four weeks out, hand-bound, with the Hoanib's fog charts annotated in pencil. My husband read it twice before we flew. Nothing in Namibia surprised us except how much still did.",
    name: "C. Baumann",
    detail: "Namib route · Zürich",
  },
  {
    id: "LXXXVI",
    quote:
      "Two gorilla treks, and it was the second — once the shaking stopped — where I finally watched. Our guide knew every animal's name, lineage, and mood before the trackers radioed.",
    name: "P. Almeida",
    detail: "Volcanoes route · São Paulo",
  },
]

export function Testimonial() {
  const [primary, ...rest] = LETTERS
  return (
    <section className="bg-secondary/40">
      <div className="mx-auto max-w-6xl px-5 py-24 sm:px-8 sm:py-32">
        <div className="text-center">
          <div className="font-mono-accent text-[11px] tracking-wide text-primary">
            Correspondence · Letter {primary.id}
          </div>
          <blockquote className="font-display mx-auto mt-8 max-w-4xl text-3xl leading-snug text-balance sm:text-4xl">
            “
            {primary.quote.replace(primary.highlight!, "")}
            <span className="text-primary">{primary.highlight}</span>”
          </blockquote>
          <div className="mt-8 flex flex-col items-center gap-2">
            <div className="flex items-center gap-0.5 text-primary">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="size-4 fill-current" />
              ))}
            </div>
            <div className="font-mono-accent text-sm text-muted-foreground">
              4.96 · 847 reviews across all routes
            </div>
            <div className="mt-1">
              <div className="font-medium">{primary.name}</div>
              <div className="text-sm text-muted-foreground">
                {primary.detail}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-14 grid gap-6 sm:grid-cols-2">
          {rest.map((l) => (
            <figure
              key={l.id}
              className="reveal rounded-xl border bg-card p-7"
            >
              <div className="font-mono-accent text-[10px] tracking-wide text-muted-foreground">
                Letter {l.id}
              </div>
              <blockquote className="font-display mt-3 text-xl leading-snug">
                “{l.quote}”
              </blockquote>
              <figcaption className="mt-4 text-sm">
                <span className="font-medium">{l.name}</span>
                <span className="text-muted-foreground"> · {l.detail}</span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  )
}
