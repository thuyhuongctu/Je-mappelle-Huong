/* Ground-truth target: original trangvien.html. Story chapters and NPC relationships are additive and keep the existing 3D loop intact. */
(function(){
  'use strict';
  /* Chân dung vuông cắt sát đầu-vai. Ô tròn 39px dùng object-fit:cover, nên
     ảnh toàn thân cao 900px bị cắt đúng khúc giữa - tức tà áo dài, không phải
     khuôn mặt. Tấm này cắt từ ảnh gốc độ phân giải đầy đủ. */
  const portrait='assets/img/huong-ai-chan-dung.webp';
  /* Trước đây cả sáu người dùng chung một ảnh, nên Linh, Minh, Mai, An và Tùng
     mở hội thoại ra đều mang khuôn mặt của Hương. */
  const ANH={huong:portrait, linh:'assets/img/npc-linh.webp', minh:'assets/img/npc-minh.webp',
             mai:'assets/img/npc-mai.webp', an:'assets/img/npc-an.webp', tung:'assets/img/npc-tung.webp'};
  /* Song ngữ: đọc thuộc tính lang của trang ngay lúc vẽ, không nhớ lại, để
     đổi ngôn ngữ giữa chừng là vẽ lại đúng. */
  const NG=()=>document.documentElement.lang==='en'?'en':'vi';
  const T=o=>typeof o==='string'?o:(o[NG()]||o.vi);
  const chapters=[
    {id:'notebook',label:'01',
     title:{vi:'Quyển sổ sen',en:'The Lotus Notebook'},
     summary:{vi:'Lần theo ba dấu vết lặng lẽ và tìm lại quyển sổ còn nhớ những ngày đầu của trang viên.',en:'Follow three quiet clues and recover the notebook that remembers the estate’s beginnings.'},
     steps:[{vi:'Hỏi Hương về quyển sổ bị thất lạc',en:'Ask Hương about the missing notebook'},
            {vi:'Tìm dấu son trong Thư viện sáng tạo',en:'Find the vermilion mark in the Creative Library'},
            {vi:'Theo khúc nhạc tới cổng Ngày sau',en:'Follow the melody to the Future gate'}],
     npcIds:['huong','linh','minh'],unlock:()=>true,
     reward:{vi:'Một cánh cổng mới mở ra',en:'A new gate opens'}},
    {id:'lamps',label:'02',
     title:{vi:'Ba ngọn đèn',en:'The Three Lamps'},
     summary:{vi:'Ba người giữ khu đang giữ ba ký ức khác nhau. Được họ tin thì gian nhà chung của trang viên sẽ sáng lại.',en:'Three keepers are protecting different memories. Earn their trust and relight the estate’s common room.'},
     steps:[{vi:'Nghe ghi chép thực địa của Mai ở khu Nghiên cứu',en:'Hear Mai’s field note in Research'},
            {vi:'Đổi một câu hỏi với An ở Bảng tin',en:'Trade a question with An at the Noticeboard'},
            {vi:'Chọn một lời hẹn chung với Tùng ở Dự án đang mở',en:'Choose a shared promise with Tùng at Open Projects'}],
     npcIds:['mai','an','tung'],unlock:s=>s.chapters.notebook>=3,
     reward:{vi:'Gian nhà chung nhớ tên bạn',en:'The common room remembers your name'}},
    {id:'garden',label:'03',
     title:{vi:'Khu vườn còn nhớ',en:'A Garden That Remembers'},
     summary:{vi:'Trang viên đã sẵn sàng cho một cuộc trò chuyện cuối: quyết định xem ngày sau của nó nên giữ những gì.',en:'The estate is ready for one final conversation: decide what its future should hold.'},
     steps:[{vi:'Mang chiếc ấn tới cho Hương',en:'Bring the seal to Hương'},
            {vi:'Gọi tên một ký ức đáng giữ',en:'Name one memory worth keeping'},
            {vi:'Mở kho lưu hướng về ngày sau',en:'Open the future-facing archive'}],
     npcIds:['huong','mai','tung'],unlock:s=>s.chapters.lamps>=3,
     reward:{vi:'Kho trang viên từ nay bạn ghé lại lúc nào cũng được',en:'The estate archive is yours to revisit'}}
  ];
  const people=[
    {id:'huong',name:'Hương',role:{vi:'Chủ nhân trang viên',en:'Owner of the estate'},zone:'projects',chapter:'notebook',
     greeting:{vi:'Bạn tới rồi. Trang viên có một câu chuyện đang đợi được mở ra - nhưng trước hết mình cần tìm quyển sổ sen.',en:'You made it. The estate has a story waiting to be opened - but first, we need to find the lotus notebook.'},
     choices:[[{vi:'Mình tìm cùng bạn.',en:'I will look with you.'},{vi:'Tốt. Bắt đầu từ Dự án đang mở, chỗ mà ý tưởng hay giấu đi những món quan trọng nhất.',en:'Good. Start in Open Projects, where ideas often hide the most important objects.'},8],
              [{vi:'Quyển sổ ấy quan trọng ở chỗ nào?',en:'Why is the notebook important?'},{vi:'Nó ghi lại những buổi gặp đã làm nên trang viên này. Có thứ chỉ hiện ra khi mình đi chậm lại.',en:'It records the meetings that shaped this estate. Some things only appear when we slow down.'},3]]},
    {id:'linh',name:'Linh',role:{vi:'Người giữ Thư viện sáng tạo',en:'Keeper of the Creative Library'},zone:'library',chapter:'notebook',
     greeting:{vi:'Mình nghe tiếng giở giấy gần ao sen. Có lẽ quyển sổ đã đi qua đây, mang theo một câu trích chưa ai đọc.',en:'I heard paper turning near the lotus pond. Perhaps the notebook passed through here, carrying a quotation no one has read.'},
     choices:[[{vi:'Bạn chỉ đường giúp mình nhé?',en:'Can you show me the way?'},{vi:'Tìm quyển sách đất sét có dấu son trên gáy. Manh mối đầu tiên nằm trong đó.',en:'Look for the clay book with a vermilion mark on its spine. The first clue is inside.'},5],
              [{vi:'Mình tự đi xem đã.',en:'I will explore on my own.'},{vi:'Vườn nào tử tế cũng chừa chỗ cho sự tò mò.',en:'A good garden always leaves room for curiosity.'},1]]},
    {id:'minh',name:'Minh',role:{vi:'Người giữ bến nhạc',en:'Keeper of the music dock'},zone:'music',chapter:'notebook',
     greeting:{vi:'Khu nào của trang viên cũng có khúc nhạc riêng. Nghe kỹ thì bạn sẽ nhận ra khúc của quyển sổ.',en:'Every zone of the estate has its own melody. If you listen closely, you will recognise the notebook’s tune.'},
     choices:[[{vi:'Mở khúc nhạc dẫn đường đi.',en:'Turn on the guiding melody.'},{vi:'Để nhạc đi trước. Mình đã đánh dấu câu cuối của nó ở cổng Ngày sau.',en:'Let the music go first. I marked its final phrase at the Future gate.'},6],
              [{vi:'Mình muốn nghe bài khác.',en:'I want to hear another song.'},{vi:'Trang viên không vội. Lúc nào bạn sẵn sàng thì tiếng nhạc vẫn còn đây.',en:'The estate does not hurry. When you are ready, the sound will still be here.'},2]]},
    {id:'mai',name:'Mai',role:{vi:'Người nghiên cứu thực địa',en:'Field researcher'},zone:'research',chapter:'lamps',
     greeting:{vi:'Mình để ghi chép thực địa ở chỗ rễ sen gặp nhà kính cũ. Ngọn đèn thứ nhất không phải một vật; nó là một câu hỏi được ai đó hỏi rất cẩn thận.',en:'I keep field notes where the lotus roots meet the old glasshouse. The first lamp is not a thing; it is a question someone asked carefully.'},
     choices:[[{vi:'Câu hỏi ấy là gì?',en:'Tell me the question.'},{vi:'Ta học được gì mà không biến một nơi đang sống thành mẫu vật? Mang câu ấy đi tiếp.',en:'What can we learn without turning a living place into a specimen? Carry that question onward.'},7],
              [{vi:'Cho mình đáp án luôn đi.',en:'Give me the answer.'},{vi:'Đáp án ở đây mau cũ lắm. Lấy cách làm thì hơn: quan sát, ghi lại, quay lại.',en:'Answers age quickly here. Take the method instead: observe, record, return.'},3]]},
    {id:'an',name:'An',role:{vi:'Người giữ Bảng tin',en:'Noticeboard archivist'},zone:'news',chapter:'lamps',
     greeting:{vi:'Bảng đầy những mẩu tin nhỏ, nhưng có một mẩu không đề ngày. Nó được viết cho ai đó sẽ tới sau khi mọi ồn ào đã lắng.',en:'The board is full of small announcements, but one has no date. It was written for whoever would arrive after the noise had passed.'},
     choices:[[{vi:'Mình sẽ thêm một mẩu.',en:'I will add a note.'},{vi:'Viết một lời hẹn mà khách sau còn giữ được thật. Ngọn đèn thứ hai chỉ nghe thấy lòng tốt làm được.',en:'Write one promise that another visitor can actually keep. The second lamp listens for practical kindness.'},6],
              [{vi:'Mình chỉ muốn biết bí mật thôi.',en:'I only want the secret.'},{vi:'Bí mật bị đòi thì hay e dè. Hỏi xem cái bảng đang che chở điều gì, rồi chừa chỗ cho một tiếng nói khác.',en:'Secrets are shy when demanded. Ask what the board is protecting, then leave room for another voice.'},2]]},
    {id:'tung',name:'Tùng',role:{vi:'Người làm ở Dự án đang mở',en:'Open Projects maker'},zone:'projects',chapter:'lamps',
     greeting:{vi:'Ngọn đèn thứ ba giấu trong bàn thợ. Nó chỉ sáng khi một dự án chừa chỗ cho người khác làm tiếp.',en:'The third lamp is hidden in the workbench. It lights only when a project makes space for someone else to continue it.'},
     choices:[[{vi:'Mình sẽ để dự án mở.',en:'I will leave the project open.'},{vi:'Vậy thì việc sống lâu hơn người làm ra nó. Đó là lời hẹn mình vẫn đợi nghe.',en:'Then the work can outlive its maker. That is the promise I was waiting to hear.'},8],
              [{vi:'Mình sẽ làm xong một mình.',en:'I will finish it alone.'},{vi:'Làm xong rồi vẫn có thể cô đơn. Quay lại khi bạn sẵn lòng chia phần còn dang dở.',en:'A finished thing can still be lonely. Come back when you are ready to share the unfinished edge.'},1]]}
  ];
  const fresh=()=>({chapters:{notebook:Number(localStorage.getItem('th_story_progress')||0),lamps:0,garden:0},trust:Number(localStorage.getItem('th_story_trust')||12),relationships:{},seen:{},active:'notebook'});
  let state=fresh();try{const saved=JSON.parse(localStorage.getItem('th_story_state_v2')||'null');if(saved)state=Object.assign(fresh(),saved,{chapters:Object.assign(fresh().chapters,saved.chapters||{}),relationships:saved.relationships||{},seen:saved.seen||{}})}catch(e){}
  let current=null;
  const esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const inject=(id,html)=>{let n=document.getElementById(id);if(!n){n=document.createElement('div');n.id=id;document.body.appendChild(n)}n.innerHTML=html;return n};
  const active=()=>chapters.find(c=>c.id===state.active)||chapters[0];
  const completed=(c)=>Math.min(c.steps.length,Number(state.chapters[c.id]||0));
  const save=()=>{localStorage.setItem('th_story_progress',String(state.chapters.notebook));localStorage.setItem('th_story_trust',String(state.trust));localStorage.setItem('th_story_state_v2',JSON.stringify(state));window.dispatchEvent(new Event('th:progress-changed'))};
  const toast=m=>{const n=inject('th-story-toast',esc(m));n.className='th-story-toast';setTimeout(()=>n.remove(),2200)};
  const close=()=>{document.getElementById('th-story-modal')?.remove();current=null};
  function unlocked(c){return c.unlock(state)}
  function renderPill(){let p=document.getElementById('th-story-quest');if(!p){p=document.createElement('button');p.id='th-story-quest';p.className='th-quest-pill';document.body.appendChild(p)}p.innerHTML='✦ '+T({vi:'Chương truyện',en:'Story chapters'})+' <strong>'+completed(active())+'/'+active().steps.length+'</strong>';p.onclick=renderQuest}
  function renderNpcs(){const host=inject('th-story-npcs','<div class="th-npc-dock"></div>');const dock=host.firstElementChild;dock.innerHTML=people.map(person=>{const chaptersFor=chapters.filter(c=>c.npcIds.includes(person.id)&&unlocked(c));const available=chaptersFor.some(c=>completed(c)<c.steps.length);const rel=state.relationships[person.id]||0;return '<button class="th-npc-chip '+(available?'is-ready':'')+'" data-person="'+person.id+'"><span>●</span><b>'+esc(person.name)+'</b><small>'+rel+T({vi:' tin',en:' trust'})+'</small></button>'}).join('');dock.querySelectorAll('[data-person]').forEach(b=>b.onclick=()=>talk(people.find(p=>p.id===b.dataset.person)))}
  function talk(person){current=person;const currentChapter=active();const c=(currentChapter.npcIds.includes(person.id)&&unlocked(currentChapter)?currentChapter:null)||chapters.find(x=>x.id===person.chapter&&unlocked(x))||chapters.find(x=>x.npcIds.includes(person.id)&&unlocked(x));if(!c){toast(T({vi:'Cuộc trò chuyện này mở ở chương sau.',en:'This conversation opens in a later chapter.'}));return}const step=Math.min(completed(c),c.steps.length-1);const seen=state.seen[person.id]||0;const greeting=seen?T(person.greeting)+T({vi:' Bạn đã quay lại; phần tiếp theo là của bạn mang đi.',en:' You have returned; the next part is yours to carry.'}):T(person.greeting);const modal=inject('th-story-modal','<div class="th-story-backdrop"><section class="th-story-card" role="dialog" aria-modal="true" aria-label="'+T({vi:'Trò chuyện với ',en:'Conversation with '})+esc(person.name)+'"><button class="th-story-close" aria-label="'+T({vi:'Đóng',en:'Close'})+'">×</button><p class="th-story-kicker">'+T({vi:'CHƯƠNG',en:'CHAPTER'})+' '+c.label+' · '+esc(T(c.title))+'</p><div class="th-story-character"><img src="'+(ANH[person.id]||portrait)+'" alt="" width="360" height="360"><div><b>'+esc(person.name)+'</b><span>'+esc(T(person.role))+' · '+(state.relationships[person.id]||0)+T({vi:' tin',en:' trust'})+'</span></div></div><div class="th-story-line">'+esc(greeting)+'</div><p class="th-story-step">'+T({vi:'Đang làm dở · ',en:'Current thread · '})+esc(T(c.steps[Math.min(step,c.steps.length-1)]))+'</p><div class="th-story-choices">'+person.choices.map((choice,i)=>'<button class="th-story-choice" data-choice="'+i+'">'+esc(T(choice[0]))+'<span>→</span></button>').join('')+'</div></section></div>');modal.querySelector('.th-story-close').onclick=close;modal.querySelector('.th-story-backdrop').onclick=e=>{if(e.target===e.currentTarget)close()};modal.querySelectorAll('.th-story-choice').forEach(b=>b.onclick=()=>choose(person,c,Number(b.dataset.choice)))}
  function choose(person,c,index){const choice=person.choices[index];state.trust=Math.min(100,state.trust+choice[2]);state.relationships[person.id]=Math.min(100,(state.relationships[person.id]||0)+choice[2]);state.seen[person.id]=(state.seen[person.id]||0)+1;if(choice[2]>=5)state.chapters[c.id]=Math.min(c.steps.length,completed(c)+1);state.active=c.id;save();if(window.TH_SOUND)window.TH_SOUND.play(choice[2]>=5?'quest':'right');const modal=document.getElementById('th-story-modal');const card=modal.querySelector('.th-story-card');card.innerHTML='<button class="th-story-close" aria-label="'+T({vi:'Đóng',en:'Close'})+'">×</button><p class="th-story-kicker">'+T({vi:'TRANG VIÊN TRẢ LỜI',en:'THE ESTATE ANSWERS'})+'</p><h2>'+esc(person.name)+T({vi:' đã trả lời',en:' has answered'})+'</h2><div class="th-story-line">'+esc(T(choice[1]))+'</div><div class="th-story-trust"><span>'+esc(person.name)+T({vi:' · lòng tin',en:' trust'})+'</span><strong>'+state.relationships[person.id]+'</strong><div><i style="width:'+state.relationships[person.id]+'%"></i></div></div><button class="th-story-continue">'+T({vi:'Ghi vào sổ ✓',en:'Write this in the journal ✓'})+'</button>';card.querySelector('.th-story-close').onclick=close;card.querySelector('.th-story-continue').onclick=()=>{close();renderPill();renderNpcs();toast(completed(c)>=c.steps.length?T(c.reward):T({vi:'Manh mối đã được ghi lại.',en:'The clue has been recorded.'}))}}
  function renderQuest(){const currentChapter=active();const chaptersMarkup=chapters.map(c=>'<button class="th-chapter-tab '+(c.id===currentChapter.id?'is-active':'')+' '+(unlocked(c)?'is-open':'is-locked')+'" data-chapter="'+c.id+'">'+c.label+' · '+esc(T(c.title))+' <b>'+completed(c)+'/'+c.steps.length+'</b></button>').join('');const steps=currentChapter.steps.map((step,i)=>'<div class="th-quest-step '+(i<completed(currentChapter)?'done':'')+'"><em>'+(i<completed(currentChapter)?'✓':'0'+(i+1))+'</em><p>'+esc(T(step))+'</p></div>').join('');const npcList=currentChapter.npcIds.map(id=>{const p=people.find(x=>x.id===id);return '<button class="th-story-npc-link" data-person="'+id+'">'+T({vi:'Trò chuyện với ',en:'Talk to '})+esc(p.name)+' <span>→</span></button>'}).join('');const modal=inject('th-story-modal','<div class="th-story-backdrop"><section class="th-story-card th-quest-card" role="dialog" aria-modal="true" aria-label="'+T({vi:'Chương truyện',en:'Story chapters'})+'"><button class="th-story-close" aria-label="'+T({vi:'Đóng',en:'Close'})+'">×</button><p class="th-story-kicker">'+T({vi:'SỔ TRUYỆN · ',en:'STORY JOURNAL · '})+currentChapter.label+'</p><h2>'+esc(T(currentChapter.title))+'</h2><p class="th-quest-summary">'+esc(T(currentChapter.summary))+'</p><figure class="th-quest-canh"><img src="assets/img/nhom-nhan-vat.webp" width="920" height="511" loading="lazy" decoding="async" alt="Hình đất sét: sáu người của trang viên đứng trước nhà gỗ bên ao sen"></figure><div class="th-chapter-tabs">'+chaptersMarkup+'</div><div class="th-quest-progress"><header><span>'+T({vi:'ĐÃ ĐI ĐƯỢC',en:'PROGRESS'})+'</span><b>'+completed(currentChapter)+' / '+currentChapter.steps.length+'</b></header><div class="th-quest-bar"><i style="width:'+(completed(currentChapter)/currentChapter.steps.length*100)+'%"></i></div></div><div class="th-quest-steps">'+steps+'</div><div class="th-story-npc-list">'+npcList+'</div><div class="th-quest-reward">✦<span><b>'+T({vi:'THƯỞNG CỦA CHƯƠNG',en:'CHAPTER REWARD'})+'</b>'+esc(T(currentChapter.reward))+'</span></div></section></div>');modal.querySelector('.th-story-close').onclick=close;modal.querySelector('.th-story-backdrop').onclick=e=>{if(e.target===e.currentTarget)close};modal.querySelectorAll('.th-chapter-tab.is-open').forEach(b=>b.onclick=()=>{state.active=b.dataset.chapter;save();renderQuest()});modal.querySelectorAll('.th-story-npc-link').forEach(b=>b.onclick=()=>talk(people.find(p=>p.id===b.dataset.person)))}
  function renderCharacter(){const h=inject('th-story-huong','<img src="'+portrait+'" alt="" width="360" height="360"><span class="th-story-label"><small>'+T({vi:'GẶP NGƯỜI DẪN ĐƯỜNG',en:'MEET YOUR GUIDE'})+'</small><b>'+T({vi:'Trò chuyện với Hương',en:'Talk to Hương'})+'</b></span>');h.onclick=()=>talk(people[0])}
  function bindZoneCharacters(){window.addEventListener('th-zone-enter',()=>{const id=(window.khuGan&&window.khuGan.id)||'';const p=people.find(x=>x.zone===id);if(p)toast(p.name+T({vi:' đang ở gần - chạm vào huy hiệu người dẫn đường.',en:' is nearby - tap the guide badge.'}))})}
  /* Đổi ngôn ngữ giữa chừng: vẽ lại huy hiệu, thanh chương và danh sách người;
     bảng nào đang mở thì mở lại đúng bảng ấy. Riêng thẻ trả lời sau một lựa
     chọn thì đóng, vì nó đã xong việc. */
  function doiNgonNgu(){renderCharacter();renderPill();renderNpcs();const m=document.getElementById('th-story-modal');if(!m)return;if(m.querySelector('.th-quest-card')){renderQuest();return}if(m.querySelector('.th-story-choice')&&current){talk(current);return}close()}
  function init(){renderCharacter();renderPill();renderNpcs();bindZoneCharacters();new MutationObserver(doiNgonNgu).observe(document.documentElement,{attributes:true,attributeFilter:['lang']});const help=document.getElementById('nut-tro-giup');if(help)help.addEventListener('click',()=>renderQuest());save()}
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);else init();
  window.TH_STORY={talk,renderQuest,progress:()=>completed(chapters[0]),state:()=>state};
})();
