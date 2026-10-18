# MV «Hương Ngọt Quê Mình» (bản 3)

Nguồn dựng của MV, không phải trang của site. Không khai trong `sw.js` hay
`sitemap.xml`, không có liên kết nào từ trang khác trỏ tới.

## Dựng lại

```bash
python3 can_loi.py asr.json      # (chỉ khi đổi bản thu) khớp lời với mốc Whisper → loi_thoi_gian.json
python3 dung.py                  # sinh index.html từ khuon.tpl + canh.py + loi_thoi_gian.json
npx --yes hyperframes@0.8.171 render -o mv.mp4
```

`index.html` là tệp sinh ra, đừng sửa tay: sửa `khuon.tpl` (giao diện),
`canh.py` (cảnh nào ở câu nào) hoặc `loi_thoi_gian.json` (mốc lời).

## Mốc lời lấy thế nào

Lời lấy nguyên văn từ thẻ `lyrics-eng` trong tệp nhạc (`loi.txt`). Mốc thời gian
lấy từ Whisper `small` chạy tại máy (`faster-whisper`, tiếng Việt, mốc theo từ).
Whisper nghe sai nhiều chữ khi hát (sầu riêng → «sâu riêng», phù sa → «phù xa»),
nên **chỉ dùng mốc, không dùng chữ** của nó. `can_loi.py` so từng câu lời (bỏ dấu)
với cửa sổ từ của Whisper, đi tới trước theo thứ tự nên ba lần điệp khúc vẫn rơi
đúng chỗ. Câu khớp kém (đánh dấu `noisuy` trong JSON) được nội suy giữa hai câu
khớp tốt; đó là chỗ nên nghe lại trước tiên nếu lời lệch nhịp.

`faster-whisper` 1.2.1 vấp với PyAV mới (`open() got an unexpected keyword argument
'metadata_errors'`): giải mã trước bằng ffmpeg ra PCM 16 kHz rồi đưa mảng numpy vào.

## Hình ảnh

Năm ảnh gốc do tác giả gửi (ảnh tạo bằng AI). Ba ảnh chỉ rộng 384–688 px, nên MV
**không phóng ảnh tràn khung**: ảnh đặt trong khung giấy trên nền là chính ảnh ấy
làm mờ, và không phóng quá 1,9 lần (`dung.py`). Các cận cảnh trong `assets/anh/`
cắt ra từ năm ảnh ấy. Hai cảnh vẽ (`assets/ve/`: sông chiều có xuồng, đêm chong
đèn) dùng cho các câu không có ảnh tương ứng.

Muốn thêm cảnh mới (xuồng trên sông, má lựa trái, hàng dừa chiều…), xem
`prompt-anh-moi.md`: đặt ảnh mới vào `assets/anh/`, khai trong `canh.py`, dựng lại.

## Ghi nguồn

Nhạc tạo bằng Suno (thẻ ID3 giữ nguyên dòng `made with suno`); hình nhân vật tạo
bằng AI. Thẻ cuối MV ghi cả hai, theo nguyên tắc «không giấu việc dùng công cụ».
