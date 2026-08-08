/* Service worker — Je m'appelle Hương (trang học thuật cá nhân) */
const CACHE = 'jshuong-v1';
const CORE = [
  './',
  'index.html',
  'manifest.webmanifest',
  'assets/img/pro_aodai.png',
  'assets/img/lab_scene.jpg',
  'assets/img/greet_hero.png',
  'assets/img/guide_tech.png',
  'assets/img/present.png',
  'assets/img/teach.png',
  'assets/img/pose_tablet.png',
  'assets/img/pose_laptop.png',
  'assets/img/think_scene.jpg',
  'icons/icon-192.png',
  'icons/icon-512.png'
];

self.addEventListener('install', (e) => {
  e.waitUntil(caches.open(CACHE).then((c) => c.addAll(CORE)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

// Same-origin: network-first for the page (always fresh content), cache-first for assets.
self.addEventListener('fetch', (e) => {
  const url = new URL(e.request.url);
  if (e.request.method !== 'GET' || url.origin !== location.origin) return;
  if (e.request.mode === 'navigate') {
    e.respondWith(
      fetch(e.request)
        .then((r) => { caches.open(CACHE).then((c) => c.put('index.html', r.clone())); return r; })
        .catch(() => caches.match('index.html'))
    );
    return;
  }
  e.respondWith(
    caches.match(e.request).then((hit) => hit || fetch(e.request).then((r) => {
      if (r.ok) caches.open(CACHE).then((c) => c.put(e.request, r.clone()));
      return r;
    }))
  );
});
