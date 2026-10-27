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

### GLTFLoader (three.js r128)

| | |
| --- | --- |
| Đường dẫn | `assets/vendor/GLTFLoader-r128.js` |
| Nguồn | gói npm `three@0.128.0`, `examples/js/loaders/GLTFLoader.js` — cùng bản với `three-r128.min.js` |
| Giấy phép | MIT — three.js authors |
| Đã sửa? | **Không.** |

Dùng để nạp mô hình `.glb` (dừa ven sông) trong `trangvien.html`. Thiếu tệp thì
cảnh vẫn chạy, chỉ không có dừa.

### Kenney Nature Kit 2.1 — ba cây dừa

| | |
| --- | --- |
| Đường dẫn | `assets/models/kenney/tree_palm.glb`, `tree_palmBend.glb`, `tree_palmShort.glb` |
| Nguồn | <https://kenney.nl/assets/nature-kit> |
| Giấy phép | **CC0 1.0** (`assets/models/kenney/LICENSE-kenney-nature-kit.txt`) — không bắt buộc ghi công, vẫn ghi cho rõ nguồn |
| Đã sửa? | Tệp giữ nguyên. Lúc chạy thay vật liệu bằng hai màu sẵn có của cảnh (`#C08A5A`, `#79B25C`) và đặt `metalness` về 0. |

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

### d3-geo 3.1.1, d3-array 3.2.4, topojson-client 3.1.0

| | |
| --- | --- |
| Đường dẫn | `assets/vendor/d3-geo.min.js`, `d3-array.min.js`, `topojson-client.min.js` |
| Giấy phép | ISC |
| Tình trạng | Dùng nguyên bản từ npm, không sửa một ký tự |

Ba thư viện này vẽ tấm **Atlas chỉ số** đặt dưới bản đồ khung dữ liệu ở trang
chủ: `d3-geo` lo phép chiếu và sinh đường, `topojson-client` giải mã hình thể,
`d3-array` là phụ thuộc mà `d3-geo` khai trong bản UMD.

**Phải nạp `d3-array` TRƯỚC `d3-geo`.** Bản UMD của `d3-geo` gọi `d3.Adder`
của `d3-array`; nạp sau hoặc nạp song song thì nó ném
`t.Adder is not a constructor` ngay lúc nạp, và tấm bản đồ không hiện. Đã vấp
đúng lỗi ấy một lần.

Cả ba **chỉ nạp khi khối bản đồ vào khung nhìn**, không nạp sẵn: cộng với hai
tệp dữ liệu thì khối này nặng 230 KB, quá nhiều để bắt mọi khách tải trong khi
phần lớn không cuộn tới.

### world-atlas 2.0.2 — hình thể thế giới

| | |
| --- | --- |
| Đường dẫn | `assets/data/countries-110m.json` (105 KB) |
| Giấy phép | ISC cho gói; dữ liệu biên giới thuộc phạm vi công cộng |
| Nguồn gốc | Dựng từ Natural Earth, cùng nguồn với bản đồ khung dữ liệu ở mục 3 |

Chọn bản **110m** chứ không phải 50m (739 KB): ở cỡ bản đồ trên trang, biên
giới thô hơn gần như không nhìn ra, mà nhẹ hơn bảy lần.

### Số liệu trong Atlas chỉ số

| | |
| --- | --- |
| Đường dẫn | `assets/data/atlas-chi-so.json` (66 KB) |
| Nguồn | Ngân hàng Thế giới (bốn chỉ số) và UNDP qua Our World in Data (HDI) |
| Lấy ngày | 24/10/2026 |

Năm chỉ số, mỗi chỉ số ghi kèm mã gốc của Ngân hàng Thế giới ngay trên giao
diện (`NY.GDP.PCAP.PP.CD`, `NE.TRD.GNFS.ZS`, `BX.KLT.DINV.WD.GD.ZS`,
`IT.NET.USER.ZS`). Số liệu của các tổ chức ấy, **không phải của tác giả**.

