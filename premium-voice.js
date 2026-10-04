/* Phase 4.5.2.5 — Standalone Premium Voice Engine
   Intentionally independent of the legacy 4.3 audio engine and 4.5.1 SpeechSynthesis engine. */
(function(){
 'use strict';
 const KEY='descentPremiumVoiceV4_5_2';
 const defaults={enabled:false,endpoint:'',voiceId:'',modelId:'eleven_v3',stability:.42,similarity:.78,style:.58,speakerBoost:true,fx:true,fallback:true};
 let cfg={...defaults};
 try{cfg={...defaults,...JSON.parse(localStorage.getItem(KEY)||'{}')}}catch(_){}
 let activeSource=null;
 const save=()=>{try{localStorage.setItem(KEY,JSON.stringify(cfg))}catch(_){}};
 function getCtx(){const C=window.AudioContext||window.webkitAudioContext;if(!C)return null;window.__descentPremiumCtx=window.__descentPremiumCtx||new C();return window.__descentPremiumCtx}
 function connectFx(ac,source,kind){
   const eq=ac.createBiquadFilter(),presence=ac.createBiquadFilter(),comp=ac.createDynamicsCompressor(),dry=ac.createGain(),wet=ac.createGain(),delay=ac.createDelay(.4),feedback=ac.createGain(),out=ac.createGain();
   eq.type='lowshelf';eq.frequency.value=180;eq.gain.value=kind==='boss'?5:3;
   presence.type='peaking';presence.frequency.value=1650;presence.Q.value=.8;presence.gain.value=kind==='warning'?4:2;
   comp.threshold.value=-22;comp.knee.value=10;comp.ratio.value=5;comp.attack.value=.008;comp.release.value=.16;
   delay.delayTime.value=kind==='boss'?.115:.075;feedback.gain.value=.22;dry.gain.value=.92;wet.gain.value=.18;out.gain.value=.95;
   source.connect(eq);eq.connect(presence);presence.connect(comp);comp.connect(dry);dry.connect(out);comp.connect(delay);delay.connect(feedback);feedback.connect(delay);delay.connect(wet);wet.connect(out);out.connect(ac.destination);
 }
 async function speak(text,kind='system'){
   if(!cfg.enabled)throw new Error('Premium voice is disabled.');
   if(!cfg.endpoint)throw new Error('Proxy URL is missing.');
   if(!cfg.voiceId)throw new Error('Voice ID is missing.');
   const res=await fetch(cfg.endpoint,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({text:String(text),voice_id:cfg.voiceId,model_id:cfg.modelId,profile:kind,voice_settings:{stability:cfg.stability,similarity_boost:cfg.similarity,style:cfg.style,use_speaker_boost:cfg.speakerBoost}})});
   if(!res.ok){let detail='';try{detail=await res.text()}catch(_){}throw new Error('Voice proxy returned '+res.status+(detail?' — '+detail.slice(0,240):''));}
   const type=(res.headers.get('content-type')||'').toLowerCase();let buf;
   if(type.includes('application/json')){
     const data=await res.json();if(!data.audio_base64)throw new Error('Proxy returned JSON without audio_base64.');
     const bin=atob(data.audio_base64),u=new Uint8Array(bin.length);for(let i=0;i<bin.length;i++)u[i]=bin.charCodeAt(i);buf=u.buffer;
   } else buf=await res.arrayBuffer();
   const ac=getCtx();if(!ac)throw new Error('Web Audio is unavailable in this browser.');
   if(ac.state==='suspended')await ac.resume();
   const decoded=await ac.decodeAudioData(buf.slice(0)),source=ac.createBufferSource();source.buffer=decoded;
   if(activeSource)try{activeSource.stop()}catch(_){}
   activeSource=source;if(cfg.fx)connectFx(ac,source,kind);else source.connect(ac.destination);
   source.onended=()=>{if(activeSource===source)activeSource=null};source.start();return true;
 }
 function openPanel(){
   const d=document.getElementById('premiumVoiceDialog');
   if(d&&d.showModal){if(!d.open)d.showModal();return;}
   throw new Error('Premium voice dialog is unavailable.');
 }
 window.DescentPremiumVoice={
   speak,openPanel,
   get config(){return {...cfg}},
   setConfig(x){cfg={...cfg,...x};save();return {...cfg}}
 };
 window.__descentPremiumStandaloneReady=true;
 console.info('[The Descent] Standalone Premium Voice Engine 4.5.2.5 ONLINE');
})();
