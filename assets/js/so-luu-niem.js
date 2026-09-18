/* =======================================================================
   So luu niem - tuong loi nhan va o viet
   -----------------------------------------------------------------------
   Trang nay khong co may chu. Hai nua roi nhau:

     1. TUONG  doc assets/data/so-luu-niem.json trong chinh kho nay. Huong
        cheo tay nhung loi da duyet vao do; trang chi ve lai.
     2. O VIET gui thang toi mot bieu mau Google cua Huong. Khong co buoc
        trung gian nao, khong co khoa bi mat nao nam trong trang.

   MUON BAT O VIET, dien ba thu vao BIEU_MAU ben duoi. Cach lay:

     a. Tao bieu mau tai https://forms.google.com voi bon cau hoi (Ten,
        Tu dau toi, Loi nhan, Thu dien tu) va mot cau hoi hai lua chon
        "Co"/"Khong" cho phep dang cong khai.
     b. Bam "Gui" > bieu tuong lien ket. Duong dan co dang
        https://forms.gle/... hoac .../forms/d/e/1FAIpQLSxxxx/viewform
        Chuoi bat dau bang 1FAIpQLS chinh la MA.
     c. Mo trang bieu mau, bam chuot phai > xem nguon, tim "entry." Moi
        cau hoi co mot so rieng, vi du entry.1234567890. Gan dung so ay
        cho dung o ben duoi.

   Khi MA con rong, o viet tu an di va trang bay loi nhan qua thu - nen
   trang van dung duoc ngay ca truoc khi bieu mau san sang.
   ===================================================================== */
