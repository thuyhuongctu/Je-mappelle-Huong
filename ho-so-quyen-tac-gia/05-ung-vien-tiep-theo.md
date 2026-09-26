# Ứng viên tiếp theo — hai phòng lab của học phần Phân tích hoạt động kinh doanh

> **Ghi chú, không phải hồ sơ.** Bốn tệp `01`–`04` trong thư mục này là hồ sơ
> cho cảnh 3D «Trang viên tri thức» nằm trong chính kho này. Tệp `05` thì khác:
> nó nói về **hai tác phẩm ở kho khác** — `thuyhuongctu/BizOn`. Ghi ở đây vì đây
> là chỗ đang bàn việc; **chỗ ở thật của nó là `docs/ip/` bên kho BizOn**, nơi đã
> có sẵn hơn hai mươi tài liệu sở hữu trí tuệ.
>
> Như cả thư mục này: **bản thảo để tác giả dùng, không phải tư vấn pháp lý.**

Số liệu dưới đây đo trên nhánh `main` của kho BizOn, bản lấy về ngày
**26/09/2026** (`origin/main` khi ấy ở `5ea2271f`). Kho ấy đổi thường xuyên, nên
trước khi dùng hãy đo lại.

---

## Hai tác phẩm

| | CVP Studio | CMR Lab |
| --- | --- | --- |
| Đường dẫn | `lab/cvp-studio.html` | `lab/cmr-lab.html` |
| Cỡ | 63.660 byte · 1.045 dòng | 59.796 byte · 978 dòng |
| Nội dung | chọn nhóm · số liệu doanh nghiệp · đồ thị CVP · lợi nhuận mục tiêu · biên an toàn (MoS) · diễn giải bằng lời · thử thách · bảng xếp hạng lớp | chọn nhóm · số liệu doanh nghiệp · túi đỏ hình ảnh hoá · chỉ số tính được · thử thách · bảng xếp hạng lớp · Level Up |

Về chuyên môn, đây là nội dung học phần **Phân tích hoạt động kinh doanh** —
điểm hoà vốn, số dư đảm phí, đòn bẩy kinh doanh. Nhưng chúng được **viết cho
học phần EC1314** («Mô phỏng tình huống trong kinh doanh»), làm buổi 3 và buổi 4.
Khi viết mô tả tác phẩm nên nói rõ cả hai điều ấy, đừng chọn một.

---

## Vì sao đóng gói được dễ hơn hẳn Trang viên

Đo trên cả hai tệp:

- **`<script src>` và `<link href>` trỏ ra ngoài tệp: 0.**
- **Lời gọi mạng lúc chạy (`fetch`, `XMLHttpRequest`, `WebSocket`, Supabase): 0.**
- Toàn bộ CSS và JavaScript **nội tuyến** — mỗi tệp một khối `<script>`, ba đến
  bốn khối `<style>`.
- Lưu trữ trên máy khách: chỉ `localStorage`.
- Đường dẫn tương đối: đúng **hai** cái, `../lop-hoc.html` và `../universe.html`,
  cả hai chỉ để đi lại giữa các trang, không phải thứ tệp này cần mới chạy được.

Nghĩa là **mỗi tác phẩm là một tệp HTML tự chứa**. Hệ quả cho hồ sơ:

1. **Bản sao nộp lưu chiểu chỉ là một tệp**, không phải một cây thư mục. Không
   cần cắt gọt, không cần giải thích tệp nào thuộc tác phẩm tệp nào không.
2. **Không phải kiểm kê mã bên thứ ba.** Trang viên phải khai three.js r128 và
   cảnh tháp bóc từ ThreeUI (xem tệp `04` và `THIRD-PARTY.md`); hai lab này
   không có gì tương tự để khai.
3. **Không có phần máy chủ**, nên không vướng câu hỏi dịch vụ đám mây hay dữ
   liệu người dùng.

Đây là điều kiện hiếm. Phần lớn tác phẩm phần mềm không được như vậy.

---

## Bằng chứng tác giả đã có sẵn

Tra lịch sử git của kho BizOn (300 commit gần nhất của `main`):

- Cả hai tệp ra đời cùng một commit, **`146ac1d`, ngày 03/08/2026**, thuộc
  PR #326 — tiêu đề: *«Lab EC1314: thêm CMR Lab (buổi 3) + CVP Studio (buổi 4),
  nối từ Kịch bản lớp học»*.
- Tổng cộng **3 commit** chạm vào hai tệp, **tất cả cùng một tác giả**:
  `Je m'appelle Huong <thuyhuongctu@gmail.com>`.

Mốc thời gian và tác giả đều có sẵn, không phải dựng lại. Kết xuất kèm hồ sơ:

```bash
# chạy trong kho BizOn
git log --reverse --date=format:'%d/%m/%Y' --pretty='%ad  %an  %s' \
  -- lab/cvp-studio.html lab/cmr-lab.html
```

---

