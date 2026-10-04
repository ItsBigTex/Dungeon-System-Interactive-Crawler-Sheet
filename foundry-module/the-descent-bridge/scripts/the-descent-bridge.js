const MODULE_ID='the-descent-bridge';
const API_PREFIX='/modules/the-descent-bridge/api';
const events=[]; let eventId=0;

function pushEvent(type,data={}) {
 const e={id:++eventId,type,data,created_at:new Date().toISOString()};
 events.push(e); if(events.length>200)events.splice(0,events.length-200);
 game.socket?.emit(`module.${MODULE_ID}`,{type:'bridge_event',event:e});
 return e;
}
function tokenOK(request){
 const expected=String(game.settings.get(MODULE_ID,'bridgeToken')||'');
 const got=String(request.headers.get('X-Descent-Bridge-Token')||'');
 return expected.length>=8 && got===expected;
}
function cors(headers=new Headers()){headers.set('Access-Control-Allow-Origin','*');headers.set('Access-Control-Allow-Headers','Content-Type, X-Descent-Bridge-Token');headers.set('Access-Control-Allow-Methods','GET, POST, OPTIONS');return headers}
function json(data,status=200){return new Response(JSON.stringify(data),{status,headers:cors(new Headers({'Content-Type':'application/json'}))})}
async function handleCommand(action,payload){
 if(!game.user?.isGM)throw new Error('The active Foundry client is not a GM.');
 switch(action){
  case 'activate_scene': {
   const scene=game.scenes?.find(s=>s.name===payload.name);if(!scene)throw new Error(`Scene not found: ${payload.name}`);
   await scene.activate();ui.notifications.info(`The Descent: activated ${scene.name}`);pushEvent('scene_activated',{id:scene.id,name:scene.name});return {scene:scene.name};
  }
  case 'play_playlist': {
   const pl=game.playlists?.find(p=>p.name===payload.name);if(!pl)throw new Error(`Playlist not found: ${payload.name}`);
   await pl.playAll();ui.notifications.info(`The Descent: playing ${pl.name}`);pushEvent('playlist_started',{id:pl.id,name:pl.name});return {playlist:pl.name};
  }
  case 'system_announcement': {
   const text=String(payload.text||'').slice(0,2000);if(!text)throw new Error('Announcement is empty.');
   await ChatMessage.create({content:`<div class="descent-system-announcement"><b>THE SYSTEM</b><br>${foundry.utils.escapeHTML(text)}</div>`,speaker:{alias:'THE SYSTEM'}});
   ui.notifications.info('The Descent: System announcement received.');pushEvent('system_announcement',{text});return {announced:true};
  }
  case 'encounter': {
   const name=String(payload.name||'Encounter');ui.notifications.info(`The Descent encounter received: ${name}`);
   await ChatMessage.create({content:`<div class="descent-encounter"><b>THE DESCENT // ENCOUNTER</b><br>${foundry.utils.escapeHTML(name)}<br><small>Round ${Number(payload.round||1)} // ${foundry.utils.escapeHTML(String(payload.phase||''))}</small></div>`,speaker:{alias:'THE SYSTEM'}});
   pushEvent('encounter_received',{id:payload.id||null,name,round:payload.round||1,phase:payload.phase||''});return {encounter:name};
  }
  default: throw new Error(`Unsupported command: ${action}`);
 }
}

