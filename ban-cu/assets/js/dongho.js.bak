/* ============================================================
   ĐỒNG HỒ MÚI GIỜ — Việt Nam (ICT +7) & Pháp (CET/CEST)
   Widget nổi góc phải dưới, dùng Intl.DateTimeFormat (không CDN).
   Cập nhật mỗi 30s; đổi ngôn ngữ theo huong_lang (vi/en/fr).
   ============================================================ */
(function(){
  'use strict';

  function ngonNgu(){
    var l = 'vi';
    try{ l = localStorage.getItem('huong_lang') || navigator.language || 'vi'; }catch(e){}
    return l;
  }

  function fmtGio(tz){
    var l = ngonNgu();
    var lang = l === 'fr' ? 'fr-FR' : l === 'en' ? 'en-US' : 'vi-VN';
    try{
      return new Intl.DateTimeFormat(lang,
        {timeZone: tz, hour:'2-digit', minute:'2-digit', hour12:false}).format(new Date());
    }catch(e){ return '--:--'; }
  }

  function fmtNgay(tz){
    var l = ngonNgu();
    var lang = l === 'fr' ? 'fr-FR' : l === 'en' ? 'en-US' : 'vi-VN';
    try{
      return new Intl.DateTimeFormat(lang,
        {timeZone: tz, weekday:'short', day:'2-digit', month:'2-digit'}).format(new Date());
    }catch(e){ return ''; }
  }

  function bai(labelVN, labelEN, labelFR){
    var l = ngonNgu();
    return l === 'en' ? labelEN : l === 'fr' ? labelFR : labelVN;
  }

  function tao(){
    var w = document.createElement('div');
    w.id = 'dongho-widget';
    w.setAttribute('role','status');
    w.setAttribute('aria-label', 'World clock — Vietnam and France');
    w.innerHTML =
      '<button type="button" id="dongho-nut" aria-label="Toggle world clock">🕐</button>' +
      '<div id="dongho-panel" class="an">' +
        '<div class="dongho-dong">' +
          '<span class="dongho-co">🇻🇳</span>' +
          '<span class="dongho-ten" data-vi="Việt Nam" data-en="Vietnam" data-fr="Viêt Nam">' + bai('Việt Nam','Vietnam','Viêt Nam') + '</span>' +
          '<b id="dongho-gio-vn">--:--</b>' +
          '<i id="dongho-ngay-vn"></i>' +
        '</div>' +
        '<div class="dongho-dong">' +
          '<span class="dongho-co">🇫🇷</span>' +
          '<span class="dongho-ten" data-vi="Pháp" data-en="France" data-fr="France">' + bai('Pháp','France','France') + '</span>' +
          '<b id="dongho-gio-fr">--:--</b>' +
          '<i id="dongho-ngay-fr"></i>' +
        '</div>' +
      '</div>';
    document.body.appendChild(w);
    capNhat();
    setInterval(capNhat, 30000);
    var nut = document.getElementById('dongho-nut');
    var panel = document.getElementById('dongho-panel');
    nut.addEventListener('click', function(){ panel.classList.toggle('an'); });
    // theo dõi đổi ngôn ngữ từ các trang
    addEventListener('storage', function(e){ if(e.key === 'huong_lang') capNhat(); });
    addEventListener('huong_ng_change', capNhat);
  }

  function capNhat(){
    var gvn = document.getElementById('dongho-gio-vn');
    var gfr = document.getElementById('dongho-gio-fr');
    var nvn = document.getElementById('dongho-ngay-vn');
    var nfr = document.getElementById('dongho-ngay-fr');
    if(gvn) gvn.textContent = fmtGio('Asia/Ho_Chi_Minh');
    if(gfr) gfr.textContent = fmtGio('Europe/Paris');
    if(nvn) nvn.textContent = fmtNgay('Asia/Ho_Chi_Minh');
    if(nfr) nfr.textContent = fmtNgay('Europe/Paris');
  }

  // tiêm CSS (giống music.css)
  var css = [
    '#dongho-widget{position:fixed;right:1rem;bottom:1rem;z-index:94;font:600 12px/1.35 "Be Vietnam Pro",system-ui,sans-serif;color:#4a3730}',
    '#dongho-nut{width:40px;height:40px;border-radius:50%;border:none;cursor:pointer;font-size:1.1rem;',
    '  background:linear-gradient(150deg,#FFFBF4,#EDDCC5);box-shadow:0 4px 0 rgba(150,105,80,.30),0 8px 16px rgba(120,80,60,.18)}',
    '#dongho-panel{position:absolute;right:0;bottom:50px;width:152px;border-radius:18px;padding:.7rem .8rem;',
    '  background:linear-gradient(160deg,#FFFBF4,#F6E9D6);box-shadow:0 12px 34px rgba(120,80,60,.32);',
    '  border:2px solid rgba(255,248,238,.9);transition:opacity .3s}',
    '#dongho-panel.an{display:none}',
    '.dongho-dong{display:flex;flex-direction:column;gap:1px;padding:.45rem 0}',
    '.dongho-dong + .dongho-dong{border-top:1px dashed rgba(150,105,80,.35)}',
    '.dongho-dong .dongho-ten{font-size:.68rem;color:#8a7268;order:0}',
    '.dongho-dong b{font-size:1rem;color:#c4596b;letter-spacing:.02em}',
    '.dongho-dong i{font-style:normal;font-size:.62rem;color:#8a7268}',
    '@media(max-width:720px){#dongho-widget{right:.6rem;bottom:3.6rem}}',
    '@media(max-width:420px){#dongho-widget{bottom:4rem}}'
  ].join('');
  try{
    var st = document.createElement('style');
    st.textContent = css;
    document.head.appendChild(st);
  }catch(e){}

  if(document.readyState === 'loading') document.addEventListener('DOMContentLoaded', tao);
  else tao();
})();
