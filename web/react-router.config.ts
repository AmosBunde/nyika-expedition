import type { Config } from "@react-router/dev/config"

import { DESTINATIONS, EXPEDITIONS } from "./app/lib/catalog"

export default {
  // Static site: no server runtime. Build a SPA and pre-render every route to
  // real HTML so crawlers and first paint get full markup (SEO/perf parity
  // with a hand-written static site) — required for GitHub Pages hosting.
  ssr: false,
  async prerender() {
    return [
      "/",
      "/destinations",
      ...DESTINATIONS.map((d) => `/destinations/${d.slug}`),
      "/expeditions",
      ...EXPEDITIONS.map((e) => `/expeditions/${e.slug}`),
      "/about",
      "/contact",
      "/privacy",
      "/terms",
    ]
  },
  // GitHub Pages project subpath. Asset URLs are handled by Vite `base`.
  basename: "/nyika-expedition/",
} satisfies Config