const FLOOR1_SCENES=[
 ['downtown','Downtown Brownwood — The Homecoming',4200,3000,'campaign-reconstruction'],
 ['bhs','Brownwood High School',4200,3000,'campaign-reconstruction'],
 ['coliseum','Brownwood Coliseum',3600,3600,'reference-derived'],
 ['jail','Brown County Lockup',3200,2600,'fictionalized-secure-interior'],
 ['rex',"Rex's Texas Lanes",4200,2600,'reference-derived'],
 ['weakley','Weakley-Watson Sporting Goods',3400,2600,'campaign-reconstruction'],
 ['stripes','Stripes — 601 W Commerce',3400,2600,'reference-derived'],
 ['stadium','Gordon Wood Stadium — Friday Night Forever',5000,3200,'reference-derived'],
 ['rr','R&R Cards and Games — 403 Fisk',4200,3000,'player-supplied-layout'],
 ['home','Home, Sweet Home?',3200,2400,'campaign-reconstruction']
];
async function descentFolder(name,type,key){
 let f=game.folders.find(x=>x.type===type&&x.getFlag(MODULE_ID,'key')===key);
 return f||Folder.create({name,type,flags:{[MODULE_ID]:{managed:true,key,phase:'4.4.1'}}});
}
async function initializeWorld(){
 if(!game.user?.isGM)throw new Error('GM permission required.');
 const folder=await descentFolder('THE DESCENT — FLOOR 1','Scene','floor1');
 const refs=await descentFolder('THE DESCENT — REFERENCE','JournalEntry','references');
 let created=0,updated=0;
 for(const [key,name,width,height,fidelity] of FLOOR1_SCENES){
  let scene=game.scenes.find(x=>x.getFlag(MODULE_ID,'key')===key);
  const flags={[MODULE_ID]:{managed:true,key,floor:1,fidelity,phase:'4.4.1'}};
  if(!scene){await Scene.create({name,width,height,grid:{type:1,size:100},folder:folder.id,navigation:false,flags});created++}
  else{await scene.update({folder:folder.id,flags});updated++}
 }
 let journal=game.journal.find(x=>x.getFlag(MODULE_ID,'key')==='floor1-reference');
 if(!journal)journal=await JournalEntry.create({name:'Floor 1 Reference Bible',folder:refs.id,flags:{[MODULE_ID]:{managed:true,key:'floor1-reference',phase:'4.4.1'}}});
 if(!journal.pages.find(x=>x.name==='Homecoming Reference'))await journal.createEmbeddedDocuments('JournalEntryPage',[{name:'Homecoming Reference',type:'text',text:{format:1,content:`<h1>Floor One — The Homecoming</h1><p><b>Reality Reference → Dungeon Reconstruction → System Corruption</b></p><p>R&amp;R uses the player-supplied layout. Brownwood High and Weakley-Watson are campaign reconstructions, not authentic floor plans. Brown County Lockup uses a fictionalized secure interior.</p>`}}]);
 pushEvent('world_initialized',{created,updated,total:FLOOR1_SCENES.length});
 ui.notifications.info(`The Descent initialized: ${created} created, ${updated} updated.`);
 return {created,updated,total:FLOOR1_SCENES.length,scenes:FLOOR1_SCENES.map(x=>x[1])};
}
async function initializeDialog(){
 const ok=await foundry.applications.api.DialogV2.confirm({window:{title:'Initialize The Descent World'},content:`<p>Create/update ${FLOOR1_SCENES.length} blank managed Floor 1 scenes?</p><p>This is safe to rerun and does not create map art, walls, tokens, or mechanics.</p>`,yes:{label:'Initialize Floor 1'},no:{label:'Cancel'}});
 if(ok)return initializeWorld();
}


const RR_MAP={key:'rr',sceneName:'R&R Cards and Games — 403 Fisk',width:4200,height:3000,
rooms:[['Manager / Back Office',120,120,760,520],['Bathrooms / Storage',900,120,780,520],['Packing / Mail',3060,120,900,520],['Card Sorting',3060,660,900,500],["D&D Room",3060,1180,900,560],['Sales / Displays',120,700,1120,1200],['TCG Play Area',1280,700,1700,1250],['Warhammer Tables',2600,1980,1360,760]],
lights:[[1660,1050,500],[2240,1050,500],[1660,1430,500],[2240,1430,500],[650,1250,400],[3500,1450,400],[3300,2350,500]],
spawns:[['Crawler Entry',2100,2760],['Sales Counter',900,1450],['TCG Floor',2100,1450],['D&D Room',3500,1450],['Manager Office',500,400]]};
function rrWalls(){let a=[],f=(x1,y1,x2,y2,door=0)=>a.push({c:[x1,y1,x2,y2],door,move:1,sight:1,sound:1});
f(80,80,4120,80);f(4120,80,4120,2920);f(4120,2920,80,2920);f(80,2920,80,80);
[[880,80,880,640],[1680,80,1680,640],[3040,80,3040,1740],[80,640,1680,640],[3040,640,4120,640],[3040,1160,4120,1160],[3040,1740,4120,1740],[1240,640,1240,1900],[1240,1900,2600,1900],[2600,1900,2600,2920]].forEach(x=>f(...x));
[[880,390,880,540],[1680,390,1680,540],[3040,390,3040,540],[3040,900,3040,1050],[3040,1420,3040,1570],[1240,1200,1240,1380],[2500,1980,2680,1980],[1950,2920,2250,2920]].forEach(x=>f(...x,1));return a}
async function buildRRMap(){
if(!game.user?.isGM)throw new Error('GM permission required.');
let scene=game.scenes.find(x=>x.getFlag(MODULE_ID,'key')==='rr')||game.scenes.find(x=>x.name===RR_MAP.sceneName);
if(!scene)throw new Error('R&R managed scene not found. Run INITIALIZE FLOOR 1 first.');
for(const [type,col] of [['Wall',scene.walls],['AmbientLight',scene.lights],['Note',scene.notes]]){let old=col.filter(x=>x.getFlag(MODULE_ID,'mapEngine')==='rr');if(old.length)await scene.deleteEmbeddedDocuments(type,old.map(x=>x.id))}
let flag={flags:{[MODULE_ID]:{mapEngine:'rr',phase:'4.4.2'}}};
await scene.update({width:4200,height:3000,grid:{type:1,size:100},padding:.05,backgroundColor:'#151311',background:{src:'modules/the-descent-bridge/assets/rr-homecoming-prototype.svg'}});
await scene.createEmbeddedDocuments('Wall',rrWalls().map(x=>({...x,...flag})));
await scene.createEmbeddedDocuments('AmbientLight',RR_MAP.lights.map(([x,y,r])=>({x,y,config:{dim:r,bright:Math.max(100,r-200),color:'#f0d7a1',alpha:.18},...flag})));
let notes=[...RR_MAP.rooms.map(([text,x,y,w,h])=>({x:x+w/2,y:y+h/2,text,icon:'icons/svg/book.svg'})),...RR_MAP.spawns.map(([text,x,y])=>({x,y,text:'SPAWN // '+text,icon:'icons/svg/target.svg'}))];
await scene.createEmbeddedDocuments('Note',notes.map(x=>({...x,...flag})));await scene.setFlag(MODULE_ID,'rrLayout',RR_MAP);
pushEvent('map_built',{scene:scene.name,map:'rr'});ui.notifications.info('The Descent: R&R prototype built.');return {scene:scene.name,walls:rrWalls().length,lights:RR_MAP.lights.length,rooms:RR_MAP.rooms.length,spawns:RR_MAP.spawns.length}}
async function rrMapDialog(){let ok=await foundry.applications.api.DialogV2.confirm({window:{title:'Build R&R Homecoming Prototype'},content:'<p>Build/rebuild R&R from the player-supplied layout? Only Descent-tagged map objects are replaced.</p>',yes:{label:'BUILD R&R MAP'},no:{label:'Cancel'}});if(ok)return buildRRMap()}

