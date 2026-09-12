#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""check-site.py — kiểm tra tính toàn vẹn của website tĩnh trước khi đẩy lên.

Ba lỗi từng xảy ra trong repo này đều âm thầm, không có thông báo nào:

1. sw.js liệt kê một tệp không tồn tại trong danh sách CORE. cache.addAll()
   thất bại nguyên khối, nên PWA offline không cài được — mà trang vẫn chạy
   bình thường khi có mạng, nên không ai thấy.
2. sitemap.xml được sửa tay trong khi scripts/rebuild-sitemap.py ghi đè toàn
   bộ tệp này từ PAGE_CONF. Thay đổi tay biến mất ở lần chạy workflow kế tiếp.
3. Liên kết nội bộ trỏ tới tệp đã đổi tên, hoặc tới #neo không còn tồn tại.

Cách dùng:
    python3 scripts/check-site.py        # in kết quả, trả mã 1 nếu có lỗi
"""
from __future__ import annotations

import os
import re
import subprocess
import sys

REPO = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
# GitHub Pages phục vụ site dưới tiền tố này, nên đường dẫn tuyệt đối
# kiểu /Je-mappelle-Huong/blog.html là hợp lệ và phải quy về gốc repo.
BASE_PATH = '/Je-mappelle-Huong/'
PAGES = ['index.html', 'garden.html', 'publications.html', 'cv.html',
         'blog.html', 'music.html', 'songbook.html', 'quan-ly-songbook.html',
         'journey.html', 'audio.html', 'trangvien.html', '404.html']
SKIP_SCHEMES = ('http://', 'https://', 'mailto:', 'tel:', 'data:', 'javascript:', '//')

_ids: dict[str, set[str]] = {}


def ids_of(page: str) -> set[str]:
    if page not in _ids:
        html = open(os.path.join(REPO, page), encoding='utf-8').read()
        _ids[page] = set(re.findall(r'\bid="([^"]+)"', html))
    return _ids[page]


def check_service_worker() -> list[str]:
    """Mọi mục trong CORE phải tồn tại, nếu không addAll() hỏng toàn bộ cache."""
    sw = open(os.path.join(REPO, 'sw.js'), encoding='utf-8').read()
    block = sw[sw.index('const CORE'):sw.index('];', sw.index('const CORE'))]
    errors = []
    count = 0
    for entry in re.findall(r"'([^']+)'", block):
        if entry == './':
            continue
        count += 1
        if not os.path.exists(os.path.join(REPO, entry)):
            errors.append(f'sw.js: CORE tro toi tep khong ton tai — {entry}')
    print(f'  sw.js: {count} muc CORE' + ('' if errors else ' — tat ca deu ton tai'))
    return errors


def check_sitemap() -> list[str]:
    """sitemap.xml phải trùng khít với thứ rebuild-sitemap.py sinh ra."""
    path = os.path.join(REPO, 'sitemap.xml')
    before = open(path, encoding='utf-8').read()
    r = subprocess.run([sys.executable, 'scripts/rebuild-sitemap.py', '--apply'],
                       cwd=REPO, capture_output=True, text=True)
    if r.returncode:
        return [f'rebuild-sitemap.py that bai: {r.stderr.strip()[:200]}']
    after = open(path, encoding='utf-8').read()
    if before != after:
        open(path, 'w', encoding='utf-8').write(before)  # tra lai nguyen trang
        return ['sitemap.xml khac voi ket qua cua rebuild-sitemap.py — '
                'chay "python3 scripts/rebuild-sitemap.py --apply" va commit, '
                'hoac them trang moi vao PAGE_CONF trong script do']
    print('  sitemap.xml: trung khop voi rebuild-sitemap.py')
    return []


def check_links() -> list[str]:
    """Mọi liên kết nội bộ và mọi #neo phải giải được."""
    errors = []
    checked = 0
    for page in PAGES:
        if not os.path.exists(os.path.join(REPO, page)):
            errors.append(f'thieu trang: {page}')
            continue
        html = open(os.path.join(REPO, page), encoding='utf-8').read()
        hrefs = set(re.findall(r'href="([^"]{0,300})"', html))
        hrefs |= set(re.findall(r"location\.href\s*=\s*'([^']{0,300})'", html))
        for href in hrefs:
            if href.startswith(SKIP_SCHEMES) or not href:
                continue
            target, _, frag = href.partition('#')
            if target.startswith(BASE_PATH):
                target = target[len(BASE_PATH):]
            elif target.startswith('/'):
                errors.append(f'{page}: duong dan tuyet doi khong co tien to '
                              f'{BASE_PATH} — {href}')
                continue
            target = target or page
            if target in ('./', '.', ''):
                target = 'index.html'
            checked += 1
            if not os.path.exists(os.path.join(REPO, target)):
                errors.append(f'{page}: lien ket toi tep khong ton tai — {href}')
            elif frag and target.endswith('.html') and frag not in ids_of(target):
                errors.append(f'{page}: neo khong ton tai — {href}')
    print(f'  lien ket noi bo: da kiem tra {checked} duong dan tren {len(PAGES)} trang')
    return errors


def main() -> int:
    print('Kiem tra website tinh:')
    errors = check_service_worker() + check_sitemap() + check_links()
    if errors:
        print(f'\nPhat hien {len(errors)} loi:', file=sys.stderr)
        for e in errors:
            print(f'  - {e}', file=sys.stderr)
        return 1
    print('\nTat ca deu dat.')
    return 0


if __name__ == '__main__':
    raise SystemExit(main())
