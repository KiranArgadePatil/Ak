const $=s=>document.querySelector(s);
const video=$("#video"),empty=$("#empty"),media=$("#media"),timeline=$("#timeline"),tools=$("#tools"),overlay=$("#overlay"),preview=$("#preview"),musicInfo=$("#musicInfo"),status=$("#status");
let files=[],musicFile=null,trimStart=0,trimEnd=0,ratio="original",splitPoints=[],currentIndex=0,currentImage=null,textSize=30,textY=16,zoom=1,photoDuration=5,musicFadeIn=0,musicFadeOut=0,playbackSpeed=1;
const clipSettings=[];const history=[],redoHistory=[];
let restoringHistory=false;
function projectState(){return {version:2,ratio,photoDuration,textSize,textY,zoom,files:files.map(f=>({name:f.name,type:f.type,size:f.size,lastModified:f.lastModified})),clipSettings:JSON.parse(JSON.stringify(clipSettings)),keyframes:JSON.parse(JSON.stringify(keyframes))};}
function pushHistory(){if(restoringHistory)return;history.push(projectState());if(history.length>30)history.shift();redoHistory.length=0;}
function restoreState(st){if(!st)return;restoringHistory=true;ratio=st.ratio||ratio;photoDuration=st.photoDuration||photoDuration;textSize=st.textSize||textSize;textY=st.textY||textY;zoom=st.zoom||zoom;clipSettings.splice(0,clipSettings.length,...(st.clipSettings||[]));keyframes.splice(0,keyframes.length,...(st.keyframes||[]));renderTimeline();restoringHistory=false;}
function fileToDataURL(f){return new Promise((res,rej)=>{const r=new FileReader();r.onload=()=>res(r.result);r.onerror=()=>rej(r.error);r.readAsDataURL(f);});}
async function saveProject(){if(!files.length)return msg("आधी Photo / Video निवडा.",true);try{msg("Project package तयार होत आहे…");const st=projectState();st.files=await Promise.all(files.map(async f=>({name:f.name,type:f.type,size:f.size,lastModified:f.lastModified,data:await fileToDataURL(f)})));if(musicFile)st.music={name:musicFile.name,type:musicFile.type,size:musicFile.size,lastModified:musicFile.lastModified,data:await fileToDataURL(musicFile)};const blob=new Blob([JSON.stringify(st)],{type:"application/json"});const url=URL.createObjectURL(blob),a=document.createElement("a");a.href=url;a.download="AK-Video-Project-Full.json";a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);msg("पूर्ण Project package save झाला ✓");}catch(e){msg("Project save अयशस्वी: "+e.message,true);}}
function undo(){if(!history.length)return msg("Undo साठी बदल नाही.");redoHistory.push(projectState());restoreState(history.pop());msg("Undo ✓");}
function redo(){if(!redoHistory.length)return msg("Redo साठी बदल नाही.");history.push(projectState());restoreState(redoHistory.pop());msg("Redo ✓");}
 const keyframes=[];
const settings=()=>clipSettings[currentIndex]||(clipSettings[currentIndex]={duration:photoDuration,text:"",filter:"none",zoom:1,transition:"none",rotation:0,opacity:1,brightness:1,contrast:1,saturation:1,blur:0,mirror:false,speed:1});

const fmt=s=>!isFinite(s)?"0:00":Math.floor(s/60)+":"+String(Math.floor(s%60)).padStart(2,"0");
const msg=(t,e=false)=>{status.textContent=t;status.style.color=e?"#ff879a":"#9fe3ad"};

media.onchange=e=>{files=[...e.target.files];currentIndex=0;splitPoints=[];files.forEach((_,i)=>clipSettings[i]|| (clipSettings[i]={duration:photoDuration,text:"",filter:"none",zoom:1,transition:"none"}));load(files[0]);renderTimeline()};

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
   video.addEventListener("timeupdate",applyKeyframeState);\nvideo.onloadedmetadata=()=>{trimEnd=video.duration;renderTimeline()};
 }
 renderTimeline();
}

