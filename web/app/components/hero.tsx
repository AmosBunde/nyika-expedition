import { ArrowRight } from "lucide-react"
import { Button } from "~/components/ui/button"

const HERO_IMG =
  "https://images.unsplash.com/photo-1489392191049-fc10c97e64b6?w=2400&q=85&auto=format&fit=crop"

export function Hero() {
  return (
    <section className="relative flex min-h-svh items-end overflow-hidden">
      <img
        src={HERO_IMG}
        alt="Mount Kilimanjaro rising above the plains of Amboseli National Park, Kenya"
        width={2400}
        height={1600}
        loading="eager"
        fetchPriority="high"
        decoding="async"
        className="absolute inset-0 size-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/45 to-black/55" />

      {/* Top metadata bar */}
      <div className="font-mono-accent absolute inset-x-0 top-16 z-10 mx-auto flex max-w-7xl items-center justify-between px-5 pt-6 text-[11px] tracking-wide text-white/80 sm:px-8">
        <div>
          <div className="text-white/90">Field Log · Vol IV</div>
          <div>Season MMXXVI</div>
        </div>
        <div className="text-right">
          <div className="text-white/90">S 01°17′ · E 36°49′</div>
          <div>Nairobi, Kenya</div>
        </div>
      </div>

      <div className="relative z-10 mx-auto w-full max-w-7xl px-5 pb-14 sm:px-8 sm:pb-20">
        <div className="font-mono-accent text-xs tracking-wide text-white/70">
          — Chapter One · A Continent, Unhurried —
        </div>
        <h1 className="font-display mt-4 max-w-4xl text-5xl leading-[0.98] text-white sm:text-7xl lg:text-8xl">
          We do not <span className="text-white/90 italic">run</span> safaris.
          <br />
          We <span className="text-[oklch(0.78_0.1_140)] italic">
            compose
          </span>{" "}
          them.
        </h1>

        <div className="mt-10 flex flex-col gap-8 border-t border-white/15 pt-8 sm:flex-row sm:items-end sm:justify-between">
          <p className="max-w-xl text-base leading-relaxed text-balance text-white/80 sm:text-lg">
            Fifteen years of quiet expedition work across East Africa. Guides
            born to this landscape, camps leased from the communities who own
            the land, logistics handled before your flight lands.
          </p>
          <div className="flex items-center gap-6">
            <div>
              <div className="font-mono-accent text-[11px] tracking-wide text-white/60">
                Current departures
              </div>
              <div className="font-display text-4xl text-white">184</div>
              <div className="font-mono-accent text-[11px] text-white/60">
                across the 2026 season
              </div>
            </div>
            <Button asChild size="lg">
              <a href="#expeditions">
                Begin Booking <ArrowRight className="size-4" />
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