## Khoảng trống: chúng chưa được khai ở đâu cả

Kho BizOn đã có `docs/ho-so-so-huu-tri-tue.md` và thư mục `docs/ip/` với hơn hai
mươi tài liệu, trong đó có **ba bản mô tả tác phẩm** (đều đề ngày 17/09/2026):

- `BIZON-ARCADE-MO-TA-TAC-PHAM-DRAFT-2026-09-17.md`
- `BIZON-GO-GLOBAL-MO-TA-TAC-PHAM-DRAFT-2026-09-17.md`
- `HO-CHIEU-THUONG-HIEU-MO-TA-TAC-PHAM-DRAFT-2026-09-17.md`

Đã tìm chuỗi «CVP Studio» và «CMR Lab» trong **toàn bộ** `docs/ip/`,
`docs/ho-so-so-huu-tri-tue.md` và `docs/bieu-mau-dang-ky-quyen-tac-gia.md`:
**không có kết quả nào.** Hai lab chưa nằm trong hồ sơ nào.

---

## Hai điều phải quyết, và phải quyết bên kho BizOn

**1. Nộp riêng hay gộp?** Hồ sơ BizOn đã có mục **B1 · Chương trình máy tính**.
Hai lab có thể thành một bản mô tả tác phẩm riêng (theo đúng khuôn ba bản đã có),
hoặc bổ sung vào phạm vi B1. Nộp riêng thì ranh giới tác phẩm gọn hơn — mà như
đo ở trên, ranh giới ấy vốn đã gọn sẵn.

**2. Chủ sở hữu — câu hỏi Điều 39, và ở đây khó hơn Trang viên.** Tệp `03` trong
thư mục này cam đoan Trang viên được tạo ra *ngoài nhiệm vụ được giao*.
**Đừng chép cam đoan ấy sang đây.** Hai lab được viết làm học liệu cho một học
phần đang dạy, commit còn ghi thẳng mã học phần; hoàn cảnh khác hẳn, nên phải
xét lại từ đầu chứ không suy ra được.

Kho BizOn đã có sẵn chỗ để xử việc này, không cần dựng mới:

- `docs/ip/BIZON_AUTHORSHIP_OWNERSHIP_MATRIX_2026-08-03.md`
- `docs/ip/BIZON_CHAIN_OF_TITLE_DRAFT_2026-08-03.md`
- `docs/ip/BIZON_CTU_CONFIRMATION_REQUEST_DRAFT_2026-08-03.md`

Cả hai câu hỏi đều nên hỏi người hành nghề luật sở hữu trí tuệ — cùng lúc với
hai việc đang treo đã ghi ở tệp `01` và `04`: loại hình đăng ký, và cách khai
phần do máy hỗ trợ.

---

## Văn phòng nghiên cứu (`vanphong.html`) — cũng đóng gói được

Thêm ngày 26/09/2026. Cùng loại với hai phòng lab ở trên: **một tệp HTML tự
chứa**, nhưng nằm trong **chính kho này**, không phải kho BizOn.

| | |
| --- | --- |
| Đường dẫn | `vanphong.html` |
| Nạp từ ngoài | **0** — three.js lấy từ bản chép trong kho, bộ chữ tự chứa |
| Gọi mạng lúc chạy | **0** — đo bằng Chromium, không một yêu cầu nào ra ngoài |
| Tranh nhân vật | `assets/img/huong-ai-chao.webp` — đã có sẵn trong kho này |
| Nội dung hỏi đáp | tác giả viết, lấy từ các trang khác của kho |

Nội dung góc Kinh doanh quốc tế là **kiến thức giáo trình phổ thông** — thang
phương thức thâm nhập và lý thuyết neo cho từng bậc (Uppsala, chi phí giao
dịch, lý thuyết đại diện, khung CAGE, quan điểm dựa trên nguồn lực,
born-global, mô hình OLI). Cách trình bày là của tác giả; bản thân các lý
thuyết thì không ai độc quyền.

---

### Tách ra kho riêng, và vì sao

Quyết ngày 26/09/2026: văn phòng **tách sang kho riêng
`thuyhuongctu/van-phong-nghien-cuu`**, không lưu trữ Zenodo từ chính kho này.

Lý do là chuyện ranh giới tác phẩm, đo được:

| | |
| --- | --- |
| Kho `Je-mappelle-Huong` | **887 tệp, 361 MB** — riêng `assets/audio/` đã 306 MB |
| `vanphong.html` | 52 KB |
| Cả gói văn phòng kèm phụ thuộc | **≈ 1,3 MB** |

Liên kết Zenodo–GitHub lưu trữ ở mức **kho**: mỗi bản phát hành, Zenodo tải cả
ảnh chụp kho rồi cấp DOI cho ảnh chụp ấy. Bật ở kho này thì bản ghi Zenodo của
«văn phòng» sẽ gồm 20 bản thu nhạc, các video và toàn bộ 41 trang — tức là
gộp vào đúng những thứ mà mục **«Hai chỗ về giấy phép phải làm rõ»** bên dưới
đang nói là chưa rõ chủ sở hữu. Kho riêng thì ranh giới gọn hẳn: **một tác
giả, hai thành phần bên thứ ba, không tệp âm thanh nào.**