function bindTrimHandles(){
 document.querySelectorAll(".tl-handle").forEach(h=>{
  h.onpointerdown=e=>{
   e.preventDefault();e.stopPropagation();
   const clip=h.closest(".clip"),i=+clip.dataset.i,f=files[i];if(!f.type.startsWith("video/"))return;
   currentIndex=i;const s=clipSettings[i]||settings(),dur=video.duration||s.trimEnd||1;
   if(s.trimStart==null)s.trimStart=0;if(s.trimEnd==null)s.trimEnd=dur;
   const x=e.clientX,os=s.trimStart,oe=s.trimEnd,w=Math.max(clip.getBoundingClientRect().width,110),k=dur/w;
   h.setPointerCapture(e.pointerId);
   h.onpointermove=ev=>{
    const d=(ev.clientX-x)*k;
    if(h.dataset.side==="left")s.trimStart=Math.max(0,Math.min(os+d,s.trimEnd-.2));else s.trimEnd=Math.min(dur,Math.max(oe+d,s.trimStart+.2));
    trimStart=s.trimStart;trimEnd=s.trimEnd;status.textContent="Trim: "+fmt(s.trimStart)+" → "+fmt(s.trimEnd);
   };
   h.onpointerup=ev=>{h.onpointermove=null;try{h.releasePointerCapture(ev.pointerId)}catch(_){};load(files[i]);renderTimeline();msg("Trim सेट झाले ✓")};
  };
 });
}
function bindMobileReorder(){
 let drag=null;
 document.querySelectorAll(".clip").forEach(c=>{
  c.onpointerdown=e=>{
   if(e.target.classList.contains("handle"))return;
   drag={el:c,i:+c.dataset.i,x:e.clientX,y:e.clientY,moved:false};
   c.setPointerCapture(e.pointerId);c.classList.add("dragging");
  };
  c.onpointermove=e=>{
   if(!drag||drag.el!==c)return;
   if(Math.abs(e.clientX-drag.x)<8&&!drag.moved)return;
   drag.moved=true;
   const clips=[...document.querySelectorAll(".clip")].filter(x=>x!==c);
   const target=clips.find(x=>{const r=x.getBoundingClientRect();return e.clientX<r.left+r.width/2});
   if(target)c.parentNode.insertBefore(c,target);else c.parentNode.appendChild(c);
  };
  c.onpointerup=e=>{
   if(!drag||drag.el!==c)return;
   c.classList.remove("dragging");
   if(drag.moved){
    const order=[...document.querySelectorAll(".clip")].map(x=>+x.dataset.i),nf=order.map(i=>files[i]),ns=order.map(i=>clipSettings[i]);
    files=nf;clipSettings.splice(0,clipSettings.length,...ns);currentIndex=Math.max(0,order.indexOf(currentIndex));renderTimeline();load(files[currentIndex]);msg("Clip क्रम बदलला ✓");
   }else{currentIndex=+c.dataset.i;load(files[currentIndex]);renderTimeline()}
   drag=null;
  };
  c.onpointercancel=()=>{c.classList.remove("dragging");drag=null;renderTimeline()};
 });
}
async function addTimelineThumbs(){
 const nodes=[...document.querySelectorAll(".clip")];
 for(const n of nodes){
  const i=+n.dataset.i,f=files[i];if(!f)continue;
  try{
   const url=URL.createObjectURL(f),can=document.createElement("canvas");can.width=96;can.height=54;const x=can.getContext("2d");
   if(f.type.startsWith("image/")){
    const im=new Image();im.src=url;await new Promise((r,z)=>{im.onload=r;im.onerror=z});
    const q=Math.min(96/im.width,54/im.height),w=im.width*q,h=im.height*q;x.drawImage(im,(96-w)/2,(54-h)/2,w,h);
   }else{
    const v=document.createElement("video");v.src=url;v.muted=true;v.preload="metadata";await new Promise((r,z)=>{v.onloadedmetadata=r;v.onerror=z});
    v.currentTime=Math.min(.1,Math.max(.01,(v.duration||1)/10));await new Promise(r=>v.addEventListener("seeked",r,{once:true}));
    const q=Math.min(96/v.videoWidth,54/v.videoHeight),w=v.videoWidth*q,h=v.videoHeight*q;x.drawImage(v,(96-w)/2,(54-h)/2,w,h);
   }
   const img=document.createElement("img");img.className="tl-thumb";img.src=can.toDataURL("image/jpeg",.72);n.prepend(img);URL.revokeObjectURL(url);
  }catch(e){}
 }
}
function renderTimeline(){
 const track=$("#track")||timeline;
 if(!files.length){track.textContent="Media जोडल्यावर Timeline येथे दिसेल";return}
 track.innerHTML='<div class="timeline-track">'+files.map((f,i)=>{
   const s=clipSettings[i]||settings(),active=i===currentIndex?" active":"";
   return '<span class="clip'+active+'" draggable="true" data-i="'+i+'"><i class="tl-handle handle left" data-side="left"></i>'+ (i+1)+" • "+f.name.slice(0,16)+'<small>'+ (f.type.startsWith("image/")?"Photo":"Video")+(f.type.startsWith("image/")?" • "+s.duration+"s":"")+'</small><i class="tl-handle handle right" data-side="right"></i></span>';
 }).join("")+'</div>';
 const gapButtons=[...track.querySelectorAll(".clip")];
 gapButtons.forEach((clip,i)=>{if(i<gapButtons.length-1){const s=clipSettings[i]||settings();const b=document.createElement("button");b.className="tl-transition";b.textContent=s.transition==="fade"?"↔ Fade":s.transition==="flash"?"⚡ Flash":"＋ Transition";b.onclick=e=>{e.stopPropagation();s.transition=s.transition==="none"?"fade":s.transition==="fade"?"flash":"none";renderTimeline();msg("Transition: "+(s.transition==="none"?"None":s.transition==="fade"?"Fade":"Flash"))};clip.after(b)}});
 addTimelineThumbs();
 bindTrimHandles();bindMobileReorder(); const clips=[...track.querySelectorAll(".clip")];
 clips.forEach(c=>{
   c.onclick=e=>{if(e.target.classList.contains("handle"))return;currentIndex=+c.dataset.i;splitPoints=[];load(files[currentIndex]);renderTimeline()};
   c.ondragstart=()=>{c.classList.add("dragging");window.dragClipIndex=+c.dataset.i};
   c.ondragend=()=>{c.classList.remove("dragging");window.dragClipIndex=null};
   c.ondragover=e=>e.preventDefault();
   c.ondrop=e=>{
     e.preventDefault();const from=window.dragClipIndex,to=+c.dataset.i;
     if(from===to)return;
     const [f]=files.splice(from,1);files.splice(to,0,f);
     const [set]=clipSettings.splice(from,1);clipSettings.splice(to,0,set);
     currentIndex=to;renderTimeline();load(files[currentIndex]);msg("Clip क्रम बदलला ✓");
   };
 });
}

