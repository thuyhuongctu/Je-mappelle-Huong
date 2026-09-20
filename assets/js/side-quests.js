/* Original trangvien.html extension: side quests are local, deterministic and additive to the existing tour controls. */
(function(){
  'use strict';
  /* Song ngữ: đọc thuộc tính lang của trang ngay lúc vẽ, không nhớ lại, để
     đổi ngôn ngữ giữa chừng là vẽ lại đúng. */
  const NG=()=>document.documentElement.lang==='en'?'en':'vi';
  const T=o=>typeof o==='string'?o:(o[NG()]||o.vi);
  const quests=[
    {id:'research',zone:{vi:'Nghiên cứu',en:'Research'},icon:'📜',
     title:{vi:'Dòng ghi bên lề',en:'The Margin Note'},
     copy:{vi:'Tìm mẩu giấy nhỏ cạnh bàn nghiên cứu và giữ lại câu hỏi của nó cho người đến sau.',en:'Find the small note beside the research desk and preserve its question for the next visitor.'},
     reward:{vi:'Mực của câu hỏi',en:'Ink of Inquiry'},item:'ink',itemIcon:'🖋️',
     itemDesc:{vi:'Lọ mực xanh đen dành cho những câu hỏi không chịu mất đi.',en:'A blue-black ink vial for questions that refuse to disappear.'},
     rarity:{vi:'HIẾM',en:'RARE'}},
    {id:'projects',zone:{vi:'Dự án đang mở',en:'Open Projects'},icon:'💎',
     title:{vi:'Viên đá xanh',en:'The Blue Gem'},
     copy:{vi:'Ghé vườn dự án và mở xem chiếc rương đá xanh trước hồi chuông chiều.',en:'Visit the project garden and inspect the blue-gem chest before the evening bell.'},
     reward:{vi:'Viên đá chứng cứ',en:'Blue Evidence Gem'},item:'gem',itemIcon:'💎',
     itemDesc:{vi:'Viên đá nhỏ, nghĩa là bằng chứng đã được kiểm hai lần.',en:'A tiny gem that represents evidence checked twice.'},
     rarity:{vi:'SỬ THI',en:'EPIC'}},
    {id:'library',zone:{vi:'Thư viện sáng tạo',en:'Creative Library'},icon:'📚',
     title:{vi:'Gáy sách đất sét',en:'Clay Spine'},
     copy:{vi:'Tìm quyển sách đất sét có gáy màu son và chép lại câu đầu tiên của nó.',en:'Locate the clay book with the vermilion spine and record its first sentence.'},
     reward:{vi:'Thẻ đánh dấu đất sét',en:'Clay Bookmark'},item:'bookmark',itemIcon:'🔖',
     itemDesc:{vi:'Mẩu đất sét còn ấm, đánh dấu trang mà sự tò mò bắt đầu.',en:'A warm clay marker for the page where curiosity begins.'},
     rarity:{vi:'THƯỜNG',en:'COMMON'}},
    {id:'music',zone:{vi:'Âm nhạc',en:'Music'},icon:'🎵',
     title:{vi:'Nốt còn thiếu',en:'The Missing Note'},
     copy:{vi:'Dừng nghe ở bến nhạc và tìm nốt còn thiếu của khúc sen.',en:'Listen at the music dock and find the note that completes the lotus melody.'},
     reward:{vi:'Chuông gió sen',en:'Lotus Chime'},item:'chime',itemIcon:'🎐',
     itemDesc:{vi:'Tiếng chuông nhẹ, lên dây theo giờ yên nhất của trang viên.',en:'A soft chime tuned to the estate’s calmest hour.'},
     rarity:{vi:'HIẾM',en:'RARE'}},
    {id:'news',zone:{vi:'Bảng tin',en:'Noticeboard'},icon:'📰',
     title:{vi:'Ghim lại tin vui',en:'Pin the Good News'},
     copy:{vi:'Chọn một mẩu tin đáng để lại cho người đi đường kế tiếp nhìn thấy.',en:'Choose one notice that should stay visible for the next traveler.'},
     reward:{vi:'Chiếc ghim vàng',en:'Golden Pin'},item:'pin',itemIcon:'📌',
     itemDesc:{vi:'Chiếc ghim vàng cho những ý đáng giữ ở chỗ mọi người thấy.',en:'A golden pin for ideas worth keeping in public view.'},
     rarity:{vi:'THƯỜNG',en:'COMMON'}},
    {id:'future',zone:{vi:'Ngày sau',en:'Future'},icon:'🔮',
     title:{vi:'Để ngỏ một cánh cửa',en:'Leave a Door Open'},
     copy:{vi:'Đặt một lời hẹn cho chương sau ở chiếc cổng còn trống.',en:'Place one promise for a future chapter at the empty gate.'},
     reward:{vi:'Chìa khoá ngày sau',en:'Future Key'},item:'key',itemIcon:'🗝️',
     itemDesc:{vi:'Chiếc chìa chưa có ổ - nên còn mở được nhiều cửa.',en:'A key with no lock yet - and therefore many possible doors.'},
     rarity:{vi:'HUYỀN THOẠI',en:'LEGENDARY'}}
  ];
  let done=JSON.parse(localStorage.getItem('th_side_done')||'[]'); let items=JSON.parse(localStorage.getItem('th_items')||'[]');
  const esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const save=()=>{localStorage.setItem('th_side_done',JSON.stringify(done));localStorage.setItem('th_items',JSON.stringify(items));};
  const inject=(id,html)=>{let n=document.getElementById(id);if(!n){n=document.createElement('div');n.id=id;document.body.appendChild(n)}n.innerHTML=html;return n};
  const close=()=>{document.getElementById('th-side-modal')?.remove();bangDangMo=null};
  /* Nhớ đang mở bảng nào để đổi ngôn ngữ giữa chừng thì vẽ lại chính bảng ấy. */
  let bangDangMo=null;
  function renderActions(){let n=inject('th-side-actions','<button class="th-side-btn" id="th-side-open">🧭 '+T({vi:'Việc phụ',en:'Side quests'})+' <strong>'+done.length+'/'+quests.length+'</strong></button><button class="th-side-btn th-item-btn" id="th-items-open">🎒 '+T({vi:'Túi đồ',en:'Inventory'})+' <strong>'+items.length+'</strong></button>');n.className='th-side-actions';document.getElementById('th-side-open').onclick=renderQuests;document.getElementById('th-items-open').onclick=renderInventory;}
  function shell(content){const n=inject('th-side-modal','<div class="th-panel-backdrop"><section class="th-panel">'+content+'</section></div>');n.querySelector('.th-panel-backdrop').onclick=e=>{if(e.target===e.currentTarget)close()};n.querySelector('.th-panel-close').onclick=close;return n.querySelector('.th-panel');}
  function renderQuests(){bangDangMo='quests';const panel=shell('<button class="th-panel-close" aria-label="'+T({vi:'Đóng',en:'Close'})+'">×</button><p class="th-panel-kicker">'+T({vi:'CHUYỆN NGOÀI LỀ · 06',en:'OPTIONAL STORIES · 06'})+'</p><h2>'+T({vi:'Những chuyện nhỏ đáng tìm',en:'Small things worth finding'})+'</h2><p class="th-panel-intro">'+T({vi:'Mỗi khu giữ một dấu vết lặng lẽ. Làm xong một việc phụ thì được một món cho túi đồ của bạn.',en:'Each area keeps one quiet clue. Complete a side quest to receive an item for your estate inventory.'})+'</p><div class="th-quest-list">'+quests.map(q=>{const isDone=done.includes(q.id);return '<article class="th-quest-row '+(isDone?'is-done':'')+'"><header><h3>'+q.icon+' '+esc(T(q.title))+'</h3><span class="th-quest-zone">'+esc(T(q.zone))+'</span></header><p>'+esc(T(q.copy))+'</p><div class="th-quest-reward">✦ '+esc(T(q.reward))+' · '+T(q.rarity)+'</div><button class="th-quest-action" data-id="'+q.id+'" '+(isDone?'disabled':'')+'>'+(isDone?T({vi:'✓ Đã nhận',en:'✓ Collected'}):T({vi:'Đánh dấu đã tìm ra',en:'Mark clue found'}))+'</button></article>'}).join('')+'</div>');panel.querySelectorAll('.th-quest-action:not([disabled])').forEach(b=>b.onclick=()=>complete(b.dataset.id));}
  function complete(id){const q=quests.find(x=>x.id===id);if(!q||done.includes(id))return;done.push(id);if(!items.includes(q.item))items.push(q.item);save();window.dispatchEvent(new Event('th:progress-changed'));renderActions();if(window.TH_MINIGAME&&window.TH_MINIGAME.refresh)window.TH_MINIGAME.refresh();renderQuests();if(window.TH_SOUND)window.TH_SOUND.play('quest');const t=inject('th-side-toast','✦ '+T(q.reward)+T({vi:' đã vào túi đồ',en:' added to inventory'}));t.className='th-story-toast';setTimeout(()=>t.remove(),2300);}
  function renderInventory(){bangDangMo='items';const cards=quests.filter(q=>items.includes(q.item)).map(q=>'<article class="th-item-card"><span class="th-item-rarity">'+T(q.rarity)+'</span><div class="th-item-icon">'+q.itemIcon+'</div><h3>'+esc(T(q.reward))+'</h3><p>'+esc(T(q.itemDesc))+'</p><span class="th-item-value">'+T({vi:'Từ · ',en:'From · '})+esc(T(q.zone))+'</span></article>').join('')+(localStorage.getItem('th_mini_reward')?'<article class="th-item-card"><span class="th-item-rarity">'+T({vi:'THẦN THOẠI',en:'MYTHIC'})+'</span><div class="th-item-icon">🌸</div><h3>'+T({vi:'Ấn chòm sao sen',en:'Lotus Constellation Seal'})+'</h3><p>'+T({vi:'Dấu ấn cuối cùng của người đã nối lại đường ký ức.',en:'The final seal of a player who restored the memory trail.'})+'</p><span class="th-item-value">'+T({vi:'Từ · Chòm sao sen',en:'From · The Lotus Constellation'})+'</span></article>':'');shell('<button class="th-panel-close" aria-label="'+T({vi:'Đóng',en:'Close'})+'">×</button><p class="th-panel-kicker">'+T({vi:'KHO TRANG VIÊN · VẬT PHẨM',en:'ESTATE ARCHIVE · ITEMS'})+'</p><h2>'+T({vi:'Những món bạn đã nhặt',en:'Your collected objects'})+'</h2><p class="th-panel-intro">'+T({vi:'Mỗi món là một bằng chứng nhỏ rằng bạn đã nhìn kỹ. Chúng lưu ngay trên máy này.',en:'Every item is a small proof that you looked closely. Items persist on this device.'})+'</p><div class="th-reward-total"><span>'+T({vi:'Phần thưởng đã nhận',en:'Collected rewards'})+'</span><b>'+items.length+' / '+quests.length+'</b></div><div class="th-inventory-grid">'+(cards||'<div class="th-item-card is-empty">'+T({vi:'Chưa có món nào.<br>Làm xong một việc phụ để nhận món đầu tiên.',en:'No objects yet.<br>Complete a side quest to receive your first one.'})+'</div>')+'</div>');}
  function doiNgonNgu(){renderActions();if(bangDangMo==='quests')renderQuests();else if(bangDangMo==='items')renderInventory();}
  function init(){renderActions();window.TH_SIDE_QUESTS={refresh:renderActions,complete,quests};const oldHelp=document.getElementById('nut-tro-giup');if(oldHelp)oldHelp.addEventListener('click',()=>{renderQuests();});
    new MutationObserver(doiNgonNgu).observe(document.documentElement,{attributes:true,attributeFilter:['lang']});}
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);else init();
})();
