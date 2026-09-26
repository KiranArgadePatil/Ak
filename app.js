function applyMaskPreview(){
 const c=settings(),m=c.mask||"none";
 if(m==="circle"){preview.style.clipPath="circle(46% at 50% 50%)"}else if(m==="rect"){preview.style.clipPath="inset(5% 5% 5% 5% round 8px)"}else preview.style.clipPath="none";
}
function applyEffectPreview(){
 const c=settings(),e=c.effect||"none";
 const effects={none:"",glow:"drop-shadow(0 0 12px rgba(255,255,255,.8))",dream:"blur(.6px) saturate(1.25) brightness(1.06)",vintage:"sepia(.45) contrast(1.08) saturate(.85)",noir:"grayscale(1) contrast(1.35)"};
 const fx=effects[e]||"";
 video.style.filter=((video.style.filter||"").replace(/drop-shadow\([^)]*\)|blur\([^)]*\)|sepia\([^)]*\)|grayscale\([^)]*\)/g,"")+" "+fx).trim();
}
function showEffects(){
 tools.innerHTML='<b>✨ Effects</b><button data-effect="none">None</button><button data-effect="glow">Glow</button><button data-effect="dream">Dream</button><button data-effect="vintage">Vintage</button><button data-effect="noir">Noir</button>';
}
function showMask(){
 tools.innerHTML='<b>🎭 Mask</b><button data-mask="none">None</button><button data-mask="circle">Circle</button><button data-mask="rect">Rectangle</button>';
}
function applyChromaCanvas(ctx,canvas,strength){
 if(!settings().chroma)return;
 const w=canvas.width,h=canvas.height,img=ctx.getImageData(0,0,w,h),d=img.data,st=Number(strength||settings().chromaStrength||.6);
 for(let p=0;p<d.length;p+=4){
  const r=d[p],g=d[p+1],b=d[p+2],max=Math.max(r,g,b),min=Math.min(r,g,b);
  const green=(g>r*1.12&&g>b*1.08&&g>70&&g-min>18);
  if(green){const amt=Math.min(1,((g-Math.max(r,b))/120)*st);d[p+3]=Math.round(d[p+3]*(1-amt))}
 }
 ctx.putImageData(img,0,0);
}
function animationProgress(type,p){
 p=Math.max(0,Math.min(1,p));
 if(type==="fade")return {opacity:p,scale:1,y:0};
 if(type==="pop")return {opacity:p,scale:.7+.3*p,y:0};
 if(type==="zoom")return {opacity:p,scale:.6+.4*p,y:0};
 if(type==="slideUp")return {opacity:p,scale:1,y:(1-p)*.18};
 if(type==="slideDown")return {opacity:p,scale:1,y:-(1-p)*.18};
 if(type==="bounce")return {opacity:1,scale:1+.08*Math.sin(p*Math.PI*4)*(1-p),y:0};
 return {opacity:1,scale:1,y:0};
}
function stickerAnimationState(c,time){
 const type=c.stickerAnimation||"none",d=Math.max(.2,Number(c.duration||photoDuration||5)),p=Math.max(0,Math.min(1,time/d)),q=Math.min(1,p/.35);
 if(type==="fade")return {opacity:q,scale:1,x:0,y:0};
 if(type==="pop")return {opacity:q,scale:.65+.35*q,x:0,y:0};
 if(type==="zoom")return {opacity:q,scale:.55+.45*q,x:0,y:0};
 if(type==="slideUp")return {opacity:q,scale:1,x:0,y:(1-q)*.2};
 if(type==="slideDown")return {opacity:q,scale:1,x:0,y:-(1-q)*.2};
 if(type==="spin")return {opacity:q,scale:1,x:0,y:0,rot:(1-q)*180};
 return {opacity:1,scale:1,x:0,y:0,rot:0};
}
function stickerList(){
 const c=settings();if(!Array.isArray(c.stickers))c.stickers=[];
 return c.stickers;
}
function addSticker(char){
 const c=settings(),a=stickerList();
 const id="st_"+Date.now()+"_"+Math.random().toString(36).slice(2,6);
 a.push({id:id,text:char,x:50,y:50,scale:1,rotation:0,animation:"none"});
 c.sticker=id;renderStickers();return id;
}
function renderStickers(){
 if(!overlay)return;
 const a=stickerList();overlay.innerHTML="";
 a.forEach(st=>{
  const el=document.createElement("div");
  el.textContent=st.text;el.dataset.stickerId=st.id;el.style.position="absolute";
  el.style.left=(st.x==null?50:st.x)+"%";el.style.top=(st.y==null?50:st.y)+"%";
  el.style.transform="translate(-50%,-50%) scale("+(st.scale||1)+") rotate("+(st.rotation||0)+"deg)";
  el.style.fontSize=Math.max(28,textSize)+"px";el.style.cursor="grab";el.style.touchAction="none";
  el.onpointerdown=function(ev){
   ev.stopPropagation();el.setPointerCapture(ev.pointerId);
   const r=preview.getBoundingClientRect(),sx=ev.clientX,sy=ev.clientY,ox=st.x==null?50:st.x,oy=st.y==null?50:st.y;
   el.onpointermove=function(m){st.x=Math.max(0,Math.min(100,ox+(m.clientX-sx)/r.width*100));st.y=Math.max(0,Math.min(100,oy+(m.clientY-sy)/r.height*100));el.style.left=st.x+"%";el.style.top=st.y+"%"};
   el.onpointerup=el.onpointercancel=function(){el.onpointermove=null;el.onpointerup=null;el.onpointercancel=null};
  };
  el.ondblclick=function(){st.rotation=(st.rotation+15)%360;el.style.transform="translate(-50%,-50%) scale("+(st.scale||1)+") rotate("+(st.rotation||0)+"deg)"};
  overlay.appendChild(el);
 });
}
function renderKeyframeTracks(){
 const lane=document.querySelector("#timeline");if(!lane)return;
 document.querySelectorAll(".keyframe-marker").forEach(x=>x.remove());
 const pxPerSec=32;
 keyframes.filter(k=>k.clip===currentIndex).forEach((k,n)=>{
  const x=document.createElement("div");x.className="keyframe-marker";x.dataset.kfIndex=n;x.style.left=(Math.max(0,k.time)*pxPerSec)+"px";x.textContent="♦";x.title="Keyframe "+(n+1)+" • "+fmt(k.time);x.style.pointerEvents="auto";x.style.touchAction="none";
  x.onpointerdown=e=>{e.stopPropagation();x.setPointerCapture(e.pointerId);const sx=e.clientX,st=k.time;
   x.onpointermove=m=>{k.time=Math.max(0,Math.round((st+(m.clientX-sx)/pxPerSec)*10)/10);x.style.left=(k.time*pxPerSec)+"px";x.title="Keyframe "+(n+1)+" • "+fmt(k.time);try{if(files[currentIndex]&&!files[currentIndex].type.startsWith("image/")&&Number.isFinite(video.duration)){const c=clipSettings[currentIndex]||{};const lo=Number(c.trimStart||0),hi=Number(c.trimEnd??video.duration);video.currentTime=Math.max(lo,Math.min(hi,k.time));}applyKeyframePreview(k.time)}catch(_){}};
   x.onpointerup=x.onpointercancel=()=>{x.onpointermove=null;x.onpointerup=null;x.onpointercancel=null;keyframes.sort((a,b)=>a.clip-b.clip||a.time-b.time);renderKeyframeTracks();msg("Keyframe वेळ बदलली ✓")};
  };
  lane.appendChild(x);
 });
}
function renderTransitionTracks(){
 const lane=document.querySelector("#timeline");if(!lane)return;
 document.querySelectorAll(".transition-marker").forEach(x=>x.remove());
 const pxPerSec=32;
 for(let i=1;i<files.length;i++){
  const c=clipSettings[i]||{};
  const type=c.transition||"none"; if(type==="none")continue;
  const left=files.slice(0,i).reduce((a,_,k)=>a+Math.max(.1,(clipSettings[k]||{}).duration||photoDuration||5),0);
  const x=document.createElement("div");x.className="transition-marker";x.dataset.clip=i;x.style.left=(left*pxPerSec-10)+"px";x.textContent="↔ "+type+" "+Number(c.transitionDuration||.45).toFixed(1)+"s";x.title="Drag to change duration";x.style.pointerEvents="auto";x.style.touchAction="none";x.onpointerdown=e=>{e.stopPropagation();x.setPointerCapture(e.pointerId);const sx=e.clientX,start=Number(c.transitionDuration||.45);x.onpointermove=m=>{const d=(m.clientX-sx)/pxPerSec;c.transitionDuration=Math.max(.1,Math.min(2,Math.round((start+d)*10)/10));x.textContent="↔ "+type+" "+c.transitionDuration.toFixed(1)+"s"};x.onpointerup=x.onpointercancel=()=>{x.onpointermove=null;x.onpointerup=null;x.onpointercancel=null;renderTransitionTracks()}};lane.appendChild(x);
 }
}
function drawStickerObjectsExport(ctx,canvas,c,time){
 const arr=Array.isArray(c.stickers)?c.stickers:[];
 arr.forEach(st=>{
  const a=stickerAnimationState(Object.assign({},c,{stickerAnimation:st.animation||"none"}),time);
  ctx.save();
  ctx.globalAlpha=a.opacity;
  ctx.translate((st.x==null?50:st.x)*canvas.width/100,(st.y==null?50:st.y)*canvas.height/100);
  ctx.rotate(((st.rotation||0)+(a.rot||0))*Math.PI/180);
  ctx.scale((st.scale||1)*a.scale,(st.scale||1)*a.scale);
  ctx.font=Math.max(28,canvas.width*.055)+"px system-ui";
  ctx.textAlign="center";
  ctx.textBaseline="middle";
  ctx.fillText(st.text,0,0);
  ctx.restore();
 });
}
function showStickerObjects(){
 const a=stickerList(),sel=a[a.length-1];
 tools.innerHTML='<b>🧩 Multiple Stickers</b><div class="sticker-grid"><button data-addsticker="⭐">⭐</button><button data-addsticker="❤️">❤️</button><button data-addsticker="🔥">🔥</button><button data-addsticker="✨">✨</button><button data-addsticker="😂">😂</button><button data-addsticker="🎉">🎉</button></div><label>Size <input id="stScale" type="range" min=".3" max="3" step=".05" value="'+(sel?sel.scale:1)+'"></label><label>Rotation <input id="stRotate" type="range" min="-180" max="180" value="'+(sel?sel.rotation:0)+'"></label><label>Animation <select id="stAnim"><option value="none">None</option><option value="fade">Fade</option><option value="pop">Pop</option><option value="zoom">Zoom</option><option value="slideUp">Slide Up</option><option value="slideDown">Slide Down</option><option value="spin">Spin</option></select></label><div class="hint">शेवटचा जोडलेला sticker निवडलेला आहे.</div>';
 const get=()=>stickerList()[stickerList().length-1];
 $("#stScale").oninput=()=>{const x=get();if(x){x.scale=Number($("#stScale").value);renderStickers()}};
 $("#stRotate").oninput=()=>{const x=get();if(x){x.rotation=Number($("#stRotate").value);renderStickers()}};
 $("#stAnim").onchange=()=>{const x=get();if(x)x.animation=$("#stAnim").value};
}
function applyStickerAnimationPreview(){
 if(!overlay||!settings().sticker)return;
 const c=settings(),a=stickerAnimationState(c,video.currentTime||0);
 overlay.style.opacity=a.opacity;
 overlay.style.transform="translate(-50%,-50%) translate("+(a.x*100)+"%,"+(a.y*100)+"%) scale("+(Number(c.textScale||1)*a.scale)+") rotate("+(Number(c.textRotation||0)+(a.rot||0))+"deg)";
}
function showStickerAnimation(){
 tools.innerHTML='<b>✨ Sticker Animation</b><button data-stickeranim="none">None</button><button data-stickeranim="fade">Fade</button><button data-stickeranim="pop">Pop</button><button data-stickeranim="zoom">Zoom</button><button data-stickeranim="slideUp">Slide Up</button><button data-stickeranim="slideDown">Slide Down</button><button data-stickeranim="spin">Spin</button>';
}
function applyTextAnimationPreview(){
 if(!overlay)return;
 const c=settings(),type=c.textAnimation||"none";
 const d=Math.max(.2,Number(c.duration||photoDuration||5));
 const p=Math.max(0,Math.min(1,(video.currentTime||0)/d));
 const a=animationProgress(type,Math.min(1,p/.35));
 overlay.style.opacity=a.opacity;
 overlay.style.transform="translate(-50%,-50%) translateY("+(a.y*100)+"%) scale("+(Number(c.textScale||1)*a.scale)+") rotate("+(Number(c.textRotation||0))+"deg)";
}
function showTextAnimation(){
 tools.innerHTML='<b>✨ Text Animation</b><button data-textanim="none">None</button><button data-textanim="fade">Fade</button><button data-textanim="pop">Pop</button><button data-textanim="zoom">Zoom</button><button data-textanim="slideUp">Slide Up</button><button data-textanim="slideDown">Slide Down</button><button data-textanim="bounce">Bounce</button>';
}
function showChroma(){
 tools.innerHTML='<b>🟩 Chroma Key / Green Screen</b><label>Strength <input id="chromaStrength" type="range" min="0" max="1" step=".05" value="'+(settings().chromaStrength||.6)+'"></label><button id="chromaOn">'+(settings().chroma?"Disable":"Enable")+'</button><div class="hint">Green pixels preview/export pipelineमध्ये transparent केले जातील.</div>';
 $("#chromaStrength").oninput=()=>{settings().chromaStrength=+$("#chromaStrength").value;applyVisualSettings()};
 $("#chromaOn").onclick=()=>{settings().chroma=!settings().chroma;$("#chromaOn").textContent=settings().chroma?"Disable":"Enable";msg("Chroma Key "+(settings().chroma?"ON":"OFF")+" ✓")};
}
function applyVisualSettings(){
 const c=settings(),parts=[];
 if(c.filter&&c.filter!=="none")parts.push(c.filter);
 parts.push("brightness("+(c.brightness||1)+")");
 parts.push("contrast("+(c.contrast||1)+")");
 parts.push("saturate("+(c.saturation||1)+")"); if(c.lightness)parts.push("brightness("+c.lightness+")");
 if(c.hue)parts.push("hue-rotate("+c.hue+"deg)");
 if(c.blur)parts.push("blur("+c.blur+"px)");
 const f=parts.join(" ");
 video.style.filter=f; if(currentImage)preview.style.filter=f;
 video.style.opacity=c.opacity??1;
 video.style.transform="scale("+(c.zoom||1)+") rotate("+(c.rotation||0)+"deg)"+(c.mirror?" scaleX(-1)":"");
}
tools.onclick=e=>{\n const t=e.target; if(t.dataset.chroma){settings().chroma=t.dataset.chroma==="on";msg("Chroma Key "+(settings().chroma?"ON":"OFF")+" ✓")}  if(t.dataset.effect){settings().effect=t.dataset.effect;applyEffectPreview();msg("Effect: "+t.dataset.effect+" ✓")} if(t.dataset.mask){settings().mask=t.dataset.mask;applyMaskPreview();msg("Mask: "+t.dataset.mask+" ✓")}  if(t.id==="applyExport"){exportConfig.width=$("#exQuality").value==="720"?720:1080;exportConfig.height=exportConfig.width===720?405:608;exportConfig.fps=+$("#exFps").value;exportConfig.bitrate=+$("#exBitrate").value;msg("Export settings लागू झाले ✓");} if(t.id==="addKeyframe"){keyframes.push({clip:currentIndex,time:video.currentTime,zoom:settings().zoom,rotation:settings().rotation,opacity:settings().opacity});$("#kfList").textContent="Keyframes: "+keyframes.filter(k=>k.clip===currentIndex).length;msg("Keyframe जोडला ✓")} if(t.dataset.sticker){settings().sticker=t.dataset.sticker;overlay.textContent=(overlay.textContent||"")+" "+t.dataset.sticker;renderOverlayTracks();msg("Sticker जोडला ✓")} if(t.dataset.textanim){settings().textAnimation=t.dataset.textanim;msg("Text animation: "+t.dataset.textanim+" ✓")} if(t.dataset.mask){settings().mask=t.dataset.mask;applyMaskPreview();msg("Mask: "+t.dataset.mask+" ✓")} if(t.id==="clearSticker"){overlay.textContent="";msg("Sticker clear ✓")} if(t.id==="captionStart"){if(!("webkitSpeechRecognition" in window||"SpeechRecognition" in window)){msg("या browser मध्ये Speech Recognition उपलब्ध नाही.",true)}else{const R=window.SpeechRecognition||window.webkitSpeechRecognition,r=new R();r.lang="mr-IN";r.continuous=true;r.onresult=e=>{let x="";for(let i=e.resultIndex;i<e.results.length;i++)x+=e.results[i][0].transcript+" ";overlay.textContent=x.trim();settings().text=x.trim()};r.start();msg("Auto Caption सुरू ✓")}} if(t.id==="clearKeyframes"){for(let i=keyframes.length-1;i>=0;i--)if(keyframes[i].clip===currentIndex)keyframes.splice(i,1);msg("Keyframes clear ✓");act("keyframes")}
 if(t.dataset.addsticker){addSticker(t.dataset.addsticker);msg("Sticker added ✓");return} if(t.dataset.stickeranim){settings().stickerAnimation=t.dataset.stickeranim;applyStickerAnimationPreview();msg("Sticker Animation: "+t.textContent+" ✓");return} if(t.id==="speedCustom"){settings().speed=+t.value;video.playbackRate=+t.value;$("#speedVal").textContent=t.value+"×"} if(t.id==="adjB"){settings().brightness=+t.value;applyVisualSettings()} if(t.id==="adjC"){settings().contrast=+t.value;applyVisualSettings()} if(t.id==="adjS"){settings().saturation=+t.value;applyVisualSettings()} if(t.id==="adjH"){settings().hue=+t.value;applyVisualSettings()} if(t.id==="adjL"){settings().lightness=+t.value;applyVisualSettings()} if(t.id==="adjBlur"){settings().blur=+t.value;applyVisualSettings()}
 if(t.dataset.v && video.src){playbackSpeed=+t.dataset.v;settings().speed=playbackSpeed;video.playbackRate=playbackSpeed;msg("Speed: "+playbackSpeed+"×")} if(t.dataset.curve){settings().speedCurve=t.dataset.curve==="none"?null:t.dataset.curve;msg("Speed Curve: "+(t.dataset.curve==="none"?"Normal":t.dataset.curve)+" ✓");}
 if(t.dataset.f!==undefined && video.src){video.style.filter=t.dataset.f;settings().filter=t.dataset.f;}
 if(t.dataset.t){window.transitionType=t.dataset.t;settings().transition=t.dataset.t;renderTransitionTracks();msg("Transition: "+t.dataset.t+" ✓")} if(t.id==="trDuration"){settings().transitionDuration=Number(t.value);$("#trDurationVal").textContent=Number(t.value).toFixed(1)+"s";renderTransitionTracks();return}
 if(t.id==="trZoom"){settings().zoom=+t.value;applyVisualSettings();return} if(t.id==="trRot"){settings().rotation=+t.value;applyVisualSettings();return} if(t.id==="trOpacity"){settings().opacity=+t.value;applyVisualSettings();return} if(t.id==="mirrorBtn"){settings().mirror=!settings().mirror;applyVisualSettings();msg("Mirror "+(settings().mirror?"ON":"OFF"));return} if(t.id==="zoom"){zoom=+t.value;settings().zoom=zoom;applyVisualSettings();msg("Zoom: "+zoom+"×")}
 if(t.dataset.r){ratio=t.dataset.r;preview.classList.toggle("video-916",ratio==="9:16");preview.classList.toggle("ratio-square",ratio==="1:1");preview.classList.toggle("ratio-wide",ratio==="16:9");msg("Ratio: "+ratio)}
 if(t.id==="add"){overlay.textContent=$("#txt").value;settings().text=$("#txt").value;renderOverlayTracks();}
 if(t.id==="clearText"){overlay.textContent="";settings().text="";renderOverlayTracks();}
 if(t.id==="applyTrim"){
   const s=parseFloat($("#ts").value),en=parseFloat($("#te").value);
   if(s>=0&&en>s&&en<=(currentImage?5:video.duration)){trimStart=s;trimEnd=en;if(video.src)video.currentTime=s;renderTimeline();renderKeyframeTracks();msg("Trim सेट: "+fmt(s)+" → "+fmt(en))}
   else msg("Start/End चुकीचे आहेत.",true)
 }
 if(t.id==="addSplit"){
   const p=video.currentTime;
   if(p>0&&p<video.duration&&!splitPoints.some(x=>Math.abs(x-p)<.2)){splitPoints.push(p);splitPoints.sort((a,b)=>a-b);renderTimeline();renderTransitionTracks();msg("Split point: "+fmt(p))}
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
renderOverlayTracks();bindOverlayPreviewDrag();
musicInfo.onclick=e=>{if(e.target.id==="removeMusic"){musicFile=null;musicInfo.innerHTML="";msg("Music काढले.")}};

function mimeType(){
 return ["video/mp4;codecs=avc1.42E01E,mp4a.40.2","video/mp4","video/webm;codecs=vp9,opus","video/webm;codecs=vp8,opus","video/webm"].find(x=>MediaRecorder.isTypeSupported(x))||"";
}
function extFor(m){return m.startsWith("video/mp4")?"mp4":"webm"}
window.transitionType="none";

let exportConfig={width:1280,height:720,fps:30,bitrate:6000000};
function openExportSettings(){
 tools.innerHTML='<b>⚙️ Export Settings</b><label>Quality <select id="exQuality"><option value="720">720p</option><option value="1080" selected>1080p</option></select></label><label>FPS <select id="exFps"><option>24</option><option selected>30</option><option>60</option></select></label><label>Bitrate <select id="exBitrate"><option value="4000000">4 Mbps</option><option value="6000000" selected>6 Mbps</option><option value="10000000">10 Mbps</option></select></label><button id="applyExport">Apply</button><div class="hint">Browser supportनुसार MP4 किंवा WebM export होईल.</div>';
}
async function exportVideo(){
 if(!files.length){msg("आधी Photo / Video निवडा.",true);return}
 const mediaFiles=files.filter(f=>f.type.startsWith("video/")||f.type.startsWith("image/"));
 if(!mediaFiles.length){msg("Export साठी Photo / Video निवडा.",true);return}
 const mime=mimeType();if(!mime){msg("या browser मध्ये Export समर्थित नाही.",true);return}
 const oldSrc=video.src,oldTime=video.currentTime,oldDisplay=video.style.display;
 const canvas=document.createElement("canvas");
 if(ratio==="9:16"){canvas.width=exportConfig.width===720?720:1080;canvas.height=exportConfig.width===720?1280:1920}else if(ratio==="1:1"){canvas.width=exportConfig.width===720?720:1080;canvas.height=canvas.width}else if(ratio==="16:9"){canvas.width=exportConfig.width;canvas.height=exportConfig.width===720?405:608}else{canvas.width=exportConfig.width;canvas.height=Math.round(exportConfig.width*(video.videoHeight||720)/(video.videoWidth||1280))}
 const ctx=canvas.getContext("2d"),stream=canvas.captureStream(exportConfig.fps);const chromaCanvas=document.createElement("canvas");chromaCanvas.width=canvas.width;chromaCanvas.height=canvas.height;const chromaCtx=chromaCanvas.getContext("2d");
 let audioCtx=null,dest=null,vs=null,musicEl=null;
 try{
   audioCtx=new(window.AudioContext||window.webkitAudioContext)();dest=audioCtx.createMediaStreamDestination();
   vs=audioCtx.createMediaElementSource(video);const vg=audioCtx.createGain();vg.gain.value=video.volume;vs.connect(vg).connect(dest);
   if(musicFile){musicEl=new Audio(URL.createObjectURL(musicFile));musicEl.loop=true;const ms=audioCtx.createMediaElementSource(musicEl);const mg=audioCtx.createGain();const baseVol=+($("#musicVol")?.value||.7);mg.gain.value=baseVol;ms.connect(mg).connect(dest);musicEl.onloadedmetadata=()=>{const d=musicEl.duration;const fi=Math.min(musicFadeIn,d/2);const fo=Math.min(musicFadeOut,d/2);mg.gain.cancelScheduledValues(audioCtx.currentTime);mg.gain.setValueAtTime(fi?0:baseVol,audioCtx.currentTime);if(fi)mg.gain.linearRampToValueAtTime(baseVol,audioCtx.currentTime+fi);if(fo&&isFinite(d)){mg.gain.setValueAtTime(baseVol,audioCtx.currentTime+Math.max(0,d-fo));mg.gain.linearRampToValueAtTime(0,audioCtx.currentTime+d)}}}
   dest.stream.getAudioTracks().forEach(t=>stream.addTrack(t));
 }catch(e){console.warn(e)}
 const rec=new MediaRecorder(stream,{mimeType,videoBitsPerSecond:exportConfig.bitrate}),chunks=[];
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
   if(f.type.startsWith("image/")){\n     const img=new Image();img.src=url;await new Promise((resolve,reject)=>{img.onload=resolve;img.onerror=reject});\n     const until=performance.now()+(cs.duration||photoDuration)*1000;\n     await new Promise(resolve=>{const drawPhoto=()=>{ctx.fillStyle="#000";ctx.fillRect(0,0,canvas.width,canvas.height);const src=img.width/img.height,dst=canvas.width/canvas.height;let dw=canvas.width,dh=canvas.height,dx=0,dy=0;if(src>dst){dh=canvas.height;dw=dh*src;dx=(canvas.width-dw)/2}else{dw=canvas.width;dh=dw/src;dy=(canvas.height-dh)/2}chromaCtx.clearRect(0,0,chromaCanvas.width,chromaCanvas.height);chromaCtx.filter="none";chromaCtx.drawImage(img,0,0,chromaCanvas.width,chromaCanvas.height);applyChromaCanvas(chromaCtx,chromaCanvas,cs.chromaStrength);ctx.save();if(cs.mask==="circle"){ctx.beginPath();ctx.arc(canvas.width/2,canvas.height/2,Math.min(canvas.width,canvas.height)*.46,0,Math.PI*2);ctx.clip()}else if(cs.mask==="rect"){ctx.beginPath();ctx.roundRect(canvas.width*.05,canvas.height*.05,canvas.width*.9,canvas.height*.9,18);ctx.clip()}ctx.drawImage(chromaCanvas,dx,dy,dw,dh);ctx.restore();if(overlay.textContent){const tx=((cs.textX??50)/100)*canvas.width,ty=((cs.textY??textY)/100)*canvas.height,sc=Number(cs.textScale||1),rot=Number(cs.textRotation||0),dur=Math.max(.2,Number(cs.duration||photoDuration||5)),p=Math.max(0,Math.min(1,(performance.now()-until+(dur*1000))/(dur*1000))),a=animationProgress(cs.textAnimation||"none",Math.min(1,p/.35));ctx.save();ctx.globalAlpha=a.opacity;ctx.translate(tx,ty+(a.y*canvas.height));ctx.rotate(rot*Math.PI/180);ctx.scale(sc*a.scale,sc*a.scale);ctx.font=Math.max(textSize,canvas.width*.055)+"px system-ui";ctx.textAlign="center";ctx.fillStyle="#fff";ctx.strokeStyle="#000";ctx.lineWidth=7;ctx.strokeText(overlay.textContent,0,0);ctx.fillText(overlay.textContent,0,0);ctx.restore()}if(performance.now()>=until){resolve();return}requestAnimationFrame(drawPhoto)};requestAnimationFrame(drawPhoto)});URL.revokeObjectURL(url);first=false;continue;\n   }\n   startTime=Math.max(0,cs.trimStart??0);endTime=Math.min(video.duration,cs.trimEnd??video.duration)
   video.currentTime=startTime;await new Promise(r=>video.addEventListener("seeked",r,{once:true}));
   const transition=Math.max(.1,Math.min(2,Number(cs.transitionDuration||.45)));
   if(!first){
     if(cs.transition==="fade" || window.transitionType==="fade"){
       ctx.fillStyle="#000";ctx.fillRect(0,0,canvas.width,canvas.height);
       const steps=Math.max(4,Math.round(transition*24));for(let a=0;a<steps;a++){ctx.globalAlpha=a/Math.max(1,steps-1);ctx.drawImage(video,0,0,canvas.width,canvas.height);await new Promise(r=>setTimeout(r,transition*1000/steps))}
       ctx.globalAlpha=1;
     }else if(cs.transition==="flash" || window.transitionType==="flash"){
       ctx.fillStyle="#fff";ctx.fillRect(0,0,canvas.width,canvas.height);await new Promise(r=>setTimeout(r,120));
     }else if(["zoom","slide","wipe","spin","blur"].includes(cs.transition||window.transitionType)){
       const tr=cs.transition||window.transitionType;
       for(let n=0;n<10;n++){const p=(n+1)/10;ctx.save();
        if(tr==="zoom"){ctx.globalAlpha=p;ctx.translate(canvas.width/2,canvas.height/2);ctx.scale(.65+.35*p,.65+.35*p);ctx.translate(-canvas.width/2,-canvas.height/2)}
        else if(tr==="slide"){ctx.globalAlpha=p;ctx.translate((1-p)*canvas.width,0)}
        else if(tr==="wipe"){ctx.beginPath();ctx.rect(0,0,canvas.width*p,canvas.height);ctx.clip()}
        else if(tr==="spin"){ctx.globalAlpha=p;ctx.translate(canvas.width/2,canvas.height/2);ctx.rotate((1-p)*Math.PI*.5);ctx.translate(-canvas.width/2,-canvas.height/2);ctx.scale(.75+.25*p,.75+.25*p)}
        else {ctx.globalAlpha=p;ctx.filter="blur("+(8*(1-p))+"px)"}
        ctx.drawImage(video,0,0,canvas.width,canvas.height);ctx.restore();await new Promise(r=>setTimeout(r,25))}
     }
   }
   first=false;
   video.play();video.playbackRate=curveSpeed(cs,video.currentTime,startTime,endTime);let last=performance.now();
   await new Promise(resolve=>{
     const draw=()=>{
       if(rec.state!=="recording"){resolve();return}
       ctx.fillStyle="#000";ctx.fillRect(0,0,canvas.width,canvas.height);
       const vw=video.videoWidth||canvas.width,vh=video.videoHeight||canvas.height,src=vw/vh,dst=canvas.width/canvas.height;
       let dw=canvas.width,dh=canvas.height,dx=0,dy=0;
       if(src>dst){dh=canvas.height;dw=dh*src;dx=(canvas.width-dw)/2}else{dw=canvas.width;dh=dw/src;dy=(canvas.height-dh)/2}
       const csNow=clipSettings[i]||settings();chromaCtx.clearRect(0,0,chromaCanvas.width,chromaCanvas.height);chromaCtx.filter=video.style.filter||"none";chromaCtx.drawImage(video,0,0,chromaCanvas.width,chromaCanvas.height);chromaCtx.filter="none";applyChromaCanvas(chromaCtx,chromaCanvas,csNow.chromaStrength);
       ctx.save();if(csNow.mask==="circle"){ctx.beginPath();ctx.arc(canvas.width/2,canvas.height/2,Math.min(canvas.width,canvas.height)*.46,0,Math.PI*2);ctx.clip()}else if(csNow.mask==="rect"){ctx.beginPath();ctx.roundRect(canvas.width*.05,canvas.height*.05,canvas.width*.9,canvas.height*.9,18);ctx.clip()}ctx.filter=video.style.filter||"none";ctx.translate(canvas.width/2,canvas.height/2);ctx.scale(zoom,zoom);ctx.drawImage(chromaCanvas,dx-canvas.width/2,dy-canvas.height/2,dw,dh);ctx.restore();ctx.filter="none";
       if(overlay.textContent){const tx=((csNow.textX??50)/100)*canvas.width,ty=((csNow.textY??16)/100)*canvas.height,sc=Number(csNow.textScale||1),rot=Number(csNow.textRotation||0),dur=Math.max(.2,Number(csNow.duration||photoDuration||5)),p=Math.max(0,Math.min(1,(video.currentTime-startTime)/dur)),ta=animationProgress(csNow.textAnimation||"none",Math.min(1,p/.35)),sa=stickerAnimationState(csNow,(video.currentTime-startTime));ctx.save();ctx.globalAlpha=ta.opacity*(csNow.sticker?sa.opacity:1);ctx.translate(tx+(sa.x*canvas.width),ty+(ta.y*canvas.height)+(sa.y*canvas.height));ctx.rotate((rot+(sa.rot||0))*Math.PI/180);ctx.scale(sc*ta.scale*(csNow.sticker?sa.scale:1),sc*ta.scale*(csNow.sticker?sa.scale:1));ctx.font=Math.max(textSize,canvas.width*.055)+"px system-ui";ctx.textAlign="center";ctx.fillStyle="#fff";ctx.strokeStyle="#000";ctx.lineWidth=7;ctx.strokeText(overlay.textContent,0,0);ctx.fillText(overlay.textContent,0,0);ctx.restore()}
       drawStickerObjectsExport(ctx,canvas,csNow,video.currentTime-startTime);
       if(video.currentTime>=endTime||video.ended){video.pause();resolve();return}
       requestAnimationFrame(draw)
     };requestAnimationFrame(draw)
   });
   URL.revokeObjectURL(url);
 }
 rec.stop();
}
function applyKeyframePreview(time){
 const list=typeof keyframes==="undefined"?[]:keyframes.filter(k=>k.clip===currentIndex).sort((a,b)=>a.time-b.time);
 if(!list.length)return;
 let a=list[0],b=list[list.length-1];
 if(time<=a.time)b=a; else if(time>=b.time)a=list[list.length-1]; else{
  for(let i=0;i<list.length-1;i++)if(time>=list[i].time&&time<=list[i+1].time){a=list[i];b=list[i+1];break}
 }
 const span=Math.max(.001,b.time-a.time),p=a===b?0:Math.max(0,Math.min(1,(time-a.time)/span));
 const lerp=(x,y)=>Number(x??1)+(Number(y??x??1)-Number(x??1))*p;
 const z=lerp(a.zoom,b.zoom),r=lerp(a.rotation,b.rotation),o=lerp(a.opacity,b.opacity);
 video.style.transform="scale("+z+") rotate("+r+"deg)"+((settings().mirror)?" scaleX(-1)":"");
 video.style.opacity=o;
}
async function playTransitionPreview(type,duration){
 const ms=Math.max(100,Math.min(2000,Number(duration||.45)*1000));
 if(!preview||!["flash","fade","zoom","slide","wipe","spin","blur"].includes(type))return;
 const op=preview.style.opacity,tr=preview.style.transform,fi=preview.style.filter,cl=preview.style.clipPath;
 preview.style.willChange="transform,opacity,filter,clip-path";
 const start=performance.now();
 await new Promise(resolve=>{
  const frame=()=>{
   const p=Math.min(1,(performance.now()-start)/ms),e=1-Math.pow(1-p,3);
   preview.style.opacity=type==="flash"?(p<.5?".15":"1"):String(e);
   if(type==="zoom")preview.style.transform="scale("+(0.65+0.35*e)+")";
   else if(type==="slide")preview.style.transform="translate3d("+(100*(1-e))+"%,0,0)";
   else if(type==="spin")preview.style.transform="rotate("+((1-e)*180)+"deg) scale("+(0.75+0.25*e)+")";
   else if(type==="blur")preview.style.filter="blur("+(8*(1-e))+"px)";
   else if(type==="wipe")preview.style.clipPath="inset(0 "+((1-e)*100)+"% 0 0)";
   if(p>=1){preview.style.opacity=op||"1";preview.style.transform=tr||"";preview.style.filter=fi||"";preview.style.clipPath=cl||"none";preview.style.willChange="auto";resolve()}else requestAnimationFrame(frame);
  };
  requestAnimationFrame(frame);
 });
}
async function playAll(){
 if(!files.length){msg("आधी Photo / Video निवडा.",true);return}
 const oldSrc=video.src,oldDisplay=video.style.display,oldText=overlay.textContent,oldFilter=video.style.filter,oldTransform=preview.style.transform,oldClip=preview.style.clipPath;
 try{
  for(let i=0;i<files.length;i++){
   currentIndex=i;renderTimeline();
   const f=files[i],s=clipSettings[i]||settings(),url=URL.createObjectURL(f);
   if(f.type.startsWith("image/")){
    video.pause();video.style.display="none";empty.style.display="none";overlay.textContent=s.text||"";
    const until=performance.now()+(s.duration||photoDuration)*1000;
    const imageStart=performance.now();await new Promise(r=>{const loop=()=>{applyKeyframePreview((performance.now()-imageStart)/1000);if(performance.now()>=until)r();else requestAnimationFrame(loop)};loop()});
   }else{
    video.style.display="block";empty.style.display="none";video.src=url;video.load();
    await new Promise((r,x)=>{video.onloadedmetadata=r;video.onerror=x});
    const a=s.trimStart??0,b=s.trimEnd??video.duration;
    video.currentTime=a;await new Promise(r=>video.addEventListener("seeked",r,{once:true}));
    overlay.textContent=s.text||"";video.style.filter=s.filter||"none";video.style.transform="scale("+(s.zoom||1)+")";
    await video.play().catch(()=>{});
    await new Promise(resolve=>{const check=()=>{applyKeyframePreview(video.currentTime);if(video.currentTime>=b||video.ended){video.pause();resolve()}else requestAnimationFrame(check)};check()});
   }
   URL.revokeObjectURL(url);
   if(i<files.length-1)await playTransitionPreview(s.transition||"none",s.transitionDuration||.45);
  }
  msg("Preview पूर्ण झाले ✓");
 }finally{
  video.pause();video.style.filter=oldFilter;overlay.textContent=oldText;video.style.display=oldDisplay;
  if(oldSrc){video.src=oldSrc;video.load()}
  preview.style.opacity="1";preview.style.transform=oldTransform||"";preview.style.clipPath=oldClip||"none";preview.style.filter="";
  preview.style.willChange="auto";
 }
}
function selectTemplate(name){openEditor();msg("Template निवडला: "+name+" ✓");}
document.querySelectorAll(".template-card").forEach(c=>c.addEventListener("click",()=>selectTemplate(c.dataset.template)));
document.querySelectorAll("[data-home-tool]").forEach(c=>c.addEventListener("click",()=>{openEditor();msg(c.textContent.trim()+" tool उघडला ✓")}));
function openEditor(){const h=$("#homeScreen"),e=$("#editorScreen");if(h)h.hidden=true;if(e)e.hidden=false;}
function openHome(){const h=$("#homeScreen"),e=$("#editorScreen");if(h)h.hidden=false;if(e)e.hidden=true;}
$("#homeNewProject")?.addEventListener("click",openEditor);
$("#homeImport")?.addEventListener("click",openEditor);
$("#bottomNew")?.addEventListener("click",openEditor);
$("#backHome")?.addEventListener("click",openHome);
$("#playAll").onclick=playAll;
$("#export").onclick=exportVideo;
$("#new").onclick=()=>location.reload();

$("#saveProject").onclick=saveProject; $("#exportSettingsBtn")?.addEventListener("click",openExportSettings);
$("#undoBtn").onclick=undo;
$("#redoBtn").onclick=redo;
$("#loadProject").onclick=()=>$("#projectFile").click();
$("#projectFile").onchange=e=>{const f=e.target.files[0];if(!f)return;const rd=new FileReader();rd.onload=async()=>{try{const st=JSON.parse(rd.result);pushHistory();if(Array.isArray(st.files)&&st.files.length&&st.files[0].data){files=st.files.map(x=>{const b64=x.data.split(",")[1]||"";const bin=atob(b64),u=new Uint8Array(bin.length);for(let i=0;i<bin.length;i++)u[i]=bin.charCodeAt(i);return new File([u],x.name,{type:x.type,lastModified:x.lastModified||Date.now()})});}if(st.music&&st.music.data){const b64=st.music.data.split(",")[1]||"";const bin=atob(b64),u=new Uint8Array(bin.length);for(let i=0;i<bin.length;i++)u[i]=bin.charCodeAt(i);musicFile=new File([u],st.music.name,{type:st.music.type,lastModified:st.music.lastModified||Date.now()});}restoreState(st);currentIndex=0;if(files.length)load(files[0]);restoreOverlayTransform();renderTimeline();msg("पूर्ण Project load झाला ✓")}catch(_){msg("Project file चुकीची आहे किंवा खूप मोठी आहे.",true)}};rd.readAsText(f);e.target.value="";};
if(feature==="transformOverlay"){showOverlayTransformControls();return}\n if(feature==="stickers"){tools.innerHTML='<b>😀 Stickers</b><div class="sticker-grid"><button data-sticker="⭐">⭐</button><button data-sticker="❤️">❤️</button><button data-sticker="🔥">🔥</button><button data-sticker="✨">✨</button><button data-sticker="🎉">🎉</button><button data-sticker="👍">👍</button></div><label>Size <input id="stickerSize" type="range" min="30" max="180" value="70"></label><button id="clearSticker">Clear</button>';return}
 if(feature==="textanim"){tools.innerHTML='<b>🅰️ Text Animation</b><button data-textanim="none">None</button><button data-textanim="pop">Pop</button><button data-textanim="fade">Fade</button><button data-textanim="slide">Slide</button>';return}
 if(feature==="captions"){tools.innerHTML='<b>📝 Auto Captions</b><button id="captionStart">🎙️ Start Speech Captions</button><div class="hint">Browser speech recognition उपलब्ध असल्यास captions previewमध्ये दिसतील.</div>';return}
 if(feature==="chroma"){tools.innerHTML='<b>🟩 Chroma Key</b><label>Green removal strength <input id="chromaStrength" type="range" min="0" max="1" step=".05" value=".6"></label><div class="hint">Green-screen preview/export pipeline पुढील चरणात canvas keying वापरेल.</div>';return}
 if(feature==="mask"){tools.innerHTML='<b>🎭 Mask</b><button data-mask="circle">Circle</button><button data-mask="rect">Rectangle</button><button data-mask="none">None</button>';return}
}
function act(a){\n if(!restoringHistory) pushHistory();
 if(!video.src && !currentImage){tools.innerHTML="<b>आधी Photo / Video निवडा.</b>";return}
  if(a==="keyframes"){tools.innerHTML="<b>Keyframe</b><button id=\"addKeyframe\">Add Keyframe</button><button id=\"clearKeyframes\">Clear Keyframes</button><div id=\"kfList\">Keyframes: "+keyframes.filter(k=>k.clip===currentIndex).length+"</div>";return;}\nif(a==="trim"){
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
 if(a==="speed")tools.innerHTML='<b>⚡ Speed</b><button data-v=".5">0.5×</button><button data-v="1">1×</button><button data-v="1.5">1.5×</button><button data-v="2">2×</button><label>Custom <input id="speedCustom" type="range" min=".25" max="4" step=".05" value="'+settings().speed+'"></label><span id="speedVal">'+settings().speed+'×</span><hr><b>📈 Speed Curve</b><button data-curve="montage">Montage</button><button data-curve="bullet">Bullet</button><button data-curve="jump">Jump Cut</button><button data-curve="hero">Hero</button><button data-curve="none">Normal</button><div class="hint">Videoच्या वेळेनुसार speed आपोआप बदलतो.</div>';
 if(a==="transform")tools.innerHTML='<b>🎯 Transform</b><label>Zoom <input id="trZoom" type="range" min="1" max="3" step=".1" value="'+settings().zoom+'"></label><label>Rotation <input id="trRot" type="range" min="-180" max="180" value="'+settings().rotation+'"></label><label>Opacity <input id="trOpacity" type="range" min="0" max="1" step=".05" value="'+settings().opacity+'"></label><button id="mirrorBtn">🪞 Mirror</button>'; if(a==="adjust")tools.innerHTML='<b>🎨 Adjust</b><label>Brightness <input id="adjB" type="range" min=".3" max="2" step=".05" value="'+settings().brightness+'"></label><label>Contrast <input id="adjC" type="range" min=".3" max="2" step=".05" value="'+settings().contrast+'"></label><label>Saturation <input id="adjS" type="range" min="0" max="2" step=".05" value="'+settings().saturation+'"></label><label>Blur <input id="adjBlur" type="range" min="0" max="12" step=".5" value="'+settings().blur+'"></label>'; if(a==="zoom")tools.innerHTML='<b>🔍 Zoom</b><input id="zoom" type="range" min="1" max="2.5" step=".1" value="'+settings().zoom+'"><div class="hint">Preview मध्ये Zoom करा.</div>';
 if(a==="filter")tools.innerHTML='<button data-f="none">Original</button><button data-f="grayscale(1)">B&W</button><button data-f="sepia(1)">Sepia</button><button data-f="contrast(1.4) saturate(1.3)">Vivid</button>';
 if(a==="clipSettings")tools.innerHTML='<b>🎬 Clip Settings</b><label>Photo/Clip Duration <input id="clipDur" type="range" min="1" max="15" step=".5" value="'+settings().duration+'"></label><span id="clipDurVal">'+settings().duration+' sec</span><label>Transition <select id="clipTrans"><option value="none">None</option><option value="fade">Fade</option><option value="flash">Flash</option></select></label>';
 if(a==="photoDuration")tools.innerHTML='<b>🖼️ Photo Duration</b><input id="photoDur" type="range" min="1" max="15" step=".5" value="'+photoDuration+'"><span id="photoDurVal">'+photoDuration+' sec</span>';
 if(a==="musicFade")tools.innerHTML='<b>🎵 Music Fade</b><label>Fade In <input id="fadeIn" type="range" min="0" max="5" step=".5" value="'+musicFadeIn+'"></label><label>Fade Out <input id="fadeOut" type="range" min="0" max="5" step=".5" value="'+musicFadeOut+'"></label>';
 if(a==="volume")tools.innerHTML='<span>Video</span><input id="vol" type="range" min="0" max="1" step=".05" value="'+video.volume+'">';
 if(a==="clipSettings"){}\n if(a==="transition"){const tr=settings().transition||"none";const td=Number(settings().transitionDuration||0.45);tools.innerHTML='<b>🎞️ Transition</b><div class="sticker-grid"><button data-t="none">None</button><button data-t="fade">Fade</button><button data-t="flash">Flash</button><button data-t="zoom">Zoom</button><button data-t="slide">Slide</button><button data-t="wipe">Wipe</button><button data-t="spin">Spin</button><button data-t="blur">Blur</button></div><label>Duration <input id="trDuration" type="range" min="0.1" max="2" step="0.1" value="'+td+'"><span id="trDurationVal">'+td.toFixed(1)+'s</span></label><div class="hint">सध्याच्या clip च्या आधीचा transition. प्रत्येक clip साठी स्वतंत्र सेट करा.</div>';}
}

tools.onclick=e=>{\n const t=e.target; if(t.id==="applyExport"){exportConfig.width=$("#exQuality").value==="720"?720:1080;exportConfig.height=exportConfig.width===720?405:608;exportConfig.fps=+$("#exFps").value;exportConfig.bitrate=+$("#exBitrate").value;msg("Export settings लागू झाले ✓");} if(t.id==="addKeyframe"){keyframes.push({clip:currentIndex,time:video.currentTime,zoom:settings().zoom,rotation:settings().rotation,opacity:settings().opacity});$("#kfList").textContent="Keyframes: "+keyframes.filter(k=>k.clip===currentIndex).length;msg("Keyframe जोडला ✓")} if(t.dataset.sticker){settings().sticker=t.dataset.sticker;overlay.textContent=(overlay.textContent||"")+" "+t.dataset.sticker;renderOverlayTracks();msg("Sticker जोडला ✓")} if(t.dataset.textanim){settings().textAnimation=t.dataset.textanim;msg("Text animation: "+t.dataset.textanim+" ✓")} if(t.dataset.mask){settings().mask=t.dataset.mask;msg("Mask: "+t.dataset.mask+" ✓")} if(t.id==="clearSticker"){overlay.textContent="";msg("Sticker clear ✓")} if(t.id==="captionStart"){if(!("webkitSpeechRecognition" in window||"SpeechRecognition" in window)){msg("या browser मध्ये Speech Recognition उपलब्ध नाही.",true)}else{const R=window.SpeechRecognition||window.webkitSpeechRecognition,r=new R();r.lang="mr-IN";r.continuous=true;r.onresult=e=>{let x="";for(let i=e.resultIndex;i<e.results.length;i++)x+=e.results[i][0].transcript+" ";overlay.textContent=x.trim();settings().text=x.trim()};r.start();msg("Auto Caption सुरू ✓")}} if(t.id==="clearKeyframes"){for(let i=keyframes.length-1;i>=0;i--)if(keyframes[i].clip===currentIndex)keyframes.splice(i,1);$("#kfList").textContent="Keyframes: 0";msg("Keyframes clear ✓")}
 const t=e.target; if(t.id==="speedCustom"){settings().speed=+t.value;video.playbackRate=+t.value;$("#speedVal").textContent=t.value+"×"} if(t.id==="adjB"){settings().brightness=+t.value;applyVisualSettings()} if(t.id==="adjC"){settings().contrast=+t.value;applyVisualSettings()} if(t.id==="adjS"){settings().saturation=+t.value;applyVisualSettings()} if(t.id==="adjBlur"){settings().blur=+t.value;applyVisualSettings()}
 if(t.dataset.v && video.src){playbackSpeed=+t.dataset.v;settings().speed=playbackSpeed;video.playbackRate=playbackSpeed;msg("Speed: "+playbackSpeed+"×")} if(t.dataset.curve){settings().speedCurve=t.dataset.curve==="none"?null:t.dataset.curve;msg("Speed Curve: "+(t.dataset.curve==="none"?"Normal":t.dataset.curve)+" ✓");}
 if(t.dataset.f!==undefined && video.src){video.style.filter=t.dataset.f;settings().filter=t.dataset.f;}
 if(t.dataset.t){window.transitionType=t.dataset.t;settings().transition=t.dataset.t;msg("Transition: "+t.dataset.t)}
 if(t.id==="trZoom"){settings().zoom=+t.value;applyVisualSettings();return} if(t.id==="trRot"){settings().rotation=+t.value;applyVisualSettings();return} if(t.id==="trOpacity"){settings().opacity=+t.value;applyVisualSettings();return} if(t.id==="mirrorBtn"){settings().mirror=!settings().mirror;applyVisualSettings();msg("Mirror "+(settings().mirror?"ON":"OFF"));return} if(t.id==="zoom"){zoom=+t.value;settings().zoom=zoom;applyVisualSettings();msg("Zoom: "+zoom+"×")}
 if(t.dataset.r){ratio=t.dataset.r;preview.classList.toggle("video-916",ratio==="9:16");preview.classList.toggle("ratio-square",ratio==="1:1");preview.classList.toggle("ratio-wide",ratio==="16:9");msg("Ratio: "+ratio)}
 if(t.id==="add"){overlay.textContent=$("#txt").value;settings().text=$("#txt").value;renderOverlayTracks();}
 if(t.id==="clearText"){overlay.textContent="";settings().text="";renderOverlayTracks();}
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
renderOverlayTracks();bindOverlayPreviewDrag();
musicInfo.onclick=e=>{if(e.target.id==="removeMusic"){musicFile=null;musicInfo.innerHTML="";msg("Music काढले.")}};

function mimeType(){
 return ["video/mp4;codecs=avc1.42E01E,mp4a.40.2","video/mp4","video/webm;codecs=vp9,opus","video/webm;codecs=vp8,opus","video/webm"].find(x=>MediaRecorder.isTypeSupported(x))||"";
}
function extFor(m){return m.startsWith("video/mp4")?"mp4":"webm"}
window.transitionType="none";

let exportConfig={width:1280,height:720,fps:30,bitrate:6000000};
function openExportSettings(){
 tools.innerHTML='<b>⚙️ Export Settings</b><label>Quality <select id="exQuality"><option value="720">720p</option><option value="1080" selected>1080p</option></select></label><label>FPS <select id="exFps"><option>24</option><option selected>30</option><option>60</option></select></label><label>Bitrate <select id="exBitrate"><option value="4000000">4 Mbps</option><option value="6000000" selected>6 Mbps</option><option value="10000000">10 Mbps</option></select></label><button id="applyExport">Apply</button><div class="hint">Browser supportनुसार MP4 किंवा WebM export होईल.</div>';
}
async function exportVideo(){
 if(!files.length){msg("आधी Photo / Video निवडा.",true);return}
 const mediaFiles=files.filter(f=>f.type.startsWith("video/")||f.type.startsWith("image/"));
 if(!mediaFiles.length){msg("Export साठी Photo / Video निवडा.",true);return}
 const mime=mimeType();if(!mime){msg("या browser मध्ये Export समर्थित नाही.",true);return}
 const oldSrc=video.src,oldTime=video.currentTime,oldDisplay=video.style.display;
 const canvas=document.createElement("canvas");
 if(ratio==="9:16"){canvas.width=exportConfig.width===720?720:1080;canvas.height=exportConfig.width===720?1280:1920}else if(ratio==="1:1"){canvas.width=exportConfig.width===720?720:1080;canvas.height=canvas.width}else if(ratio==="16:9"){canvas.width=exportConfig.width;canvas.height=exportConfig.width===720?405:608}else{canvas.width=exportConfig.width;canvas.height=Math.round(exportConfig.width*(video.videoHeight||720)/(video.videoWidth||1280))}
 const ctx=canvas.getContext("2d"),stream=canvas.captureStream(30);
 let audioCtx=null,dest=null,vs=null,musicEl=null;
 try{
   audioCtx=new(window.AudioContext||window.webkitAudioContext)();dest=audioCtx.createMediaStreamDestination();
   vs=audioCtx.createMediaElementSource(video);const vg=audioCtx.createGain();vg.gain.value=video.volume;vs.connect(vg).connect(dest);
   if(musicFile){musicEl=new Audio(URL.createObjectURL(musicFile));musicEl.loop=true;const ms=audioCtx.createMediaElementSource(musicEl);const mg=audioCtx.createGain();const baseVol=+($("#musicVol")?.value||.7);mg.gain.value=baseVol;ms.connect(mg).connect(dest);musicEl.onloadedmetadata=()=>{const d=musicEl.duration;const fi=Math.min(musicFadeIn,d/2);const fo=Math.min(musicFadeOut,d/2);mg.gain.cancelScheduledValues(audioCtx.currentTime);mg.gain.setValueAtTime(fi?0:baseVol,audioCtx.currentTime);if(fi)mg.gain.linearRampToValueAtTime(baseVol,audioCtx.currentTime+fi);if(fo&&isFinite(d)){mg.gain.setValueAtTime(baseVol,audioCtx.currentTime+Math.max(0,d-fo));mg.gain.linearRampToValueAtTime(0,audioCtx.currentTime+d)}}}
   dest.stream.getAudioTracks().forEach(t=>stream.addTrack(t));
 }catch(e){console.warn(e)}
 const rec=new MediaRecorder(stream,{mimeType,videoBitsPerSecond:exportConfig.bitrate}),chunks=[];
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
   video.play();video.playbackRate=curveSpeed(cs,video.currentTime,startTime,endTime);let last=performance.now();
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
function selectTemplate(name){openEditor();msg("Template निवडला: "+name+" ✓");}
document.querySelectorAll(".template-card").forEach(c=>c.addEventListener("click",()=>selectTemplate(c.dataset.template)));
document.querySelectorAll("[data-home-tool]").forEach(c=>c.addEventListener("click",()=>{openEditor();msg(c.textContent.trim()+" tool उघडला ✓")}));
function openEditor(){const h=$("#homeScreen"),e=$("#editorScreen");if(h)h.hidden=true;if(e)e.hidden=false;}
function openHome(){const h=$("#homeScreen"),e=$("#editorScreen");if(h)h.hidden=false;if(e)e.hidden=true;}
$("#homeNewProject")?.addEventListener("click",openEditor);
$("#homeImport")?.addEventListener("click",openEditor);
$("#bottomNew")?.addEventListener("click",openEditor);
$("#backHome")?.addEventListener("click",openHome);
$("#playAll").onclick=playAll;
$("#export").onclick=exportVideo;
$("#new").onclick=()=>location.reload();

$("#saveProject").onclick=saveProject; $("#exportSettingsBtn")?.addEventListener("click",openExportSettings);
$("#undoBtn").onclick=undo;
$("#redoBtn").onclick=redo;
$("#loadProject").onclick=()=>$("#projectFile").click();
$("#projectFile").onchange=e=>{const f=e.target.files[0];if(!f)return;const rd=new FileReader();rd.onload=async()=>{try{const st=JSON.parse(rd.result);pushHistory();if(Array.isArray(st.files)&&st.files.length&&st.files[0].data){files=st.files.map(x=>{const b64=x.data.split(",")[1]||"";const bin=atob(b64),u=new Uint8Array(bin.length);for(let i=0;i<bin.length;i++)u[i]=bin.charCodeAt(i);return new File([u],x.name,{type:x.type,lastModified:x.lastModified||Date.now()})});}if(st.music&&st.music.data){const b64=st.music.data.split(",")[1]||"";const bin=atob(b64),u=new Uint8Array(bin.length);for(let i=0;i<bin.length;i++)u[i]=bin.charCodeAt(i);musicFile=new File([u],st.music.name,{type:st.music.type,lastModified:st.music.lastModified||Date.now()});}restoreState(st);currentIndex=0;if(files.length)load(files[0]);renderTimeline();msg("पूर्ण Project load झाला ✓")}catch(_){msg("Project file चुकीची आहे किंवा खूप मोठी आहे.",true)}};rd.readAsText(f);e.target.value="";};
