/* Original Trang viên 3D extension: achievement tracker and title reward, persisted locally and recalculated from real gameplay state. */
(function(){
  'use strict';
  const KEY='th_achievements';
  const titleKey='th_estate_title';
  const defs=[
    {id:'first-clue',icon:'🔎',name:'First Clue',copy:'Find your first glowing clue in the estate.',test:s=>s.found>0},
    {id:'archive-keeper',icon:'🎒',name:'Archive Keeper',copy:'Collect all six estate items.',test:s=>s.items>=6},
    {id:'six-voices',icon:'◌',name:'Six Voices',copy:'Meet every keeper and hear their perspective.',test:s=>s.seen>=6},
    {id:'three-lamps',icon:'✦',name:'The Three Lamps',copy:'Complete chapter two and relight the common room.',test:s=>s.chapters.lamps>=3},
    {id:'constellation',icon:'🌸',name:'Lotus Constellation',copy:'Win the final touch challenge.',test:s=>s.miniReward==='lotus-seal'},
    {id:'living-garden',icon:'🏡',name:'Living Garden',copy:'Complete every chapter of the estate story.',test:s=>s.chapters.garden>=3}
  ];
  const readJson=(key,fallback)=>{try{return JSON.parse(localStorage.getItem(key)||JSON.stringify(fallback))}catch(e){return fallback}};
  function snapshot(){const story=readJson('th_story_state_v2',{chapters:{notebook:0,lamps:0,garden:0},seen:{}});return{found:readJson('th_play_found',[]).length,items:readJson('th_items',[]).length,seen:Object.keys(story.seen||{}).length,chapters:Object.assign({notebook:0,lamps:0,garden:0},story.chapters||{}),miniReward:localStorage.getItem('th_mini_reward')}}
  function unlocked(){return readJson(KEY,[])}
  function scan(){const s=snapshot();const before=unlocked();const now=defs.filter(d=>d.test(s)).map(d=>d.id);const fresh=now.filter(id=>!before.includes(id));if(now.join('|')!==before.join('|'))localStorage.setItem(KEY,JSON.stringify(now));if(s.chapters.garden>=3){localStorage.setItem(titleKey,'Keeper of the Living Garden')}if(fresh.length){fresh.forEach(id=>toast(defs.find(d=>d.id===id)));if(window.TH_SOUND)window.TH_SOUND.play('quest');if(window.TH_SAVE&&window.TH_SAVE.save)window.TH_SAVE.save()}renderButton();return{state:s,unlocked:now,fresh}}
  function toast(d){if(!d)return;let n=document.getElementById('th-achievement-toast');if(!n){n=document.createElement('div');n.id='th-achievement-toast';document.body.appendChild(n)}n.innerHTML='<span>'+d.icon+'</span><div><small>ACHIEVEMENT UNLOCKED</small><b>'+d.name+'</b></div>';n.classList.remove('show');requestAnimationFrame(()=>n.classList.add('show'));setTimeout(()=>n.classList.remove('show'),3400)}
  function renderButton(){const host=document.getElementById('th-side-actions');if(!host)return;let b=document.getElementById('th-achievement-open');if(!b){b=document.createElement('button');b.id='th-achievement-open';b.className='th-side-btn th-achievement-btn';host.appendChild(b)}const got=unlocked();b.innerHTML='🏅 Achievements <strong>'+got.length+'/'+defs.length+'</strong>';b.onclick=renderPanel}
  function renderPanel(){const got=unlocked();const s=snapshot();const title=localStorage.getItem(titleKey);const rows=defs.map(d=>'<article class="th-achievement-row '+(got.includes(d.id)?'is-earned':'')+'"><div class="th-achievement-icon">'+(got.includes(d.id)?d.icon:'?')+'</div><div><h3>'+d.name+'</h3><p>'+d.copy+'</p></div><b>'+(got.includes(d.id)?'EARNED':'LOCKED')+'</b></article>').join('');const n=document.createElement('div');n.id='th-achievement-modal';n.innerHTML='<div class="th-achievement-backdrop"><section class="th-achievement-panel"><button class="th-achievement-close" aria-label="Close">×</button><p class="th-panel-kicker">ESTATE HONOURS · '+got.length+'/'+defs.length+'</p><h2>Achievements</h2><p class="th-achievement-intro">Small proofs of attention, conversation and courage. They stay on this device.</p>'+(title?'<div class="th-title-card"><small>CURRENT TITLE</small><strong>✦ '+title+'</strong><span>Unlocked after the final chapter.</span></div>':'')+'<div class="th-achievement-list">'+rows+'</div><div class="th-achievement-stats">Clues '+s.found+' · Items '+s.items+' · Story '+s.chapters.garden+'/3</div></section></div>';document.body.appendChild(n);n.querySelector('.th-achievement-close').onclick=()=>n.remove();n.querySelector('.th-achievement-backdrop').onclick=e=>{if(e.target===e.currentTarget)n.remove()}}
  function init(){renderButton();scan();const host=document.getElementById('th-side-actions');if(host)new MutationObserver(renderButton).observe(host,{childList:true});window.addEventListener('th:progress-changed',scan);}
  window.TH_ACHIEVEMENTS={scan,renderPanel,defs};
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);else init();
})();
