import type { Config } from "@react-router/dev/config"

export default {
  // Static site: no server runtime. Build a SPA and pre-render listed routes to
  // real HTML so crawlers and first paint get full markup (SEO/perf parity with
  // the previous hand-written static site).
  ssr: false,
  async prerender() {
    return ["/", "/privacy", "/terms"]
  },
  // GitHub Pages project subpath. Asset URLs are handled by Vite `base`.
  basename: "/nyika-expedition/",
} satisfies Config
