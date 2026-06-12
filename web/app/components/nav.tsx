import * as React from "react"
import { ArrowUpRight, Menu } from "lucide-react"

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "~/components/ui/sheet"
import { Button } from "~/components/ui/button"
import { cn } from "~/lib/utils"
import { useScrolled } from "~/lib/use-scroll"

const LINKS = [
  { href: "#expeditions", label: "Expeditions" },
  { href: "#transfers", label: "Transfers" },
  { href: "#method", label: "Method" },
  { href: "#guild", label: "The Guild" },
]

function Compass({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 40 40" className={className} aria-hidden="true">
      <circle
        cx="20"
        cy="20"
        r="18"
        fill="none"
        stroke="currentColor"
        strokeWidth="1"
      />
      <path d="M20 4 L22 20 L20 22 L18 20 Z" fill="var(--color-primary)" />
      <path
        d="M20 36 L18 20 L20 18 L22 20 Z"
        fill="currentColor"
        opacity="0.4"
      />
    </svg>
  )
}

export function Nav() {
  const scrolled = useScrolled(80)

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-40 transition-all duration-300",
        scrolled
          ? "border-b border-border/70 bg-background/85 backdrop-blur-md"
          : "border-b border-transparent"
      )}
    >
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 sm:px-8">
        <a href="#" className="flex items-center gap-2.5">
          <Compass className="size-8 text-foreground" />
          <span className="flex flex-col leading-none">
            <span className="font-display text-lg tracking-tight">Nyika</span>
            <span className="font-mono-accent text-[10px] tracking-wide text-muted-foreground">
              Expeditions · Since MMXI
            </span>
          </span>
        </a>

        <div className="hidden items-center gap-8 md:flex">
          {LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-sm text-foreground/80 transition-colors hover:text-foreground"
            >
              {l.label}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <Button asChild className="hidden sm:inline-flex">
            <a href="#expeditions">
              Reserve <ArrowUpRight className="size-4" />
            </a>
          </Button>

          {/* Mobile menu */}
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="md:hidden"
                aria-label="Open navigation menu"
              >
                <Menu className="size-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-80">
              <SheetTitle className="font-mono-accent px-4 pt-2 text-[11px] tracking-wide text-muted-foreground">
                Field Index · MMXXVI
              </SheetTitle>
              <nav className="mt-2 flex flex-col px-2">
                {LINKS.map((l) => (
                  <SheetClose asChild key={l.href}>
                    <a
                      href={l.href}
                      className="font-display rounded-md px-2 py-3 text-2xl transition-colors hover:text-primary"
                    >
                      {l.label}
                    </a>
                  </SheetClose>
                ))}
              </nav>
              <div className="mt-4 px-4">
                <SheetClose asChild>
                  <Button asChild size="lg" className="w-full">
                    <a href="#expeditions">
                      Reserve an Expedition <ArrowUpRight className="size-4" />
                    </a>
                  </Button>
                </SheetClose>
              </div>
              <div className="mt-auto space-y-1 border-t px-4 py-5 text-sm">
                <div>+254 20 440 1211</div>
                <div>dossier@nyika.co.ke</div>
                <div className="text-muted-foreground">
                  Riverside Drive, Westlands · Nairobi
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </nav>
    </header>
  )
}