function drawWaveform(){
 const cv=$("#waveCanvas"); if(!cv||!musicFile)return;
 const ac=new (window.AudioContext||window.webkitAudioContext)(),rd=new FileReader();
 rd.onload=()=>ac.decodeAudioData(rd.result).then(buf=>{const x=cv.getContext("2d"),d=buf.getChannelData(0),step=Math.max(1,Math.floor(d.length/cv.width));x.clearRect(0,0,cv.width,cv.height);x.beginPath();for(let i=0;i<cv.width;i++){let sum=0,n=0;for(let j=0;j<step;j++){const v=d[i*step+j]||0;sum+=Math.abs(v);n++}const y=45-(sum/n)*40;i?x.lineTo(i,y):x.moveTo(i,y)}x.stroke();ac.close()}).catch(()=>{});
 rd.readAsArrayBuffer(musicFile);
}
\nfunction getKeyframeState(clip,time){
 const list=keyframes.filter(k=>k.clip===clip).sort((a,b)=>a.time-b.time);
 if(!list.length)return null;
 if(time<=list[0].time)return list[0];
 if(time>=list[list.length-1].time)return list[list.length-1];
 for(let i=0;i<list.length-1;i++){
  const a=list[i],b=list[i+1];
  if(time>=a.time&&time<=b.time){const p=(time-a.time)/Math.max(.0001,b.time-a.time);return {zoom:a.zoom+(b.zoom-a.zoom)*p,rotation:a.rotation+(b.rotation-a.rotation)*p,opacity:a.opacity+(b.opacity-a.opacity)*p};}
 }
 return null;
}
function applyKeyframeState(){
 const k=getKeyframeState(currentIndex,video.currentTime);if(!k)return;
 const s=settings();s.zoom=k.zoom;s.rotation=k.rotation;s.opacity=k.opacity;applyVisualSettings();
}

