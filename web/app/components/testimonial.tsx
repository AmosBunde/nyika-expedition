import { Star } from "lucide-react"

export function Testimonial() {
  return (
    <section className="bg-secondary/40">
      <div className="mx-auto max-w-4xl px-5 py-24 text-center sm:px-8 sm:py-32">
        <div className="font-mono-accent text-[11px] tracking-wide text-primary">
          Correspondence · Letter LXXIII
        </div>
        <blockquote className="font-display mt-8 text-3xl leading-snug text-balance sm:text-4xl">
          “We landed at midnight. By two we were drinking bush tea at a camp
          above the Mara. By six we watched a leopard descend a fig tree fifty
          metres from our Land Cruiser.{" "}
          <span className="text-primary">
            Nyika moves as if the continent itself had been briefed on our
            arrival.
          </span>
          ”
        </blockquote>
        <div className="mt-10 flex flex-col items-center gap-2">
          <div className="flex items-center gap-0.5 text-primary">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} className="size-4 fill-current" />
            ))}
          </div>
          <div className="font-mono-accent text-sm text-muted-foreground">
            4.96 · 847 reviews
          </div>
          <div className="mt-2">
            <div className="font-medium">H. Nakamura</div>
            <div className="text-sm text-muted-foreground">
              Returning guest · Kyoto
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