**Đây không phải dữ liệu luận án.** Luận án dùng khảo sát doanh nghiệp WBES
ghép bộ chỉ số WGI; năm chỉ số này là bối cảnh phát triển chung. Chú thích
dưới tấm bản đồ nói thẳng điều đó, để người đọc không nhầm.

Phần dàn dựng và tạo hình do tác giả đặt làm, giao lại dưới dạng một ứng dụng
React; trang này không có bước build nên phần vẽ **viết lại bằng JavaScript
thuần** (`assets/js/atlas.js`), giữ nguyên phép chiếu Natural Earth, cách chia
ngũ phân vị và bảng màu của bản giao.

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

## 4c. Phim giới thiệu M-AIDA

### `assets/video/maida-film.mp4`

| | |
| --- | --- |
| **Giọng đọc** | **Giọng của chính tác giả** |
| **Tạo hình nhân vật** | **Tác giả dựng** |
| Nội dung và lời trên màn hình | Tác giả, lấy từ chính dự án M-AIDA |
| Dựng chuyển động | Soạn trong **Claude Design**, theo chỉ dẫn của tác giả |
| Xuất ra mp4 | Chụp từng khung rồi nén |

Khác với mục 4: ở đây **không có phần nào của bên thứ ba**. Hai thứ dễ
bị cho là do máy sinh thì đều không phải: giọng đọc là giọng thật của tác
giả, và hai hình nhân vật là tạo hình do tác giả dựng. Công cụ chỉ làm phần
dựng chuyển động — ghi ra đây theo đúng nguyên tắc A.2 của
`ho-so-quyen-tac-gia/04-cong-cu-ho-tro.md`: không giấu việc có dùng công cụ.

Bản gửi tới **không phải tệp video** mà là một trang HTML tự chứa: cảnh vẽ
lại từng khung theo một trục thời gian. Trang ấy không nằm trong kho; thứ được
git theo dõi chỉ là tệp mp4 xuất ra, 2 024 khung ở 30 hình/giây.

**Bản thu lời đọc đã thay một lần**, từ 1:04,40 sang **1:07,45**. Bản sau đọc chậm
hơn chứ không đổi lời — căn hai bản bằng DTW trên phổ log tám dải cho sai số còn
1,090, trong khi ghép ngẫu nhiên là 3,298. Ba giây dôi ra **không nằm ở đầu hay
cuối** mà rải trong bài, trôi dần tới +4,3 giây ở giữa. Nên phải **dựng lại cả
phần hình theo nhịp mới**, không ghép tiếng vào bản hình cũ được: ghép thẳng thì
lời đọc tả một cảnh đã trôi qua. Mốc sáu cảnh lấy từ chính đường căn ấy.

Độ to hai bản lệch 0,4 LU (−13,7 so với −14,1 LUFS) — dưới ngưỡng 1 LU nên
**không chuẩn hoá**, giữ nguyên bản thu.

**Nhân vật đầu phim lật ngang so với ảnh gốc**, có chủ đích: mọi nội dung của
cảnh ấy nằm bên trái, nên cử chỉ phải mở vào trong khung chứ không dắt mắt ra
khỏi nó. Nhân vật cuối phim **giữ nguyên chiều**: tay vẫy là vẫy người xem nên
phải hướng ra, và tà áo dài cài bên phải nên lật ngang là cài sai bên.

