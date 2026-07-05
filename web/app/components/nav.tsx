import * as React from "react"
import { ArrowUpRight, Menu } from "lucide-react"
import { Link, NavLink } from "react-router"

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
  { to: "/destinations", label: "Destinations" },
  { to: "/expeditions", label: "Expeditions" },
  { to: "/about", label: "The Guild" },
  { to: "/contact", label: "Contact" },
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

/**
 * Marketing chrome. Sits over the page hero while at the top (every marketing
 * route opens with a dark image hero, so light-on-dark reads correctly), then
 * gains a blurred canvas once scrolled.
 */
export function Nav() {
  const scrolled = useScrolled(80)

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-40 transition-all duration-300",
        scrolled
          ? "border-b border-border/70 bg-background/85 text-foreground backdrop-blur-md"
          : "border-b border-transparent text-white"
      )}
    >
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 sm:px-8">
        <Link to="/" className="flex items-center gap-2.5">
          <Compass className="size-8" />
          <span className="flex flex-col leading-none">
            <span className="font-display text-lg tracking-tight">Nyika</span>
            <span
              className={cn(
                "font-mono-accent text-[10px] tracking-wide",
                scrolled ? "text-muted-foreground" : "text-white/70"
              )}
            >
              African Expeditions · MMXI
            </span>
          </span>
        </Link>

        <div className="hidden items-center gap-8 md:flex">
          {LINKS.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              className={({ isActive }) =>
                cn(
                  "text-sm transition-colors",
                  scrolled
                    ? "text-foreground/80 hover:text-foreground"
                    : "text-white/85 hover:text-white",
                  isActive && "underline decoration-primary underline-offset-8"
                )
              }
            >
              {l.label}
            </NavLink>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <Button asChild className="hidden sm:inline-flex">
            <Link to="/expeditions">
              Reserve <ArrowUpRight className="size-4" />
            </Link>
          </Button>

          {/* Mobile menu */}
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className={cn(
                  "md:hidden",
                  !scrolled &&
                    "border-white/40 bg-transparent text-white hover:bg-white/10 hover:text-white"
                )}
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
                  <SheetClose asChild key={l.to}>
                    <Link
                      to={l.to}
                      className="font-display rounded-md px-2 py-3 text-2xl transition-colors hover:text-primary"
                    >
                      {l.label}
                    </Link>
                  </SheetClose>
                ))}
              </nav>
              <div className="mt-4 px-4">
                <SheetClose asChild>
                  <Button asChild size="lg" className="w-full">
                    <Link to="/expeditions">
                      Reserve an Expedition <ArrowUpRight className="size-4" />
                    </Link>
                  </Button>
                </SheetClose>
              </div>
              <div className="mt-auto space-y-1 border-t px-4 py-5 text-sm">
                <div>+254 20 440 1211</div>
                <div>dossier@nyika.africa</div>
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
