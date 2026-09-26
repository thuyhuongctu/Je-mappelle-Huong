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

**Mặc định là tiếng Anh, cho mọi khách.** Trước đây có dò `navigator.language`
rồi rơi về `vi`; nay bỏ hẳn phần dò ấy: quy tắc chỉ còn *lựa chọn đã lưu của
khách → `en`*. Khách bấm nút đổi sang thứ tiếng khác thì lựa chọn ấy được nhớ
và vẫn thắng. Thẻ `<html lang>` tĩnh cũng phải là `"en"`, nếu không thì loé
tiếng Việt một nhịp trước khi JavaScript chạy.

Quy tắc ấy nằm rải ở **mười trang HTML** (mỗi trang một bản chép), cộng
`site-chrome.js`, `dongho.js`, `music.js`. Thêm trang mới thì nhớ cả ba tệp
dùng chung. Năm mô-đun trò chơi và `assets/canh/thap.html` không cần sửa vì
chúng đọc thẳng `document.documentElement.lang`; riêng cảnh tháp khi nhúng
phải truyền `?lang=` tường minh cho **cả hai** thứ tiếng, vì trong iframe nó
không thấy thẻ `<html>` của trang cha.

Đầu trang và chân trang dùng chung do `assets/js/site-chrome.js` dựng, không
viết lại trong từng tệp.

## Năm mô-đun trò chơi của trang viên

`achievements.js`, `side-quests.js`, `play-loop.js`, `minigame.js`,
`story-quest.js` dựng chữ bằng JavaScript nên không dùng được lớp `.lang-*`.
Cả năm tệp dùng chung một cách:

```js
const NG=()=>document.documentElement.lang==='en'?'en':'vi';
const T=o=>typeof o==='string'?o:(o[NG()]||o.vi);
```

Chuỗi trong dữ liệu là `{vi,en}`, và **đọc `lang` ngay lúc vẽ**, đừng nhớ lại
lúc nạp — khách đổi ngôn ngữ giữa chừng thì bảng đang mở phải vẽ lại đúng.
Mỗi mô-đun tự theo dõi `lang` bằng `MutationObserver` trên `<html>`; riêng
`play-loop.js` thì không cần vì nhãn của nó vẽ lại mỗi khung hình trong
`scan()`. Bảng đang mở phải nhớ là bảng nào để mở lại đúng nó; `minigame.js`
không vẽ lại ván đang chơi, chỉ vẽ lại màn giới thiệu.

Trang viên chỉ có **hai thứ tiếng** (vi/en), không có tiếng Pháp.

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

## Tám bức vẽ trên bản đồ trang viên

Bảng «Bản đồ trang viên» (`#toancanh`) trước đây đánh số 1–8 lên từng khu; nay
mỗi khu là một huy hiệu tròn có **bức vẽ đúng công trình có thật ở khu ấy trong
cảnh 3D** — chồng hồ sơ và kính lúp, rương kho báu, nhà sàn sách, sân khấu tre,
bảng làng, nhà chính, đèn lồng, hải đăng. Bảng `TRANH_KHU` nằm ngay trên
`veBanDoLon()`.

Ba điều ràng buộc, đã đo chứ không đoán:

- **Vẽ trong hộp 32×32, nhưng huy hiệu là hình tròn.** Nửa đường chéo của hộp
  là 22,6 trong khi vành chỉ bán kính 17, nên bốn góc hộp lòi ra ngoài. Giữ nét
  trong vòng bán kính 14 quanh `(16,16)`.
- **Cỡ thật: 38px trên máy tính, 28px trên điện thoại.** Khung SVG 400 đơn vị
  hiện ra 446px ở bề ngang 1180 và 338px ở bề ngang 390. Nét mảnh hơn ~1,2 đơn
  vị sẽ biến mất ở cỡ điện thoại — dùng mảng đặc, đừng dùng nét.
- **Đừng để hai khu cùng một dáng.** Thư viện và Nhà chính trong cảnh 3D đều
  mái đỏ; vẽ y như thế thì ở 28px không phân biệt nổi. Thư viện vẽ thành nhà
  sàn có cột và thang (đúng như phụ đề «Nhà sàn tri thức»), khác hẳn dáng nhà
  chính có cửa sát đất.

Huy hiệu to lên (bán kính 16 → 17) nên **ao sen giữa bản đồ phải nhỏ lại** (15
→ 12): khu Nhà chính chỉ cách tâm ao 26 đơn vị, để nguyên thì hai hình dính vào
nhau.

Số thứ tự vẫn còn, nhưng ở **danh sách bên cạnh**, vì đó mới là chỗ nó làm
việc: nó là phím tắt 1–8. Dòng mẹo dưới bảng phải nói đúng chỗ ấy.

Bảng «Đi đâu?» (`bd-chon`, mở từ bản đồ tròn ở góc) vẫn dùng emoji — `TRANH_KHU`
khai trong phạm vi của `#toancanh` nên chỗ kia không với tới.

## Mặt đất và lối mòn trang viên

Mặt đất **không còn là `CircleGeometry`**. Đĩa quạt ấy chỉ có 73 đỉnh, toàn
nằm ở mép, nên không có chỗ nào đặt vân — cảnh vì thế có một mảng phẳng trơn
một màu chiếm gần nửa khung hình. Nay là `RingGeometry(.02, 68, 132, 36)`,
4 921 đỉnh, tô bằng **màu theo đỉnh** (`vertexColors`). Vành sẫm riêng ngày
trước gộp luôn vào đây nên bớt được một mesh.

`material.color` phải để **trắng**: với `vertexColors` nó là hệ số *nhân*.
`datMauGoc` cũng là trắng, còn noir đặt `nenDat:'#241B15'` thì nhân xuống
thành nền nâu sẫm — đúng ý, không phải sửa gì thêm ở `apThoiKhac()`.