function applyVisualSettings(){
 const s=settings();
 video.style.filter='brightness('+s.brightness+') contrast('+s.contrast+') saturate('+s.saturation+') blur('+s.blur+'px) '+s.filter;
 video.style.transform='scale('+s.zoom+') rotate('+s.rotation+'deg) scaleX('+(s.mirror?-1:1)+')';
 video.style.opacity=s.opacity;
 video.playbackRate=s.speed||1;
}
\ndocument.querySelectorAll("[data-adv]").forEach(b=>b.onclick=()=>{
 const a=b.dataset.adv,s=settings();
 if(a==="transform"){tools.innerHTML='<b>🔄 Transform</b><label>Zoom <input id="trZoom" type="range" min="1" max="3" step=".1" value="'+s.zoom+'"></label><label>Rotation <input id="trRot" type="range" min="-180" max="180" value="'+s.rotation+'"></label><label>Opacity <input id="trOpacity" type="range" min="0" max="1" step=".05" value="'+s.opacity+'"></label><button id="mirrorBtn">🪞 Mirror</button>';return}
 if(a==="adjust"){tools.innerHTML='<b>🎨 Adjust</b><label>Brightness <input id="adjB" type="range" min=".3" max="2" step=".05" value="'+s.brightness+'"></label><label>Contrast <input id="adjC" type="range" min=".3" max="2" step=".05" value="'+s.contrast+'"></label><label>Saturation <input id="adjS" type="range" min="0" max="2" step=".05" value="'+s.saturation+'"></label><label>Blur <input id="adjBlur" type="range" min="0" max="12" step=".5" value="'+s.blur+'"></label>';return}
 if(a==="crop"){tools.innerHTML='<b>✂️ Crop</b><button data-r="9:16">9:16</button><button data-r="1:1">1:1</button><button data-r="16:9">16:9</button><div class="hint">Crop presets preview/export ratio साठी वापरा.</div>';return}
 if(a==="keyframes"){tools.innerHTML='<b>🎯 Keyframes</b><button id="addKeyframe">＋ Add Keyframe</button><button id="clearKeyframes">Clear</button><div id="kfList">Keyframes: 0</div><div class="hint">Current video time वर Zoom/Rotation/Opacity ची keyframe नोंदवा.</div>';return}
 if(a==="waveform"){tools.innerHTML='<b>🎵 Audio Waveform</b><canvas id="waveCanvas" width="600" height="90"></canvas><div class="hint">Music निवडल्यानंतर waveform तयार करता येईल.</div>';drawWaveform();return}
});
document.querySelectorAll("[data-a]").forEach(b=>b.onclick=()=>act(b.dataset.a));

function act(a){\n if(!restoringHistory) pushHistory();
 if(!video.src && !currentImage){tools.innerHTML="<b>आधी Photo / Video निवडा.</b>";return}
 if(a==="trim"){
   const d=currentImage?5:(video.duration||0);
   tools.innerHTML='<div class="tools"><b>✂️ Trim</b><label>Start <input id="ts" type="range" min="0" max="'+d+'" step=".1" value="'+trimStart+'"></label><span id="tsv">'+fmt(trimStart)+'</span><label>End <input id="te" type="range" min="0" max="'+d+'" step=".1" value="'+(trimEnd||d)+'"></label><span id="tev">'+fmt(trimEnd||d)+'</span><button id="applyTrim">Apply</button><div class="hint">Timeline sliders ओढून Trim करा.</div></div>';
 }
 if(a==="split"){
   if(currentImage){tools.innerHTML="<b>Photo साठी Split नाही.</b>";return}
   tools.innerHTML='<b>✂️ Split</b><span>Current: '+fmt(video.currentTime)+'</span><button id="addSplit">येथे Split</button><button id="clearSplit">Clear</button><div class="hint">Video थांबवून ज्या ठिकाणी कट हवा तेथे Split दाबा.</div>';
   $("#addSplit").onclick=()=>{
     const i=currentIndex,p=video.currentTime,d=video.duration,s=clipSettings[i]||settings();
     const a=s.trimStart??0,b=s.trimEnd??d;
     if(p<=a+.2||p>=b-.2){msg("Split साठी मधला point निवडा.");return}
     const first={...s,trimStart:a,trimEnd:p};
     const second={...s,trimStart:p,trimEnd:b};
     clipSettings.splice(i,1,first,second);
     files.splice(i,0,files[i]);
     currentIndex=i+1;splitPoints=[];
     renderTimeline();load(files[currentIndex]);msg("Video दोन clips मध्ये Split झाले ✓");
   };
   $("#clearSplit").onclick=()=>{splitPoints=[];msg("जुने split points clear झाले")};
 }
 if(a==="ratio")tools.innerHTML='<b>Ratio</b><button data-r="original">Original</button><button data-r="9:16">9:16 Reel</button><button data-r="1:1">1:1</button><button data-r="16:9">16:9</button>';
 if(a==="text")tools.innerHTML='<input id="txt" placeholder="Marathi / English Text लिहा"><label>Size <input id="fontSize" type="range" min="16" max="80" value="30"></label><label>Position <input id="textY" type="range" min="5" max="90" value="16"></label><button id="add">Add</button><button id="clearText">Clear</button>';
 if(a==="speed")tools.innerHTML='<b>⚡ Speed</b><button data-v=".5">0.5×</button><button data-v="1">1×</button><button data-v="1.5">1.5×</button><button data-v="2">2×</button><label>Custom <input id="speedCustom" type="range" min=".25" max="4" step=".05" value="'+settings().speed+'"></label><span id="speedVal">'+settings().speed+'×</span>';
 if(a==="transform")tools.innerHTML='<b>🎯 Transform</b><label>Zoom <input id="trZoom" type="range" min="1" max="3" step=".1" value="'+settings().zoom+'"></label><label>Rotation <input id="trRot" type="range" min="-180" max="180" value="'+settings().rotation+'"></label><label>Opacity <input id="trOpacity" type="range" min="0" max="1" step=".05" value="'+settings().opacity+'"></label><button id="mirrorBtn">🪞 Mirror</button>'; if(a==="adjust")tools.innerHTML='<b>🎨 Adjust</b><label>Brightness <input id="adjB" type="range" min=".3" max="2" step=".05" value="'+settings().brightness+'"></label><label>Contrast <input id="adjC" type="range" min=".3" max="2" step=".05" value="'+settings().contrast+'"></label><label>Saturation <input id="adjS" type="range" min="0" max="2" step=".05" value="'+settings().saturation+'"></label><label>Blur <input id="adjBlur" type="range" min="0" max="12" step=".5" value="'+settings().blur+'"></label>'; if(a==="zoom")tools.innerHTML='<b>🔍 Zoom</b><input id="zoom" type="range" min="1" max="2.5" step=".1" value="'+settings().zoom+'"><div class="hint">Preview मध्ये Zoom करा.</div>';
 if(a==="filter")tools.innerHTML='<button data-f="none">Original</button><button data-f="grayscale(1)">B&W</button><button data-f="sepia(1)">Sepia</button><button data-f="contrast(1.4) saturate(1.3)">Vivid</button>';
 if(a==="clipSettings")tools.innerHTML='<b>🎬 Clip Settings</b><label>Photo/Clip Duration <input id="clipDur" type="range" min="1" max="15" step=".5" value="'+settings().duration+'"></label><span id="clipDurVal">'+settings().duration+' sec</span><label>Transition <select id="clipTrans"><option value="none">None</option><option value="fade">Fade</option><option value="flash">Flash</option></select></label>';
 if(a==="photoDuration")tools.innerHTML='<b>🖼️ Photo Duration</b><input id="photoDur" type="range" min="1" max="15" step=".5" value="'+photoDuration+'"><span id="photoDurVal">'+photoDuration+' sec</span>';
 if(a==="musicFade")tools.innerHTML='<b>🎵 Music Fade</b><label>Fade In <input id="fadeIn" type="range" min="0" max="5" step=".5" value="'+musicFadeIn+'"></label><label>Fade Out <input id="fadeOut" type="range" min="0" max="5" step=".5" value="'+musicFadeOut+'"></label>';
 if(a==="volume")tools.innerHTML='<span>Video</span><input id="vol" type="range" min="0" max="1" step=".05" value="'+video.volume+'">';
 if(a==="clipSettings"){}\n if(a==="transition")tools.innerHTML='<b>🎞️ Transition</b><button data-t="none">None</button><button data-t="fade">Fade</button><button data-t="flash">Flash</button><div class="hint">Clip बदलताना transition निवडा.</div>';
}

