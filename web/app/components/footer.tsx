import { Link } from "react-router"

import { DESTINATIONS, FEATURED_EXPEDITIONS } from "~/lib/catalog"

const OFFICES = [
  ["Nairobi", "HQ · Riverside Drive"],
  ["Arusha", "Tanzania"],
  ["Kigali", "Rwanda"],
  ["Maun", "Botswana"],
  ["Cape Town", "South Africa"],
  ["London", "United Kingdom"],
] as const

export function Footer() {
  const featured = FEATURED_EXPEDITIONS()
  return (
    <footer className="border-t bg-background">
      <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8">
        <div className="grid gap-10 lg:grid-cols-[1.5fr_1fr_1fr_1fr]">
          <div>
            <div className="font-display text-xl">Nyika</div>
            <div className="font-mono-accent text-[10px] tracking-wide text-muted-foreground">
              African Expeditions · MMXI
            </div>
            <p className="mt-4 max-w-xs text-sm text-muted-foreground">
              Hand-composed expeditions across eight African territories,
              drafted from the second floor of a restored 1942 warehouse in
              Nairobi.
            </p>
            <div className="font-mono-accent mt-4 space-y-1 text-sm">
              <div>Riverside Drive, Westlands</div>
              <div>Nairobi 00100, Kenya</div>
              <div>+254 20 440 1211</div>
              <div>dossier@nyika.africa</div>
            </div>
          </div>

          <div>
            <div className="font-mono-accent text-[11px] tracking-wide text-muted-foreground">
              Destinations
            </div>
            <ul className="mt-3 space-y-2 text-sm">
              {DESTINATIONS.map((d) => (
                <li key={d.slug}>
                  <Link
                    to={`/destinations/${d.slug}`}
                    className="transition-colors hover:text-primary"
                  >
                    {d.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <div className="font-mono-accent text-[11px] tracking-wide text-muted-foreground">
              Expeditions
            </div>
            <ul className="mt-3 space-y-2 text-sm">
              {featured.map((e) => (
                <li key={e.slug}>
                  <Link
                    to={`/expeditions/${e.slug}`}
                    className="transition-colors hover:text-primary"
                  >
                    {e.name} · {e.sub}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  to="/expeditions"
                  className="text-primary transition-colors hover:opacity-80"
                >
                  All twelve routes →
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <div className="font-mono-accent text-[11px] tracking-wide text-muted-foreground">
              The Guild
            </div>
            <ul className="mt-3 space-y-2 text-sm">
              <li>
                <Link
                  to="/about"
                  className="transition-colors hover:text-primary"
                >
                  Our Story
                </Link>
              </li>
              <li>
                <Link
                  to="/about#conservation"
                  className="transition-colors hover:text-primary"
                >
                  Conservation
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="transition-colors hover:text-primary"
                >
                  Contact
                </Link>
              </li>
              <li>
                <Link
                  to="/privacy"
                  className="transition-colors hover:text-primary"
                >
                  Privacy
                </Link>
              </li>
              <li>
                <Link
                  to="/terms"
                  className="transition-colors hover:text-primary"
                >
                  Booking Terms
                </Link>
              </li>
            </ul>

            <div className="font-mono-accent mt-6 text-[11px] tracking-wide text-muted-foreground">
              Offices
            </div>
            <ul className="mt-3 space-y-1.5 text-sm">
              {OFFICES.map(([city, note]) => (
                <li key={city} className="flex justify-between gap-3">
                  <span>{city}</span>
                  <span className="font-mono-accent text-xs text-muted-foreground">
                    {note}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="font-mono-accent mt-12 flex flex-col gap-3 border-t pt-6 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <div>© MMXXVI Nyika Expeditions Ltd. · KATO No. 00412</div>
          <div className="flex flex-wrap gap-x-5 gap-y-1">
            <span>S 01°17′ · E 36°49′</span>
            <span>Composed in Nairobi</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