**Gò chỉ nâng ở ngoài vòng đi lại.** Bắt đầu từ bán kính 50 và theo bình
phương, nên ở 52 (`BAN_KINH`) mới cao 0,03 đơn vị. Đo lại sau khi dựng: **0
đỉnh** trong vòng 52 lệch quá 0,05. Nhờ thế mọi công trình, cây cối và nhân
vật giữ nguyên độ cao, không phải viết hàm tra chiều cao địa hình. Muốn làm
địa hình thật cho cả bản đồ thì phải tra chiều cao cho từng thứ một, kể cả
`nhanVat.position.y` — đó là việc khác, đừng lẫn vào đây.

Chỗ sông cắt qua vành ngoài phải **ép phẳng** (sông chạy tới x = ±62, tức ra
ngoài vòng 52), nếu không gò nhô lên xuyên qua mặt nước.

Vân cỏ dùng **ba tần số** chồng lên nhau. Một tần số thôi thì ra những mảng
tròn đều, nhìn phát hiện ngay là hàm sin.

Khi tính màu theo vị trí, nhớ mặt đất xoay -90° quanh X nên đỉnh `(x,y)` rơi
xuống thế giới thành `(x, 0, -y)`. Quên dấu trừ thì vân cỏ và bờ cát lệch sang
đúng phía đối diện so với sông thật.

### Một nguồn dữ liệu, nhiều nơi dùng

Đã dính **ba** lần vì chép lại hình dạng thay vì lấy từ nguồn — cùng một công
thức sai, cùng một kiểu hỏng:

- **Sông trên bản đồ vẽ ngược phía** suốt bấy lâu. Bản đồ dùng một công thức
  sin riêng, `z = sin(x*.05)*7 + 8`, cho z từ 1 tới 15 — toàn dương; mà
  `vienSong` đo được nằm ở z từ **-21 tới 2**. Nay bản đồ vẽ thẳng từ
  `vienSong`.
- **Lối mòn** nay khai ở `TUYEN_MON` ngoài hàm `loiDi()`, để bản đồ vẽ lại
  chính mạng ấy.
- **Cỏ mọc giữa sông.** `coLua()` và `luongHoa()` né sông bằng đúng công thức
  sin sai ấy. Đo bằng 200 000 mẫu trong cảnh đang chạy: **8,25%** số vị trí
  lọt qua guard cũ nằm trên mặt nước — với 900 bụi cỏ là khoảng **74 bụi mọc
  giữa dòng**. Nay cả hai dùng `xaSong()`, và đếm lại được **0** bụi trên
  nước.

Quy tắc rút ra: hễ thấy một hằng số hình học viết tay ở chỗ thứ hai, đi tìm
nguồn của nó. Ba lần rồi.

Danh sách lối mòn cũ là **một đường đi liền mạch**, nên muốn rẽ nhánh phải
quay ngược lại — mỗi lần quay ngược dựng thêm một tấm phẳng nằm đè khít lên
tấm cũ, cùng `y = 0,07`, hai mặt tranh nhau. Đếm được 16 tấm cho 11 đoạn thật.
Nay viết thành từng **tuyến riêng** rồi bỏ trùng bằng khoá hai đầu đoạn: 14
tấm cho đủ **tám** khu.

Trước đó hai khu **không hề có lối mòn nào dẫn tới** — «Lối kể chuyện»
`(-16,42)` và «Kho tương lai» `(-12,-38)`.

## Ánh sáng trang viên

Số thật **không nằm ở chỗ khai đèn** mà ở `BC_CH` — bảng bốn thời khắc
(`sang` / `chieu` / `dem` / `noir`). `apThoiKhac()` ghi đè giá trị khởi tạo
ngay lúc nạp, nên sửa chỗ khai đèn là vô ích.

Thước đo là **tỉ lệ đèn phụ trên đèn chính**, và «đèn phụ» phải tính **cả đèn
trời lẫn đèn viền**. Trước đây tỉ lệ ấy là 0,81 ở buổi chiều (đèn trời 0,75 +
một đèn phụ cố định 0,35 mà `apThoiKhac()` không hề động tới, chia cho đèn nắng
1,35) — mọi khối được rọi gần như đều từ mọi phía nên cảnh bẹt hoàn toàn. Nay
giữ khoảng **0,31** cho hai buổi ban ngày.

Đã mắc một lần rồi: hạ đèn trời mà lại đặt đèn viền 0,52 thì **bù lại gần hết**,
tổng đèn phụ vẫn 1,04 — đo ra thì vùng tối không sâu thêm chút nào. Đèn viền
phải rất nhẹ (0,10–0,18).

Cũng đã mắc: nâng đèn chính **và** nâng phơi sáng cùng lúc thì vùng sáng cháy
trắng. Hình khối sinh ra từ **tỉ lệ**, không từ tổng lượng sáng — nâng đèn
chính thì giữ nguyên hoặc hạ phơi sáng.

Khung bóng `BONG_NUA` ±34 và **chạy theo tầm nhìn**: tâm đặt trước mặt nhân vật
`BONG_TRUOC` = 16 đơn vị theo hướng máy quay, không phải ngay dưới chân — đặt
dưới chân thì phần xa trong tầm mắt mất bóng. Mỗi texel còn 0,033 đơn vị thay
vì 0,051. Bóng «bơi» khi khung dịch không thành vấn đề ở đây: khung chỉ dịch
khi nhân vật hoặc máy quay động, mà lúc ấy cả cảnh đang động.

Vị trí đèn trong `nangViTri` phải **kéo về một khoảng cách cố định** (`NANG_XA`
= 72) rồi mới dùng. Đèn định hướng chỉ quan tâm hướng, mà mấy thời khắc mặt
trời thấp khai vị trí rất gần gốc toạ độ (noir: `[-18,9,21]`, dài 29) — để
nguyên thì có vật nằm gần đèn hơn mặt phẳng `near` của khung bóng và bị cắt.

### Đo thế nào

Chụp **cùng một khuôn hình** trước/sau: đặt thẳng `nhanVat.position` và
`gocMay`, đừng chờ nhân vật đi bộ tới. Nhớ **đóng bảng bản đồ** (nó tự mở ở
bước hướng dẫn đầu) *rồi mới* bấm qua ba bước `#th-guide-next` — bảng bản đồ
nằm trên nên hướng dẫn không bấm được.

