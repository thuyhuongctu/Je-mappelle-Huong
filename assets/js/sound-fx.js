/* Original Trang viên 3D extension: touch-safe sound layer using Web Audio API plus the existing music.js tracks. */
(function(){
  'use strict';
  let ctx=null,master=null,ambientStarted=false;
  let enabled=localStorage.getItem('th_sound_enabled')!=='0';
  const tones={
    collect:[['C5',.08,.09],['G5',.12,.12],['C6',.18,.16]],
    quest:[['E5',.08,.08],['G5',.1,.1],['B5',.2,.18],['E6',.28,.2]],
    right:[['G5',.07,.07],['C6',.14,.12]],
    wrong:[['D3',.14,.12],['C3',.22,.12]],
    start:[['C4',.08,.06],['E4',.08,.06],['G4',.16,.12]],
    win:[['C5',.1,.1],['E5',.1,.1],['G5',.1,.1],['C6',.34,.24]],
    lose:[['E4',.12,.08],['D4',.12,.08],['C4',.3,.14]]
  };
  const hz=n=>({C3:130.81,D3:146.83,E4:329.63,C4:261.63,E5:659.25,G4:392,G5:783.99,B5:987.77,C5:523.25,C6:1046.5,E6:1318.5,D4:293.66}[n]||440);
  function init(){if(ctx)return;const AC=window.AudioContext||window.webkitAudioContext;if(!AC)return;ctx=new AC();master=ctx.createGain();master.gain.value=enabled?.18:0;master.connect(ctx.destination)}
  function resume(){init();if(ctx&&ctx.state==='suspended')ctx.resume()}
  function play(name){if(!enabled)return;resume();if(!ctx||!master)return;let at=ctx.currentTime+.01;(tones[name]||[]).forEach(([note,dur,gap])=>{const o=ctx.createOscillator(),g=ctx.createGain();o.type=name==='wrong'?'triangle':'sine';o.frequency.value=hz(note);g.gain.setValueAtTime(.0001,at);g.gain.exponentialRampToValueAtTime(.5,at+.012);g.gain.exponentialRampToValueAtTime(.0001,at+dur);o.connect(g).connect(master);o.start(at);o.stop(at+dur+.03);at+=gap})}
  function startAmbient(){if(!enabled||ambientStarted)return;ambientStarted=true;resume();if(window.HUONG_MUSIC&&window.HUONG_MUSIC.playNhacKhuonVien){window.HUONG_MUSIC.playNhacKhuonVien()}}
  function toggle(){enabled=!enabled;localStorage.setItem('th_sound_enabled',enabled?'1':'0');resume();if(master)master.gain.setTargetAtTime(enabled?.18:0,ctx.currentTime,.04);if(enabled){play('start');startAmbient()}else if(window.HUONG_MUSIC&&window.HUONG_MUSIC.dungNhacNen)window.HUONG_MUSIC.dungNhacNen();update()}
  function update(){const b=document.getElementById('nut-am-thanh');if(b){b.textContent=enabled?'🔊':'🔇';b.setAttribute('aria-label',enabled?'Sound on':'Sound off')}}
  function bind(){const b=document.getElementById('nut-am-thanh');if(b)b.addEventListener('click',toggle);const start=document.getElementById('nut-vao');if(start)start.addEventListener('click',()=>{resume();startAmbient()},{once:false});['pointerdown','touchstart','keydown'].forEach(ev=>window.addEventListener(ev,resume,{once:true,passive:true}));update()}
  window.TH_SOUND={play,startAmbient,toggle,isEnabled:()=>enabled};
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',bind);else bind();
})();
