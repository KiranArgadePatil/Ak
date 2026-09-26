const $=s=>document.querySelector(s);
const video=$("#video"),empty=$("#empty"),media=$("#media"),timeline=$("#timeline"),tools=$("#tools"),overlay=$("#overlay"),preview=$("#preview"),musicInfo=$("#musicInfo"),status=$("#status");
let files=[],musicFile=null,trimStart=0,trimEnd=0,ratio="original",splitPoints=[],currentIndex=0,currentImage=null;

const fmt=s=>!isFinite(s)?"0:00":Math.floor(s/60)+":"+String(Math.floor(s%60)).padStart(2,"0");
const msg=(t,e=false)=>{status.textContent=t;status.style.color=e?"#ff879a":"#9fe3ad"};

media.onchange=e=>{files=[...e.target.files];currentIndex=0;splitPoints=[];load(files[0]);renderTimeline()};

function load(f){
 currentImage=null;
 if(f.type.startsWith("image/")){
   video.pause();video.removeAttribute("src");video.style.display="none";empty.style.display="none";
   currentImage=new Image();currentImage.src=URL.createObjectURL(f);currentImage.onload=()=>{empty.style.display="none";preview.style.backgroundImage="url('"+currentImage.src+"')";preview.style.backgroundSize="contain";preview.style.backgroundRepeat="no-repeat";preview.style.backgroundPosition="center";msg("Photo तयार आहे — Text/Ratio वापरू शकता.")};
   trimStart=0;trimEnd=5;
 }else{
   preview.style.backgroundImage="";
   video.src=URL.createObjectURL(f);video.style.display="block";empty.style.display="none";
   trimStart=0;trimEnd=0;
   video.onloadedmetadata=()=>{trimEnd=video.duration;renderTimeline()};
 }
 renderTimeline();
}

function renderTimeline(){
 if(!files.length){timeline.textContent="Media जोडल्यावर Timeline येथे दिसेल";return}
 let html=files.map((f,i)=>{
   const active=i===currentIndex?" active":"";
   return '<span class="clip'+active+'" data-i="'+i+'">'+(i+1)+" • "+f.name.slice(0,18)+'<small>'+ (f.type.startsWith("image/")?"Photo":"Video")+"</small></span>";
 }).join("");
 if(!currentImage && video.duration){
   const cuts=[trimStart,...splitPoints,trimEnd].filter((v,i,a)=>i===0||v!==a[i-1]);
   html+='<div class="segments">'+cuts.slice(0,-1).map((s,i)=>'<span class="segment">Segment '+(i+1)+'<small>'+fmt(s)+' → '+fmt(cuts[i+1])+'</small></span>').join("")+"</div>";
 }
 timeline.innerHTML=html;
 timeline.querySelectorAll(".clip").forEach(c=>c.onclick=()=>{currentIndex=+c.dataset.i;splitPoints=[];load(files[currentIndex])});
}

document.querySelectorAll("[data-a]").forEach(b=>b.onclick=()=>act(b.dataset.a));

