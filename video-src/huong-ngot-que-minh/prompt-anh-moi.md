# Prompt sinh thêm cảnh cho MV

Dùng kèm **hai ảnh tham chiếu**: `assets/anh/non-sach.jpg` (mặt rõ) và
`assets/anh/gio-trai.jpg` (toàn thân áo bà ba), để giữ đúng nhân vật. Tỉ lệ 16:9,
cạnh dài ít nhất 1920 px (ảnh càng lớn thì MV càng có thể cho ảnh tràn khung).

Phần chung, dán vào đầu mỗi prompt:

> Cinematic photo, the same young Vietnamese woman as the reference images (long wavy
> auburn-brown hair, soft round face), wearing a white Southern Vietnamese áo bà ba and a
> black-and-white checkered khăn rằn scarf. Mekong Delta, warm natural light, soft film
> grain, natural colors, shallow depth of field, 16:9.

| Câu hát | Tên tệp gợi ý | Cảnh |
| --- | --- | --- |
| «Sông quê con nước đầy vơi» | `song-nuoc.jpg` | She stands on a wooden pier by a wide brown river at sunrise, mist over the water, coconut palms on the far bank. |
| «Má ngồi lựa trái hiên nhà» | `ma-lua-trai.jpg` | An elderly mother in a faded áo bà ba sorts durians on the porch of a wooden house; the young woman kneels beside her, smiling. |
| «Xuồng ai khua nước bên bờ» | `xuong.jpg` | She sits in a small wooden sampan, paddling along a narrow canal lined with water coconut palms, golden late afternoon. |
| «Chiều nghiêng bóng xuống hàng dừa» | `hang-dua.jpg` | Wide shot: a row of coconut palms along a river at dusk, her small figure walking on the dirt path. |
| «Đêm về má vẫn chong đèn» | `chong-den.jpg` | Night interior of a wooden house, an oil lamp glowing on the table, the mother looking out the window. |
| «Mai qua phố lạ» | `pho-la.jpg` | She walks through a busy modern city street at dusk holding a small basket of durians, looking back with a nostalgic smile. |
| «Bên sông lại rộn tiếng cười» | `ben-song.jpg` | Village riverside festival: children laughing, boats loaded with fruit, she laughs with neighbors. |

Thêm vào `canh.py` theo dạng `(chỉ số câu, 'ten-tep', 'vao')`, rồi `python3 dung.py`.