Hooks.once('init',()=>{
 game.settings.register(MODULE_ID,'bridgeToken',{name:'Bridge Token',hint:'Local secret shared with The Descent Crawler Portal. Do not use your Foundry license key.',scope:'world',config:true,type:String,default:''});
 game.settings.register(MODULE_ID,'bridgeEnabled',{name:'Enable Local HTTP Bridge',hint:'Allows the local Crawler Portal to send GM-approved presentation commands to this Foundry world.',scope:'world',config:true,type:Boolean,default:false});
 game.settings.registerMenu(MODULE_ID,'initializer',{name:'Initialize The Descent World',label:'INITIALIZE FLOOR 1',hint:'Create/update the managed Homecoming scene structure.',icon:'fas fa-dungeon',type:class extends foundry.applications.api.ApplicationV2{render(){initializeDialog();return this}},restricted:true});
 game.settings.registerMenu(MODULE_ID,'rrMap',{name:'Homecoming Map Engine',label:'BUILD R&R PROTOTYPE',hint:'Build the R&R prototype map infrastructure.',icon:'fas fa-map',type:class extends foundry.applications.api.ApplicationV2{render(){rrMapDialog();return this}},restricted:true});
});
Hooks.once('ready',()=>{
 console.log('The Descent Bridge 0.4.4 ready.');
 game.socket?.on(`module.${MODULE_ID}`,msg=>{if(msg?.type==='bridge_event')Hooks.callAll('descentBridgeEvent',msg.event)});
 pushEvent('foundry_ready',{world:game.world?.title,version:game.version});
});

/*
 Foundry modules run in the browser, while the Foundry web server owns HTTP routes.
 Phase 4.4 therefore exposes a local bridge adapter contract below. If your Foundry
 host permits module route middleware, bind these handlers to API_PREFIX. The included
 portal UI and module command processor are already separated so 4.4 can be tested
 with Foundry socket/client integration before adding a host-side adapter.
*/
globalThis.TheDescentBridge={
 MODULE_ID,API_PREFIX,pushEvent,handleCommand,initializeWorld,initializeDialog,FLOOR1_SCENES,RR_MAP,buildRRMap,rrMapDialog,
 status:()=>({ok:true,foundry_version:game.version,world:game.world?.title||'',scene:canvas?.scene?.name||'',user:game.user?.name||'',is_gm:!!game.user?.isGM}),
 eventsAfter:(after=0)=>events.filter(e=>e.id>Number(after||0))
};
