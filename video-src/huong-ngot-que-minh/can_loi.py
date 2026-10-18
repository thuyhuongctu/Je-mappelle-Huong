"""Khớp từng câu lời (loi.txt, lấy từ thẻ ID3 của tệp nhạc) với mốc thời gian của Whisper.

Whisper nghe sai nhiều chữ (sầu riêng → sâu riêng, phù sa → phù xa) nên không dùng
chữ của nó; chỉ dùng mốc thời gian. Mỗi câu lời tìm cửa sổ từ khớp nhất, đi tới trước
theo thứ tự (điệp khúc lặp ba lần vẫn rơi đúng chỗ). Câu khớp kém thì nội suy.
"""
import json, re, sys, unicodedata, difflib

def bo_dau(s):
    s = unicodedata.normalize('NFD', s.lower()).replace('đ', 'd')
    s = ''.join(c for c in s if unicodedata.category(c) != 'Mn')
    return re.sub(r'[^a-z ]', ' ', s).split()

asr = json.load(open(sys.argv[1]))
tu = [(w[0], w[1], bo_dau(w[2])) for s in asr for w in s['words']]
tu = [(a, b, t[0]) for a, b, t in tu if t]

dong, muc = [], None
for l in open('loi.txt', encoding='utf-8'):
    l = l.strip()
    if not l: continue
    if l.startswith('['):
        muc = l.strip('[]'); continue
    dong.append({'muc': muc, 'loi': l})

# Quy hoạch động: mỗi câu chọn một cửa sổ (hoặc bỏ trống), vị trí tăng dần, tổng điểm lớn nhất.
# Cách tham lam cũ «tìm 400 từ kế tiếp» đã hỏng: câu điệp khúc bắt nhầm lần lặp sau, nhảy
# qua nguyên Đoạn 2. Tối ưu trên cả bài thì không câu nào cướp chỗ của câu khác được.
K = 12
ung = []
for d in dong:
    q = bo_dau(d['loi']); n = len(q); c = []
    if n >= 3:
        for i in range(len(tu) - 1):
            r = difflib.SequenceMatcher(None, q, [t[2] for t in tu[i:i + n]]).ratio()
            if r >= 0.45: c.append((r, i, n))
        c = sorted(c, reverse=True)[:K]
    ung.append(c)
NEG = -1e9
# trạng thái: (điểm, vị trí kết thúc cuối cùng đã dùng, truy vết)
best = [(0.0, -1, [])]
for k, c in enumerate(ung):
    moi = []
    for sc, end, tr in best:
        moi.append((sc, end, tr + [None]))
        for r, i, n in c:
            if i > end:
                moi.append((sc + r, i + n - 2, tr + [(r, i, n)]))
    # giữ trạng thái trội: với mỗi mức «end», chỉ giữ điểm cao nhất; cắt còn 300
    moi.sort(key=lambda x: (x[1], -x[0]))
    gon, top = [], NEG
    for x in moi:
        if x[0] > top: gon.append(x); top = x[0]
    best = sorted(gon, key=lambda x: -x[0])[:300]
_, _, tr = max(best, key=lambda x: x[0])
for d, ch in zip(dong, tr):
    if ch:
        r, i, n = ch
        d['t0'] = tu[i][0]; d['t1'] = tu[min(i + n, len(tu)) - 1][1]; d['khop'] = round(r, 2)
    else:
        d['t0'] = None; d['khop'] = 0.0

# nội suy câu không khớp (thường là «Hò… ơ…» và đoạn Whisper bỏ sót)
for k, d in enumerate(dong):
    if d['t0'] is None:
        a = next((dong[j] for j in range(k - 1, -1, -1) if dong[j]['t0'] is not None), None)
        b = next((dong[j] for j in range(k + 1, len(dong)) if dong[j]['t0'] is not None), None)
        ka = dong.index(a) if a else -1; kb = dong.index(b) if b else len(dong)
        ta = a['t1'] if a else 0.0; tb = b['t0'] if b else ta + 4
        step = (tb - ta) / (kb - ka)
        d['t0'] = ta + step * (k - ka - 1) + 0.2; d['t1'] = d['t0'] + step - 0.4; d['noisuy'] = True
# Sửa tay, có lý do:
# - Câu 6–9 (bốn câu đầu Đoạn 1): Whisper nghe khúc 39,0–58,4 s thành lặp lại câu hò mở
#   đầu, nên không có mốc. Bốn câu ấy nằm giữa hết dạo đàn (~39 s) và câu 10 (60,5 s):
#   chia đều 5,4 s mỗi câu.
# - Câu 15 là lần lặp «Em ơi, con nước xuôi dòng»; Whisper chỉ nghe một lần (83,2–94,1 s
#   cho cả hai câu 14 và 16), nên không hiện câu lặp lần thứ hai.
for k, t in zip((6, 7, 8, 9), (39.0, 44.4, 49.8, 55.2)):
    dong[k].update(t0=t, t1=t + 5.0, noisuy='sua-tay')
dong[15]['an'] = True
dong = [d for d in dong if not d.get('an')]
json.dump(dong, open('loi_thoi_gian.json', 'w'), ensure_ascii=False, indent=1)
for d in dong:
    print(f"{d['t0']:6.1f} {d['khop']:.2f}{' *' if d.get('noisuy') else '  '} [{d['muc'][:14]:14}] {d['loi']}")