Cắt một vùng thuần cảnh 3D rồi đo ba con số. «Độ lệch chuẩn» của cả vùng
**không dùng được** — nó lẫn màu khác nhau giữa các vật với bóng đổ trong một
vật, và đã cho kết quả sai một lần. Dùng:

- **bách phân vị 3 và 97**: vùng tối phải sâu xuống, vùng sáng nên giữ nguyên;
- **năng lượng tần cao** = độ lệch chuẩn của `ảnh − ảnh_làm_mờ(σ=9)`: đây mới
  là bóng đổ trong từng vật.

Đo ở buổi chiều, vùng các khối cầu: p3 172 → 130, biên độ 49 → 75, năng lượng
tần cao 8,24 → 14,15.

Máy chủ thử tại chỗ phải là bản **đa luồng** (`ThreadingMixIn`); bản
`python3 -m http.server` một luồng bị nghẽn khi Chromium mở nhiều kết nối, lần
tải sau treo luôn. Chặn `*.mp3/mp4` trong Playwright cho nhẹ.

## Kiến trúc tám khu

Mỗi khu trước đây chỉ là một đĩa đất tôn cao, một vành màu, và tấm biển trên
hai cột — không có thềm để bước lên, không có nét dọc nào, nên nhìn từ xa là
một cái đĩa chứ không phải một *chỗ*. Nay có bốn thứ lặp lại ở cả tám khu:
**thềm bậc, lan can, hai cột cổng có đèn, mái ngói nhỏ che biển** (`KT_HH`,
`dungKienTruc()`).

**Cổng đứng ở chân thềm, không phải trên nền.** Đặt trên nền thì hai cây cột
chỉ lạc giữa sân; đặt ở chân thềm thì khách đi xuyên qua rồi mới bước lên,
đúng thứ tự của một lối vào.

**Hình học khai một lần cho cả tám khu.** Đo trước khi làm: 1 603 mesh mà dùng
tới 1 161 hình học — gần như mỗi mesh một hình riêng. Hai thứ đông nhất (cột
lan can 64 cái, bậc thềm 24 cái) dựng bằng `InstancedMesh`. Kết quả: **+80
mesh nhưng chỉ +1 lệnh vẽ**, và số hình học còn *giảm* (1 161 → 1 157).

`InstancedMesh` đặt theo toạ độ **thế giới**, không phải toạ độ trong nhóm của
khu — nhớ cộng `khu.vt` vào.

Vòng lan can là `TorusGeometry` có `arc`. Torus nằm trong mặt phẳng XY và cung
bắt đầu từ góc 0; nhóm bao ngoài xoay -90° quanh X để hạ xuống mặt phẳng XZ,
khi ấy điểm góc φ rơi xuống `(R·cos φ, 0, −R·sin φ)` — nên muốn khoảng hở quay
về +z thì cung phải bắt đầu ở −90° cộng nửa khoảng hở.

### Biển chỉ đường chưa bao giờ hiện đúng

Lỗi có sẵn, đo mới thấy. Tấm biển vốn là một `ExtrudeGeometry` có dán ảnh,
nhưng `ExtrudeGeometry` **sinh toạ độ ảnh bằng chính toạ độ của hình phẳng**:
ở đây u chạy −2,2…2,2 và v chạy −1,1…1,1 thay vì 0…1. Đo được **91,9% số đỉnh
nằm ngoài khoảng 0…1**, mà kiểu bọc là `ClampToEdge`, nên gần hết mặt biển chỉ
là pixel mép bị kéo dãn. Thêm nữa, ảnh vẽ hình chữ nhật **bo góc** nên bốn góc
trong suốt, mà vật liệu không bật `transparent` → bốn góc hiện ra **đen**.

Sửa: mặt biển là `PlaneGeometry` (toạ độ ảnh đúng 0…1) đặt trước khung bo góc,
và ảnh lấp kín cả khung trước khi vẽ viền.

**`hopTron()` dày hơn con số truyền vào.** Nó là `ExtrudeGeometry` có vát dày
0,06 mỗi bên, nên `hopTron(w, h, .34, …)` thật ra dày **0,46**. Đặt mặt biển ở
z 4,10 trước khung ở 3,9 thì vẫn bị khung che, vì mặt trước của khung ở 4,13.
Phải 4,24.

## Máy quay và chế độ ngắm toàn cảnh

Ống kính đi bộ là **38°**, không phải 46° như trước. 46° là góc rộng của trò
chơi bắn súng: phối cảnh mạnh, vật gần phình ra, cả trang viên nhìn như đồ
chơi rải trên bàn. Cảnh tháp mượn của ThreeUI để **11°**, gần như phép chiếu
trực giao — nhưng 11° gắn lên máy quay bám nhân vật thì khách mất phương
hướng, đi vài bước là lạc.

Thu góc lại thì vật cũng nhỏ đi, nên **khoảng cách máy quay phải nhân lên
`tan(23°)/tan(19°) = 1,23`** mới giữ được cỡ khuôn hình. Độ cao nhân 1,12.
Quên bước này thì nhân vật teo lại giữa màn hình.

**Chế độ ngắm toàn cảnh** (`doiNgamCanh()`, phím `C`, nút trong bảng bản đồ):
máy quay rời nhân vật, bay một vòng quanh trang viên ở bán kính 104, cao 50,
ống kính **20°**. Đây là chỗ duy nhất dùng được ống kính thật dài. Ba thứ phải
đổi theo, nếu không khuôn hình hỏng:

- **Khung bóng mở ra ±58.** Khung ±34 chạy theo tầm nhìn chỉ hợp lúc đi bộ; ở
  đây cả trang viên nằm trong khuôn hình nên chỗ nào mất bóng là thấy ngay.
- **Sương kéo xa gấp 2,6 lần.** Sương vốn đặc hẳn từ 130 đơn vị, mà máy quay
  đứng cách tâm 104 — để nguyên thì cả trang viên chìm trong sương. Tính hệ số
  ngay trong `apThoiKhac()` chứ không tính lúc bật, để đổi thời khắc giữa
  chừng vẫn đúng.
- **Cất mây.** Mây bay ở độ cao 20–30 nên có đám rơi đúng trước ống kính, che
  nửa khuôn hình.

