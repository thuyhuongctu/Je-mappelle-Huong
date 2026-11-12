/* Bảng «Hát theo» cho trang Âm nhạc.
 *
 * Gắn vào những thẻ <audio> có mốc thời gian trong `loi-dong-bo.js`. Mốc ấy
 * rút từ kho Chansonia, đo trên chính các tệp mp3 của trang nên khớp.
 *
 * HAI CHẾ ĐỘ, theo cờ `min` của từng bài:
 *   min = true  → chữ chạy theo nhạc: khổ đang hát sáng lên và tự cuộn tới.
 *   min = false → chỉ bấm vào một khổ để nhảy tới đúng giây ấy. Mốc của mấy
 *                 bài này thưa tới 303 giây một khổ; bật đồng bộ thì khối chữ
 *                 sáng rồi đứng yên hàng phút, nhìn y như trang hỏng.
 *
 * KHÔNG đụng vào 11 khối `.lyrics` sẵn có: đó là lời chính thức của trang,
 * đầy hơn bản Chansonia ở vài bài. Bảng này là thứ hiện thêm khi khách bấm.
 *
 * Ba thứ tiếng dùng lớp `.lang-*` như mọi chỗ khác, nên không phải tự dò
 * `document.documentElement.lang` lúc vẽ.
 */
(function () {
  'use strict';
  var DL = window.LOI_DONG_BO;
  if (!DL) return;

  function gio(s) {
    s = Math.max(0, Math.floor(s));
    return Math.floor(s / 60) + ':' + String(s % 60).padStart(2, '0');
  }

  function ba(vi, en, fr) {
    return '<span class="lang-vi">' + vi + '</span>'
         + '<span class="lang-en">' + en + '</span>'
         + '<span class="lang-fr">' + fr + '</span>';
  }

  var dem = 0;

  function dung(am, bai) {
    var id = 'ht-' + (++dem);
    var boc = document.createElement('div');
    boc.className = 'ht' + (bai.min ? ' ht-min' : '');

    var nut = document.createElement('button');
    nut.type = 'button';
    nut.className = 'ht-nut';
    nut.setAttribute('aria-expanded', 'false');
    nut.setAttribute('aria-controls', id);
    nut.innerHTML = '<span aria-hidden="true">♪</span> ' + (bai.min
      ? ba('Hát theo', 'Sing along', 'Chanter avec')
      : ba('Lời theo khổ', 'Lyrics by verse', 'Paroles par couplet'));

    var bang = document.createElement('div');
    bang.className = 'ht-bang';
    bang.id = id;
    bang.hidden = true;

    var meo = bai.min
      ? ba('Khổ đang hát sẽ sáng lên. Bấm vào một khổ để nhảy tới đó.',
           'The verse being sung lights up. Tap a verse to jump there.',
           'Le couplet chanté s’éclaire. Touchez un couplet pour y aller.')
      : ba('Bài này chỉ có mốc đầu mỗi khổ, chưa đủ dày để chữ chạy theo nhạc. Bấm vào một khổ để nhảy tới đó.',
           'This song only has a mark at the head of each verse, too sparse to follow the singing. Tap a verse to jump there.',
           'Ce morceau n’a qu’un repère par couplet, trop espacé pour suivre le chant. Touchez un couplet pour y aller.');

    var h = '<p class="ht-meo">' + meo + '</p><ol class="ht-ds">';
    bai.khuc.forEach(function (k, i) {
      h += '<li><button type="button" class="ht-khuc" data-i="' + i + '" data-g="' + k.g + '">'
         + '<span class="ht-nhan">' + k.n + ' <i>' + gio(k.g) + '</i></span>'
         + '<span class="ht-dong">' + k.d.join('<br>') + '</span></button></li>';
    });
    bang.innerHTML = h + '</ol>';

    boc.appendChild(nut);
    boc.appendChild(bang);
    am.parentNode.insertBefore(boc, am.nextSibling);

    nut.addEventListener('click', function () {
      var mo = bang.hidden;
      bang.hidden = !mo;
      nut.setAttribute('aria-expanded', mo ? 'true' : 'false');
      boc.classList.toggle('ht-mo', mo);
    });

    bang.addEventListener('click', function (e) {
      var b = e.target.closest('.ht-khuc');
      if (!b) return;
      am.currentTime = parseFloat(b.dataset.g);
      if (am.paused) { var p = am.play(); if (p && p.catch) p.catch(function () {}); }
    });

    if (!bai.min) return;

    // Chỉ bài có mốc đủ dày mới theo dõi thời gian.
    var nay = -1;
    var cac = bang.querySelectorAll('.ht-khuc');
    am.addEventListener('timeupdate', function () {
      if (bang.hidden) return;
      var t = am.currentTime, k = -1;
      for (var i = 0; i < bai.khuc.length; i++) { if (t >= bai.khuc[i].g) k = i; else break; }
      if (k === nay) return;
      nay = k;
      for (var j = 0; j < cac.length; j++) cac[j].classList.toggle('dang', j === k);
      if (k >= 0 && !matchMedia('(prefers-reduced-motion: reduce)').matches) {
        // Đo bằng hình chữ nhật thật, đừng dùng offsetTop: nó tính theo
        // offsetParent, mà offsetParent là ai thì còn tuỳ CSS bên ngoài.
        var rk = cac[k].getBoundingClientRect(), rb = bang.getBoundingClientRect();
        bang.scrollTo({ top: Math.max(0, bang.scrollTop + (rk.top - rb.top) - bang.clientHeight / 3),
                        behavior: 'smooth' });
      }
    });
  }

  function chay() {
    var ds = document.querySelectorAll('audio[src]');
    for (var i = 0; i < ds.length; i++) {
      var am = ds[i];
      var ten = am.getAttribute('src').split('/').pop();
      var bai = DL[ten];
      if (bai && !am.dataset.htXong) { am.dataset.htXong = '1'; dung(am, bai); }
    }
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', chay);
  else chay();
})();