function act(a){
 if(!video.src && !currentImage){tools.innerHTML="<b>आधी Photo / Video निवडा.</b>";return}
 if(a==="trim"){
   const d=currentImage?5:(video.duration||0);
   tools.innerHTML='<div class="tools"><b>✂️ Trim</b><label>Start <input id="ts" type="range" min="0" max="'+d+'" step=".1" value="'+trimStart+'"></label><span id="tsv">'+fmt(trimStart)+'</span><label>End <input id="te" type="range" min="0" max="'+d+'" step=".1" value="'+(trimEnd||d)+'"></label><span id="tev">'+fmt(trimEnd||d)+'</span><button id="applyTrim">Apply</button><div class="hint">Timeline sliders ओढून Trim करा.</div></div>';
 }
 if(a==="split"){
   if(currentImage){tools.innerHTML="<b>Photo साठी Split नाही.</b>";return}
   tools.innerHTML='<b>✂️ Split</b><span>Current: '+fmt(video.currentTime)+'</span><button id="addSplit">येथे Split</button><button id="clearSplit">Clear</button><div class="hint">Video थांबवून ज्या ठिकाणी कट हवा तेथे Split दाबा.</div>';
 }
 if(a==="ratio")tools.innerHTML='<b>Ratio</b><button data-r="original">Original</button><button data-r="9:16">9:16 Reel</button><button data-r="1:1">1:1</button><button data-r="16:9">16:9</button>';
 if(a==="text")tools.innerHTML='<input id="txt" placeholder="Marathi / English Text लिहा"><button id="add">Add</button><button id="clearText">Clear</button>';
 if(a==="speed")tools.innerHTML='<button data-v=".5">0.5×</button><button data-v="1">1×</button><button data-v="1.5">1.5×</button><button data-v="2">2×</button>';
 if(a==="filter")tools.innerHTML='<button data-f="none">Original</button><button data-f="grayscale(1)">B&W</button><button data-f="sepia(1)">Sepia</button><button data-f="contrast(1.4) saturate(1.3)">Vivid</button>';
 if(a==="volume")tools.innerHTML='<span>Video</span><input id="vol" type="range" min="0" max="1" step=".05" value="'+video.volume+'">';
}

tools.onclick=e=>{
 const t=e.target;
 if(t.dataset.v && video.src)video.playbackRate=+t.dataset.v;
 if(t.dataset.f!==undefined && video.src)video.style.filter=t.dataset.f;
 if(t.dataset.r){ratio=t.dataset.r;preview.classList.toggle("video-916",ratio==="9:16");preview.classList.toggle("ratio-square",ratio==="1:1");preview.classList.toggle("ratio-wide",ratio==="16:9");msg("Ratio: "+ratio)}
 if(t.id==="add")overlay.textContent=$("#txt").value;
 if(t.id==="clearText")overlay.textContent="";
 if(t.id==="applyTrim"){
   const s=parseFloat($("#ts").value),en=parseFloat($("#te").value);
   if(s>=0&&en>s&&en<=(currentImage?5:video.duration)){trimStart=s;trimEnd=en;if(video.src)video.currentTime=s;renderTimeline();msg("Trim सेट: "+fmt(s)+" → "+fmt(en))}
   else msg("Start/End चुकीचे आहेत.",true)
 }
 if(t.id==="addSplit"){
   const p=video.currentTime;
   if(p>0&&p<video.duration&&!splitPoints.some(x=>Math.abs(x-p)<.2)){splitPoints.push(p);splitPoints.sort((a,b)=>a-b);renderTimeline();msg("Split point: "+fmt(p))}
 }
 if(t.id==="clearSplit"){splitPoints=[];renderTimeline();msg("Split points काढले.")}
};

tools.oninput=e=>{
 if(e.target.id==="vol")video.volume=+e.target.value;
 if(e.target.id==="ts"){trimStart=+e.target.value;$("#tsv").textContent=fmt(trimStart)}
 if(e.target.id==="te"){trimEnd=+e.target.value;$("#tev").textContent=fmt(trimEnd)}
};

$("#music").onchange=e=>{
 musicFile=e.target.files[0];
 if(musicFile){musicInfo.innerHTML='<div class="music">🎵 '+musicFile.name+' <button id="removeMusic">×</button><label>Music volume <input id="musicVol" type="range" min="0" max="1" step=".05" value=".7"></label></div>';msg("Music जोडले.")}
};
musicInfo.onclick=e=>{if(e.target.id==="removeMusic"){musicFile=null;musicInfo.innerHTML="";msg("Music काढले.")}};

function mimeType(){
 return ["video/webm;codecs=vp9,opus","video/webm;codecs=vp8,opus","video/webm"].find(x=>MediaRecorder.isTypeSupported(x))||"";
}

