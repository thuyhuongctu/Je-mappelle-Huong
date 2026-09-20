/* Original Trang viên 3D extension: achievement tracker and title reward, persisted locally and recalculated from real gameplay state. */
(function(){
  'use strict';
  const KEY='th_achievements';
  const titleKey='th_estate_title';
  /* Song ngữ: đọc thuộc tính lang của trang ngay lúc vẽ, không nhớ lại, để
     đổi ngôn ngữ giữa chừng là vẽ lại đúng. */
  const NG=()=>document.documentElement.lang==='en'?'en':'vi';
  const T=o=>typeof o==='string'?o:(o[NG()]||o.vi);
  const defs=[
    {id:'first-clue',icon:'🔎',
     name:{vi:'Manh mối đầu tiên',en:'First Clue'},
     copy:{vi:'Tìm được dấu vết phát sáng đầu tiên trong trang viên.',en:'Find your first glowing clue in the estate.'},
     test:s=>s.found>0},
    {id:'archive-keeper',icon:'🎒',
     name:{vi:'Người giữ kho',en:'Archive Keeper'},
     copy:{vi:'Nhặt đủ sáu vật phẩm của trang viên.',en:'Collect all six estate items.'},
     test:s=>s.items>=6},
    {id:'six-voices',icon:'◌',
     name:{vi:'Sáu tiếng nói',en:'Six Voices'},
     copy:{vi:'Gặp đủ sáu người giữ khu và nghe mỗi người một cách nhìn.',en:'Meet every keeper and hear their perspective.'},
     test:s=>s.seen>=6},
    {id:'three-lamps',icon:'✦',
     name:{vi:'Ba ngọn đèn',en:'The Three Lamps'},
     copy:{vi:'Đi hết chương hai và thắp lại gian nhà chung.',en:'Complete chapter two and relight the common room.'},
     test:s=>s.chapters.lamps>=3},
    {id:'constellation',icon:'🌸',
     name:{vi:'Chòm sao sen',en:'Lotus Constellation'},
     copy:{vi:'Thắng thử thách chạm cuối cùng.',en:'Win the final touch challenge.'},
     test:s=>s.miniReward==='lotus-seal'},
    {id:'living-garden',icon:'🏡',
     name:{vi:'Khu vườn còn sống',en:'Living Garden'},
     copy:{vi:'Đi hết mọi chương của câu chuyện trang viên.',en:'Complete every chapter of the estate story.'},
     test:s=>s.chapters.garden>=3}
  ];
  const DANH_HIEU={vi:'Người giữ khu vườn còn sống',en:'Keeper of the Living Garden'};
  const readJson=(key,fallback)=>{try{return JSON.parse(localStorage.getItem(key)||JSON.stringify(fallback))}catch(e){return fallback}};
  function snapshot(){const story=readJson('th_story_state_v2',{chapters:{notebook:0,lamps:0,garden:0},seen:{}});return{found:readJson('th_play_found',[]).length,items:readJson('th_items',[]).length,seen:Object.keys(story.seen||{}).length,chapters:Object.assign({notebook:0,lamps:0,garden:0},story.chapters||{}),miniReward:localStorage.getItem('th_mini_reward')}}
  function unlocked(){return readJson(KEY,[])}
  function scan(){const s=snapshot();const before=unlocked();const now=defs.filter(d=>d.test(s)).map(d=>d.id);const fresh=now.filter(id=>!before.includes(id));if(now.join('|')!==before.join('|'))localStorage.setItem(KEY,JSON.stringify(now));if(s.chapters.garden>=3){localStorage.setItem(titleKey,'living-garden')}if(fresh.length){fresh.forEach(id=>toast(defs.find(d=>d.id===id)));if(window.TH_SOUND)window.TH_SOUND.play('quest');if(window.TH_SAVE&&window.TH_SAVE.save)window.TH_SAVE.save()}renderButton();return{state:s,unlocked:now,fresh}}
  function toast(d){if(!d)return;let n=document.getElementById('th-achievement-toast');if(!n){n=document.createElement('div');n.id='th-achievement-toast';document.body.appendChild(n)}n.innerHTML='<span>'+d.icon+'</span><div><small>'+T({vi:'MỞ ĐƯỢC THÀNH TÍCH',en:'ACHIEVEMENT UNLOCKED'})+'</small><b>'+T(d.name)+'</b></div>';n.classList.remove('show');requestAnimationFrame(()=>n.classList.add('show'));setTimeout(()=>n.classList.remove('show'),3400)}
  function renderButton(){const host=document.getElementById('th-side-actions');if(!host)return;let b=document.getElementById('th-achievement-open');if(!b){b=document.createElement('button');b.id='th-achievement-open';b.className='th-side-btn th-achievement-btn';host.appendChild(b)}const got=unlocked();b.innerHTML='🏅 '+T({vi:'Thành tích',en:'Achievements'})+' <strong>'+got.length+'/'+defs.length+'</strong>';b.onclick=renderPanel}
  function renderPanel(){document.getElementById('th-achievement-modal')?.remove();const got=unlocked();const s=snapshot();const title=localStorage.getItem(titleKey);const rows=defs.map(d=>'<article class="th-achievement-row '+(got.includes(d.id)?'is-earned':'')+'"><div class="th-achievement-icon">'+(got.includes(d.id)?d.icon:'?')+'</div><div><h3>'+T(d.name)+'</h3><p>'+T(d.copy)+'</p></div><b>'+(got.includes(d.id)?T({vi:'ĐÃ CÓ',en:'EARNED'}):T({vi:'CHƯA MỞ',en:'LOCKED'}))+'</b></article>').join('');const n=document.createElement('div');n.id='th-achievement-modal';n.innerHTML='<div class="th-achievement-backdrop"><section class="th-achievement-panel"><button class="th-achievement-close" aria-label="'+T({vi:'Đóng',en:'Close'})+'">×</button><p class="th-panel-kicker">'+T({vi:'BẢNG VINH DANH',en:'ESTATE HONOURS'})+' · '+got.length+'/'+defs.length+'</p><h2>'+T({vi:'Thành tích',en:'Achievements'})+'</h2><p class="th-achievement-intro">'+T({vi:'Những bằng chứng nhỏ của sự để ý, của chuyện trò và của lòng can đảm. Chúng lưu ngay trên máy này.',en:'Small proofs of attention, conversation and courage. They stay on this device.'})+'</p>'+(title?'<div class="th-title-card"><small>'+T({vi:'DANH HIỆU HIỆN CÓ',en:'CURRENT TITLE'})+'</small><strong>✦ '+T(DANH_HIEU)+'</strong><span>'+T({vi:'Mở ra sau chương cuối.',en:'Unlocked after the final chapter.'})+'</span></div>':'')+'<div class="th-achievement-list">'+rows+'</div><div class="th-achievement-stats">'+T({vi:'Manh mối',en:'Clues'})+' '+s.found+' · '+T({vi:'Vật phẩm',en:'Items'})+' '+s.items+' · '+T({vi:'Truyện',en:'Story'})+' '+s.chapters.garden+'/3</div></section></div>';document.body.appendChild(n);n.querySelector('.th-achievement-close').onclick=()=>n.remove();n.querySelector('.th-achievement-backdrop').onclick=e=>{if(e.target===e.currentTarget)n.remove()}}
  function doiNgonNgu(){renderButton();if(document.getElementById('th-achievement-modal'))renderPanel()}
  function init(){renderButton();scan();const host=document.getElementById('th-side-actions');if(host)new MutationObserver(renderButton).observe(host,{childList:true});window.addEventListener('th:progress-changed',scan);
    new MutationObserver(doiNgonNgu).observe(document.documentElement,{attributes:true,attributeFilter:['lang']});}
  window.TH_ACHIEVEMENTS={scan,renderPanel,defs};
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);else init();
})();
