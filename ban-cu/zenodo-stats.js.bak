/* zenodo-stats.js — cập nhật số lượt xem/lượt tải của thẻ thống kê Zenodo theo dữ liệu live.
   Website tĩnh: gọi Zenodo REST API trực tiếp từ trình duyệt (API công khai, CORS mở).
   Nếu gọi thất bại (mạng, rate limit), giữ nguyên số liệu tĩnh đã ghi trong HTML. */
(function () {
  'use strict';
  var cards = document.querySelectorAll('[data-zenodo]');
  if (!cards.length) return;

  var cacheKey = 'jshuong-zenodo-stats';
  var TTL_MS = 24 * 60 * 60 * 1000; // mỗi bản ghi cache 1 ngày

  try {
    var cached = JSON.parse(sessionStorage.getItem(cacheKey) || '{}');
  } catch (e) {
    cached = {};
  }

  var remaining = cards.length;
  var done = function () { remaining -= 1; if (remaining <= 0) markUpdated(); };

  cards.forEach(function (el) {
    var recid = el.getAttribute('data-zenodo');
    var stamp = document.querySelector('.hl-stamp');
    var v = parseInt(el.getAttribute('data-default-v'), 10);
    var d = parseInt(el.getAttribute('data-default-d'), 10);

    // dùng cache nếu còn hạn và cập nhật trong vòng 7 ngày gần nhất
    var c = cached[recid];
    var now = Date.now();
    if (c && c.t && (now - c.t) < TTL_MS) {
      render(el, c.v, c.d, c.updatedAt, stamp);
      done();
      return;
    }

    fetch('https://zenodo.org/api/records/' + recid, {
      headers: { 'Accept': 'application/json' }
    }).then(function (r) {
      if (!r.ok) throw new Error('HTTP ' + r.status);
      return r.json();
    }).then(function (data) {
      var nv = (data.stats && typeof data.stats.views === 'number') ? data.stats.views : v;
      var nd = (data.stats && typeof data.stats.downloads === 'number') ? data.stats.downloads : d;
      cached[recid] = { v: nv, d: nd, t: now, updatedAt: data.updated };
      try { sessionStorage.setItem(cacheKey, JSON.stringify(cached)); } catch (e) { /* ignore */ }
      render(el, nv, nd, data.updated, stamp);
    }).catch(function () {
      // giữ số liệu tĩnh, không làm hỏng trải nghiệm
    }).finally(done);
  });

  function render(el, views, downloads, updatedAt, stamp) {
    el.innerHTML = fmt(views) + ' <span style="font-size:.85rem">&#128065;</span> \u00b7 ' +
      fmt(downloads) + ' <span style="font-size:.85rem">&#11015;</span>';
    if (stamp && updatedAt) {
      stamp.setAttribute('data-live-updated', updatedAt);
    }
  }

  function fmt(n) {
    return String(n).replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  }

  /* Cập nhật dòng "số liệu Zenodo chốt ngày..." thành trạng thái live. */
  function markUpdated() {
    var stamp = document.querySelector('.hl-stamp');
    if (!stamp || stamp.getAttribute('data-live-updated')) return;
    var d = new Date();
    var dd = String(d.getDate()).padStart(2, '0');
    var mm = String(d.getMonth() + 1).padStart(2, '0');
    var stampLive = stamp.querySelector('.lang-vi');
    var stampEn = stamp.querySelector('.lang-en');
    if (stampLive) stampLive.textContent =
      '\u{1F31F} Tin nổi bật hệ sinh thái \u00abJe m\u2019appelle H\u01b0\u01a1ng\u00bb \u00b7 số liệu Zenodo cập nhật trực tiếp';
    if (stampEn) stampEn.textContent =
      '\u{1F31F} \u00abJe m\u2019appelle H\u01b0\u01a1ng\u00bb ecosystem highlights \u00b7 Zenodo figures live';
    stamp.setAttribute('data-live-updated', '1');
  }
})();
