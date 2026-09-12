/* Chụp ảnh tĩnh dự phòng cho cảnh đất sét 3D ở hero trang chủ.

   Ảnh này là thứ khách thấy ngay khi mở trang, và là thứ duy nhất khách
   thấy khi máy không có WebGL, khi bật tiết kiệm dữ liệu, hoặc khi người
   dùng chọn giảm hiệu ứng. Vì vậy nó phải đúng bằng khung đầu tiên của
   cảnh thật - chụp từ chính cảnh đó thay vì vẽ lại bằng tay.

   Cần: Node + Playwright (chỉ dùng khi phát triển, không phải phụ thuộc
   của trang) và một máy chủ tĩnh đang phục vụ thư mục gốc của repo.

       npx http-server -p 8899 -c-1 &
       node scripts/make-hero-poster.js http://127.0.0.1:8899

   Kết quả: assets/img/hero-clay.webp (có kênh alpha, nền do thẻ CSS lo).
*/
'use strict';
const fs = require('fs');
const path = require('path');
const { chromium } = require('playwright');

const GOC = process.argv[2] || 'http://127.0.0.1:8899';
const RA = path.join(__dirname, '..', 'assets', 'img', 'hero-clay.webp');

(async () => {
  const browser = await chromium.launch({
    args: ['--use-gl=angle', '--use-angle=swiftshader', '--enable-unsafe-swiftshader']
  });
  const page = await browser.newPage({
    viewport: { width: 1280, height: 900 },
    deviceScaleFactor: 2          // canvas 330 CSS px -> ảnh 660 px
  });
  // Chặn mọi thứ ngoài máy chủ tĩnh: phông chữ ngoài không cần cho việc chụp.
  await page.route('**/*', (r) => {
    const u = r.request().url();
    (u.startsWith(GOC) || u.startsWith('data:') || u.startsWith('blob:')) ? r.continue() : r.abort();
  });
  await page.goto(GOC + '/index.html', { waitUntil: 'domcontentloaded' });
  await page.waitForSelector('#claysan canvas.claycanvas', { timeout: 30000 });
  await page.waitForTimeout(1200);

  const duLieu = await page.evaluate(() => {
    // vẽ lại đúng khung nghỉ rồi mới xuất, để ảnh khớp khung đầu của cảnh
    if (window.CLAY_HERO) window.CLAY_HERO.ve();
    const c = document.querySelector('canvas.claycanvas');
    return { url: c.toDataURL('image/webp', 0.92), w: c.width, h: c.height };
  });
  await browser.close();

  const b64 = duLieu.url.split(',')[1];
  if (!duLieu.url.startsWith('data:image/webp')) {
    throw new Error('Trình duyệt không xuất được WebP: ' + duLieu.url.slice(0, 30));
  }
  fs.writeFileSync(RA, Buffer.from(b64, 'base64'));
  console.log('%s: %d x %d, %d byte', path.relative(process.cwd(), RA),
    duLieu.w, duLieu.h, fs.statSync(RA).size);
})();