**Dọn màn hình thì làm ngược lại đừng liệt kê.** Năm mô-đun trò chơi tự gắn
thẻ của chúng vào `body` lúc chạy, nên danh sách viết tay luôn lạc hậu — đã
thử và sót đúng bốn cụm. Quy tắc dùng được là
`body.dang-ngam > *:not(#san):not(#ngam-meo){display:none !important}`.

## Bảng màu trang viên

### Đếm màu cho đúng

`trangvien.html` có **ba khối `<style>`**. Cắt CSS bằng
`s.replace(''.join(cac_khoi), '')` thì **không khớp gì cả** — phép nối chỉ ra
một chuỗi liền, mà trong tệp ba khối nằm rời nhau. Đã đo sai một lần vì thế và
báo nhầm «108 màu trong cảnh 3D»; đúng ra là 58. Phải xoá theo **vị trí đầu
cuối**, không xoá theo chuỗi.

Bốn vùng màu tách bạch, đừng trộn khi đếm hay khi sửa:

| vùng | là gì | có được đụng không |
| --- | --- | --- |
| ba khối `<style>` | giao diện, bộ màu đất sét chung của trang web | không, đấy là việc khác |
| `BC_CH` | bốn thời khắc | chỉ sửa có chủ đích |
| mảng `KHU` | tám màu khu + HTML trong bảng nội dung | tám màu khu là **neo**, không đổi |
| còn lại | cảnh 3D + `TRANH_KHU` | đây mới là chỗ gom màu |

### Gom màu: bỏ bản sao, đừng đổi ý đồ

Gom theo **ΔE trong không gian Lab**, duyệt từ màu dùng nhiều tới màu dùng ít,
giữ màu đầu của mỗi cụm. Ngưỡng **ΔE < 8** là chỗ mắt không phân biệt được
từng màu một. Neo cố định: tám màu khu, nước, năm sắc cỏ của mặt đất, lối mòn,
chấm hồng của nhân vật, và ba bậc giấy `#FFFCF5` / `#F6F1E7` / `#E2D8C7` lấy
từ chính bộ màu đất sét của trang web — nhờ thế cảnh 3D và các trang web dùng
chung một họ giấy.

Kết quả: cảnh 3D **58 → 46** màu, tám bức vẽ bản đồ 38 → 33, cả tệp 261 → 243.
Lệch lớn nhất khi gom: ΔE 7,8.

### Nhiều sắc không phải là vấn đề — cùng một bậc sáng mới là

Bốn màu `tham` trong `BC_CH` tô **14 vòng tròn bán kính 3–9** phủ phần lớn mặt
đất. Đo ra thì chúng chênh nhau **1 bậc sáng** ở buổi chiều (81, 79, 80, 79),
và 4–7 bậc ở ba thời khắc kia. Bốn màu mà về giá trị sáng là một, nên mặt đất
không có lớp lang dù có tới bốn sắc.

Cách sửa: **giữ nguyên sắc và độ bão hoà, chỉ trải lại độ sáng** quanh đúng
giá trị trung bình cũ, bốn bậc cách nhau khoảng 21 điểm. Giữ trung bình thì độ
sáng chung của cảnh không nhảy, chỉ có cấu trúc hiện ra — đo được: trung vị
giữ nguyên 209, còn bách phân vị 3 xuống 136 → 125 và năng lượng tần cao lên
14,86 → 18,91.

Với noir và đêm phải **chặn sàn** độ sáng (không dưới 0,03) kẻo ra mảng đen
đặc.

## Cảnh tháp mượn từ ThreeUI (`assets/canh/thap.html`)

Bóc từ `src/shaders/japanese-tower/Towers.html` của
<https://github.com/MengTo/threeui> — **MIT, Copyright (c) 2026 Meng To**,
toàn văn ở `assets/vendor/threeui-LICENSE.txt`. Kho ấy là thư viện **React**
(`peerDependencies: react >=18 <20`), cần npm + Vite, nên **không cắm thẳng
vào trang tĩnh được**. Nhưng trong `src/shaders/**` có 70 tệp `.html` chạy độc
lập — chính bản vanilla trước khi bọc React. Đấy là đường dùng được.

Bốn điều đã đo, để lần sau khỏi dò lại:

- **2,4 MB của tệp gốc gần hết là dữ liệu nhúng**: 593 KB three.js, 1 063 KB
  nhạc nền base64 (44% tệp), 564 KB ảnh nền. Mã cảnh thật chỉ ~190 KB. Bỏ
  three và nhạc thì còn 712 KB. `loadBuf()` vốn đã trả về null khi khoá rỗng
  nên bỏ nhạc không phải sửa gì thêm.
- **Chạy được trên r128** dù kho khai `three >=0.149`: cảnh chỉ dùng 40 lớp,
  đều có từ r128, và đã có sẵn nhánh `if(...!==undefined)` cho cả
  `sRGBEncoding` lẫn `SRGBColorSpace`. Kiểm bằng Chromium: không lỗi nào.
- **Nhãn các nút do JS ghi lúc chạy** từ `id` trong `STYLES`/`WEATHER`/`TIMES`.
  Sửa chữ trong HTML là vô ích — phải dịch trong `setBtn()`. Cũng vậy,
  `applyStyle(2)` ở cuối tệp mới quyết định kiểu lúc mở, không phải giá trị
  khởi tạo của `styleIdx`.
- **`.sub-cn` ghi bằng `textContent`**, nên `&nbsp;` hiện ra thành chữ. Muốn
  khoảng trắng không ngắt thì dùng thẳng ký tự U+00A0.

Bản gốc hiện **phần trăm âm** vài giây đầu (đo được −19%) vì mốc thời gian bắt
đầu trước 0 cho máy quay kịp ổn định. Đã chặn ở chỗ hiện chữ, không đụng đồng
hồ.

Ba chỗ nữa đã vấp rồi mới thấy:

- **Tệp gốc viết `<!doctype html>` chữ thường.** Tìm `<!DOCTYPE html>` chữ hoa
  thì `str.replace` không báo gì mà cũng không làm gì - ghi nguồn MIT tưởng đã
  chèn hoá ra không có. Chèn xong phải kiểm lại bằng `grep`, đừng tin lời gọi.
