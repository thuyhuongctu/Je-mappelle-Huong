<!doctype html>
<!-- Khuôn của MV. Đừng sửa index.html: tệp ấy do dung.py sinh lại từ khuôn này. -->
<html lang="vi">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=1920, height=1080" />
    <script src="assets/gsap.min.js"></script>
    <style>
      @font-face { font-family: "Caladea"; src: url(assets/fonts/Caladea-Regular.ttf); font-weight: 400; font-style: normal; }
      @font-face { font-family: "Caladea"; src: url(assets/fonts/Caladea-Italic.ttf); font-weight: 400; font-style: italic; }
      @font-face { font-family: "Caladea"; src: url(assets/fonts/Caladea-Bold.ttf); font-weight: 700; font-style: normal; }      * { margin: 0; padding: 0; box-sizing: border-box; }
      html, body { width: 1920px; height: 1080px; overflow: hidden; background: #1c1814; }
      #root { position: relative; width: 100%; height: 100%; font-family: "Inter", sans-serif; }
      .canh { position: absolute; inset: 0; overflow: hidden; }
      .nen { position: absolute; inset: -80px; background-size: cover; background-position: center;
             filter: blur(38px) brightness(.5) saturate(1.15); }
      .khung { position: absolute; inset: 0; display: flex; align-items: center; justify-content: center; padding-bottom: 190px; }
      .khung img { display: block; object-fit: cover; border: 10px solid #fffcf5; border-radius: 3px;
                   box-shadow: 0 30px 80px rgba(0,0,0,.45); }
      .ve { position: absolute; inset: 0; }
      .ve svg { width: 100%; height: 100%; display: block; }
      #toi { position: absolute; left: 0; right: 0; bottom: 0; height: 300px; pointer-events: none;
             background: linear-gradient(to top, rgba(20,15,10,.72), rgba(20,15,10,0)); }
      .loi { position: absolute; left: 160px; right: 160px; bottom: 74px; text-align: center; color: #fffcf5;
             font-family: "Caladea", "Liberation Serif", serif; font-size: 56px; line-height: 1.3;
             text-shadow: 0 2px 14px rgba(0,0,0,.6); }
      .loi.ho { font-style: italic; color: #f3cf8e; }
      #mo, #ket { position: absolute; inset: 0; background: rgba(28,24,20,.55); display: flex; flex-direction: column; align-items: center; justify-content: center;
                  color: #fffcf5; text-align: center; text-shadow: 0 2px 20px rgba(0,0,0,.55); }
      #mo h1 { font-family: "Caladea", serif; font-size: 112px; font-weight: 700; letter-spacing: .01em; }
      #mo p, #ket p { font-size: 30px; letter-spacing: .16em; text-transform: uppercase; color: #f3cf8e; margin-top: 18px; }
      #mo .vach { width: 120px; height: 3px; background: #c45c3a; margin-top: 30px; }
      #ket { background: rgba(28,24,20,.85); }
      #ket h2 { font-family: "Caladea", serif; font-size: 72px; }
      #ket .nho { font-size: 26px; letter-spacing: 0; text-transform: none; color: #e2d8c7; margin-top: 30px; line-height: 1.6; }
    </style>
  </head>
  <body>
    <div id="root" data-composition-id="main" data-start="0" data-duration="{{DAI}}" data-width="1920" data-height="1080">
      <audio id="nhac" src="assets/huong-ngot-que-minh-3.mp3" data-start="0" data-duration="{{DAI}}" data-has-audio="true"></audio>
      {{KHOI}}
      <div id="toi" class="clip" data-start="0" data-duration="{{DAI}}"></div>
      <div id="mo" class="clip" data-start="0" data-duration="6.2">
        <h1>Hương Ngọt Quê Mình</h1>
        <div class="vach"></div>
        <p>Je m'appelle Hương</p>
      </div>
      <div id="ket" class="clip" data-start="{{KET}}" data-duration="{{KETD}}">
        <h2>Hương Ngọt Quê Mình</h2>
        <p>Je m'appelle Hương</p>
        <div class="nho">Âm nhạc tạo bằng Suno (seranguyenct)<br />Hình ảnh nhân vật tạo bằng công cụ AI · dựng bằng HyperFrames</div>
      </div>
    </div>
    <script>
      const tl = gsap.timeline({ paused: true });
      tl.fromTo("#mo h1", { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 1.4, ease: "power2.out" }, 0.6);
      tl.fromTo("#mo .vach", { scaleX: 0 }, { scaleX: 1, duration: 1, ease: "power3.inOut" }, 1.4);
      tl.fromTo("#mo p", { opacity: 0 }, { opacity: 1, duration: 1 }, 1.9);
      tl.to("#mo", { opacity: 0, duration: 1 }, 5.2);
      tl.fromTo("#ket", { opacity: 0 }, { opacity: 1, duration: 1.6 }, {{KET}});
      {{JS}}
      window.__timelines = window.__timelines || {};
      window.__timelines["main"] = tl;
      tl.seek(0);
    </script>
  </body>
</html>
