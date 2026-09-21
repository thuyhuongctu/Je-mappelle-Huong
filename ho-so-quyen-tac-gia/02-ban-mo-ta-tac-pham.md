# 02 — Bản mô tả tác phẩm

**Tên tác phẩm:** Trang viên tri thức
**Tên tiếng Anh:** The Knowledge Estate
**Tác giả:** Đỗ Thùy Hương
**Loại hình:** Chương trình máy tính / tác phẩm mỹ thuật ứng dụng (xem tệp `01`)
**Ngày bắt đầu:** 18/8/2026
**Ngày hoàn thành phiên bản đăng ký:** 21/9/2026
**Công bố tại:** <https://thuyhuongctu.github.io/Je-mappelle-Huong/trangvien.html>

---

## 1. Tóm tắt

«Trang viên tri thức» là một cảnh ba chiều tương tác chạy trong trình duyệt,
không cần cài đặt. Khách tham quan điều khiển một nhân vật đi bộ, đạp xe hoặc
chèo xuồng qua một trang viên gồm **tám khu**, mỗi khu ứng với một mảng công
việc học thuật của tác giả: nghiên cứu, công bố, giảng dạy, dự án, lối kể
chuyện, kho tương lai, nhà chính và hải đăng.

Tác phẩm là cách trình bày hồ sơ học thuật dưới hình thức một không gian đi
lại được, thay cho danh sách chữ thông thường.

---

## 2. Tính nguyên gốc — những gì tác giả tự dựng

Phần này nêu các lựa chọn tạo hình và kỹ thuật cụ thể, kèm con số đo được,
để người xét hồ sơ thấy tác phẩm không phải là mẫu có sẵn được sửa lại.

### 2.1. Bố cục tám khu và kiến trúc dùng chung

Mỗi khu có **thềm ba bậc, lan can vòng quanh, hai cột cổng có đèn, và mái ngói
nhỏ che biển chỉ đường**. Cổng đặt ở **chân thềm** chứ không phải trên nền, để
khách đi xuyên qua rồi mới bước lên — đúng thứ tự của một lối vào thật.

Hình học khai một lần cho cả tám khu; 64 cột lan can và 24 bậc thềm dựng bằng
kỹ thuật vẽ theo thể hiện (`InstancedMesh`). Kết quả đo được: thêm 80 khối
hình nhưng chỉ thêm **một** lệnh vẽ, và tổng số hình học *giảm* từ 1 161 xuống
1 157.

### 2.2. Mặt đất

Mặt đất không dùng hình đĩa quạt thông thường (chỉ 73 đỉnh, toàn nằm ở mép,
không có chỗ đặt vân) mà là một hình vành khuyên **4 921 đỉnh**, tô bằng màu
theo từng đỉnh. Vân cỏ chồng **ba tần số** khác nhau — một tần số thôi thì ra
những mảng tròn đều, nhìn là nhận ra ngay công thức.

Gò đất chỉ nâng lên từ bán kính 50 trở ra và theo bình phương, nên trong vòng
đi lại (bán kính 52) đo được **0 đỉnh** lệch quá 0,05 đơn vị. Nhờ thế mọi công
trình và nhân vật giữ nguyên độ cao.

### 2.3. Bốn thời khắc ánh sáng

Bảng `BC_CH` định nghĩa bốn thời khắc: **sáng, chiều, đêm, noir**. Thước đo mà
tác giả dùng là **tỉ lệ đèn phụ trên đèn chính**, giữ quanh 0,31 cho hai buổi
ban ngày.

Đo bằng ba con số trên cùng một khuôn hình trước và sau: bách phân vị 3 hạ từ
172 xuống 130, biên độ nâng từ 49 lên 75, năng lượng tần cao (độ lệch chuẩn
của ảnh trừ ảnh làm mờ) tăng từ 8,24 lên 14,15.

### 2.4. Sông và xuồng

Xuồng chỉ đi được trên sông. Hàm `trenNuoc()` xét điểm có nằm trong đa giác mặt
sông hay không, lấy trực tiếp từ hình dựng mặt sông chứ không dùng công thức
riêng. Khi xuồng chạm bờ, hướng lái chệch dần tới ±1,4 radian để lướt dọc bờ —
tách theo hai trục là không đủ vì sông chạy xiên.

### 2.5. Tám bức vẽ trên bản đồ

Bảng bản đồ trang viên hiển thị mỗi khu bằng một huy hiệu tròn có **bức vẽ đúng
công trình có thật ở khu ấy trong cảnh 3D**: chồng hồ sơ và kính lúp, rương kho
báu, nhà sàn sách, sân khấu tre, bảng làng, nhà chính, đèn lồng, hải đăng.

Ba ràng buộc do tác giả đo chứ không ước chừng:

