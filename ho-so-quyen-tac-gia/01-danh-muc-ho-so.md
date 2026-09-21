# 01 — Danh mục hồ sơ và việc phải làm

> Đối chiếu lại với mẫu và mức phí hiện hành trước khi nộp. Phần dưới là để
> chuẩn bị cho đủ, không thay cho văn bản chính thức.

---

## Loại hình đăng ký

Tác phẩm có hai cách xếp loại, và **cách xếp quyết định phạm vi được bảo hộ**:

| Cách xếp | Bảo hộ cái gì | Nhận xét |
| --- | --- | --- |
| **Chương trình máy tính** | Mã nguồn — cách viết ra chương trình | Chặt chẽ, dễ chứng minh sao chép mã |
| **Tác phẩm mỹ thuật ứng dụng** | Hình thức thể hiện — tạo hình, bố cục | Hợp với phần nhìn thấy được |

Trang viên có cả hai mặt: nó là chương trình chạy được, đồng thời là một cảnh
được thiết kế. **Nên cân nhắc nộp hai hồ sơ riêng** cho hai loại hình, vì một
hồ sơ chỉ ghi một loại hình, mà hai loại bảo hộ hai thứ khác nhau — đăng ký
chương trình máy tính không ngăn người khác dựng lại y hệt cảnh ấy bằng mã của
họ, và ngược lại.

Đây là chỗ nên hỏi người hành nghề, vì nó ảnh hưởng trực tiếp tới cái mình
giữ được.

---

## Giấy tờ phải nộp

| # | Giấy tờ | Ai chuẩn bị | Trạng thái |
| --- | --- | --- | --- |
| 1 | Tờ khai đăng ký quyền tác giả, theo mẫu của Cục | Tác giả | Lấy mẫu mới nhất từ Cục |
| 2 | Hai bản sao tác phẩm | Kết xuất từ kho | Xem phần dưới |
| 3 | Giấy cam đoan của tác giả | Tác giả ký | Bản thảo ở `03` |
| 4 | Bản mô tả tác phẩm | Đã soạn | `02` |
| 5 | Bản sao căn cước công dân | Tác giả | Tự chuẩn bị |
| 6 | Giấy tờ chứng minh quyền nộp (nếu uỷ quyền) | Tác giả | Chỉ khi nhờ người khác nộp |

Về mục 2 — **hai bản sao tác phẩm**: với chương trình máy tính, thường nộp bản
in mã nguồn (hoặc đĩa) kèm ảnh chụp màn hình. Khối lượng mã ở đây lớn, nên hỏi
trước Cục xem chấp nhận in trích đoạn hay phải in toàn bộ; nhiều nơi chấp nhận
in phần đầu và phần cuối mỗi tệp.

---

## Kết xuất bản sao tác phẩm

```bash
mkdir -p ho-so-quyen-tac-gia/rieng-tu/ban-sao

# mã nguồn phần trang viên
cp trangvien.html ho-so-quyen-tac-gia/rieng-tu/ban-sao/
cp assets/js/achievements.js assets/js/side-quests.js assets/js/play-loop.js \
   assets/js/minigame.js assets/js/story-quest.js \
   ho-so-quyen-tac-gia/rieng-tu/ban-sao/

# bản kiểm kê phần bên thứ ba, nộp kèm cho minh bạch
cp THIRD-PARTY.md ho-so-quyen-tac-gia/rieng-tu/ban-sao/
```

**Ảnh chụp màn hình** nên có đủ: bốn thời khắc ánh sáng, bảng bản đồ tám khu,
chế độ ngắm toàn cảnh, và vài khu nhìn gần thấy rõ bộ kiến trúc. Đây là phần
thuyết phục nhất với người xét hồ sơ, vì nó cho thấy ngay công sức tạo hình.

**Đừng nộp kèm** `assets/canh/thap.html` như phần của mình — đó là tác phẩm
phái sinh từ ThreeUI, đã nêu ở `04`.

---

## Nơi nộp

- **Cục Bản quyền tác giả**, Hà Nội
- Văn phòng đại diện tại **Thành phố Hồ Chí Minh** và **Đà Nẵng**
- Có thể nộp trực tuyến qua cổng dịch vụ công

Từ Cần Thơ thì văn phòng Thành phố Hồ Chí Minh là gần nhất. Nên gọi hỏi trước
về cách nộp bản sao chương trình máy tính — riêng khoản này mỗi nơi hướng dẫn
một khác, hỏi trước đỡ phải đi lại.

---

## Phí và thời hạn

Phí đăng ký chương trình máy tính khác phí tác phẩm mỹ thuật ứng dụng; mức cụ
thể theo thông tư hiện hành, cần tra lại.

Thời hạn cấp giấy chứng nhận theo luật định là **15 ngày làm việc** kể từ ngày
nhận hồ sơ hợp lệ. Trên thực tế thường lâu hơn nếu hồ sơ phải bổ sung.

---

## Trước khi nộp, kiểm ba điều

1. **Tên tác phẩm thống nhất** ở cả bốn tệp hồ sơ và trên tờ khai. Đề xuất:
   «Trang viên tri thức» (kèm tên tiếng Anh nếu muốn).
2. **Ngày hoàn thành** khai đúng. Lấy từ lịch sử git, đừng ghi ước chừng.
3. **Phần bên thứ ba đã nêu** trong hồ sơ. Giấu đi thì hồ sơ có điểm yếu; nêu
   ra thì phần còn lại vững hơn hẳn.
