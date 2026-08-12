# Ghi chú cài đặt (bản rút gọn)

Skill `huashu-design` (MIT, https://github.com/alchaincyf/huashu-design) được cài
bản rút gọn để giữ repo nhẹ: đã lược bỏ 6 file nhạc nền `assets/bgm-*.mp3` (~27MB)
và thư mục `assets/showcases/` (~3MB) cùng `demos/`.

Khi cần các file đó (ví dụ xuất video có nhạc nền), clone bản đầy đủ:
`GIT_LFS_SKIP_SMUDGE=1 git clone --depth 1 https://github.com/alchaincyf/huashu-design`
rồi trỏ đường dẫn BGM sang bản clone.