- **Bảng màu phải khai ở cả hai nơi.** `THEMES` trong JS ghi đè lúc chạy, nhưng
  khung hình đầu tiên vẫn vẽ bằng `:root`, nên để nguyên thì loé bảng màu cũ
  một nhịp.
- **Đừng đổi tên `const T=THREE`** để lấy chữ `T` cho hàm dịch: có 169 chỗ gọi
  `T.`. Hàm dịch ở tệp này tên là `TR()`.

Trang nhúng vào khu «Kho tương lai» của trang viên bằng iframe, **gắn lúc mở
bảng và gỡ lúc đóng** (`gamThap()` / `goThap()` trong `trangvien.html`): đây là
cảnh WebGL thứ hai, để nó chạy song song với trang viên thì nặng máy, mà gỡ
node là cách chắc chắn nhất để trình duyệt thả ngữ cảnh WebGL và vòng lặp vẽ.
Ngôn ngữ truyền qua `?lang=` vì trong iframe nó không thấy thẻ `<html>` của
trang cha.

**Không khai trong `sw.js`**: tệp nặng 718 KB, thêm vào thì bộ nhớ đệm tăng
16%, mà đây chỉ là phần tô điểm - không có mạng thì bảng khu vẫn đọc được, chỉ
thiếu cảnh tháp.

Kiểu tháp Việt Nam (`buildThap`, các giai đoạn NỀN MÓNG → THÂN THÁP → MÁI NGÓI
→ TẦNG TRÊN → ĐỈNH THÁP) **có sẵn trong bản gốc**, không phải ta thêm vào.

Cảnh nào khác trong kho ấy cũng cần đối chiếu trước: phần lớn kéo Tailwind,
GSAP, Iconify, Google Fonts, và ảnh từ kho Supabase riêng của tác giả —
`ASSET-LICENSES.md` nói rõ **media ngoài không thuộc giấy phép MIT**.

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
3. Độ phủ là nhị phân. Lấy màu của pixel **sáng hơn 40 và là vật liệu thật**
   gần nhất trong lõi, thay vào **hai chỗ**: ngoài lõi (thân co vào 2px), *và*
   những pixel do bước 2 thêm vào mặt nạ. Vế thứ hai dễ quên: pixel khép mép
   hay lấp lỗ thêm vào vốn là nền đen, nằm sâu quá thì quy tắc "ngoài lõi"
   không với tới, nên chúng giữ nguyên màu đen và hiện ra thành **chấm đen
   rải dọc viền** — kẽ ngón tay, mép tóc, khe giữa các lọn. Đo ở dáng chào:
   đúng 310 pixel như thế. Sửa xong thì pixel đen trung tính của cả tám tấm
   giảm 4739 → 545, riêng dáng đạp xe 1740 → 29.
   Pixel cho màu cũng phải là vật liệu thật, nếu không mấy lỗ đen vừa lấp sẽ
   cho màu ra viền và mép áo dài trắng dính đốm đen.
4. Thu nhỏ về cỡ đích bằng LANCZOS. **Chính bước này sinh ra độ phủ từng phần
   ở mép**, đúng đắn, thay cho việc ta ngồi đoán.

Đừng lấy "tỉ lệ pixel mép còn tối" làm thước đo: tóc sẫm ở mép vốn phải tối,
nên con số ấy cao hay thấp không nói lên điều gì. Phóng to mà nhìn. Muốn đo
bằng số thì đếm pixel **đặc và đen trung tính** — `max(RGB) < 38` *và*
`max - min < 14` — vì nền là đen trung tính còn tóc là nâu (R hơn hẳn B).
Đã ba lần dùng nhầm thước và ba lần tưởng xong trong khi chưa xong.

Công thức trên là cho **tám dáng của Hương**, nguồn độ phân giải đầy đủ, tóc
nâu. Năm nhân vật kia (`npc-*.webp`) là ảnh chụp màn hình điện thoại, tóc đen,
và hỏng ở đúng ba chỗ khác — đã sửa, ghi lại để khỏi mắc lại:

1. **Khung đầu nhỏ hơn cỡ đích thì bước 4 không hề xảy ra.** Đầu của Linh,
   Minh, Mai, Tùng chỉ 318–357px mà đích là 360, tức là đang **phóng to**.
   Độ phủ từng phần ở mép vì thế không sinh ra được: alpha ở lại dạng nhị phân
   đúng độ phân giải gốc, mép thành bậc thang và lốm đốm — nhìn là «bể».
   Cách sửa: **lấy mẫu gấp ba** (độ sáng nội suy song tuyến, màu nội suy
   LANCZOS) rồi mới ngưỡng, sau đó thu về 360. Mép cắt khi ấy nằm dưới mức
   pixel gốc, thu nhỏ xong thành độ phủ từng phần thật. Trước khi chạy, hãy
   **in ra tỉ lệ đích/nguồn**; lớn hơn 1 là đang phóng to, phải lấy mẫu thêm.

2. **Đừng lấp lỗ thủng theo diện tích.** Ngưỡng 200px là của ảnh Hương. Tóc
   đen sẫm hơn ngưỡng 12 nên bị đục thủng thành mảng lớn tới 2349px, để trống
   thì hiện ra vết trắng giữa tóc. Đo cả năm tấm: mọi lỗ khép kín đều có độ
   sáng trung bình 4–12 và gần như không pixel nào bằng 0, trong khi nền thật
   thì 99,99% bằng 0. Nên xét **thành phần của lỗ**, không xét diện tích: lỗ
   nào có quá 70% pixel bằng đúng 0 mới là nền nhìn xuyên qua. Ngưỡng lại ở
   mức gấp ba còn đục thêm chấm nhỏ, nên sau đó khép một vòng rồi lấp hết lỗ
   khép kín lần nữa.

