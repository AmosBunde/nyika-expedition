import { ArrowLeft } from "lucide-react"
import { Link } from "react-router"

/**
 * Lightweight document chrome for legal/standalone pages. Deliberately simpler
 * than the marketing Nav/Footer (no in-page #anchors, which don't exist off the
 * home route). Prose is styled via descendant utilities so route files can stay
 * plain semantic HTML.
 */
export function LegalPage({
  title,
  updated,
  children,
}: {
  title: string
  updated: string
  children: React.ReactNode
}) {
  return (
    <div className="flex min-h-svh flex-col">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:rounded-md focus:bg-primary focus:px-4 focus:py-2 focus:text-primary-foreground"
      >
        Skip to content
      </a>
      <header className="sticky top-0 z-30 border-b border-border/70 bg-background/85 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-3xl items-center justify-between px-5 sm:px-8">
          <Link to="/" className="font-display text-lg tracking-tight">
            Nyika
          </Link>
          <Link
            to="/"
            className="inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft className="size-4" />
            Return to expeditions
          </Link>
        </div>
      </header>

      <main
        id="main"
        className="mx-auto w-full max-w-3xl flex-1 px-5 py-16 sm:px-8 sm:py-24"
      >
        <h1 className="font-display text-4xl leading-tight sm:text-5xl">
          {title}
        </h1>
        <div className="font-mono-accent mt-3 text-xs tracking-wide text-muted-foreground">
          Last updated · {updated}
        </div>

        <article
          className={[
            "mt-10 leading-relaxed text-pretty text-foreground/90",
            "[&>p]:mt-4 [&>p]:text-[15px]",
            "[&>h2]:font-display [&>h2]:mt-10 [&>h2]:text-xl [&>h2]:text-foreground",
            "[&>ul]:mt-4 [&>ul]:space-y-2 [&>ul]:pl-5 [&>ul>li]:list-disc [&>ul>li]:text-[15px] [&>ul>li]:marker:text-primary",
            "[&_a]:text-primary [&_a]:underline [&_a]:underline-offset-4 [&_a:hover]:opacity-80",
          ].join(" ")}
        >
          {children}
        </article>

        <Link
          to="/"
          className="font-mono-accent mt-12 inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="size-4" />
          Return to the field journal
        </Link>
      </main>
    </div>
  )
}
