// End-to-end QA against the production build, staged exactly as the GitHub
// Pages deploy lays it out. Drives the real pages with a browser and fails
// on any broken flow or console error.
//
//   npm run build && npm run e2e
//
// Browser resolution: $CHROME_PATH, then a system Chrome/Chromium, then a
// Playwright browser cache. No downloads are performed here — GitHub's
// ubuntu runners and most dev machines already have Chrome.
import { execFileSync } from "node:child_process"
import {
  cpSync,
  existsSync,
  mkdtempSync,
  readdirSync,
  readFileSync,
  renameSync,
  rmSync,
} from "node:fs"
import { createServer } from "node:http"
import { tmpdir } from "node:os"
import { extname, join } from "node:path"
import { fileURLToPath } from "node:url"

import { chromium } from "playwright-core"

const webRoot = fileURLToPath(new URL("..", import.meta.url))
const buildClient = join(webRoot, "build", "client")

// ---------- browser resolution ----------
function resolveChrome() {
  if (process.env.CHROME_PATH) return process.env.CHROME_PATH
  for (const bin of ["google-chrome", "google-chrome-stable", "chromium", "chromium-browser"]) {
    try {
      return execFileSync("which", [bin], { encoding: "utf8" }).trim()
    } catch {
      /* keep looking */
    }
  }
  // Playwright cache (chromium or headless shell), newest revision first.
  const cache = join(process.env.HOME ?? "", ".cache", "ms-playwright")
  if (existsSync(cache)) {
    const dirs = readdirSync(cache)
      .filter((d) => d.startsWith("chromium"))
      .sort()
      .reverse()
    for (const dir of dirs) {
      for (const candidate of [
        join(cache, dir, "chrome-linux", "chrome"),
        join(cache, dir, "chrome-headless-shell-linux64", "chrome-headless-shell"),
      ]) {
        if (existsSync(candidate)) return candidate
      }
    }
  }
  throw new Error(
    "No Chrome/Chromium found. Set CHROME_PATH or install a browser."
  )
}

// ---------- static server mimicking GitHub Pages ----------
const MIME = {
  ".html": "text/html",
  ".js": "text/javascript",
  ".css": "text/css",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".ico": "image/x-icon",
  ".webmanifest": "application/manifest+json",
  ".xml": "application/xml",
  ".txt": "text/plain",
  ".json": "application/json",
}

function serve(stage) {
  const server = createServer((req, res) => {
    let path = decodeURIComponent(new URL(req.url, "http://x").pathname)
    if (path.endsWith("/")) path += "index.html"
    let file = join(stage, path)
    if (!existsSync(file) && existsSync(join(stage, path, "index.html")))
      file = join(stage, path, "index.html")
    if (!existsSync(file)) {
      file = join(stage, "nyika-expedition", "404.html")
      res.statusCode = 404
    }
    try {
      const body = readFileSync(file)
      res.setHeader("Content-Type", MIME[extname(file)] ?? "application/octet-stream")
      res.end(body)
    } catch {
      res.statusCode = 500
      res.end("error")
    }
  })
  return new Promise((resolve) =>
    server.listen(0, "127.0.0.1", () => resolve(server))
  )
}

// ---------- assertions ----------
let failures = 0
function check(name, ok, detail = "") {
  const mark = ok ? "ok " : "FAIL"
  console.log(`  [${mark}] ${name}${ok || !detail ? "" : ` — ${detail}`}`)
  if (!ok) failures++
}

const fmt = (n) => "$" + Math.round(n).toLocaleString("en-US")

