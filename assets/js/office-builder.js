/* =============================================================================
   Bộ dựng văn phòng dùng chung — chạy được với three.js r128 (bản đi lại được)
   và bản mới hơn (trình xem mô hình). Chỉ dùng các hình khối có ở cả hai bản.
   xayVanPhong(T, { catMat, tran, phangBang }) trả về:
     root  — THREE.Group, mọi mesh và vật liệu đều có tên (xuất OBJ/GLB)
     va    — hộp va chạm [x0, x1, z0, z1] cho người đi
     den   — vị trí bóng đèn thả (để bản đi lại đặt PointLight)
     vat   — vật liệu, để bản đi lại đổi độ sáng theo nền sáng/tối
   lamNguoi(T, n) — dáng người đất sét cho một nhân vật.
   ========================================================================== */
(function () {
  'use strict';
  var R = 15, S = 11, CAO = 4.6, DAY = 0.2;

  function xay(T, o) {
    o = o || {};
    var root = new T.Group(); root.name = 'van_phong';
    var va = [], den = [];
    function M(name, color, r, m, ex) {
      var p = { color: color, roughness: r == null ? 0.8 : r, metalness: m || 0 };
      if (ex) for (var k in ex) p[k] = ex[k];
      var mt = new T.MeshStandardMaterial(p); mt.name = name; return mt;
    }
    var mat = {
      go: M('go_soi', 0x9c6f45, 0.7), goToi: M('go_oc_cho', 0x5e3d25, 0.6), san: M('san_go', 0xb08559, 0.85),
      san2: M('san_go_nhat', 0xc29868, 0.85), tuong: M('tuong_voi', 0xeee4d3, 0.95), vua: M('phao_chi', 0xf7efe2, 0.9),
      kim: M('thep', 0x9a918a, 0.35, 0.35), dong: M('dong_thau', 0xc9974a, 0.4, 0.35),
      kinh: M('kinh', 0xcfe7ee, 0.2, 0, { emissive: 0xaad8ea, emissiveIntensity: 0.5 }),
      giay: M('mat_bang', 0xfffcf5, 0.6), muc: M('muc', 0x2a2620, 0.5),
      man: M('man_hinh', 0x2a2620, 0.4, 0, { emissive: 0x3f6f68, emissiveIntensity: 0.4 }),
      dat: M('dat_nung', 0xc45c3a, 0.75), song: M('xanh_song', 0x3f6f68, 0.6), ho: M('ho_phach', 0xb8842c, 0.6),
      la: M('la_cay', 0x6b7f5a, 0.85), tim: M('tim_hoa_ca', 0x7a6a8c, 0.75), da: M('da_nau', 0x7a4630, 0.55),
      tham: M('tham_do', 0x8e3b2a, 0.95), tham2: M('tham_kem', 0xd9bf98, 0.95),
      den: M('bong_den', 0xfff4e2, 0.3, 0, { emissive: 0xffd9a0, emissiveIntensity: 1.3 }), vai: M('vai_ghe', 0x4a3f36, 0.9)
    };
    function box(name, w, h, d, m, x, y, z, p, bong) {
      var ms = new T.Mesh(new T.BoxGeometry(w, h, d), m); ms.name = name; ms.position.set(x, y, z);
      ms.castShadow = bong !== false; ms.receiveShadow = true; (p || root).add(ms); return ms;
    }
    function cyl(name, rt, rb, h, m, x, y, z, p, seg) {
      var ms = new T.Mesh(new T.CylinderGeometry(rt, rb, h, seg || 32), m); ms.name = name; ms.position.set(x, y, z);
      ms.castShadow = true; ms.receiveShadow = true; (p || root).add(ms); return ms;
    }
    function tien(name, pts, m, p, seg) {
      var ms = new T.Mesh(new T.LatheGeometry(pts.map(function (a) { return new T.Vector2(a[0], a[1]); }), seg || 40), m);
      ms.name = name; ms.castShadow = true; ms.receiveShadow = true; (p || root).add(ms); return ms;
    }
    function nhom(name, x, y, z, ry, p) {
      var g = new T.Group(); g.name = name; g.position.set(x || 0, y || 0, z || 0); g.rotation.y = ry || 0; (p || root).add(g); return g;
    }
    var hat = 7; function rnd() { hat = (hat * 16807) % 2147483647; return hat / 2147483647; }

    /* ---- sàn ------------------------------------------------------------ */
    var san = nhom('san');
    box('san_nen', R * 2 + DAY * 2, 0.1, S * 2 + DAY * 2, mat.san, 0, -0.05, 0, san, false);
    for (var i = 0, z = -S + 0.25; z < S; z += 0.5, i++)
      box('van_' + i, R * 2, 0.02, 0.49, i % 3 === 1 ? mat.san2 : mat.san, 0, 0.01, z, san, false);
    box('vien_tham_loi_di', 3.9, 0.01, 13.6, mat.tham, 0, 0.025, 1.6, san, false);
    box('tham_loi_di', 3.3, 0.012, 13.0, mat.tham2, 0, 0.028, 1.6, san, false);
    box('tham_cua', 2.6, 0.015, 1.1, mat.song, 0, 0.03, S - 0.8, san, false);

    /* ---- tường: vữa kem phía trên, ốp gỗ óc chó phía dưới ------------------ */
    var tg = nhom('tuong');
    var wz = -S - DAY / 2;
    [[-R - DAY, -9.7], [-6.3, -1.7], [1.7, 6.3], [9.7, R + DAY]].forEach(function (a, k) {
      box('tuong_sau_' + k, a[1] - a[0], CAO, DAY, mat.tuong, (a[0] + a[1]) / 2, CAO / 2, wz, tg, false);
    });
    [-8, 0, 8].forEach(function (x, k) {
      box('tuong_duoi_cua_' + k, 3.4, 1.6, DAY, mat.tuong, x, 0.8, wz, tg, false);
      box('tuong_tren_cua_' + k, 3.4, CAO - 3.9, DAY, mat.tuong, x, 3.9 + (CAO - 3.9) / 2, wz, tg, false);
      var c = nhom('cua_so_' + k, x, 2.75, wz, 0, tg);
      box('kinh', 3.2, 2.1, 0.02, mat.kinh, 0, 0, 0, c, false);
      box('khung_tren', 3.4, 0.12, 0.26, mat.goToi, 0, 1.09, 0, c); box('khung_duoi', 3.4, 0.12, 0.26, mat.goToi, 0, -1.09, 0, c);
      box('khung_trai', 0.12, 2.3, 0.26, mat.goToi, -1.64, 0, 0, c); box('khung_phai', 0.12, 2.3, 0.26, mat.goToi, 1.64, 0, 0, c);
      box('song_dung_1', 0.05, 2.1, 0.08, mat.goToi, -0.54, 0, 0.02, c); box('song_dung_2', 0.05, 2.1, 0.08, mat.goToi, 0.54, 0, 0.02, c);
      box('song_ngang', 3.2, 0.05, 0.08, mat.goToi, 0, 0.42, 0.02, c);
      box('bau_cua', 3.7, 0.07, 0.42, mat.go, 0, -1.18, 0.17, c);
    });
    box('tuong_trai', DAY, CAO, S * 2 + DAY * 2, mat.tuong, -R - DAY / 2, CAO / 2, 0, tg, false);
    box('tuong_phai', DAY, CAO, S * 2 + DAY * 2, mat.tuong, R + DAY / 2, CAO / 2, 0, tg, false);
    if (!o.catMat) {
      box('tuong_truoc_trai', R - 1.3 + DAY, CAO, DAY, mat.tuong, -(R + 1.3 + DAY) / 2, CAO / 2, S + DAY / 2, tg, false);
      box('tuong_truoc_phai', R - 1.3 + DAY, CAO, DAY, mat.tuong, (R + 1.3 + DAY) / 2, CAO / 2, S + DAY / 2, tg, false);
      box('tuong_tren_cua_vao', 2.6, CAO - 2.7, DAY, mat.tuong, 0, 2.7 + (CAO - 2.7) / 2, S + DAY / 2, tg, false);
      var cv = nhom('cua_vao', 0, 0, S - 0.03, 0, tg);
      box('khung_cua_tren', 2.8, 0.14, 0.12, mat.goToi, 0, 2.72, 0, cv);
      box('khung_cua_trai', 0.14, 2.72, 0.12, mat.goToi, -1.33, 1.36, 0, cv);
      box('khung_cua_phai', 0.14, 2.72, 0.12, mat.goToi, 1.33, 1.36, 0, cv);
      [-0.63, 0.63].forEach(function (x, k) {
        box('canh_cua_' + k, 1.24, 2.62, 0.05, mat.goToi, x, 1.31, 0.01, cv);
        box('kinh_cua_' + k, 0.8, 1.2, 0.01, mat.kinh, x, 1.75, -0.02, cv, false);
        box('tay_nam_cua_' + k, 0.04, 0.3, 0.05, mat.dong, x * 0.2, 1.1, -0.06, cv);
      });
    }
    /* ốp chân tường: tấm, nẹp đứng, nẹp đỉnh */
    function opTuong(ten, dai, x, z, ry, bo) {
      var g = nhom(ten, x, 0, z, ry, tg);
      box('tam_op', dai, 1.1, 0.05, mat.goToi, 0, 0.55, 0.025, g, false);
      box('nep_dinh', dai, 0.06, 0.1, mat.go, 0, 1.12, 0.05, g, false);
      box('len_chan', dai, 0.14, 0.07, mat.go, 0, 0.07, 0.04, g, false);
      for (var s = -dai / 2 + 0.75; s < dai / 2 - 0.3; s += 1.5) {
        if (bo && bo(s)) continue;
        box('nep_dung', 0.05, 0.84, 0.03, mat.go, s, 0.6, 0.06, g, false);
      }
    }
    opTuong('op_sau', R * 2, 0, -S, 0);
    opTuong('op_trai', S * 2, -R, 0, Math.PI / 2);
    opTuong('op_phai', S * 2, R, 0, -Math.PI / 2);
    if (!o.catMat) {
      opTuong('op_truoc_trai', R - 1.4, -(R + 1.4) / 2, S, Math.PI);
      opTuong('op_truoc_phai', R - 1.4, (R + 1.4) / 2, S, Math.PI);
    }
    /* phào trần */
    box('phao_sau', R * 2, 0.16, 0.14, mat.vua, 0, CAO - 0.08, -S + 0.07, tg, false);
    box('phao_trai', 0.14, 0.16, S * 2, mat.vua, -R + 0.07, CAO - 0.08, 0, tg, false);
    box('phao_phai', 0.14, 0.16, S * 2, mat.vua, R - 0.07, CAO - 0.08, 0, tg, false);

    /* ---- trần + dầm gỗ + đèn thả ----------------------------------------- */
    var tr = nhom('tran');
    if (o.tran) {
      var tp = new T.Mesh(new T.PlaneGeometry(R * 2, S * 2), M('tran', 0xfffcf5, 1, 0, { emissive: 0xfff4e2, emissiveIntensity: 0.5 }));
      tp.name = 'tran_phang'; tp.rotation.x = Math.PI / 2; tp.position.y = CAO; tr.add(tp); mat.tran = tp.material;
    }
    [-7.5, -2.4, 1.9, 5.5, 7.8].forEach(function (z, k) { box('dam_' + k, R * 2, 0.3, 0.24, mat.goToi, 0, CAO - 0.15, z, tr); });
    function denTha(ten, x, z, day) {
      var g = nhom(ten, x, 0, z, 0, tr), y0 = CAO - 0.3;
      cyl('day_den', 0.008, 0.008, day, mat.muc, 0, y0 - day / 2, 0, g, 8);
      var ch = tien('chup_den', [[0.03, 0], [0.05, -0.03], [0.14, -0.1], [0.26, -0.26], [0.3, -0.34], [0.29, -0.34]], mat.dong, g);
      ch.position.y = y0 - day; ch.material = mat.dong;
      var b = new T.Mesh(new T.SphereGeometry(0.075, 24, 16), mat.den); b.name = 'bong'; b.position.y = y0 - day - 0.24; g.add(b);
      den.push({ x: x, y: y0 - day - 0.3, z: z });
    }

    /* ---- bảng: khung gỗ, mặt giấy, đèn tranh bằng đồng ---------------------- */
    function khungBang(ten, x, z, ry, w, h, goToi) {
      var g = nhom(ten, x, 2.55, z, ry);
      box('khung', w + 0.24, h + 0.24, 0.06, goToi ? mat.goToi : mat.go, 0, 0, 0.09, g);
      box('mat_bang', w, h, 0.01, mat.giay, 0, 0, 0.125, g, false);
      var dt = nhom('den_tranh', 0, h / 2 + 0.3, 0, 0, g);
      box('de_gan', 0.2, 0.08, 0.04, mat.dong, 0, 0, 0.08, dt);
      var tay = cyl('can_den', 0.012, 0.012, 0.3, mat.dong, 0, 0, 0.22, dt, 8); tay.rotation.x = Math.PI / 2;
      var ong = cyl('ong_den', 0.045, 0.045, w * 0.6, mat.dong, 0, -0.03, 0.37, dt, 24); ong.rotation.z = Math.PI / 2;
      return g;
    }
    var bt = khungBang('bang_trang', -R, -3.5, Math.PI / 2, 6.4, 3.2, false);
    box('khay_but', 2.2, 0.05, 0.14, mat.dong, 0, -1.74, 0.17, bt);
    var ib = khungBang('bang_thang_tham_nhap', R, -2.0, -Math.PI / 2, 6.2, 3.5, true);
    if (o.phangBang) {
      box('tieu_de', 4.4, 0.16, 0.01, mat.dat, -0.8, 1.15, 0.135, bt, false);
      [3.2, 4.4, 4.9, 4.6, 4.2].forEach(function (w, k) { box('dong_' + k, w, 0.08, 0.01, mat.muc, -2.9 + w / 2, 0.55 - k * 0.4, 0.135, bt, false); });
      box('tieu_de', 3.4, 0.16, 0.01, mat.dat, -1.2, 1.45, 0.135, ib, false);
      for (var b = 0; b < 7; b++) {
        var wb = 1.2 + b * 0.6, sau = 0.03 + b * 0.018;
        box('bac_' + (b + 1), wb, 0.24, sau, mat.song, -2.8 + wb / 2, -1.35 + b * 0.38, 0.13 + sau / 2, ib);
      }
    }

    /* ---- địa cầu --------------------------------------------------------- */
    var dc = nhom('dia_cau', R - 1.35, 0, -5.4);
    tien('be_go', [[0, 0], [0.4, 0], [0.4, 0.05], [0.24, 0.12], [0.15, 0.5], [0.2, 0.86], [0.12, 0.9], [0, 0.9]], mat.goToi, dc);
    var cau = new T.Mesh(new T.SphereGeometry(0.42, 48, 32), mat.song); cau.name = 'qua_cau'; cau.position.y = 1.34; cau.castShadow = true; dc.add(cau);
    var kt = new T.Mesh(new T.TorusGeometry(0.5, 0.02, 12, 64, Math.PI * 1.3), mat.dong); kt.name = 'kinh_tuyen';
    kt.position.y = 1.34; kt.rotation.set(0, Math.PI / 2, -1.35); dc.add(kt);
    var xd = new T.Mesh(new T.TorusGeometry(0.43, 0.01, 8, 64), mat.ho); xd.name = 'xich_dao'; xd.position.y = 1.34; xd.rotation.x = Math.PI / 2 + 0.4; dc.add(xd);
    va.push([R - 1.8, R - 0.9, -5.85, -4.95]);

    /* ---- giá vẽ AIBIS cạnh địa cầu -------------------------------------- */
    var gv = nhom('gia_ve', R - 1.55, 1.45, -3.3, -Math.PI / 2);
    [-0.5, 0.5].forEach(function (s, k) { var c = box('chan_truoc_' + k, 0.05, 1.95, 0.05, mat.goToi, s, -0.47, 0.02, gv); c.rotation.z = s > 0 ? -0.09 : 0.09; });
    var cs = box('chan_sau', 0.05, 1.95, 0.05, mat.goToi, 0, -0.47, -0.28, gv); cs.rotation.x = -0.32;
    box('thanh_ngang', 1.12, 0.05, 0.04, mat.goToi, 0, -0.55, 0.06, gv);
    box('gia_do', 1.5, 0.05, 0.12, mat.goToi, 0, -0.52, 0.14, gv);
    box('tam_bang', 1.44, 1.04, 0.04, mat.go, 0, 0, 0.1, gv);
    va.push([R - 2.2, R - 0.95, -3.9, -2.7]);

    /* ---- bàn làm việc + ghế ---------------------------------------------- */
    function ghe(p, x, z, ry, ten) {
      var g = nhom(ten || 'ghe', x, 0, z, ry, p);
      for (var k = 0; k < 5; k++) {
        var a = k * Math.PI * 2 / 5;
        var c = box('chan_sao_' + k, 0.34, 0.035, 0.05, mat.kim, Math.cos(a) * 0.17, 0.06, Math.sin(a) * 0.17, g); c.rotation.y = -a;
        cyl('banh_xe_' + k, 0.03, 0.03, 0.03, mat.muc, Math.cos(a) * 0.32, 0.03, Math.sin(a) * 0.32, g, 12);
      }
      cyl('ong_hoi', 0.028, 0.028, 0.36, mat.kim, 0, 0.26, 0, g, 16);
      box('dem_ngoi', 0.52, 0.08, 0.5, mat.da, 0, 0.47, 0, g);
      box('tua_lung', 0.48, 0.56, 0.07, mat.da, 0, 0.84, -0.25, g);
      box('khung_lung', 0.05, 0.36, 0.03, mat.kim, 0, 0.6, -0.27, g);
      [-0.28, 0.28].forEach(function (s, k) { box('tay_vin_' + k, 0.05, 0.04, 0.34, mat.kim, s, 0.66, -0.02, g); box('chan_vin_' + k, 0.03, 0.18, 0.03, mat.kim, s, 0.57, -0.05, g); });
    }
    function ban(k, x, z, may) {
      var g = nhom('ban_' + k, x, 0, z);
      box('mat_ban', 2.4, 0.06, 1.15, mat.go, 0, 0.755, 0, g);
      box('vien_mat', 2.42, 0.03, 1.17, mat.goToi, 0, 0.715, 0, g);
      box('hoc_keo', 0.5, 0.68, 1.05, mat.goToi, 0.88, 0.36, 0, g);
      [0.58, 0.34, 0.12].forEach(function (y, j) { box('mat_keo_' + j, 0.46, 0.2, 0.01, mat.go, 0.88, y, -0.53, g); box('tay_nam_' + j, 0.14, 0.022, 0.02, mat.dong, 0.88, y + 0.04, -0.545, g); });
      cyl('chan_trai_1', 0.03, 0.03, 0.72, mat.goToi, -1.1, 0.36, -0.5, g, 16); cyl('chan_trai_2', 0.03, 0.03, 0.72, mat.goToi, -1.1, 0.36, 0.5, g, 16);
      box('tam_che', 2.3, 0.4, 0.02, mat.goToi, 0, 0.5, 0.5, g);
      box('man_hinh', 0.92, 0.55, 0.035, mat.man, 0, 1.12, 0.3, g);
      box('vien_man', 0.96, 0.59, 0.02, mat.muc, 0, 1.12, 0.328, g);
      box('co_man', 0.05, 0.3, 0.05, mat.kim, 0, 0.93, 0.36, g); box('de_man', 0.26, 0.015, 0.18, mat.kim, 0, 0.793, 0.34, g);
      box('ban_phim', 0.46, 0.02, 0.15, mat.muc, 0, 0.795, -0.14, g); box('chuot', 0.06, 0.02, 0.1, mat.muc, 0.36, 0.795, -0.16, g);
      var dl = nhom('den_ban', 0.85, 0.785, 0.3, -2.4, g);
      cyl('de', 0.09, 0.1, 0.02, mat.dong, 0, 0.01, 0, dl);
      var t1 = cyl('can', 0.012, 0.012, 0.45, mat.dong, 0, 0.23, 0.04, dl, 8); t1.rotation.x = -0.2;
      var ch = cyl('chup', 0.04, 0.09, 0.12, mat.song, 0, 0.44, 0.13, dl); ch.rotation.x = 0.7;
      if (!may) {
        var st = box('so_tay', 0.22, 0.02, 0.3, mat.dat, -0.55, 0.795, -0.1, g); st.rotation.y = 0.2;
        [0, 1, 2].forEach(function (j) { box('sach_chong_' + j, 0.26 - j * 0.02, 0.05, 0.34 - j * 0.03, [mat.song, mat.ho, mat.tim][j], -0.9, 0.81 + j * 0.05, 0.25, g); });
      }
      cyl('coc_tra', 0.04, 0.035, 0.1, mat.giay, 0.55, 0.835, -0.25, g, 24);
      ghe(g, 0, -0.9, 0);
      va.push([x - 1.25, x + 1.25, z - 1.25, z + 0.62]);
      denTha('den_tha_ban_' + k, x, z, 1.4);
    }
    var BAN = [[-5.2, -2.4], [5.0, -2.4], [-5.0, 1.9], [5.0, 1.9], [-4.2, 5.5]];
    BAN.forEach(function (p, k) { ban(k + 1, p[0], p[1], k === 4); });
    denTha('den_tha_loi_di_1', 0, -2.4, 1.1); denTha('den_tha_loi_di_2', 0, 5.5, 1.1);

    /* máy hát trên bàn Minh — mặt bàn trên ở y = 0,785 */
    var mh = nhom('may_hat', -4.85, 0.785, 5.5);
    box('hop', 0.52, 0.12, 0.42, mat.goToi, 0, 0.06, 0, mh);
    cyl('dia_than', 0.15, 0.15, 0.012, mat.muc, -0.06, 0.126, 0, mh, 48);
    cyl('nhan_dia', 0.05, 0.05, 0.014, mat.dat, -0.06, 0.128, 0, mh);
    var cn = box('can_kim', 0.2, 0.014, 0.022, mat.kim, 0.11, 0.14, -0.06, mh); cn.rotation.y = -0.6;
    var loa = tien('loa_ken', [[0.02, 0], [0.03, 0.08], [0.06, 0.16], [0.14, 0.22], [0.135, 0.225]], mat.dong, mh);
    loa.position.set(0.17, 0.12, 0.1); loa.rotation.z = -0.6;

    /* ---- kệ sách cao kiểu thư viện --------------------------------------- */
    var SACH = [mat.dat, mat.song, mat.ho, mat.la, mat.tim, mat.goToi, mat.tham];
    var KE_CAO = 3.3, DOT = [0.06, 0.7, 1.34, 1.98, 2.62];
    function ke(ten, x, z, ry) {
      var g = nhom(ten, x, 0, z, ry);
      box('lung_ke', 0.03, KE_CAO, 2.6, mat.goToi, -0.2, KE_CAO / 2, 0, g);
      [-1.3, 1.3].forEach(function (a, k) { box('hong_' + k, 0.44, KE_CAO, 0.05, mat.go, 0, KE_CAO / 2, a, g); });
      DOT.concat([3.26]).forEach(function (y, k) { box('dot_' + k, 0.44, 0.04, 2.6, mat.go, 0, y, 0, g); });
      box('dinh_ke', 0.52, 0.1, 2.72, mat.goToi, 0.02, KE_CAO + 0.02, 0, g);
      box('chan_ke', 0.46, 0.08, 2.62, mat.goToi, 0.01, 0.04, 0, g);
      DOT.forEach(function (y0, s) {
        var zz = -1.25;
        while (zz < 1.12) {
          var w = 0.07 + rnd() * 0.09, h = 0.38 + rnd() * 0.18;
          if (rnd() < 0.07) { zz += 0.18; continue; }
          var bk = box('sach', 0.28, h, w, SACH[Math.floor(rnd() * SACH.length)], 0.02, y0 + 0.02 + h / 2, zz + w / 2, g);
          if (zz > 1.0) { bk.rotation.x = -0.22; bk.position.z -= 0.03; }
          zz += w + 0.006;
        }
      });
      va.push(ry ? [x - 0.3, x + 0.6, z - 1.35, z + 1.35] : [x - 0.6, x + 0.3, z - 1.35, z + 1.35]);
      return g;
    }
    [-9, 1, 6].forEach(function (z, k) { ke('ke_trai_' + (k + 1), -R + 0.5, z, 0); });
    [4.5, 8.5].forEach(function (z, k) { ke('ke_phai_' + (k + 1), R - 0.5, z, Math.PI); });
    /* thanh đồng + thang trượt ở kệ trái giữa */
    var ray = cyl('ray_thang', 0.02, 0.02, 9.2, mat.dong, -R + 0.82, 3.0, 3.5, root, 12); ray.rotation.x = Math.PI / 2; ray.name = 'ray_thang';
    var th = nhom('thang_truot', -R + 1.2, 0, 3.8, 0);
    [-0.25, 0.25].forEach(function (s, k) { var c = box('cot_' + k, 0.05, 3.15, 0.06, mat.goToi, 0, 1.55, s, th); c.rotation.z = -0.13; });
    for (var n = 0; n < 9; n++) { var y = 0.3 + n * 0.32; box('bac_thang_' + n, 0.06, 0.03, 0.5, mat.go, 0.2 - y * 0.13, y, 0, th); }
    va.push([-R + 0.9, -R + 1.5, 3.5, 4.1]);

    /* ---- cây góc phòng ---------------------------------------------------- */
    [[-R + 1.8, -S + 1.6], [R - 1.8, -S + 1.6], [-R + 1.8, S - 1.6], [R - 1.8, S - 1.4]].forEach(function (p, k) {
      var g = nhom('cay_' + (k + 1), p[0], 0, p[1]);
      tien('chau', [[0, 0], [0.26, 0], [0.3, 0.05], [0.36, 0.5], [0.39, 0.53], [0.35, 0.53], [0, 0.47]], mat.dat, g);
      cyl('dat_chau', 0.33, 0.33, 0.02, mat.goToi, 0, 0.48, 0, g);
      cyl('than', 0.03, 0.045, 1.0, mat.goToi, 0, 0.95, 0, g, 12);
      [[0, 1.55, 0, 0.42], [0.26, 1.25, 0.1, 0.32], [-0.24, 1.3, -0.12, 0.3], [0.05, 1.85, -0.05, 0.3], [-0.1, 1.05, 0.24, 0.26], [0.2, 1.6, -0.22, 0.26]].forEach(function (a, j) {
        var l = new T.Mesh(new T.IcosahedronGeometry(a[3], 1), mat.la); l.name = 'tan_la_' + j;
        l.position.set(a[0], a[1], a[2]); l.scale.y = 0.82; l.castShadow = true; g.add(l);
      });
      va.push([p[0] - 0.45, p[0] + 0.45, p[1] - 0.45, p[1] + 0.45]);
    });

    /* ---- KHU MỚI: phòng đọc, góc trước bên phải ------------------------------ */
    var pd = nhom('phong_doc', 10.2, 0, 7.6);
    box('tham_vien', 5.4, 0.012, 4.2, mat.tham, 0, 0.028, 0, pd, false);
    box('tham_giua', 4.8, 0.014, 3.6, mat.tham2, 0, 0.032, 0, pd, false);
    box('tham_loi', 3.2, 0.016, 2.0, mat.tham, 0, 0.036, 0, pd, false);
    function ghoBanh(ten, x, z, ry, vl) {
      var g = nhom(ten, x, 0, z, ry, pd);
      [[-0.36, -0.34], [0.36, -0.34], [-0.36, 0.34], [0.36, 0.34]].forEach(function (c, k) { cyl('chan_' + k, 0.03, 0.022, 0.14, mat.goToi, c[0], 0.07, c[1], g, 12); });
      box('de_gho', 0.92, 0.26, 0.86, vl, 0, 0.27, 0, g);
      box('dem', 0.62, 0.12, 0.66, vl, 0, 0.46, 0.06, g);
      box('tua', 0.92, 0.66, 0.2, vl, 0, 0.73, -0.33, g);
      box('goi_tua', 0.56, 0.3, 0.1, mat.tham2, 0, 0.66, -0.2, g);
      [-0.38, 0.38].forEach(function (s, k) { box('tay_' + k, 0.16, 0.36, 0.86, vl, s, 0.56, 0, g); });
    }
    ghoBanh('gho_banh_1', -1.7, 0, Math.PI / 2, mat.da);
    ghoBanh('gho_banh_2', 1.7, 0, -Math.PI / 2, mat.song);
    var bt2 = nhom('ban_tra', 0, 0, 0, 0, pd);
    cyl('mat_ban_tra', 0.55, 0.55, 0.05, mat.goToi, 0, 0.46, 0, bt2, 48);
    cyl('tru', 0.06, 0.08, 0.42, mat.goToi, 0, 0.22, 0, bt2, 24);
    cyl('de_tru', 0.3, 0.32, 0.03, mat.goToi, 0, 0.015, 0, bt2, 32);
    [0, 1].forEach(function (j) { var s = box('sach_ban_tra_' + j, 0.3, 0.05, 0.22, [mat.dat, mat.ho][j], -0.1, 0.51 + j * 0.05, 0.05, bt2); s.rotation.y = j * 0.4; });
    cyl('am_tra', 0.09, 0.1, 0.14, mat.giay, 0.22, 0.555, -0.12, bt2, 24);
    var dd = nhom('den_dung', -2.5, 0, 1.6, 0, pd);
    cyl('de', 0.18, 0.2, 0.03, mat.dong, 0, 0.015, 0, dd);
    cyl('than', 0.018, 0.018, 1.55, mat.dong, 0, 0.8, 0, dd, 12);
    tien('chup', [[0.14, 0], [0.22, -0.3], [0.21, -0.3]], Object.assign(mat.tham2.clone(), { name: 'vai_chup', side: T.DoubleSide }), dd).position.y = 1.85;
    var bd = new T.Mesh(new T.SphereGeometry(0.06, 16, 12), mat.den); bd.name = 'bong'; bd.position.y = 1.62; dd.add(bd);
    den.push({ x: 10.2 - 2.5, y: 1.62, z: 7.6 + 1.6, nho: true });
    va.push([10.2 - 2.25, 10.2 - 1.15, 7.6 - 0.55, 7.6 + 0.55], [10.2 + 1.15, 10.2 + 2.25, 7.6 - 0.55, 7.6 + 0.55],
      [10.2 - 0.6, 10.2 + 0.6, 7.6 - 0.6, 7.6 + 0.6], [7.5, 7.9, 9.0, 9.4]);
    denTha('den_tha_phong_doc', 10.2, 7.8, 1.3);

    return { root: root, va: va, den: den, vat: mat, kich: { R: R, S: S, CAO: CAO } };
  }

  /* ---- người đất sét ------------------------------------------------------ */
  function lamNguoi(T, n) {
    var g = new T.Group(); g.name = 'nguoi_' + (n.id || 'x');
    function M(t, c, r) { var m = new T.MeshStandardMaterial({ color: c, roughness: r || 0.75 }); m.name = t; return m; }
    var da = M('da_' + n.id, n.da), ao = M('ao_' + n.id, n.ao, 0.7), q = M('quan_' + n.id, n.quan, 0.8),
        toc = M('toc_' + n.id, n.toc, 0.85), giay = M('giay_' + n.id, 0x2a2018, 0.6), mat = M('mat_' + n.id, 0x1c1814, 0.4);
    function add(name, geo, m, x, y, z) { var o = new T.Mesh(geo, m); o.name = name; o.position.set(x, y, z); o.castShadow = true; g.add(o); return o; }
    [-0.1, 0.1].forEach(function (s, k) {
      add('giay_' + k, new T.BoxGeometry(0.11, 0.07, 0.24), giay, s, 0.035, 0.03);
      add('chan_' + k, new T.CylinderGeometry(0.07, 0.065, 0.78, 16), q, s, 0.45, 0);
    });
    var than = add('than', new T.LatheGeometry([[0, 0], [0.19, 0], [0.2, 0.1], [0.18, 0.38], [0.21, 0.6], [0.2, 0.72], [0.1, 0.8], [0, 0.82]]
      .map(function (a) { return new T.Vector2(a[0], a[1]); }), 32), ao, 0, 0.8, 0);
    if (n.dai) {
      add('vat_truoc', new T.BoxGeometry(0.34, 0.9, 0.02), ao, 0, 0.5, 0.17).rotation.x = -0.06;
      add('vat_sau', new T.BoxGeometry(0.34, 0.9, 0.02), ao, 0, 0.5, -0.17).rotation.x = 0.06;
    } else {
      add('vat_ao', new T.CylinderGeometry(0.205, 0.215, 0.12, 32), ao, 0, 0.84, 0);
    }
    [-1, 1].forEach(function (s, k) {
      var t = add('tay_' + k, new T.CylinderGeometry(0.055, 0.05, 0.62, 12), ao, s * 0.26, 1.24, 0); t.rotation.z = s * 0.12;
      add('ban_tay_' + k, new T.SphereGeometry(0.055, 16, 12), da, s * 0.3, 0.9, 0);
    });
    add('co', new T.CylinderGeometry(0.055, 0.06, 0.12, 16), da, 0, 1.66, 0);
    add('dau', new T.SphereGeometry(0.19, 32, 24), da, 0, 1.86, 0).scale.y = 1.08;
    add('toc', new T.SphereGeometry(0.205, 32, 24, 0, Math.PI * 2, 0, Math.PI * 0.55), toc, 0, 1.88, -0.015);
    add('toc_sau', new T.SphereGeometry(0.2, 24, 16), toc, 0, 1.84, -0.06).scale.set(1, 1, 0.8);
    if (n.dai) add('toc_dai', new T.CylinderGeometry(0.12, 0.07, 0.62, 16), toc, 0, 1.52, -0.12);
    [-1, 1].forEach(function (s, k) { add('mat_' + k, new T.SphereGeometry(0.022, 10, 8), mat, s * 0.068, 1.88, 0.18); });
    return g;
  }

  window.xayVanPhong = xay;
  window.lamNguoi = lamNguoi;
})();
