import * as React from "react"
import { Link } from "react-router"

import { cn } from "~/lib/utils"

export interface Crumb {
  to: string
  label: string
}

/**
 * Dark image hero used by every interior marketing page, so the overlay Nav
 * always sits on photography. `compact` for index/utility pages, full for
 * destination/expedition dossiers.
 */
export function PageHero({
  image,
  alt,
  kicker,
  title,
  intro,
  crumbs,
  meta,
  compact = false,
  children,
}: {
  image: string
  alt: string
  kicker: string
  title: React.ReactNode
  intro?: string
  crumbs?: Crumb[]
  /** Right-aligned mono metadata, e.g. coordinates */
  meta?: string
  compact?: boolean
  children?: React.ReactNode
}) {
  return (
    <section
      className={cn(
        "relative flex items-end overflow-hidden",
        compact ? "min-h-[52svh]" : "min-h-[72svh]"
      )}
    >
      <img
        src={image}
        alt={alt}
        width={1600}
        height={1000}
        loading="eager"
        fetchPriority="high"
        decoding="async"
        className="absolute inset-0 size-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-black/50" />

      <div className="relative z-10 mx-auto w-full max-w-7xl px-5 pt-32 pb-12 sm:px-8 sm:pb-16">
        <div className="flex items-end justify-between gap-6">
          <div className="max-w-3xl">
            {crumbs && (
              <nav
                aria-label="Breadcrumb"
                className="font-mono-accent mb-3 flex flex-wrap items-center gap-2 text-[11px] tracking-wide text-white/60"
              >
                {crumbs.map((c, i) => (
                  <React.Fragment key={c.to}>
                    {i > 0 && <span aria-hidden>·</span>}
                    <Link
                      to={c.to}
                      className="transition-colors hover:text-white"
                    >
                      {c.label}
                    </Link>
                  </React.Fragment>
                ))}
              </nav>
            )}
            <div className="font-mono-accent text-[11px] tracking-wide text-white/70">
              {kicker}
            </div>
            <h1
              className={cn(
                "font-display mt-3 leading-[1.02] text-white",
                compact
                  ? "text-4xl sm:text-6xl"
                  : "text-5xl sm:text-7xl"
              )}
            >
              {title}
            </h1>
            {intro && (
              <p className="mt-5 max-w-2xl text-base leading-relaxed text-pretty text-white/80 sm:text-lg">
                {intro}
              </p>
            )}
          </div>
          {meta && (
            <div className="font-mono-accent hidden shrink-0 pb-1 text-right text-[11px] leading-relaxed tracking-wide whitespace-pre-line text-white/70 sm:block">
              {meta}
            </div>
          )}
        </div>
        {children}
      </div>
    </section>
  )
}
