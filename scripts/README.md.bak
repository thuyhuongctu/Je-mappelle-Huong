# Scripts hỗ trợ quản trị website

## rebuild-sitemap.py — cập nhật sitemap.xml tự động

Sinh lại `sitemap.xml` từ cấu trúc thực tế của website, tự động thêm URL cho
mỗi bài viết blog mới phát hiện trong `blog.html`.

### Nguồn dữ liệu

| Nguồn | Vai trò |
|---|---|
| `blog.html` — các `<article class="post">` | Lấy ngày đăng từ `.post-meta` (`DD · MM · YYYY`) làm `lastmod`; tiêu đề Việt trong `.post-title` chuyển thành slug URL thân thiện, gắn làm neo `#slug` trên `blog.html`. |
| Các trang tĩnh (`index.html`, `blog.html`, `music.html`, `songbook.html`, `trangvien.html`) | `lastmod` lấy từ git history hoặc thời gian sửa file; độ ưu tiên và tần suất thay đổi cố định. |

Slug sinh tự động từ tiêu đề tiếng Việt (bỏ dấu, nối bằng gạch ngang),
ví dụ «EnQuiz tăng tốc: 52 lượt xem sau ba ngày…» thành
`#enquiz-tang-toc-52-luot-xem-sau-ba-ngay-phien-ban-12-vua-phat-hanh`.

### Cách dùng

```bash
# Xem trước (không ghi file)
python3 scripts/rebuild-sitemap.py

# Ghi sitemap.xml
python3 scripts/rebuild-sitemap.py --apply

# Ghi file + commit + push (từ thư mục gốc repo)
python3 scripts/rebuild-sitemap.py --apply --commit
```

### Quy trình gợi ý khi đăng bài mới

1. Viết bài trong `blog.html` theo mẫu sẵn (thẻ `<article class="post">` + `.post-meta` + `.post-title`).
2. Chạy `python3 scripts/rebuild-sitemap.py --apply --commit` từ thư mục repo.
3. Script tự động thêm URL của bài mới vào sitemap, cập nhật `lastmod` và phát hành.

### Kiểm thử

Sau khi chạy, sitemap sinh ra phải hợp lệ XML và Google Search Console
còn chấp nhận tại `…/sitemap.xml`. Để đối chiếu:

```bash
python3 -c "import xml.etree.ElementTree as t; t.parse('sitemap.xml'); print('XML hợp lệ')"
curl -s https://thuyhuongctu.github.io/JESUISHUONG_WEBSITE_2026/sitemap.xml | head -20
```
