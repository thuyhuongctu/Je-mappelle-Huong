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
  guide.innerHTML='<div class="th-guide-kicker">BƯỚC <span id="th-guide-step">1</span>/3</div><strong id="th-guide-title">Khám phá Trang viên</strong><p id="th-guide-copy">Dùng cần điều khiển hoặc WASD để di chuyển quanh đồng sen.</p><button type="button" id="th-guide-next">Đã hiểu</button><button type="button" id="th-guide-help">?</button>';
  document.body.appendChild(guide);
  const steps=[
    {vi:['Khám phá Trang viên','Dùng cần điều khiển hoặc WASD để di chuyển quanh đồng sen.'],en:['Explore the estate','Use the joystick or WASD to move through the lotus garden.']},
    {vi:['Ghé một khu vực','Đến gần biển chỉ đường rồi bấm ✦ hoặc phím E để mở nội dung.'],en:['Visit an area','Walk near a signpost, then press ✦ or E to open its story.']},
    {vi:['Tìm điều bất ngờ','Thu thập vật phẩm, gặp NPC và mở nhiệm vụ khi bạn đã quen với không gian.'],en:['Find what is hidden','Collect items, meet NPCs and unlock quests after you know the space.']}
  ];
  let step=0;
  function lang(){return document.documentElement.lang==='en'?'en':'vi'}
  function render(){
    const p=steps[step][lang()];
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
