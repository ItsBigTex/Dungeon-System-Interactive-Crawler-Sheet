(()=>{
const KEY='descentAudioV4_3';
const defaults={master:.8,voice:.9,sfx:.8,ambience:.45,voiceEnabled:true,sfxEnabled:true};
let ctx=null,ambience=null;
function settings(){try{return {...defaults,...JSON.parse(localStorage.getItem(KEY)||'{}')}}catch{return {...defaults}}}
function save(x){localStorage.setItem(KEY,JSON.stringify({...settings(),...x}))}
function audioCtx(){if(!ctx)ctx=new (window.AudioContext||window.webkitAudioContext)();if(ctx.state==='suspended')ctx.resume().catch(()=>{});return ctx}
function gain(v){return Math.max(0,Math.min(1,Number(v)||0))*settings().master}
function tone(freq=440,dur=.12,type='sine',vol=.2,delay=0){
 if(!settings().sfxEnabled)return;
 try{const c=audioCtx(),o=c.createOscillator(),g=c.createGain(),t=c.currentTime+delay;o.type=type;o.frequency.setValueAtTime(freq,t);g.gain.setValueAtTime(.0001,t);g.gain.exponentialRampToValueAtTime(Math.max(.0001,gain(vol*settings().sfx)),t+.012);g.gain.exponentialRampToValueAtTime(.0001,t+dur);o.connect(g).connect(c.destination);o.start(t);o.stop(t+dur+.03)}catch{}
}
function cue(kind='system_announcement'){
 const k=String(kind).toLowerCase();
 if(k.includes('achievement')){tone(392,.13,'square',.16);tone(523,.18,'square',.14,.12);tone(784,.28,'sawtooth',.11,.27)}
 else if(k.includes('quest')){tone(330,.14,'triangle',.14);tone(440,.22,'triangle',.12,.14)}
 else if(k.includes('loot')){tone(262,.12,'square',.13);tone(392,.12,'square',.13,.11);tone(659,.25,'triangle',.13,.22)}
 else if(k.includes('health')||k.includes('dying')||k.includes('warning')){tone(180,.18,'sawtooth',.16);tone(150,.22,'sawtooth',.14,.22)}
 else if(k.includes('level')){[262,330,392,523].forEach((f,i)=>tone(f,.18,'triangle',.13,i*.11))}
 else {tone(240,.08,'square',.12);tone(480,.12,'triangle',.1,.08)}
}
function bounce(intensity=.5){tone(75+intensity*55,.045,'triangle',.07*intensity)}
function speak(text,opts={}){
 const s=settings();if(!s.voiceEnabled||!('speechSynthesis'in window)||!text)return;
 try{speechSynthesis.cancel();const u=new SpeechSynthesisUtterance(String(text));u.rate=opts.rate||.92;u.pitch=opts.pitch||.72;u.volume=gain(s.voice);const voices=speechSynthesis.getVoices();const preferred=voices.find(v=>/english/i.test(v.name)&&/male|david|mark|daniel|google us/i.test(v.name))||voices.find(v=>/^en/i.test(v.lang));if(preferred)u.voice=preferred;speechSynthesis.speak(u)}catch{}
}
function narrateEvent(n){cue(n.kind||n.event_type);const label=n.kind||'SYSTEM';const words=[label,n.title,n.body].filter(Boolean).join('. ');setTimeout(()=>speak(words),180)}
function startAmbience(){
 const s=settings();if(ambience){stopAmbience();return false}
 try{const c=audioCtx(),src=c.createBufferSource(),buf=c.createBuffer(1,c.sampleRate*2,c.sampleRate),data=buf.getChannelData(0);for(let i=0;i<data.length;i++)data[i]=(Math.random()*2-1)*.18;src.buffer=buf;src.loop=true;const filter=c.createBiquadFilter();filter.type='lowpass';filter.frequency.value=180;const g=c.createGain();g.gain.value=gain(s.ambience*.16);src.connect(filter).connect(g).connect(c.destination);src.start();ambience={src,g};return true}catch{return false}
}
function stopAmbience(){try{ambience?.src.stop()}catch{}ambience=null}
function openSettings(){
 let m=document.querySelector('#audioSettings43');if(!m){m=document.createElement('div');m.id='audioSettings43';m.className='popupback';document.body.appendChild(m)}
 const s=settings();m.innerHTML=`<div class="systempopup audio43-panel"><div class="tag red">SYSTEM AUDIO ENGINE // 4.3</div><h2>Audio Control</h2>
 <label class="audio43-row">MASTER <input data-audio="master" type="range" min="0" max="1" step=".05" value="${s.master}"><span>${Math.round(s.master*100)}%</span></label>
 <label class="audio43-row">VOICE <input data-audio="voice" type="range" min="0" max="1" step=".05" value="${s.voice}"><span>${Math.round(s.voice*100)}%</span></label>
 <label class="audio43-row">SFX <input data-audio="sfx" type="range" min="0" max="1" step=".05" value="${s.sfx}"><span>${Math.round(s.sfx*100)}%</span></label>
 <label class="audio43-row">AMBIENCE <input data-audio="ambience" type="range" min="0" max="1" step=".05" value="${s.ambience}"><span>${Math.round(s.ambience*100)}%</span></label>
 <div class="controls"><button id="audio43Voice">${s.voiceEnabled?'VOICE ON':'VOICE OFF'}</button><button id="audio43Sfx">${s.sfxEnabled?'SFX ON':'SFX OFF'}</button><button id="audio43Test" class="primary">TEST SYSTEM</button><button id="audio43Ambience">${ambience?'STOP AMBIENCE':'START AMBIENCE'}</button></div>
 <p class="muted small">Voice uses the browser's local speech synthesis. No voice provider or API key is required. SFX and low ambience are generated locally with Web Audio.</p><button id="audio43Close">CLOSE</button></div>`;
 m.classList.remove('hidden');
 m.querySelectorAll('[data-audio]').forEach(el=>el.oninput=()=>{save({[el.dataset.audio]:Number(el.value)});el.nextElementSibling.textContent=Math.round(el.value*100)+'%';if(ambience&&el.dataset.audio==='ambience')ambience.g.gain.value=gain(Number(el.value)*.16)});
 m.querySelector('#audio43Voice').onclick=()=>{save({voiceEnabled:!settings().voiceEnabled});openSettings()};
 m.querySelector('#audio43Sfx').onclick=()=>{save({sfxEnabled:!settings().sfxEnabled});openSettings()};
 m.querySelector('#audio43Test').onclick=()=>{cue('achievement');setTimeout(()=>speak('System audio online. Try not to make this embarrassing.'),300)};
 m.querySelector('#audio43Ambience').onclick=()=>{ambience?stopAmbience():startAmbience();openSettings()};
 m.querySelector('#audio43Close').onclick=()=>m.classList.add('hidden');
}
window.addEventListener('pointerdown',()=>{try{audioCtx()}catch{}},{once:true});
window.DescentAudio={settings,save,cue,bounce,speak,narrateEvent,startAmbience,stopAmbience,openSettings};
})();
/* Phase 4.5.1 — Dungeon AI Voice */
(function(){
  const KEY='descentDungeonVoiceV4_5_1';
  const defaults={enabled:true,profile:'system',rate:.88,pitch:.72,volume:1,voiceName:'',autoVoice:true,cues:true};
  let cfg={...defaults};
  try{cfg={...defaults,...JSON.parse(localStorage.getItem(KEY)||'{}')}}catch(_){}
  const profiles={
    system:{rate:.88,pitch:.72,prefix:'System announcement.'},
    achievement:{rate:.93,pitch:.82,prefix:'New achievement.'},
    quest:{rate:.86,pitch:.76,prefix:'New quest.'},
    loot:{rate:.96,pitch:.88,prefix:'Loot box acquired.'},
    warning:{rate:.78,pitch:.62,prefix:'Warning.'},
    boss:{rate:.72,pitch:.55,prefix:'Attention, crawlers.'}
  };
  function save(){try{localStorage.setItem(KEY,JSON.stringify(cfg))}catch(_){}}
  function voices(){return window.speechSynthesis?.getVoices?.()||[]}
  function scoreVoice(v){
    const n=(v.name||'').toLowerCase(),l=(v.lang||'').toLowerCase();
    let x=0;if(l.startsWith('en'))x+=30;
    if(/microsoft|google|natural|enhanced|premium/.test(n))x+=20;
    if(/david|mark|guy|george|daniel|male/.test(n))x+=8;
    if(/zira|samantha|victoria/.test(n))x+=3;
    if(v.localService)x+=4; return x;
  }
  function chooseVoice(){
    const vs=voices();if(!vs.length)return null;
    if(cfg.voiceName){const exact=vs.find(v=>v.name===cfg.voiceName);if(exact)return exact}
    return [...vs].sort((a,b)=>scoreVoice(b)-scoreVoice(a))[0]||null;
  }
  function audioCtx(){const C=window.AudioContext||window.webkitAudioContext;if(!C)return null;window.__descentVoiceCtx=window.__descentVoiceCtx||new C();return window.__descentVoiceCtx}
  function cue(kind='system'){
    if(!cfg.cues)return;const ctx=audioCtx();if(!ctx)return;
    if(ctx.state==='suspended')ctx.resume().catch(()=>{});
    const now=ctx.currentTime, master=ctx.createGain();master.gain.setValueAtTime(.0001,now);master.gain.exponentialRampToValueAtTime(.12,now+.015);master.gain.exponentialRampToValueAtTime(.0001,now+.42);master.connect(ctx.destination);
    [kind==='warning'?92:128,kind==='boss'?61:192].forEach((f,i)=>{const o=ctx.createOscillator(),g=ctx.createGain();o.type=i?'sawtooth':'square';o.frequency.setValueAtTime(f,now);o.frequency.exponentialRampToValueAtTime(f*.72,now+.38);g.gain.value=i?.22:.34;o.connect(g);g.connect(master);o.start(now+i*.035);o.stop(now+.44)});
  }
  function speak(text,kind='system',opts={}){
    if(!cfg.enabled||!text||!window.speechSynthesis)return false;
    const p=profiles[kind]||profiles.system;
    const u=new SpeechSynthesisUtterance(String(text));
    const v=chooseVoice();if(v)u.voice=v;
    u.rate=Math.max(.5,Math.min(1.35,opts.rate??cfg.rate??p.rate));
    u.pitch=Math.max(.35,Math.min(1.3,opts.pitch??cfg.pitch??p.pitch));
    u.volume=Math.max(0,Math.min(1,opts.volume??cfg.volume));
    cue(kind);window.speechSynthesis.cancel();
    setTimeout(()=>window.speechSynthesis.speak(u),cfg.cues?145:0);
    return true;
  }
  function classify(text=''){
    const t=String(text).toLowerCase();
    if(/achievement/.test(t))return'achievement';if(/quest/.test(t))return'quest';
    if(/loot|box acquired/.test(t))return'loot';if(/warning|critical|dying|danger/.test(t))return'warning';
    if(/boss/.test(t))return'boss';return'system';
  }
  function panel(){
    if(document.getElementById('descentVoicePanel'))return;
    const host=document.createElement('div');host.id='descentVoicePanel';host.className='descent-voice-panel';
    host.innerHTML=`<div class="dv-title">DUNGEON AI VOICE <span>4.5.1</span></div>
    <label>Voice <select id="dvVoice"></select></label>
    <label>Profile <select id="dvProfile"><option value="system">SYSTEM</option><option value="achievement">ACHIEVEMENT</option><option value="quest">QUEST</option><option value="loot">LOOT</option><option value="warning">WARNING</option><option value="boss">BOSS</option></select></label>
    <label>Rate <input id="dvRate" type="range" min=".55" max="1.2" step=".01"></label>
    <label>Pitch <input id="dvPitch" type="range" min=".4" max="1.15" step=".01"></label>
    <label class="dv-check"><input id="dvCues" type="checkbox"> Synthetic cue</label>
    <div class="dv-actions"><button type="button" id="dvTest">TEST VOICE</button><button type="button" id="dvClose">CLOSE</button></div>
    <div class="dv-note">Uses voices installed/exposed by this browser. No API key or network audio service required.</div>`;
    document.body.appendChild(host);
    const fill=()=>{const sel=host.querySelector('#dvVoice'),vs=voices();sel.innerHTML='<option value="">AUTO — BEST AVAILABLE</option>'+vs.map(v=>`<option value="${v.name.replace(/"/g,'&quot;')}">${v.name} — ${v.lang}</option>`).join('');sel.value=cfg.voiceName||''};
    fill();if(window.speechSynthesis)window.speechSynthesis.onvoiceschanged=fill;
    host.querySelector('#dvProfile').value=cfg.profile;host.querySelector('#dvRate').value=cfg.rate;host.querySelector('#dvPitch').value=cfg.pitch;host.querySelector('#dvCues').checked=cfg.cues;
    host.addEventListener('input',e=>{if(e.target.id==='dvVoice')cfg.voiceName=e.target.value;if(e.target.id==='dvProfile'){cfg.profile=e.target.value;const p=profiles[cfg.profile];cfg.rate=p.rate;cfg.pitch=p.pitch;host.querySelector('#dvRate').value=cfg.rate;host.querySelector('#dvPitch').value=cfg.pitch}if(e.target.id==='dvRate')cfg.rate=+e.target.value;if(e.target.id==='dvPitch')cfg.pitch=+e.target.value;if(e.target.id==='dvCues')cfg.cues=e.target.checked;save()});
    host.querySelector('#dvTest').onclick=()=>speak('Hello, crawlers. The Dungeon is now listening.',cfg.profile);
    host.querySelector('#dvClose').onclick=()=>host.classList.remove('open');
  }
  function openPanel(){panel();document.getElementById('descentVoicePanel').classList.add('open')}
  document.addEventListener('DOMContentLoaded',()=>{panel();
    document.querySelectorAll('button').forEach(b=>{if((b.textContent||'').trim().toUpperCase()==='AUDIO')b.addEventListener('contextmenu',e=>{e.preventDefault();openPanel()})});
  },{once:true});
  window.DescentDungeonVoice={speak,openPanel,classify,get config(){return {...cfg}},setConfig(x){cfg={...cfg,...x};save()}};
  // Expose a compatible high-level function for new UI hooks without breaking the 4.3 engine.
  window.descentSpeakAI=(text,kind)=>speak(text,kind||classify(text));
})();

