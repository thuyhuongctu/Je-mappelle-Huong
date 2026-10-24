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

  function tinhTam(w, h) {
    var pr = d3.geoNaturalEarth1();
    pr.fitExtent([[8, 8], [w - 8, h - 8]], { type: 'Sphere' });
    var duong = d3.geoPath(pr);
    var bo = topojson.feature(TOPO, TOPO.objects.countries).features;
    var dat = [];
    bo.forEach(function (f) {
      var d = duong(f);
      if (!d) return;
      dat.push({ id: f.id == null ? '' : String(f.id), ten: (f.properties && f.properties.name) || '', d: d });
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
    if (!tam || beNgang !== w) { tam = tinhTam(w, h); beNgang = w; }
    var m = moHinh(chiSo);

    var p = [];
    p.push('<svg class="atl-svg" viewBox="0 0 ' + w + ' ' + h + '" role="img" aria-labelledby="atl-tt">');
    p.push('<title id="atl-tt">' + t('Bản đồ thế giới tô theo ngũ phân vị của chỉ số đang chọn',
      'World map shaded by quintile of the selected indicator') + '</title>');
    p.push('<path class="atl-cau" d="' + tam.cau + '"/>');
    p.push('<path class="atl-luoi" d="' + tam.luoi + '"/>');
    tam.dat.forEach(function (d) {
      var b = m.bac[d.id];
      var mau = b == null ? 'var(--atl-thieu)' : 'var(--atl-b' + b + ')';
      p.push('<path class="atl-nuoc' + (d.id === chonId ? ' atl-chon' : '') +
        '" data-id="' + d.id + '" style="fill:' + mau + '" d="' + d.d + '"></path>');
    });
    p.push('<path class="atl-vien" d="' + tam.vien + '"/>');
    p.push('</svg>');
    sanBox.innerHTML = p.join('');

    veTab(); veChu(); veDoc();
    sanBox.querySelectorAll('.atl-nuoc').forEach(function (el) {
      el.addEventListener('click', function () { chonId = el.getAttribute('data-id'); dung(); });
    });
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
    d.push('<p class="atl-doc-ng">' + t(i.blurb, i.blurbEn) + '</p>');
    d.push('<p class="atl-doc-ngu">' + i.source + '</p>');
    ô.innerHTML = d.join('');
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