**Nhạc nền** là `assets/maida_song_instrumental.mp3` lấy từ kho
[`thuyhuongctu/M-AIDA`](https://github.com/thuyhuongctu/M-AIDA) — bản không lời
tách ra từ chính bài hát của dự án M-AIDA, mà trang `index.html` của kho ấy gọi
là «bản không lời (hoà tấu) — tách từ bản chính thức để nghe làm nhạc nền». Kho
ấy cũng của tác giả (AGPL-3.0, Copyright 2026 Do Thuy Huong và Phan Anh Tu), nên
không phải tài nguyên của bên thứ ba.

Lấy 67,45 giây đầu của bản dài 3:01, mở dần 1,5 giây và tắt dần 2,5 giây,
hạ **11 dB** — đo ra nằm **14,6 dB dưới lời đọc**, đủ nghe mà không tranh với
tiếng nói. Độ to của cả trái giữ đúng mức cũ (−14,7 LUFS) để ô này không to hơn
các clip khác trong lưới Dự án. Phần hình **không mã lại**: chép nguyên dòng
hình, md5 trước và sau bằng nhau.

Chữ trong phim dùng Inter, JetBrains Mono và Source Serif 4 — đều SIL OFL. Chúng
đã thành điểm ảnh trong tệp mp4, **không thêm tệp phông nào vào kho**, nên mục 5
không đổi.

Thẻ cuối phim ghi **«Do Thuy Huong · Phan Anh Tu»** cùng DOI Zenodo của M-AIDA
— đúng theo bản ghi của chính dự án ấy, không phải do phim tự đặt ra.

Ảnh bìa `assets/img/maida-film-poster.webp` cắt từ chính tệp mp4 này nên cùng
tình trạng.

---

## 4d. Phim giới thiệu Văn phòng nghiên cứu

### `assets/video/vanphong-intro.mp4`

| | |
| --- | --- |
| **Giọng đọc** | **Giọng của chính tác giả** |
| Nhân vật trong phim | Dàn nhân vật của chính văn phòng, xem mục 4b |
| Nội dung và lời trên màn hình | Tác giả, lấy từ chính dự án Văn phòng nghiên cứu |
| Dựng chuyển động | Soạn trong **Claude Design**, theo chỉ dẫn của tác giả |
| Nhạc nền | `assets/audio/bizon-theme.mp3` lấy từ kho [`thuyhuongctu/BizOn`](https://github.com/thuyhuongctu/BizOn) — bản không lời |
| Xuất ra mp4 | Chụp từng khung rồi nén |

Giống mục 4c và khác mục 4: ở đây **không có phần nào của bên thứ ba**. Thứ dễ
bị cho là do máy sinh — giọng đọc — thì không phải: đó là giọng thật của tác
giả. Công cụ chỉ làm phần dựng chuyển động, ghi ra đây theo đúng nguyên tắc A.2
của `ho-so-quyen-tac-gia/04-cong-cu-ho-tro.md`: không giấu việc có dùng công cụ.

Nội dung trên màn hình đều lấy từ chính văn phòng: bảng bảy phương thức thâm
nhập thị trường, phần luận án «Firms meet institutions» (WBES × WGI, 50 nền
kinh tế), tấm «No network calls», và cách đi lại bằng WASD với phím E. Góc trên
phải đóng dấu `© 2026 Đỗ Thùy Hương · DOI 10.5281/zenodo.22971293` suốt phim —
đúng DOI của bản ghi Zenodo, không phải do phim tự đặt ra.

**Tệp chép nguyên, không mã lại.** Bản gửi tới đã là h264 High 1280×720 ở 30
hình/giây, AAC đôi 129 kb/s, 1:03,00, và `moov` nằm ở byte 36 tức đã faststart
giống `maida-film.mp4`. Đối chiếu md5 của dòng hình cộng tiếng trước và sau khi
chép: trùng khớp (`2b6959c6a657293ebc03ef23e84fd7c3`).

**Độ to −14,9 LUFS, đỉnh −0,6 dBFS.** Phim M-AIDA nằm ngay cạnh nó trên cùng
trang là −14,7 LUFS; lệch 0,2 LU, dưới ngưỡng 1 LU nên **không chuẩn hoá** —
mã lại chỉ để chỉnh chừng ấy là mất chất lượng không vì cái gì.

**Nhạc nền thêm vào sau**, khi bản gửi tới còn chưa có. Nguồn là
`assets/audio/bizon-theme.mp3` của kho BizOn — chính danh mục nhạc trong kho ấy
khai nó là `title: BizOn Theme`, `version: Instrumental`, `duration: 181`, và
`use: «Nền chung khi phát phiếu, debrief, checklist — không lời.»` Cùng một tác
giả, nên như mục 4c: **không có phần nào của bên thứ ba**.

Cách trộn, theo đúng công thức đã dùng cho phim M-AIDA: cắt 63 giây đầu, vuốt
vào 1,5 giây và vuốt ra 2,5 giây ở cuối, hạ **13,5 dB** để nền nằm **14,6 LU**
dưới giọng (nền −16,0 LUFS, giọng −14,9 LUFS), trộn với `normalize=0` để
`amix` khỏi tự chia đôi mức, rồi hạn biên ở −1 dBFS. **Bù mức đặt SAU khâu hạn
biên** (−0,4 dB) đúng như bài học ở mục 4c: đặt trước thì hạn biên ăn mất một
phần và chỉnh không ra số mong muốn.

Kết quả đo: **−14,9 LUFS, đỉnh −0,5 dBFS** — bằng đúng độ to của bản chưa có
nhạc, nên phần giọng nghe không khác. Nền nghe thấy được: đo năm khoảng giữa
các câu nói, mức dâng từ −44,8…−51,7 dB lên **−28,4…−33,1 dB**.

Hai điều đã vấp khi làm, ghi lại để lần sau khỏi dò lại:

- **Trộn lại là mất faststart.** ffmpeg viết `moov` xuống cuối tệp, trang vẫn
  chạy nhưng trình duyệt phải tải hết mới phát được. Phải ghép lại một lượt với
  `-movflags +faststart`; kiểm bằng cách tìm `moov` trong 200 KB đầu — phải ra
  byte 36 như các video khác trong kho.
- **Đừng lấy dải trên 6 kHz làm thước đo «có nhạc hay không» cho riêng phim
  này.** `bizon-theme` là bản nặng trầm: ba dải đo được −17,8 / −30,3 / −46,6 dB,
  nên thêm nhạc vào mà dải trên 6 kHz gần như không nhúc nhích. Thước dùng được
  ở đây là mức trung bình trong các khoảng giữa hai câu.

**Phần hình không bị đụng tới.** Trộn bằng `-c:v copy`; md5 của riêng dòng hình
trước và sau khi thêm nhạc trùng khớp (`1037585aa847e18dae267e69ab98658d`).
Tệp từ 3 775 379 lên 4 288 766 byte, dòng tiếng mã lại thành AAC 194 kb/s —
cao hơn bản gốc 129 kb/s để chỗ chuyển mã khỏi ăn thêm.

Hình nền của thẻ trên trang chủ **dùng lại `assets/img/vanphong-bia.webp` đã
có**, không cắt ảnh mới từ phim — nên khác mục 4c, không phát sinh tệp ảnh nào.

---

## 4e. Clip nền ở cổng trang viên

### `assets/video/cong-sen-chao.mp4`

| | |
| --- | --- |
| Phần **hình** | Do một **công cụ sinh video** tạo ra từ lời nhắc của tác giả |
| Phần **tiếng** | Không có — tệp không mang dòng tiếng nào |
| Cắt, nối và nén | Tác giả |

Đây là clip chạy nền ở màn cổng (`#cong`) của `trangvien.html`: Hương áo dài
đứng trên sạp gỗ bên ao sen, lối tạo hình đất sét. **Phần hình không phải tác
phẩm của tác giả** — cùng lẽ với `trangvien-intro.mp4` ở mục 4: cái được đăng
ký là cảnh 3D do tác giả dựng bằng three.js, không phải đoạn phim mở đầu nó.

Phần của tác giả ở đây là **dựng lại để lặp liền mạch**. Đo trong chính tệp:
310 khung, mà khung `i` đối xứng với khung `309−i` ở mức tương quan **0,9988
tới 1,0000** — tức chỉ có **155 khung thật** (6,46 giây ở 24 hình/giây), phần
sau là chính nó chạy ngược. Lời commit đưa tệp vào (17/09/2026) ghi đoạn cắt
là giây **13,5–20** của một bản dài hơn; bản dài hơn ấy **không nằm trong
kho**.

Ảnh bìa `assets/video/cong-sen-chao-poster.webp` cắt từ chính tệp này nên cùng
tình trạng — đo tương quan: khớp **khung 37/310 ở mức 0,9994**, nền 0,475.

**Không truy được công cụ nào đã sinh ra nó.** Tệp đã mã lại bằng ffmpeg
(`Lavf61.1.100` / `libx264`) nên siêu dữ liệu của nguồn không còn; bốn góc
khung hình không có dấu chìm nhìn thấy được. Khuôn tệp 1280×720 ở 24 hình/giây
**trùng** với `trangvien-intro.mp4` ở mục 4 — thứ mục ấy khai là của Google
Gemini — nhưng trùng khuôn tệp chỉ là **dấu hiệu, không phải bằng chứng**, nên
ở đây viết «một công cụ sinh video» cho đến khi tác giả xác nhận tên.

### `assets/video/cong-hoang-hon.mp4` và ảnh bìa của nó — **không còn dùng**

Đây là clip cổng **đời trước**, dùng từ 10/09 tới 17/09/2026. Lời commit đưa
nó vào gọi thẳng là *«the Hương AI riverside-sunset animation»* — tức cũng do
máy sinh, và **người trong hình không phải tác giả**. Ảnh bìa kèm theo
(`cong-hoang-hon-poster.webp`) lại là **một cảnh khác hẳn** — sa mạc và nền
nhà cao tầng Dubai; đo tương quan với mọi khung của chính video ấy, cao nhất
chỉ **−0,05**, tức không phải một khung của nó.

Cả hai tệp nay **không trang nào tham chiếu tới**:

```
$ grep -rn "cong-hoang-hon" --include=*.html --include=*.js --include=*.py .
(không kết quả)
```

Chúng nằm lại trong kho từ lần thay clip cổng, cộng **1,76 MB**. Giữ hay xoá
là việc của tác giả; chừng nào còn trong kho thì khai ở đây, vì **không thuộc
phạm vi đăng ký quyền tác giả**.

---

## 4f. Phim giới thiệu trang web

### `assets/video/trang-web-intro.mp4`

| | |
| --- | --- |
| Dàn dựng và chuyển động | Bản bàn giao thiết kế do tác giả đặt làm — mã React, không phải tệp video |
| Nội dung trong khung hình | Chính trang này: chữ, số liệu, ảnh lấy từ kho |
| Giọng đọc | Sáu đoạn, bản bàn giao ghi là do tác giả thu |
| Nhạc nền | «BizOn — And The World Say Hello», đi kèm bản bàn giao |
| Kết xuất, trộn tiếng, nén | Tác giả |

Bản bàn giao **không chứa tệp video**: nó là mã React chạy được kèm bảng đặc
tả (bảy cảnh, mốc thời gian, đường máy quay, bảng trộn tiếng). Phim mp4 dựng
lại từ chính mã ấy — bắt 2 010 khung ở 1920×1080, 30 hình/giây, qua đúng giao
kèo xuất video mà bộ máy dựng sẵn có (`data-om-seek-to-time-frame`), nên mỗi
khung là một lần vẽ tất định tại mốc thời gian đó chứ không phải quay màn hình.

**Nhạc nền là của tác giả** — tác giả xác nhận ngày 24/10/2026. Chỗ này từng
để ngỏ vì tên bài nhắc tới dự án BizOn, mà hai mươi bản thu trong
`assets/audio/bizon/` thì mục 8 khai là đồng sở hữu với Phan Anh Tú. Đo tương
quan tín hiệu của nhạc này với toàn bộ tệp mp3 trong kho, có trượt theo thời
gian, thì cao nhất chỉ **0,053** — tức không phải bản nào đang có trong kho (để
so sánh, lần đối chiếu «Mekong Sunfire» cho 0,9996). Vậy nó là một bản thu
riêng, **không** nằm trong phần đồng sở hữu.

Ảnh bìa `assets/img/trang-web-intro-poster.webp` cắt từ chính phim này.

---

## 4g. Trailer Gravity Lab

### `assets/video/gravity-lab-trailer.mp4`

| | |
| --- | --- |
| Tác phẩm được giới thiệu | Gravity Lab — DOI khái niệm 10.5281/zenodo.23307832 |
| Quyền tác giả ghi trên khung hình | «© 2026 Assoc. Prof. Dr. Phan Anh Tu and Do Thuy Huong (PhD candidate), School of Economics, Can Tho University» |
| Dàn dựng và nội dung trong khung hình | **chưa khai** — chờ tác giả xác nhận |
| Đóng gói | ffmpeg: `Lavf60.16.100`, hình `libx264` (`Lavc60.31.102`), tiếng AAC |

Số đo: 1920×1080, 30 hình/giây, đúng **1 800 khung = 60,000 giây**, H.264
~1,27 Mb/s, tiếng AAC 48 kHz hai kênh, 9 557 571 byte.

Đặt vào kho **nguyên vẹn, không mã lại**: md5 của tệp trong kho bằng đúng md5
bản tác giả gửi (`3b0eb6716e87800376f6750461b6683e`). Có thử nén lại ở CRF 26
thì còn 7,4 MB, tức bớt **19%** — quá ít để đánh đổi chất lượng của một phim
dựng 3D nhiều dải chuyển màu, nên giữ bản gốc. Tệp **không** khai trong `CORE`
của `sw.js`, đúng tiền lệ các phim giới thiệu khác: nặng, lại đặt
`preload="none"` nên chỉ tải khi khách bấm.

Ảnh bìa `assets/img/gravity-lab-trailer-poster.webp` cắt từ chính phim này,
khung ở giây 40 (tấm «FDI ROOM — Does distance matter for capital flows into
Viet Nam?» với hệ số −0,38), thu về 1000×562 bằng LANCZOS, WebP chất lượng 84,
28 694 byte — cùng khoảng với các ảnh bìa đã có (23–64 KB).

**Đồng sở hữu với Phan Anh Tú.** Dòng bản quyền in trên khung hình ghi hai tác
giả, và `publications.html` cũng khai Gravity Lab là «Phan Anh Tu · Do Thuy
Huong». Nên phim này và ảnh bìa cắt từ nó nằm trong phần đồng sở hữu ở mục 8,
cùng loại với tạo hình nhân vật BizOn và hai mươi bản thu trong
`assets/audio/bizon/`.

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
| Ảnh WebP (gồm ảnh nhân vật do tác giả dựng) | **97** tệp (kho có 99; `cong-hoang-hon-poster.webp` ở mục 4e là của bên thứ ba, `gravity-lab-trailer-poster.webp` ở mục 4g là đồng sở hữu). Con số cũ ghi 96 trên 97 là **đếm hụt một tệp**: đo lại tại chính commit đặt ra nó thì kho đã có 98 tệp webp |
| Ghi âm (tệp âm thanh được git theo dõi, trừ `.claude/`) | 121 tệp, **trong đó 20 tệp trong `assets/audio/bizon/` là đồng sở hữu** |
| Video | **13** tệp (kho có 17; ba tệp của bên thứ ba: `trangvien-intro.mp4` ở mục 4, `cong-sen-chao.mp4` và `cong-hoang-hon.mp4` ở mục 4e; `gravity-lab-trailer.mp4` ở mục 4g là đồng sở hữu. `trang-web-intro.mp4` ở mục 4f là của tác giả, nhạc nền cũng vậy) |

**Phần đồng sở hữu với Phan Anh Tú.** Ba thứ trong kho này thuộc về hai tác
giả chứ không phải một: **tạo hình nhân vật của dự án BizOn**, **hai mươi
bản thu trong `assets/audio/bizon/`**, và **trailer Gravity Lab cùng ảnh bìa
cắt từ nó** (mục 4g). Điều này khớp với `LICENSE` của kho
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
