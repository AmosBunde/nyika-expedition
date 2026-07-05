import { Outlet, useLocation } from "react-router"

import { Nav } from "~/components/nav"
import { Footer } from "~/components/footer"
import { useReveal } from "~/lib/use-scroll"

/** Shared marketing chrome: overlay Nav, page content, enterprise footer. */
export default function MarketingLayout() {
  const { pathname } = useLocation()
  useReveal(pathname)

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
        <Outlet />
      </main>
      <Footer />
    </>
  )
}
