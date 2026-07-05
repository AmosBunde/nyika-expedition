import * as React from "react"
import { ArrowLeft, ArrowRight, Check, Plane, ShieldCheck } from "lucide-react"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "~/components/ui/dialog"
import { Button } from "~/components/ui/button"
import { Input } from "~/components/ui/input"
import { Label } from "~/components/ui/label"
import { Textarea } from "~/components/ui/textarea"
import { Badge } from "~/components/ui/badge"
import { RadioGroup, RadioGroupItem } from "~/components/ui/radio-group"
import { cn } from "~/lib/utils"
import { type Expedition, destinationBySlug } from "~/lib/catalog"
import {
  type BookingForm,
  type TierKey,
  type TransferKey,
  TIERS,
  TIER_LABEL,
  TRANSFERS,
  TRANSFER_NAMES,
  calcTotals,
  emptyForm,
  fmt,
  formatDate,
} from "~/lib/booking"

type Tour = Expedition

const STEPS = ["Dates", "Transfer", "Details", "Confirm"] as const

interface Confirmation {
  ref: string
  email: string
  name: string
  date: string
  travelers: number
  total: number
}

export function BookingModal({
  tour,
  open,
  onOpenChange,
}: {
  tour: Tour | null
  open: boolean
  onOpenChange: (open: boolean) => void
}) {
  const [step, setStep] = React.useState(1)
  const [form, setForm] = React.useState<BookingForm>(emptyForm)
  const [confirmation, setConfirmation] = React.useState<Confirmation | null>(
    null
  )

  // Fresh state whenever a new expedition is opened.
  React.useEffect(() => {
    if (open) {
      setStep(1)
      setForm(emptyForm())
      setConfirmation(null)
    }
  }, [open, tour?.slug])

  const set = <K extends keyof BookingForm>(key: K, value: BookingForm[K]) =>
    setForm((f) => ({ ...f, [key]: value }))

  const totals = calcTotals(tour, form)

  const canAdvance = () => {
    if (step === 1) return !!form.date
    if (step === 2) return !!form.transfer && !!form.flight && !!form.time
    if (step === 3)
      return !!form.name && !!form.email && !!form.phone && !!form.nationality
    return true
  }

  const next = () => canAdvance() && setStep((s) => Math.min(4, s + 1))
  const back = () => (step > 1 ? setStep((s) => s - 1) : onOpenChange(false))

  const confirm = () => {
    if (!tour) return
    const ref = "NY-" + String(Math.floor(Math.random() * 90000) + 10000)
    setConfirmation({
      ref,
      email: form.email || "—",
      name: form.name,
      date: form.date,
      travelers: form.travelers,
      total: totals.total,
    })
  }

  if (!tour) return null
  const today = new Date().toISOString().split("T")[0]

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        showCloseButton
        className="max-h-[92svh] gap-0 overflow-y-auto p-0 sm:max-w-3xl lg:max-w-5xl"
      >
        {confirmation ? (
          <ConfirmationView
            tour={tour}
            data={confirmation}
            onClose={() => onOpenChange(false)}
          />
        ) : (
          <div>
            <DialogTitle className="sr-only">
              Reserve the {tour.name} expedition
            </DialogTitle>
            <DialogDescription className="sr-only">
              A four-step booking flow: choose dates, airport transfer,
              traveller details, then review and confirm.
            </DialogDescription>

            {/* Step indicator */}
            <ol className="flex items-center gap-1 border-b px-5 py-3.5 sm:px-7">
              {STEPS.map((label, i) => {
                const n = i + 1
                const active = n === step
                const done = n < step
                return (
                  <li key={label} className="flex flex-1 items-center gap-1">
                    <div
                      className={cn(
                        "flex items-center gap-2 text-xs font-medium tracking-wide whitespace-nowrap",
                        active
                          ? "text-foreground"
                          : done
                            ? "text-primary"
                            : "text-muted-foreground"
                      )}
                    >
                      <span
                        className={cn(
                          "font-mono-accent flex size-5 items-center justify-center rounded-full border text-[10px]",
                          active &&
                            "border-primary bg-primary text-primary-foreground",
                          done && "border-primary text-primary",
                          !active && !done && "border-border"
                        )}
                      >
                        {done ? (
                          <Check className="size-3" />
                        ) : (
                          String(n).padStart(2, "0")
                        )}
                      </span>
                      <span className="hidden sm:inline">{label}</span>
                    </div>
                    {n < STEPS.length && (
                      <span className="hidden h-px flex-1 bg-border sm:block" />
                    )}
                  </li>
                )
              })}
            </ol>

            <div className="grid lg:grid-cols-[20rem_1fr]">
              <Dossier tour={tour} form={form} totals={totals} />

              <div className="px-5 py-6 sm:px-8 sm:py-8">
                {/* Running total for mobile — the dossier aside is hidden < lg. */}
                <div className="mb-6 flex items-center justify-between rounded-md border bg-secondary/50 px-4 py-3 lg:hidden">
                  <div>
                    <div className="font-mono-accent text-[10px] tracking-wide text-muted-foreground uppercase">
                      {tour.name} · No. {tour.num}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {form.travelers} travellers · {TIER_LABEL[form.tier]}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-display text-xl">
                      {fmt(totals.total)}
                    </div>
                    <div className="font-mono-accent text-[10px] text-muted-foreground">
                      grand total
                    </div>
                  </div>
                </div>

                {step === 1 && (
                  <StepDates tour={tour} form={form} set={set} today={today} />
                )}
                {step === 2 && (
                  <StepTransfer tour={tour} form={form} set={set} />
                )}
                {step === 3 && <StepDetails form={form} set={set} />}
                {step === 4 && (
                  <StepConfirm tour={tour} form={form} totals={totals} />
                )}

                {/* Nav */}
                <div className="mt-8 flex items-center justify-between gap-3 border-t pt-5">
                  <button
                    type="button"
                    onClick={back}
                    className="inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    <ArrowLeft className="size-4" />
                    {step === 1 ? "Return to expeditions" : "Previous"}
                  </button>
                  {step < 4 ? (
                    <Button onClick={next} disabled={!canAdvance()}>
                      Continue <ArrowRight className="size-4" />
                    </Button>
                  ) : (
                    <Button onClick={confirm}>
                      Confirm Expedition <Check className="size-4" />
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}

/* ---------- Left dossier summary ---------- */
function Dossier({
  tour,
  form,
  totals,
}: {
  tour: Tour
  form: BookingForm
  totals: ReturnType<typeof calcTotals>
}) {
  return (
    <aside className="hidden flex-col gap-4 border-r bg-secondary/50 px-6 py-7 lg:flex">
      <div className="font-mono-accent text-[11px] tracking-wide text-muted-foreground">
        Booking Dossier · No. {tour.num}
      </div>
      <div className="aspect-[4/3] overflow-hidden rounded-md">
        <img
          src={tour.thumb}
          alt={`${tour.name} · ${tour.sub}`}
          className="size-full object-cover"
          loading="lazy"
        />
      </div>
      <div>
        <div className="font-mono-accent text-[11px] tracking-wide text-muted-foreground">
          {tour.region}
        </div>
        <h3 className="font-display mt-0.5 text-2xl leading-tight">
          {tour.name}
        </h3>
        <div className="text-sm text-muted-foreground">{tour.sub}</div>
      </div>

      <dl className="grid grid-cols-2 gap-y-3 border-t pt-4 text-sm">
        <Meta label="Duration" value={`${tour.days}d / ${tour.nights}n`} />
        <Meta label="Travellers" value={String(form.travelers)} />
        <Meta label="Start date" value={formatDate(form.date)} />
        <Meta label="Tier" value={TIER_LABEL[form.tier]} />
      </dl>

      <div className="space-y-1.5 border-t pt-4 text-sm">
        <Row label="Expedition" value={fmt(totals.sub)} />
        {form.transfer && (
          <Row label="Airport transfer" value={fmt(totals.transfer)} />
        )}
        <Row label="Conservation (3%)" value={fmt(totals.conservation)} />
      </div>

      <div className="flex items-end justify-between border-t pt-4">
        <div>
          <div className="font-mono-accent text-[11px] tracking-wide text-muted-foreground">
            Grand total
          </div>
          <div className="font-mono-accent text-[11px] text-muted-foreground">
            50% deposit to confirm
          </div>
        </div>
        <div className="font-display text-2xl">{fmt(totals.total)}</div>
      </div>

      <div className="mt-auto flex items-start gap-2 rounded-md bg-background/60 p-3 text-xs text-muted-foreground">
        <ShieldCheck className="mt-0.5 size-4 shrink-0 text-primary" />
        <span>
          Refundable up to 30 days prior. Flying Doctors cover and conservation
          levy included.
        </span>
      </div>
    </aside>
  )
}

function Meta({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="font-mono-accent text-[10px] tracking-wide text-muted-foreground uppercase">
        {label}
      </dt>
      <dd className="mt-0.5">{value}</dd>
    </div>
  )
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-muted-foreground">{label}</span>
      <span className="font-mono-accent">{value}</span>
    </div>
  )
}

/* ---------- Step 1: Dates ---------- */
function StepDates({
  tour,
  form,
  set,
  today,
}: {
  tour: Tour
  form: BookingForm
  set: <K extends keyof BookingForm>(k: K, v: BookingForm[K]) => void
  today: string
}) {
  return (
    <div className="space-y-6">
      <Heading kicker="Chapter One · of Four" title="When do we set off?" />

      <div className="space-y-2">
        <Label htmlFor="startDate">Departure date</Label>
        <Input
          id="startDate"
          type="date"
          min={today}
          value={form.date}
          onChange={(e) => set("date", e.target.value)}
          className="h-11"
        />
        <p className="font-mono-accent text-xs text-muted-foreground">
          Peak season {tour.season}
        </p>
      </div>

      <div className="space-y-2">
        <Label>Travellers</Label>
        <div className="flex items-center justify-between rounded-md border px-4 py-2.5">
          <div>
            <span className="font-display text-2xl">{form.travelers}</span>
            <span className="ml-2 text-sm text-muted-foreground">
              travellers
            </span>
          </div>
          <div className="flex gap-2">
            <Stepper
              label="Remove traveller"
              onClick={() => set("travelers", Math.max(1, form.travelers - 1))}
            >
              −
            </Stepper>
            <Stepper
              label="Add traveller"
              onClick={() => set("travelers", Math.min(12, form.travelers + 1))}
            >
              +
            </Stepper>
          </div>
        </div>
      </div>

      <div className="space-y-2">
        <Label>Accommodation tier</Label>
        <RadioGroup
          value={form.tier}
          onValueChange={(v) => set("tier", v as TierKey)}
          className="gap-2"
        >
          {TIERS.map((t) => (
            <Label
              key={t.key}
              htmlFor={`tier-${t.key}`}
              className={cn(
                "flex cursor-pointer items-center gap-3 rounded-md border px-4 py-3 font-normal transition-colors",
                form.tier === t.key
                  ? "border-primary bg-primary/5"
                  : "hover:bg-accent"
              )}
            >
              <RadioGroupItem id={`tier-${t.key}`} value={t.key} />
              <span className="flex-1">
                <span className="block font-medium">{t.label}</span>
                <span className="block text-sm text-muted-foreground">
                  {t.blurb}
                </span>
              </span>
              <span className="font-mono-accent text-sm text-muted-foreground">
                ×{t.mult.toFixed(2)}
              </span>
            </Label>
          ))}
        </RadioGroup>
      </div>

      <div className="rounded-md border bg-secondary/40 p-4">
        <div className="font-mono-accent text-[11px] tracking-wide text-primary">
          Camps on this expedition
        </div>
        <ul className="mt-2 space-y-1.5">
          {tour.camps.map((camp, i) => (
            <li key={camp} className="flex items-baseline gap-3 text-sm">
              <span className="font-mono-accent text-xs text-muted-foreground">
                Night {i + 1}
              </span>
              <span>{camp}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

function Stepper({
  children,
  onClick,
  label,
}: {
  children: React.ReactNode
  onClick: () => void
  label: string
}) {
  return (
    <button
      type="button"
      aria-label={label}
      onClick={onClick}
      className="flex size-9 items-center justify-center rounded-md border text-lg leading-none transition-colors hover:border-primary hover:text-primary"
    >
      {children}
    </button>
  )
}

/* ---------- Step 2: Transfer ---------- */
function StepTransfer({
  tour,
  form,
  set,
}: {
  tour: Tour
  form: BookingForm
  set: <K extends keyof BookingForm>(k: K, v: BookingForm[K]) => void
}) {
  const gateway = destinationBySlug(tour.destination)?.gateway
  const intro = gateway
    ? `From ${gateway.airport} (${gateway.code}), ${gateway.city}, to camp. Drivers track your flight in real time, meet past immigration, and handle luggage.`
    : "From your gateway airport to camp. Drivers track your flight in real time, meet past immigration, and handle luggage."
  return (
    <div className="space-y-6">
      <Heading
        kicker="Chapter Two · of Four"
        title="Gateway transfer?"
        intro={intro}
      />

      <RadioGroup
        value={form.transfer ?? ""}
        onValueChange={(v) => set("transfer", v as TransferKey)}
        className="gap-2"
      >
        {TRANSFERS.map((t) => (
          <Label
            key={t.key}
            htmlFor={`transfer-${t.key}`}
            className={cn(
              "flex cursor-pointer items-center gap-3 rounded-md border px-4 py-3 font-normal transition-colors",
              form.transfer === t.key
                ? "border-primary bg-primary/5"
                : "hover:bg-accent"
            )}
          >
            <RadioGroupItem id={`transfer-${t.key}`} value={t.key} />
            <Plane className="size-4 shrink-0 text-muted-foreground" />
            <span className="flex-1">
              <span className="flex items-center gap-2">
                <span className="font-medium">{t.name}</span>
                <Badge
                  variant="secondary"
                  className="font-mono-accent text-[10px]"
                >
                  {t.tag}
                </Badge>
              </span>
              <span className="block text-sm text-muted-foreground">
                {t.desc}
              </span>
              <span className="font-mono-accent block text-xs text-muted-foreground">
                {t.time}
              </span>
            </span>
            <span className="font-mono-accent text-sm">{fmt(t.price)}</span>
          </Label>
        ))}
      </RadioGroup>

      {form.transfer && (
        <div className="space-y-4 rounded-md border bg-secondary/40 p-4">
          <div className="font-mono-accent text-[11px] tracking-wide text-primary">
            Flight details
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="flightNum">Flight number</Label>
              <Input
                id="flightNum"
                placeholder="e.g. KQ 003"
                value={form.flight}
                onChange={(e) => set("flight", e.target.value.toUpperCase())}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="arrivalTime">Arrival time</Label>
              <Input
                id="arrivalTime"
                type="time"
                value={form.time}
                onChange={(e) => set("time", e.target.value)}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

/* ---------- Step 3: Details ---------- */
function StepDetails({
  form,
  set,
}: {
  form: BookingForm
  set: <K extends keyof BookingForm>(k: K, v: BookingForm[K]) => void
}) {
  return (
    <div className="space-y-5">
      <Heading kicker="Chapter Three · of Four" title="Who shall we expect?" />

      <div className="space-y-2">
        <Label htmlFor="fullName">Lead traveller · full name</Label>
        <Input
          id="fullName"
          placeholder="As shown on passport"
          value={form.name}
          onChange={(e) => set("name", e.target.value)}
          className="h-11"
          autoComplete="name"
        />
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            placeholder="you@example.com"
            value={form.email}
            onChange={(e) => set("email", e.target.value)}
            autoComplete="email"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="nationality">Nationality</Label>
          <Input
            id="nationality"
            placeholder="e.g. British"
            value={form.nationality}
            onChange={(e) => set("nationality", e.target.value)}
          />
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="phone">Mobile (country code)</Label>
        <Input
          id="phone"
          type="tel"
          placeholder="+44 ..."
          value={form.phone}
          onChange={(e) => set("phone", e.target.value)}
          autoComplete="tel"
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="notes">Dietary, medical, or interest notes</Label>
        <Textarea
          id="notes"
          rows={3}
          placeholder="e.g. Vegetarian. Photographer. Keen on big cats."
          value={form.notes}
          onChange={(e) => set("notes", e.target.value)}
        />
      </div>
    </div>
  )
}

/* ---------- Step 4: Confirm ---------- */
function StepConfirm({
  tour,
  form,
  totals,
}: {
  tour: Tour
  form: BookingForm
  totals: ReturnType<typeof calcTotals>
}) {
  const rows: [string, string][] = [
    ["Departure", formatDate(form.date, "long")],
    ["Travellers", `${form.travelers} · ${TIER_LABEL[form.tier]}`],
    ["Transfer", form.transfer ? TRANSFER_NAMES[form.transfer] : "—"],
    ["Flight", form.flight ? `${form.flight} · ${form.time}` : "—"],
    ["Lead guest", form.name || "—"],
    ["Contact", form.email || "—"],
    ["Mobile", form.phone || "—"],
    ["Nationality", form.nationality || "—"],
  ]
  return (
    <div className="space-y-6">
      <Heading kicker="Chapter Four · of Four" title="Review and confirm." />

      <div className="rounded-md border p-5">
        <div className="font-mono-accent text-[11px] tracking-wide text-muted-foreground">
          Expedition No. {tour.num}
        </div>
        <h3 className="font-display mt-1 text-2xl">{tour.name}</h3>
        <div className="text-sm text-muted-foreground">
          {tour.sub} · {tour.region}
        </div>

        <dl className="mt-4 grid gap-x-6 gap-y-2.5 border-t pt-4 sm:grid-cols-2">
          {rows.map(([k, v]) => (
            <div key={k} className="flex justify-between gap-4 text-sm">
              <dt className="text-muted-foreground">{k}</dt>
              <dd className="text-right">{v}</dd>
            </div>
          ))}
        </dl>

        <div className="mt-4 flex items-end justify-between border-t pt-4">
          <div>
            <div className="font-mono-accent text-[11px] tracking-wide text-muted-foreground">
              Grand total
            </div>
            <div className="font-mono-accent text-[11px] text-muted-foreground">
              50% · {fmt(totals.total / 2)} deposit
            </div>
          </div>
          <div className="font-display text-3xl">{fmt(totals.total)}</div>
        </div>
      </div>

      <p className="text-xs leading-relaxed text-muted-foreground">
        By confirming you agree to our cancellation terms. Full refund up to 30
        days prior to departure. Your pre-departure dossier will arrive within
        24 hours.
      </p>
    </div>
  )
}

/* ---------- Confirmation view ---------- */
function ConfirmationView({
  tour,
  data,
  onClose,
}: {
  tour: Tour
  data: Confirmation
  onClose: () => void
}) {
  return (
    <div className="px-6 py-12 text-center sm:px-12">
      <DialogTitle asChild>
        <div className="font-mono-accent text-[11px] tracking-wide text-muted-foreground">
          Reservation Confirmed · No. {data.ref}
        </div>
      </DialogTitle>
      <div className="mx-auto mt-6 flex size-20 items-center justify-center rounded-full border-2 border-primary text-primary">
        <Check className="size-9" />
      </div>
      <h2 className="font-display mt-6 text-3xl sm:text-4xl">
        You are outfitted.
      </h2>
      <DialogDescription className="mx-auto mt-3 max-w-md text-sm text-muted-foreground">
        A confirmation has been dispatched to{" "}
        <strong className="text-foreground">{data.email}</strong>. Your
        expedition manager will be in touch within 24 hours with your
        pre-departure dossier.
      </DialogDescription>

      <dl className="mx-auto mt-8 grid max-w-md grid-cols-2 gap-px overflow-hidden rounded-md border bg-border text-left">
        {(
          [
            ["Expedition", tour.name],
            ["Departs", formatDate(data.date)],
            ["Party", `${data.travelers} travellers`],
            ["Total", fmt(data.total)],
          ] as [string, string][]
        ).map(([k, v]) => (
          <div key={k} className="bg-background p-3">
            <dt className="font-mono-accent text-[10px] tracking-wide text-muted-foreground uppercase">
              {k}
            </dt>
            <dd className="mt-0.5 text-sm font-medium">{v}</dd>
          </div>
        ))}
      </dl>

      <Button variant="outline" className="mt-8" onClick={onClose}>
        Return to the field journal
      </Button>
    </div>
  )
}

/* ---------- Shared step heading ---------- */
function Heading({
  kicker,
  title,
  intro,
}: {
  kicker: string
  title: string
  intro?: string
}) {
  return (
    <div>
      <div className="font-mono-accent text-[11px] tracking-wide text-muted-foreground">
        {kicker}
      </div>
      <h2 className="font-display mt-1 text-3xl leading-tight sm:text-4xl">
        {title}
      </h2>
      {intro && <p className="mt-3 text-sm text-muted-foreground">{intro}</p>}
    </div>
  )
}
