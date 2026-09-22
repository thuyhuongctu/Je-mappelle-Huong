# Playable loop & mobile HUD fix

- [x] Chẩn đoán vị trí joystick, biểu cảm, nút nhiệm vụ và vùng an toàn mobile trong trang gốc.
- [x] Tạo các điểm vật phẩm 3D có thể đi tới và nhặt bằng nút tương tác.
- [x] Liên kết mỗi điểm vật phẩm với nhiệm vụ phụ, cập nhật tiến độ và trao thưởng khi đủ điều kiện.
- [x] Tách các nút Side quests/Inventory vào một dock riêng không chồng lên joystick hoặc biểu cảm.
- [x] Kiểm thử Start, di chuyển, nhặt vật phẩm, hoàn thành nhiệm vụ và responsive trên mobile.

Đánh dấu xong muộn (22/09/2026), sau khi đối chiếu lại trong mã đang chạy:
`play-loop.js`, `side-quests.js`, `minigame.js`, `achievements.js` và
`story-quest.js` đều có trong `assets/js/`, và `.th-side-actions` là một dock
riêng, có lưới riêng cho điện thoại ở `assets/css/mobile-ux.css`.