tools.onclick=e=>{\n const t=e.target; if(t.id==="addKeyframe"){keyframes.push({clip:currentIndex,time:video.currentTime,zoom:settings().zoom,rotation:settings().rotation,opacity:settings().opacity});$("#kfList").textContent="Keyframes: "+keyframes.filter(k=>k.clip===currentIndex).length;msg("Keyframe जोडला ✓")} if(t.id==="clearKeyframes"){for(let i=keyframes.length-1;i>=0;i--)if(keyframes[i].clip===currentIndex)keyframes.splice(i,1);$("#kfList").textContent="Keyframes: 0";msg("Keyframes clear ✓")}
 const t=e.target; if(t.id==="speedCustom"){settings().speed=+t.value;video.playbackRate=+t.value;$("#speedVal").textContent=t.value+"×"} if(t.id==="adjB"){settings().brightness=+t.value;applyVisualSettings()} if(t.id==="adjC"){settings().contrast=+t.value;applyVisualSettings()} if(t.id==="adjS"){settings().saturation=+t.value;applyVisualSettings()} if(t.id==="adjBlur"){settings().blur=+t.value;applyVisualSettings()}
 if(t.dataset.v && video.src){playbackSpeed=+t.dataset.v;settings().speed=playbackSpeed;video.playbackRate=playbackSpeed;msg("Speed: "+playbackSpeed+"×")}
 if(t.dataset.f!==undefined && video.src){video.style.filter=t.dataset.f;settings().filter=t.dataset.f;}
 if(t.dataset.t){window.transitionType=t.dataset.t;settings().transition=t.dataset.t;msg("Transition: "+t.dataset.t)}
 if(t.id==="trZoom"){settings().zoom=+t.value;applyVisualSettings();return} if(t.id==="trRot"){settings().rotation=+t.value;applyVisualSettings();return} if(t.id==="trOpacity"){settings().opacity=+t.value;applyVisualSettings();return} if(t.id==="mirrorBtn"){settings().mirror=!settings().mirror;applyVisualSettings();msg("Mirror "+(settings().mirror?"ON":"OFF"));return} if(t.id==="zoom"){zoom=+t.value;settings().zoom=zoom;applyVisualSettings();msg("Zoom: "+zoom+"×")}
 if(t.dataset.r){ratio=t.dataset.r;preview.classList.toggle("video-916",ratio==="9:16");preview.classList.toggle("ratio-square",ratio==="1:1");preview.classList.toggle("ratio-wide",ratio==="16:9");msg("Ratio: "+ratio)}
 if(t.id==="add"){overlay.textContent=$("#txt").value;settings().text=$("#txt").value;}
 if(t.id==="clearText"){overlay.textContent="";settings().text="";}
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
 if(e.target.id==="fontSize"){textSize=+e.target.value;overlay.style.fontSize=textSize+"px"}
 if(e.target.id==="textY"){textY=+e.target.value;overlay.style.top=textY+"%"}
 if(e.target.id==="photoDur"){photoDuration=+e.target.value;$("#photoDurVal").textContent=photoDuration+" sec";renderTimeline()}
 if(e.target.id==="fadeIn")musicFadeIn=+e.target.value;
 if(e.target.id==="fadeOut")musicFadeOut=+e.target.value;
 if(e.target.id==="clipDur"){settings().duration=+e.target.value;$("#clipDurVal").textContent=settings().duration+" sec";renderTimeline()}
 if(e.target.id==="clipTrans"){settings().transition=e.target.value;}
};