/* Phase 4.5.2 — Premium Dungeon AI Voice
   Secure design: browser calls a GM-configured proxy/Edge Function. Provider API keys never live here. */
(function(){
 const KEY='descentPremiumVoiceV4_5_2';
 const defaults={enabled:false,endpoint:'',voiceId:'',modelId:'eleven_v3',stability:.42,similarity:.78,style:.58,speakerBoost:true,fx:true,fallback:true};
 let cfg={...defaults};try{cfg={...defaults,...JSON.parse(localStorage.getItem(KEY)||'{}')}}catch(_){}
 let activeSource=null;
 const save=()=>{try{localStorage.setItem(KEY,JSON.stringify(cfg))}catch(_){}};
 function ctx(){const C=window.AudioContext||window.webkitAudioContext;if(!C)return null;window.__descentPremiumCtx=window.__descentPremiumCtx||new C();return window.__descentPremiumCtx}
 function fxGraph(ac,source,kind){
   const input=ac.createGain(),comp=ac.createDynamicsCompressor(),eq=ac.createBiquadFilter(),presence=ac.createBiquadFilter(),dry=ac.createGain(),wet=ac.createGain(),delay=ac.createDelay(.4),feedback=ac.createGain(),out=ac.createGain();
   eq.type='lowshelf';eq.frequency.value=180;eq.gain.value=kind==='boss'?5:3;
   presence.type='peaking';presence.frequency.value=1650;presence.Q.value=.8;presence.gain.value=kind==='warning'?4:2;
   comp.threshold.value=-22;comp.knee.value=10;comp.ratio.value=5;comp.attack.value=.008;comp.release.value=.16;
   delay.delayTime.value=kind==='boss'?.115:.075;feedback.gain.value=.22;dry.gain.value=.92;wet.gain.value=.18;out.gain.value=.95;
   source.connect(input);input.connect(eq);eq.connect(presence);presence.connect(comp);comp.connect(dry);dry.connect(out);comp.connect(delay);delay.connect(feedback);feedback.connect(delay);delay.connect(wet);wet.connect(out);out.connect(ac.destination);
 }
 async function premiumSpeak(text,kind='system'){
   if(!cfg.enabled||!cfg.endpoint||!cfg.voiceId)throw new Error('Premium voice is not configured.');
   const res=await fetch(cfg.endpoint,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({text:String(text),voice_id:cfg.voiceId,model_id:cfg.modelId,profile:kind,voice_settings:{stability:cfg.stability,similarity_boost:cfg.similarity,style:cfg.style,use_speaker_boost:cfg.speakerBoost}})});
   if(!res.ok)throw new Error(`Voice proxy returned ${res.status}`);
   const type=(res.headers.get('content-type')||'').toLowerCase();
   let buf;
   if(type.includes('application/json')){
     const data=await res.json();if(!data.audio_base64)throw new Error('Voice proxy JSON did not contain audio_base64.');
     const bin=atob(data.audio_base64),u=new Uint8Array(bin.length);for(let i=0;i<bin.length;i++)u[i]=bin.charCodeAt(i);buf=u.buffer;
   }else buf=await res.arrayBuffer();
   const ac=ctx();if(!ac)throw new Error('Web Audio unavailable.');
   if(ac.state==='suspended')await ac.resume();
   const decoded=await ac.decodeAudioData(buf.slice(0)),src=ac.createBufferSource();src.buffer=decoded;
   if(activeSource)try{activeSource.stop()}catch(_){}
   activeSource=src;if(cfg.fx)fxGraph(ac,src,kind);else src.connect(ac.destination);
   src.onended=()=>{if(activeSource===src)activeSource=null};src.start();return true;
 }
 async function speak(text,kind='system'){
   try{return await premiumSpeak(text,kind)}catch(err){console.warn('[Descent Premium Voice]',err);if(cfg.fallback&&window.DescentDungeonVoice?.speak)return window.DescentDungeonVoice.speak(text,kind);throw err}
 }
 function panel(){
   if(document.getElementById('descentPremiumVoicePanel'))return;
   const d=document.createElement('div');d.id='descentPremiumVoicePanel';d.className='descent-voice-panel premium-voice-panel';
   d.innerHTML=`<div class="dv-title">PREMIUM DUNGEON AI <span>4.5.2</span></div>
   <label class="dv-check"><input id="pvEnabled" type="checkbox"> Premium voice enabled</label>
   <label>Proxy URL <input id="pvEndpoint" type="url" placeholder="https://…/functions/v1/dungeon-voice"></label>
   <label>Voice ID <input id="pvVoice" type="text" placeholder="Provider voice ID"></label>
   <label>Model <select id="pvModel"><option value="eleven_v3">Eleven v3</option><option value="eleven_multilingual_v2">Multilingual v2</option><option value="eleven_flash_v2_5">Flash v2.5</option></select></label>
   <label>Stability <input id="pvStability" type="range" min="0" max="1" step=".01"></label>
   <label>Similarity <input id="pvSimilarity" type="range" min="0" max="1" step=".01"></label>
   <label>Style <input id="pvStyle" type="range" min="0" max="1" step=".01"></label>
   <label class="dv-check"><input id="pvFx" type="checkbox"> Dungeon FX chain</label>
   <label class="dv-check"><input id="pvFallback" type="checkbox"> 4.5.1 fallback</label>
   <div class="dv-actions"><button type="button" id="pvTest">TEST PREMIUM</button><button type="button" id="pvClose">CLOSE</button></div>
   <div id="pvStatus" class="dv-note">API key stays server-side. This page stores only the proxy URL, voice ID, and presentation settings.</div>`;
   document.body.appendChild(d);
   const map={pvEnabled:'enabled',pvEndpoint:'endpoint',pvVoice:'voiceId',pvModel:'modelId',pvStability:'stability',pvSimilarity:'similarity',pvStyle:'style',pvFx:'fx',pvFallback:'fallback'};
   for(const [id,k] of Object.entries(map)){const el=d.querySelector('#'+id);if(el.type==='checkbox')el.checked=!!cfg[k];else el.value=cfg[k];el.addEventListener('input',()=>{cfg[k]=el.type==='checkbox'?el.checked:(el.type==='range'?+el.value:el.value.trim());save()})}
   d.querySelector('#pvTest').onclick=async()=>{const st=d.querySelector('#pvStatus');st.textContent='Generating…';try{await speak('Hello, crawlers. Welcome to the Dungeon.', 'system');st.textContent='Premium audio playing.'}catch(e){st.textContent='Test failed: '+e.message}};
   d.querySelector('#pvClose').onclick=()=>d.classList.remove('open');
 }
 function openPanel(){panel();document.getElementById('descentPremiumVoicePanel').classList.add('open')}
 document.addEventListener('DOMContentLoaded',panel,{once:true});
 window.DescentPremiumVoice={speak,openPanel,get config(){return {...cfg}},setConfig(x){cfg={...cfg,...x};save()}};
 window.descentSpeakAI=(text,kind)=>speak(text,kind||window.DescentDungeonVoice?.classify?.(text)||'system');
})();
