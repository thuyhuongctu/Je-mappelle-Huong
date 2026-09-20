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
- Dáng do `dangHopCanh()` quyết định, theo thứ tự: đạp xe → dáng xe; chèo
  xuồng → dáng thuyền; đứng trong khu có dáng riêng → dáng khu; còn lại theo
  nét mặt. Đừng gọi thẳng `datDang()` từ chỗ khác, sẽ bị ghi đè.
- Ba phương tiện trong `phuongTien`: `'bo'`, `'xe'`, `'xuong'`. Tốc độ, nhãn
  nút, biểu tượng đều tra bảng (`PT_TOC`, `PT_NHAN`, `PT_BIEU`, `PT_TIEP`);
  hai nút đổi phương tiện hiển thị phương tiện **kế tiếp**, không phải phương
  tiện đang dùng.
- **Xuồng chỉ đi trên sông.** `trenNuoc()` xét điểm có nằm trong đa giác mặt
  sông không; `vienSong` lấy từ chính hình dựng mặt sông, nhớ đổi dấu trục
  (mặt sông xoay -90° quanh X nên điểm `(x,y)` rơi xuống thành `(x,0,-y)`).
  `benGanNhat()` thả xuồng vào **giữa dòng**, không phải chỗ nước gần nhất -
  thả sát mép thì chèo vài bước là húc bờ. `chenNuoc()` khi chạm bờ thì lái
  chệch dần tới ±1,4 rad để lướt dọc bờ; tách theo hai trục x/z là không đủ
  vì sông chạy xiên.
- Chèo xuồng và phần «tự đi tới khu» loại trừ nhau: các khu đều trên bờ, mà
  phần tự đi không xét mặt nước nên sẽ kéo xuồng lên cỏ. Vào xuồng thì xoá
  `mucTieuDi` và huỷ tour; đang chèo mà có đích thì tự chuyển về đi bộ.
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

WebP, cắt sát nội dung. Ảnh nhân vật cần nền trong suốt.

Nguồn là JPG nền đen thì **đừng suy độ phủ ra từ độ sáng**. Đã thử hai lần và
hỏng cả hai: chia ngược màu cho độ phủ thì sai nguyên lý, viền vẫn tối; lấy
độ phủ từ một dải độ sáng mềm thì bóng tối của chính nhân vật — khe giữa tóc
và cổ, nếp gấp sâu — bị tính là nền, thành nửa trong suốt rồi bị phần nối màu
tràn vào, hiện lên nền sáng thành mảng xám rách.

Matte của những ảnh này đen tuyệt đối (đo góc ảnh: đúng 0) và mép nhân vật
rất gọn — diện tích thân chỉ đổi 0,2% khi ngưỡng chạy từ 8 tới 24. Nên làm
thế này, không đoán gì cả:

1. `thân = sáng hơn 12`. Bóng của nhân vật vẫn sáng hơn mức ấy nên ở lại.
2. Khép mép một vòng 3×3 cho hết răng cưa do nén JPEG; giữ cụm lớn nhất; lấp
   những lỗ thủng nhỏ hơn 200px. **Đừng lấp lỗ thủng lớn** — khoảng hở thật
   giữa cánh tay và thân người phải để trong suốt.
3. Độ phủ là nhị phân. Mọi pixel ngoài lõi (thân co vào 2px) lấy màu của pixel
   **sáng hơn 40** gần nhất trong lõi — kể cả vùng nền. Nếu để nền đen thì
   bước 4 sẽ trộn đen vào mép; nếu để mấy lỗ đen vừa lấp được cho màu thì mép
   áo dài trắng sẽ dính đốm đen.
4. Thu nhỏ về cỡ đích bằng LANCZOS. **Chính bước này sinh ra độ phủ từng phần
   ở mép**, đúng đắn, thay cho việc ta ngồi đoán.

Đừng lấy "tỉ lệ pixel mép còn tối" làm thước đo: tóc sẫm ở mép vốn phải tối,
nên con số ấy cao hay thấp không nói lên điều gì. Phóng to mà nhìn.

Đổi ảnh nhân vật thì nhớ `DANG_TL` trong `trangvien.html` và cặp
`width`/`height` của ảnh chữ ký trong `music.html` — đọc thẳng từ tệp, đừng
chép tay.

## Trước khi thêm tệp mới

Đối chiếu đã. Nhiều tệp gửi tới hoá ra trùng với tệp đã có trong kho, hoặc là
bản chưa nén của tệp đã có. So bằng tương quan ảnh thu nhỏ, hoặc bằng khung
hình với video — đừng nhìn tên tệp mà đoán.