$("#music").onchange=e=>{
 musicFile=e.target.files[0];
 if(musicFile){musicInfo.innerHTML='<div class="music">🎵 '+musicFile.name+' <button id="removeMusic">×</button><label>Music volume <input id="musicVol" type="range" min="0" max="1" step=".05" value=".7"></label></div>';msg("Music जोडले.")}
};
musicInfo.onclick=e=>{if(e.target.id==="removeMusic"){musicFile=null;musicInfo.innerHTML="";msg("Music काढले.")}};

function mimeType(){
 return ["video/mp4;codecs=avc1.42E01E,mp4a.40.2","video/mp4","video/webm;codecs=vp9,opus","video/webm;codecs=vp8,opus","video/webm"].find(x=>MediaRecorder.isTypeSupported(x))||"";
}
function extFor(m){return m.startsWith("video/mp4")?"mp4":"webm"}
window.transitionType="none";

async function exportVideo(){
 if(!files.length){msg("आधी Photo / Video निवडा.",true);return}
 const mediaFiles=files.filter(f=>f.type.startsWith("video/")||f.type.startsWith("image/"));
 if(!mediaFiles.length){msg("Export साठी Photo / Video निवडा.",true);return}
 const mime=mimeType();if(!mime){msg("या browser मध्ये Export समर्थित नाही.",true);return}
 const oldSrc=video.src,oldTime=video.currentTime,oldDisplay=video.style.display;
 const canvas=document.createElement("canvas");
 if(ratio==="9:16"){canvas.width=720;canvas.height=1280}else if(ratio==="1:1"){canvas.width=1080;canvas.height=1080}else if(ratio==="16:9"){canvas.width=1280;canvas.height=720}else{canvas.width=video.videoWidth||1280;canvas.height=video.videoHeight||720}
 const ctx=canvas.getContext("2d"),stream=canvas.captureStream(30);
 let audioCtx=null,dest=null,vs=null,musicEl=null;
 try{
   audioCtx=new(window.AudioContext||window.webkitAudioContext)();dest=audioCtx.createMediaStreamDestination();
   vs=audioCtx.createMediaElementSource(video);const vg=audioCtx.createGain();vg.gain.value=video.volume;vs.connect(vg).connect(dest);
   if(musicFile){musicEl=new Audio(URL.createObjectURL(musicFile));musicEl.loop=true;const ms=audioCtx.createMediaElementSource(musicEl);const mg=audioCtx.createGain();const baseVol=+($("#musicVol")?.value||.7);mg.gain.value=baseVol;ms.connect(mg).connect(dest);musicEl.onloadedmetadata=()=>{const d=musicEl.duration;const fi=Math.min(musicFadeIn,d/2);const fo=Math.min(musicFadeOut,d/2);mg.gain.cancelScheduledValues(audioCtx.currentTime);mg.gain.setValueAtTime(fi?0:baseVol,audioCtx.currentTime);if(fi)mg.gain.linearRampToValueAtTime(baseVol,audioCtx.currentTime+fi);if(fo&&isFinite(d)){mg.gain.setValueAtTime(baseVol,audioCtx.currentTime+Math.max(0,d-fo));mg.gain.linearRampToValueAtTime(0,audioCtx.currentTime+d)}}}
   dest.stream.getAudioTracks().forEach(t=>stream.addTrack(t));
 }catch(e){console.warn(e)}
 const rec=new MediaRecorder(stream,{mimeType,videoBitsPerSecond:6000000}),chunks=[];
 rec.ondataavailable=e=>{if(e.data.size)chunks.push(e.data)};
 rec.onstop=()=>{
   const blob=new Blob(chunks,{type:mime}),a=document.createElement("a");a.href=URL.createObjectURL(blob);a.download="AK-Video-"+Date.now()+"."+extFor(mime);a.click();
   if(audioCtx)audioCtx.close();if(musicEl)musicEl.pause();
   if(oldSrc){video.src=oldSrc;video.currentTime=oldTime} video.style.display=oldDisplay;msg("Multi-Clip Export पूर्ण झाले ✅");
 };
 if(audioCtx)await audioCtx.resume();if(musicEl)musicEl.play().catch(()=>{});
 rec.start(200);msg("Multi-Clip Export चालू आहे…");
 let first=true;
 for(let i=0;i<mediaFiles.length;i++){
   const f=mediaFiles[i],url=URL.createObjectURL(f);
   video.src=url;video.style.display="block";video.load();
   await new Promise((resolve,reject)=>{video.onloadedmetadata=resolve;video.onerror=reject});
   const cs=clipSettings[i]||settings();\n   zoom=cs.zoom||1;video.style.filter=cs.filter||"none";overlay.textContent=cs.text||"";\n   let startTime=0,endTime=video.duration;
   if(f.type.startsWith("image/")){\n     const img=new Image();img.src=url;await new Promise((resolve,reject)=>{img.onload=resolve;img.onerror=reject});\n     const until=performance.now()+(cs.duration||photoDuration)*1000;\n     await new Promise(resolve=>{const drawPhoto=()=>{ctx.fillStyle="#000";ctx.fillRect(0,0,canvas.width,canvas.height);const src=img.width/img.height,dst=canvas.width/canvas.height;let dw=canvas.width,dh=canvas.height,dx=0,dy=0;if(src>dst){dh=canvas.height;dw=dh*src;dx=(canvas.width-dw)/2}else{dw=canvas.width;dh=dw/src;dy=(canvas.height-dh)/2}ctx.drawImage(img,dx,dy,dw,dh);if(overlay.textContent){ctx.font=Math.max(textSize,canvas.width*.055)+"px system-ui";ctx.textAlign="center";ctx.fillStyle="#fff";ctx.strokeStyle="#000";ctx.lineWidth=7;ctx.strokeText(overlay.textContent,canvas.width/2,canvas.height*textY/100);ctx.fillText(overlay.textContent,canvas.width/2,canvas.height*textY/100)}if(performance.now()>=until){resolve();return}requestAnimationFrame(drawPhoto)};requestAnimationFrame(drawPhoto)});URL.revokeObjectURL(url);first=false;continue;\n   }\n   startTime=Math.max(0,cs.trimStart??0);endTime=Math.min(video.duration,cs.trimEnd??video.duration)
   video.currentTime=startTime;await new Promise(r=>video.addEventListener("seeked",r,{once:true}));
   const transition=.45;
   if(!first){
     if(cs.transition==="fade" || window.transitionType==="fade"){
       ctx.fillStyle="#000";ctx.fillRect(0,0,canvas.width,canvas.height);
       for(let a=0;a<12;a++){ctx.globalAlpha=a/12;ctx.drawImage(video,0,0,canvas.width,canvas.height);await new Promise(r=>setTimeout(r,25))}
       ctx.globalAlpha=1;
     }else if(cs.transition==="flash" || window.transitionType==="flash"){
       ctx.fillStyle="#fff";ctx.fillRect(0,0,canvas.width,canvas.height);await new Promise(r=>setTimeout(r,120));
     }
   }
   first=false;
   video.play();let last=performance.now();
   await new Promise(resolve=>{
     const draw=()=>{
       if(rec.state!=="recording"){resolve();return}
       ctx.fillStyle="#000";ctx.fillRect(0,0,canvas.width,canvas.height);
       const vw=video.videoWidth||canvas.width,vh=video.videoHeight||canvas.height,src=vw/vh,dst=canvas.width/canvas.height;
       let dw=canvas.width,dh=canvas.height,dx=0,dy=0;
       if(src>dst){dh=canvas.height;dw=dh*src;dx=(canvas.width-dw)/2}else{dw=canvas.width;dh=dw/src;dy=(canvas.height-dh)/2}
       ctx.filter=video.style.filter||"none";ctx.save();ctx.translate(canvas.width/2,canvas.height/2);ctx.scale(zoom,zoom);ctx.drawImage(video,dx-canvas.width/2,dy-canvas.height/2,dw,dh);ctx.restore();ctx.filter="none";
       if(overlay.textContent){ctx.font=Math.max(textSize,canvas.width*.055)+"px system-ui";ctx.textAlign="center";ctx.fillStyle="#fff";ctx.strokeStyle="#000";ctx.lineWidth=7;ctx.strokeText(overlay.textContent,canvas.width/2,canvas.height*.16);ctx.fillText(overlay.textContent,canvas.width/2,canvas.height*.16)}
       if(video.currentTime>=endTime||video.ended){video.pause();resolve();return}
       requestAnimationFrame(draw)
     };requestAnimationFrame(draw)
   });
   URL.revokeObjectURL(url);
 }
 rec.stop();
}
async function playAll(){
 if(!files.length){msg("आधी Photo / Video निवडा.",true);return}
 const oldSrc=video.src,oldDisplay=video.style.display,oldText=overlay.textContent,oldFilter=video.style.filter;
 try{
  for(let i=0;i<files.length;i++){
   currentIndex=i;renderTimeline();
   const f=files[i],s=clipSettings[i]||settings(),url=URL.createObjectURL(f);
   if(f.type.startsWith("image/")){
    video.pause();video.style.display="none";empty.style.display="none";overlay.textContent=s.text||"";
    const until=performance.now()+(s.duration||photoDuration)*1000;
    await new Promise(r=>{const loop=()=>performance.now()>=until?r():requestAnimationFrame(loop);loop()});
   }else{
    video.style.display="block";empty.style.display="none";video.src=url;video.load();
    await new Promise((r,x)=>{video.onloadedmetadata=r;video.onerror=x});
    const a=s.trimStart??0,b=s.trimEnd??video.duration;
    video.currentTime=a;await new Promise(r=>video.addEventListener("seeked",r,{once:true}));
    overlay.textContent=s.text||"";video.style.filter=s.filter||"none";video.style.transform="scale("+(s.zoom||1)+")";
    await video.play().catch(()=>{});
    await new Promise(resolve=>{const check=()=>video.currentTime>=b||video.ended?(video.pause(),resolve()):requestAnimationFrame(check);check()});
   }
   URL.revokeObjectURL(url);
   if(i<files.length-1){
    const t=s.transition||"none";
    if(t==="flash"){preview.style.opacity="0.2";await new Promise(r=>setTimeout(r,140));preview.style.opacity="1"}
    if(t==="fade"){preview.style.opacity="0";await new Promise(r=>setTimeout(r,120));preview.style.opacity="1"}
   }
  }
  msg("Preview पूर्ण झाले ✓");
 }finally{
  video.pause();video.style.filter=oldFilter;overlay.textContent=oldText;video.style.display=oldDisplay;
  if(oldSrc){video.src=oldSrc;video.load()}
  preview.style.opacity="1";
 }
}
$("#playAll").onclick=playAll;
$("#export").onclick=exportVideo;
$("#new").onclick=()=>location.reload();