3. **Lỗ đã lấp thì giữ nguyên màu của chính nó.** Bước 3 bảo thay màu cho mọi
   pixel mà bước 2 thêm vào — đúng với ảnh Hương, vì lỗ ở đó chỉ vài chục
   pixel nền đen. Ở đây lỗ là tóc thật, thay hết thì cả mảng tóc bị bôi phẳng
   thành vệt trơn (tóc tết của Linh thành khối ô liu bẹt). Chỉ thay pixel
   **đen tuyệt đối** (`max(RGB) ≤ 2`) nằm lọt trong thân, và lấy màu từ **vật
   liệu bất kỳ** kể cả tóc sẫm — lấy từ vật liệu sáng thì thành đốm sáng giữa
   tóc.

Với năm tấm này, thước «đặc và đen trung tính» **không dùng được**: tóc các
nhân vật vốn đen trung tính nên số đếm 2000–9000 là tóc thật, không phải nền
lọt vào. Chỉ `an` (tóc bạc) đo được: 315. Phải phóng to mà nhìn. Một con số
dùng được là **số pixel mép có độ phủ từng phần**: nếu gần bằng 0 thì alpha
vẫn nhị phân, tức là chưa hề thu nhỏ.

Đổi ảnh nhân vật thì nhớ `DANG_TL` trong `trangvien.html` và cặp
`width`/`height` của ảnh chữ ký trong `music.html` — đọc thẳng từ tệp, đừng
chép tay.

Thêm `width`/`height` vào một thẻ `<img>` vốn chưa có thì **phải xem lớp CSS
của nó có `height:auto` chưa**. Thiếu, mà CSS lại đè `width`, thì chiều cao
lấy nguyên con số trong thuộc tính và ảnh bị bóp ngang — `.anh-nv` trong
`trangvien.html` đã vấp đúng thế: ảnh vuông 360×360 hiện ra thành 210×360.

## Gỡ dấu chìm khỏi video

Đã làm một lần cho dấu bốn cánh của Gemini ở `assets/video/trangvien-intro.mp4`.
Ghi lại vì cách làm đúng khác hẳn cách làm đầu tiên nghĩ ra.

**Đừng bôi xoá.** `delogo` của ffmpeg nội suy từ mép hộp, nên trên nền có nét —
song cửa gỗ, lá sen — nó để lại một vệt nhoè trôi theo khung hình. Dấu chìm ở
đây là **một lớp màu phủ có độ phủ cố định**, nên giải ngược được:

    nền = (quan sát − α·trắng) / (1 − α)

Khớp α thế nào: chọn những khung mà **vành quanh dấu chìm phẳng** (độ gồ ghề
< 9 mức), coi nền dưới dấu bằng trung vị vành, rồi bình phương tối thiểu qua
tất cả các khung ấy. Ở đây 81 khung, nền trải từ 20,7 tới 208,7 — đủ rộng để
α không bị nền nào kéo lệch. Kết quả α tối đa 0,567; sai số còn lại trong lõi
3,4 mức sáng.

Ba chỗ đã vấp:

- **Một khung không đủ.** Lấy α từ riêng thẻ kết (nền kem phẳng) thì ba kênh
  R/G/B ra ba giá trị khác nhau 0,10 — dấu hiệu mô hình sai. Giải bằng **hai
  nền phẳng rất khác nhau** (kem 229 và gỗ sẫm 48) thì ba kênh khớp nhau trong
  0,003, và lộ ra lớp phủ đúng là **trắng**.
- **Làm trong RGB thì sao còn ngả đỏ.** Vì video là `yuv420p`: màu chỉ có nửa
  độ phân giải nên vệt màu của dấu chìm nhoè rộng hơn chính nó. Cách đúng là
  **tách ra**: kênh sáng thì giải ngược, hai kênh màu thì **lấp lại** từ xung
  quanh (nới mặt nạ thêm 2 px). Màu vốn trơn nên lấp không mất gì.
- **Viền tối quanh sao** là nhiễu nén của bản gốc bị khuếch đại `1/(1−α)` ≈ 2,3
  lần. Lấp riêng **dải mép** (nơi `|∇α| > 0,03`, ở đây 608 điểm = 0,066% khung
  hình) bằng nghiệm Laplace, giữ nguyên phần lõi đã giải đúng.

**Thước đo dùng được là tương quan với chính mặt nạ dấu chìm**, không phải
«trung bình trong hộp so với vành» — thước sau đo nội dung cảnh chứ không đo
dấu chìm, và đã cho kết quả vô nghĩa một lần (khung 24 ra −45 trong khi ảnh
nhìn hoàn toàn bình thường). Đo tương quan: **0,862 → 0,071**, trong khi nền
nhiễu tự nhiên đo ở sáu ô không hề có dấu chìm là 0,021. SSIM so bản gốc 0,989.

Ảnh bìa cắt ra từ video cũng mang dấu chìm — nhớ dựng lại. Tìm đúng khung đã
cắt bằng tương quan toàn ảnh (ở đây khung 49, giống 0,9998), và chọn chất lượng
WebP sao cho **PSNR khớp bản cũ** (q=84 cho 39,28 dB so với 39,23 dB).

Gỡ dấu chìm không đổi nguồn gốc tác phẩm: chỗ ghi nhận là `THIRD-PARTY.md`, và
SynthID chìm vẫn còn trong tệp.

## Văn phòng nghiên cứu có HAI bản, phải sửa cả hai

`vanphong.html` trong kho này và `index.html` của kho
`thuyhuongctu/Research-Office` là **cùng một tệp**. Kho riêng là bản
chính thức để trích dẫn (có DOI Zenodo); bản ở đây là bản trưng bày trong hệ
sinh thái trang cá nhân.

Khác nhau đúng **hai chỗ**, và chỉ hai chỗ ấy:

- hai liên kết về trang chủ (`href="index.html"`) đổi thành địa chỉ tuyệt đối
  `https://thuyhuongctu.github.io/Je-mappelle-Huong/`;
- kho riêng có thêm `README.md`, `LICENSE`, `CITATION.cff`, `.zenodo.json`,
  `THIRD-PARTY.md`, `manifest.webmanifest` riêng, `.nojekyll` và quy trình dựng
  Pages riêng.

