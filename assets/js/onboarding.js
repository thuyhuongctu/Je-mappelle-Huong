/* Onboarding for the original Trang viên 3D: guide first-time players without competing with the scene HUD. */
(function(){
  const KEY='th_tour_onboarding_v1';
  const getState=()=>{try{return JSON.parse(localStorage.getItem(KEY)||'{}')}catch(e){return {}}};
  const setState=s=>{try{localStorage.setItem(KEY,JSON.stringify(s))}catch(e){}};
  const cong=document.getElementById('cong');
  const start=document.getElementById('nut-vao');
  if(!start)return;
  const guide=document.createElement('aside');
  guide.id='th-onboarding-guide';
  guide.setAttribute('aria-live','polite');
  guide.innerHTML='<div class="th-guide-kicker"><span id="th-guide-kicker-word">BƯỚC</span> <span id="th-guide-step">1</span>/3</div><strong id="th-guide-title">Chọn nơi muốn đến</strong><p id="th-guide-copy">Bảng «Đi đâu?» ở góc phải liệt kê bảy khu.</p><button type="button" id="th-guide-next">Đã hiểu</button><button type="button" id="th-guide-help">?</button>';
  document.body.appendChild(guide);
  /* Ba buoc cu mo dau bang "dung can dieu khien" - duong cham nhat - roi ket
     bang mot buoc noi toi vat pham, NPC va nhiem vu ma khach moi chua thay gi.
     Nay ba buoc di dung thu tu nguoi ta thuc su lam: chon noi den, den noi,
     mo ra doc. */
  const steps=[
    {vi:['Chọn nơi muốn đến','Bảng «Đi đâu?» ở góc phải liệt kê bảy khu. Chọn một khu, Hương tự đi tới.'],en:['Pick where to go','The “Go where?” list on the right holds all seven areas. Pick one and Hương walks there.']},
    {vi:['Hoặc tự đi lấy','Cần điều khiển hoặc phím W A S D để đi; ← → xoay góc nhìn; B để lên xe đạp.'],en:['Or walk it yourself','Joystick or W A S D to move, ← → to turn the camera, B to hop on the bicycle.']},
    {vi:['Mở nội dung một khu','Tới nơi sẽ thấy biển chỉ đường. Bấm ✦ hoặc phím E để đọc khu đó.'],en:['Open an area','A signpost stands at each place. Press ✦ or E to read it.']}
  ];
  let step=0;
  function lang(){return document.documentElement.lang==='en'?'en':'vi'}
  function render(){
    const p=steps[step][lang()];
    document.getElementById('th-guide-kicker-word').textContent=lang()==='en'?'STEP':'BƯỚC';
    document.getElementById('th-guide-step').textContent=step+1;
    document.getElementById('th-guide-title').textContent=p[0];
    document.getElementById('th-guide-copy').textContent=p[1];
    document.getElementById('th-guide-next').textContent=step===steps.length-1?(lang()==='en'?'Got it':'Đã hiểu'):(lang()==='en'?'Next':'Tiếp');
    guide.classList.add('show');
  }
  function enter(){
    document.body.classList.add('tour-started','onboarding-active');
    if(cong)cong.classList.add('tan');
    const s=getState();s.started=true;s.lastStep=2;setState(s);
    step=0;render();
  }
  start.addEventListener('click',enter);
  document.getElementById('th-save-continue')?.addEventListener('click',()=>setTimeout(enter,20));
  document.getElementById('th-guide-next').addEventListener('click',()=>{if(step<steps.length-1){step++;render()}else{guide.classList.remove('show');document.body.classList.remove('onboarding-active')}});
  document.getElementById('th-guide-help').addEventListener('click',()=>{step=0;document.body.classList.add('onboarding-active');render()});
  // Always keep the first screen focused; saved players use Continue to reveal the scene HUD.
  window.TH_ONBOARDING={show:()=>{step=0;render()},enter};
})();
