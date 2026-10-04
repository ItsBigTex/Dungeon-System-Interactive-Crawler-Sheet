const cors={"Access-Control-Allow-Origin":"*","Access-Control-Allow-Headers":"authorization, x-client-info, apikey, content-type"};
Deno.serve(async(req)=>{
 if(req.method==="OPTIONS")return new Response("ok",{headers:cors});
 try{
  const key=Deno.env.get("ELEVENLABS_API_KEY");if(!key)throw new Error("ELEVENLABS_API_KEY is not configured");
  const body=await req.json(),text=String(body.text||"").slice(0,2500),voice=String(body.voice_id||"");
  if(!text||!voice)return new Response(JSON.stringify({error:"text and voice_id required"}),{status:400,headers:{...cors,"Content-Type":"application/json"}});
  const model=String(body.model_id||"eleven_v3");
  const r=await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${encodeURIComponent(voice)}?output_format=mp3_44100_128`,{method:"POST",headers:{"xi-api-key":key,"Content-Type":"application/json"},body:JSON.stringify({text,model_id:model,voice_settings:body.voice_settings||{stability:.42,similarity_boost:.78,style:.58,use_speaker_boost:true}})});
  if(!r.ok)return new Response(JSON.stringify({error:"TTS provider error",status:r.status,detail:await r.text()}),{status:r.status,headers:{...cors,"Content-Type":"application/json"}});
  return new Response(await r.arrayBuffer(),{headers:{...cors,"Content-Type":"audio/mpeg","Cache-Control":"no-store"}});
 }catch(e){return new Response(JSON.stringify({error:e.message}),{status:500,headers:{...cors,"Content-Type":"application/json"}})}
});