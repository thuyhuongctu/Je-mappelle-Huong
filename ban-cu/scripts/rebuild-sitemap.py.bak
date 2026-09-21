#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""rebuild-sitemap.py — tự động tạo lại sitemap.xml từ cấu trúc thực tế của website.

Dùng khi có bài viết blog mới hoặc trang mới, thay vì sửa sitemap.xml thủ công.

Cách dùng:
    python3 scripts/rebuild-sitemap.py                 # chế độ xem trước (không ghi file)
    python3 scripts/rebuild-sitemap.py --apply         # ghi sitemap.xml
    python3 scripts/rebuild-sitemap.py --apply --commit  # ghi file + commit + push

Nguồn dữ liệu:
- blog.html   : dò mọi <article class="post ...">, lấy ngày đăng từ .post-meta
                (định dạng «DD · MM · YYYY») làm lastmod; slug sinh từ tên bài
                Việt ở .post-title.
- trang viên 3D (trangvien.html), music.html, songbook.html : ngày sửa đổi của file.
- index.html  : luôn ưu tiên lastmod mới nhất của toàn bộ các trang HTML.

URL dùng tiền tố công khai https://thuyhuongctu.github.io/JESUISHUONG_WEBSITE_2026/.
"""
from __future__ import annotations

import argparse
import os
import re
import subprocess
import sys
from datetime import date, datetime

REPO = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
BASE_URL = 'https://thuyhuongctu.github.io/JESUISHUONG_WEBSITE_2026'

# ---------- đọc cấu trúc bài viết từ blog.html ----------
POST_PATTERN = re.compile(
    r'<article class="post[ a-z]*">.*?'
    r'<div class="post-meta">(\d{2}) \u00b7 (\d{2}) \u00b7 (\d{4}) \u00b7 .*?</div>.*?'
    r'<h2 class="post-title">\s*<span class="lang-vi">(.*?)</span>',
    re.S | re.DOTALL,
)


def slugify(text: str) -> str:
    """Tạo slug URL thân thiện từ tiêu đề bài viết tiếng Việt."""
    t = re.sub(r'\s*<[^>]+>', '', text)  # bỏ thẻ trong lang-vi
    t = t.strip()
    t = t.lower()
    t = t.replace('đ', 'd').replace('Đ', 'd')
    # chuẩn hóa dấu thanh tiếng Việt
    import unicodedata
    t = unicodedata.normalize('NFD', t)
    t = ''.join(ch for ch in t if unicodedata.category(ch) != 'Mn')
    t = re.sub(r'[^a-z0-9]+', '-', t)
    t = t.strip('-')
    return t


def scan_blog() -> list[dict]:
    path = os.path.join(REPO, 'blog.html')
    html = open(path, encoding='utf-8').read()
    posts = []
    for m in POST_PATTERN.finditer(html):
        dd, mm, yyyy, title = m.group(1), m.group(2), m.group(3), m.group(4)
        posts.append({
            'url': f'{BASE_URL}/blog.html',
            'lastmod': f'{yyyy}-{mm}-{dd}',
            'title': title.strip(),
            'slug': slugify(title),
            'priority': '0.8' if 'featured' in m.group(0) else '0.7',
        })
    return posts


def file_lastmod(filename: str) -> str:
    """Ngày sửa đổi cuối (git log nếu có, ngược lại mtime)."""
    p = os.path.join(REPO, filename)
    if os.path.exists(p):
        try:
            out = subprocess.run(
                ['git', 'log', '-1', '--format=%ad', '--date=short', '--', filename],
                cwd=REPO, capture_output=True, text=True, check=True,
            ).stdout.strip()
            if re.fullmatch(r'\d{4}-\d{2}-\d{2}', out):
                return out
        except Exception:
            pass
    return date.fromtimestamp(os.path.getmtime(p)).isoformat()


# ---------- xây sitemap ----------
PAGE_CONF = [
    # (url_tail, lastmod_override_file, priority, changefreq)
    ('/', 'index.html', '1.0', 'weekly'),
    ('/blog.html', 'blog.html', '0.9', 'weekly'),
    ('/music.html', 'music.html', '0.7', 'monthly'),
    ('/songbook.html', 'songbook.html', '0.6', 'monthly'),
    ('/trangvien.html', 'trangvien.html', '0.5', 'monthly'),
]


def build_xml(posts: list[dict], dry: bool) -> str:
    lines = [
        '<?xml version="1.0" encoding="UTF-8"?>',
        '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    ]
    # trang tĩnh
    for tail, lm_file, prio, freq in PAGE_CONF:
        lm = file_lastmod(lm_file) if lm_file else date.today().isoformat()
        lines += [
            '  <url>',
            f'    <loc>{BASE_URL}{tail}</loc>',
            f'    <lastmod>{lm}</lastmod>',
            f'    <priority>{prio}</priority>',
            f'    <changefreq>{freq}</changefreq>',
            '  </url>',
        ]
    # URL bài blog — theo cấu trúc neo #slug trên blog.html
    seen = set()
    for p in posts:
        key = (p['url'], p['lastmod'], p['slug'])
        if key in seen:
            continue
        seen.add(key)
        lines += [
            '  <url>',
            f'    <loc>{p["url"]}#{p["slug"]}</loc>',
            f'    <lastmod>{p["lastmod"]}</lastmod>',
            f'    <priority>{p["priority"]}</priority>',
            f'    <changefreq>yearly</changefreq>',
            f'    <!-- {p["title"][:80]} -->',
            '  </url>',
        ]
    lines.append('</urlset>')
    lines.append('')
    return '\n'.join(lines)


def main() -> int:
    ap = argparse.ArgumentParser(description=__doc__)
    ap.add_argument('--apply', action='store_true', help='Ghi sitemap.xml thay vì xem trước')
    ap.add_argument('--commit', action='store_true', help='Commit + push sau khi ghi')
    args = ap.parse_args()

    posts = scan_blog()
    if not posts:
        print('LỖI: không dò được bài viết nào trong blog.html — kiểm tra mẫu .post-meta/.post-title.', file=sys.stderr)
        return 1

    xml = build_xml(posts, not args.apply)

    # in thông tin cho cả hai chế độ
    print(f'Đã dò {len(posts)} bài viết trong blog.html')
    for p in posts[:8]:
        print(f'  {p["lastmod"]}  {p["title"][:50]:50s}  #{p["slug"]}')

    out = os.path.join(REPO, 'sitemap.xml')
    if args.apply:
        open(out, 'w', encoding='utf-8').write(xml)
        print(f'Đã ghi {out}')
        if args.commit:
            subprocess.run(['git', 'add', 'sitemap.xml'], cwd=REPO, check=True)
            subprocess.run([
                'git', 'commit', '-m',
                'SEO: cập nhật sitemap.xml tự động từ blog.html (rebuild-sitemap.py)',
            ], cwd=REPO, check=True)
            subprocess.run(['git', 'push', 'origin', 'HEAD'], cwd=REPO, check=True)
            print('Đã commit + push.')
    else:
        print('\n--- Xem trước (chạy --apply để ghi file) ---')
        print(xml)
    return 0


if __name__ == '__main__':
    sys.exit(main())
