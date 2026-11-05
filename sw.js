const CACHE_NAME = 'mahligai-wo-pwa-v21.7';
const ASSETS_TO_CACHE = [
  './',
  './index.html',
  './css/style.css',
  './js/app.js',
  './manifest.json',
  './icons/favicon.svg',
  './icons/icon-192.png',
  './icons/icon-512.png',
  './Database_Harvy_Wedding.xlsx'
];

// Install: Pre-cache all core Static Web App & Offline PWA assets
self.addEventListener('install', (event) => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS_TO_CACHE);
    })
  );
});

// Activate: Clean up all older cache versions immediately and claim clients
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

// Support manual skipWaiting message from client
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});

// Fetch: Network-First with full Offline Cache Fallback (ignores ?v= query strings when matching offline cache)
self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return;
  const url = new URL(event.request.url);
  if (!url.protocol.startsWith('http')) return;

  event.respondWith(
    fetch(event.request)
      .then((networkResponse) => {
        if (
          networkResponse &&
          networkResponse.status === 200 &&
          (networkResponse.type === 'basic' || networkResponse.type === 'cors')
        ) {
          const responseToCache = networkResponse.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, responseToCache);
          });
        }
        return networkResponse;
      })
      .catch(() => {
        // 1. Try exact match first, then ignoreSearch match (so style.css?v=21.5 matches ./css/style.css offline)
        return caches.match(event.request).then((exactMatch) => {
          if (exactMatch) return exactMatch;
          return caches.match(event.request, { ignoreSearch: true }).then((looseMatch) => {
            if (looseMatch) return looseMatch;
            // 2. Fallback to index.html for navigation requests in offline standalone PWA mode
            const acceptHeader = event.request.headers ? event.request.headers.get('accept') : '';
            if (event.request.mode === 'navigate' || (acceptHeader && acceptHeader.includes('text/html'))) {
              return caches.match('./index.html');
            }
          });
        });
      })
  );
});
