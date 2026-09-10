/* ============================================================
   CLAY HUB - vườn sen đất sét 3D động cho bản đồ trang chủ
   Tăng cường lũy tiến: chỉ chạy khi có WebGL + THREE; nếu không,
   ảnh nền tĩnh của #bando vẫn hiển thị như cũ.
   - Tôn trọng prefers-reduced-motion: dựng cảnh, render 1 khung, không loop.
   - Tạm dừng khi tab ẩn hoặc #bando ra khỏi màn hình.
   - Theo dõi data-theme để chuyển ngày/đêm cùng dark mode.
   ============================================================ */
(function () {
  'use strict';

  function ready(fn) {
    if (document.readyState !== 'loading') fn();
    else addEventListener('DOMContentLoaded', fn);
  }

  ready(function () {
    var khung = document.getElementById('bando');
    if (!khung || typeof THREE === 'undefined') return;

    // WebGL khả dụng?
    try {
      var thu = document.createElement('canvas');
      if (!(thu.getContext('webgl') || thu.getContext('experimental-webgl'))) return;
    } catch (e) { return; }

    var giamDong = matchMedia('(prefers-reduced-motion: reduce)').matches;

    var canvas = document.createElement('canvas');
    canvas.id = 'bd-3d';
    canvas.setAttribute('aria-hidden', 'true');
    khung.insertBefore(canvas, khung.firstChild);

    var renderer;
    try {
      renderer = new THREE.WebGLRenderer({ canvas: canvas, antialias: true, alpha: false });
    } catch (e) { canvas.remove(); return; }
    renderer.setPixelRatio(Math.min(devicePixelRatio || 1, 1.75));
    renderer.outputEncoding = THREE.sRGBEncoding;
    renderer.shadowMap.enabled = false;

    var scene = new THREE.Scene();
    var camera = new THREE.PerspectiveCamera(38, 16 / 9, 0.1, 120);
    camera.position.set(0, 4.6, 15.5);
    camera.lookAt(0, 1.2, 0);

    /* ---------- bảng màu đất sét (ngày / đêm) ---------- */
    var MAU = {
      ngay: {
        troiTren: '#ffd9e4', troiDuoi: '#d6f4ff', suong: '#ffeef4',
        hemiTroi: 0xffe4ee, hemiDat: 0x9fd8a8, nang: 0xffedd2, cddNang: 0.8, cddHemi: 0.7
      },
      dem: {
        troiTren: '#131c3a', troiDuoi: '#0a1226', suong: '#101a33',
        hemiTroi: 0x8aa8ff, hemiDat: 0x1d3a4a, nang: 0xaac6ff, cddNang: 0.5, cddHemi: 0.55
      }
    };

    function nenGradient(a, b) {
      var c = document.createElement('canvas'); c.width = 2; c.height = 256;
      var g = c.getContext('2d'), gr = g.createLinearGradient(0, 0, 0, 256);
      gr.addColorStop(0, a); gr.addColorStop(1, b);
      g.fillStyle = gr; g.fillRect(0, 0, 2, 256);
      var t = new THREE.CanvasTexture(c); t.encoding = THREE.sRGBEncoding;
      return t;
    }

    var hemi = new THREE.HemisphereLight(0xffffff, 0x9fd8a8, 0.7);
    scene.add(hemi);
    var nang = new THREE.DirectionalLight(0xffedd2, 0.8);
    nang.position.set(6, 10, 7);
    scene.add(nang);

    function datSet(mau) { // chất liệu đất sét: lì, mềm
      return new THREE.MeshStandardMaterial({ color: mau, roughness: 0.88, metalness: 0 });
    }

    /* ---------- mặt đất + ao sen ---------- */
    var dat = new THREE.Mesh(new THREE.SphereGeometry(26, 48, 32), datSet(0x9fd8a8));
    dat.scale.set(1.6, 0.22, 1); dat.position.y = -5.15;
    scene.add(dat);

    var ao = new THREE.Mesh(new THREE.CylinderGeometry(7.2, 7.6, 0.7, 48),
      new THREE.MeshStandardMaterial({ color: 0x2fb3d4, roughness: 0.45, metalness: 0, emissive: 0x0e7d9c, emissiveIntensity: 0.22 }));
    ao.position.set(0, 0.34, 2.4);
    scene.add(ao);
    var vienAo = new THREE.Mesh(new THREE.TorusGeometry(7.35, 0.28, 12, 48), datSet(0xf0a8bd));
    vienAo.rotation.x = Math.PI / 2; vienAo.position.set(0, 0.72, 2.4);
    scene.add(vienAo);

    /* ---------- đồi phía sau ---------- */
    [[-11, 0.2, -7, 6.5, 0x7ecf9e], [10.5, 0, -8, 7.5, 0x66c493], [0, -1.6, -13, 9, 0x8fd8ab]]
      .forEach(function (d) {
        var doi = new THREE.Mesh(new THREE.SphereGeometry(d[3], 32, 24), datSet(d[4]));
        doi.scale.y = 0.55; doi.position.set(d[0], d[1], d[2]);
        scene.add(doi);
      });

    /* ---------- hoa sen ---------- */
    var hoaSen = [];
    function taoSen(x, z, tl, mauCanh) {
      var hoa = new THREE.Group();
      var canh = new THREE.SphereGeometry(0.5, 12, 10);
      for (var v = 0; v < 2; v++) {
        var soCanh = v === 0 ? 8 : 5, bk = v === 0 ? 0.62 : 0.34, nghieng = v === 0 ? 0.9 : 0.5;
        for (var i = 0; i < soCanh; i++) {
          var goc = (i / soCanh) * Math.PI * 2 + v * 0.4;
          var m = new THREE.Mesh(canh, datSet(v === 0 ? mauCanh : 0xffb7cd));
          m.scale.set(0.42, 0.95, 0.2);
          m.position.set(Math.cos(goc) * bk, 0.42, Math.sin(goc) * bk);
          m.rotation.set(Math.sin(goc) * nghieng, 0, -Math.cos(goc) * nghieng);
          hoa.add(m);
        }
      }
      var nhuy = new THREE.Mesh(new THREE.SphereGeometry(0.24, 12, 10), datSet(0xffd76e));
      nhuy.position.y = 0.55; hoa.add(nhuy);
      hoa.position.set(x, 0.8, z); hoa.scale.setScalar(tl);
      hoa.userData.goc = Math.random() * Math.PI * 2;
      scene.add(hoa); hoaSen.push(hoa);
    }
    taoSen(-3.4, 2.2, 1.15, 0xf795b4);
    taoSen(2.9, 4.0, 0.9, 0xf6789f);
    taoSen(0.4, 1.0, 0.75, 0xffa8c4);

    /* ---------- lá súng ---------- */
    var laSung = [];
    [[-1.6, 4.6, 1.1], [4.6, 1.9, 0.9], [-4.9, 4.4, 0.8], [1.8, 6.2, 0.7], [-2.9, 0.2, 0.65]]
      .forEach(function (d, i) {
        var la = new THREE.Mesh(new THREE.CylinderGeometry(d[2], d[2] * 0.94, 0.12, 20, 1, false, 0.5, 5.7), datSet(0x4fae9d));
        la.position.set(d[0], 0.76, d[1]);
        la.userData.goc = i * 1.3;
        scene.add(la); laSung.push(la);
      });

    /* ---------- nhà đất sét nhỏ ---------- */
    var nha = new THREE.Group();
    var tuong = new THREE.Mesh(new THREE.BoxGeometry(2.6, 1.9, 2.2), datSet(0xfff3e6));
    tuong.position.y = 0.95; nha.add(tuong);
    var mai = new THREE.Mesh(new THREE.ConeGeometry(2.25, 1.5, 4), datSet(0xe06a8b));
    mai.position.y = 2.6; mai.rotation.y = Math.PI / 4; nha.add(mai);
    var cua = new THREE.Mesh(new THREE.BoxGeometry(0.55, 0.95, 0.1), datSet(0xa8626f));
    cua.position.set(0, 0.55, 1.12); nha.add(cua);
    nha.position.set(8.1, 0.15, -1.8); nha.rotation.y = -0.45;
    scene.add(nha);

    /* ---------- tre ---------- */
    [[-9.6, -1.2], [-10.4, -0.2], [-8.9, 0.4]].forEach(function (d, i) {
      var cao = 4.2 + i * 0.7;
      var tre = new THREE.Mesh(new THREE.CylinderGeometry(0.16, 0.2, cao, 10), datSet(0x7cc57a));
      tre.position.set(d[0], cao / 2, d[1]); tre.rotation.z = (i - 1) * 0.06;
      scene.add(tre);
      var ngon = new THREE.Mesh(new THREE.SphereGeometry(0.75 + i * 0.12, 12, 10), datSet(0x8fd08a));
      ngon.scale.y = 1.35; ngon.position.set(d[0] + (i - 1) * 0.2, cao + 0.4, d[1]);
      scene.add(ngon);
    });

    /* ---------- mây ---------- */
    var may = [];
    function taoMay(x, y, z, tl) {
      var g = new THREE.Group();
      [[0, 0, 0, 1], [0.9, 0.12, 0.1, 0.72], [-0.85, 0.05, -0.1, 0.66]].forEach(function (c) {
        var m = new THREE.Mesh(new THREE.SphereGeometry(0.9 * c[3], 14, 12),
          new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 1, metalness: 0 }));
        m.position.set(c[0], c[1], c[2]); g.add(m);
      });
      g.position.set(x, y, z); g.scale.setScalar(tl);
      g.userData.vt = 0.12 + Math.random() * 0.1;
      scene.add(g); may.push(g);
    }
    taoMay(-8, 7.4, -6, 1.15); taoMay(5, 8.4, -7, 0.9); taoMay(11, 6.6, -5, 0.7);

    /* ---------- mặt trời đất sét ---------- */
    var troi = new THREE.Mesh(new THREE.SphereGeometry(1.1, 20, 16),
      new THREE.MeshStandardMaterial({ color: 0xfff1c4, emissive: 0xffe9a8, emissiveIntensity: 0.6, roughness: 1 }));
    troi.position.set(-10.5, 9.2, -9);
    scene.add(troi);

    /* ---------- cánh hoa rơi ---------- */
    var canhRoi = [];
    if (!giamDong) {
      var hinhCanh = new THREE.SphereGeometry(0.16, 8, 6);
      for (var i = 0; i < 18; i++) {
        var c = new THREE.Mesh(hinhCanh, datSet(i % 3 ? 0xf795b4 : 0xffb7cd));
        c.scale.set(1, 0.35, 0.6);
        c.position.set((Math.random() - 0.5) * 24, 3 + Math.random() * 7, -4 + Math.random() * 10);
        c.userData = { vy: 0.25 + Math.random() * 0.3, ph: Math.random() * Math.PI * 2 };
        scene.add(c); canhRoi.push(c);
      }
    }

    /* ---------- ngày / đêm theo theme ---------- */
    function demTheme() {
      var t = document.documentElement.getAttribute('data-theme');
      if (t === 'dark') return true;
      if (t === 'light') return false;
      return matchMedia('(prefers-color-scheme: dark)').matches;
    }
    function apTheme() {
      var b = MAU[demTheme() ? 'dem' : 'ngay'];
      scene.background = nenGradient(b.troiTren, b.troiDuoi);
      scene.fog = new THREE.Fog(new THREE.Color(b.suong), 34, 90);
      hemi.color.set(b.hemiTroi); hemi.groundColor.set(b.hemiDat); hemi.intensity = b.cddHemi;
      nang.color.set(b.nang); nang.intensity = b.cddNang;
      troi.material.emissiveIntensity = demTheme() ? 0.9 : 0.6;
      troi.material.color.set(demTheme() ? 0xfff8dc : 0xfff1c4); // đêm: trăng
      if (demTheme()) { ao.material.color.set(0x1e7a99); ao.material.emissive.set(0x0a3d55); ao.material.emissiveIntensity = 0.3; }
      else { ao.material.color.set(0x2fb3d4); ao.material.emissive.set(0x0e7d9c); ao.material.emissiveIntensity = 0.22; }
      canVe = true;
    }
    new MutationObserver(apTheme).observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
    matchMedia('(prefers-color-scheme: dark)').addEventListener
      && matchMedia('(prefers-color-scheme: dark)').addEventListener('change', apTheme);

    /* ---------- kích thước ---------- */
    function coLai() {
      var w = khung.clientWidth, h = khung.clientHeight;
      if (!w || !h) return;
      renderer.setSize(w, h, false);
      camera.aspect = w / h; camera.updateProjectionMatrix();
      canVe = true;
    }
    ('ResizeObserver' in window) ? new ResizeObserver(coLai).observe(khung) : addEventListener('resize', coLai);

    /* ---------- thị sai theo con trỏ ---------- */
    var mucX = 0, mucY = 0;
    if (!giamDong) {
      khung.addEventListener('pointermove', function (e) {
        var r = khung.getBoundingClientRect();
        mucX = ((e.clientX - r.left) / r.width - 0.5) * 2;
        mucY = ((e.clientY - r.top) / r.height - 0.5) * 2;
      }, { passive: true });
      khung.addEventListener('pointerleave', function () { mucX = 0; mucY = 0; }, { passive: true });
    }

    /* ---------- vòng lặp ---------- */
    var dangThay = true, canVe = true, dongHo = new THREE.Clock();
    if ('IntersectionObserver' in window) {
      new IntersectionObserver(function (es) { dangThay = es[0].isIntersecting; }, { threshold: 0.02 }).observe(khung);
    }

    function ve() {
      var t = dongHo.getElapsedTime();
      hoaSen.forEach(function (h) {
        h.position.y = 0.8 + Math.sin(t * 0.9 + h.userData.goc) * 0.07;
        h.rotation.y = Math.sin(t * 0.25 + h.userData.goc) * 0.18;
      });
      laSung.forEach(function (l) {
        l.position.y = 0.76 + Math.sin(t * 0.8 + l.userData.goc) * 0.045;
      });
      may.forEach(function (m) {
        m.position.x += m.userData.vt * 0.016;
        if (m.position.x > 15) m.position.x = -15;
      });
      canhRoi.forEach(function (c) {
        c.position.y -= c.userData.vy * 0.016;
        c.position.x += Math.sin(t * 1.4 + c.userData.ph) * 0.012;
        c.rotation.x += 0.02; c.rotation.z += 0.013;
        if (c.position.y < 0.25) {
          c.position.y = 8 + Math.random() * 3;
          c.position.x = (Math.random() - 0.5) * 24;
        }
      });
      camera.position.x += (mucX * 1.6 - camera.position.x) * 0.04;
      camera.position.y += (4.6 - mucY * 0.9 - camera.position.y) * 0.04;
      camera.lookAt(0, 1.2, 0);
      renderer.render(scene, camera);
    }

    function vong() {
      requestAnimationFrame(vong);
      if (!dangThay || document.hidden) return;
      ve();
    }

    apTheme();
    coLai();
    if (giamDong) {
      // Giảm chuyển động: một khung tĩnh, vẽ lại khi đổi theme/kích thước
      ve();
      setInterval(function () { if (canVe) { canVe = false; ve(); } }, 400);
    } else {
      vong();
    }
    canvas.classList.add('on');
  });
})();
