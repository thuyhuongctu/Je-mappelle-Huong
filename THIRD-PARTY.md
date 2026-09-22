# Mã nguồn và tài nguyên của bên thứ ba

Tệp này kiểm kê mọi thứ trong kho **không phải** do Đỗ Thùy Hương sáng tạo, kèm
giấy phép và chỗ lấy về. Mục đích là vạch một đường rõ giữa phần tác giả đứng
tên và phần đi mượn — để người đọc biết mình được dùng gì, và để hồ sơ đăng ký
quyền tác giả không phải khai chung chung.

Giấy phép của phần thuộc về tác giả nằm ở [`LICENSE`](LICENSE). Giấy phép ấy
**không** áp cho những mục liệt kê dưới đây; mỗi mục theo giấy phép riêng của nó.

---

## 1. Thư viện chạy trên trang

### three.js r128

| | |
| --- | --- |
| Đường dẫn | `assets/vendor/three-r128.min.js` |
| Cỡ | 603 445 byte (bản đã nén dòng) |
| Nguồn | <https://github.com/mrdoob/three.js> |
| Giấy phép | MIT — Copyright © 2010–2021 three.js authors |
| Đã sửa? | **Không.** Nguyên bản phát hành, không đụng một ký tự. |

Dùng cho cảnh 3D của trang viên (`trangvien.html`) và cảnh tháp
(`assets/canh/thap.html`).

Trang `design-demos/gardenhub3d.html` nạp cùng thư viện ấy qua cdnjs thay vì bản
trong kho; đó là trang thử nghiệm, không nằm trong phần điều hướng chính.

---

## 2. Cảnh tháp — tác phẩm phái sinh

### ThreeUI «Towers»

| | |
| --- | --- |
| Đường dẫn | `assets/canh/thap.html` |
| Cỡ | 735 745 byte, trong đó **78 % là dữ liệu base64 nhúng** (ảnh nền của bản gốc); mã thật khoảng 156 000 ký tự |
| Nguồn | <https://github.com/MengTo/threeui>, tệp `src/shaders/japanese-tower/Towers.html` |
| Giấy phép | MIT — Copyright © 2026 Meng To |
| Toàn văn | [`assets/vendor/threeui-LICENSE.txt`](assets/vendor/threeui-LICENSE.txt) |
| Đã sửa? | **Có** — xem dưới |

Đây là mục **quan trọng nhất** trong bản kiểm kê, vì nó là tác phẩm phái sinh
chứ không phải thư viện dùng nguyên. Kiểu tháp Việt Nam (`buildThap`, các giai
đoạn NỀN MÓNG → THÂN THÁP → MÁI NGÓI → TẦNG TRÊN → ĐỈNH THÁP) **có sẵn trong
bản gốc**, không phải phần thêm vào.

Phần đã thay đổi so với bản gốc (ghi ngay ở đầu tệp):

- bỏ three.js nhúng sẵn (593 KB), dùng chung bản trong `assets/vendor/`;
- bỏ nhạc nền base64 (1 063 KB, 44 % tệp gốc);
- dịch nhãn các nút sang ba thứ tiếng, truyền ngôn ngữ qua `?lang=`;
- khai lại bảng màu cho hợp bộ màu đất sét của trang web;
- chặn phần trăm âm ở chỗ hiện chữ.

Kho gốc còn kèm `ASSET-LICENSES.md` nói rõ **media ngoài không thuộc giấy phép
MIT**. Kho này chỉ lấy tệp `.html` chạy độc lập, không lấy ảnh từ kho lưu trữ
riêng của tác giả ấy.

---

## 3. Dữ liệu bản đồ

### Natural Earth 1:10m Admin 0 Countries

| | |
| --- | --- |
| Sinh ra | `assets/img/vn-outline.svg` |
| Sinh bởi | `scripts/make-vn-outline.py` |
| Nguồn | <https://www.naturalearthdata.com/> |
| Giấy phép | **Phạm vi công cộng** (public domain) — Natural Earth không giữ bản quyền nào |

Đường viền Việt Nam trong hình chìm dựng từ dữ liệu này. Cách thể hiện — nét
mảnh, `currentColor`, các chấm đánh dấu quần đảo — là của tác giả.

---

## 4. Video giới thiệu trang viên

### `assets/video/trangvien-intro.mp4`

