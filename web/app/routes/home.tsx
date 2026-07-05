import { Hero } from "~/components/hero"
import {
  Conservation,
  Credentials,
  Cta,
  FeaturedExpeditions,
  Method,
  Territories,
  Transfers,
} from "~/components/sections"
import { Testimonial } from "~/components/testimonial"

export function meta() {
  const url = "https://amosbunde.github.io/nyika-expedition/"
  const title =
    "Nyika Expeditions · African Expedition Outfitters · Est. MMXI"
  const description =
    "Fifteen years of quiet expedition work across Africa. Hand-composed expeditions in eight territories — Kenya, Tanzania, Rwanda, Botswana, Zambia, Namibia, South Africa, and Morocco — with gateway transfers and full board."
  const ogImage =
    "https://images.unsplash.com/photo-1489392191049-fc10c97e64b6?w=1200&h=630&fit=crop&q=80&auto=format"
  return [
    { title },
    { name: "description", content: description },
    {
      name: "keywords",
      content:
        "Africa safari, luxury safari, Maasai Mara, Serengeti, gorilla trekking Rwanda, Okavango Delta, Victoria Falls, Namibia safari, Cape Town Sabi Sands, Sahara expedition, African tour operator",
    },
    { name: "author", content: "Nyika Expeditions Ltd." },
    { name: "robots", content: "index, follow, max-image-preview:large" },
    { tagName: "link", rel: "canonical", href: url },
    { property: "og:type", content: "website" },
    { property: "og:site_name", content: "Nyika Expeditions" },
    {
      property: "og:title",
      content: "Nyika Expeditions · African Expedition Outfitters",
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
      content: "Nyika Expeditions · African Expedition Outfitters",
    },
    {
      name: "twitter:description",
      content:
        "Hand-composed expeditions across eight African territories, from the Mara to the Sahara.",
    },
    { name: "twitter:image", content: ogImage },
  ]
}

export default function Home() {
  return (
    <>
      <Hero />
      <Credentials />
      <Territories />
      <FeaturedExpeditions />
      <Method />
      <Transfers />
      <Conservation />
      <Testimonial />
      <Cta />
    </>
  )
}
