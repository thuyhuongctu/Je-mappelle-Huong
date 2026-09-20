/* Service worker - Je m'appelle Hương (trang học thuật cá nhân) */
const CACHE = 'jshuong-v110';
const CORE = [
  './',
  'index.html',
  'garden.html',
  'publications.html',
  'cv.html',
  '404.html',
  'music.html',
  'songbook.html',
  'trangvien.html',
  'blog.html',
  'so-luu-niem.html',
  'assets/vendor/three-r128.min.js',
  'assets/js/huong3d.js',
  'assets/js/clayhero.js',
  'assets/js/vn-shape.js',
  'assets/js/dongho.js',
  'assets/js/music.js',
  'assets/js/site-chrome.js',
  'assets/js/so-luu-niem.js',
  'assets/data/so-luu-niem.json',
  'assets/css/site-chrome.css',
  'manifest.webmanifest',
  'assets/img/huong_clay_portrait.webp',
  'assets/img/vn-map-3d.webp',
  'assets/img/hero-co-poster.webp',
  'assets/img/maida-demo-poster.webp',
  'assets/img/bizon-intro-poster.webp',
  'assets/img/enquiz-intro-poster.webp',
  'assets/img/wct-trailer-poster.webp',
  'assets/img/comdraft-character.webp',
  'assets/img/comdraft-app.webp',
  'assets/img/mekong-sunfire-cover.webp',
  'assets/img/music-cover-ba-cong-con.webp',
  'assets/img/ba-goi-con-ve-poster.webp',
  'assets/img/huong-nghe-nhac-dung.webp',
  'assets/img/huong-nghe-nhac-ngoi.webp',
  'assets/img/huong-ao-dai-sen.webp',
  'assets/img/vn-outline.svg',
  'assets/img/huong_clay_full.webp',
  'assets/img/pro_aodai.webp',
  'assets/img/lr-je-mappelle-huong.webp',
  'assets/img/lr-seal-round.webp',
  'assets/img/garden_hub.webp',
  'assets/img/greet_hero.webp',
  'assets/img/huong-ai-chan-dung.webp',
  'assets/img/huong_chi.webp',
  'assets/img/huong_xedap_full.webp',
  'assets/img/huong_silver_tablet.webp',
  'assets/img/huong_silver_room.webp',
  'assets/img/pose_gioithieu_fix.webp',
  'assets/img/pose_gioithieu2_fix.webp',
  'assets/img/pose_reo_fix.webp',
  'assets/img/pose_teo2_fix.webp',
  'assets/img/huong-ai-sen.webp',
  'assets/img/huong-ai-chao.webp',
  'assets/img/huong-ai-cuon-thu.webp',
  'assets/img/huong-ai-sen-sang.webp',
  'assets/img/huong-ai-xe-dap.webp',
  'assets/img/huong-ai-doc-sach.webp',
  'assets/img/huong-ai-dan-nguyet.webp',
  'assets/img/huong-ai-thuyen.webp',
  'assets/img/khu-thu-vien-thuyen.webp',
  'assets/img/khu-hoc-thuat-an-thu.webp',
  'assets/img/khu-am-nhac-dan-nguyet.webp',
  'assets/img/khu-loi-ke-den-long.webp',
  'assets/img/khu-gioi-thieu-chong-tra.webp',
  'assets/img/khu-tuong-lai-xe-dap.webp',
  'favicon.ico',
  'icons/icon-192.png',
  'icons/icon-512.png',
  'icons/icon-maskable-192.png',
  'icons/icon-maskable-512.png',
  'icons/apple-touch-icon.png',
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
