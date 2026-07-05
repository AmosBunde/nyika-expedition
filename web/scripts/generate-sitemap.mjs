// Generates sitemap.xml from the prerendered build output, so the sitemap
// can never drift from the routes that actually shipped. Runs as part of
// `npm run build`; writes to build/client/sitemap.xml, which the deploy
// workflow publishes at /nyika-expedition/sitemap.xml (see robots.txt).
import { readdirSync, statSync, existsSync, writeFileSync } from "node:fs"
import { join, relative } from "node:path"
import { fileURLToPath } from "node:url"

const ORIGIN = "https://amosbunde.github.io/nyika-expedition/"
const webRoot = fileURLToPath(new URL("..", import.meta.url))
const prerenderRoot = join(webRoot, "build", "client", "nyika-expedition")
const outFile = join(webRoot, "build", "client", "sitemap.xml")

if (!existsSync(join(prerenderRoot, "index.html"))) {
  console.error(`No prerendered build at ${prerenderRoot} — run the build first.`)
  process.exit(1)
}

/** Recursively collect route paths ("" for root) that contain an index.html. */
function collectRoutes(dir, prefix = "") {
  const routes = []
  if (existsSync(join(dir, "index.html"))) routes.push(prefix)
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry)
    if (statSync(full).isDirectory()) {
      routes.push(...collectRoutes(full, prefix ? `${prefix}/${entry}` : entry))
    }
  }
  return routes
}

function priorityFor(route) {
  if (route === "") return "1.0"
  if (route === "destinations" || route === "expeditions") return "0.9"
  if (route.startsWith("destinations/") || route.startsWith("expeditions/"))
    return "0.8"
  if (route === "privacy" || route === "terms") return "0.3"
  return "0.6"
}

function changefreqFor(route) {
  if (route === "" || route.startsWith("destinations") || route.startsWith("expeditions"))
    return "monthly"
  return "yearly"
}

const routes = collectRoutes(prerenderRoot).sort((a, b) => {
  // Stable, readable order: by priority desc, then alphabetically.
  const p = priorityFor(b).localeCompare(priorityFor(a))
  return p !== 0 ? p : a.localeCompare(b)
})

const lastmod = new Date().toISOString().split("T")[0]

const xml = [
  '<?xml version="1.0" encoding="UTF-8"?>',
  '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
  ...routes.flatMap((route) => [
    "  <url>",
    `    <loc>${ORIGIN}${route}</loc>`,
    `    <lastmod>${lastmod}</lastmod>`,
    `    <changefreq>${changefreqFor(route)}</changefreq>`,
    `    <priority>${priorityFor(route)}</priority>`,
    "  </url>",
  ]),
  "</urlset>",
  "",
].join("\n")

writeFileSync(outFile, xml)
console.log(
  `sitemap.xml: ${routes.length} routes → ${relative(webRoot, outFile)}`
)
