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

**Đã gỡ dấu hiệu bốn cánh của Gemini** khỏi góc dưới phải — một lớp trắng mờ
48×48 điểm ảnh, độ phủ 0,57 ở lõi, đè lên cả 240 khung hình. Gỡ bằng cách khớp
độ phủ trên 81 khung có nền phẳng rồi giải ngược phép trộn, không phải bôi xoá.
Ảnh bìa dựng lại từ khung đã gỡ.

Gỡ dấu hiệu **không** làm phần hình trở thành tác phẩm của tác giả: nguồn gốc
khai ở ngay mục này mới là chỗ ghi nhận, và dấu chìm SynthID mà Google nhúng
sẵn thì vẫn còn trong tệp. Trước khi dùng rộng rãi nên đối chiếu điều khoản gói
Gemini đang dùng, vì có gói buộc giữ nguyên dấu hiệu ấy.

---

## 4b. Văn phòng nghiên cứu — dựng lại từ một bản do máy sinh

### `vanphong.html`

| | |
| --- | --- |
| Bản khởi đầu | Do **Grok (xAI)** sinh ra từ lời nhắc của tác giả — một tệp HTML rời và một workspace React |
| Bản trong kho | Tác giả viết lại, **không dùng lại mã của bản kia** |
| Lời thoại | Tác giả viết, lấy từ chính các trang khác của kho này |
| Tranh nhân vật | `assets/img/huong-ai-chao.webp` và năm chân dung `assets/img/npc-*.webp` — đều đã có sẵn trong kho này |
| three.js | Bản chép trong kho, xem mục 1 |

Ghi tách bạch vì hai bản khác nhau rất xa. Bản do máy sinh không dùng thẳng
được, và **ba chỗ phải bỏ hẳn** chứ không phải sửa cho gọn:

1. **Lời gọi API của một hãng AI ngay trong trình duyệt khách.** Trang này là
   trang tĩnh trên GitHub Pages, không có máy chủ để giữ khoá; mà kho vừa gỡ
   Google Fonts đúng để địa chỉ IP của khách không đi tới đâu khác. Nay mọi câu
   trả lời nằm sẵn trong tệp — đo bằng Chromium: **0 yêu cầu ra ngoài**.
2. **three.js nạp từ cdnjs.** Đó chính là thứ kho này đã cố ý loại bỏ. Nay dùng
   bản chép trong kho.
3. **Những người có thật.** Bản kia đưa người hướng dẫn và vài nhà nghiên cứu
   vào làm nhân vật, rồi để mô hình ngôn ngữ **sinh lời thay họ**; một bản còn
   gán một người không có thật vào một trường đại học có thật. Đã bỏ hẳn. Trong
   kho chỉ còn tác giả là người thật; năm nhân vật đội demo BizOn là hư cấu, và
   mỗi bảng hội thoại đều nói rõ điều đó.

Cũng sửa hai con số bản kia ghi sai so với chính kho này: phân tích tổng hợp là
**236 nghiên cứu** chứ không phải «300+», và tác giả là **nghiên cứu sinh** tại
Trường Kinh tế, Đại học Cần Thơ.

Ảnh bìa `assets/img/vanphong-bia.webp` chụp từ chính cảnh này.

---

## 5. Bộ chữ

Hai bộ chữ, dùng cho trang viên 3D và ba bản demo bố cục. **Từ 22/09/2026 cả
hai được chép vào kho, không còn nạp từ Google Fonts** — trước đó mỗi khách
ghé đều gửi địa chỉ IP sang `fonts.googleapis.com` trước khi trang kịp vẽ chữ
đầu tiên. Trang này không có máy chủ và không đặt cookie, nên không có lý do
gì để địa chỉ ấy đi đâu khác.

### Be Vietnam Pro

| | |
| --- | --- |
| Tác giả | Be Type (Việt Nam) — Copyright 2021 The Be Vietnam Pro Project Authors |
| Nguồn | <https://github.com/bettergui/BeVietnamPro>, lấy qua kho `google/fonts` (`ofl/bevietnampro`) |
| Trong kho | `assets/fonts/bevietnampro-{400,500,600,700}-vn.woff2` |
| Giấy phép | SIL Open Font License 1.1 — toàn văn ở `assets/fonts/OFL-BeVietnamPro.txt` |

### Baloo 2

| | |
| --- | --- |
| Tác giả | Ek Type (Ấn Độ) — Copyright 2019 The Baloo 2 Project Authors |
| Nguồn | <https://github.com/EkType/Baloo2>, lấy qua kho `google/fonts` (`ofl/baloo2`) |
| Trong kho | `assets/fonts/baloo2-vn.woff2` (phông biến thiên, trục `wght` 500–800) |
| Giấy phép | SIL Open Font License 1.1 — toàn văn ở `assets/fonts/OFL-Baloo2.txt` |

Cả hai đã **cắt bớt** xuống dải Latin + Latin mở rộng + tiếng Việt, giữ nguyên
bảng `mark`/`mkmk` để dấu tiếng Việt vẫn chồng đúng chỗ. OFL cho phép sửa và
phân phối lại với điều kiện giữ giấy phép và **không dùng lại tên dành riêng**;
hai bộ này không đặt Reserved Font Name nào, và tên họ chữ giữ nguyên.

Khai báo `@font-face` nằm ở `assets/css/fonts.css`.

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

Mọi thứ còn lại, **trừ phần đồng sở hữu nói ngay dưới bảng**. Đo tại thời điểm
lập bản kiểm kê này:

| Hạng mục | Số lượng |
| --- | --- |
| Trang HTML | 22 |
| `trangvien.html` (cảnh 3D trang viên) | 5 417 dòng |
| Năm mô-đun trò chơi trong `assets/js/` | 260 dòng |
| JavaScript và script khác | 3 104 dòng |
| CSS | 443 dòng |
| Ảnh WebP (gồm ảnh nhân vật do tác giả dựng) | 86 tệp |
| Ghi âm (tệp âm thanh được git theo dõi, trừ `.claude/`) | 113 tệp, **trong đó 20 tệp trong `assets/audio/bizon/` là đồng sở hữu** |
| Video | **12** tệp (kho có 13; `trangvien-intro.mp4` ở mục 4 là của bên thứ ba) |

**Phần đồng sở hữu với Phan Anh Tú.** Hai thứ trong kho này thuộc về hai tác
giả chứ không phải một: **tạo hình nhân vật của dự án BizOn**, và **hai mươi
bản thu trong `assets/audio/bizon/`**. Điều này khớp với `LICENSE` của kho
`thuyhuongctu/BizOn`; trước đây hai giấy phép nói khác nhau về cùng một bộ bản
thu, nay thì không. Xem [`LICENSE`](LICENSE) và
`ho-so-quyen-tac-gia/05-ung-vien-tiep-theo.md`.

Cảnh 3D trang viên — bố cục tám khu, mặt đất theo màu đỉnh, mạng lối mòn, bốn
thời khắc ánh sáng, bộ kiến trúc dùng chung, chế độ ngắm toàn cảnh, tám bức vẽ
trên bản đồ — **không dùng một dòng nào của ThreeUI**. Nó chỉ dùng chung thư
viện three.js, như mọi cảnh WebGL khác. Cảnh tháp ở mục 2 được nhúng bằng
`iframe` vào khu «Kho tương lai», tức là đặt cạnh chứ không trộn vào.

---

*Có thiếu sót hay ghi nhầm nguồn, xin báo để sửa.*
