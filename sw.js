/* Service worker — Je m'appelle Hương (trang học thuật cá nhân) */
const CACHE = 'jshuong-v36';
const CORE = [
  './',
  'index.html',
  'music.html',
  'songbook.html',
  'trangvien.html',
  'blog.html',
  'assets/vendor/three-r128.min.js',
  'assets/js/huong3d.js',
  'assets/js/dongho.js',
  'manifest.webmanifest',
  'assets/img/pro_aodai.png',
  'assets/img/lab_scene.jpg',
  'assets/img/greet_hero.webp',
  'assets/img/guide_tech.webp',
  'assets/img/present.webp',
  'assets/img/teach.webp',
  'assets/img/think_scene.jpg',
  'assets/img/huong_silver_tablet.webp',
  'assets/img/huong_silver_room.webp',
  'assets/img/huong_xedap_new.webp',
  'assets/img/pose_gioithieu.webp',
  'assets/img/pose_reo.webp',
  'assets/img/pose_teo2.webp',
  'assets/img/pose_gioithieu2.webp',
  'assets/img/huong_chi.webp',
  'assets/img/lr-je-mappelle-huong.webp',
  'assets/img/lr-seal-round.webp',
  'favicon.ico',
  'assets/img/garden_hub.jpg',
  'assets/img/innovation_banner.jpg',
  'assets/img/creative_library.jpg',
  'assets/img/research_map.webp',
  'icons/icon-192.png',
  'icons/icon-512.png',
  'zenodo-stats.js',
  'sitemap.xml',
  'robots.txt'
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
    const url = new URL(e.request.url);
    const key = url.pathname === '/' || url.pathname.endsWith('/index.html') ? 'index.html' : url.pathname;
    e.respondWith(
      fetch(e.request)
        .then((r) => { caches.open(CACHE).then((c) => c.put(key, r.clone())); return r; })
        .catch(() => caches.match(key))
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
