# Ghi chú cho Claude Code

Những nếp riêng của kho này. Mỗi mục dưới đây là một chỗ đã từng mất thì giờ
hoặc đã từng làm hỏng một lần, nên ghi lại để lần sau khỏi dò lại từ đầu.

## Nhánh

Nhánh chính **không phải `main`** mà là `claude/academic-profile-page-psxbdv`.
Nhánh làm việc là `claude/personal-site-bizon-redirect-sxzdbb`; gộp xong thì
kéo nhánh ấy tiến lên nhánh chính rồi làm tiếp.

## Ba nếp bắt buộc trước khi đẩy

1. **Chạy `python3 scripts/check-site.py`.** Nó canh đúng ba chỗ từng hỏng âm
   thầm — trang vẫn hiện bình thường nên không ai phát hiện:
   - `sw.js` nạp trước một tệp không tồn tại → `cache.addAll()` hỏng nguyên
     khối, cài ngoại tuyến không được, mà khi có mạng thì trang chạy y hệt;
   - `sitemap.xml` thiếu trang hoặc bị thêm URL tay;
   - liên kết nội bộ hoặc neo `#` trỏ vào hư không sau khi đổi tên tệp.

2. **Nâng số bộ nhớ đệm trong `sw.js`** (`const CACHE = 'jshuong-vNN'`) mỗi
   lần đổi nội dung. Quên thì khách cũ vẫn thấy bản cũ.

3. **Không sửa tay `sitemap.xml`.** Tệp ấy do `scripts/rebuild-sitemap.py`
   sinh lại toàn bộ; dòng chép tay sẽ biến mất ở lần chạy `update-sitemap.yml`
   kế tiếp. Thêm trang mới thì khai trong `PAGE_CONF` rồi chạy
   `python3 scripts/rebuild-sitemap.py --apply`.

## Xem thử tại chỗ

```bash
python3 -m http.server 8899        # rồi mở http://127.0.0.1:8899/
```

`404.html` dùng đường dẫn tuyệt đối theo đường dẫn thật trên GitHub Pages, nên
muốn thử riêng trang ấy thì phải phục vụ dưới đúng tên `/Je-mappelle-Huong/`.

## Bộ màu đất sét

Dùng chung cho mọi trang, khai lại ở đầu mỗi tệp HTML:

```
--paper #f6f1e7   --surface #fffcf5   --ink #1c1814
--muted #6f6459   --line   #e2d8c7    --clay/--accent #c45c3a
--river/--accent2 #3f6f68              --amber/--gold  #b8842c
```

Mỗi trang tự khai ba lần: mặc định, `@media(prefers-color-scheme:dark)` có bọc
`:root:not([data-theme=light])`, và `:root[data-theme=dark]`.

Ba thứ tiếng bằng lớp `.lang-vi` / `.lang-en` / `.lang-fr`, ẩn hiện theo
thuộc tính `lang` của `<html>`; khoá nhớ là `huong_lang`, `huong_theme`.

Đầu trang và chân trang dùng chung do `assets/js/site-chrome.js` dựng, không
viết lại trong từng tệp.

## Trang viên 3D (`trangvien.html`)

- Nhân vật là **ảnh phẳng luôn xoay về máy quay**, không phải khối 3D. Ảnh
  khai trong `DANG_ANH`, tỉ lệ trong `DANG_TL`.
- `DANG_TL` phải **đúng bằng rộng/cao của tệp ảnh**. Ảnh phải cắt sát người.
  Đặt sai thì nhân vật bị kéo bè ngang mà nhìn không ra, vì viền trong suốt
  quanh người che mất.
- Dáng do `dangHopCanh()` quyết định, theo thứ tự: đạp xe → dáng xe; đứng
  trong khu có dáng riêng → dáng khu; còn lại theo nét mặt. Đừng gọi thẳng
  `datDang()` từ chỗ khác, sẽ bị ghi đè.
- Màn hình có **chín cụm nổi do năm tệp CSS khác nhau đặt chỗ**;
  `assets/css/hud-gon.css` sinh ra chỉ để chúng khỏi chồng nhau. Thêm cụm mới
  thì phải canh lại ở đó.
- Bảng nội dung một khu và bảng trợ giúp dùng chung một bảng; cả hai đều phải
  đặt lớp `body.dang-doc-khu` để các cụm nổi ẩn đi.

## Kiểm bằng trình duyệt thật

Dùng Playwright với Chromium sẵn có:

```
executable_path=/opt/pw-browsers/chromium
args=["--enable-unsafe-swiftshader","--use-gl=swiftshader"]
```

Ba giới hạn của môi trường kiểm, **không phải lỗi của trang**:

- Chromium ở đây **không có H.264**, nên mọi `.mp4` trong kho đều không tải
  được khi kiểm;
- `gc.zgo.at` (đếm lượt xem) và Google Fonts bị cổng ra mạng chặn;
- kết xuất bằng phần mềm nên trang viên chạy rất chậm — muốn kiểm phần dáng
  thì đặt thẳng `nhanVat.position` thay vì chờ nhân vật đi bộ tới.

Vào trang viên phải: chờ `#nut-vao` hết `disabled` rồi bấm, sau đó bấm hết ba
bước của `#th-guide-next`.

## Lời commit

Viết tiếng Việt, giọng bình thường. Nói **vì sao** chứ không chỉ nói đã đổi
gì; nếu có chỗ hỏng có sẵn từ trước thì ghi rõ là có sẵn. Ghi lại đã kiểm
những gì, bằng con số thật.

## Ảnh

WebP, cắt sát nội dung. Ảnh nhân vật cần nền trong suốt. Nếu nguồn là JPG nền
đen thì **đừng chia ngược màu cho độ phủ** — sai nguyên lý, viền vẫn tối. Làm
thế này: lấy phần thân bằng ngưỡng thấp → nối màu ra ngoài (mỗi pixel ngoài
thân lấy màu pixel gần nhất bên trong) → làm mềm mép.

## Trước khi thêm tệp mới

Đối chiếu đã. Nhiều tệp gửi tới hoá ra trùng với tệp đã có trong kho, hoặc là
bản chưa nén của tệp đã có. So bằng tương quan ảnh thu nhỏ, hoặc bằng khung
hình với video — đừng nhìn tên tệp mà đoán.