async function main() {
  if (!existsSync(join(buildClient, "nyika-expedition", "index.html"))) {
    console.error("No production build found — run `npm run build` first.")
    process.exit(1)
  }

  // Stage the deploy layout: lift the subpath tree, map the SPA fallback.
  const stage = mkdtempSync(join(tmpdir(), "nyika-e2e-"))
  const site = join(stage, "nyika-expedition")
  cpSync(buildClient, site, { recursive: true })
  cpSync(join(site, "nyika-expedition"), site, { recursive: true })
  rmSync(join(site, "nyika-expedition"), { recursive: true })
  renameSync(join(site, "__spa-fallback.html"), join(site, "404.html"))

  const server = await serve(stage)
  const base = `http://127.0.0.1:${server.address().port}/nyika-expedition`
  console.log(`Staged site at ${base}`)

  const browser = await chromium.launch({ executablePath: resolveChrome() })
  const page = await browser.newPage({ viewport: { width: 1280, height: 900 } })
  const consoleErrors = []
  page.on("console", (m) => {
    if (m.type() === "error") consoleErrors.push(m.text().slice(0, 200))
  })
  page.on("pageerror", (e) => consoleErrors.push(String(e).slice(0, 200)))

  console.log("\nRouting & hydration")
  await page.goto(`${base}/`, { waitUntil: "networkidle" })
  check("home renders hero", (await page.locator("h1").count()) > 0)
  await page.click('header nav a[href="/nyika-expedition/expeditions"]')
  await page.waitForURL(/\/expeditions\/?$/)
  check("client-side nav to /expeditions", true)

  console.log("\nExpedition registry")
  // The page renders its own "N of M routes" counter — use it as the source
  // of truth and wait for the card grid to agree, instead of sleeping.
  const counter = page.locator("text=/\\d+ of \\d+ routes/")
  const parseCounter = async () => {
    const m = (await counter.textContent()).match(/(\d+) of (\d+)/)
    return { visible: Number(m[1]), total: Number(m[2]) }
  }
  const cardsSettle = (n) =>
    page
      .waitForFunction(
        (expected) => document.querySelectorAll("article").length === expected,
        n,
        { timeout: 10_000 }
      )
      .then(() => true)
      .catch(() => false)

  await counter.waitFor()
  const all = await parseCounter()
  check(
    `registry renders all ${all.total} routes`,
    all.visible === all.total && (await cardsSettle(all.total)),
    `counter ${all.visible}/${all.total}`
  )
  await page.click('button:has-text("Southern Africa")')
  // aria-pressed flips in the same render as the counter — a real signal.
  await page.waitForSelector(
    'button[aria-pressed="true"]:has-text("Southern Africa")'
  )
  const southern = await parseCounter()
  check(
    "Southern Africa filter narrows the registry",
    southern.visible > 0 &&
      southern.visible < southern.total &&
      (await cardsSettle(southern.visible)),
    `counter ${southern.visible}/${southern.total}`
  )

  console.log("\nBooking flow (Okavango)")
  await page.goto(`${base}/expeditions/okavango/`, { waitUntil: "networkidle" })
  // Derive the expected total from the price shown on the page, so price
  // changes in the catalog don't break the test.
  const priceText = await page
    .locator("aside .font-display.text-3xl")
    .first()
    .textContent()
  const price = Number(priceText.replace(/[^0-9]/g, ""))
  check("from-price parsed", price > 1000, priceText ?? "")
  await page.click('button:has-text("Reserve this Expedition")')
  await page.waitForSelector("text=When do we set off?")
  await page.fill("#startDate", "2026-09-15")
  await page.click('button:has-text("Continue")')
  await page.waitForSelector("text=Gateway transfer?")
  check(
    "transfer step names the gateway",
    (await page.locator("text=Maun International").count()) > 0
  )
  await page.click('label:has-text("Bush Flight")')
  await page.fill("#flightNum", "MN 401")
  await page.fill("#arrivalTime", "11:30")
  await page.click('button:has-text("Continue")')
  await page.fill("#fullName", "QA Traveller")
  await page.fill("#email", "qa@example.com")
  await page.fill("#phone", "+44 7000 000000")
  await page.fill("#nationality", "British")
  await page.click('button:has-text("Continue")')
  await page.waitForSelector("text=Review and confirm.")
  // Premium tier (default) ×1.35, 2 travellers, bush flight 385pp, 3% levy.
  const sub = Math.round(price * 2 * 1.35)
  const expected = fmt(sub + 385 * 2 + Math.round(sub * 0.03))
  const totalText = (
    await page.locator(".font-display.text-3xl").last().textContent()
  ).trim()
  check(`review total is ${expected}`, totalText === expected, `saw ${totalText}`)
  await page.click('button:has-text("Confirm Expedition")')
  await page.waitForSelector("text=You are outfitted.")
  check("confirmation view", true)

  console.log("\nContact form")
  await page.goto(`${base}/contact/`, { waitUntil: "networkidle" })
  await page.fill("#c-name", "QA Traveller")
  await page.fill("#c-email", "qa@example.com")
  await page.fill("#c-msg", "Two of us, October, unhurried pace.")
  await page.click('button:has-text("Dispatch the note")')
  await page.waitForSelector("text=Your note is logged.")
  check("enquiry confirmation", true)

  console.log("\nArtifacts")
  const sitemap = await page.request.get(`${base}/sitemap.xml`)
  const sitemapBody = await sitemap.text()
  const urlCount = (sitemapBody.match(/<url>/g) ?? []).length
  check("sitemap served with ≥ 20 routes", sitemap.ok() && urlCount >= 20, `saw ${urlCount}`)
  check(
    "sitemap includes expedition pages",
    sitemapBody.includes("expeditions/serengeti")
  )
  const missing404 = await page.request.get(`${base}/destinations/atlantis/`)
  check("unknown slug handled", missing404.status() === 404 || missing404.ok())

  check("zero console/page errors", consoleErrors.length === 0, consoleErrors[0])

  await browser.close()
  server.close()
  rmSync(stage, { recursive: true, force: true })

  console.log(failures ? `\n${failures} check(s) FAILED` : "\nAll checks passed")
  process.exit(failures ? 1 : 0)
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
