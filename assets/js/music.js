/* ============================================================
   HUONG MUSIC — hệ thống âm nhạc «Je suis Hương»
   (1) Nút nhạc nổi: gợi ý bài hát theo tâm trạng (buồn/vui/bình thường)
   (2) Nhạc nền theo bối cảnh từng khu trong trang viên 3D
   Bài hát: songbook assets/audio/*, M-AIDA assets/audio/maida/*,
            BizOn assets/audio/bizon/*
   ============================================================ */
(function () {
  'use strict';

  /* ---------- DANH SÁCH BÀI HÁT ---------- */
  var A = 'assets/audio/';
  var SONGS = {
    // Songbook gốc — trang chủ chọn mặc định
    official:      { t: 'Je m’appelle Hương',            f: A + 'track05.mp3' },
    track01:       { t: 'Je voudrais te parler',         f: A + 'track01.mp3' },
    track02:       { t: 'Đèn vẫn còn sáng',              f: A + 'track02-den-van-con-sang.mp3' },
    track03:       { t: 'The Lamp Still Burns',          f: A + 'track03.mp3' },
    track04:       { t: 'Hai Mươi Sáu Năm Sau',          f: A + 'track04-hai-muoi-sau-nam-sau.mp3' },
    track05:       { t: 'Je m’appelle Hương',            f: A + 'track05.mp3' },

    // M-AIDA
    maida_official:        { t: 'M-AIDA · Official',           f: A + 'maida/maida_song_official.mp3' },
    maida_heartbeat:       { t: 'M-AIDA · Heartbeat',          f: A + 'maida/maida_song_heartbeat.mp3' },
    maida_heartbeat2:      { t: 'M-AIDA · Heartbeat (r2)',     f: A + 'maida/maida_song_heartbeat_remix2.mp3' },
    maida_brandpassport:   { t: 'M-AIDA · Brand Passport',     f: A + 'maida/maida_song_brand_passport.mp3' },
    maida_instrumental:    { t: 'M-AIDA · Instrumental',       f: A + 'maida/maida_song_instrumental.mp3' },
    maida_lhumain:         { t: "M-AIDA · L'humain",           f: A + 'maida/maida_song_lhumain.mp3' },
    maida_monhistoire:     { t: 'M-AIDA · Mon Histoire',       f: A + 'maida/maida_song_mon_histoire.mp3' },
    maida_larecherche:     { t: 'M-AIDA · La Recherche (r2)',  f: A + 'maida/maida_song_la_recherche_remix2.mp3' },
    maida_scholars:        { t: 'M-AIDA · Scholars Final Say', f: A + 'maida/maida_song_scholars_final_say.mp3' },

    // BizOn
    bizon_batnghiep:   { t: 'BizOn · Bật Nghiệp',            f: A + 'bizon/bat-nghiep.mp3' },
    bizon_theme:       { t: 'BizOn · Theme',                 f: A + 'bizon/bizon-theme.mp3' },
    bizon_doiphusa:    { t: 'BizOn · Đồi Phú Sa',            f: A + 'bizon/doi-phu-sa.mp3' },
    bizon_mekong:      { t: 'BizOn · Mekong River',          f: A + 'bizon/mekong-river-v2.mp3' },
    bizon_journey:     { t: 'BizOn · Journey Golden Silt',   f: A + 'bizon/journey-golden-silt.mp3' },
    bizon_world_en:    { t: 'BizOn · Hương & the World (EN)',f: A + 'bizon/huong-and-the-world-en.mp3' },
    bizon_world_fr:    { t: "BizOn · Hương et le monde",     f: A + 'bizon/huong-et-le-monde.mp3' },
    bizon_vnt:         { t: 'BizOn · Việt Nam Trong Tim',    f: A + 'bizon/viet-nam-trong-tim.mp3' },
    bizon_vudubebaycao:{ t: 'BizOn · Vừa Đủ Để Bay Cao',     f: A + 'bizon/vua-du-de-bay-cao.mp3' },
    bizon_onreturn:    { t: 'BizOn · Hương on Return',     f: A + 'bizon/huong-on-return.mp3' },

    // Nhạc tần số thư giãn (solfeggio) — khuôn viên trang viên
    tranquien_528:   { t: 'Trần viên · Sóng 528Hz',        f: A + 'solfeggio_528.mp3' },
    tranquien_432:   { t: 'Trần viên · Sóng 432Hz',        f: A + 'solfeggio_432.mp3' }
  };

  /* ---------- GỢI Ý THEO TÂM TRẠNG ---------- */
  /* mood: 'buon' | 'vui' | 'binhthuong'
     Nguồn chính: Songbook «Je m'appelle Hương» (5 bài · 12 bản thu)
     Bài M-AIDA / BizOn có sẵn làm bài bổ sung */
  var MOODS = {
    buon: {
      icon: '😢',
      vi: { tieude: 'Hôm nay có chút buồn?', noi: 'Để Hương hát một bài sưởi lòng nhé — nghe nhẹ, rồi ngày mai lại sáng.' },
      en: { tieude: 'A little sad today?', noi: 'Let Huong sing something warm — gentle listening, brighter tomorrow.' },
      fr: { tieude: 'Un peu triste aujourd\u2019hui ?', noi: 'Laissez Huong vous chanter une chanson chaleureuse \u2014 une \u00e9coute douce, demain sera plus lumineux.' },
      bai: ['track01', 'track02', 'official']
    },
    vui: {
      icon: '\u{1F60A}',
      vi: { tieude: 'Hôm nay thật vui!', noi: 'Nghe bài thư giãn thêm — để niềm vui chảy dài thêm chút nữa.' },
      en: { tieude: 'Happy today!', noi: 'Relax and let the joy flow a little longer.' },
      fr: { tieude: 'Heureux aujourd\u2019hui !', noi: 'D\u00e9tendez-vous et laissez la joie s\u2019\u00e9couler un peu plus longtemps.' },
      bai: ['track04', 'track05', 'track03']
    },
    binhthuong: {
      icon: '\u{1F60C}',
      vi: { tieude: 'Một ngày bình yên', noi: 'Bài mặc định trang chủ chọn cho bạn \u2014 nghe thoải mái nhé.' },
      en: { tieude: 'A peaceful day', noi: 'The homepage\u2019s default pick for you \u2014 enjoy.' },
      fr: { tieude: 'Une journ\u00e9e paisible', noi: 'Le choix par d\u00e9faut de la page d\u2019accueil pour vous \u2014 bonne \u00e9coute.' },
      bai: ['official', 'track05', 'track01']
    }
  };

  var NG = 'vi';
  try {
    NG = localStorage.getItem('huong_lang') ||
      (/^en/i.test(navigator.language) ? 'en' :
        (/^fr/i.test(navigator.language) ? 'fr' : 'vi'));
  } catch (e) { NG = 'vi'; }

  /* ---------- ENGINE ---------- */
  var audio = new Audio();
  audio.preload = 'metadata';

  /* ---------- ANALYSER (cho visualizer 3D) ---------- */
  var analyser = null;
  var fftData = null;
  try {
    var Ctx = window.AudioContext || window.webkitAudioContext;
    if (Ctx) {
      var actx = new Ctx();
      analyser = actx.createAnalyser();
      analyser.fftSize = 64;   // 32 bins tần số
      analyser.smoothingTimeConstant = 0.72;
      actx.createMediaElementSource(audio).connect(analyser);
      analyser.connect(actx.destination);
      fftData = new Uint8Array(analyser.frequencyBinCount);
    }
  } catch (e) { analyser = null; }

  function getFFT() {
    if (!analyser || !fftData) return { bass: 0, mid: 0, treble: 0, wave: 0 };
    analyser.getByteFrequencyData(fftData);
    var n = fftData.length;
    var bass = 0, mid = 0, treble = 0;
    // bass: 4 bins đầu, mid: giữa, treble: 4 bins cuối
    for (var i = 0; i < 4 && i < n; i++) bass += fftData[i];
    for (var i = Math.floor(n * 0.3); i < Math.floor(n * 0.65); i++) mid += fftData[i];
    for (var i = Math.max(4, n - 4); i < n; i++) treble += fftData[i];
    return {
      bass: bass / (4 * 255),
      mid: mid / (Math.floor(n * 0.65) - Math.floor(n * 0.3)) / 255,
      treble: treble / (4 * 255),
      wave: (bass + mid + treble) / 3
    };
  }
  var vol = 0.75;
  try {
    var sv = parseFloat(localStorage.getItem('huong_music_vol'));
    if (!isNaN(sv)) vol = sv;
  } catch (e) { }
  audio.volume = vol;
  var dangPhat = '';   // key bài đang phát
  var fader = null;    // interval fade
  var nhacNenActive = false;
  var nhapVi_widget = null;

  function fadeTo(target, ms) {
    if (fader) clearInterval(fader);
    var step = 0.03, dt = 50, per = step * (1000 / dt);
    var cur = audio.volume;
    if (Math.abs(cur - target) < 0.01) { audio.volume = target; return; }
    var dir = target > cur ? 1 : -1;
    fader = setInterval(function () {
      cur = Math.min(1, Math.max(0, cur + dir * per));
      audio.volume = cur;
      if (Math.abs(cur - target) <= per + 0.005) {
        audio.volume = target;
        clearInterval(fader); fader = null;
        if (target <= 0.005) { nhapVi_dungNhacNen(); }
      }
    }, dt);
  }

  function playSong(key, opts) {
    opts = opts || {};
    var song = SONGS[key];
    if (!song) return;
    var targetVol = typeof opts.vol !== 'undefined' ? opts.vol : vol;
    if (dangPhat === key && !audio.paused) return;
    audio.src = song.f;
    audio.loop = !!opts.loop;
    audio.volume = 0.001;
    audio.play().then(function () {
      fadeTo(Math.min(1, targetVol), 700);
    }).catch(function () { /* autoplay blocked — user click sau */ });
    dangPhat = key;
    capNhatUI();
  }

  function stopAll() {
    if (dangPhat) {
      fadeTo(0, 500);
      setTimeout(function () { if (!nhacNenActive) { audio.pause(); dangPhat = ''; capNhatUI(); } }, 550);
    } else {
      audio.pause();
    }
  }

  function tryLuuVol() { try { localStorage.setItem('huong_music_vol', String(vol)); } catch (e) { } }

  /* ---------- WIDGET HONG NOI ---------- */
  function dungTaoWidget() {
    var html =
      '<div id="hm-widget">' +
        '<button id="hm-nut" title="Nh\u1ea1c \u00b7 Music \u00b7 Musique" aria-label="M\u1edf panel nh\u1ea1c">\uD83C\uDFB5</button>' +
        '<div id="hm-panel" class="hm-an">' +
          '<div class="hm-tren"><b id="hm-title">Nh\u1ea1c c\u1ee7a H\u01b0\u01a1ng</b><button id="hm-dong" aria-label="\u0110\u00f3ng">\u2715</button></div>' +
          '<div id="hm-mood-chon">' +
            '<span class="lang-vi">H\u00f4m nay b\u1ea1n th\u1ebf n\u00e0o?</span>' +
            '<span class="lang-en">How are you today?</span>' +
            '<span class="lang-fr">Comment allez-vous aujourd\u2019hui ?</span>' +
          '</div>' +
          '<div class="hm-moods" id="hm-moods"></div>' +
          '<div id="hm-hien-tai"></div>' +
          '<div class="hm-volume"><span>\uD83D\uDD08</span>' +
            '<input type="range" id="hm-vol" min="0" max="1" step="0.05" value="' + vol.toFixed(2) + '">' +
            '<span id="hm-vol-num">' + Math.round(vol * 100) + '</span></div>' +
        '</div>' +
      '</div>';
    var div = document.createElement('div');
    div.innerHTML = html;
    document.body.appendChild(div.firstElementChild);
    var widget = document.getElementById('hm-widget');
    var nut = document.getElementById('hm-nut');
    var panel = document.getElementById('hm-panel');

    function capNgonNgu() {
      var l = localStorage.getItem('huong_lang') || NG;
      NG = l;
      document.querySelectorAll('#hm-widget .lang-vi,#hm-widget .lang-en,#hm-widget .lang-fr').forEach(function (el) {
        el.style.display = el.className.indexOf('lang-' + NG) > -1 ? '' : 'none';
      });
      capNhatUI();
    }
    window.addEventListener('storage', capNgonNgu);
    window.addEventListener('huong_ng_change', capNgonNgu);
    setTimeout(capNgonNgu, 50);

    nut.addEventListener('click', function () {
      panel.classList.toggle('hm-an');
    });
    document.getElementById('hm-dong').addEventListener('click', function () {
      panel.classList.add('hm-an');
    });

    var moodsEl = document.getElementById('hm-moods');
    function veMoods() {
      moodsEl.innerHTML = '';
      Object.keys(MOODS).forEach(function (mk) {
        var m = MOODS[mk];
        var wrap = document.createElement('div');
        wrap.className = 'hm-mood';
        wrap.innerHTML =
          '<button data-mood="' + mk + '">' +
            '<span class="hm-face">' + m.icon + '</span>' +
            '<span class="hm-tieude lang-vi">' + m.vi.tieude + '</span>' +
            '<span class="hm-tieude lang-en">' + m.en.tieude + '</span>' +
            '<span class="hm-tieude lang-fr">' + m.fr.tieude + '</span>' +
          '</button>' +
          '<p class="hm-noi lang-vi">' + m.vi.noi + '</p>' +
          '<p class="hm-noi lang-en">' + m.en.noi + '</p>' +
          '<p class="hm-noi lang-fr">' + m.fr.noi + '</p>' +
          '<div class="hm-ds"></div>';
        var ds = wrap.querySelector('.hm-ds');
        m.bai.forEach(function (bk, i) {
          var b = document.createElement('button');
          b.className = 'hm-bai' + (i === 0 ? ' hm-dexuat' : '');
          b.textContent = SONGS[bk].t;
          b.addEventListener('click', function () { playSong(bk, { loop: false }); });
          ds.appendChild(b);
        });
        moodsEl.appendChild(wrap);
      });
      // hiển thị ngôn ngữ cho nội dung vừa tạo
      var cur = NG;
      moodsEl.querySelectorAll('.lang-vi,.lang-en,.lang-fr').forEach(function (el) {
        el.style.display = el.className.indexOf('lang-' + cur) > -1 ? '' : 'none';
      });
    }
    veMoods();

    document.getElementById('hm-vol').addEventListener('input', function (e) {
      vol = parseFloat(e.target.value);
      if (!audio.paused) audio.volume = vol;
      tryLuuVol();
      document.getElementById('hm-vol-num').textContent = Math.round(vol * 100);
    });

    nhapVi_widget = {
      capNhat: capNhatUI,
      playNen: playNhacNen,
      dungNen: dungNhacNen
    };
  }

  function capNhatUI() {
    var hien = document.getElementById('hm-hien-tai');
    if (hien) {
      if (dangPhat && SONGS[dangPhat] && !audio.paused) {
        hien.innerHTML = '<div class="hm-dangphat">\uD83C\uDFB6 ' +
          SONGS[dangPhat].t +
          (nhacNenActive ? ' <small>(' + (khuDangChoi === '__khuon-vien__' ? 'nh\u1ea1c khu\u00f4n vi\u00ean' : 'nh\u1ea1c khu') + ')</small>' : '') +
          '<button id="hm-pause" title="D\u1eebng">\u23F8</button></div>';
        var pb = document.getElementById('hm-pause');
        if (pb) pb.addEventListener('click', stopAll);
      } else if (!audio.paused && dangPhat) {
        hien.innerHTML = '<div class="hm-dangphat">\uD83C\uDFB6 \u0111ang ch\u1ea1y\u2026</div>';
      } else {
        hien.innerHTML = '';
      }
    }
  }

  /* ---------- NHAC NEN THEO KHU ---------- */
  /* khuId -> bài hát nền phù hợp bối cảnh */
  var NHAC_KHU = {
    'hoc-thuat': 'track02',               // Đèn vẫn còn sáng — trầm tĩnh, suy tưởng (khu học thuật)
    'du-an':      'track04',               // Hai Mươi Sáu Năm Sau — hồi sinh, năng lượng tìm lại ước mơ (khu dự án)
    'thu-vien':   'track01',               // Je voudrais te parler — nội tâm, đọc trong yên lặng (khu thư viện)
    'am-nhac':    'track03',               // The Lamp Still Burns — ôm ấp, an ủi (khu âm nhạc)
    'bang-tin':   'track05',               // Je m'appelle Hương — thông điệp tổng hợp (khu bảng tin)
    'gioi-thieu': 'official',              // Je m'appelle Hương bản đầy đủ — mở đầu chuyến tham quan (khu giới thiệu)
    'kho-tuong-lai': 'track05',             // Je m'appelle Hương — khép chuyến tham quan bằng bài chủ đề (kho tương lai)
    'khuon-vien':  'tranquien_528'           // Sóng 528Hz — nhạc tần số thư giãn khi dạo ngoài khuôn viên
  };
  var khuDangChoi = '';

  /* Nhạc tần số thư giãn xen kẽ 528Hz / 432Hz khi dạo ngoài khuôn viên */
  var NHAC_KHUONVIEN = ['tranquien_528', 'tranquien_432'];
  var kvChiSo = 0;

  function playNhacNen(khuId) {
    var key = NHAC_KHU[khuId];
    if (!key) return;
    nhacNenActive = true;
    if (khuDangChoi === khuId && dangPhat === key && !audio.paused) return;
    playSong(key, { loop: true, vol: vol * 0.7 });
    khuDangChoi = khuId;
  }

  /* Nhạc tần số thư giãn (solfeggio) khi khách dạo ngoài khuôn viên — chưa vào khu nào */
  function playNhacKhuonVien() {
    if (!nhacNenActive) { nhacNenActive = true; khuDangChoi = '__khuon-vien__'; }
    var key = NHAC_KHUONVIEN[kvChiSo % NHAC_KHUONVIEN.length];
    if (khuDangChoi === '__khuon-vien__' && dangPhat === key && !audio.paused) return;
    kvChiSo++;
    playSong(key, { loop: true, vol: Math.min(vol * 0.45, 0.3) });
    khuDangChoi = '__khuon-vien__';
  }
  function dungNhacNen() {
    nhacNenActive = false;
    khuDangChoi = '';
    fadeTo(0, 450);
  }
  function nhapVi_dungNhacNen() {
    if (nhacNenActive && audio.volume <= 0.005) { audio.pause(); }
  }

  /* Tự chèn CSS widget nhạc */
  var cssLink = document.createElement('link');
  cssLink.rel = 'stylesheet';
  cssLink.href = 'assets/css/music.css';
  document.head.appendChild(cssLink);

  /* ---------- KHOI DONG ---------- */
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', dungTaoWidget);
  } else {
    dungTaoWidget();
  }

  window.HUONG_MUSIC = {
    playSong: playSong,
    playNhacKhuonVien: playNhacKhuonVien,
    stopAll: stopAll,
    playNhacNen: playNhacNen,
    dungNhacNen: dungNhacNen,
    SONGS: SONGS,
    getFFT: getFFT,
    nhacDangPhat: function () { return !!(dangPhat && !audio.paused && audio.volume > 0.005); }
  };
})();
