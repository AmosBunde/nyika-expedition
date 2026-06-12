import * as React from "react"
import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  isRouteErrorResponse,
} from "react-router"

import type { Route } from "./+types/root"
import "./app.css"

const BASE = "/nyika-expedition"
const ORIGIN = "https://amosbunde.github.io/nyika-expedition/"

// schema.org structured data (mirrors the original static site).
const JSON_LD = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "TravelAgency",
      "@id": `${ORIGIN}#organization`,
      name: "Nyika Expeditions",
      legalName: "Nyika Expeditions Ltd.",
      url: ORIGIN,
      logo: `${ORIGIN}icon-512.png`,
      image:
        "https://images.unsplash.com/photo-1489392191049-fc10c97e64b6?w=1200&h=630&fit=crop&q=80&auto=format",
      description:
        "Kenya-based safari outfitter composing hand-crafted expeditions to the Maasai Mara, Amboseli, Samburu, and Laikipia since 2011.",
      foundingDate: "2011",
      telephone: "+254-20-440-1211",
      email: "dossier@nyika.co.ke",
      priceRange: "$$$$",
      slogan: "We do not run safaris. We compose them.",
      address: {
        "@type": "PostalAddress",
        streetAddress: "Riverside Drive, Westlands",
        addressLocality: "Nairobi",
        postalCode: "00100",
        addressCountry: "KE",
      },
      areaServed: { "@type": "Country", name: "Kenya" },
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: "4.96",
        reviewCount: "847",
        bestRating: "5",
        worstRating: "1",
      },
    },
    {
      "@type": "WebSite",
      "@id": `${ORIGIN}#website`,
      url: ORIGIN,
      name: "Nyika Expeditions",
      inLanguage: "en",
      publisher: { "@id": `${ORIGIN}#organization` },
    },
    {
      "@type": "ItemList",
      name: "Nyika Expeditions · 2026 Season",
      itemListElement: [
        [
          "Maasai Mara · Migration Corridor",
          "Five days tracking the Great Migration across the Mara plains, with private conservancy access and dawn balloon ascents.",
          "4280",
        ],
        [
          "Amboseli · Under Kilimanjaro",
          "Four days among the celebrated elephant families of Amboseli, with Kilimanjaro rising clear at dawn and dusk.",
          "3640",
        ],
        [
          "Samburu · The Arid North",
          "Six days in the semi-arid frontier of reticulated giraffe, Grevy's zebra, gerenuk and beisa oryx, with Samburu warrior escorts.",
          "5120",
        ],
        [
          "Laikipia · Private Rangelands",
          "Seven days across Laikipia's private conservancies, with black rhino at Lewa, Ol Pejeta, horseback safari and helicopter transfer.",
          "6890",
        ],
      ].map(([name, description, price], i) => ({
        "@type": "ListItem",
        position: i + 1,
        item: {
          "@type": "TouristTrip",
          name,
          description,
          url: `${ORIGIN}#expeditions`,
          provider: { "@id": `${ORIGIN}#organization` },
          offers: {
            "@type": "Offer",
            price,
            priceCurrency: "USD",
            availability: "https://schema.org/InStock",
          },
        },
      })),
    },
  ],
}

// NOTE: script-src / style-src include 'unsafe-inline' because the React Router
// streaming-hydration runtime and Radix UI emit inline scripts and inline style
// attributes that static GitHub Pages cannot sign with a nonce or hash. Every
// other directive stays locked down. Enforce a hash/nonce CSP, X-Frame-Options
// and HSTS at the edge (e.g. Cloudflare) for full header-level hardening.
const CSP = [
  "default-src 'self'",
  "base-uri 'self'",
  "object-src 'none'",
  "img-src 'self' data: https://images.unsplash.com",
  "font-src 'self' https://fonts.gstatic.com",
  "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
  "script-src 'self' 'unsafe-inline'",
  "connect-src 'self' https://images.unsplash.com",
  "worker-src 'self'",
  "manifest-src 'self'",
  "form-action 'self'",
  "frame-src 'none'",
  "upgrade-insecure-requests",
].join("; ")

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta httpEquiv="Content-Security-Policy" content={CSP} />
        <meta name="referrer" content="strict-origin-when-cross-origin" />
        <meta name="color-scheme" content="light" />
        <meta name="theme-color" content="#1A140C" />

        {/* Icons & PWA */}
        <link rel="icon" href={`${BASE}/favicon.ico`} sizes="any" />
        <link rel="icon" href={`${BASE}/favicon.svg`} type="image/svg+xml" />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href={`${BASE}/favicon-32.png`}
        />
        <link rel="apple-touch-icon" href={`${BASE}/apple-touch-icon.png`} />
        <link rel="manifest" href={`${BASE}/site.webmanifest`} />

        {/* Fonts: Fraunces (display) + Inter (body) + JetBrains Mono (accents) */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin=""
        />
        <link rel="preconnect" href="https://images.unsplash.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,300..700;1,9..144,300..600&family=Inter:wght@300;400;500;600&family=JetBrains+Mono:wght@300;400;500&display=swap"
          rel="stylesheet"
        />

        <Meta />
        <Links />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(JSON_LD) }}
        />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  )
}

export default function App() {
  // Register the offline-first service worker (non-fatal if it fails).
  React.useEffect(() => {
    if (!("serviceWorker" in navigator)) return
    navigator.serviceWorker.register(`${BASE}/sw.js`).catch(() => {})
  }, [])
  return <Outlet />
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  let message = "Oops!"
  let details = "An unexpected error occurred."
  let stack: string | undefined

  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? "404" : "Error"
    details =
      error.status === 404
        ? "The requested page could not be found."
        : error.statusText || details
  } else if (import.meta.env.DEV && error && error instanceof Error) {
    details = error.message
    stack = error.stack
  }

  return (
    <main className="mx-auto max-w-2xl p-6 pt-24">
      <h1 className="font-display text-3xl">{message}</h1>
      <p className="mt-2 text-muted-foreground">{details}</p>
      {stack && (
        <pre className="mt-4 w-full overflow-x-auto rounded-md bg-secondary p-4 text-xs">
          <code>{stack}</code>
        </pre>
      )}
    </main>
  )
}
