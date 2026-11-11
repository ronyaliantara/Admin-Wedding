// Service worker Harvy Wedding Organizer — membuat aplikasi tetap jalan tanpa internet.
// Naikkan nomor versi setiap kali ada update agar HP mengambil file terbaru.
const CACHE_NAME = 'harvy-wo-v66';
const ASSETS = [
  './',
  './index.html',
  './css/style.css?v=66',
  './js/data.js?v=66',
  './js/excel.js?v=66',
  './js/pdf.js?v=66',
  './js/app.js?v=66',
  './manifest.json',
  './icons/logo.jpg',
  './icons/icon-192.png',
  './icons/icon-512.png',
  './icons/icon-maskable-192.png',
  './icons/icon-maskable-512.png',
  './icons/apple-touch-icon.png'
];

self.addEventListener('install', event => {
  self.skipWaiting();
  event.waitUntil(caches.open(CACHE_NAME).then(c => c.addAll(ASSETS)));
});

// Hapus cache versi lama (termasuk cache Mahligai WO)
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys => Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

const fromCache = req => caches.match(req).then(hit => hit ||
  caches.match(req, { ignoreSearch: true }).then(loose => loose ||
    (req.mode === 'navigate' ? caches.match('./index.html') : undefined)));

// Ambil dari internet (versi terbaru), tapi kalau sinyal lemah lebih dari 3 detik pakai simpanan di HP.
self.addEventListener('fetch', event => {
  if (event.request.method !== 'GET') return;
  const url = new URL(event.request.url);
  if (!url.protocol.startsWith('http')) return;
  const isFont = /fonts\.(googleapis|gstatic)\.com$/.test(url.host);
  if (url.origin !== self.location.origin && !isFont) return;

  const network = fetch(event.request).then(res => {
    if (res && (res.status === 200 || res.type === 'opaque')) {
      const copy = res.clone();
      caches.open(CACHE_NAME).then(c => c.put(event.request, copy));
    }
    return res;
  });
  event.respondWith(new Promise(resolve => {
    let done = false;
    const finish = r => { if (!done && r) { done = true; resolve(r); } };
    const timer = setTimeout(() => fromCache(event.request).then(finish), 3000);
    network.then(r => { clearTimeout(timer); finish(r); })
      .catch(() => { clearTimeout(timer); fromCache(event.request).then(r => finish(r || Response.error())); });
  }));
  event.waitUntil(network.catch(() => {}));
});
