# MV «Mekong Sunfire» — Gói sản xuất H3 (hook 15 giây)

> Bản thử nghiệm đầu tiên theo yêu cầu: video cho bài **«Mekong Sunfire»** (remix «Bật Nghiệp», BizOn).
> Công cụ: MiniMax H3 · chế độ **Ref2VA** (ảnh + âm thanh tham chiếu) · skill `mv-subtitle` + `h3-prompt-writing`.

## 1. Hợp đồng sáng tạo (Creative Contract)

| Hạng mục | Quyết định |
|---|---|
| Bài hát | «Mekong Sunfire» — remix EDM của «Bật Nghiệp» (BizOn), 3:18 |
| Cửa sổ nhạc | **181.0s → 196.0s** — điệp khúc cuối, cao trào mạnh nhất toàn bài (phân tích RMS trên file gốc) |
| Master Audio | `docs/mv/mekong-sunfire-hook-15s.mp3` (15.0s, cắt sẵn từ file gốc) — **fully_copy**, video không tự sinh nhạc |
| Thời lượng | 15 giây (trần một lần sinh của H3) — 3 shot, cắt cứng theo phách |
| Khung hình | 16:9 (YouTube / nhúng vào trang) |
| Nhân vật | Hương AI — áo dài bạc ánh hồng, huy hiệu cờ Việt Nam, tóc nâu đỏ gợn sóng (render 3D Pixar-style) |
| Bối cảnh | Hoàng hôn sông Mekong: mặt trời rực lửa, ghe thuyền, chợ nổi xa, cầu gỗ ven sông |
| Typography | Chỉ chữ thương hiệu «MEKONG SUNFIRE» · «BẬT NGHIỆP» · «BizOn» (không chép lời hát — tránh sai khớp môi; audio đã dùng bản thu thật) |
| Loại trừ | Không fade/dissolve (chỉ cắt cứng theo phách) · không lip-sync cận cảnh · không mặt bóng AI |

## 2. Tài nguyên cần tải lên khi sinh video

1. **Ảnh nhân vật (2–3 ảnh, bộ áo dài bạc–hồng nền trong suốt):**
   - 1 ảnh toàn thân đứng (dáng chỉ tay hoặc dang tay chào)
   - 1 ảnh cận nửa thân (khuôn mặt rõ)
   - 1 ảnh dáng ăn mừng giơ hai tay (nếu có)
   - *Dự phòng trong repo:* `assets/img/greet_hero.png`, `assets/img/present.png` (bản áo dài trắng)
2. **Âm thanh:** `docs/mv/mekong-sunfire-hook-15s.mp3`

## 3. Prompt H3 Ref2VA (đã khóa — dán nguyên văn)

