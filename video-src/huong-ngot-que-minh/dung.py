"""Sinh index.html (thành phần HyperFrames) cho MV «Hương Ngọt Quê Mình».

Đầu vào: loi_thoi_gian.json (do can_loi.py sinh) và CANH bên dưới.
Chạy:  python3 dung.py && npx hyperframes render -o mv.mp4
"""
import json, html
from PIL import Image

DAI = 438.79            # thời lượng tệp nhạc (ffprobe)
KET = DAI - 9.0         # thẻ ghi nguồn ở 9 giây cuối
CHONG = 1.2             # hai cảnh liền nhau hoà vào nhau bao lâu
dong = json.load(open('loi_thoi_gian.json', encoding='utf-8'))

# Cảnh đổi ở đầu câu lời thứ k (đánh số từ 0 trong loi_thoi_gian.json), hoặc ở giây t.
# Mỗi mục: (mốc, tên ảnh trong assets/anh hoặc 'svg:<id>', hướng trôi).
from canh import CANH

def moc(m):
    return m if isinstance(m, float) else dong[m]['t0'] - 0.6

canh = [(moc(m), a, h) for m, a, h in CANH]
canh.sort(key=lambda c: c[0])

TRUOT = {  # điểm đầu → điểm cuối của chuyển động máy quay chậm (Ken Burns)
    'vao':  ({'scale': 1.0, 'x': 0, 'y': 0},   {'scale': 1.08, 'x': 0, 'y': -10}),
    'ra':   ({'scale': 1.08, 'x': 0, 'y': -10}, {'scale': 1.0, 'x': 0, 'y': 0}),
    'trai': ({'scale': 1.05, 'x': 30, 'y': 0},  {'scale': 1.05, 'x': -30, 'y': 0}),
    'phai': ({'scale': 1.05, 'x': -30, 'y': 0}, {'scale': 1.05, 'x': 30, 'y': 0}),
}

khoi, js = [], []
for i, (t, anh, huong) in enumerate(canh):
    t = max(0.0, t)
    het = canh[i + 1][0] + CHONG if i + 1 < len(canh) else DAI
    d = round(het - t, 3)
    cid = f'k{i}'
    if anh.startswith('svg:'):
        ten = anh[4:]
        noi = open(f'assets/ve/{ten}.svg', encoding='utf-8').read()
        than = f'<div class="ve">{noi}</div>'
    else:
        src = f'assets/anh/{anh}.jpg'
        W0, H0 = Image.open(src).size
        # ảnh nguồn nhỏ (384–688 px): không phóng quá 1,9 lần cho khỏi vỡ
        s = min(740 / H0, 1500 / W0, 1.9)
        w, h = round(W0 * s), round(H0 * s)
        than = (f'<div class="nen" style="background-image:url({src})"></div>'
                f'<div class="khung"><img src="{src}" alt="" style="width:{w}px;height:{h}px" /></div>')
    khoi.append(f'<div id="{cid}" class="clip canh" data-start="{t:.3f}" data-duration="{d}">{than}</div>')
    a, b = TRUOT[huong]
    dich = '.ve' if anh.startswith('svg:') else '.khung'
    js.append(f'tl.fromTo("#{cid} {dich}", {json.dumps(a)}, {{...{json.dumps(b)}, duration: {d}, ease: "none"}}, {t:.3f});')
    if i:
        js.append(f'tl.fromTo("#{cid}", {{opacity: 0}}, {{opacity: 1, duration: {CHONG}, ease: "sine.inOut"}}, {t:.3f});')

# Lời: mỗi câu hiện từ đầu câu tới đầu câu sau (tối đa 9 giây), mờ vào/ra 0,35 giây.
for k, d in enumerate(dong):
    t0 = d['t0'] - 0.25
    nxt = dong[k + 1]['t0'] - 0.3 if k + 1 < len(dong) else d['t1'] + 2
    t1 = min(nxt, t0 + 9, d['t1'] + 2.2)
    dur = round(max(1.2, t1 - t0), 3)
    lop = 'loi ho' if d['loi'].startswith('Hò') else 'loi'
    khoi.append(f'<p id="l{k}" class="clip {lop}" data-start="{t0:.3f}" data-duration="{dur}">{html.escape(d["loi"])}</p>')
    js.append(f'tl.fromTo("#l{k}", {{opacity: 0, y: 14}}, {{opacity: 1, y: 0, duration: .35, ease: "power2.out"}}, {t0:.3f});')
    js.append(f'tl.to("#l{k}", {{opacity: 0, duration: .35}}, {t0 + dur - 0.35:.3f});')

TPL = open('khuon.tpl', encoding='utf-8').read()
out = (TPL.replace('{{DAI}}', f'{DAI}')
          .replace('{{KHOI}}', '\n      '.join(khoi))
          .replace('{{JS}}', '\n      '.join(js))
          .replace('{{KETD}}', f'{DAI - KET:.3f}')
          .replace('{{KET}}', f'{KET:.3f}'))
open('index.html', 'w', encoding='utf-8').write(out)
print(len(canh), 'cảnh,', len(dong), 'câu lời')
