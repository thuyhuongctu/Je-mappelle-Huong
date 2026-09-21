# Hồ sơ đăng ký quyền tác giả — Trang viên tri thức

Bộ tài liệu chuẩn bị cho việc đăng ký quyền tác giả tại **Cục Bản quyền tác
giả** (Bộ Văn hoá, Thể thao và Du lịch) đối với cảnh 3D «Trang viên tri thức»
trong kho này.

> **Đây là bản thảo để tác giả dùng, không phải tư vấn pháp lý.** Mẫu tờ khai
> và mức phí thay đổi theo văn bản hiện hành; trước khi nộp cần đối chiếu lại
> với mẫu mới nhất do Cục công bố, hoặc hỏi một người hành nghề luật sở hữu
> trí tuệ. Riêng câu hỏi về phần do máy hỗ trợ tạo ra thì pháp luật Việt Nam
> **chưa có quy định dứt khoát** — xem tệp `04`.

---

## Các tệp trong thư mục

| Tệp | Nội dung |
| --- | --- |
| `01-danh-muc-ho-so.md` | Danh mục giấy tờ phải nộp, việc tác giả tự làm, phí, nơi nộp |
| `02-ban-mo-ta-tac-pham.md` | Bản mô tả tác phẩm — phần cốt lõi, chứng minh tính nguyên gốc |
| `03-cam-doan-ngoai-nhiem-vu.md` | Cam đoan tác phẩm tạo ra ngoài nhiệm vụ được giao |
| `04-cong-cu-ho-tro.md` | Tuyên bố về công cụ hỗ trợ và phần của bên thứ ba |

Chỗ nào cần điền thì đánh dấu bằng ngoặc kép nhọn: «…».

---

## Ba điều đã quyết

Ba câu hỏi phải giải quyết trước khi nộp, và lựa chọn của tác giả:

**1. Chủ sở hữu là ai — tác giả hay đơn vị sử dụng lao động?**

Điều 39 Luật Sở hữu trí tuệ quy định tổ chức giao nhiệm vụ cho tác giả là chủ
sở hữu quyền tài sản đối với tác phẩm tạo ra *trong khi thực hiện nhiệm vụ được
giao*. Tác giả xác định tác phẩm này **được tạo ra ngoài nhiệm vụ được giao**,
bằng thời gian và phương tiện cá nhân. Do đó tác giả đồng thời là chủ sở hữu.
Nội dung cam đoan ở tệp `03`.

**2. Phần do máy hỗ trợ thì khai thế nào?**

Tác giả **đứng tên phần thiết kế**: ý đồ, bố cục, bảng màu, dữ liệu, cấu trúc
tám khu, và mọi quyết định tạo hình đều là của tác giả. Công cụ lập trình hỗ
trợ được nêu minh bạch như một phương tiện, giống như trình soạn thảo hay thư
viện đồ hoạ. Nội dung ở tệp `04`.

**3. Mã của bên thứ ba theo giấy phép MIT?**

Đã kiểm kê đầy đủ ở [`../THIRD-PARTY.md`](../THIRD-PARTY.md). Hai mục cần nêu
trong hồ sơ: thư viện **three.js r128** (dùng nguyên, không sửa) và cảnh tháp
`assets/canh/thap.html` **bóc từ ThreeUI** (tác phẩm phái sinh, có sửa). Cả hai
đều là giấy phép MIT, cho phép dùng và sửa với điều kiện giữ ghi công — kho này
giữ đủ.

---

## Dữ liệu cá nhân — đừng đưa lên kho công khai

Kho này **công khai trên GitHub**. Các tệp ở đây cố ý **không chứa** số căn
cước, địa chỉ thường trú hay chữ ký.

Khi điền bản thật, hãy làm việc trong thư mục `rieng-tu/` — thư mục ấy đã được
khai trong `.gitignore` nên không bao giờ bị đẩy lên. Hoặc in ra rồi điền tay.

---

## Một lợi thế sẵn có: lịch sử git

Lịch sử kho là bằng chứng về thời điểm và quá trình sáng tạo, có mốc thời gian
cho từng thay đổi. Nếu về sau có tranh chấp, đây là thứ khó dựng lại được.

Kết xuất lịch sử thành tệp để kèm hồ sơ:

```bash
git log --reverse --date=format:'%d/%m/%Y' \
  --pretty='%ad  %s' -- trangvien.html assets/js/ \
  > ho-so-quyen-tac-gia/rieng-tu/lich-su-sang-tao.txt
```

Giấy chứng nhận đăng ký **không sinh ra quyền** — quyền tác giả phát sinh từ
lúc tác phẩm được định hình. Đăng ký chỉ làm nhẹ gánh chứng minh khi có tranh
chấp. Tức là không đăng ký thì tác giả vẫn có quyền, chỉ là phải tự chứng minh.