Sửa nội dung văn phòng thì **chép sang cả hai rồi kiểm cả hai**. Quên một bên
thì bản có DOI và bản đang chạy nói khác nhau — mà DOI là thứ người ta trích
dẫn. Lý do tách kho ghi ở `ho-so-quyen-tac-gia/05-ung-vien-tiep-theo.md`.

Kho riêng **tự chứa**: three.js, năm tệp phông, sáu tranh nhân vật đều chép
sang. Thêm một tệp mới vào văn phòng thì phải chép cả tệp ấy sang kho riêng,
nếu không bản có DOI sẽ 404 đúng chỗ ấy mà bản ở đây vẫn chạy bình thường —
lại thêm một kiểu hỏng âm thầm.

### Siêu dữ liệu Zenodo của kho riêng khai ở HAI tệp

`.zenodo.json` **đứng trên** `CITATION.cff` khi Zenodo dựng bản ghi cho một bản
phát hành. Đổi tiêu đề, tóm tắt hay từ khoá thì sửa cả hai — quên một bên thì
GitHub hiện một đằng (đọc `CITATION.cff`) còn Zenodo ghi một nẻo.

Hai chỗ đã đo, đừng dò lại:

- **Trường `license` chỉ nhận một mã trong bộ từ vựng có sẵn.** Tra
  `/api/vocabularies/licenses` thì cả bộ có đúng **một** mã không-mở dùng được:
  `other-closed` («Other (Not Open)»). Nên `.zenodo.json` **không** khai được
  câu chữ giấy phép đầy đủ; muốn đẹp thì sau mỗi lần phát hành vào Edit sửa một
  ô. Đánh đổi có chủ ý: được cái không bao giờ rơi lại vào mặc định
  `cc-by-4.0` — thứ nguy hiểm thật, vì nó cho phép người khác phát tán lại.
- **Đừng đặt `access_right: restricted`** dù tài liệu Zenodo có gợi ý thế cho
  tác phẩm không mở. `restricted` nghĩa là không ai tải được tệp, mà `LICENSE`
  của kho ấy viết rõ công trình «được công bố để đọc, tham khảo và trích dẫn».
  Đúng là `open` cộng giấy phép đóng.

`.zenodo.json` **cố ý không khai `version`**, để Zenodo lấy thẳng tên thẻ. Nên
đặt thẻ là `v1.1`, **không phải** `v.1.1` — bản đầu tiên đã lỡ mang tên `v.1.0`
đúng vì lẽ ấy và phải sửa tay.

## Trước khi thêm tệp mới

Đối chiếu đã. Nhiều tệp gửi tới hoá ra trùng với tệp đã có trong kho, hoặc là
bản chưa nén của tệp đã có. So bằng tương quan ảnh thu nhỏ, hoặc bằng khung
hình với video — đừng nhìn tên tệp mà đoán.

## Mật độ, và giới hạn của cách đo bằng số

Sau năm chặng nâng cấp, trang viên vẫn bị nhận xét là «chưa đẹp». Đo lại thì
nguyên nhân không phải ánh sáng cũng không phải bảng màu — cả hai đã sửa rồi.

Đếm trong cảnh đang chạy: **3 381 mesh, trong đó 2 455 là vật trang trí nhỏ**
(1 371 hình cầu dưới 1,2 đơn vị, 959 hình nón), rải **đều** khắp trang viên.
Mật độ đều nghĩa là không có khoảng trống, mà không có khoảng trống thì không
có hình khối. Mắt không tìm được chỗ nghỉ nên cảnh nhìn bẹt.

Cách sửa là **gụm thành cụm**: `TAM_KHOM` (20 tâm, tự tránh nhau, tránh nước
và tránh nền khu) cộng `diemKhom()` lấy điểm quanh tâm bằng trung bình ba số
ngẫu nhiên, nên cụm có lõi dày rìa thưa. `coLua` 900 → 430, `luongHoa` 420 →
192, chấm hoa 70 → 38. Tổng 3 381 → 2 653.

### Đây mới là chỗ quan trọng

**Mọi thước đo bằng số ở mục «Đo thế nào» đều ĐI LÙI sau khi sửa, trong khi
bức tranh khá lên rõ rệt.** Ngắm toàn cảnh, trước → sau:

| | trước | sau |
| --- | --- | --- |
| năng lượng tần cao | 18,52 | **15,08** |
| % trong dải hẹp 205–212 | 15,4% | **18,8%** |
| p50 → p97 | 23,84 | **18,58** |

Không phải sửa hỏng. Là vì **năng lượng tần cao đo mật độ chi tiết**, mà thưa
bớt đồ trang trí thì chi tiết tất nhiên giảm; còn tỉ lệ dải hẹp tăng chính vì
đã có cỏ trống thật — thứ vừa cố tạo ra.

Bách phân vị và năng lượng tần cao là thước đo của **độ tương phản và chất
liệu**, không phải của **bố cục**. Bố cục là thứ bậc và khoảng trống, không
thước nào trong số ấy đo được. Gặp lần sau thì **nhìn ảnh, đừng kéo con số lên
lại** — kéo lên là quay về đúng chỗ vừa thoát ra.

## Nước là khối tối của cảnh

Màu nước cũ `#9FD3E8` có độ sáng **201,5**, cỏ nền `#A9DDA0` là **205,5** —
cách nhau 4 bậc, nên con sông tan vào bãi cỏ và nhìn từ xa không thấy nước.
Nay dùng `#3F6F68`, tức đúng `--river` của bộ màu đất sét trang web, độ sáng
**100,3**: cách cỏ 105 bậc.

Kèm theo hạ `roughness` xuống .14 để mặt nước bắt nắng thành vệt sáng — dải
sáng vì thế mở ra ở **cả hai đầu** chứ không chỉ thêm một đầu tối.

Bốn màu cỏ cũng trải lại. `t` trong `veVanDat()` là tổng ba tích sin-cos nên
**dồn quanh 0,5**; cách cũ còn nhân 1,5 rồi kẹp, nên mọi đỉnh có t ≥ 0,667 đều
ra đúng một màu. Đo được: **52% khung hình nằm gọn trong 7 bậc sáng**. Nay kéo
độ lệch quanh 0,5 ra 1,9 lần rồi rải lên bốn bậc cách đều (118 → 171 → 205 →
227); khoảng cách p50→p97 lúc đứng giữa trang viên từ 5,8 lên 36,2.