(function () {
  'use strict';

  var BIEU_MAU = {
    ma: '',                       // 1FAIpQLS...
    truong: {
      ten:  '',                   // entry.xxxxxxxxx
      noi:  '',
      loi:  '',
      thu:  '',
      dang: ''                    // cau hoi "Co" / "Khong"
    }
  };

  var NGUON = 'assets/data/so-luu-niem.json';

  function tieng() {
    return (document.documentElement.getAttribute('lang') || 'vi').slice(0, 2).toLowerCase();
  }
  function t(vi, en, fr) {
    var l = tieng();
    return l === 'en' ? en : (l === 'fr' ? fr : vi);
  }

  /* --- ngay thang: "2026-09-18" -> "18.09.2026" ------------------------ */
  function veNgay(s) {
    var m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(String(s || ''));
    return m ? m[3] + '.' + m[2] + '.' + m[1] : '';
  }

  /* === 1. TUONG ======================================================== */

  var tuong = document.getElementById('tuong');
  var dem   = document.getElementById('dem');

  function veTrong() {
    var li = document.createElement('li');
    li.className = 'trong';
    li.textContent = t(
      'Tường còn trống. Những lời đầu tiên sẽ được chép lên đây.',
      'The wall is still bare. The first words will be copied up here.',
      'Le mur est encore nu. Les premiers mots y seront recopiés.'
    );
    tuong.appendChild(li);
    if (dem) dem.textContent = '';
  }

  function veMotLoi(o) {
    var li = document.createElement('li');
    li.className = 'loi';

    var bq = document.createElement('blockquote');
    bq.textContent = String(o.loi || '');
    li.appendChild(bq);

    var ch = document.createElement('footer');

    var ai = document.createElement('span');
    ai.className = 'ai';
    ai.textContent = String(o.ten || t('Một người ghé qua', 'A passer-by', 'Un passant'));
    ch.appendChild(ai);

    if (o.noi) {
      var noi = document.createElement('span');
      noi.className = 'noi';
      noi.textContent = String(o.noi);
      ch.appendChild(noi);
    }

    var ngay = veNgay(o.ngay);
    if (ngay) {
      var khi = document.createElement('time');
      khi.className = 'khi';
      khi.setAttribute('datetime', String(o.ngay));
      khi.textContent = ngay;
      ch.appendChild(khi);
    }

    li.appendChild(ch);
    return li;
  }

  function veTuong(ds) {
    tuong.textContent = '';
    if (!ds || !ds.length) { veTrong(); return; }
    ds.forEach(function (o) { tuong.appendChild(veMotLoi(o)); });
    if (dem) {
      dem.textContent = ds.length + ' ' +
        t(ds.length === 1 ? 'lời' : 'lời', ds.length === 1 ? 'message' : 'messages',
          ds.length === 1 ? 'message' : 'messages');
    }
  }

  var daCo = null;   // giu lai de ve lai khi doi ngon ngu

  function tai() {
    if (!tuong) return;
    fetch(NGUON, { cache: 'no-cache' })
      .then(function (r) { return r.ok ? r.json() : null; })
      .then(function (j) {
        daCo = (j && Array.isArray(j.loi)) ? j.loi : [];
        veTuong(daCo);
      })
      .catch(function () { daCo = []; veTuong(daCo); });
  }

  /* === 2. O VIET ======================================================= */

  var mau   = document.getElementById('mau');
  var chua  = document.getElementById('chua-noi');
  var bao   = document.getElementById('bao');
  var nut   = document.getElementById('nut-gui');

  function san() {
    return !!(BIEU_MAU.ma && BIEU_MAU.truong.ten && BIEU_MAU.truong.loi);
  }

  function noiBao(chu, lop) {
    if (!bao) return;
    bao.textContent = chu;
    bao.className = 'bao' + (lop ? ' ' + lop : '');
  }

  function gui(e) {
    e.preventDefault();

    var ten = document.getElementById('f-ten').value.trim();
    var loi = document.getElementById('f-loi').value.trim();

    if (!ten || !loi) {
      noiBao(t('Xin điền tên và lời nhắn.',
               'Please fill in a name and a message.',
               'Merci d’indiquer un nom et un message.'), 'hong');
      (ten ? document.getElementById('f-loi') : document.getElementById('f-ten')).focus();
      return;
    }

    var d = new URLSearchParams();
    d.append(BIEU_MAU.truong.ten, ten);
    d.append(BIEU_MAU.truong.loi, loi);
    if (BIEU_MAU.truong.noi) d.append(BIEU_MAU.truong.noi, document.getElementById('f-noi').value.trim());
    if (BIEU_MAU.truong.thu) d.append(BIEU_MAU.truong.thu, document.getElementById('f-thu').value.trim());
    if (BIEU_MAU.truong.dang) {
      d.append(BIEU_MAU.truong.dang, document.getElementById('f-dang').checked ? 'Có' : 'Không');
    }

    nut.disabled = true;
    noiBao(t('Đang gửi…', 'Sending…', 'Envoi…'));

    /* Bieu mau Google khong tra ve dau CORS nao, nen phai gui che do
       no-cors: loi hen gio thi bat duoc, con loi phia Google thi khong.
       Doi lai, khong can may chu trung gian nao ca. */
    fetch('https://docs.google.com/forms/d/e/' + BIEU_MAU.ma + '/formResponse', {
      method: 'POST',
      mode: 'no-cors',
      body: d
    }).then(function () {
      mau.reset();
      noiBao(t('Đã gửi. Cảm ơn bạn đã ghé qua — Hương sẽ đọc.',
               'Sent. Thank you for passing by — Hương will read it.',
               'Envoyé. Merci de votre passage — Hương le lira.'), 'xong');
    }).catch(function () {
      noiBao(t('Không gửi được. Xin thử lại, hoặc nhắn thư về thuyhuongctu@gmail.com',
               'It would not send. Please try again, or write to thuyhuongctu@gmail.com',
               'L’envoi a échoué. Réessayez, ou écrivez à thuyhuongctu@gmail.com'), 'hong');
    }).then(function () {
      nut.disabled = false;
    });
  }

  if (mau && chua) {
    if (san()) {
      mau.hidden = false;
      mau.addEventListener('submit', gui);
    } else {
      chua.hidden = false;
    }
  }

  /* === 3. Doi ngon ngu thi ve lai phan do JavaScript sinh ra ============ */
  new MutationObserver(function () {
    if (daCo) veTuong(daCo);
    if (bao && bao.textContent) noiBao('');
  }).observe(document.documentElement, { attributes: true, attributeFilter: ['lang'] });

  tai();
})();
