import * as React from "react"

import { Nav } from "~/components/nav"
import { Hero } from "~/components/hero"
import {
  Credentials,
  Method,
  Transfers,
  Cta,
  Footer,
} from "~/components/sections"
import { Expeditions } from "~/components/expeditions"
import { Testimonial } from "~/components/testimonial"
import { BookingModal } from "~/components/booking-modal"
import { useReveal } from "~/lib/use-scroll"
import type { Tour } from "~/lib/tours"

export function meta() {
  const url = "https://amosbunde.github.io/nyika-expedition/"
  const title = "Nyika Expeditions · Kenya Safari Outfitters · Est. MMXI"
  const description =
    "Fifteen years of quiet expedition work across East Africa. Hand-composed safaris to the Maasai Mara, Amboseli, Samburu, and Laikipia, with airport transfers and full board."
  const ogImage =
    "https://images.unsplash.com/photo-1489392191049-fc10c97e64b6?w=1200&h=630&fit=crop&q=80&auto=format"
  return [
    { title },
    { name: "description", content: description },
    {
      name: "keywords",
      content:
        "Kenya safari, Maasai Mara, Amboseli, Samburu, Laikipia, luxury safari, safari outfitter, East Africa expeditions, airport transfer Nairobi",
    },
    { name: "author", content: "Nyika Expeditions Ltd." },
    { name: "robots", content: "index, follow, max-image-preview:large" },
    { tagName: "link", rel: "canonical", href: url },
    { property: "og:type", content: "website" },
    { property: "og:site_name", content: "Nyika Expeditions" },
    {
      property: "og:title",
      content: "Nyika Expeditions · Kenya Safari Outfitters",
    },
    { property: "og:description", content: description },
    { property: "og:url", content: url },
    { property: "og:locale", content: "en_GB" },
    { property: "og:image", content: ogImage },
    { property: "og:image:width", content: "1200" },
    { property: "og:image:height", content: "630" },
    {
      property: "og:image:alt",
      content:
        "Mount Kilimanjaro rising above the plains of Amboseli National Park, Kenya",
    },
    { name: "twitter:card", content: "summary_large_image" },
    {
      name: "twitter:title",
      content: "Nyika Expeditions · Kenya Safari Outfitters",
    },
    {
      name: "twitter:description",
      content:
        "Hand-composed safaris to the Maasai Mara, Amboseli, Samburu, and Laikipia.",
    },
    { name: "twitter:image", content: ogImage },
  ]
}

export default function Home() {
  useReveal()
  const [tour, setTour] = React.useState<Tour | null>(null)
  const [open, setOpen] = React.useState(false)

  const reserve = (t: Tour) => {
    setTour(t)
    setOpen(true)
  }

  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:rounded-md focus:bg-primary focus:px-4 focus:py-2 focus:text-primary-foreground"
      >
        Skip to content
      </a>
      <Nav />
      <main id="main">
        <Hero />
        <Credentials />
        <Method />
        <Expeditions onReserve={reserve} />
        <Transfers />
        <Testimonial />
        <Cta />
      </main>
      <Footer />
      <BookingModal tour={tour} open={open} onOpenChange={setOpen} />
    </>
  )
}