async function exportVideo(){
 if(!video.src||!video.duration){msg("Export साठी सध्या Video निवडा.",true);return}
 const mime=mimeType();if(!mime){msg("या browser मध्ये Export समर्थित नाही.",true);return}
 const oldTime=video.currentTime,oldRate=video.playbackRate;
 const canvas=document.createElement("canvas");
 if(ratio==="9:16"){canvas.width=720;canvas.height=1280}else if(ratio==="1:1"){canvas.width=1080;canvas.height=1080}else if(ratio==="16:9"){canvas.width=1280;canvas.height=720}else{canvas.width=video.videoWidth||1280;canvas.height=video.videoHeight||720}
 const ctx=canvas.getContext("2d"),stream=canvas.captureStream(30);
 let audioCtx=null,dest=null,vs=null,ms=null,musicEl=null;
 try{
   audioCtx=new(window.AudioContext||window.webkitAudioContext)();dest=audioCtx.createMediaStreamDestination();
   vs=audioCtx.createMediaElementSource(video);const vg=audioCtx.createGain();vg.gain.value=video.volume;vs.connect(vg).connect(dest);
   if(musicFile){musicEl=new Audio(URL.createObjectURL(musicFile));musicEl.loop=true;ms=audioCtx.createMediaElementSource(musicEl);const mg=audioCtx.createGain();mg.gain.value=+($("#musicVol")?.value||.7);ms.connect(mg).connect(dest)}
   dest.stream.getAudioTracks().forEach(t=>stream.addTrack(t));
 }catch(e){console.warn(e)}
 const rec=new MediaRecorder(stream,{mimeType,videoBitsPerSecond:6000000}),chunks=[];
 rec.ondataavailable=e=>{if(e.data.size)chunks.push(e.data)};
 rec.onstop=()=>{
   const blob=new Blob(chunks,{type:mime}),a=document.createElement("a");a.href=URL.createObjectURL(blob);a.download="AK-Video-"+Date.now()+".webm";a.click();
   if(audioCtx)audioCtx.close();if(musicEl)musicEl.pause();video.currentTime=oldTime;video.playbackRate=oldRate;msg("Export पूर्ण झाले ✅");
 };
 const start=Math.max(0,trimStart),end=Math.min(video.duration,trimEnd||video.duration);
 video.currentTime=start;await new Promise(r=>video.addEventListener("seeked",r,{once:true}));
 if(audioCtx)await audioCtx.resume();if(musicEl)musicEl.play().catch(()=>{});
 rec.start(200);msg("Export चालू आहे…");
 const draw=()=>{
   if(rec.state!=="recording")return;
   ctx.fillStyle="#000";ctx.fillRect(0,0,canvas.width,canvas.height);
   const vw=video.videoWidth||canvas.width,vh=video.videoHeight||canvas.height,src=vw/vh,dst=canvas.width/canvas.height;
   let dw=canvas.width,dh=canvas.height,dx=0,dy=0;
   if(src>dst){dh=canvas.height;dw=dh*src;dx=(canvas.width-dw)/2}else{dw=canvas.width;dh=dw/src;dy=(canvas.height-dh)/2}
   ctx.filter=video.style.filter||"none";ctx.drawImage(video,dx,dy,dw,dh);ctx.filter="none";
   if(overlay.textContent){ctx.font=Math.max(28,canvas.width*.055)+"px system-ui";ctx.textAlign="center";ctx.fillStyle="#fff";ctx.strokeStyle="#000";ctx.lineWidth=7;ctx.strokeText(overlay.textContent,canvas.width/2,canvas.height*.16);ctx.fillText(overlay.textContent,canvas.width/2,canvas.height*.16)}
   if(video.currentTime>=end||video.ended){video.pause();rec.stop();return}
   requestAnimationFrame(draw);
 };
 video.play();draw();
}

$("#export").onclick=exportVideo;
$("#new").onclick=()=>location.reload();