| | |
| --- | --- |
| Phần **hình** | Do **Google Gemini** sinh ra từ lời nhắc của tác giả |
| Phần **tiếng** | Trích từ «Mekong Sunfire — Rise with the River», **tác phẩm của tác giả** |
| Ghép và nén | Tác giả |

Đây là chỗ dễ nhầm nên ghi tách bạch: **phần hình không phải tác phẩm của tác
giả**. Nó do một công cụ sinh ảnh động tạo ra, nên theo điều khoản của Google
về nội dung sinh ra, không theo [`LICENSE`](LICENSE) của kho này. Phần nhạc
nền thì ngược lại — là bài hát của tác giả.

**Không nằm trong phạm vi đăng ký quyền tác giả** đối với trang viên, cùng lý
do với cảnh tháp ở mục 2: cái được đăng ký là cảnh 3D do tác giả dựng, không
phải đoạn phim giới thiệu nó.

Ảnh bìa `assets/img/trangvien-intro-poster.webp` cắt từ chính video này nên
cùng tình trạng.

---

## 5. Bộ chữ

### Be Vietnam Pro

| | |
| --- | --- |
| Nạp từ | Google Fonts (`fonts.googleapis.com`) |
| Giấy phép | SIL Open Font License 1.1 |

Không có tệp phông nào được chép vào kho; trang nạp thẳng từ Google Fonts.

---

## 6. Dịch vụ ngoài

### GoatCounter

| | |
| --- | --- |
| Gọi tới | `gc.zgo.at` |
| Việc | Đếm lượt xem, không đặt cookie, không theo dấu cá nhân |

Là dịch vụ gọi từ xa, không phải mã trong kho.

---

## 7. Không thuộc tác phẩm

Thư mục `.claude/skills/` chứa mười một bộ hướng dẫn soạn thảo của bên thứ ba
(`hallmark`, `huashu-design`, `h3-prompt-writing`, và các bộ khác). Chúng là
**công cụ dùng lúc làm việc**, giống như một phần mềm soạn thảo — không có dòng
nào trong đó chạy trên trang web, và không trang nào tham chiếu tới chúng:

```
$ grep -rl "\.claude/skills" --include=*.html --include=*.js --include=*.py .
(không kết quả)
```

Vì vậy chúng **không nằm trong phạm vi tác phẩm đăng ký**. Bộ `huashu-design`
có giấy phép riêng tại `.claude/skills/huashu-design/LICENSE`.

Thư mục `ban-cu/` cũng không thuộc tác phẩm. Đó là chỗ cất 267 tệp `.bak` —
bản sao lưu sinh ra trong lúc làm việc, trước nằm rải rác khắp kho. Trong số
ấy **178 tệp là bản nháp của chính các bộ hướng dẫn bên thứ ba nói trên**, nên
cũng theo giấy phép riêng của chúng. Không tệp nào trong `ban-cu/` được trang
web dùng tới. Xem [`ban-cu/README.md`](ban-cu/README.md).

---

## 8. Phần thuộc về tác giả

Mọi thứ còn lại. Đo tại thời điểm lập bản kiểm kê này:

| Hạng mục | Số lượng |
| --- | --- |
| Trang HTML | 22 |
| `trangvien.html` (cảnh 3D trang viên) | 5 417 dòng |
| Năm mô-đun trò chơi trong `assets/js/` | 260 dòng |
| JavaScript và script khác | 3 104 dòng |
| CSS | 443 dòng |
| Ảnh WebP (gồm ảnh nhân vật do tác giả dựng) | 86 tệp |
| Ghi âm | 113 tệp |
| Video | **12** tệp (kho có 13; `trangvien-intro.mp4` ở mục 4 là của bên thứ ba) |

Cảnh 3D trang viên — bố cục tám khu, mặt đất theo màu đỉnh, mạng lối mòn, bốn
thời khắc ánh sáng, bộ kiến trúc dùng chung, chế độ ngắm toàn cảnh, tám bức vẽ
trên bản đồ — **không dùng một dòng nào của ThreeUI**. Nó chỉ dùng chung thư
viện three.js, như mọi cảnh WebGL khác. Cảnh tháp ở mục 2 được nhúng bằng
`iframe` vào khu «Kho tương lai», tức là đặt cạnh chứ không trộn vào.

---

*Có thiếu sót hay ghi nhầm nguồn, xin báo để sửa.*
