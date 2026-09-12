/* ============================================================
   CLAY HERO — góc bàn làm việc bằng đất sét ở hero trang chủ.

   Ba khối trên một cái đĩa đất: bản đồ Việt Nam đắp nổi, một
   hoa sen nhỏ và con dấu sáp. Không phải sân khấu — chỉ là mấy
   vật trên bàn, quay rất chậm.

   Tăng cường lũy tiến, theo đúng lối của assets/js/clayhub.js:
   - Ảnh tĩnh .claypost luôn hiện trước; chỉ khi WebGL + THREE +
     VN_SHAPE đủ thì mới thay bằng canvas.
   - prefers-reduced-motion: dựng cảnh, vẽ một khung, không vòng lặp.
   - Tiết kiệm dữ liệu / mạng 2G-3G: bỏ hẳn, giữ ảnh tĩnh.
   - Tạm dừng khi tab ẩn hoặc hero ra khỏi màn hình.
   - Theo dõi data-theme để đổi màu cùng chế độ tối.
   ============================================================ */
(function () {
  'use strict';

  var khung = document.getElementById('claysan');
  if (!khung || typeof THREE === 'undefined' || !window.VN_SHAPE) return;

  /* WebGL khả dụng? */
  try {
    var thu = document.createElement('canvas');
    if (!(thu.getContext('webgl') || thu.getContext('experimental-webgl'))) return;
  } catch (e) { return; }

  var giamDong = matchMedia('(prefers-reduced-motion: reduce)').matches;

  var canvas = document.createElement('canvas');
  canvas.className = 'claycanvas';
  canvas.setAttribute('aria-hidden', 'true');

  var renderer;
  try {
    renderer = new THREE.WebGLRenderer({ canvas: canvas, antialias: true, alpha: true });
  } catch (e2) { return; }
  renderer.setPixelRatio(Math.min(devicePixelRatio || 1, 1.75));
  renderer.outputEncoding = THREE.sRGBEncoding;
  renderer.shadowMap.enabled = false;

  khung.appendChild(canvas);
  khung.classList.add('co-3d');   // CSS ẩn ảnh tĩnh khi đã có canvas

  var scene = new THREE.Scene();
  var camera = new THREE.PerspectiveCamera(30, 1, 0.1, 60);
  camera.position.set(0, 2.42, 9.1);
  camera.lookAt(0, 1.22, 0);

  /* ---------- bảng màu: cùng token với CSS trang chủ ---------- */
  var MAU = {
    sang: {
      dia: 0xe7d7bd, giay: 0xfffcf5, banDo: 0xb9512e, canhSen: 0xf2cdbd,
      nhuySen: 0xc58f2e, laSen: 0x3f6f68, dau: 0xb8842c,
      hemiTroi: 0xfff6e8, hemiDat: 0xd3bda0, nang: 0xfff1dc, cddNang: 0.62, cddHemi: 0.66, bong: 0.2
    },
    toi: {
      dia: 0x3a2e24, giay: 0x3a2f26, banDo: 0xc9663c, canhSen: 0x9c6553,
      nhuySen: 0xd6a24e, laSen: 0x4f8378, dau: 0xd6a24e,
      hemiTroi: 0x6b6152, hemiDat: 0x171210, nang: 0xffe6c6, cddNang: 0.6, cddHemi: 0.46, bong: 0.42
    }
  };

  function cheDoToi() {
    var t = document.documentElement.getAttribute('data-theme');
    if (t === 'dark') return true;
    if (t === 'light') return false;
    return matchMedia('(prefers-color-scheme: dark)').matches;
  }
  var mau = cheDoToi() ? MAU.toi : MAU.sang;

  /* Three r128 chưa quản lý màu tự động: màu lấy từ bảng token là sRGB, nếu
     đưa thẳng vào vật liệu rồi lại xuất ra sRGB thì bị sáng lên hai lần và
     đất sét hoá thành màu phấn. Đổi sang tuyến tính một lần ở đây. */
  function mauTuyenTinh(hex) {
    return new THREE.Color(hex).convertSRGBToLinear();
  }
  function datSet(m) { // chất liệu đất sét: lì, mềm, không kim loại
    return new THREE.MeshStandardMaterial({ color: mauTuyenTinh(m), roughness: 0.9, metalness: 0 });
  }

  var hemi = new THREE.HemisphereLight(mauTuyenTinh(mau.hemiTroi), mauTuyenTinh(mau.hemiDat), mau.cddHemi);
  scene.add(hemi);
  var nang = new THREE.DirectionalLight(mauTuyenTinh(mau.nang), mau.cddNang);
  nang.position.set(-4.5, 7.5, 5.5);
  scene.add(nang);
  var bu = new THREE.DirectionalLight(mauTuyenTinh(mau.nang), 0.3);   // đèn bù phía trước cho mặt bản đồ đỡ bẹt
  bu.position.set(2.6, 3, 7.2);
  scene.add(bu);

  var ban = new THREE.Group();          // cả cụm vật trên bàn
  scene.add(ban);

  /* ---------- bóng đổ mềm: một mặt phẳng có texture toả tròn ---------- */
  function texBong() {
    var c = document.createElement('canvas'); c.width = c.height = 128;
    var g = c.getContext('2d');
    var gr = g.createRadialGradient(64, 64, 4, 64, 64, 62);
    gr.addColorStop(0, 'rgba(0,0,0,.55)');
    gr.addColorStop(0.55, 'rgba(0,0,0,.18)');
    gr.addColorStop(1, 'rgba(0,0,0,0)');
    g.fillStyle = gr; g.fillRect(0, 0, 128, 128);
    return new THREE.CanvasTexture(c);
  }
  var bong = new THREE.Mesh(
    new THREE.PlaneGeometry(6.6, 6.6),
    new THREE.MeshBasicMaterial({ map: texBong(), transparent: true, opacity: mau.bong, depthWrite: false })
  );
  bong.rotation.x = -Math.PI / 2;
  bong.position.y = -0.64;
  ban.add(bong);

  /* ---------- cái đĩa đất sét làm mặt bàn ---------- */
  var matDia = datSet(mau.dia);
  var dia = new THREE.Mesh(new THREE.CylinderGeometry(2.62, 2.5, 0.4, 64), matDia);
  dia.position.y = -0.42;
  ban.add(dia);
  var vienDia = new THREE.Mesh(new THREE.TorusGeometry(2.6, 0.1, 10, 64), matDia);
  vienDia.rotation.x = Math.PI / 2;
  vienDia.position.y = -0.23;
  ban.add(vienDia);

  /* ---------- bản đồ Việt Nam đắp nổi ----------
     Toạ độ lấy từ assets/js/vn-shape.js (sinh từ Natural Earth), cùng một
     hình với hình chìm ở chân trang, nên hai chỗ luôn khớp nhau. */
  var matBanDo = datSet(mau.banDo);
  var banDo = null;
  (function dungBanDo() {
    var VN = window.VN_SHAPE, cao = 3.05;
    var tl = cao / VN.h;                       // đơn vị SVG -> đơn vị cảnh
    var shapes = [];
    for (var i = 0; i < VN.rings.length; i++) {
      var r = VN.rings[i];
      if (r.length < 4) continue;
      var s = new THREE.Shape();
      s.moveTo(r[0][0] * tl, -r[0][1] * tl);   // SVG có trục y xuôi xuống
      for (var j = 1; j < r.length; j++) s.lineTo(r[j][0] * tl, -r[j][1] * tl);
      s.closePath();
      shapes.push(s);
    }
    if (!shapes.length) return;
    var hh = new THREE.ExtrudeGeometry(shapes, {
      depth: 0.22, bevelEnabled: true, bevelThickness: 0.035,
      bevelSize: 0.035, bevelSegments: 2, curveSegments: 1
    });
    hh.computeBoundingBox();
    var bb = hh.boundingBox;
    hh.translate(-(bb.min.x + bb.max.x) / 2, -(bb.min.y + bb.max.y) / 2, 0);
    hh.computeVertexNormals();

    banDo = new THREE.Mesh(hh, matBanDo);
    // Dựng gần như thẳng, ngả ra sau một chút: nhìn từ ghế ngồi vẫn đọc được
    // hình chữ S, mà vẫn ra dáng tấm đất sét dựng trên đĩa chứ không lơ lửng.
    banDo.rotation.x = -0.30;
    banDo.rotation.z = -0.04;
    banDo.position.set(0.05, cao / 2 * Math.cos(0.30) - 0.3, -0.42);
    ban.add(banDo);
  })();

  /* ---------- hoa sen nhỏ (theo cách dựng của clayhub.js) ---------- */
  var matCanh = datSet(mau.canhSen), matNhuy = datSet(mau.nhuySen), matLa = datSet(mau.laSen);
  var sen = new THREE.Group();
  (function dungSen() {
    var canh = new THREE.SphereGeometry(0.5, 12, 10);
    for (var v = 0; v < 2; v++) {
      var soCanh = v === 0 ? 8 : 5, bk = v === 0 ? 0.6 : 0.33, nghieng = v === 0 ? 0.95 : 0.55;
      for (var i = 0; i < soCanh; i++) {
        var goc = (i / soCanh) * Math.PI * 2 + v * 0.4;
        var m = new THREE.Mesh(canh, matCanh);
        m.scale.set(0.4, 0.9, 0.19);
        m.position.set(Math.cos(goc) * bk, 0.4, Math.sin(goc) * bk);
        m.rotation.set(Math.sin(goc) * nghieng, 0, -Math.cos(goc) * nghieng);
        sen.add(m);
      }
    }
    var nhuy = new THREE.Mesh(new THREE.SphereGeometry(0.22, 12, 10), matNhuy);
    nhuy.position.y = 0.52; sen.add(nhuy);
    var la = new THREE.Mesh(new THREE.CylinderGeometry(0.78, 0.74, 0.1, 22, 1, false, 0.5, 5.7), matLa);
    la.position.set(0.42, 0.02, 0.5); sen.add(la);
    sen.scale.setScalar(0.6);
    sen.position.set(-1.34, -0.18, 1.05);
    ban.add(sen);
  })();

  /* ---------- con dấu sáp ---------- */
  var matDau = datSet(mau.dau);
  var dau = new THREE.Group();
  (function dungDau() {
    var than = new THREE.Mesh(new THREE.CylinderGeometry(0.52, 0.5, 0.16, 40), matDau);
    dau.add(than);
    var vanh = new THREE.Mesh(new THREE.TorusGeometry(0.47, 0.055, 8, 40), matDau);
    vanh.rotation.x = Math.PI / 2; vanh.position.y = 0.09; dau.add(vanh);
    dau.position.set(1.4, -0.13, 1.18);
    dau.rotation.z = 0.06;
    ban.add(dau);
  })();

  /* ---------- đổi màu khi đổi chế độ sáng/tối ---------- */
  function apMau() {
    mau = cheDoToi() ? MAU.toi : MAU.sang;
    hemi.color.copy(mauTuyenTinh(mau.hemiTroi)); hemi.groundColor.copy(mauTuyenTinh(mau.hemiDat));
    hemi.intensity = mau.cddHemi;
    nang.color.copy(mauTuyenTinh(mau.nang)); nang.intensity = mau.cddNang;
    bu.color.copy(mauTuyenTinh(mau.nang));
    matDia.color.copy(mauTuyenTinh(mau.dia));
    matBanDo.color.copy(mauTuyenTinh(mau.banDo));
    matCanh.color.copy(mauTuyenTinh(mau.canhSen));
    matNhuy.color.copy(mauTuyenTinh(mau.nhuySen));
    matLa.color.copy(mauTuyenTinh(mau.laSen));
    matDau.color.copy(mauTuyenTinh(mau.dau));
    bong.material.opacity = mau.bong;
    ve();
  }
  new MutationObserver(apMau).observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
  try { matchMedia('(prefers-color-scheme: dark)').addEventListener('change', apMau); } catch (e3) { /* Safari cũ */ }

  /* ---------- khung nhìn ---------- */
  function doKichThuoc() {
    var w = khung.clientWidth || 320;
    var h = khung.clientHeight || w;
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
  }
  doKichThuoc();
  addEventListener('resize', function () { doKichThuoc(); ve(); }, { passive: true });

  /* ---------- chuột: nghiêng nhẹ theo con trỏ, chỉ trên máy có chuột ---------- */
  var chuotX = 0, chuotY = 0, dichX = 0, dichY = 0;
  if (!giamDong && matchMedia('(hover:hover) and (pointer:fine)').matches) {
    khung.addEventListener('pointermove', function (e) {
      var r = khung.getBoundingClientRect();
      chuotX = ((e.clientX - r.left) / r.width - 0.5) * 2;
      chuotY = ((e.clientY - r.top) / r.height - 0.5) * 2;
    }, { passive: true });
    khung.addEventListener('pointerleave', function () { chuotX = 0; chuotY = 0; }, { passive: true });
  }

  /* ---------- vòng lặp ----------
     Đồng hồ cộng dồn: chỉ chạy khi cảnh đang hiện, nên lúc tạm dừng rồi chạy
     lại cảnh không nhảy về đầu. Khung đầu tiên ở t = 0 - đúng bằng ảnh tĩnh. */
  var tCong = 0, tMoc = 0, id = 0, hienRa = true, tabHien = true;

  function ve() {
    renderer.render(scene, camera);
  }

  function khung1(now) {
    id = 0;
    var t = tCong + (now - tMoc) / 1000;
    dichX += (chuotX * 0.12 - dichX) * 0.05;
    dichY += (chuotY * 0.06 - dichY) * 0.05;
    ban.rotation.y = Math.sin(t * 0.08) * 0.2 + dichX;
    ban.rotation.x = dichY * -1;
    ban.position.y = Math.sin(t * 0.5) * 0.045;
    sen.rotation.y = t * 0.06;
    sen.position.y = -0.14 + Math.sin(t * 0.8) * 0.02;
    ve();
    if (hienRa && tabHien) id = requestAnimationFrame(khung1);
  }

  function chay() {
    if (giamDong) { ve(); return; }         // tôn trọng prefers-reduced-motion
    if (!id && hienRa && tabHien) { tMoc = performance.now(); id = requestAnimationFrame(khung1); }
  }
  function dung() {
    if (id) { cancelAnimationFrame(id); id = 0; tCong += (performance.now() - tMoc) / 1000; }
  }

  document.addEventListener('visibilitychange', function () {
    tabHien = !document.hidden;
    tabHien ? chay() : dung();
  });

  if ('IntersectionObserver' in window) {
    new IntersectionObserver(function (es) {
      hienRa = es[0].isIntersecting;
      hienRa ? chay() : dung();
    }, { rootMargin: '120px' }).observe(khung);
  }

  ve();      // một khung ngay để không loé
  chay();

  /* dùng cho việc chụp ảnh tĩnh dự phòng (scripts/make-hero-poster.js) */
  window.CLAY_HERO = { ve: ve, canvas: canvas };
})();
