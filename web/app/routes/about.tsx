import { ArrowRight, Leaf } from "lucide-react"
import { Link } from "react-router"

import { PageHero } from "~/components/page-hero"
import { Button } from "~/components/ui/button"

const ORIGIN = "https://amosbunde.github.io/nyika-expedition/"

export function meta() {
  const title = "The Guild · Our Story, Guides & Conservation · Nyika Expeditions"
  const description =
    "Founded in Nairobi in 2011, Nyika Expeditions composes expeditions across eight African territories. Meet the guild: resident guides, a 24/7 field desk, and a conservation levy on every invoice."
  return [
    { title },
    { name: "description", content: description },
    { tagName: "link", rel: "canonical", href: `${ORIGIN}about/` },
    { property: "og:title", content: title },
    { property: "og:description", content: description },
    { property: "og:type", content: "website" },
  ]
}

const TIMELINE = [
  ["MMXI", "Nairobi", "Founded above a Westlands warehouse; four Kenya routes."],
  ["MMXIII", "Arusha", "Tanzania desk opens; the Serengeti joins the registry."],
  ["MMXVII", "Kigali", "Rwanda operation licensed; first gorilla permits held."],
  ["MMXIX", "Maun · Cape Town", "Southern Africa portfolio composed."],
  ["MMXXII", "London", "European client desk; ATOL protection secured."],
  ["MMXXVI", "The Continent", "Eight territories, twelve routes, 184 departures."],
] as const

const NUMBERS = [
  ["38", "resident guides"],
  ["15", "years in the field"],
  ["8", "territories"],
  ["24/7", "field operations desk"],
] as const

const PARTNERS = [
  [
    "Northern Rangelands Trust",
    "Community conservancy network · northern Kenya",
  ],
  ["Amboseli Trust for Elephants", "Fifty-year elephant study · Kenya"],
  ["Gorilla Doctors", "Veterinary care for wild gorillas · Rwanda"],
  ["Okavango Wilderness Project", "Source-waters survey · Botswana/Angola"],
  ["Save the Rhino Trust", "Desert black rhino monitoring · Namibia"],
  ["South Luangwa Conservation Society", "Anti-snaring patrols · Zambia"],
] as const

export default function About() {
  return (
    <>
      <PageHero
        image="https://images.unsplash.com/photo-1535342604578-a175d3fc4f22?w=2000&q=85&auto=format&fit=crop"
        alt="The Samburu hills rising above the arid landscape of northern Kenya"
        kicker="The Guild · Est. MMXI"
        title={
          <>
            Composed in Nairobi.
            <br />
            At work across a continent.
          </>
        }
        intro="Nyika began as three guides and a map table above a 1942 warehouse. It is now a guild of thirty-eight, in seven offices, still drafting every route by hand."
        meta={"S 01°17′ · E 36°49′\nRiverside Drive, Westlands"}
      />

      {/* Story + numbers */}
      <section className="mx-auto grid max-w-7xl gap-12 px-5 py-20 sm:px-8 sm:py-24 lg:grid-cols-[1fr_20rem]">
        <div>
          <div className="font-mono-accent text-[11px] tracking-wide text-primary">
            The Story
          </div>
          <p className="font-display mt-5 text-2xl leading-snug sm:text-3xl">
            The name is Swahili —{" "}
            <span className="text-primary italic">nyika</span>, the wild,
            open bushland. The premise has not changed since 2011: an
            expedition is composed, like a piece of long-form writing, by
            people who know the ground personally.
          </p>
          <div className="mt-6 max-w-2xl space-y-5 leading-relaxed text-pretty text-muted-foreground">
            <p>
              We grew territory by territory, never by acquisition. Each new
              office opened only when a guide we had worked with for years was
              ready to lead it — Arusha in 2013, Kigali in 2017, the southern
              desks in 2019. The registry holds twelve routes because twelve is
              what the guild can currently compose to standard, not because
              the brochure needed more pages.
            </p>
            <p>
              Every departure is escorted by a resident guide, backed by a 24/7
              field operations desk in Nairobi that tracks flights, weather,
              and radio traffic across all eight territories. Financial
              protection is held under ATOL T7684 for UK clients and escrowed
              trust accounts elsewhere; no client money touches operating
              capital.
            </p>
          </div>

          {/* Timeline */}
          <ol className="mt-12 border-l">
            {TIMELINE.map(([year, place, note]) => (
              <li key={year} className="reveal relative pb-8 pl-8">
                <span
                  aria-hidden
                  className="absolute top-1.5 -left-[5px] size-2.5 rounded-full border-2 border-primary bg-background"
                />
                <div className="font-mono-accent text-[11px] tracking-wide text-primary">
                  {year}
                </div>
                <div className="mt-1 font-medium">{place}</div>
                <p className="mt-1 text-sm text-muted-foreground">{note}</p>
              </li>
            ))}
          </ol>
        </div>

        <aside className="h-fit space-y-px overflow-hidden rounded-xl border bg-border lg:sticky lg:top-24">
          {NUMBERS.map(([value, label]) => (
            <div key={label} className="bg-card p-6">
              <div className="font-display text-4xl">{value}</div>
              <div className="font-mono-accent mt-1 text-[11px] tracking-wide text-muted-foreground">
                {label}
              </div>
            </div>
          ))}
        </aside>
      </section>

      {/* Conservation */}
      <section id="conservation" className="border-y bg-secondary/30">
        <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8 sm:py-24">
          <div className="max-w-2xl">
            <div className="font-mono-accent flex items-center gap-2 text-[11px] tracking-wide text-primary">
              <Leaf className="size-3.5" />
              Conservation · The Levy
            </div>
            <h2 className="font-display mt-3 text-3xl leading-tight sm:text-4xl">
              Three percent of every invoice,
              <br />
              traceable to a named project.
            </h2>
            <p className="mt-4 text-pretty text-muted-foreground">
              The levy has been on every invoice since our first season — USD
              1.4 million placed to date. Your dossier names the project your
              own levy funds, and several routes put you in the field with the
              teams doing the work.
            </p>
          </div>

          <div className="mt-10 grid gap-px overflow-hidden rounded-xl border bg-border sm:grid-cols-2 lg:grid-cols-3">
            {PARTNERS.map(([name, note]) => (
              <div key={name} className="reveal bg-card p-6">
                <div className="font-medium">{name}</div>
                <div className="font-mono-accent mt-1.5 text-xs text-muted-foreground">
                  {note}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-7xl px-5 py-20 sm:px-8 sm:py-24">
        <div className="flex flex-col items-start justify-between gap-8 rounded-2xl border bg-secondary/50 p-10 sm:p-14 lg:flex-row lg:items-center">
          <div>
            <div className="font-mono-accent text-[11px] tracking-wide text-primary">
              Meet the Guild
            </div>
            <h2 className="font-display mt-3 text-3xl leading-tight sm:text-4xl">
              Speak with the desk that will
              <br className="hidden sm:block" /> compose your route.
            </h2>
          </div>
          <div className="flex flex-wrap gap-3">
            <Button asChild size="lg">
              <Link to="/contact">
                Contact the Guild <ArrowRight className="size-4" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link to="/expeditions">Browse the registry</Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  )
}
