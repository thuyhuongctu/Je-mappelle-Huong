# Bản cũ

Kho chứa các tệp `.bak` — bản sao lưu sinh ra trong lúc làm việc. Trước đây
chúng nằm rải rác khắp kho, lẫn vào giữa các tệp đang chạy. Nay dồn về đây,
**giữ nguyên đường dẫn cũ** để tra ngược được: tệp

```
ban-cu/assets/img/hero-clay.webp.bak
```

từng nằm ở `assets/img/hero-clay.webp.bak`, tức là bản cũ của
`assets/img/hero-clay.webp`.

**Không tệp nào ở đây được trang web dùng tới.** Đã kiểm bằng `grep` trên mọi
tệp HTML, JS, CSS, JSON, Python, XML và YAML của kho: chỗ duy nhất nhắc tới
`.bak` là `scripts/check-site.py`, và là để **loại trừ** chúng.

---

## Có gì trong này

267 tệp, khoảng 9,3 MB.

| Chỗ cũ | Số tệp | Là gì |
| --- | --- | --- |
| `.claude/skills/` | 178 | Bản nháp của các bộ hướng dẫn soạn thảo **bên thứ ba** |
| `assets/` | 43 | Ảnh, JS, CSS |
| `deck-ecosystem/` | 21 | Bản nháp slide |
| `design-demos/` | 8 | Trang thử nghiệm |
| Gốc kho và nơi khác | 17 | Trang HTML, `sw.js`, `robots.txt`, `scripts/` |

Đem so từng tệp với bản đang dùng:

| | Số tệp |
| --- | --- |
| **Trùng từng byte** với bản đang dùng — thừa hoàn toàn | 209 |
| **Khác nội dung** — là bản cũ thật | 57 |
| Không còn bản gốc tương ứng | 1 |

209 tệp trùng byte có thể xoá bất cứ lúc nào mà không mất gì. 57 tệp còn lại
là bản cũ thật, tuy lịch sử git đã giữ đủ mọi phiên bản rồi.

---

## Quan trọng với hồ sơ quyền tác giả

**178 tệp trong `ban-cu/.claude/` là của bên thứ ba**, không phải tác phẩm của
tác giả. Chúng là bản nháp của các bộ hướng dẫn soạn thảo, mỗi bộ theo giấy
phép riêng — xem [`../THIRD-PARTY.md`](../THIRD-PARTY.md).

Thư mục `ban-cu/` **không nằm trong phạm vi đăng ký quyền tác giả**: nó là chỗ
cất đồ cũ, không phải một phần của tác phẩm.

---

## Quy ước từ nay

`.gitignore` ở gốc kho đặt hai luật đi cùng nhau:

```
*.bak            # bản sao lưu lạc chỗ thì bỏ qua
!ban-cu/**       # nhưng bản cũ cất có chủ đích thì giữ
```

Nghĩa là: một tệp `.bak` sinh ra ở đâu đó trong kho sẽ **không** lọt vào kho
một cách tình cờ; muốn giữ bản cũ nào thì chuyển nó vào `ban-cu/` theo đúng
đường dẫn cũ.
