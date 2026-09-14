/* ============================================================
   KHUNG TRANG DUNG CHUNG - Je m'appelle Huong
   Dung ba thanh phan len moi trang de khong phai chep tay vao tung tep HTML:

     1. Ban do Viet Nam chim  - #vnmark
     2. Ngan keo tien ich "..." - am thanh & tour, dong ho the gioi, chia se
     3. Chan trang dung chung  - .sitefoot

   Chu trong khung nay do JavaScript ve theo thuoc tinh lang cua <html>, khong
   dung cac the .lang-vi/.lang-en cua trang, vi moi trang khai bao bo CSS ngon
   ngu cua rieng no. Khi nguoi doc doi ngon ngu, MutationObserver ve lai.

   Cach dung: them <script src="assets/js/site-chrome.js" defer></script>
   vao cuoi <body>. Tep tu nap assets/css/site-chrome.css.
   Trang muon bo mot phan nao thi dat thuoc tinh tren <html>, vi du
   <html data-chrome="no-foot"> (gia tri: no-map, no-util, no-foot).
   ============================================================ */
(function () {
  'use strict';

  var root = document.documentElement;
  var bo = (root.getAttribute('data-chrome') || '').split(/\s+/);
  function tat(x) { return bo.indexOf(x) > -1; }

  function ng() {
    var l = (root.getAttribute('lang') || 'vi').slice(0, 2).toLowerCase();
    return (l === 'en' || l === 'fr') ? l : 'vi';
  }
  /* chon chuoi theo ngon ngu dang hien; thieu tieng Phap thi dung tieng Anh */
  function t(vi, en, fr) {
    var l = ng();
    if (l === 'en') return en;
    if (l === 'fr') return fr || en;
    return vi;
  }

  /* Tu chen CSS cua khung - trang chi can goi mot the <script>. */
  (function () {
    var co = document.querySelector('link[href$="assets/css/site-chrome.css"]');
    if (co) return;
    var l = document.createElement('link');
    l.rel = 'stylesheet';
    l.href = 'assets/css/site-chrome.css';
    document.head.appendChild(l);
  })();

  /* danh sach ham ve lai khi doi ngon ngu */
  var veLai = [];

  /* ============================================================
     1. BAN DO VIET NAM CHIM
     Duong bo dat lien, quan dao Hoang Sa va Truong Sa, dao Phu Quoc va
     Con Dao, la co o Lung Cu (cuc Bac) va diem danh dau Can Tho.
     Hinh hoc lay tu ban do nen cua M-AIDA de hai trang cua cung tac gia
     khong ve Viet Nam lech nhau.
     ============================================================ */
  var LH = '<path d="M-2.4 0 L-1.4 -7 H1.4 L2.4 0 Z" fill="none" stroke="currentColor" stroke-width="1"/>' +
    '<line x1="-2.6" y1="0" x2="2.6" y2="0" stroke="currentColor" stroke-width="1"/>' +
    '<rect x="-1.7" y="-9.2" width="3.4" height="2.2" rx="0.6" fill="none" stroke="currentColor" stroke-width="1"/>' +
    '<circle class="lh-light" cx="0" cy="-8.1" r="1.3" fill="#e8483f"/>' +
    '<circle class="lh-halo" cx="0" cy="-8.1" r="4.2" fill="none" stroke="#e8483f" stroke-width="1"/>';

  function veBanDo() {
    if (tat('no-map') || document.getElementById('vnmark')) return;
    var d = document.createElement('div');
    d.id = 'vnmark';
    d.setAttribute('aria-hidden', 'true');

    function ten() {
      var hs = t('Hoàng Sa', 'Hoang Sa', 'Hoang Sa');
      var ts = t('Trường Sa', 'Truong Sa', 'Truong Sa');
      var lc = t('Lũng Cú', 'Lung Cu', 'Lung Cu');
      var ct = t('Cần Thơ', 'Can Tho', 'Can Tho');
      return '<g font-family="system-ui,-apple-system,Segoe UI,Roboto,sans-serif" ' +
        'fill="currentColor" font-size="13" font-style="italic" opacity=".85">' +
        '<text x="330" y="216">' + hs + '</text>' +
        '<text x="404" y="452">' + ts + '</text>' +
        '<text x="124" y="20">' + lc + '</text>' +
        '<text x="136" y="429">' + ct + '</text>' +
        '</g>';
    }

    function svg() {
      return '<svg viewBox="-12 -46 604 664" xmlns="http://www.w3.org/2000/svg" overflow="visible">' +
        '<g fill="none" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round" stroke-linecap="round">' +
        /* duong bo dat lien */
        '<polygon points="108.9,25.2 148.2,39.0 145.3,52.5 158.2,69.0 186.7,80.1 166.7,96.0 158.2,99.0 148.2,102.0 138.2,120.0 126.8,129.0 120.3,156.0 125.4,177.0 142.5,189.0 159.6,210.0 174.4,231.0 192.4,243.0 202.9,258.0 210.9,273.0 216.6,291.0 222.3,312.0 223.7,336.0 220.9,357.0 218.0,378.0 198.1,396.0 183.8,405.0 159.6,415.5 152.5,417.0 146.8,429.0 141.1,441.0 119.7,456.0 95.5,468.0 94.6,454.5 93.5,439.5 101.2,427.5 96.3,415.5 84.1,413.4 101.2,399.0 124.0,397.5 124.8,378.0 140.2,374.4 145.3,363.0 172.4,348.0 169.6,321.0 169.6,294.0 172.4,284.4 173.8,270.0 169.6,249.0 153.9,240.0 134.0,219.0 116.8,198.0 104.0,174.0 72.7,147.0 85.5,137.4 88.3,121.5 81.2,113.4 44.2,99.0 39.9,86.4 18.2,83.4 18.5,54.0 31.3,43.5 52.7,50.4 61.3,42.0 81.2,43.2 95.8,38.4 105.5,32.4 108.9,25.2"/>' +
        /* dao Phu Quoc */
        '<ellipse cx="71.2" cy="419.4" rx="4.5" ry="7"/>' +
        '</g>' +
        '<g fill="currentColor">' +
        /* Con Dao */
        '<circle cx="145.3" cy="465.6" r="1.8"/>' +
        /* quan dao Hoang Sa */
        '<g opacity=".95"><circle cx="287.8" cy="219.0" r="1.5"/><circle cx="299.2" cy="225.0" r="1.5"/><circle cx="307.8" cy="220.5" r="1.5"/><circle cx="319.2" cy="231.0" r="1.5"/><circle cx="299.2" cy="237.0" r="1.5"/><circle cx="290.7" cy="229.5" r="1.5"/><circle cx="312.1" cy="240.0" r="1.5"/></g>' +
        /* quan dao Truong Sa */
        '<g opacity=".95"><circle cx="296.4" cy="384.0" r="1.4"/><circle cx="322.0" cy="402.0" r="1.4"/><circle cx="350.5" cy="393.0" r="1.4"/><circle cx="364.8" cy="414.0" r="1.4"/><circle cx="339.2" cy="432.0" r="1.4"/><circle cx="313.5" cy="438.0" r="1.4"/><circle cx="379.0" cy="429.0" r="1.4"/><circle cx="353.4" cy="462.0" r="1.4"/><circle cx="324.9" cy="474.0" r="1.4"/><circle cx="367.7" cy="489.0" r="1.4"/><circle cx="290.7" cy="420.0" r="1.4"/><circle cx="393.3" cy="447.0" r="1.4"/></g>' +
        '</g>' +
        ten() +
        /* la co o Lung Cu - cuc Bac */
        '<g transform="translate(108.9,25.2)">' +
        '<line x1="0" y1="0" x2="0" y2="-22" stroke="#8a6a4f" stroke-width="1.6"/>' +
        '<rect x="0.8" y="-22" width="17" height="11" rx="1.2" fill="#da251d"/>' +
        '<path fill="#ffce00" d="M9.3 -19.9 10.3 -17.2 13.1 -17.2 10.8 -15.5 11.7 -12.8 9.3 -14.5 6.9 -12.8 7.8 -15.5 5.5 -17.2 8.3 -17.2Z"/>' +
        '</g>' +
        /* Can Tho - noi tac gia song va lam viec */
        '<g transform="translate(122.0,425.1)">' +
        '<path fill="#b8842c" d="M0 -7 1.9 -2.2 7 -2.2 2.9 0.9 4.4 5.8 0 2.8 -4.4 5.8 -2.9 0.9 -7 -2.2 -1.9 -2.2Z"/>' +
        '</g>' +
        /* den bien tren hai quan dao va hai hon dao */
        '<g class="lh" transform="translate(302.1,228.0)">' + LH + '</g>' +
        '<g class="lh" transform="translate(344.8,435.0)">' + LH + '</g>' +
        '<g class="lh" transform="translate(71.2,419.4)">' + LH + '</g>' +
        '<g class="lh" transform="translate(145.3,465.6)">' + LH + '</g>' +
        '</svg>';
    }

    d.innerHTML = svg();
    document.body.appendChild(d);
    veLai.push(function () { d.innerHTML = svg(); });
  }

  /* ============================================================
     2. NGAN KEO TIEN ICH "..."
     ============================================================ */
  var SHARE = [
    ['GitHub', 'https://github.com/thuyhuongctu',
      '<path d="M12 1.8a10.3 10.3 0 00-3.3 20c.6.1.8-.2.8-.5v-2c-2.9.6-3.5-1.2-3.5-1.2-.5-1.2-1.2-1.5-1.2-1.5-1-.6 0-.6 0-.6 1 0 1.6 1 1.6 1 .9 1.6 2.4 1.1 3 .9a2 2 0 01.7-1.4c-2.3-.2-4.7-1.1-4.7-5.1 0-1.1.4-2 1-2.8-.1-.2-.4-1.3.1-2.7 0 0 .9-.3 2.9 1a9.8 9.8 0 015.1 0c2-1.3 2.9-1 2.9-1 .5 1.4.2 2.5.1 2.7.7.8 1 1.7 1 2.8 0 4-2.4 4.9-4.7 5.1.4.3.7 1 .7 1.9v2.8c0 .3.2.6.8.5A10.3 10.3 0 0012 1.8z"/>'],
    ['X', 'https://twitter.com/intent/tweet?text={T}&url={U}',
      '<path d="M18.9 2H22l-6.8 7.8L23.2 22h-6.4l-5-6.5L6 22H2.9l7.3-8.4L1.6 2H8l4.5 6 5.4-6h1zm-1.1 18h1.7L7 3.9H5.2L17.8 20z"/>'],
    ['Facebook', 'https://www.facebook.com/sharer/sharer.php?u={U}',
      '<path d="M13.5 22v-8.1h2.7l.4-3.1h-3.1V8.8c0-.9.3-1.5 1.6-1.5h1.7V4.5c-.3 0-1.3-.1-2.4-.1-2.4 0-4 1.4-4 4v2.4H7.6v3.1h2.8V22h3.1z"/>'],
    ['LinkedIn', 'https://www.linkedin.com/sharing/share-offsite/?url={U}',
      '<path d="M5 3.5a2.5 2.5 0 11-.02 5A2.5 2.5 0 015 3.5zM3 9h4v12H3zM9 9h3.8v1.7h.1c.5-1 1.8-2 3.7-2 4 0 4.7 2.6 4.7 6V21h-4v-5.5c0-1.3 0-3-1.9-3s-2.2 1.4-2.2 2.9V21H9z"/>'],
    ['Email', 'mailto:?subject={T}&body={U}',
      '<path d="M2 5h20a1 1 0 011 1v12a1 1 0 01-1 1H2a1 1 0 01-1-1V6a1 1 0 011-1zm10 7.2L3.4 7v11h17.2V7L12 12.2zM4.6 7h14.8L12 10.8 4.6 7z"/>']
  ];

  /* Cot moc quoc gia: Dinh Doc Lap cho Viet Nam, thap Eiffel cho Phap. */
  var MOC = {
    vn: '<svg class="lmk" viewBox="0 0 40 28" aria-hidden="true"><g fill="none" stroke="currentColor" stroke-width="1.3" stroke-linecap="round"><path d="M20 1.5v5.5"/><path d="M20 1.5h4.5v2.8H20" fill="currentColor" stroke="none"/><path d="M4 8h32"/><path d="M6 8v5.5M34 8v5.5"/><path d="M9 9.6v3.4M12 9.6v3.4M15 9.6v3.4M18 9.6v3.4M22 9.6v3.4M25 9.6v3.4M28 9.6v3.4M31 9.6v3.4"/><path d="M5.5 13.5h29"/><path d="M8 13.5v6M14 13.5v6M20 13.5v6M26 13.5v6M32 13.5v6"/><path d="M5 19.5h30"/><path d="M3 22.5h34"/><path d="M1.5 25.5h37"/></g></svg>',
    fr: '<svg class="lmk" viewBox="0 0 20 28" aria-hidden="true"><g fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"><path d="M10 1.5v3"/><path d="M8.9 4.5C8.9 12 6.6 18.5 3 25.5"/><path d="M11.1 4.5C11.1 12 13.4 18.5 17 25.5"/><path d="M7.3 12.5h5.4"/><path d="M5.4 18.5h9.2"/><path d="M3 25.5c2.6-3.4 11.4-3.4 14 0"/></g></svg>'
  };
  var DONGHO = [
    { moc: 'vn', tz: 'Asia/Ho_Chi_Minh', vi: 'Việt Nam', en: 'Vietnam', fr: 'Vietnam' },
    { moc: 'fr', tz: 'Europe/Paris', vi: 'Pháp', en: 'France', fr: 'France' }
  ];

  function veNganKeo() {
    if (tat('no-util') || document.querySelector('.sc-drawer')) return;

    /* Trang chu va vuon so da co san nut "..." - gan noi dung vao menu do,
       khong tao them nut thu hai. Cac trang khac tu dung nut rieng. */
    var menu = document.getElementById('menu');
    var chu = document.querySelector('.topctl') || document.querySelector('.ctl') ||
      document.querySelector('.tools');
    if (!menu && !chu) return;

    var hop = document.createElement('div');
    hop.className = 'sc-drawer' + (menu ? ' sc-inline' : '');
    hop.id = 'sc-drawer';
    if (!menu) hop.hidden = true;

    function noiDung() {
      return '<div class="sc-sec">' +
        '<span class="sc-k">' + t('Âm thanh &amp; tour', 'Audio &amp; guided tour', 'Audio &amp; visite guidée') + '</span>' +
        '<div class="sc-row">' +
        '<button type="button" class="sc-btn" id="sc-nhac" title="' + t('Mở bảng nhạc', 'Open the music panel', 'Ouvrir le panneau musique') + '" aria-label="' + t('Mở bảng nhạc', 'Open the music panel', 'Ouvrir le panneau musique') + '">&#9834;</button>' +
        '<a class="sc-btn" href="trangvien.html" title="' + t('Tham quan trang viên có lời dẫn', 'Guided tour of the estate', 'Visite guidée du domaine') + '" aria-label="' + t('Tham quan trang viên có lời dẫn', 'Guided tour of the estate', 'Visite guidée du domaine') + '">&#127911;</a>' +
        '</div>' +
        '<p class="sc-note">' + t('Nhạc chỉ phát khi bạn bấm.', 'Music plays only when you press.', 'La musique ne démarre que sur votre clic.') + '</p>' +
        '</div>' +
        '<div class="sc-sec">' +
        '<span class="sc-k">' + t('Đồng hồ thế giới', 'World clocks', 'Horloges du monde') + '</span>' +
        '<div class="sc-clocks" id="sc-clocks"></div>' +
        '</div>' +
        '<div class="sc-sec">' +
        '<span class="sc-k">' + t('Chia sẻ', 'Share', 'Partager') + '</span>' +
        '<div class="sc-share">' + nutChiaSe() + '</div>' +
        '</div>';
    }

    function nutChiaSe() {
      var u = encodeURIComponent(location.href.split('#')[0]);
      var ti = encodeURIComponent(document.title || 'Je m’appelle Hương');
      return SHARE.map(function (s) {
        var href = s[1].replace('{U}', u).replace('{T}', ti);
        return '<a class="sc-sh" href="' + href + '"' +
          (href.indexOf('mailto:') === 0 ? '' : ' target="_blank" rel="noopener"') +
          ' aria-label="' + s[0] + '" title="' + s[0] + '">' +
          '<svg viewBox="0 0 24 24" aria-hidden="true">' + s[2] + '</svg></a>';
      }).join('');
    }

    function noiDay() {
      hop.innerHTML = noiDung();
      var nn = document.getElementById('sc-nhac');
      if (nn) nn.addEventListener('click', function () {
        /* assets/js/music.js dung nut nhac noi #hm-nut; bam ho nguoi doc. */
        var hm = document.getElementById('hm-nut');
        if (hm) { hm.click(); hm.scrollIntoView({ block: 'nearest' }); }
      });
      veDongHo();
    }

    if (menu) {
      menu.appendChild(hop);
    } else {
      chu.classList.add('sc-host');
      var nut = document.createElement('button');
      nut.type = 'button';
      nut.className = 'sc-more';
      nut.id = 'sc-more';
      nut.setAttribute('aria-expanded', 'false');
      nut.setAttribute('aria-controls', 'sc-drawer');
      nut.innerHTML = '&#8943;';
      function nhan() {
        var s = t('Nhạc, tour, đồng hồ, chia sẻ', 'Music, tour, clocks, share', 'Musique, visite, horloges, partage');
        nut.title = s; nut.setAttribute('aria-label', s);
      }
      nhan();
      veLai.push(nhan);
      nut.addEventListener('click', function () {
        var mo = hop.hidden;
        hop.hidden = !mo;
        nut.setAttribute('aria-expanded', String(mo));
      });
      document.addEventListener('click', function (e) {
        if (hop.hidden) return;
        if (chu.contains(e.target)) return;
        hop.hidden = true;
        nut.setAttribute('aria-expanded', 'false');
      });
      document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && !hop.hidden) {
          hop.hidden = true;
          nut.setAttribute('aria-expanded', 'false');
          nut.focus();
        }
      });
      chu.appendChild(nut);
      chu.appendChild(hop);
    }

    noiDay();
    veLai.push(noiDay);
  }

  /* dong ho chay that - gio dia phuong cua tung noi */
  function veDongHo() {
    var box = document.getElementById('sc-clocks');
    if (!box) return;
    var l = ng();
    box.innerHTML = DONGHO.map(function (z) {
      return '<span class="sc-ck" data-tz="' + z.tz + '">' + MOC[z.moc] +
        '<span class="ckt"><span class="cty">' + z[l] + '</span><span class="tm"></span></span>' +
        '<span class="dt"></span></span>';
    }).join('');
    nhipDongHo();
  }

  function muiGio(loc, tz, now) {
    try {
      var p = new Intl.DateTimeFormat(loc, { timeZone: tz, timeZoneName: 'shortOffset' }).formatToParts(now);
      for (var i = 0; i < p.length; i++) if (p[i].type === 'timeZoneName') return p[i].value;
    } catch (e) { }
    return '';
  }

  function nhipDongHo() {
    var box = document.getElementById('sc-clocks');
    if (!box) return;
    var l = ng();
    var loc = l === 'vi' ? 'vi-VN' : (l === 'fr' ? 'fr-FR' : 'en-GB');
    var now = new Date();
    [].slice.call(box.querySelectorAll('.sc-ck')).forEach(function (c) {
      var tz = c.getAttribute('data-tz');
      try {
        c.querySelector('.tm').textContent =
          new Intl.DateTimeFormat(loc, { hour: '2-digit', minute: '2-digit', hour12: false, timeZone: tz }).format(now);
        var off = muiGio(loc, tz, now);
        c.querySelector('.dt').textContent =
          new Intl.DateTimeFormat(loc, { day: '2-digit', month: '2-digit', timeZone: tz }).format(now) +
          (off ? ' · ' + off : '');
      } catch (e) { }
    });
  }

  /* ============================================================
     3. CHAN TRANG DUNG CHUNG
     ============================================================ */
  function veChanTrang() {
    if (tat('no-foot') || document.querySelector('.sitefoot')) return;

    var f = document.createElement('footer');
    f.className = 'sitefoot';

    function noiDung() {
      var nam = new Date().getFullYear();
      return '<div class="sf-in">' +
        '<div class="sf-grid">' +

        '<div>' +
        '<a class="sf-mark" href="index.html">' +
        '<span>Je m’appelle Hương<br>' + t('Giảng viên &amp; Nhà nghiên cứu', 'Lecturer &amp; Researcher', 'Enseignante &amp; Chercheuse') + '</span></a>' +
        '<p class="sf-tag">' + t('Nghiên cứu, giảng dạy và sáng tạo cùng AI.', 'Research, teaching and creativity with AI.', 'Recherche, enseignement et création avec l\u2019IA.') + '</p>' +
        '<div class="sf-slogan">' +
        '<svg class="rose" viewBox="0 0 40 48" aria-hidden="true"><g fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">' +
        '<circle cx="20" cy="14.6" r="7.4"/><circle cx="20" cy="14.6" r="4.2"/>' +
        '<path d="M20 12.6c-1.3 0-2.3.8-2.3 2s1 2 2.3 2"/><path d="M20 21.4V42"/>' +
        '<path d="M20 30.4c-4.2-1.2-6-4.4-9.4-4.4 1.2 4.4 4.4 6.4 9.4 6.4z"/>' +
        '<path d="M20 36.4c4.2-1.2 6-4.4 9.4-4.4-1.2 4.4-4.4 6.4-9.4 6.4z"/></g></svg>' +
        '<span class="sl">La vie en rose</span></div>' +
        '<div class="sf-card">' +
        '<img src="assets/img/pro_aodai.webp" width="54" height="54" loading="lazy" decoding="async" alt="" onerror="this.style.display=\'none\'">' +
        '<div>' +
        '<div class="an">' + t('Đỗ Thùy Hương', 'Do Thuy Huong', 'Do Thuy Huong') + '</div>' +
        '<div class="ar">' + t('Nghiên cứu sinh · Giảng viên', 'Ph.D candidate · Lecturer', 'Doctorante · Enseignante') + '</div>' +
        '<div class="ao"><a href="https://orcid.org/0000-0002-7711-2487" target="_blank" rel="noopener">ORCID 0000-0002-7711-2487</a></div>' +
        '<div class="ao"><a href="mailto:thuyhuongctu@gmail.com">thuyhuongctu@gmail.com</a></div>' +
        '</div></div>' +
        '</div>' +

        '<div class="sf-cols">' +
        '<div class="sf-col"><div class="sf-ch">' + t('Học thuật', 'Academic', 'Académique') + '</div>' +
        '<div><a href="index.html">' + t('Trang chủ', 'Home', 'Accueil') + '</a></div>' +
        '<div><a href="publications.html">' + t('Công bố', 'Publications', 'Publications') + '</a></div>' +
        '<div><a href="cv.html">CV</a></div>' +
        '<div><a href="blog.html">Blog</a></div></div>' +

        '<div class="sf-col"><div class="sf-ch">' + t('Khu vườn', 'The garden', 'Le jardin') + '</div>' +
        '<div><a href="garden.html">' + t('Vườn số', 'Digital garden', 'Jardin numérique') + '</a></div>' +
        '<div><a href="trangvien.html">' + t('Trang viên 3D', '3D estate', 'Domaine 3D') + '</a></div>' +
        '<div><a href="music.html">' + t('Âm nhạc', 'Music', 'Musique') + '</a></div></div>' +

        '<div class="sf-col"><div class="sf-ch">' + t('Hồ sơ', 'Profiles', 'Profils') + '</div>' +
        '<div><a href="https://scholar.google.com/citations?user=jSvAVnsAAAAJ" target="_blank" rel="noopener">Google Scholar</a></div>' +
        '<div><a href="https://www.researchgate.net/profile/Do-Thuy-Huong" target="_blank" rel="noopener">ResearchGate</a></div>' +
        '<div><a href="https://osf.io/m25qs/" target="_blank" rel="noopener">OSF</a></div>' +
        '<div><a href="https://github.com/thuyhuongctu" target="_blank" rel="noopener">GitHub</a></div></div>' +

        '<div class="sf-col"><div class="sf-ch">' + t('Dự án', 'Projects', 'Projets') + '</div>' +
        '<div><a href="https://thuyhuongctu.github.io/M-AIDA/" target="_blank" rel="noopener">M-AIDA</a></div>' +
        '<div><a href="https://thuyhuongctu.github.io/BizOn/" target="_blank" rel="noopener">BizOn</a></div>' +
        '<div><a href="https://thuyhuongctu.github.io/EnQuiz/" target="_blank" rel="noopener">EnQuiz</a></div>' +
        '<div><a href="https://thuyhuongctu.github.io/ComDraft/" target="_blank" rel="noopener">ComDraft</a></div>' +
        '<div><a href="https://thuyhuongctu.github.io/we-create-tomorrow/" target="_blank" rel="noopener">We Create Tomorrow</a></div>' +
        '<div><a href="https://thuyhuongctu.github.io/ThuyHuong_Digital-2026-Games/" target="_blank" rel="noopener">' + t('Trò Chơi Sử Việt', 'History Games', 'Jeux d\u2019histoire') + '</a></div></div>' +
        '</div>' +

        '</div>' +
        '<div class="sf-rule"></div>' +
        '<div class="sf-fine"><div class="sf-row">' +
        '<span>© ' + nam + ' ' + t('Đỗ Thùy Hương · Cần Thơ, Việt Nam', 'Do Thuy Huong · Can Tho, Vietnam', 'Do Thuy Huong · Cần Thơ, Vietnam') + '</span>' +
        '<span>' + t('HTML/CSS/JS thuần · PWA chạy offline', 'Plain HTML/CSS/JS · offline-capable PWA', 'HTML/CSS/JS · PWA hors ligne') + '</span>' +
        '</div></div>' +
        '</div>';
    }

    f.innerHTML = noiDung();
    document.body.appendChild(f);
    veLai.push(function () { f.innerHTML = noiDung(); });
  }

  /* ---------- khoi dong ---------- */
  function chay() {
    veBanDo();
    veNganKeo();
    veChanTrang();
    setInterval(nhipDongHo, 30000);
    if ('MutationObserver' in window) {
      new MutationObserver(function () {
        veLai.forEach(function (fn) { try { fn(); } catch (e) { } });
      }).observe(root, { attributes: true, attributeFilter: ['lang'] });
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', chay);
  } else {
    chay();
  }
})();
