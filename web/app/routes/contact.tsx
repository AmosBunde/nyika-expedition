import * as React from "react"
import { Check, Clock, Mail, MapPin, Phone } from "lucide-react"

import { PageHero } from "~/components/page-hero"
import { Button } from "~/components/ui/button"
import { Input } from "~/components/ui/input"
import { Label } from "~/components/ui/label"
import { Textarea } from "~/components/ui/textarea"
import { EXPEDITIONS } from "~/lib/catalog"

const ORIGIN = "https://amosbunde.github.io/nyika-expedition/"

export function meta() {
  const title = "Contact the Guild · Nyika Expeditions"
  const description =
    "Reach the Nyika field desks in Nairobi, Arusha, Kigali, Maun, Cape Town, and London. The 24/7 field operations desk answers on +254 20 440 1211."
  return [
    { title },
    { name: "description", content: description },
    { tagName: "link", rel: "canonical", href: `${ORIGIN}contact/` },
    { property: "og:title", content: title },
    { property: "og:description", content: description },
    { property: "og:type", content: "website" },
  ]
}

const DESKS = [
  {
    city: "Nairobi · HQ",
    lines: ["Riverside Drive, Westlands", "+254 20 440 1211"],
    note: "Field operations · 24/7",
  },
  {
    city: "London",
    lines: ["12 Heddon Street, W1", "+44 20 7290 3810"],
    note: "European clients · 09:00–18:00 GMT",
  },
  {
    city: "Cape Town",
    lines: ["Loop Street, City Bowl", "+27 21 418 2255"],
    note: "Southern Africa desk",
  },
] as const

interface Enquiry {
  name: string
  email: string
  route: string
  message: string
}

export default function Contact() {
  const [form, setForm] = React.useState<Enquiry>({
    name: "",
    email: "",
    route: "",
    message: "",
  })
  const [sent, setSent] = React.useState<string | null>(null)

  const canSend = form.name && form.email && form.message

  const submit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!canSend) return
    setSent("NY-C" + String(Math.floor(Math.random() * 9000) + 1000))
  }

  return (
    <>
      <PageHero
        compact
        image="https://images.unsplash.com/photo-1597662786834-8eea85ad4841?w=2000&q=85&auto=format&fit=crop"
        alt="A kasbah village beneath the snow-covered High Atlas mountains, Morocco"
        kicker="Correspondence"
        title="Write to the Guild."
        intro="An expedition manager replies within one working day — usually sooner, the Nairobi desk never quite sleeps."
        meta={"dossier@nyika.africa\n+254 20 440 1211"}
      />

      <section className="mx-auto grid max-w-7xl gap-12 px-5 py-20 sm:px-8 sm:py-24 lg:grid-cols-[1fr_24rem]">
        {/* Enquiry form */}
        <div>
          <div className="font-mono-accent text-[11px] tracking-wide text-primary">
            New Enquiry
          </div>
          <h2 className="font-display mt-3 text-3xl sm:text-4xl">
            Begin the correspondence
          </h2>

          {sent ? (
            <div className="mt-8 rounded-xl border bg-secondary/40 p-8">
              <div className="flex size-12 items-center justify-center rounded-full border-2 border-primary text-primary">
                <Check className="size-6" />
              </div>
              <h3 className="font-display mt-4 text-2xl">
                Your note is logged.
              </h3>
              <p className="mt-2 max-w-md text-sm text-muted-foreground">
                Reference <strong className="text-foreground">{sent}</strong>.
                An expedition manager will reply to{" "}
                <strong className="text-foreground">{form.email}</strong>{" "}
                within one working day. If the matter is urgent, the Nairobi
                field desk answers around the clock on +254 20 440 1211.
              </p>
            </div>
          ) : (
            <form onSubmit={submit} className="mt-8 max-w-xl space-y-5">
              <div className="grid gap-5 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="c-name">Full name</Label>
                  <Input
                    id="c-name"
                    value={form.name}
                    autoComplete="name"
                    onChange={(e) =>
                      setForm((f) => ({ ...f, name: e.target.value }))
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="c-email">Email</Label>
                  <Input
                    id="c-email"
                    type="email"
                    value={form.email}
                    autoComplete="email"
                    onChange={(e) =>
                      setForm((f) => ({ ...f, email: e.target.value }))
                    }
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="c-route">Route of interest (optional)</Label>
                <select
                  id="c-route"
                  value={form.route}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, route: e.target.value }))
                  }
                  className="border-input h-9 w-full rounded-md border bg-transparent px-3 py-1 text-sm shadow-xs focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
                >
                  <option value="">Not sure yet — advise me</option>
                  {EXPEDITIONS.map((e) => (
                    <option key={e.slug} value={e.slug}>
                      No. {e.num} · {e.name} — {e.sub}
                    </option>
                  ))}
                </select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="c-msg">Your note</Label>
                <Textarea
                  id="c-msg"
                  rows={5}
                  placeholder="Dates in mind, party size, pace, and anything the dossier should know."
                  value={form.message}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, message: e.target.value }))
                  }
                />
              </div>
              <Button type="submit" size="lg" disabled={!canSend}>
                Dispatch the note <Mail className="size-4" />
              </Button>
              <p className="font-mono-accent text-xs text-muted-foreground">
                Or write directly · dossier@nyika.africa
              </p>
            </form>
          )}
        </div>

        {/* Desks */}
        <aside className="space-y-4">
          <div className="font-mono-accent text-[11px] tracking-wide text-muted-foreground">
            The Desks
          </div>
          {DESKS.map((d) => (
            <div key={d.city} className="reveal rounded-xl border p-6">
              <div className="flex items-center gap-2 font-medium">
                <MapPin className="size-4 text-primary" />
                {d.city}
              </div>
              <div className="mt-2 space-y-1 text-sm text-muted-foreground">
                {d.lines.map((l) => (
                  <div key={l}>{l}</div>
                ))}
              </div>
              <div className="font-mono-accent mt-3 flex items-center gap-1.5 text-xs text-muted-foreground">
                <Clock className="size-3.5" />
                {d.note}
              </div>
            </div>
          ))}
          <div className="rounded-xl border bg-foreground p-6 text-background">
            <div className="flex items-center gap-2 font-medium">
              <Phone className="size-4" />
              In the field?
            </div>
            <p className="mt-2 text-sm text-background/75">
              Travelling guests reach the operations desk on the emergency
              line in their dossier — answered by a human in Nairobi, every
              hour of the year.
            </p>
          </div>
        </aside>
      </section>
    </>
  )
}
