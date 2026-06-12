import { ArrowLeft } from "lucide-react"
import { Link } from "react-router"

import { Button } from "~/components/ui/button"

export function meta() {
  return [
    { title: "Not found · Nyika Expeditions" },
    { name: "robots", content: "noindex" },
  ]
}

export default function NotFound() {
  return (
    <div className="flex min-h-svh flex-col items-center justify-center px-5 text-center">
      <div className="font-mono-accent text-[11px] tracking-wide text-primary">
        Off the map · 404
      </div>
      <h1 className="font-display mt-4 text-5xl leading-tight sm:text-6xl">
        This trail leads nowhere.
      </h1>
      <p className="mt-4 max-w-md text-muted-foreground">
        The page you were looking for has wandered off into the bush. Let us
        guide you back to the field journal.
      </p>
      <Button asChild className="mt-8">
        <Link to="/">
          <ArrowLeft className="size-4" />
          Return to expeditions
        </Link>
      </Button>
    </div>
  )
}