Kho này vốn đã có DOI khái niệm riêng cho cả trang web —
`10.5281/zenodo.22003853`, khai trong `CITATION.cff`. Văn phòng cần một DOI
khác, không phải chen vào DOI ấy.

**Bản trong kho này không xoá.** `vanphong.html` ở lại làm bản trưng bày trong
hệ sinh thái trang cá nhân; kho riêng là **bản chính thức để trích dẫn**. Đổi
nội dung thì phải sửa cả hai — quy tắc ấy đã ghi vào `CLAUDE.md`.

Kho riêng gồm: `index.html` (chính là `vanphong.html`, chỉ đổi hai liên kết về
trang chủ thành địa chỉ tuyệt đối), three.js r128, năm tệp phông, sáu tranh
nhân vật, bộ biểu tượng, cùng `README.md` hai thứ tiếng, `LICENSE`,
`CITATION.cff`, `THIRD-PARTY.md` và một quy trình dựng GitHub Pages.

Đã kiểm cả gói khi tách ra, chạy bằng Chromium trên máy chủ tại chỗ:
**0 yêu cầu ra ngoài, 0 phản hồi ≥ 400, 0 lỗi trang, 0 tràn ngang**, cả tiếng
Việt lẫn tiếng Anh; **20/20 đường dẫn** được nhắc trong `index.html`,
`fonts.css` và `manifest.webmanifest` đều phân giải được; sáu tranh nhân vật
giải mã đúng cỡ (307×820 và năm tấm 360×360).

---

## Hai chỗ về giấy phép phải làm rõ TRƯỚC khi nộp bất cứ hồ sơ nào

Phát hiện khi đối chiếu hai kho, ngày 26/09/2026. Không phải việc sửa mã, mà
là việc của tác giả và người đồng sở hữu.

### 1. Tạo hình nhân vật BizOn là tài sản đồng sở hữu

`LICENSE` của kho `thuyhuongctu/BizOn`, mục «PHẠM VI BẢO HỘ», ghi nguyên văn:

> Bản quyền © 2026 Đỗ Thùy Hương **và Phan Anh Tú**. BẢO LƯU MỌI QUYỀN.
> […] **Tạo hình các nhân vật: Lumina (Je m'appelle Hương), Tú Phan, Đội Demo
> 5 thành viên**, cùng mọi tài sản đồ họa 3D claymorphism trong `assets/`

Và `docs/ip/BIZON_AUTHORSHIP_OWNERSHIP_MATRIX_2026-08-03.md` ghi phần nhân vật
là *«Hương & Tú, trừ quyền hình ảnh cá nhân và bên thứ ba»*, trạng thái
*«Cần hồ sơ riêng»*.

**Hệ quả cho văn phòng:** đã cân nhắc chép sáu tấm ảnh nhân vật đã cắt nền từ
BizOn sang cho đẹp hơn, nhưng **không làm**. Chép sang thì `vanphong.html`
không còn là tác phẩm một tác giả, tức phải có thoả thuận với người đồng sở
hữu trước khi đăng ký. Hiện chỉ Hương dùng tranh của chính kho này; năm nhân
vật đội demo vẫn là khối hình đơn giản.

### 2. Cùng một bộ bản thu, hai giấy phép nói khác nhau

| | |
| --- | --- |
| `LICENSE` của **kho này** | «© 2026 Đỗ Thùy Hương. All rights reserved… **the audio recordings**… are the copyrighted work of **the author**» — một tác giả |
| `LICENSE` của **BizOn** | «© 2026 Đỗ Thùy Hương **và Phan Anh Tú**» — phạm vi bảo hộ gồm «Kho âm nhạc gốc (**«Hương on Return», «Vừa Đủ Để Bay Cao», «Hương sans frontières», «Bật Nghiệp»**…)» |

Mà kho này đang chứa **20 tệp** trong `assets/audio/bizon/`, trong đó có đúng
`huong-on-return.mp3`, `vua-du-de-bay-cao.mp3`, `huong-sans-frontieres.mp3`,
`bat-nghiep.mp3`.

Hai văn bản đang nói khác nhau về cùng một bộ bản thu. Có thể giải thích được
— ví dụ tác giả là người sáng tác duy nhất còn giấy phép BizOn quét rộng để
bảo hộ cả gói — nhưng **đó là lời giải thích cần được viết ra và hai bên xác
nhận**, chứ không nên để hai giấy phép công khai mâu thuẫn nhau khi hồ sơ đăng
ký đang chuẩn bị.

Hai việc này nên hỏi cùng lúc với ba việc đang treo ở tệp `01` và `04`.
