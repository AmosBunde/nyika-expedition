import { PageHero } from "~/components/page-hero"
import { DestinationCard } from "~/components/destination-card"
import { REGIONS, destinationsIn } from "~/lib/catalog"

const ORIGIN = "https://amosbunde.github.io/nyika-expedition/"

export function meta() {
  const title = "Destinations · Eight African Territories · Nyika Expeditions"
  const description =
    "The Nyika registry covers eight territories in three regions — Kenya, Tanzania, Rwanda, Botswana, Zambia, Namibia, South Africa, and Morocco. Choose your ground."
  return [
    { title },
    { name: "description", content: description },
    { tagName: "link", rel: "canonical", href: `${ORIGIN}destinations/` },
    { property: "og:title", content: title },
    { property: "og:description", content: description },
    { property: "og:type", content: "website" },
  ]
}

export default function Destinations() {
  return (
    <>
      <PageHero
        compact
        image="https://images.unsplash.com/photo-1505598872760-6090aa9ed603?w=2000&q=85&auto=format&fit=crop"
        alt="Aerial view of the great sand dunes of the Namib Desert, Namibia"
        kicker="The Territories · Registry MMXXVI"
        title={
          <>
            Eight territories.
            <br />
            Three regions.
          </>
        }
        intro="Every territory in the registry is ground we have worked for years — resident guides, camps held by long relationship, and logistics rehearsed until they disappear."
        meta={"Registry of Routes\nVol IV · MMXXVI"}
      />

      {REGIONS.map((region) => {
        const dests = destinationsIn(region.key)
        if (dests.length === 0) return null
        return (
          <section
            key={region.key}
            className="mx-auto max-w-7xl px-5 py-16 first-of-type:pt-20 sm:px-8 sm:py-20"
          >
            <header className="max-w-2xl">
              <div className="font-mono-accent text-[11px] tracking-wide text-primary">
                {region.name} ·{" "}
                {String(dests.length).padStart(2, "0")}{" "}
                {dests.length === 1 ? "territory" : "territories"}
              </div>
              <h2 className="font-display mt-3 text-3xl leading-tight sm:text-4xl">
                {region.name}
              </h2>
              <p className="mt-3 text-pretty text-muted-foreground">
                {region.blurb}
              </p>
            </header>
            <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {dests.map((d) => (
                <DestinationCard key={d.slug} dest={d} />
              ))}
            </div>
          </section>
        )
      })}
    </>
  )
}