## Tám khu phải khác dáng nhau

Chặng 4 dựng bộ kiến trúc dùng chung và cho cả tám khu **cùng** thềm, **cùng**
lan can, **cùng** cổng, **cùng** mái. Tưởng là cho chúng hình hài, hoá ra xoá
mất thứ làm chúng khác nhau: nhìn từ xa là tám cái vòng y hệt, không nhận ra
đâu là Nghiên cứu đâu là Âm nhạc. Trớ trêu là ngay trong tệp này đã có dòng
«Đừng để hai khu cùng một dáng» cho tám huy hiệu bản đồ — theo được ở đó rồi
làm ngược lại trong cảnh 3D.

Nay `KT_DANG` khai ba thứ quyết định bóng dáng cho từng khu:

- `vong`: `'tron'` (vành torus như cũ) / `'vuong'` (ba cạnh thẳng, chừa cạnh
  +z làm lối vào) / `'khong'` (bỏ hẳn, khu mở nhìn thấu qua);
- `mai`: có mái ngói nhỏ che biển hay không;
- `tru`: **một nét dọc riêng** — `dungTru()` dựng tháp vuông, khung chữ A,
  mái nhà sàn cao, vòm sân khấu, cột cờ, dãy đèn lồng, cột buồm.

Nét dọc là thứ đọc được **xa nhất** vì nó cắt lên nền trời. Đó mới là cái phân
biệt khu này với khu kia ở tầm nhìn từ giữa trang viên, chứ không phải màu vành
hay chữ trên biển.

### InstancedMesh: cắt `count` khi dùng ít hơn cấp phát

Chỗ này **suýt hỏng âm thầm**. `ktCotIM` cấp phát `KHU.length * KT_SO_COT` = 64
thể hiện từ hồi cả tám khu đều có lan can tròn. Nay ba khu bỏ lan can và hai
khu dùng lan can vuông bốn cột, nên chỉ đặt **32**. Thể hiện không đặt thì ma
trận là **đơn vị**, tức cột hiện ra ngay **gốc toạ độ**.

Đo trong cảnh đang chạy: để nguyên `count = 64` thì có **32 cột chồng lên nhau
giữa trang viên**; đặt `ktCotIM.count = ktCotN` thì còn **0**. Trang vẫn chạy
bình thường trong cả hai trường hợp nên rất dễ không nhận ra.

## Cụm nổi: đo cho đúng, rồi mờ đi khi đang đi

### Đừng đo bằng hộp bao

Lần đầu đếm bằng `getBoundingClientRect()` của các con trực tiếp của `body` và
báo **«13 cụm che 31,6% màn hình»**. Sai. Hai chỗ hỏng:

- `#vnmark` (bản đồ Việt Nam chìm) có `opacity: .07` và **`z-index: -1`**, tức
  nằm *sau* canvas — hộp bao 333×366 nhưng gần như vô hình. Đếm hộp bao thì nó
  thành cụm lớn nhất với 12,5%.
- `#hud-tren` có hộp bao rộng cả màn hình nên ra 10,6%, trong khi các nút thật
  bên trong chỉ chiếm **2,44%**.

Cách đo dùng được: phủ **lưới 4px**, duyệt xuống tới lá, chỉ tính phần tử **có
nền hoặc có chữ**, bỏ phần tử `opacity < .25` hoặc `z-index < 0` (và dừng đệ
quy ở đó luôn, vì con của một cụm đã mờ thì cũng mờ theo).

Đo lại cho đúng: **13,5% trên máy tính 1280, 27,5% trên điện thoại 390** — trên
điện thoại nặng **gấp đôi**.

### Mờ đi khi đang đi

Bỏ hẳn cụm nào cũng tiếc vì lúc đứng lại khách cần chúng. Nên: `body.dang-di`
cho cụm phụ mờ còn 0,12; đứng lại 0,4 giây thì hiện về. Mờ chứ không ẩn, để bố
cục không nhảy.

Lớp `.hud-phu` do JS gắn lúc chạy theo lối **loại trừ** (`HUD_GIU` kể ra những
cụm phải giữ), kèm `MutationObserver` trên `body` cho những cụm gắn muộn — vì
năm mô-đun trò chơi tự gắn thẻ lúc chạy nên danh sách viết tay luôn lạc hậu.

Đo được: **13,5% → 6,7%** trên máy tính 1280 và **27,5% → 11,8%** trên điện
thoại 390. Con số 6,7 khớp đúng phần giữ lại — `hud-tren` 3,13 + `ban-do` 1,74
+ `can` 1,58 + `skip-link` 0,25 = 6,70.

### Kiểm cái này: huỷ tour rồi bấm phím đi THẬT

Mất ba lượt đo sai mới ra. Hai cách giả lập «đang đi» đều **không dùng được**:

- `dungYen = 0`: vòng lặp cộng `dungYen += dt` nên 0,4 giây sau lớp `dang-di`
  tự tắt, đo xong ra số gần như không đổi;
- `dungYen = -1e6`: tưởng chắc ăn, nhưng **nhánh tour tự đi đặt lại
  `dungYen = 0` mỗi khung hình**, ghi đè luôn. Nên kịch bản nào có bấm qua ba
  bước hướng dẫn (tour chạy sau đó) thì ra một kết quả, kịch bản nào không bấm
  lại ra kết quả ngược — hai lần đo mâu thuẫn nhau mà cả hai đều sai.

Cách đúng: huỷ tour (`huyTour()`, `mucTieuDi = null`) rồi **giữ phím mũi tên**
bằng `keyboard.down('ArrowUp')`. Đo xong thì đọc luôn
`document.body.classList.contains('dang-di')` và `opacity` của một cụm mẫu để
biết chắc trạng thái lúc đo, đừng tin là mình đã đặt đúng.

Bài học chung: **giả lập trạng thái bằng cách gán biến thì phải kiểm xem có
nhánh nào trong vòng lặp ghi đè biến ấy không.** Ở đây có, và nó làm hỏng hai
lượt đo liền.