$("#saveProject").onclick=saveProject;
$("#undoBtn").onclick=undo;
$("#redoBtn").onclick=redo;
$("#loadProject").onclick=()=>$("#projectFile").click();
$("#projectFile").onchange=e=>{const f=e.target.files[0];if(!f)return;const rd=new FileReader();rd.onload=async()=>{try{const st=JSON.parse(rd.result);pushHistory();if(Array.isArray(st.files)&&st.files.length&&st.files[0].data){files=st.files.map(x=>{const b64=x.data.split(",")[1]||"";const bin=atob(b64),u=new Uint8Array(bin.length);for(let i=0;i<bin.length;i++)u[i]=bin.charCodeAt(i);return new File([u],x.name,{type:x.type,lastModified:x.lastModified||Date.now()})});}if(st.music&&st.music.data){const b64=st.music.data.split(",")[1]||"";const bin=atob(b64),u=new Uint8Array(bin.length);for(let i=0;i<bin.length;i++)u[i]=bin.charCodeAt(i);musicFile=new File([u],st.music.name,{type:st.music.type,lastModified:st.music.lastModified||Date.now()});}restoreState(st);currentIndex=0;if(files.length)load(files[0]);renderTimeline();msg("पूर्ण Project load झाला ✓")}catch(_){msg("Project file चुकीची आहे किंवा खूप मोठी आहे.",true)}};rd.readAsText(f);e.target.value="";};
