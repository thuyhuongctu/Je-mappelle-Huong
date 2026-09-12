#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""check-site.py — kiểm tra tính toàn vẹn của website tĩnh trước khi đẩy lên.

Ba lỗi từng xảy ra trong repo này đều âm thầm, không có thông báo nào:

1. sw.js liệt kê một tệp không tồn tại trong danh sách CORE. cache.addAll()
   thất bại nguyên khối, nên PWA offline không cài được — mà trang vẫn chạy
   bình thường khi có mạng, nên không ai thấy.
2. sitemap.xml thiếu trang, hoặc được thêm URL bằng tay, trong khi
   scripts/rebuild-sitemap.py ghi đè toàn bộ tệp này từ PAGE_CONF — nên
   thay đổi tay biến mất ở lần chạy workflow kế tiếp. (Chỉ đối chiếu tập
   URL; ngày <lastmod> đổi theo mỗi commit nên không so.)
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
SKIP_SCHEMES = ('http://', 'https://', 'mailto:', 'tel:', 'data:', 'javascript:', '//')
# Thư mục không được GitHub Pages phục vụ như trang thật.
SKIP_DIRS = {'.git', 'node_modules', '__pycache__'}

# Cả hai kiểu nháy đều hợp lệ trong HTML; chỉ bắt nháy kép sẽ bỏ sót liên kết
# và tạo báo động giả về neo không tồn tại.
RE_ID = re.compile(r'''\bid\s*=\s*["\']([^"\']+)["\']''')
RE_HREF = re.compile(r'''\bhref\s*=\s*["\']([^"\']{0,300})["\']''')
RE_JS_HREF = re.compile(r'''location\.href\s*=\s*["\']([^"\']{0,300})["\']''')


def deployed_pages() -> list[str]:
    """Mọi tệp .html được GitHub Pages phục vụ, kể cả trong thư mục con.

    Pages tải lên toàn bộ thư mục gốc, nên trang lồng như
    design-demos/*.html cũng nằm trên site thật và cũng có liên kết nội bộ.
    """
    out = []
    for folder, dirs, files in os.walk(REPO):
        dirs[:] = [d for d in dirs if d not in SKIP_DIRS and not d.startswith('.')]
        for f in files:
            if f.endswith('.html') and not f.endswith('.bak'):
                out.append(os.path.relpath(os.path.join(folder, f), REPO))
    return sorted(out)


_ids: dict[str, set[str]] = {}


def ids_of(page: str) -> set[str]:
    """Tập id khai báo trong một trang, dùng để kiểm tra neo #."""
    if page not in _ids:
        html = open(os.path.join(REPO, page), encoding='utf-8').read()
        _ids[page] = set(RE_ID.findall(html))
    return _ids[page]


def check_service_worker() -> list[str]:
    """Mọi mục trong danh sách CORE của sw.js phải tồn tại trên đĩa.

    cache.addAll() từ chối nguyên khối: chỉ một tệp thiếu là toàn bộ cache
    offline không cài được, trong khi trang vẫn chạy bình thường khi có mạng.
    """
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
    """sitemap.xml phải chứa đúng tập URL mà rebuild-sitemap.py sinh ra.

    Chỉ so sánh *tập URL*, không so sánh cả tệp: trường <lastmod> lấy từ ngày
    commit của từng trang nên đổi theo mỗi lần sửa nội dung, và workflow
    update-sitemap.yml tự sinh lại nó. So cả tệp sẽ khiến một lần sửa lỗi
    chính tả trong songbook.html cũng làm CI đỏ — báo động giả kiểu đó chỉ
    dạy người ta phớt lờ CI.

    Tập URL mới là thứ mã hóa lỗi thật: thêm trang mà quên PAGE_CONF, hoặc
    thêm URL bằng tay vào sitemap.xml (sẽ bị workflow xóa ở lần chạy sau).
    """
    import importlib.util

    sys.dont_write_bytecode = True   # khong de lai scripts/__pycache__

    spec = importlib.util.spec_from_file_location(
        'rebuild_sitemap', os.path.join(REPO, 'scripts', 'rebuild-sitemap.py'))
    if spec is None or spec.loader is None:
        return ['khong nap duoc scripts/rebuild-sitemap.py']
    mod = importlib.util.module_from_spec(spec)
    try:
        spec.loader.exec_module(mod)          # chi nap ham, khong ghi tep nao
        expected_xml = mod.build_xml(mod.scan_blog(), True)
    except Exception as exc:                  # noqa: BLE001
        return [f'rebuild-sitemap.py loi khi sinh sitemap: {exc}']

    loc = re.compile(r'<loc>([^<]+)</loc>')
    expected = set(loc.findall(expected_xml))
    actual = set(loc.findall(open(os.path.join(REPO, 'sitemap.xml'), encoding='utf-8').read()))

    errors = []
    for url in sorted(expected - actual):
        errors.append(f'sitemap.xml: thieu URL ma generator sinh ra — {url} '
                      '(chay "python3 scripts/rebuild-sitemap.py --apply")')
    for url in sorted(actual - expected):
        errors.append(f'sitemap.xml: co URL generator khong sinh — {url} '
                      '(them trang do vao PAGE_CONF trong rebuild-sitemap.py, '
                      'neu khong no se bi xoa o lan chay workflow ke tiep)')
    if not errors:
        print(f'  sitemap.xml: {len(actual)} URL, trung khop voi rebuild-sitemap.py')
    return errors


def check_links() -> list[str]:
    """Mọi liên kết nội bộ và mọi neo # phải giải được.

    Liên kết được phân giải tương đối với trang chứa nó, nên trang trong thư
    mục con cũng được kiểm tra đúng như khi trình duyệt mở nó.
    """
    errors = []
    pages = deployed_pages()
    checked = 0
    for page in pages:
        html = open(os.path.join(REPO, page), encoding='utf-8').read()
        base = os.path.dirname(page)
        hrefs = set(RE_HREF.findall(html)) | set(RE_JS_HREF.findall(html))
        for href in hrefs:
            if href.startswith(SKIP_SCHEMES) or not href:
                continue
            raw, _, frag = href.partition('#')
            if not raw:
                target = page                      # "#neo" tro chinh trang do
            else:
                if raw.startswith(BASE_PATH):
                    target = raw[len(BASE_PATH):]
                elif raw.startswith('/'):
                    errors.append(f'{page}: duong dan tuyet doi khong co tien to '
                                  f'{BASE_PATH} — {href}')
                    continue
                else:
                    target = os.path.normpath(os.path.join(base, raw))
                # "./", "thu-muc/" hay tien to Pages tran tro toi trang chi muc
                # cua thu muc do, khong phai trang hien tai
                if not target or raw.endswith('/') or target in ('.', './'):
                    target = os.path.normpath(os.path.join(target or '.', 'index.html'))
            checked += 1
            if not os.path.exists(os.path.join(REPO, target)):
                errors.append(f'{page}: lien ket toi tep khong ton tai — {href}')
            elif frag and target.endswith('.html') and frag not in ids_of(target):
                errors.append(f'{page}: neo khong ton tai — {href}')
    print(f'  lien ket noi bo: da kiem tra {checked} duong dan tren {len(pages)} trang')
    return errors


def main() -> int:
    """Chạy cả ba phép kiểm tra, in kết quả, trả 0 nếu đạt và 1 nếu có lỗi."""
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
