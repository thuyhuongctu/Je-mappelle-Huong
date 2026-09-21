# Hallmark — nguồn gốc, phạm vi và giấy phép

Thư mục `hallmark/` được sao chép từ [Nutlope/hallmark](https://github.com/Nutlope/hallmark)
v1.1.0 (commit `13ac0ec`), lấy về ngày 22/08/2026. Giấy phép **MIT**.

## Kỹ năng này làm gì

Hallmark là kỹ năng thiết kế giao diện web "chống mùi AI": nó buộc tác nhân chọn
một **cấu trúc trang** (macrostructure) hợp với đề bài thay vì rơi vào nhịp mặc
định *hero → 3 thẻ tính năng → CTA → chân trang* mà mọi mô hình đều được huấn
luyện thành. Kho có 21 cấu trúc trang mẫu, 21 bộ chủ đề màu/chữ, một danh sách
57 phép kiểm "slop test" chạy trước khi trả kết quả, cùng bốn cách gọi:

| Cách gọi | Việc |
|---|---|
| *(mặc định)* | Dựng giao diện mới: chọn cấu trúc, áp bộ quy tắc, chạy slop test trước khi giao |
| `hallmark audit <đích>` | Chấm điểm giao diện **đã có** theo danh sách lỗi thường gặp, trả về danh sách việc cần sửa — **không tự sửa** |
| `hallmark redesign <đích>` | Giữ nội dung, chữ nghĩa và kiến trúc thông tin, dựng lại lớp hình ảnh theo cấu trúc khác |
| `hallmark study <ảnh \| URL>` | Rút "ADN" thiết kế từ một trang mình thích (cấu trúc, cặp phông, màu chủ đạo). Kỹ năng tự từ chối sao chép nguyên xi và từ chối các URL bán mẫu giao diện |

## Ranh giới với `huashu-design`

Kho này có sẵn `huashu-design`, cũng là kỹ năng thiết kế. Hai kỹ năng **không
thay thế nhau**; ranh giới theo đúng mô tả của từng bên:

- **`huashu-design`** — nguyên mẫu HTML, **slide/PPT**, hoạt hình, trực quan
  hoá, chấm bài thiết kế. Bắt buộc ra ba hướng phác thảo cho người dùng chọn
  trước khi làm.
- **`hallmark`** — **trang web công khai và giao diện ứng dụng**: trang chủ,
  trang giới thiệu dự án, landing page; cùng ba việc mà `huashu-design` không
  có: chấm lỗi giao diện đã có (`audit`), dựng lại giao diện cũ (`redesign`),
  rút ADN thiết kế từ trang mẫu (`study`).

Khi cả hai cùng có vẻ hợp, cứ hỏi lại một câu cho rõ đề bài là gì — làm slide
hay làm trang web — rồi chọn.

## Vì sao cài vào kho này

Đây là kho tập trung phần thiết kế của cả hệ sinh thái: trang chủ có bản đồ
trang viên, blog, quả cầu dữ liệu, trang 3D, tập bài hát, bộ slide giới thiệu
hệ sinh thái, và thư mục `design-demos/` ghi lại các hướng thiết kế đã duyệt.
Các trang mới vẫn đang được thêm, nên phần `audit` và `redesign` dùng được ngay
cho những trang cũ.

## Đã kiểm trước khi cài

- Toàn bộ kỹ năng là **107 tệp markdown**, không một script nào, không hook,
  không khai máy chủ MCP — cài vào không có gì tự chạy.
- Kho gốc do Together AI làm, có trang giới thiệu công khai
  (usehallmark.com) và ví dụ dựng sẵn.

## Giấy phép

```
MIT License

Copyright (c) 2026 Hallmark contributors

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

Giấy phép MIT yêu cầu giữ nguyên thông báo bản quyền ở trên trong mọi bản sao;
đó là lý do tệp này tồn tại. Phần kỹ năng nhập từ Hallmark **không** thuộc phạm
vi "© 2026 Đỗ Thùy Hương, bảo lưu mọi quyền" nêu trong `LICENSE` ở gốc kho.