```text
subject_definitions:
<Subject 1> is the young Vietnamese woman from <Picture 1> and <Picture 2>: a stylized 3D-animated character with long wavy auburn hair, warm brown eyes, and a floor-length silver áo dài with soft pink side panels, a high collar, and a small red Vietnamese-flag badge on the chest. <Picture 1> provides her full-body proportions and pose vocabulary; <Picture 2> provides her facial identity in close-up. <Picture 3> provides her celebratory raised-arms pose used in the final shot.
<Audio 1> is the 15-second final-chorus excerpt of the EDM song "Mekong Sunfire", reused as the target video's complete final audio track.

summary:
[reference generation + audio reuse] The target video is a 15-second, 16:9 stylized 3D-animation music-video hook set on a Mekong River boardwalk at blazing sunset. <Subject 1> strides, spins, and celebrates in sync with the beat of <Audio 1>, while bold brand typography "MEKONG SUNFIRE" and "BẬT NGHIỆP" punches in on the musical accents. All cuts are hard cuts landing on drum hits of <Audio 1>.

retention_analysis:
<Subject 1> (appears in [Shot 1], [Shot 2], [Shot 3]): fully_preserved - her 3D render style, auburn wavy hair, facial identity, silver-pink áo dài with flag badge, and pose vocabulary follow <Picture 1>, <Picture 2>, and <Picture 3> in every shot; only lighting changes to warm sunset tones.
<Audio 1>: fully_copy - <Audio 1> is reused 1:1 as the target video's complete final audio track; no new music, vocals, or dialogue are generated.

detailed_description:
The target video is a polished Pixar-style 3D animation with cinematic warm lighting, saturated sunset oranges and magentas, gentle film grain, and energetic beat-synced hard cuts; there are no fades or dissolves.
[Shot 1] A wide establishing shot over the Mekong River at sunset: a huge molten-orange sun sits low over the water, scattered wooden boats and a distant floating market are silhouetted on the glittering river, and palm trees frame the right edge. <Subject 1> walks confidently toward the camera along a wooden boardwalk on the left, her silver áo dài and auburn hair streaming in the river breeze, catching rim light from the sun. The camera pulls back smoothly at her walking pace, keeping her full figure and the burning sun in frame together. On the first downbeat of <Audio 1>, the massive title "MEKONG SUNFIRE" in bold condensed uppercase letters with a hot ember-gradient texture rises from the horizon behind her like a second sunrise, standing in the midground behind the boats so her figure partially occludes its lower edge; the letters shimmer with heat-haze distortion. Her expression is bright and determined; she never covers her face.
[Shot 2] At 00:05.000, on a hard snare hit, the shot cuts to a dynamic medium shot on the boardwalk. <Subject 1> plants her feet and spins once, her áo dài flaring, then extends her right arm out to the side in the confident presenting pose from <Picture 1>. As her palm opens, a glowing holographic map of Vietnam materializes in the air beside her, made of warm golden light particles, with a small red flag pin dropping onto the Mekong Delta and sending a ripple of light across the map. The camera orbits her in a fast quarter-circle to the right, matching the driving rhythm of <Audio 1>; with each bass hit the frame gives a subtle punch-in. On the strongest accent of this phrase, the phrase "BẬT NGHIỆP" in heavy brush-edged uppercase letters smashes into the upper third of the frame from the right with a burst of ember sparks, tilting slightly, never covering her eyes or face; the boardwalk lanterns flicker in time with the hi-hats.
[Shot 3] At 00:10.500, on the final drop of <Audio 1>, the shot cuts to a low-angle medium-close shot against the blazing sky. <Subject 1> raises both fists high in the triumphant celebration pose from <Picture 3>, head tilted up, laughing with joy as the sun flares directly behind her and the river below burns gold. Sparks and light particles float upward around her like fireflies. The camera pushes in slowly and tilts up slightly, letting the sun flare bloom across the lens. As the final chord of <Audio 1> rings out and softens, "MEKONG SUNFIRE" and a smaller "BizOn · Bật Nghiệp" lockup settle together into the sky above her head, glowing softly like embers, and the image holds on her victorious silhouette against the sun for the last beat.

overall_soundscape:
The only audible content is <Audio 1>; no additional ambience, foley, or dialogue is generated. A faint natural river-breeze presence may sit far beneath the music but must never compete with it.

non_diegetic_music:
The entire soundtrack is <Audio 1>, the final-chorus excerpt of "Mekong Sunfire": a driving EDM chorus with a hot festival energy, reused 1:1 for the full 15 seconds; visuals, cuts, and typography hits are timed to its beats.
```

## 4. Cách sinh video

**Cách A — Web app (khuyến nghị, không cần API key):**
1. Mở [hailuoai.video/tools/minimax-h3](https://hailuoai.video/tools/minimax-h3) → chế độ tham chiếu (Ref2VA)
2. Tải lên: 2–3 ảnh nhân vật (mục 2) + `mekong-sunfire-hook-15s.mp3`
3. Dán nguyên văn prompt ở mục 3 · chọn 16:9 · 15 giây → Generate
4. Ưng bản 768p thì chạy lại với **H3-Regenerate-2K**

**Cách B — API:** `POST /v1/video_generation` (video-generation-v2) với cùng prompt + file tham chiếu; cần `MINIMAX_API_KEY` (thêm vào environment của Claude Code nếu muốn tôi gọi trực tiếp).

## 5. Mở rộng thành MV đầy đủ 3:18 (khi bản hook đạt)

- Chia 198 giây thành ~14–16 phân đoạn 10–15 giây, mỗi đoạn một prompt Ref2VA cùng "Global Aesthetic & Character Lock" (giữ nguyên đoạn mở đầu của `detailed_description`)
- Cắt tại các mốc phách mạnh (phân tích RMS đã có: các cao trào tại ~118s, ~137s, ~149s, ~168s, ~181s)
- Ghép theo Master Audio gốc (file 3:18), đồng bộ timestamp; frame cuối đoạn trước làm frame đầu đoạn sau ở các cảnh liền mạch
- Thêm lớp typography lời hát khi có văn bản lời chính thức (khớp từng từ với giọng hát)

---
*Gói này do Claude tạo theo skill `mv-subtitle` + `h3-prompt-writing` (MiniMax-H3) · 08/08/2026*
