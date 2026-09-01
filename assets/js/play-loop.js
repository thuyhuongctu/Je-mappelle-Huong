/* Ground-truth target: original trangvien.html. Collectibles are placed from the existing diemKhu anchors and use the original player position. */
(function(){
  'use strict';
  const loot=[
    {id:'research',icon:'📜',name:'Ink of Inquiry',quest:'The Margin Note',index:0},
    {id:'projects',icon:'💎',name:'Blue Evidence Gem',quest:'The Blue Gem',index:1},
    {id:'library',icon:'📚',name:'Clay Bookmark',quest:'Clay Spine',index:2},
    {id:'music',icon:'🎵',name:'Lotus Chime',quest:'The Missing Note',index:3},
    {id:'news',icon:'📰',name:'Golden Pin',quest:'Pin the Good News',index:4},
    {id:'future',icon:'🔮',name:'Future Key',quest:'Leave a Door Open',index:5}
  ];
  let found=JSON.parse(localStorage.getItem('th_play_found')||'[]'); let active=null; let meshes=[]; let running=false;
  const save=()=>localStorage.setItem('th_play_found',JSON.stringify(found));
  const esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  function toast(text){let n=document.getElementById('th-play-toast');if(!n){n=document.createElement('div');n.id='th-play-toast';document.body.appendChild(n)}n.textContent=text;n.className='th-story-toast';setTimeout(()=>n.remove(),2200)}
  function getPlayer(){try{return typeof nhanVat!=='undefined'?nhanVat:null}catch(e){return null}}
  function getWorld(){try{return typeof theGioi!=='undefined'?theGioi:null}catch(e){return null}}
  function addMarkers(){if(typeof THREE==='undefined'||!getWorld()||typeof diemKhu==='undefined')return; loot.forEach((item)=>{if(found.includes(item.id))return;const anchor=diemKhu[item.index];if(!anchor)return;const group=new THREE.Group();const base=new THREE.Mesh(new THREE.CylinderGeometry(.28,.42,.12,8),new THREE.MeshStandardMaterial({color:0x5da99e,roughness:.42,metalness:.05,emissive:0x315f5a,emissiveIntensity:.3}));const gem=new THREE.Mesh(new THREE.OctahedronGeometry(.34,0),new THREE.MeshStandardMaterial({color:0xde87a7,roughness:.3,metalness:.1,emissive:0x7d3658,emissiveIntensity:.48}));gem.position.y=.5;group.add(base,gem);group.position.set(anchor.x+((item.index%2)*1.8-0.9),.86,anchor.z+((item.index%3)-1)*1.5);group.userData={storyLoot:item,homeY:.86,phase:item.index*.7};getWorld().add(group);meshes.push(group)})}
  function ensurePrompt(){let n=document.getElementById('th-pickup');if(!n){n=document.createElement('button');n.id='th-pickup';document.body.appendChild(n);n.onclick=collect}return n}
  function ensureHint(){let n=document.getElementById('th-play-hint');if(!n){n=document.createElement('div');n.id='th-play-hint';document.body.appendChild(n)}return n}
  function collect(){if(!active)return;const item=active;found.push(item.id);save();const mesh=meshes.find(m=>m.userData.storyLoot.id===item.id);if(mesh){mesh.visible=false}active=null;ensurePrompt().classList.remove('show');toast(item.icon+' '+item.name+' added to inventory');if(window.TH_SOUND)window.TH_SOUND.play('collect');if(window.TH_SIDE_QUESTS&&window.TH_SIDE_QUESTS.complete)window.TH_SIDE_QUESTS.complete(item.id);else if(window.TH_SIDE_QUESTS&&window.TH_SIDE_QUESTS.refresh)window.TH_SIDE_QUESTS.refresh();}
  function scan(){const player=getPlayer();if(!player||!meshes.length)return;let nearest=null,dist=Infinity;meshes.forEach(mesh=>{if(!mesh.visible)return;const d=Math.hypot(player.position.x-mesh.position.x,player.position.z-mesh.position.z);if(d<dist){dist=d;nearest=mesh.userData.storyLoot}});if(nearest&&dist<4.8){active=nearest;const p=ensurePrompt();p.innerHTML='<strong>'+nearest.icon+'</strong> Nhặt manh mối · '+esc(nearest.name);p.classList.add('show');ensureHint().textContent='Bạn đang ở gần một dấu vết — chạm Nhặt manh mối';ensureHint().classList.add('show')}else{active=null;ensurePrompt().classList.remove('show');ensureHint().classList.remove('show')}}
  function loop(t){if(!running)return;meshes.forEach(m=>{if(m.visible){m.rotation.y+=.018;m.position.y=m.userData.homeY+Math.sin(t*.002+m.userData.phase)*.12}});scan();requestAnimationFrame(loop)}
  function init(){addMarkers();running=true;requestAnimationFrame(loop);window.addEventListener('keydown',e=>{if((e.key==='e'||e.key==='E')&&active)collect()});}
  const wait=setInterval(()=>{if(typeof THREE!=='undefined'&&typeof diemKhu!=='undefined'&&getWorld()&&getPlayer()){clearInterval(wait);init()}},500);
  window.TH_PLAY_LOOP={collect,refresh:()=>{meshes.forEach(m=>{if(found.includes(m.userData.storyLoot.id))m.visible=false})}};
})();
