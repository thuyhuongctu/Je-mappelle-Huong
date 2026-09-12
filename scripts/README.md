# Scripts hỗ trợ quản trị website

## rebuild-sitemap.py — cập nhật sitemap.xml tự động

Sinh lại `sitemap.xml` từ cấu trúc thực tế của website, tự động thêm URL cho
mỗi bài viết blog mới phát hiện trong `blog.html`.

### Nguồn dữ liệu

| Nguồn | Vai trò |
|---|---|
| `blog.html` — các `<article class="post">` | Lấy ngày đăng từ `.post-meta` (`DD · MM · YYYY`) làm `lastmod`; tiêu đề Việt trong `.post-title` chuyển thành slug URL thân thiện, gắn làm neo `#slug` trên `blog.html`. |
| Các trang tĩnh (`index.html`, `publications.html`, `cv.html`, `blog.html`, `garden.html`, `music.html`, `songbook.html`, `trangvien.html`) | `lastmod` lấy từ git history hoặc thời gian sửa file; độ ưu tiên và tần suất thay đổi cố định. |

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
curl -s https://thuyhuongctu.github.io/Je-mappelle-Huong/sitemap.xml | head -20
```

> **Lưu ý:** script ghi đè **toàn bộ** `sitemap.xml` từ danh sách `PAGE_CONF`
> bên trong nó. Đừng sửa `sitemap.xml` bằng tay — thêm trang mới vào
> `PAGE_CONF` rồi chạy lại, nếu không thay đổi sẽ biến mất ở lần workflow
> `update-sitemap.yml` chạy kế tiếp.

## check-site.py — kiểm tra toàn vẹn trước khi đẩy

Bắt ba lỗi từng xảy ra trong repo này, cả ba đều âm thầm — trang vẫn hiển thị
bình thường nên không ai phát hiện:

| Kiểm tra | Lỗi nó bắt được |
|---|---|
| Danh sách `CORE` trong `sw.js` | Một mục trỏ tới tệp không tồn tại. `cache.addAll()` hỏng nguyên khối, nên **PWA offline không cài được** — nhưng khi có mạng trang vẫn chạy y hệt. |
| `sitemap.xml` đối chiếu `rebuild-sitemap.py` | Sitemap bị thêm URL tay, hoặc thêm trang mới mà quên cập nhật `PAGE_CONF`. Thay đổi sẽ bị workflow ghi đè mất. Chỉ đối chiếu **tập URL**, không đối chiếu `<lastmod>` — ngày đó đổi theo mỗi commit, so cả tệp thì một lần sửa lỗi chính tả cũng làm CI đỏ. |
| Liên kết nội bộ và neo `#` | Đổi tên tệp hoặc đổi `id` của một mục, để lại liên kết chết ở trang khác. |

```bash
python3 scripts/check-site.py    # trả mã 0 nếu đạt, 1 nếu có lỗi
```

Script không cần thư viện ngoài và không sửa tệp nào. Chạy nó trước mỗi lần
commit có đụng tới `sw.js`, `sitemap.xml`, hoặc cấu trúc liên kết giữa các trang.

Script chạy tự động trên mỗi pull request qua `.github/workflows/check-site.yml`.
