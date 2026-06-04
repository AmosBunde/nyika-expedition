/* ============================================================
   NYIKA EXPEDITIONS — Service Worker (offline-first PWA)
   Bump VERSION on every asset change to invalidate old caches.
   ============================================================ */

const VERSION = 'nyika-v1';
const PRECACHE = `precache-${VERSION}`;
const RUNTIME = `runtime-${VERSION}`;

// Same-origin core shell, precached on install. Relative paths keep this
// correct under a GitHub Pages project subpath (/nyika-expedition/).
const PRECACHE_URLS = [
  './',
  './index.html',
  './styles.css',
  './script.js',
  './site.webmanifest',
  './favicon.svg',
  './favicon-32.png',
  './apple-touch-icon.png',
  './icon-192.png',
  './icon-512.png',
  './privacy.html',
  './terms.html',
  './404.html'
];

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

  // Same-origin static assets: stale-while-revalidate.
  if (url.origin === self.location.origin) {
    event.respondWith(
      caches.open(PRECACHE).then((cache) =>
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
