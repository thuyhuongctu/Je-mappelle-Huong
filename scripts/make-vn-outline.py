#!/usr/bin/env python3
"""Sinh đường viền Việt Nam dùng cho hình chìm ở chân trang và khối đất sét 3D.

Nguồn: Natural Earth 1:10m Admin 0 Countries (public domain / CC0).
    https://github.com/nvkelso/natural-earth-vector

Chạy:  python3 scripts/make-vn-outline.py <ne_10m_admin_0_countries.geojson>

Nét vẽ đặt sẵn cho cỡ hiển thị khoảng 130 px cao (hình chìm ở chân trang):
ở cỡ đó nét ra đúng hơn 1 px. Dùng to hơn nhiều thì nét sẽ dày.

Sinh ra hai tệp, cùng một hình dạng nên bản đồ chìm và khối đất sét khớp nhau:
    assets/img/vn-outline.svg   — hình chìm (nét mảnh, currentColor)
    assets/js/vn-shape.js       — toạ độ cho ThreeJS đùn khối đất sey

Quần đảo Hoàng Sa và Trường Sa được vẽ thành chùm điểm nhỏ, theo đúng cách
bản đồ thương hiệu của trang M-AIDA đã dùng; toạ độ lấy từ vị trí địa lý thật
chứ không đặt ước lệ.
"""
import json
import math
import sys

# Hộp nhìn của SVG: giữ tỉ lệ cao/rộng tự nhiên của Mercator.
W = 1000.0

# Chùm điểm quần đảo: (kinh độ, vĩ độ, bán kính điểm tương đối)
QUAN_DAO = [
    # Hoàng Sa
    (111.6, 16.5, 1.0), (112.3, 16.2, .8), (112.0, 15.8, .7), (111.2, 16.0, .7),
    # Trường Sa
    (114.3, 10.4, 1.0), (115.0, 9.7, .8), (113.9, 9.6, .7), (114.6, 8.9, .7),
    (112.9, 8.7, .6), (115.8, 10.0, .6), (113.3, 9.9, .6),
]


def mercator(lon, lat):
    """Chiếu Mercator, trả về toạ độ chưa chuẩn hoá."""
    x = math.radians(lon)
    y = math.log(math.tan(math.pi / 4 + math.radians(lat) / 2))
    return x, y


def rdp(pts, eps):
    """Đơn giản hoá đường bằng Ramer–Douglas–Peucker."""
    if len(pts) < 3:
        return pts
    x1, y1 = pts[0]
    x2, y2 = pts[-1]
    dx, dy = x2 - x1, y2 - y1
    norm = math.hypot(dx, dy)
    xa = 0.0
    imax = 0
    for i in range(1, len(pts) - 1):
        x0, y0 = pts[i]
        d = abs(dy * x0 - dx * y0 + x2 * y1 - y2 * x1) / norm if norm else math.hypot(x0 - x1, y0 - y1)
        if d > xa:
            xa, imax = d, i
    if xa <= eps:
        return [pts[0], pts[-1]]
    return rdp(pts[:imax + 1], eps)[:-1] + rdp(pts[imax:], eps)


def main():
    if len(sys.argv) < 2:
        sys.exit(__doc__)
    data = json.load(open(sys.argv[1], encoding='utf-8'))
    feat = next(f for f in data['features']
                if (f['properties'].get('ADM0_A3') or f['properties'].get('ISO_A3')) == 'VNM')
    geom = feat['geometry']
    rings = ([p[0] for p in geom['coordinates']] if geom['type'] == 'MultiPolygon'
             else list(geom['coordinates']))
    rings.sort(key=len, reverse=True)

    # Đất liền là vòng lớn nhất; giữ thêm vài đảo lớn nhất để bờ biển không trống.
    dat_lien = rings[0]
    dao = [r for r in rings[1:] if len(r) >= 33][:6]

    def chieu(ring):
        return [mercator(lon, lat) for lon, lat in ring]

    mer = [chieu(dat_lien)] + [chieu(r) for r in dao]
    diem_dao = [mercator(lon, lat) + (r,) for lon, lat, r in QUAN_DAO]

    # Khung nhìn tính trên đất liền và đảo, KHÔNG tính chùm quần đảo, để hình
    # không bị kéo lệch sang phải; chùm điểm vẫn vẽ đúng chỗ của nó.
    xs = [p[0] for ring in mer for p in ring]
    ys = [p[1] for ring in mer for p in ring]
    x0, x1 = min(xs), max(xs)
    y0, y1 = min(ys), max(ys)
    # Chừa lề phải cho quần đảo.
    x1 = max(x1, max(p[0] for p in diem_dao))
    s = W / (x1 - x0)
    H = (y1 - y0) * s

    def dat(p):
        return ((p[0] - x0) * s, H - (p[1] - y0) * s)

    # Sai số tính bằng đơn vị SVG (điểm đã được chiếu và chuẩn hoá).
    eps = 1.9
    duong = []
    toado3d = []
    for i, ring in enumerate(mer):
        pts = [dat(p) for p in ring]
        pts = rdp(pts, eps if i == 0 else eps * .8)
        if pts[0] != pts[-1]:
            pts.append(pts[0])
        duong.append(pts)
        toado3d.append([[round(x, 1), round(y, 1)] for x, y in pts])

    def d_attr(pts):
        head = 'M%.1f %.1f' % pts[0]
        return head + ''.join('L%.1f %.1f' % p for p in pts[1:]) + 'Z'

    paths = '\n  '.join('<path d="%s"/>' % d_attr(p) for p in duong)
    dots = '\n  '.join(
        '<circle cx="%.1f" cy="%.1f" r="%.1f"/>' % (dat(p)[0], dat(p)[1], 5.5 + 5.5 * p[2])
        for p in diem_dao)

    svg = (
        '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 %.0f %.0f" '
        'width="%.0f" height="%.0f" role="img" aria-label="Outline map of Vietnam" '
        'fill="none" stroke="currentColor" stroke-width="10" '
        'stroke-linejoin="round" stroke-linecap="round">\n'
        '  <!-- Duong vien: Natural Earth 1:10m Admin 0 Countries (public domain).\n'
        '       Sinh boi scripts/make-vn-outline.py - khong sua tay. -->\n'
        '  %s\n'
        '  <g fill="currentColor" stroke="none">\n  %s\n  </g>\n'
        '</svg>\n' % (W, H, W, H, paths, dots))
    open('assets/img/vn-outline.svg', 'w', encoding='utf-8').write(svg)

    js = (
        '/* Toa do duong vien Viet Nam cho khoi dat set 3D o hero trang chu.\n'
        '   Sinh boi scripts/make-vn-outline.py tu Natural Earth 1:10m (public domain).\n'
        '   Cung mot hinh voi assets/img/vn-outline.svg, he toa do 0..%.0f x 0..%.0f. */\n'
        'window.VN_SHAPE = {w: %.0f, h: %.0f, rings: %s};\n'
        % (W, H, W, H, json.dumps(toado3d, separators=(',', ':'))))
    open('assets/js/vn-shape.js', 'w', encoding='utf-8').write(js)

    print('viewBox 0 0 %.0f %.0f' % (W, H))
    print('dat lien: %d diem (tu %d)' % (len(duong[0]), len(dat_lien)))
    print('dao giu lai: %d' % len(dao))
    print('svg: %d byte | js: %d byte' % (len(svg), len(js)))


if __name__ == '__main__':
    main()