- vẽ trong hộp 32×32 nhưng huy hiệu là hình tròn bán kính 17, nên nét phải nằm
  trong vòng bán kính 14;
- cỡ thật là 38 điểm ảnh trên máy tính và **28 trên điện thoại**, nét mảnh hơn
  1,2 đơn vị sẽ biến mất — phải dùng mảng đặc;
- không để hai khu cùng một dáng: thư viện và nhà chính trong cảnh 3D đều mái
  đỏ, nên thư viện vẽ thành nhà sàn có cột và thang để phân biệt được ở 28 điểm
  ảnh.

### 2.6. Máy quay

Ống kính đi bộ là **38°**. Góc 46° thông dụng trong trò chơi bắn súng cho phối
cảnh quá mạnh, vật gần phình ra, cả trang viên trông như đồ chơi rải trên bàn.
Khi thu góc thì khoảng cách máy quay phải nhân `tan(23°)/tan(19°) = 1,23` và độ
cao nhân 1,12 để giữ cỡ khuôn hình.

**Chế độ ngắm toàn cảnh** cho máy quay rời nhân vật, bay một vòng quanh trang
viên ở bán kính 104, cao 50, ống kính 20°. Ba thứ phải đổi theo: khung bóng mở
từ ±34 lên ±58, sương kéo xa gấp 2,6 lần, và cất mây đi.

### 2.7. Bảng màu

Cảnh 3D gom từ 58 xuống **46 màu** bằng cách đo khoảng cách ΔE trong không gian
Lab, ngưỡng ΔE < 8 là chỗ mắt không phân biệt được. Neo cố định gồm tám màu
khu, màu nước, năm sắc cỏ, lối mòn, và **ba bậc giấy lấy từ bộ màu đất sét
chung của trang web** — nhờ thế cảnh 3D và các trang chữ dùng chung một họ màu.

Bốn màu nền của bốn thời khắc ban đầu chênh nhau chỉ **một bậc sáng**, nên mặt
đất không có lớp lang dù có tới bốn sắc. Cách sửa là giữ nguyên sắc và độ bão
hoà, chỉ trải lại độ sáng quanh đúng giá trị trung bình cũ.

### 2.8. Ba thứ tiếng và nhân vật

Trang web hiển thị ba thứ tiếng (Việt, Anh, Pháp); riêng trang viên hai thứ
tiếng, đọc lại thuộc tính ngôn ngữ **ngay lúc vẽ** để khách đổi ngôn ngữ giữa
chừng thì bảng đang mở vẽ lại đúng.

Nhân vật là ảnh phẳng luôn xoay về máy quay, dựng từ **tám dáng** của tác giả
cộng năm nhân vật phụ. Phần tách nền của các ảnh này do tác giả xử lý theo một
quy trình riêng: lấy ngưỡng độ sáng, khép mép, giữ cụm lớn nhất, lấp lỗ thủng
theo **thành phần của lỗ** chứ không theo diện tích, rồi thu nhỏ bằng phép nội
suy Lanczos để sinh ra độ phủ từng phần ở mép.

---

## 3. Khối lượng

| Hạng mục | Số lượng |
| --- | --- |
| `trangvien.html` | 5 417 dòng |
| Năm mô-đun trò chơi | 260 dòng |
| Số lần sửa riêng `trangvien.html` | 47 lần |
| Toàn kho | 155 lần ghi nhận, từ 18/8/2026 |

---

## 4. Phần không thuộc tác giả

Nêu rõ để hồ sơ minh bạch; chi tiết ở [`../THIRD-PARTY.md`](../THIRD-PARTY.md)
và tệp `04`:

- **three.js r128** — thư viện đồ hoạ, giấy phép MIT, dùng nguyên không sửa.
  Là công cụ vẽ, như bút vẽ đối với bức tranh.
- **Cảnh tháp** `assets/canh/thap.html` — bóc từ ThreeUI (MIT, © 2026 Meng To),
  có sửa. **Không thuộc phạm vi đăng ký.** Cảnh này nhúng bằng `iframe` vào khu
  «Kho tương lai», tức là đặt cạnh chứ không trộn vào cảnh trang viên.
- **Đường viền Việt Nam** dựng từ dữ liệu Natural Earth, thuộc phạm vi công
  cộng.

Cảnh trang viên **không dùng một dòng mã nào của ThreeUI**.

---

## 5. Bằng chứng về quá trình sáng tạo

Toàn bộ quá trình được ghi lại trong lịch sử kho mã nguồn, mỗi lần thay đổi có
mốc thời gian riêng, từ 18/8/2026 tới 21/9/2026. Đây là bằng chứng về trình tự
hình thành tác phẩm, khó dựng lại về sau. Cách kết xuất nêu ở `README.md`.
