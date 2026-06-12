/* ============================================================
   NYIKA EXPEDITIONS — Service Worker (offline-first PWA)
   Bump VERSION on every release to invalidate old caches.
   The app now ships content-hashed asset bundles, so we only
   precache the navigable shell and let same-origin assets be
   cached at runtime (stale-while-revalidate) as they are first
   requested. Relative paths keep scope correct under the
   GitHub Pages project subpath (/nyika-expedition/).
   ============================================================ */

const VERSION = 'nyika-v3';
const PRECACHE = `precache-${VERSION}`;
const RUNTIME = `runtime-${VERSION}`;

// Only stable, always-present URLs — addAll() rejects the whole install if any
// entry 404s, so hashed bundles are intentionally left to runtime caching.
const PRECACHE_URLS = ['./', './index.html'];

const RUNTIME_ORIGINS = [
  'https://fonts.googleapis.com',
  'https://fonts.gstatic.com',
  'https://images.unsplash.com'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(PRECACHE)
      .then((cache) => cache.addAll(PRECACHE_URLS))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(
        keys
          .filter((key) => key !== PRECACHE && key !== RUNTIME)
          .map((key) => caches.delete(key))
      ))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  const { request } = event;
  if (request.method !== 'GET') return;

  const url = new URL(request.url);

  // Navigations: network-first for freshness, cached shell when offline.
  if (request.mode === 'navigate') {
    event.respondWith(
      fetch(request).catch(() =>
        caches.match(request).then((cached) => cached || caches.match('./index.html'))
      )
    );
    return;
  }

  // Fonts & remote imagery: cache-first (stale is acceptable, saves bandwidth).
  if (RUNTIME_ORIGINS.includes(url.origin)) {
    event.respondWith(
      caches.open(RUNTIME).then((cache) =>
        cache.match(request).then((cached) =>
          cached || fetch(request)
            .then((response) => {
              cache.put(request, response.clone());
              return response;
            })
            .catch(() => cached)
        )
      )
    );
    return;
  }

  // Same-origin static assets (hashed JS/CSS): stale-while-revalidate.
  if (url.origin === self.location.origin) {
    event.respondWith(
      caches.open(RUNTIME).then((cache) =>
        cache.match(request).then((cached) => {
          const network = fetch(request)
            .then((response) => {
              cache.put(request, response.clone());
              return response;
            })
            .catch(() => cached);
          return cached || network;
        })
      )
    );
  }
});
