/* ---- Atlas chi so: choropleth the gioi dat canh ban do khung du lieu ----

   Day la BOI CANH, khong phai du lieu luan an. Khung du lieu luan an la tam
   SVG 50 nen kinh te ngay phia tren; tam nay ve nam chi so phat trien chung
   cua ca the gioi de dat 50 nen kinh te ay vao boi canh.

   Nang: d3-geo 35 KB + topojson 7 KB + hai tep du lieu 171 KB. Qua nang de
   nap cho moi khach, nen chi nap khi khoi nay vao khung nhin - truoc do o
   day chi co mot dong chu. Khach tat hieu ung chuyen dong thi van nap binh
   thuong, chi bo phan chuyen canh.

   Ban goc la mot ung dung React (TanStack Start). Trang nay khong co buoc
   build nen phan ve viet lai bang JS thuan; phep chieu, cach chia ngu phan
   vi va bang mau giu dung nhu ban goc. */
(function () {
  'use strict';

  var khoi = document.getElementById('atlas-chiso');
  if (!khoi) return;

  var VN = '704';                     /* ma so Viet Nam trong Natural Earth */
  var BAC = 5;                        /* nam bac mau, chia theo ngu phan vi */
  var daNap = false, dangNap = false;
  var DL = null, TOPO = null;         /* du lieu va hinh the, nap mot lan */
  var chiSo = 'gdp';                  /* chi so dang xem */
  var chonId = VN;                    /* nuoc dang chon */
  var mohinh = {};                    /* mo hinh tung chi so, dung lai duoc */
  var tam = null;                     /* duong di da tinh theo be ngang */
  var beNgang = 0;

  function ng() {
    var l = (document.documentElement.getAttribute('lang') || 'en').slice(0, 2).toLowerCase();
    return l === 'vi' ? 'vi' : 'en';   /* khong co ban tieng Phap: theo tieng Anh */
  }
  function t(vi, en) { return ng() === 'vi' ? vi : en; }

  /* ---- nap ---- */

  function tep(duongDan) {
    return fetch(duongDan, { cache: 'force-cache' }).then(function (r) {
      if (!r.ok) throw new Error(duongDan + ' ' + r.status);
      return r.json();
    });
  }
  function kichBan(duongDan) {
    return new Promise(function (ok, hong) {
      var s = document.createElement('script');
      s.src = duongDan; s.onload = ok; s.onerror = function () { hong(new Error(duongDan)); };
      document.head.appendChild(s);
    });
  }

  function nap() {
    if (daNap || dangNap) return;
    dangNap = true;
    khoi.querySelector('.atl-cho').textContent = t('Đang tải bản đồ…', 'Loading the map…');
    /* d3-geo khai d3-array la phu thuoc UMD: phai nap d3-array TRUOC, khong
       thi d3-geo nem 't.Adder is not a constructor' ngay luc nap. */
    kichBan('assets/vendor/d3-array.min.js').then(function () {
      return Promise.all([
        kichBan('assets/vendor/d3-geo.min.js'),
        kichBan('assets/vendor/topojson-client.min.js'),
        tep('assets/data/atlas-chi-so.json'),
        tep('assets/data/countries-110m.json')
      ]);
    }).then(function (kq) {
      DL = kq[2]; TOPO = kq[3];
      daNap = true; dangNap = false;
      dung();
    }).catch(function (e) {
      dangNap = false;
      khoi.querySelector('.atl-cho').textContent =
        t('Không tải được bản đồ. Thử lại sau.', 'The map could not be loaded. Try again later.');
      if (window.console) console.warn('atlas:', e);
    });
  }

  /* ---- mo hinh: ngu phan vi, thu hang, trung vi ---- */

  function moHinh(id) {
    if (mohinh[id]) return mohinh[id];
    var co = DL.countries.filter(function (c) { return c.values[id] != null; });
    var gt = co.map(function (c) { return c.values[id]; }).sort(function (a, b) { return a - b; });
    var moc = [];
    for (var i = 1; i < BAC; i++) {
      var p = (i / BAC) * (gt.length - 1), lo = Math.floor(p), hi = Math.ceil(p);
      moc.push(gt[lo] + (gt[hi] - gt[lo]) * (p - lo));
    }
    var bac = {}, hop = [];
    for (var b = 0; b < BAC; b++) hop.push({ min: Infinity, max: -Infinity, n: 0 });
    DL.countries.forEach(function (c) {
      var v = c.values[id];
      if (v == null) { bac[c.id] = null; return; }
      var k = 0; while (k < moc.length && v > moc[k]) k++;
      bac[c.id] = k;
      var h = hop[k];
      if (v < h.min) h.min = v;
      if (v > h.max) h.max = v;
      h.n++;
    });
    var xep = co.slice().sort(function (a, b) { return b.values[id] - a.values[id]; });
    var hang = {};
    xep.forEach(function (c, i) { hang[c.id] = i + 1; });
    var giua = gt.length % 2 ? gt[(gt.length - 1) / 2]
                             : (gt[gt.length / 2 - 1] + gt[gt.length / 2]) / 2;
    var nam = co.map(function (c) { return c.years[id]; }).filter(function (y) { return y != null; });
    mohinh[id] = {
      hop: hop, bac: bac, hang: hang, n: co.length, giua: giua,
      namMin: nam.length ? Math.min.apply(null, nam) : null,
      namMax: nam.length ? Math.max.apply(null, nam) : null
    };
    return mohinh[id];
  }

  /* ---- so ---- */

  function soCho(id, v) {
    if (v == null || isNaN(v)) return '—';
    var le = id === 'gdp' ? 0 : id === 'hdi' ? 3 : id === 'fdi' ? 2 : 1;
    return v.toLocaleString(ng() === 'vi' ? 'vi-VN' : 'en-GB',
      { minimumFractionDigits: id === 'gdp' ? 0 : le, maximumFractionDigits: le });
  }
  function khoang(id, a, b) {
    var x = soCho(id, a), y = soCho(id, b);
    return x === y ? x : x + ' – ' + y;
  }

  /* ---- ve ---- */

  /* Mo hinh thu phong giu nguyen nhu ban goc: mot phep bien doi
     translate(x,y) scale(k) tren mot the <g>, chu KHONG ve lai duong di moi
     lan keo. Ve lai 177 hinh nuoc o moi khung hinh thi giat; bien doi thi
     trinh duyet lo, keo muot ca tren dien thoai. */
  var K_MIN = 1, K_MAX = 24;
  var goc = { x: 0, y: 0, k: 1 };     /* khung nhin hien tai */
  var cao = 0;                        /* chieu cao san, dung de kep */
  var gMap = null, svgEl = null;      /* the <g> va <svg> dang dung */
  var animId = 0;

  function kep(v) {
    var k = Math.min(K_MAX, Math.max(K_MIN, v.k));
    var le = Math.min(72, beNgang / 4, cao / 4);
    return {
      k: k,
      x: Math.min(beNgang - le, Math.max(le - beNgang * k, v.x)),
      y: Math.min(cao - le, Math.max(le - cao * k, v.y))
    };
  }
  function datGoc(v) {
    goc = v;
    if (gMap) gMap.setAttribute('transform', 'translate(' + v.x + ',' + v.y + ') scale(' + v.k + ')');
  }
  function dungAnim() { if (animId) { cancelAnimationFrame(animId); animId = 0; } }
  function bayToi(dich) {
    dungAnim();
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) { datGoc(dich); return; }
    var tu = { x: goc.x, y: goc.y, k: goc.k }, t0 = performance.now();
    (function buoc(nay) {
      var p = Math.min(1, (nay - t0) / 340), e = 1 - Math.pow(1 - p, 3);
      datGoc({ x: tu.x + (dich.x - tu.x) * e, y: tu.y + (dich.y - tu.y) * e, k: tu.k + (dich.k - tu.k) * e });
      animId = p < 1 ? requestAnimationFrame(buoc) : 0;
    })(performance.now());
  }
  function phongTai(mx, my, kMoi, muot) {
    var k = Math.min(K_MAX, Math.max(K_MIN, kMoi)), ti = k / goc.k;
    var dich = kep({ k: k, x: mx - (mx - goc.x) * ti, y: my - (my - goc.y) * ti });
    if (muot) bayToi(dich); else datGoc(dich);
  }
  function veGiua(id) {
    var d = null;
    tam.dat.forEach(function (x) { if (x.id === id) d = x; });
    if (!d || isNaN(d.cx) || isNaN(d.cy)) return;
    var k = Math.min(K_MAX, Math.max(goc.k, 3.2));
    bayToi(kep({ k: k, x: beNgang / 2 - k * d.cx, y: cao / 2 - k * d.cy }));
  }

  function tinhTam(w, h) {
    var pr = d3.geoNaturalEarth1();
    pr.fitExtent([[8, 8], [w - 8, h - 8]], { type: 'Sphere' });
    var duong = d3.geoPath(pr);
    var bo = topojson.feature(TOPO, TOPO.objects.countries).features;
    var dat = [];
    bo.forEach(function (f) {
      var d = duong(f);
      if (!d) return;
      var tt = duong.centroid(f);
      dat.push({
        id: f.id == null ? '' : String(f.id), ten: (f.properties && f.properties.name) || '',
        d: d, cx: tt[0], cy: tt[1]
      });
    });
    return {
      dat: dat,
      cau: duong({ type: 'Sphere' }) || '',
      luoi: duong(d3.geoGraticule().step([20, 20])()) || '',
      vien: duong(topojson.mesh(TOPO, TOPO.objects.countries, function (a, b) { return a !== b; })) || ''
    };
  }

  function dung() {
    var sanBox = khoi.querySelector('.atl-ve');
    var w = Math.max(280, sanBox.clientWidth || khoi.clientWidth || 640);
    var h = Math.round(w * 0.52);
    if (!tam || beNgang !== w) { tam = tinhTam(w, h); beNgang = w; cao = h; goc = { x: 0, y: 0, k: 1 }; }
    cao = h;
    var m = moHinh(chiSo);

    var p = [];
    p.push('<svg class="atl-svg" viewBox="0 0 ' + w + ' ' + h + '" tabindex="0" role="img" aria-labelledby="atl-tt">');
    p.push('<title id="atl-tt">' + t('Bản đồ thế giới tô theo ngũ phân vị của chỉ số đang chọn. Kéo để di chuyển, cuộn để thu phóng.',
      'World map shaded by quintile of the selected indicator. Drag to pan, scroll to zoom.') + '</title>');
    p.push('<g class="atl-g">');
    p.push('<path class="atl-cau" d="' + tam.cau + '"/>');
    p.push('<path class="atl-luoi" d="' + tam.luoi + '"/>');
    tam.dat.forEach(function (d) {
      var b = m.bac[d.id];
      var mau = b == null ? 'var(--atl-thieu)' : 'var(--atl-b' + b + ')';
      p.push('<path class="atl-nuoc' + (d.id === chonId ? ' atl-chon' : '') +
        '" data-id="' + d.id + '" style="fill:' + mau + '" d="' + d.d + '"></path>');
    });
    p.push('<path class="atl-vien" d="' + tam.vien + '"/>');
    p.push('</g></svg>');
    p.push('<div class="atl-dieu">' +
      '<button type="button" class="atl-zi" aria-label="' + t('Phóng to', 'Zoom in') + '">+</button>' +
      '<button type="button" class="atl-zo" aria-label="' + t('Thu nhỏ', 'Zoom out') + '">−</button>' +
      '<button type="button" class="atl-zr" aria-label="' + t('Đặt lại', 'Reset') + '">↺</button></div>');
    p.push('<div class="atl-meo" hidden></div>');
    sanBox.innerHTML = p.join('');

    svgEl = sanBox.querySelector('.atl-svg');
    gMap = sanBox.querySelector('.atl-g');
    datGoc(kep(goc));
    noiTay(sanBox);
    veTab(); veChu(); veDoc();
  }

  /* ---- keo, thu phong, cham ---- */

  function noiTay(sanBox) {
    var keo = null, chum = null, diem = {}, soDiem = 0, daDi = false, idXuong = null;
    var meo = sanBox.querySelector('.atl-meo');

    function hienMeo(x, y, id) {
      var c = null;
      DL.countries.forEach(function (v) { if (v.id === id) c = v; });
      if (!c) { meo.hidden = true; return; }
      var i = tim(chiSo), v = c.values[chiSo];
      meo.innerHTML = '<b>' + (ng() === 'vi' ? c.nameVi : c.name) + '</b>' +
        '<span>' + soCho(chiSo, v) + ' ' + t(i.unit, i.unitEn) + '</span>';
      meo.hidden = false;
      var r = sanBox.getBoundingClientRect(), bw = 170, bh = 46, l = x + 14, tp = y + 16;
      if (l + bw > r.width - 8) l = x - bw - 12;
      if (tp + bh > r.height - 8) tp = y - bh - 12;
      meo.style.left = Math.max(8, l) + 'px';
      meo.style.top = Math.max(8, tp) + 'px';
    }

    svgEl.addEventListener('wheel', function (e) {
      e.preventDefault();
      var r = svgEl.getBoundingClientRect();
      var ti = beNgang / r.width;                 /* toa do SVG, khong phai pixel */
      phongTai((e.clientX - r.left) * ti, (e.clientY - r.top) * ti,
        goc.k * Math.exp(-e.deltaY * 0.0014), false);
    }, { passive: false });

    svgEl.addEventListener('pointerdown', function (e) {
      if (e.button !== 0) return;
      svgEl.setPointerCapture(e.pointerId);
      diem[e.pointerId] = { x: e.clientX, y: e.clientY }; soDiem++;
      dungAnim(); daDi = false;
      idXuong = e.target && e.target.getAttribute ? e.target.getAttribute('data-id') : null;
      sanBox.classList.add('dang-keo'); meo.hidden = true;
      if (soDiem >= 2) {
        var k = Object.keys(diem), a = diem[k[0]], b = diem[k[1]];
        var r = svgEl.getBoundingClientRect(), ti = beNgang / r.width;
        chum = { d: Math.hypot(a.x - b.x, a.y - b.y) || 1, k: goc.k, x: goc.x, y: goc.y,
                 mx: ((a.x + b.x) / 2 - r.left) * ti, my: ((a.y + b.y) / 2 - r.top) * ti };
        keo = null; daDi = true; return;
      }
      keo = { x: goc.x, y: goc.y, px: e.clientX, py: e.clientY };
    });

    svgEl.addEventListener('pointermove', function (e) {
      var r = svgEl.getBoundingClientRect(), ti = beNgang / r.width;
      if (!keo && !chum) {
        var id = e.target && e.target.getAttribute ? e.target.getAttribute('data-id') : null;
        if (id) hienMeo(e.clientX - r.left, e.clientY - r.top, id); else meo.hidden = true;
      }
      if (!diem[e.pointerId]) return;
      diem[e.pointerId] = { x: e.clientX, y: e.clientY };
      if (soDiem >= 2 && chum) {
        var k2 = Object.keys(diem), a = diem[k2[0]], b = diem[k2[1]];
        var d = Math.hypot(a.x - b.x, a.y - b.y) || 1;
        var mx = ((a.x + b.x) / 2 - r.left) * ti, my = ((a.y + b.y) / 2 - r.top) * ti;
        var k = Math.min(K_MAX, Math.max(K_MIN, chum.k * (d / chum.d)));
        datGoc(kep({ k: k, x: mx - (k / chum.k) * (chum.mx - chum.x),
                            y: my - (k / chum.k) * (chum.my - chum.y) }));
        return;
      }
      if (!keo) return;
      var dx = (e.clientX - keo.px) * ti, dy = (e.clientY - keo.py) * ti;
      if (Math.hypot(dx, dy) > 4) daDi = true;
      datGoc(kep({ x: keo.x + dx, y: keo.y + dy, k: goc.k }));
    });

    function thaTay(e, chon) {
      if (diem[e.pointerId]) { delete diem[e.pointerId]; soDiem--; }
      if (soDiem < 2) chum = null;
      if (soDiem > 0) { var k = Object.keys(diem)[0];
        keo = { x: goc.x, y: goc.y, px: diem[k].x, py: diem[k].y }; return; }
      keo = null; sanBox.classList.remove('dang-keo');
      /* bam that su moi doi nuoc; keo roi tha thi khong */
      if (chon && !daDi && idXuong) { chonId = idXuong; veChon(); veDoc(); }
    }
    svgEl.addEventListener('pointerup', function (e) { thaTay(e, true); });
    svgEl.addEventListener('pointercancel', function (e) { thaTay(e, false); });
    svgEl.addEventListener('pointerleave', function () { meo.hidden = true; });

    sanBox.querySelector('.atl-zi').addEventListener('click', function () {
      phongTai(beNgang / 2, cao / 2, goc.k * 1.4, true);
    });
    sanBox.querySelector('.atl-zo').addEventListener('click', function () {
      phongTai(beNgang / 2, cao / 2, goc.k / 1.4, true);
    });
    sanBox.querySelector('.atl-zr').addEventListener('click', function () {
      bayToi({ x: 0, y: 0, k: 1 });
    });

    svgEl.addEventListener('keydown', function (e) {
      var b = 48;
      if (e.key === 'ArrowLeft') { e.preventDefault(); datGoc(kep({ x: goc.x + b, y: goc.y, k: goc.k })); }
      else if (e.key === 'ArrowRight') { e.preventDefault(); datGoc(kep({ x: goc.x - b, y: goc.y, k: goc.k })); }
      else if (e.key === 'ArrowUp') { e.preventDefault(); datGoc(kep({ x: goc.x, y: goc.y + b, k: goc.k })); }
      else if (e.key === 'ArrowDown') { e.preventDefault(); datGoc(kep({ x: goc.x, y: goc.y - b, k: goc.k })); }
      else if (e.key === '+' || e.key === '=') { e.preventDefault(); phongTai(beNgang / 2, cao / 2, goc.k * 1.4, true); }
      else if (e.key === '-' || e.key === '_') { e.preventDefault(); phongTai(beNgang / 2, cao / 2, goc.k / 1.4, true); }
      else if (e.key === '0' || e.key === 'Home') { e.preventDefault(); bayToi({ x: 0, y: 0, k: 1 }); }
    });
  }

  /* doi nuoc dang chon ma khong ve lai ca tam: chi doi lop tren hai the */
  function veChon() {
    khoi.querySelectorAll('.atl-nuoc.atl-chon').forEach(function (e) { e.classList.remove('atl-chon'); });
    var el = khoi.querySelector('.atl-nuoc[data-id="' + chonId + '"]');
    if (el) { el.classList.add('atl-chon'); el.parentNode.appendChild(el); }
  }

  function veTab() {
    var ô = khoi.querySelector('.atl-tab');
    ô.innerHTML = DL.indicators.map(function (i) {
      return '<button type="button" class="atl-nut' + (i.id === chiSo ? ' on' : '') +
        '" data-ind="' + i.id + '" aria-pressed="' + (i.id === chiSo) + '">' +
        '<b>' + i.index + '</b> ' + t(i.label, i.labelEn) + '</button>';
    }).join('');
    ô.querySelectorAll('.atl-nut').forEach(function (b) {
      b.addEventListener('click', function () { chiSo = b.getAttribute('data-ind'); dung(); });
    });
  }

  function veChu() {
    var m = moHinh(chiSo), i = tim(chiSo);
    var r = [];
    for (var b = BAC - 1; b >= 0; b--) {
      var h = m.hop[b];
      r.push('<li><i style="background:var(--atl-b' + b + ')"></i>' +
        (h.n ? khoang(chiSo, h.min, h.max) : '—') + '</li>');
    }
    r.push('<li><i style="background:var(--atl-thieu)"></i>' + t('Không có số', 'No data') + '</li>');
    khoi.querySelector('.atl-chu').innerHTML =
      '<p class="atl-chu-t">' + t(i.title, i.titleEn) + ' <span>' + t(i.unit, i.unitEn) + '</span></p>' +
      '<ul>' + r.join('') + '</ul>' +
      '<p class="atl-chu-n">' + t('Đậm hơn là cao hơn. ', 'Darker is higher. ') +
      (m.namMin ? m.namMin + '–' + m.namMax + ' · ' : '') + 'n = ' + m.n + '.</p>';
  }

  function tim(id) {
    return DL.indicators.filter(function (x) { return x.id === id; })[0];
  }

  function veDoc() {
    var m = moHinh(chiSo), i = tim(chiSo);
    var c = null;
    DL.countries.forEach(function (x) { if (x.id === chonId) c = x; });
    var ô = khoi.querySelector('.atl-doc');
    if (!c) { ô.innerHTML = '<p class="atl-doc-nhac">' + t('Chọn một nước trên bản đồ.', 'Pick a country on the map.') + '</p>'; return; }
    var v = c.values[chiSo], hang = m.hang[c.id];
    var ten = ng() === 'vi' ? c.nameVi : c.name;
    var phu = ng() === 'vi' ? c.name : c.nameVi;
    var d = ['<p class="atl-doc-iso">' + c.iso3 + '</p>',
             '<h4>' + ten + '</h4>',
             phu && phu !== ten ? '<p class="atl-doc-phu">' + phu + '</p>' : ''];
    d.push('<p class="atl-doc-so"><b>' + soCho(chiSo, v) + '</b> <span>' + t(i.unit, i.unitEn) + '</span></p>');
    if (v != null) {
      d.push('<p class="atl-doc-hang">' + t('Hạng ', 'Rank ') + hang + ' / ' + m.n +
        (c.years[chiSo] ? ' · ' + c.years[chiSo] : '') + '</p>');
      var ti = m.giua ? v / m.giua : null;
      if (ti != null && isFinite(ti)) {
        d.push('<p class="atl-doc-ss">' + t('Bằng ', 'That is ') + soCho('trade', ti) +
          t(' lần trung vị mẫu.', '× the sample median.') + '</p>');
      }
    }
    d.push('<p class="atl-doc-giua"><button type="button" class="atl-giua">' +
      t('Đưa vào giữa bản đồ', 'Centre on the map') + '</button></p>');
    d.push('<p class="atl-doc-ng">' + t(i.blurb, i.blurbEn) + '</p>');
    d.push('<p class="atl-doc-ngu">' + i.source + '</p>');
    ô.innerHTML = d.join('');
    var ng2 = ô.querySelector('.atl-giua');
    if (ng2) ng2.addEventListener('click', function () { veGiua(chonId); });
  }

  /* ---- chi nap khi vao khung nhin ---- */

  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (es) {
      es.forEach(function (e) { if (e.isIntersecting) { io.disconnect(); nap(); } });
    }, { rootMargin: '200px' });
    io.observe(khoi);
  } else {
    nap();
  }

  /* doi ngon ngu giua chung thi ve lai, doc lang NGAY LUC VE chu khong nho lai */
  new MutationObserver(function () { if (daNap) dung(); })
    .observe(document.documentElement, { attributes: true, attributeFilter: ['lang'] });

  var hen = 0;
  window.addEventListener('resize', function () {
    if (!daNap) return;
    clearTimeout(hen);
    hen = setTimeout(function () { tam = null; dung(); }, 180);
  });
})();
