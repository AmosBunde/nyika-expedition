import { ArrowRight } from "lucide-react"
import { Link } from "react-router"

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
          <div>Nairobi · Registry of Routes</div>
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

        <div className="mt-10 flex flex-col gap-8 border-t border-white/15 pt-8 lg:flex-row lg:items-end lg:justify-between">
          <p className="max-w-xl text-base leading-relaxed text-balance text-white/80 sm:text-lg">
            Fifteen years of quiet expedition work, now across the whole
            continent — from the Mara's river crossings to the Namib's fog
            coast, the Okavango's flooded channels to the last dunes of the
            Sahara. Guides born to their landscapes, camps leased from the
            communities who own the land.
          </p>
          <div className="flex flex-wrap items-end gap-x-10 gap-y-6">
            {(
              [
                ["Territories", "8"],
                ["Routes", "12"],
                ["Departures · 2026", "184"],
              ] as const
            ).map(([label, value]) => (
              <div key={label}>
                <div className="font-mono-accent text-[11px] tracking-wide text-white/60">
                  {label}
                </div>
                <div className="font-display text-4xl text-white">{value}</div>
              </div>
            ))}
            <div className="flex items-center gap-3">
              <Button asChild size="lg">
                <Link to="/expeditions">
                  Begin Booking <ArrowRight className="size-4" />
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-white/40 bg-transparent text-white hover:bg-white/10 hover:text-white"
              >
                <Link to="/destinations">The Territories</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
