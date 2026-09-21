/* ============================================================================
   huong3d.js — Cô Hương đất sét 3D đạp xe trên bản đồ Garden Hub
   ----------------------------------------------------------------------------
   Thay con nhân vật 2D bằng khối 3D thật: đùn chính hình bóng của tranh gốc
   thành phôi đất sét có bề dày và cạnh bo, mặt trước giữ nguyên nét vẽ.

   Dùng:
     nạp three.js r128 (bản UMD) trước, rồi:
     nạp huong3d.js
     const co = Huong3D.gan({ khung: document.querySelector('.gh-map') });
     co.den(0.78);                     // đạp xe tới 78% chiều ngang bản đồ
     co.den(0.2, ()=> cuonToi('#blog'));

   Tự động: không có WebGL → rơi về thẻ <img>; prefers-reduced-motion → dịch
   thẳng, không chạy vòng lặp; tab ẩn → ngừng vẽ.
   ========================================================================== */
(function (global) {
'use strict';

/* --- toạ độ hình bóng, rút từ chính ảnh gốc bằng Douglas–Peucker --- */
const VIEN_MAC_DINH = {"xedap":{"v":[[0.4102,0.9951],[0.4828,0.9947],[0.5275,0.9658],[0.5597,0.8789],[0.5463,0.8237],[0.5689,0.7974],[0.574,0.7671],[0.6171,0.7475],[0.6352,0.7509],[0.6665,0.8263],[0.6545,0.8882],[0.6747,0.8934],[0.6828,0.9197],[0.7132,0.9237],[0.733,0.9132],[0.7469,0.8961],[0.7237,0.8276],[0.7212,0.7947],[0.6952,0.7237],[0.6771,0.6974],[0.6624,0.687],[0.6425,0.6862],[0.5789,0.6997],[0.5654,0.6816],[0.5786,0.6605],[0.5572,0.651],[0.5209,0.6543],[0.5111,0.6184],[0.539,0.6019],[0.6007,0.5895],[0.6443,0.5547],[0.7024,0.5586],[0.7265,0.5961],[0.7405,0.6052],[0.7858,0.6036],[0.799,0.5961],[0.801,0.5829],[0.7895,0.5761],[0.7532,0.5717],[0.7329,0.5408],[0.735,0.5319],[0.8403,0.5348],[0.9108,0.525],[0.8889,0.4],[0.8784,0.3918],[0.8494,0.3854],[0.8471,0.3776],[0.8688,0.3671],[0.8764,0.3513],[0.9197,0.3263],[0.9421,0.3053],[0.9768,0.2605],[0.9918,0.2276],[0.9911,0.1039],[0.9657,0.0592],[0.9292,0.0262],[0.8802,0.0062],[0.7623,0.0078],[0.6969,0.0416],[0.6388,0.1073],[0.5426,0.1107],[0.51,0.157],[0.461,0.1378],[0.4047,0.1447],[0.3593,0.0982],[0.3194,0.0814],[0.2849,0.077],[0.2432,0.0813],[0.1771,0.1197],[0.144,0.1618],[0.1266,0.2026],[0.1224,0.2711],[0.1139,0.2829],[0.1138,0.2974],[0.1263,0.3395],[0.1702,0.3816],[0.1691,0.3934],[0.1416,0.3967],[0.1143,0.3909],[0.0672,0.3738],[0.0309,0.346],[0.0158,0.35],[0.0144,0.3934],[0.0436,0.4321],[0.0762,0.445],[0.176,0.4608],[0.2131,0.4737],[0.238,0.4947],[0.2855,0.5618],[0.3227,0.6026],[0.323,0.6124],[0.3047,0.6289],[0.3008,0.6421],[0.2834,0.6487],[0.2807,0.6632],[0.2535,0.6816],[0.2464,0.7039],[0.2303,0.7184],[0.2613,0.7316],[0.2613,0.7437],[0.2481,0.7658],[0.2485,0.7895],[0.2976,0.8415],[0.3011,0.8829],[0.3281,0.95],[0.3612,0.9804]],"tl":0.725},"chi":{"v":[[0.3512,0.995],[0.4682,0.9937],[0.5199,0.9776],[0.5541,0.9566],[0.6063,0.8947],[0.6063,0.8789],[0.5911,0.8618],[0.5911,0.8526],[0.646,0.8145],[0.6504,0.8013],[0.6409,0.7763],[0.6765,0.7513],[0.6576,0.7237],[0.6583,0.7145],[0.6656,0.71],[0.6906,0.7092],[0.7174,0.7171],[0.8094,0.7577],[0.8484,0.7829],[0.893,0.799],[0.982,0.8013],[0.9532,0.7868],[0.9507,0.7658],[0.9416,0.7579],[0.8696,0.7385],[0.8615,0.725],[0.8473,0.7171],[0.6497,0.6368],[0.6471,0.6211],[0.6143,0.6145],[0.6464,0.5513],[0.6602,0.5],[0.7072,0.1237],[0.702,0.1145],[0.6757,0.1013],[0.6755,0.0842],[0.6643,0.0711],[0.6751,0.0382],[0.6935,0.0276],[0.6823,0.0075],[0.0769,0.0062],[0.0427,0.0132],[0.0125,0.0421],[0.0124,0.1197],[0.0505,0.175],[0.108,0.2842],[0.2104,0.5368],[0.2325,0.5697],[0.2825,0.6145],[0.2742,0.6243],[0.1572,0.6342],[0.1245,0.6461],[0.1222,0.6724],[0.1283,0.7026],[0.1058,0.7237],[0.1365,0.7447],[0.1388,0.7526],[0.1195,0.7776],[0.1195,0.7974],[0.1304,0.8131],[0.1742,0.8447],[0.1797,0.8921],[0.2267,0.9539],[0.2709,0.9794]],"tl":0.3934},"reo":{"v":[[0.0914,0.995],[0.1209,0.9942],[0.1476,0.9816],[0.1604,0.9421],[0.3127,0.836],[0.3412,0.8382],[0.3714,0.8868],[0.4077,0.9118],[0.4838,0.9303],[0.5339,0.932],[0.587,0.923],[0.6316,0.9026],[0.6837,0.8382],[0.6867,0.8158],[0.6962,0.8126],[0.7193,0.8171],[0.8899,0.925],[0.8975,0.9329],[0.9019,0.9579],[0.9115,0.9663],[0.9528,0.975],[0.9705,0.9708],[0.9852,0.9579],[0.9849,0.9434],[0.9387,0.9118],[0.9334,0.8934],[0.7237,0.7526],[0.7157,0.7276],[0.7447,0.7],[0.7275,0.6737],[0.7364,0.6579],[0.7139,0.6495],[0.6785,0.6467],[0.6717,0.6395],[0.6688,0.6053],[0.7112,0.5342],[0.7268,0.4908],[0.7704,0.1145],[0.7647,0.1053],[0.7435,0.0947],[0.7409,0.0763],[0.7228,0.0671],[0.7222,0.0553],[0.5162,0.0684],[0.5064,0.0632],[0.5025,0.0276],[0.4867,0.0219],[0.4644,0.0289],[0.452,0.0605],[0.4454,0.0634],[0.4248,0.0618],[0.4071,0.0497],[0.2891,0.0515],[0.2478,0.037],[0.2418,0.0395],[0.2413,0.0526],[0.2091,0.0684],[0.2027,0.0868],[0.2345,0.1211],[0.2516,0.1553],[0.2652,0.2026],[0.2988,0.2684],[0.3825,0.5079],[0.4057,0.5447],[0.4557,0.5987],[0.4586,0.6118],[0.4466,0.6237],[0.3953,0.6333],[0.3599,0.6307],[0.3451,0.6425],[0.3038,0.6535],[0.2859,0.6645],[0.283,0.6803],[0.3052,0.7039],[0.2879,0.7342],[0.295,0.7671],[0.115,0.91],[0.1053,0.9316],[0.0512,0.9632],[0.0558,0.9763]],"tl":0.4461},"suytu":{"v":[[0.4189,0.9949],[0.5721,0.9887],[0.6734,0.9618],[0.7035,0.9434],[0.7571,0.8908],[0.7802,0.8408],[0.8526,0.7961],[0.8526,0.7816],[0.8239,0.7526],[0.8222,0.7434],[0.8684,0.7145],[0.8714,0.7079],[0.8658,0.7013],[0.8059,0.6789],[0.7838,0.6592],[0.5961,0.6461],[0.5835,0.6382],[0.6807,0.5829],[0.7212,0.55],[0.74,0.525],[0.7715,0.4632],[0.805,0.3697],[0.8726,0.2474],[0.9516,0.125],[0.9492,0.1105],[0.9796,0.0605],[0.9796,0.025],[0.9712,0.0158],[0.9369,0.0066],[0.8829,0.006],[0.8108,0.0148],[0.5946,0.021],[0.5721,0.025],[0.5495,0.0439],[0.5315,0.0466],[0.455,0.0352],[0.1601,0.0237],[0.1396,0.0303],[0.125,0.0513],[0.117,0.0947],[0.0344,0.1158],[0.043,0.1882],[0.0658,0.3079],[0.0832,0.3605],[0.0925,0.4474],[0.1108,0.5224],[0.1258,0.5579],[0.2094,0.6329],[0.1982,0.6409],[0.1441,0.6414],[0.1099,0.6289],[0.0574,0.6316],[0.0438,0.6421],[0.0369,0.6658],[0.0168,0.6803],[0.0167,0.6987],[0.0384,0.7263],[0.0946,0.7671],[0.1051,0.7934],[0.1757,0.8175],[0.2207,0.8434],[0.222,0.8539],[0.2023,0.8737],[0.2006,0.8855],[0.2175,0.9039],[0.2285,0.9408],[0.2374,0.95],[0.2734,0.9671],[0.3468,0.986]],"tl":0.2921},"gioithieu":{"v":[[0.5638,0.9947],[0.6872,0.9941],[0.8084,0.9697],[0.8538,0.9434],[0.8874,0.8947],[0.9064,0.8776],[0.9056,0.8553],[0.8683,0.8289],[0.8672,0.8184],[0.9385,0.7816],[0.9484,0.7684],[0.9455,0.7382],[0.9772,0.7184],[0.9813,0.7026],[0.9588,0.6831],[0.8986,0.6645],[0.893,0.6487],[0.8508,0.6053],[0.8499,0.5882],[0.8983,0.5303],[0.9317,0.4605],[0.9484,0.3671],[0.9805,0.0816],[0.9721,0.0724],[0.9506,0.0668],[0.8157,0.0539],[0.8158,0.0434],[0.8683,0.025],[0.8674,0.0184],[0.8519,0.0143],[0.6996,0.0181],[0.6461,0.0357],[0.5638,0.038],[0.5103,0.049],[0.4033,0.0506],[0.3843,0.0487],[0.3539,0.0343],[0.2798,0.0339],[0.2691,0.0145],[0.2469,0.0071],[0.1235,0.0107],[0.1133,0.0224],[0.1212,0.0395],[0.1202,0.0855],[0.0587,0.0868],[0.0511,0.0934],[0.1774,0.2289],[0.2827,0.425],[0.3288,0.4961],[0.3859,0.5408],[0.4875,0.5947],[0.4815,0.601],[0.4527,0.6017],[0.2922,0.5849],[0.24,0.5947],[0.2247,0.6118],[0.227,0.65],[0.1869,0.6671],[0.1768,0.6842],[0.2182,0.6987],[0.2282,0.7079],[0.2255,0.7171],[0.193,0.7447],[0.1881,0.7645],[0.2074,0.7842],[0.2895,0.825],[0.2959,0.8724],[0.3329,0.9197],[0.3621,0.9453],[0.3979,0.9645],[0.4486,0.9807]],"tl":0.3197}};

const MAC_DINH = {
  khung: null,
  anh: { xedap: 'assets/nhan-vat/xedap.webp', chi: 'assets/nhan-vat/chi.webp' },
  vien: null,
  cao: 0.30,        // chiều cao nhân vật, theo tỉ lệ chiều cao khung
  duong: 0.88,      // đường chân: nhân vật đứng ở mấy % chiều cao khung
  batDau: 0.5,      // vị trí ngang lúc mở trang
  day: 0.075,       // bề dày phôi đất sét
  mauCanh: '#EADDCB',
  tocDo: 0.34,      // phần chiều ngang bản đồ đi được trong 1 giây
  zIndex: 3
};

function gan(tuyChon) {
  const c = Object.assign({}, MAC_DINH, tuyChon || {});
  c.anh = Object.assign({}, MAC_DINH.anh, (tuyChon && tuyChon.anh) || {});
  const vien = c.vien || VIEN_MAC_DINH;
  const khung = c.khung;
  if (!khung) throw new Error('huong3d: thiếu tuỳ chọn "khung"');
  if (getComputedStyle(khung).position === 'static') khung.style.position = 'relative';

  const nhe = matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- không có WebGL: rơi về ảnh phẳng ---------- */
  if (typeof THREE === 'undefined' || !coWebGL()) return duPhong(khung, c);

  /* ---------- canvas trong suốt phủ lên bản đồ ---------- */
  const canvas = document.createElement('canvas');
  Object.assign(canvas.style, {
    position: 'absolute', inset: '0', width: '100%', height: '100%',
    pointerEvents: 'none', zIndex: String(c.zIndex)
  });
  canvas.setAttribute('aria-hidden', 'true');
  khung.appendChild(canvas);

  const may = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
  may.setPixelRatio(Math.min(devicePixelRatio, 2));
  may.setClearAlpha(0);
  may.shadowMap.enabled = true;
  may.shadowMap.type = THREE.PCFSoftShadowMap;
  may.outputEncoding = THREE.sRGBEncoding;

  const canh = new THREE.Scene();

  /* Máy quay trực giao: nhân vật không phình to thu nhỏ khi chạy ngang,
     đúng kiểu bản đồ dẹt của tranh gốc. */
  const CAO_NV = 1;                     // nhân vật cao 1 đơn vị thế giới
  const KHUNG_CAO = CAO_NV / c.cao;     // chiều cao khung nhìn
  const tamY = (c.duong - 0.5) * KHUNG_CAO;
  const cam = new THREE.OrthographicCamera(-1, 1, 1, -1, 0.1, 60);
  cam.position.set(0, tamY + 1.15, 9);
  cam.lookAt(0, tamY, 0);

  /* ---------- ánh sáng nắng chiều dịu ---------- */
  canh.add(new THREE.HemisphereLight(0xFFF3E4, 0xD8C4B0, 1.05));
  const nang = new THREE.DirectionalLight(0xFFF6EC, 1.45);
  nang.position.set(2.6, 4.2, 3.4);
  nang.castShadow = true;
  nang.shadow.mapSize.set(1024, 1024);
  nang.shadow.camera.near = 0.5; nang.shadow.camera.far = 18;
  const s = 2.4;
  nang.shadow.camera.left = -s; nang.shadow.camera.right = s;
  nang.shadow.camera.top = s;  nang.shadow.camera.bottom = -s;
  nang.shadow.bias = -0.0018;
  canh.add(nang, nang.target);
  const vien2 = new THREE.DirectionalLight(0xBBD4F2, 0.5);
  vien2.position.set(-3, 1.6, -2.4);
  canh.add(vien2);

  /* ---------- bóng đổ rơi thẳng lên mặt tranh ---------- */
  const nen = new THREE.Mesh(
    new THREE.PlaneGeometry(60, 60),
    new THREE.ShadowMaterial({ opacity: 0.26 })
  );
  nen.rotation.x = -Math.PI / 2;
  nen.receiveShadow = true;
  canh.add(nen);

  /* ---------- đùn hình bóng thành khối đất sét ---------- */
  function khoiTuVien(k) {
    const d = vien[k], tl = d.tl;
    const hinh = new THREE.Shape();
    d.v.forEach((p, i) => i ? hinh.lineTo(p[0] * tl, p[1]) : hinh.moveTo(p[0] * tl, p[1]));
    hinh.closePath();
    const boUV = {
      generateTopUV(g, v, a, b, e) {
        return [a, b, e].map(i => new THREE.Vector2(v[i * 3] / tl, v[i * 3 + 1]));
      },
      generateSideWallUV(g, v, a, b, e, f) {
        return [a, b, e, f].map(i => new THREE.Vector2(v[i * 3] / tl, v[i * 3 + 1]));
      }
    };
    const hh = new THREE.ExtrudeGeometry(hinh, {
      depth: c.day, bevelEnabled: true, bevelSize: 0.011, bevelThickness: 0.013,
      bevelSegments: 2, curveSegments: 1, steps: 1, UVGenerator: boUV
    });
    hh.translate(-tl / 2, 0, -(c.day + 0.026) / 2);
    return hh;
  }

  const boTai = new THREE.TextureLoader();
  const TEX = {}, KHOI = {};
  Object.keys(c.anh).forEach(k => {
    if (!vien[k]) return;
    const t = boTai.load(c.anh[k]);
    t.encoding = THREE.sRGBEncoding;
    t.minFilter = THREE.LinearFilter;
    t.generateMipmaps = false;
    TEX[k] = t;
    KHOI[k] = khoiTuVien(k);
  });
  const dangDau = TEX.xedap ? 'xedap' : Object.keys(TEX)[0];

  const vlMat = new THREE.MeshStandardMaterial({
    map: TEX[dangDau], transparent: true, alphaTest: 0.42,
    roughness: 0.82, metalness: 0, side: THREE.DoubleSide
  });
  const vlCanh = new THREE.MeshStandardMaterial({
    color: new THREE.Color(c.mauCanh), roughness: 0.96, metalness: 0
  });

  const co = new THREE.Mesh(KHOI[dangDau], [vlMat, vlCanh]);
  co.castShadow = true;
  canh.add(co);

  /* ---------- trạng thái ---------- */
  let dangHT = dangDau;
  let px = c.batDau, dich = c.batDau, huong = 1, chay = false, xongCB = null;
  let t0 = performance.now(), dungLau = 0;

  function dang(k) {
    if (!TEX[k] || k === dangHT) return;
    dangHT = k;
    co.geometry = KHOI[k];
    vlMat.map = TEX[k];
    vlMat.needsUpdate = true;
  }

  function coRong() { return KHUNG_CAO * (khung.clientWidth / Math.max(khung.clientHeight, 1)); }

  function datNgay(p) {
    px = dich = Math.max(0.04, Math.min(0.96, p));
    capNhatViTri(0);
  }

  function den(p, xong) {
    p = Math.max(0.04, Math.min(0.96, p));
    if (nhe) { datNgay(p); if (xong) xong(); return; }
    dich = p;
    huong = (dich >= px) ? 1 : -1;
    chay = Math.abs(dich - px) > 0.004;
    xongCB = xong || null;
    if (!chay && xong) xong();
  }

  function capNhatViTri(t) {
    const rong = coRong();
    co.position.x = (px - 0.5) * rong;
    // nhún theo nhịp bánh xe khi đang chạy
    const nhip = chay ? Math.abs(Math.sin(t * 7.5)) * 0.022 : Math.sin(t * 1.5) * 0.006;
    co.position.y = nhip;
    co.scale.setScalar(CAO_NV);
    // quay mặt về người xem, ngả theo hướng đi để lộ bề dày
    const nga = chay ? huong * 0.34 : Math.sin(t * 0.8) * 0.08;
    co.rotation.set(0, nga, 0);
    co.rotation.z = chay ? -huong * 0.045 : Math.sin(t * 1.4) * 0.012;
    // đèn bám theo để bóng luôn nằm dưới chân
    nang.position.set(co.position.x + 2.6, 4.2, 3.4);
    nang.target.position.set(co.position.x, 0, 0);
    nang.target.updateMatrixWorld();
  }

  function coLai() {
    const w = khung.clientWidth, h = khung.clientHeight;
    if (!w || !h) return;
    may.setSize(w, h, false);
    const rong = KHUNG_CAO * (w / h);
    cam.left = -rong / 2; cam.right = rong / 2;
    cam.top = KHUNG_CAO / 2; cam.bottom = -KHUNG_CAO / 2;
    cam.position.x = 0;
    cam.updateProjectionMatrix();
    capNhatViTri((performance.now() - t0) / 1000);
  }
  const theoDoi = new ResizeObserver(coLai);
  theoDoi.observe(khung);
  coLai();

  /* ---------- vòng lặp ---------- */
  let truoc = performance.now(), song = true;
  function ve(nay) {
    if (!song) return;
    requestAnimationFrame(ve);
    if (document.hidden) { truoc = nay; return; }
    const dt = Math.min((nay - truoc) / 1000, 0.05); truoc = nay;
    const t = (nay - t0) / 1000;

    if (chay) {
      const con = dich - px;
      const buoc = c.tocDo * dt * Math.sign(con);
      if (Math.abs(buoc) >= Math.abs(con)) {
        px = dich; chay = false;
        dungLau = 0;
        if (xongCB) { const f = xongCB; xongCB = null; setTimeout(f, 120); }
      } else px += buoc;
      dang('xedap');
    } else {
      dungLau += dt;
      // đứng lâu thì xuống xe, đổi sang dáng mỉm cười chỉ đường
      if (dungLau > 2.6 && TEX.chi) dang('chi');
    }
    capNhatViTri(t);
    may.render(canh, cam);
  }
  requestAnimationFrame(ve);

  return {
    den, dat: datNgay, dang,
    viTri: () => px,
    huy() {
      song = false; theoDoi.disconnect();
      Object.values(KHOI).forEach(g => g.dispose());
      Object.values(TEX).forEach(t => t.dispose());
      vlMat.dispose(); vlCanh.dispose(); may.dispose();
      canvas.remove();
    }
  };
}

/* ---------- tiện ích ---------- */
function coWebGL() {
  try {
    const cv = document.createElement('canvas');
    return !!(cv.getContext('webgl2') || cv.getContext('webgl'));
  } catch (e) { return false; }
}

function duPhong(khung, c) {
  const img = document.createElement('img');
  img.src = c.anh.xedap || c.anh.chi;
  img.alt = '';
  Object.assign(img.style, {
    position: 'absolute', bottom: (100 - c.duong * 100) + '%',
    left: (c.batDau * 100) + '%', height: (c.cao * 100) + '%',
    transform: 'translateX(-50%)', transition: 'left .9s cubic-bezier(.4,0,.2,1)',
    pointerEvents: 'none', zIndex: String(c.zIndex)
  });
  khung.appendChild(img);
  let p = c.batDau;
  return {
    den(x, xong) { p = x; img.style.left = (x * 100) + '%'; if (xong) setTimeout(xong, 900); },
    dat(x) { p = x; img.style.left = (x * 100) + '%'; },
    dang() {}, viTri: () => p, huy() { img.remove(); }
  };
}

global.Huong3D = { gan, VIEN: VIEN_MAC_DINH };

})(window);
