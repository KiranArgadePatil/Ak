tools.onclick=e=>{
 var t=e.target; if(t.dataset.chroma){settings().chroma=t.dataset.chroma==="on";msg("Chroma Key "+(settings().chroma?"ON":"OFF")+" ✓")}  if(t.dataset.effect){settings().effect=t.dataset.effect;applyEffectPreview();msg("Effect: "+t.dataset.effect+" ✓")} if(t.dataset.mask){settings().mask=t.dataset.mask;applyMaskPreview();msg("Mask: "+t.dataset.mask+" ✓")}  if(t.id==="applyExport"){exportConfig.width=$("#exQuality").value==="720"?720:1080;exportConfig.height=exportConfig.width===720?405:608;exportConfig.fps=+$("#exFps").value;exportConfig.bitrate=+$("#exBitrate").value;msg("Export settings लागू झाले ✓");} if(t.id==="addKeyframe"){const f=files[currentIndex],c=clipSettings[currentIndex]||{},isImage=f&&f.type.startsWith("image/"),time=isImage?Math.max(0,Math.min(Number(c.duration||photoDuration||5),Number(window.photoPreviewTime||0))):Math.max(Number(c.trimStart||0),Math.min(Number(c.trimEnd??video.duration),video.currentTime));const k={clip:currentIndex,time:time,zoom:settings().zoom,rotation:settings().rotation,opacity:settings().opacity};keyframes.push(k);keyframes.sort((a,b)=>a.clip-b.clip||a.time-b.time);selectedKeyframe=k;$("#kfList").textContent="Keyframes: "+keyframes.filter(k=>k.clip===currentIndex).length;renderKeyframeTracks();msg("Current Time वर Keyframe जोडला ✓")} if(t.dataset.sticker){settings().sticker=t.dataset.sticker;overlay.textContent=(overlay.textContent||"")+" "+t.dataset.sticker;renderOverlayTracks();msg("Sticker जोडला ✓")} if(t.dataset.textanim){settings().textAnimation=t.dataset.textanim;msg("Text animation: "+t.dataset.textanim+" ✓")} if(t.dataset.mask){settings().mask=t.dataset.mask;applyMaskPreview();msg("Mask: "+t.dataset.mask+" ✓")} if(t.id==="clearSticker"){overlay.textContent="";msg("Sticker clear ✓")} if(t.id==="captionStart"){if(!("webkitSpeechRecognition" in window||"SpeechRecognition" in window)){msg("या browser मध्ये Speech Recognition उपलब्ध नाही.",true)}else{const R=window.SpeechRecognition||window.webkitSpeechRecognition,r=new R();r.lang="mr-IN";r.continuous=true;r.onresult=e=>{let x="";for(let i=e.resultIndex;i<e.results.length;i++)x+=e.results[i][0].transcript+" ";overlay.textContent=x.trim();settings().text=x.trim();};r.start();msg("Auto Caption सुरू ✓")}} if(t.id==="kfTime"&&selectedKeyframe){const f=files[selectedKeyframe.clip],c=clipSettings[selectedKeyframe.clip]||{},isImage=f&&f.type.startsWith("image/"),min=isImage?0:Number(c.trimStart||0),max=isImage?Number(c.duration||photoDuration||5):Math.max(min,Number(c.trimEnd??video.duration));selectedKeyframe.time=Math.max(min,Math.min(max,Number(t.value)||0));keyframes.sort((a,b)=>a.clip-b.clip||a.time-b.time);renderKeyframeTracks();if(selectedKeyframe.clip===currentIndex){if(isImage){window.photoPreviewTime=selectedKeyframe.time;applyKeyframePreview(selectedKeyframe.time)}else video.currentTime=selectedKeyframe.time}msg("Keyframe time updated ✓");return} if(["kfZoom","kfRotation","kfOpacity"].includes(t.id)&&selectedKeyframe){const v=Number(t.value);if(t.id==="kfZoom"){$("#kfZoomVal").textContent=v.toFixed(1)+"x";selectedKeyframe.zoom=v}if(t.id==="kfRotation"){$("#kfRotationVal").textContent=v.toFixed(0)+"°";selectedKeyframe.rotation=v}if(t.id==="kfOpacity"){$("#kfOpacityVal").textContent=Math.round(v*100)+"%";selectedKeyframe.opacity=v}applyKeyframePreview(selectedKeyframe.time);renderKeyframeTracks();return} if(t.id==="kfJump"&&selectedKeyframe){const f=files[selectedKeyframe.clip],c=clipSettings[selectedKeyframe.clip]||{},tt=Number(selectedKeyframe.time||0);if(f&&f.type.startsWith("image/")){window.photoPreviewTime=tt;applyKeyframePreview(tt)}else if(selectedKeyframe.clip===currentIndex){video.currentTime=tt}msg("Keyframe वर Jump केले ✓");return} if(t.id==="kfDelete"&&selectedKeyframe){const n=keyframes.indexOf(selectedKeyframe);if(n>=0)keyframes.splice(n,1);selectedKeyframe=null;renderKeyframeTracks();act("keyframes");msg("Keyframe Delete ✓");return} if(t.id==="kfBack"){act("keyframes");return} if(t.id==="kfDuplicate"&&selectedKeyframe){const c=clipSettings[currentIndex]||{},isImage=files[currentIndex]&&files[currentIndex].type.startsWith("image/"),hi=isImage?Number(c.duration||photoDuration||5):Number(c.trimEnd??video.duration),copy={clip:selectedKeyframe.clip,time:Math.min(hi,Number(selectedKeyframe.time||0)+0.5),zoom:selectedKeyframe.zoom,rotation:selectedKeyframe.rotation,opacity:selectedKeyframe.opacity};if(copy.time<=selectedKeyframe.time)copy.time=Math.min(hi,Number(selectedKeyframe.time||0)+0.1);keyframes.push(copy);keyframes.sort((a,b)=>a.clip-b.clip||a.time-b.time);showKeyframeEditor(copy);renderKeyframeTracks();msg("Keyframe Duplicate ✓");return} if(t.id==="kfZoom"&&selectedKeyframe){selectedKeyframe.zoom=+t.value;applyKeyframePreview(selectedKeyframe.time)} if(t.id==="kfRotation"&&selectedKeyframe){selectedKeyframe.rotation=+t.value;applyKeyframePreview(selectedKeyframe.time)} if(t.id==="kfOpacity"&&selectedKeyframe){selectedKeyframe.opacity=+t.value;applyKeyframePreview(selectedKeyframe.time)} if(t.id==="clearKeyframes"){for(let i=keyframes.length-1;i>=0;i--)if(keyframes[i].clip===currentIndex)keyframes.splice(i,1);msg("Keyframes clear ✓");act("keyframes")}
 if(t.dataset.addsticker){addSticker(t.dataset.addsticker);msg("Sticker added ✓");return} if(t.dataset.stickeranim){settings().stickerAnimation=t.dataset.stickeranim;applyStickerAnimationPreview();msg("Sticker Animation: "+t.textContent+" ✓");return} if(t.id==="speedCustom"){settings().speed=+t.value;video.playbackRate=+t.value;$("#speedVal").textContent=t.value+"×"} if(t.id==="adjB"){settings().brightness=+t.value;applyVisualSettings()} if(t.id==="adjC"){settings().contrast=+t.value;applyVisualSettings()} if(t.id==="adjS"){settings().saturation=+t.value;applyVisualSettings()} if(t.id==="adjH"){settings().hue=+t.value;applyVisualSettings()} if(t.id==="adjL"){settings().lightness=+t.value;applyVisualSettings()} if(t.id==="adjBlur"){settings().blur=+t.value;applyVisualSettings()}
 if(t.dataset.v && video.src){playbackSpeed=+t.dataset.v;settings().speed=playbackSpeed;video.playbackRate=playbackSpeed;msg("Speed: "+playbackSpeed+"×")} if(t.dataset.curve){const name=t.dataset.curve;settings().speedCurvePreset=name==="none"?"normal":name;settings().speedCurve=name==="none"?null:name;applySpeedCurvePreview();msg("Speed Curve: "+(name==="none"?"Normal":name)+" ✓")} if(t.dataset.customcurve){const raw=prompt("Custom Speed Curve values लिहा (उदा. 0.5,1,2,1,0.75)", "0.5,1,2,1,0.75");if(raw){const pts=raw.split(",").map(Number).filter(Number.isFinite).map(v=>Math.max(.1,Math.min(4,v)));if(pts.length>=2){settings().speedCurvePreset="custom";settings().speedCurve=pts;applySpeedCurvePreview();msg("Custom Speed Curve ✓")}else msg("किमान 2 values द्या.",true)}}
 if(t.dataset.f!==undefined && video.src){video.style.filter=t.dataset.f;settings().filter=t.dataset.f;}
 if(t.dataset.t){window.transitionType=t.dataset.t;settings().transition=t.dataset.t;renderTransitionTracks();msg("Transition: "+t.dataset.t+" ✓")} if(t.id==="trDuration"){settings().transitionDuration=Number(t.value);$("#trDurationVal").textContent=Number(t.value).toFixed(1)+"s";renderTransitionTracks();return}
 if(t.id==="trZoom"){settings().zoom=+t.value;applyVisualSettings();return} if(t.id==="trRot"){settings().rotation=+t.value;applyVisualSettings();return} if(t.id==="trOpacity"){settings().opacity=+t.value;applyVisualSettings();return} if(t.id==="mirrorBtn"){settings().mirror=!settings().mirror;applyVisualSettings();msg("Mirror "+(settings().mirror?"ON":"OFF"));return} if(t.id==="zoom"){zoom=+t.value;settings().zoom=zoom;applyVisualSettings();msg("Zoom: "+zoom+"×")}
 if(t.dataset.r){ratio=t.dataset.r;preview.classList.toggle("video-916",ratio==="9:16");preview.classList.toggle("ratio-square",ratio==="1:1");preview.classList.toggle("ratio-wide",ratio==="16:9");msg("Ratio: "+ratio)}
 if(t.id==="add"){overlay.textContent=$("#txt").value;settings().text=$("#txt").value;renderOverlayTracks();}
 if(t.id==="clearText"){overlay.textContent="";settings().text="";renderOverlayTracks();}
 if(t.id==="applyTrim"){
   const s=parseFloat($("#ts").value),en=parseFloat($("#te").value);
   if(s>=0&&en>s&&en<=(currentImage?5:video.duration)){trimStart=s;trimEnd=en;const cs=(typeof clipSettings!=="undefined"&&clipSettings[currentIndex])||(typeof settings==="function"?settings():null);if(cs){cs.trimStart=s;cs.trimEnd=en}if(video.src)video.currentTime=s;renderTimeline();renderKeyframeTracks();renderTransitionTracks&&renderTransitionTracks();msg("Trim सेट: "+fmt(s)+" → "+fmt(en))}
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
 if(e.target.id==="fadeOut")musicFadeOut=+e.target.value; if(e.target.id==="acStart"){audioTimelineState().start=Math.max(0,+e.target.value||0);applyAudioTimeline()} if(e.target.id==="acEnd"){audioTimelineState().end=e.target.value===""?null:Math.max(0,+e.target.value||0);applyAudioTimeline()} if(e.target.id==="acOffset"){audioTimelineState().offset=Math.max(0,+e.target.value||0);applyAudioTimeline()} if(e.target.id==="acVol"){settings().audioVolume=+e.target.value;$("#acVolVal").textContent=Math.round(+e.target.value*100)+"%";} if(e.target.id==="acIn"){settings().audioFadeIn=+e.target.value;$("#acInVal").textContent=(+e.target.value).toFixed(1)+"s";} if(e.target.id==="acOut"){settings().audioFadeOut=+e.target.value;$("#acOutVal").textContent=(+e.target.value).toFixed(1)+"s";}
 if(e.target.id==="clipDur"){settings().duration=+e.target.value;$("#clipDurVal").textContent=settings().duration+" sec";renderTimeline()}
 if(e.target.id==="clipTrans"){settings().transition=e.target.value;} if(selectedKeyframe&&e.target.id==="kfZoom"){selectedKeyframe.zoom=+e.target.value;$("#kfZoomVal").textContent=(+e.target.value).toFixed(1)+"x";applyKeyframePreview(selectedKeyframe.time)} if(selectedKeyframe&&e.target.id==="kfRotation"){selectedKeyframe.rotation=+e.target.value;$("#kfRotationVal").textContent=+e.target.value+"°";applyKeyframePreview(selectedKeyframe.time)} if(selectedKeyframe&&e.target.id==="kfOpacity"){selectedKeyframe.opacity=+e.target.value;$("#kfOpacityVal").textContent=Math.round(+e.target.value*100)+"%";applyKeyframePreview(selectedKeyframe.time)}
};

$("#music").onchange=e=>{
 musicFile=e.target.files[0];
 if(musicFile){renderOverlayTracks();renderAudioWaveform();setupAudioPreview();bindTimelineAudioSync();musicInfo.innerHTML='<div class="music">🎵 '+musicFile.name+' <button id="removeMusic">×</button><label>Music volume <input id="musicVol" type="range" min="0" max="1" step=".05" value=".7"></label></div>';msg("Music जोडले.")}
};
function audioTimelineState(){const c=typeof settings==="function"?settings():{};if(!c.audioClip)c.audioClip={start:0,end:null,offset:0};return c.audioClip}
function bindAudioTimelineDrag(){const el=document.getElementById("audioTrack");if(!el||el.dataset.dragBound)return;el.dataset.dragBound="1";el.addEventListener("pointerdown",e=>{const b=e.target.closest(".audio-clip");if(!b)return;e.preventDefault();const a=audioTimelineState(),scale=32,mode=e.target.dataset.handle||"move",x=e.clientX,start=Number(a.offset||0),ss=Number(a.start||0),ee=a.end==null?null:Number(a.end);b.setPointerCapture(e.pointerId);const move=q=>{const dx=(q.clientX-x)/scale;if(mode==="left"){a.start=Math.max(0,Math.min(ss+dx,(ee==null?(musicFile.duration||999999)-.1:ee-.1)));}else if(mode==="right"){const base=ee==null?Math.max(ss+.1,(musicFile.duration||ss+1)):ee;a.end=Math.max(ss+.1,base+dx);if(musicFile.duration)a.end=Math.min(musicFile.duration,a.end)}else{a.offset=Math.max(0,start+dx)};renderAudioTrimBlock()};const up=()=>{b.removeEventListener("pointermove",move);b.removeEventListener("pointerup",up);applyAudioTimeline()};b.addEventListener("pointermove",move);b.addEventListener("pointerup",up)})}
function audioTrimLabel(){const a=audioTimelineState();return Number(a.start||0).toFixed(1)+"–"+(a.end==null?"end":Number(a.end).toFixed(1))+"s"}
function renderAudioTrimBlock(){const el=document.getElementById("audioTrack");if(!el||typeof musicFile==="undefined"||!musicFile)return;const old=el.querySelector(".audio-clip");if(old)old.remove();const a=audioTimelineState(),scale=32,base=Math.max(.1,(a.end==null?Math.max(1,(musicFile.duration||10)):Number(a.end)-Number(a.start||0))),clip=document.createElement("div");clip.className="audio-clip";clip.style.cssText="position:absolute;left:"+(Number(a.offset||0)*scale)+"px;top:1px;height:22px;width:"+Math.max(120,base*scale)+"px;border:1px solid #596274;border-radius:5px;background:#252c39;cursor:grab;z-index:3;overflow:visible;box-sizing:border-box";const mk=(side)=>{const h=document.createElement("i");h.dataset.handle=side;h.style.cssText="position:absolute;"+(side==="left"?"left:-4px":"right:-4px")+";top:-1px;width:8px;height:24px;border:1px solid #dce2ef;border-radius:3px;background:#596274;cursor:ew-resize;z-index:4";return h};const lab=document.createElement("span");lab.className="audio-clip-label";lab.textContent="🎵 "+musicFile.name+" • "+Number(a.start||0).toFixed(1)+"–"+(a.end==null?"end":Number(a.end).toFixed(1))+"s";lab.style.cssText="position:absolute;left:7px;top:3px;font-size:9px;color:#e9edf5;white-space:nowrap;pointer-events:none";clip.appendChild(mk("left"));clip.appendChild(lab);clip.appendChild(mk("right"));el.appendChild(clip)}

function applyAudioTimeline(){const a=audioTimelineState(),d=Number(a.end??999999);if(typeof musicFile!=="undefined"&&musicFile){const label=document.querySelector("#audioTrack .audio-clip-label");if(label)label.textContent="🎵 "+musicFile.name+" • "+Number(a.start||0).toFixed(1)+"s–"+(d===999999?"end":d.toFixed(1)+"s")+" • offset "+Number(a.offset||0).toFixed(1)+"s"}renderOverlayTracks();renderAudioWaveform()}
function audioBeatMarkers(){const a=audioTimelineState();if(!Array.isArray(a.beats))a.beats=[];return a.beats}
async function speechToTextCaptions(){
 if(!files.length){msg("आधी video जोडा.",true);return}
 const f=files[currentIndex]||files[0];
 if(!f||!f.type.startsWith("video/")){msg("Video clip निवडा.",true);return}
 const SR=window.SpeechRecognition||window.webkitSpeechRecognition;
 if(!SR){msg("या browser मध्ये Speech Recognition उपलब्ध नाही.",true);return}
 const rec=new SR();rec.lang=(navigator.language||"mr-IN");rec.continuous=true;rec.interimResults=false;
 const start=Number((clipSettings[currentIndex]||{}).trimStart||0),cEnd=Number((clipSettings[currentIndex]||{}).trimEnd||0);
 const base=Number.isFinite(cEnd)&&cEnd>start?cEnd:(f.duration||30),captions=captionState();let heard=0;
 rec.onresult=e=>{for(let i=e.resultIndex;i<e.results.length;i++){const r=e.results[i];if(!r.isFinal)continue;const text=r[0].transcript.trim();if(!text)continue;const now=typeof video!=="undefined"?Number(video.currentTime||0):start;const st=Math.max(start,now-.1);captions.push({text,start:st,end:Math.min(base,st+Math.max(1.5,Math.min(4,text.length/12)))});heard++}captions.sort((a,b)=>a.start-b.start);renderCaptions();renderOverlayTracks()};
 rec.onerror=e=>msg("Speech recognition: "+e.error,true);
 rec.onend=()=>{renderCaptions();msg("📝 Speech captions तयार ✓ "+heard+" lines")};
 try{rec.start();msg("🎤 बोलणे ऐकत आहे… Video Play करून बोला/चालवा.")}catch(e){msg("Speech recognition सुरू झाले नाही.",true)}
}
function openCaptionEditor(){tools.innerHTML='<b>📝 Captions</b><button id="speechCaptions">🎤 Speech → Captions</button><button id="autoCaptionVideo">🎬 Auto Caption Video</button><button id="clearCaptions">🗑️ Clear Captions</button><button id="autoCaptionDraft">✨ Auto Caption Track</button><button id="addCaptionPrompt">＋ Add Caption</button><button id="splitCaption">✂️ Split at Playhead</button><label>Style <select id="capSize"><option value="24">Small</option><option value="34" selected>Medium</option><option value="46">Large</option></select></label><small>Browser-only draft caption track; speech-to-text can be connected later.</small>';document.getElementById("speechCaptions").onclick=speechToTextCaptions;document.getElementById("autoCaptionVideo").onclick=autoCaptionFromCurrentVideo;document.getElementById("clearCaptions").onclick=clearAllCaptions;document.getElementById("autoCaptionDraft").onclick=autoCaptionDraft;document.getElementById("addCaptionPrompt").onclick=addCaptionFromPrompt;document.getElementById("splitCaption").onclick=splitCaptionAtPlayhead;document.getElementById("capSize").onchange=e=>{const c=typeof settings==="function"?settings():{};c.captionStyle=c.captionStyle||{};c.captionStyle.size=Number(e.target.value);renderCaptions()}}
function captionState(){const c=typeof settings==="function"?settings():{};if(!Array.isArray(c.captions))c.captions=[];return c.captions}
function addCaption(text,start,end){const a=captionState();a.push({text:String(text||""),start:Number(start||0),end:Number(end||Number(start||0)+2)});a.sort((x,y)=>x.start-y.start);renderCaptions();renderOverlayTracks()}
function renderCaptions(){const root=document.getElementById("overlay");if(!root)return;root.querySelectorAll(".ak-caption").forEach(x=>x.remove());const c=typeof settings==="function"?settings():{},now=typeof video!=="undefined"?Number(video.currentTime||0):0;captionState().forEach((x,i)=>{if(now<x.start||now>=x.end)return;const e=document.createElement("div");e.className="ak-caption";e.textContent=x.text;e.style.cssText="position:absolute;left:8%;right:8%;bottom:9%;text-align:center;font-size:"+(c.captionStyle?.size||34)+"px;font-family:"+(c.captionStyle?.font||"Arial")+";color:"+(c.captionStyle?.color||"#fff")+";text-shadow:2px 2px 4px #000,-2px -2px 4px #000;font-weight:700;z-index:50;pointer-events:none";root.appendChild(e)})}
function autoCaptionDraft(){if(!files.length&&typeof musicFile==="undefined"){msg("आधी video/audio जोडा.",true);return}const a=captionState();if(a.length){renderCaptions();msg("Captions आधीच आहेत ✓");return}const dur=typeof video!=="undefined"&&video.duration?video.duration:Math.max(5,Number(photoDuration||3));addCaption("🎤 Auto Caption — Edit this text",0,Math.min(3,dur));msg("📝 Caption track तयार ✓")}
function addCaptionFromPrompt(){const t=prompt("Caption text लिहा");if(!t)return;const now=typeof video!=="undefined"?Number(video.currentTime||0):0;addCaption(t,now,now+3)}
function bindVideoTrackTrim(){const root=document.getElementById("overlayTracks");if(!root||root.dataset.trimBound)return;root.dataset.trimBound="1";root.addEventListener("pointerdown",e=>{const clip=e.target.closest(".mt-video-clip");if(!clip)return;const i=Number(clip.dataset.index),f=files[i],c=clipSettings[i]||(clipSettings[i]={}),rect=clip.getBoundingClientRect(),left=Math.abs(e.clientX-rect.left),right=Math.abs(rect.right-e.clientX);if(left>12&&right>12)return;const side=left<=right?"left":"right",startX=e.clientX,oldStart=Number(c.trimStart||0),oldEnd=Number(c.trimEnd??(f.duration||photoDuration||3));clip.setPointerCapture(e.pointerId);const move=q=>{const dx=(q.clientX-startX)/28;if(side==="left")c.trimStart=Math.max(0,Math.min(oldStart+dx,oldEnd-.2));else c.trimEnd=Math.max(oldStart+.2,Math.min(oldEnd+dx,f.duration||oldEnd+999));clip.style.width=Math.max(90,(Number(c.trimEnd)-Number(c.trimStart))*28)+"px";clip.textContent=(f.type.startsWith("image/")?"🖼️ ":"🎬 ")+(i+1)+" • "+(Number(c.trimEnd)-Number(c.trimStart)).toFixed(1)+"s"};const up=()=>{clip.removeEventListener("pointermove",move);clip.removeEventListener("pointerup",up);renderOverlayTracks();renderTransitionTracks();msg("✂️ Track trim लागू ✓")};clip.addEventListener("pointermove",move);clip.addEventListener("pointerup",up)})}
function bindIndependentVideoTracks(){const root=document.getElementById("overlayTracks");if(!root||root.dataset.videoDragBound)return;root.dataset.videoDragBound="1";const render=()=>{setupMultiTrackRows();["VIDEO 1","VIDEO 2"].forEach((label,rowIndex)=>{const row=root.querySelector('[data-track="'+label+'"]');if(!row)return;const lane=row.children[1];lane.innerHTML="";lane.style.position="relative";lane.style.minHeight="32px";lane.style.overflowX="auto";files.forEach((f,i)=>{const c=clipSettings[i]||{};const st=typeof settings==="function"&&i===currentIndex?settings():c;const dur=f.type.startsWith("image/")?Number(c.duration||photoDuration||3):Math.max(.2,Number(c.trimEnd??(f.duration||3))-Number(c.trimStart||0));const el=document.createElement("div");el.className="mt-video-clip";el.dataset.index=i;el.dataset.track=rowIndex+1;el.textContent=(f.type.startsWith("image/")?"🖼️ ":"🎬 ")+(i+1)+" • "+dur.toFixed(1)+"s";el.style.cssText="display:inline-flex;align-items:center;min-width:"+Math.max(90,dur*28)+"px;height:27px;margin:2px;border:1px solid #596274;border-radius:5px;background:#252c39;color:#e9edf5;font-size:10px;padding:0 7px;box-sizing:border-box;cursor:grab;touch-action:none";if(i===currentIndex)el.style.outline="2px solid #7c5cff";el.onpointerdown=e=>{if(e.button!==0)return;currentIndex=i;renderOverlayTracks();render();let startX=e.clientX,startPos=i;el.setPointerCapture(e.pointerId);const move=q=>{const dx=q.clientX-startX;if(Math.abs(dx)>28){const dir=dx>0?1:-1,to=Math.max(0,Math.min(files.length-1,startPos+dir));if(to!==startPos){const f0=files[startPos],c0=clipSettings[startPos];files[startPos]=files[to];files[to]=f0;clipSettings[startPos]=clipSettings[to];clipSettings[to]=c0;currentIndex=to;startPos=to;startX=q.clientX;render()}}};const up=()=>{el.removeEventListener("pointermove",move);el.removeEventListener("pointerup",up);renderOverlayTracks();renderTransitionTracks();msg("🎞️ Clip position बदलली ✓")};el.addEventListener("pointermove",move);el.addEventListener("pointerup",up)};lane.appendChild(el)})})};render();root.addEventListener("dblclick",e=>{const x=e.target.closest(".mt-video-clip");if(!x)return;currentIndex=Number(x.dataset.index);openAction("trim")});}
function realPIPState(){const st=settings();st.pipLayers=Array.isArray(st.pipLayers)?st.pipLayers:[];return st.pipLayers}
function addPIPLayer(){if(!files.length){msg("आधी video/photo जोडा.",true);return}const i=currentIndex;const layer={id:"pip_"+Date.now(),fileIndex:i,start:0,end:clipDuration(i)||5,x:.68,y:.68,w:.28,h:.28,opacity:1,rotation:0,z:realPIPState().length+1};realPIPState().push(layer);renderPIPLayers();msg("PIP overlay जोडला ✓")}
function removePIPLayer(id){const a=realPIPState(),i=a.findIndex(x=>x.id===id);if(i>=0){a.splice(i,1);renderPIPLayers();renderOverlayTracks()}}
function renderPIPLayers(){const box=document.getElementById("overlay");if(!box)return;box.querySelectorAll(".ak-pip-layer").forEach(e=>e.remove());realPIPState().forEach(layer=>{const f=files[layer.fileIndex];if(!f)return;const el=document.createElement(f.type.startsWith("video/")?"video":"img");el.className="ak-pip-layer";el.dataset.pipId=layer.id;el.src=URL.createObjectURL(f);if(el.tagName==="VIDEO"){el.muted=true;el.playsInline=true;el.loop=true;el.autoplay=true}el.style.cssText="position:absolute;left:"+(layer.x*100)+"%;top:"+(layer.y*100)+"%;width:"+(layer.w*100)+"%;height:"+(layer.h*100)+"%;opacity:"+layer.opacity+";transform:translate(-50%,-50%) rotate("+layer.rotation+"deg);z-index:"+(100+layer.z)+";object-fit:contain;border:1px solid rgba(255,255,255,.25);touch-action:none";el.addEventListener("pointerdown",e=>{e.preventDefault();const r=box.getBoundingClientRect(),sx=e.clientX,sy=e.clientY,ox=layer.x,oy=layer.y;el.setPointerCapture(e.pointerId);const move=q=>{layer.x=Math.max(.05,Math.min(.95,ox+(q.clientX-sx)/r.width));layer.y=Math.max(.05,Math.min(.95,oy+(q.clientY-sy)/r.height));el.style.left=(layer.x*100)+"%";el.style.top=(layer.y*100)+"%"};const up=()=>{el.removeEventListener("pointermove",move);el.removeEventListener("pointerup",up);renderOverlayTracks()};el.addEventListener("pointermove",move);el.addEventListener("pointerup",up)});el.addEventListener("dblclick",()=>removePIPLayer(layer.id));box.appendChild(el)})}
function setupRealPIPControls(){const b=document.getElementById("overlay");if(!b)return;if(!document.getElementById("akPipAdd")){const c=document.createElement("button");c.id="akPipAdd";c.textContent="➕ PIP";c.title="Add independent picture-in-picture layer";c.onclick=addPIPLayer;document.querySelector(".editor-shell")?.prepend(c)}renderPIPLayers()}

function setupMultiTrackRows(){const root=document.getElementById("overlayTracks");if(!root)return;["VIDEO 1","VIDEO 2","TEXT","STICKER","AUDIO","CAPTION","EFFECT"].forEach(label=>{if(root.querySelector('[data-track="'+label+'"]'))return;const r=document.createElement("div");r.className="track-row";r.dataset.track=label;r.innerHTML="<b>"+label+"</b><div style=\"position:relative;min-height:28px;background:#151923\"></div>";root.appendChild(r)})}
function splitCaptionAtPlayhead(){const now=typeof video!=="undefined"?Number(video.currentTime||0):0;const a=captionState();const x=a.find(x=>now>x.start&&now<x.end);if(!x)return;const old=x.end;x.end=now;a.push({text:x.text,start:now,end:old});a.sort((p,q)=>p.start-q.start);renderCaptions();msg("Caption split ✓")}
function curveSpeed(cs,current,start,end){
 const c=cs||{};
 const preset=typeof c.speedCurvePreset==="string"?c.speedCurvePreset:(typeof c.speedCurve==="string"?c.speedCurve:"normal");
 const t=Math.max(0,Math.min(1,(Number(current)-Number(start||0))/Math.max(.001,Number(end||1)-Number(start||0))));
 const presets={normal:[1,1,1,1,1],montage:[1,1.5,.7,1.5,1],bullet:[1,2,2,2,1],jump:[.6,1.8,.8,2,.7],hero:[.5,.7,1,1.5,2],flash:[1,3,.5,3,1],smooth:[.8,1,1.2,1,.8]};
 let pts=Array.isArray(c.speedCurve)&&c.speedCurve.every(x=>typeof x==="number")?c.speedCurve:presets[preset]||presets.normal;
 if(pts.length<2)pts=presets.normal;
 const pos=t*(pts.length-1),i=Math.min(pts.length-2,Math.floor(pos)),f=pos-i;
 const a=Math.max(.1,Number(pts[i])||1),b=Math.max(.1,Number(pts[i+1])||1);
 return a+(b-a)*(f*f*(3-2*f));
}
function applySpeedCurvePreview(){
 if(typeof video==="undefined"||!video.src)return;
 const cs=(typeof clipSettings!=="undefined"&&clipSettings[currentIndex])||settings();
 const rate=curveSpeed(cs,video.currentTime||0,Number(cs.trimStart||0),Number(cs.trimEnd||video.duration||1));
 try{video.playbackRate=rate;video.preservesPitch=true}catch(e){}
 const v=document.getElementById("speedVal");if(v)v.textContent=rate.toFixed(2)+"×";
}
function bindSpeedCurvePreview(){
 if(typeof video==="undefined"||video.dataset.speedCurveBound)return;
 video.dataset.speedCurveBound="1";
 video.addEventListener("timeupdate",applySpeedCurvePreview);
 video.addEventListener("play",applySpeedCurvePreview);
}
function advancedEditorPack(){bindSpeedCurvePreview();
 const c=typeof settings==="function"?settings():{};
 c.speedCurve=c.speedCurve||[{t:0,v:1},{t:.25,v:1},{t:.5,v:1},{t:.75,v:1},{t:1,v:1}];
 c.textAnimPresets=c.textAnimPresets||["fade","pop","zoom","slideUp","bounce","spin"];
 c.effectsPack=c.effectsPack||["none","fade","flash","shake","glitch","blur","zoom","vignette","cinematic"];
 c.templatePresets=c.templatePresets||["Reel Beat","Cinematic","Vlog","Photo Story","Birthday","Status","Travel"];
 c.exportProfile=c.exportProfile||{format:"webm",fps:30,quality:"high"};
 msg("⚙️ Advanced editor pack तयार ✓");
}
function addProfessionalEffect(type){
 const c=typeof settings==="function"?settings():{};
 c.effect=type;
 const map={flash:"brightness(1.35)",blur:"blur(2px)",vignette:"contrast(1.05) brightness(.92)",cinematic:"contrast(1.12) saturate(1.08)",glitch:"contrast(1.18) saturate(1.25)",shake:"none"};
 const v=map[type]||"none";
 if(typeof video!=="undefined"&&video.style)video.style.filter=v;
 msg("✨ "+type+" effect लागू ✓");
}
function applyTemplatePreset(name){
 const c=typeof settings==="function"?settings():{};
 c.template=name;
 if(name==="Reel Beat"){c.aspect="9:16";c.photoDuration=1.2}
 else if(name==="Cinematic"){c.aspect="16:9";c.photoDuration=3}
 else if(name==="Vlog"){c.aspect="16:9";c.photoDuration=2.5}
 else if(name==="Photo Story"){c.aspect="9:16";c.photoDuration=2}
 else {c.aspect="9:16";c.photoDuration=1.8}
 msg("🎬 Template: "+name+" ✓");
}
function setSpeedCurvePreset(name){
 const c=typeof settings==="function"?settings():{};
 const p={normal:[1,1,1,1,1],montage:[1,1.5,.7,1.5,1],hero:[.5,.7,1,1.5,2],bullet:[1,2,2,2,1],jump:[.6,1.8,.8,2,.7],flash:[1,3,.5,3,1],smooth:[.8,1,1.2,1,.8]};
 c.speedCurvePreset=name;c.speedCurve=p[name]||p.normal;msg("⏩ Speed Curve: "+name+" ✓");
}
function prepareCaptionLayer(){
 const c=typeof settings==="function"?settings():{};
 c.captionStyle=c.captionStyle||{font:"Arial",size:34,color:"#ffffff",stroke:"#000000",shadow:true,position:"bottom"};
 msg("📝 Caption style तयार ✓");
}
function applyBeatCut(){if(!Array.isArray(files)||files.length<2){msg("किमान 2 media clips जोडा.",true);return}const a=audioTimelineState(),beats=audioBeatMarkers().filter(t=>t>=Number(a.start||0)&&(a.end==null||t<=Number(a.end)));if(beats.length<2){msg("आधी Auto Beat Detect करा.",true);return}const cutTimes=beats.map(t=>t-Number(a.start||0)+Number(a.offset||0)).filter(t=>t>0);let n=0;files.forEach((f,i)=>{if(i>=cutTimes.length)return;const cc=clipSettings[i]||(clipSettings[i]={});const dur=Number(cutTimes[i]-(i?cutTimes[i-1]:0));if(f.type&&f.type.startsWith("image/"))cc.duration=Math.max(.25,dur);else{cc.trimStart=Number(cc.trimStart||0);cc.trimEnd=Math.max(cc.trimStart+.2,cc.trimStart+dur)}n++});renderOverlayTracks();renderTransitionTracks();msg("✂️ Beat Cut लागू ✓ "+n+" clips");}
function beatSyncEffects(){if(!Array.isArray(files)||files.length<2){msg("किमान 2 media clips जोडा.",true);return}const beats=audioBeatMarkers();if(!beats.length){msg("आधी Auto Beat Detect करा.",true)}const a=audioTimelineState(),bs=beats.filter(t=>t>=Number(a.start||0)&&(a.end==null||t<=Number(a.end)));if(!bs.length)return;const targets=files.map((_,i)=>bs[i%bs.length]);let applied=0;files.forEach((f,i)=>{if(i===files.length-1)return;const cc=clipSettings[i]||(clipSettings[i]={}),t=targets[i];cc.transition={type:["fade","zoom","slide","glitch"][i%4],duration:.18};cc.speedCurve=cc.speedCurve||"smooth";const k0={clip:i,time:Number(cc.trimStart||0),zoom:1,rotation:0,opacity:1,x:0,y:0},k1={clip:i,time:Number(cc.trimEnd??(f.type.startsWith("image/")?Number(cc.duration||photoDuration||3):Number(video.duration||3))),zoom:i%2?1.08:1.18,rotation:i%3===0?1:0,opacity:1,x:i%2?1:-1,y:0};keyframes=Array.isArray(keyframes)?keyframes:keyframes||[];keyframes=keyframes.filter(k=>k.clip!==i);keyframes.push(k0,k1);applied++});renderTransitionTracks();renderKeyframeTracks();msg("🎬 Beat Effects लागू ✓ "+applied+" clips");}
function autoBeatSync(){if(!Array.isArray(files)||!files.length){msg("आधी Photo/Video जोडा.",true);return}const a=audioTimelineState(),beats=audioBeatMarkers();if(!beats.length){msg("आधी Auto Beat Detect करा.",true);return}const total=files.length;const usable=beats.filter(t=>Number(t)>=Number(a.start||0)&&Number(t)<=(a.end==null?Infinity:Number(a.end)));if(!usable.length){msg("या audio range मध्ये beat नाही.",true);return}const c=settings();const base=usable.slice(0,Math.max(1,total+1));let changed=0;files.forEach((f,i)=>{if(!clipSettings[i])clipSettings[i]={};const cc=clipSettings[i];const st=(i===currentIndex&&typeof settings==="function")?settings():cc;const start=i===0?0:(base[Math.min(i,base.length-1)]||0);const next=base[i+1];if(f.type&&f.type.startsWith("image/")){cc.duration=Math.max(.25,(next!=null?next-start:(base[base.length-1]-start)||Number(photoDuration||3)));changed++}else if(Number.isFinite(next)&&next>start){cc.trimStart=0;cc.trimEnd=next-start;changed++}});renderOverlayTracks();renderTransitionTracks();msg("⚡ Beat Sync लागू ✓ "+changed+" clips");}
async function detectAudioBeats(){if(typeof musicFile==="undefined"||!musicFile){msg("आधी Audio जोडा.",true);return}try{const C=window.AudioContext||window.webkitAudioContext;if(!C)return;msg("Audio beats शोधत आहे…");const ctx=new C(),buf=await ctx.decodeAudioData(await musicFile.arrayBuffer()),data=buf.getChannelData(0),rate=buf.sampleRate,win=Math.floor(rate*.05),hop=Math.floor(rate*.025),energy=[];for(let i=0;i+win<data.length;i+=hop){let sum=0;for(let j=0;j<win;j+=8){const v=data[i+j]||0;sum+=v*v}energy.push(Math.sqrt(sum/Math.max(1,Math.floor(win/8))))}const beats=[],avg=energy.reduce((a,b)=>a+b,0)/Math.max(1,energy.length);for(let i=2;i<energy.length-2;i++){const e=energy[i],thr=avg*1.45;if(e>thr&&e>=energy[i-1]&&e>=energy[i+1]){const t=i*hop/rate;if(!beats.length||t-beats[beats.length-1]>.28)beats.push(t)}}const a=audioTimelineState();a.beats=beats.slice(0,300);try{ctx.close()}catch(e){}renderAudioBeats();msg(beats.length+" beat markers सापडले ✓")}catch(e){console.warn(e);msg("Beat detection failed",true)}}
function addAudioBeat(){if(typeof video==="undefined")return;const a=audioTimelineState(),t=Math.max(0,Number(video.currentTime||0)-Number(a.offset||0)+Number(a.start||0));if(!a.beats.some(x=>Math.abs(x-t)<.08))a.beats.push(t);a.beats.sort((x,y)=>x-y);renderAudioBeats();msg("Beat marker added ✓")}
function renderAudioBeats(){const el=document.getElementById("audioTrack");if(!el)return;el.querySelectorAll(".audio-beat").forEach(x=>x.remove());const a=audioTimelineState(),beats=audioBeatMarkers(),scale=32;beats.forEach((t,i)=>{const b=document.createElement("i");b.className="audio-beat";b.title="Beat "+(i+1)+" • "+t.toFixed(2)+"s";b.style.cssText="position:absolute;left:"+((Number(a.offset||0)+t-Number(a.start||0))*scale)+"px;top:-2px;width:2px;height:30px;background:#fff;z-index:8;pointer-events:none";el.appendChild(b)})}
function openAudioClipTools(){if(typeof musicFile==="undefined"||!musicFile){msg("आधी Audio जोडा.",true);return}const c=typeof settings==="function"?settings():{},a=audioTimelineState();tools.innerHTML='<b>🎵 Audio Clip</b><button id="addAudioBeat">🚩 Add Beat</button><button id="detectAudioBeats">⚡ Auto Beat Detect</button><button id="autoBeatSync">🎬 Auto Beat Sync</button><button id="beatSyncEffects">✨ Beat Effects + Transitions</button><button id="applyBeatCut">✂️ Beat Cut</button><label>Start <input id="acStart" type="number" min="0" step=".1" value="'+Number(a.start||0)+'"> sec</label><label>End <input id="acEnd" type="number" min="0" step=".1" value="'+(a.end==null?"":Number(a.end).toFixed(1))+'" placeholder="Audio end"></label><label>Position <input id="acOffset" type="number" min="0" step=".1" value="'+Number(a.offset||0)+'"> sec</label><label>Volume <input id="acVol" type="range" min="0" max="1" step=".01" value="'+Number(c.audioVolume??.7)+'"><span id="acVolVal">'+Math.round(Number(c.audioVolume??.7)*100)+'%</span></label><label>Fade In <input id="acIn" type="range" min="0" max="5" step=".1" value="'+Number(c.audioFadeIn??0)+'"><span id="acInVal">'+Number(c.audioFadeIn??0).toFixed(1)+'s</span></label><label>Fade Out <input id="acOut" type="range" min="0" max="5" step=".1" value="'+Number(c.audioFadeOut??0)+'"><span id="acOutVal">'+Number(c.audioFadeOut??0).toFixed(1)+'s</span></label><button id="acReset">Reset Audio</button><div class="hint">Start/End = audio trim • Position = timeline offset</div>'}
async function buildRealAudioWaveform(){if(typeof musicFile==="undefined"||!musicFile)return;try{const C=window.AudioContext||window.webkitAudioContext;if(!C)return;const ctx=new C(),buf=await ctx.decodeAudioData(await musicFile.arrayBuffer()),data=buf.getChannelData(0),bars=120,step=Math.max(1,Math.floor(data.length/bars)),vals=[];for(let i=0;i<bars;i++){let peak=0;for(let j=i*step;j<Math.min(data.length,(i+1)*step);j+=Math.max(1,Math.floor(step/32)))peak=Math.max(peak,Math.abs(data[j]));vals.push(peak)}try{ctx.close()}catch(e){}const el=document.getElementById("audioTrack");if(!el)return;let w=el.querySelector(".audio-wave");if(!w){w=document.createElement("div");w.className="audio-wave";el.appendChild(w)}w.innerHTML="";w.style.cssText="position:absolute;left:0;right:0;top:2px;height:20px;display:flex;align-items:center;gap:1px;overflow:hidden;pointer-events:none;z-index:2";vals.forEach(v=>{const b=document.createElement("i");b.style.cssText="display:block;flex:1;min-width:2px;height:"+Math.max(2,Math.round(20*v))+"px;border-radius:2px;background:#6f7788";w.appendChild(b)});renderAudioTrimBlock()}catch(e){console.warn("Waveform decode failed",e)}}
function renderAudioWaveform(){const el=document.getElementById("audioTrack");if(!el||typeof musicFile==="undefined"||!musicFile)return;const old=el.querySelector(".audio-wave");if(old)old.remove();const a=audioTimelineState();const clip=document.createElement("div");clip.className="audio-clip";clip.style.cssText="position:absolute;left:"+(Number(a.offset||0)*32)+"px;top:1px;height:22px;min-width:120px;border:1px solid #596274;border-radius:5px;background:#252c39;cursor:grab;z-index:3;overflow:hidden";const lab=document.createElement("span");lab.className="audio-clip-label";lab.textContent="🎵 "+musicFile.name+" • offset "+Number(a.offset||0).toFixed(1)+"s";lab.style.cssText="position:absolute;left:5px;top:3px;font-size:9px;color:#e9edf5;white-space:nowrap;pointer-events:none";clip.appendChild(lab);el.appendChild(clip);bindAudioTimelineDrag();renderAudioTrimBlock();
 const w=document.createElement("div");w.className="audio-wave";w.style.cssText="position:absolute;inset:2px 0;height:20px;display:flex;align-items:center;gap:1px;overflow:hidden;pointer-events:none";const bars=80;for(let i=0;i<bars;i++){const b=document.createElement("i");b.style.cssText="display:block;width:3px;min-width:3px;height:"+((20*(.2+.8*Math.abs(Math.sin(i*.73))))|0)+"px;border-radius:2px;background:#6f7788";w.appendChild(b)}el.appendChild(w)}
renderOverlayTracks();bindOverlayPreviewDrag();renderAudioWaveform();bindAudioTimelineDrag();buildRealAudioWaveform();
musicInfo.onclick=e=>{if(e.target.id==="removeMusic"){musicFile=null;musicInfo.innerHTML="";msg("Music काढले.")}};

function mimeType(){
 return ["video/mp4;codecs=avc1.42E01E,mp4a.40.2","video/mp4","video/webm;codecs=vp9,opus","video/webm;codecs=vp8,opus","video/webm"].find(x=>MediaRecorder.isTypeSupported(x))||"";
}
function extFor(m){return m.startsWith("video/mp4")?"mp4":"webm"}
window.transitionType="none";

let exportConfig={width:1280,height:720,fps:30,bitrate:6000000};
function multiTrackClipInfo(){const rows=document.querySelectorAll("#overlayTracks .track-row");rows.forEach((r,i)=>{r.dataset.trackIndex=i;r.style.minHeight="36px";const body=r.querySelector("div");if(body){body.style.minHeight="30px";body.style.position="relative";body.style.overflowX="auto"}});msg("🎚️ Multi-track layout सक्रिय ✓")}
function duplicateCurrentClipToTrack(){if(!files.length){msg("आधी media जोडा.",true);return}const i=currentIndex,f=files[i];files.push(f);const src=clipSettings[i]||{},copy=JSON.parse(JSON.stringify(src));clipSettings.push(copy);currentIndex=files.length-1;renderOverlayTracks();msg("➕ Clip duplicate करून नवीन track तयार ✓")}
function moveCurrentClipEarlier(){if(currentIndex<=0){msg("हा clip आधीच पहिला आहे.",true);return}const i=currentIndex;[files[i-1],files[i]]=[files[i],files[i-1]];[clipSettings[i-1],clipSettings[i]]=[clipSettings[i],clipSettings[i-1]];currentIndex=i-1;renderOverlayTracks();msg("↔️ Track clip order बदलला ✓")}
function bestRecorderOptions(profile){
 const p=profile||{},fps=Number(p.fps||30),q=p.quality||"high";
 const types=["video/mp4;codecs=avc1.42E01E,mp4a.40.2","video/mp4","video/webm;codecs=vp9,opus","video/webm;codecs=vp8,opus","video/webm"];
 let preferred="";
 if(p.format==="mp4")preferred=types.find(x=>x.startsWith("video/mp4")&&MediaRecorder.isTypeSupported(x))||"";
 if(!preferred)preferred=types.find(x=>MediaRecorder.isTypeSupported(x))||"";
 const bitrate=q==="low"?3500000:q==="medium"?5000000:8000000;
 return {mimeType:preferred||undefined,videoBitsPerSecond:bitrate,frameRate:fps};
}
function getExportProfile(){const c=typeof settings==="function"?settings():{};return c.exportProfile||{format:"auto",fps:30,quality:"high"}}
function createRecorder(stream){const p=getExportProfile(),o=bestRecorderOptions(p);try{return new MediaRecorder(stream,o)}catch(e){try{return new MediaRecorder(stream)}catch(x){throw x}}}
function exportProfileStatus(){const p=getExportProfile(),o=bestRecorderOptions(p);msg("📤 "+(o.mimeType||"browser default")+" • "+(p.fps||30)+"fps • "+(p.quality||"high"))}
function openExportSettings(){
 tools.innerHTML='<b>⚙️ Export Settings</b><label>Quality <select id="exQuality"><option value="720">720p</option><option value="1080" selected>1080p</option></select></label><label>FPS <select id="exFps"><option>24</option><option selected>30</option><option>60</option></select></label><label>Bitrate <select id="exBitrate"><option value="4000000">4 Mbps</option><option value="6000000" selected>6 Mbps</option><option value="10000000">10 Mbps</option></select></label><button id="applyExport">Apply</button><div class="hint">Browser supportनुसार MP4 किंवा WebM export होईल.</div>';
}
function keyframeExportState(clip,time){
 const list=keyframes.filter(k=>k.clip===clip).sort((a,b)=>a.time-b.time);if(!list.length)return null;
 let a=list[0],b=list[list.length-1];
 if(time<=a.time)b=a;else if(time>=b.time)a=b;else for(let j=0;j<list.length-1;j++)if(time>=list[j].time&&time<=list[j+1].time){a=list[j];b=list[j+1];break}
 const span=Math.max(.001,b.time-a.time),raw=a===b?0:Math.max(0,Math.min(1,(time-a.time)/span)),q=raw*raw*(3-2*raw),lerp=(x,y)=>Number(x??1)+(Number(y??x??1)-Number(x??1))*q;
 return {zoom:lerp(a.zoom,b.zoom),rotation:lerp(a.rotation,b.rotation),opacity:lerp(a.opacity,b.opacity),x:lerp(a.x,b.x),y:lerp(a.y,b.y)};
}
function drawKeyframedVideo(ctx,video,canvas,state){
 const k=state||{zoom:1,rotation:0,opacity:1};ctx.save();ctx.globalAlpha=Math.max(0,Math.min(1,k.opacity));ctx.translate(canvas.width/2+(Number(k.x||0)*canvas.width/100),canvas.height/2+(Number(k.y||0)*canvas.height/100));ctx.rotate(Number(k.rotation||0)*Math.PI/180);ctx.scale(Number(k.zoom||1),Number(k.zoom||1));ctx.drawImage(video,-canvas.width/2,-canvas.height/2,canvas.width,canvas.height);ctx.restore();
}
async function buildAudioExportStream(baseStream,duration){if(typeof musicFile==="undefined"||!musicFile)return baseStream;try{const C=window.AudioContext||window.webkitAudioContext;if(!C)return baseStream;const ctx=new C(),dest=ctx.createMediaStreamDestination(),au=new Audio();au.src=URL.createObjectURL(musicFile);au.preload="auto";await new Promise((res,rej)=>{au.oncanplay=res;au.onerror=rej});const src=ctx.createMediaElementSource(au),gain=ctx.createGain();src.connect(gain);gain.connect(dest);gain.connect(ctx.destination);const out=new MediaStream();baseStream.getVideoTracks().forEach(t=>out.addTrack(t));dest.stream.getAudioTracks().forEach(t=>out.addTrack(t));const a=audioTimelineState(),start=Number(a.start||0),offset=Number(a.offset||0),end=a.end==null?au.duration:Number(a.end),clipDur=Math.max(.05,end-start);au.currentTime=Math.min(start,Math.max(0,au.duration-.01));const tick=()=>{const elapsed=Math.max(0,performance.now()/1000-(window.__audioExportT||performance.now()/1000));const local=start+elapsed;gain.gain.value=audioEnvelope(local);if(local>=end||elapsed>=duration){au.pause();try{ctx.close()}catch(e){}}else requestAnimationFrame(tick)};window.__audioExportT=performance.now()/1000+offset;await ctx.resume();au.play();tick();return out}catch(e){console.warn("Audio export mix fallback",e);return baseStream}}
function setupAudioPreview(){if(typeof musicFile==="undefined"||!musicFile)return;const el=document.getElementById("audioPreview");if(!el)return;el.src=URL.createObjectURL(musicFile);el.style.display="none";el.onloadedmetadata=()=>{const a=audioTimelineState();if(a.end==null)a.end=el.duration;};el.ontimeupdate=()=>{const a=audioTimelineState(),t=el.currentTime;el.volume=audioEnvelope(t);if(t>=Number(a.end??Infinity)){el.pause();el.currentTime=Number(a.start||0)}}}
function syncTimelineAudio(){const aEl=document.getElementById("audioPreview");if(!aEl||typeof video==="undefined"||!video)return;const a=audioTimelineState(),pos=Number(a.offset||0),start=Number(a.start||0),end=a.end==null?Infinity:Number(a.end),vt=Number(video.currentTime||0),at=start+(vt-pos);if(at>=start&&at<end){if(Math.abs(aEl.currentTime-at)>.12)try{aEl.currentTime=Math.min(at,Math.max(0,aEl.duration-.01))}catch(e){}aEl.volume=audioEnvelope(at)}else{aEl.pause();aEl.volume=0}}
function bindTimelineAudioSync(){if(typeof video==="undefined"||video.dataset.audioSync)return;video.dataset.audioSync="1";["play","pause","seeking","seeked","timeupdate"].forEach(ev=>video.addEventListener(ev,()=>{const aEl=document.getElementById("audioPreview");if(ev==="play"){if(aEl) aEl.play().catch(()=>{})}else if(ev==="pause"&&aEl)aEl.pause();syncTimelineAudio()}));const tick=()=>{if(!video.paused)syncTimelineAudio();requestAnimationFrame(tick)};requestAnimationFrame(tick)}
function syncAudioPreview(){const el=document.getElementById("audioPreview");if(!el||typeof musicFile==="undefined"||!musicFile)return;const a=audioTimelineState(),target=Number(a.start||0)+Math.max(0,(typeof video!=="undefined"?video.currentTime:0)-Number(a.offset||0));if(target>=Number(a.start||0)&&target<Number(a.end??Infinity))el.currentTime=Math.min(target,Math.max(0,el.duration-.01));el.volume=audioEnvelope(el.currentTime)}
function audioEnvelope(t){const c=typeof settings==="function"?settings():{},a=audioTimelineState(),v=Math.max(0,Math.min(1,Number(c.audioVolume??.7)));const start=Number(a.start||0),end=a.end==null?Infinity:Number(a.end),fi=Math.max(0,Number(c.audioFadeIn||0)),fo=Math.max(0,Number(c.audioFadeOut||0));if(t<start||t>=end)return 0;let g=1;if(fi)g=Math.min(g,Math.max(0,(t-start)/fi));if(fo&&end<Infinity)g=Math.min(g,Math.max(0,(end-t)/fo));return v*g}
async function preparePIPExport(){const layers=realPIPState().slice().sort((a,b)=>(Number(a.z)||0)-(Number(b.z)||0)),prepared=[];for(const layer of layers){const f=files[layer.fileIndex];if(!f)continue;const url=URL.createObjectURL(f);const el=document.createElement(f.type&&f.type.startsWith("video/")?"video":"img");el.src=url;el.muted=true;el.playsInline=true;el.preload="auto";try{if(el.tagName==="VIDEO"){await new Promise((resolve,reject)=>{if(el.readyState>=1)return resolve();el.onloadedmetadata=resolve;el.onerror=reject});el.currentTime=0;await el.play().catch(()=>{})}else await new Promise((resolve,reject)=>{if(el.complete&&el.naturalWidth)return resolve();el.onload=resolve;el.onerror=reject})}catch(e){URL.revokeObjectURL(url);continue}prepared.push({layer,el,url})}return prepared}
function drawPIPLayersExport(ctx,canvas,layers,projectTime){if(!Array.isArray(layers)||!layers.length)return;const t=Number(projectTime||0);for(const p of layers){const l=p.layer,el=p.el,start=Math.max(0,Number(l.start||0)),end=l.end==null?Infinity:Math.max(start,Number(l.end));if(t<start||t>end)continue;if(el.tagName==="VIDEO"){if(!el.duration||!isFinite(el.duration)||el.readyState<2)continue;const local=Math.max(0,t-start),target=local%el.duration;if(Math.abs(el.currentTime-target)>.12){try{el.currentTime=target}catch(e){}}}const w=Math.max(.02,Math.min(1,Number(l.w)||.28))*canvas.width,h=Math.max(.02,Math.min(1,Number(l.h)||.28))*canvas.height,x=Math.max(0,Math.min(1,Number(l.x)||.5))*canvas.width,y=Math.max(0,Math.min(1,Number(l.y)||.5))*canvas.height,op=Math.max(0,Math.min(1,Number(l.opacity??1))),rot=Number(l.rotation||0)*Math.PI/180;let dw=w,dh=h;if(el.naturalWidth&&el.naturalHeight){const src=el.naturalWidth/el.naturalHeight,dst=w/h;if(src>dst)dh=w/src;else dw=h*src}ctx.save();ctx.globalAlpha=op;ctx.translate(x,y);ctx.rotate(rot);try{ctx.drawImage(el,-dw/2,-dh/2,dw,dh)}catch(e){}ctx.restore()}}
function cleanupPIPExport(layers){if(!Array.isArray(layers))return;for(const p of layers){try{if(p.el.tagName==="VIDEO"){p.el.pause();p.el.removeAttribute("src");p.el.load()}}catch(e){}try{URL.revokeObjectURL(p.url)}catch(e){}}}
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
    const imageStart=performance.now();await new Promise(r=>{const loop=()=>{window.photoPreviewTime=(performance.now()-imageStart)/1000;applyKeyframePreview(window.photoPreviewTime);if(performance.now()>=until)r();else requestAnimationFrame(loop)};loop()});
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
function addMotionPreset(type){if(!files.length){msg("आधी media जोडा");return}const c=settings(),f=files[currentIndex],image=f.type.startsWith("image/"),start=image?0:Number(c.trimStart||0),dur=image?Number(c.duration||photoDuration||5):Math.max(.2,Number(c.trimEnd??video.duration)-start),end=start+dur;keyframes.splice(0,keyframes.length,...keyframes.filter(k=>!(k.clip===currentIndex&&k.time>=start&&k.time<=end)));const add=(t,z,x,y,r)=>keyframes.push({clip:currentIndex,time:t,zoom:z,rotation:r||0,opacity:1,x:x||0,y:y||0});if(type==="zoom")add(start,1,0,0,0),add(end,1.35,0,0,0);if(type==="left")add(start,1.15,-12,0,0),add(end,1.15,12,0,0);if(type==="right")add(start,1.15,12,0,0),add(end,1.15,-12,0,0);if(type==="shake"){for(let i=0;i<=10;i++){const p=i/10;add(start+p*dur,1,Math.sin(i*2.7)*2,Math.cos(i*3.1)*2,Math.sin(i*3.8)*2)}}keyframes.sort((a,b)=>a.clip-b.clip||a.time-b.time);renderKeyframeTracks();applyKeyframePreview(image?Number(window.photoPreviewTime||0):video.currentTime);msg("Motion preset लागू ✓")}
function openAdvancedFeature(feature){
 if(!files.length){msg("आधी Photo / Video निवडा.",true);return}
 if(feature==="colorPro"){tools.innerHTML='<b>🎨 Pro Color / HSL</b><label>Hue <input id="proHue" type="range" min="-180" max="180" value="'+Number(settings().hue||0)+'"></label><label>Saturation <input id="proSat" type="range" min="0" max="2" step=".05" value="'+Number(settings().saturation||1)+'"></label><label>Lightness <input id="proLight" type="range" min=".3" max="2" step=".05" value="'+Number(settings().lightness||1)+'"></label><label>Temperature <input id="proTemp" type="range" min="-50" max="50" value="'+Number(settings().temperature||0)+'"></label><label>Blend <select id="proBlend"><option>normal</option><option>multiply</option><option>screen</option><option>overlay</option><option>soft-light</option><option>hard-light</option><option>difference</option></select></label>';return}
 if(feature==="audioPro"){tools.innerHTML='<b>🎵 Audio Pro</b><label>Volume <input id="proVol" type="range" min="0" max="1.5" step=".05" value="'+Number(video.volume||1)+'"></label><label>Fade In <input id="proFadeIn" type="range" min="0" max="10" step=".5" value="'+Number(musicFadeIn||0)+'"></label><label>Fade Out <input id="proFadeOut" type="range" min="0" max="10" step=".5" value="'+Number(musicFadeOut||0)+'"></label><button id="extractAudio">Extract/Use Current Video Audio</button><button id="voiceRecord">🎙️ Voice Preview</button><div class="hint">Browser-only audio cleanup मर्यादित आहे; exported AI noise reduction साठी dedicated processing engine लागेल.</div>';return}
 if(feature==="aiTools"){tools.innerHTML='<b>✨ AI / Smart Tools</b><button id="smartReframe">Auto Reframe</button><button id="smartCaption">Auto Captions</button><button id="smartBg">Background Remove (Chroma fallback)</button><button id="smartTTS">Text to Speech</button><button id="smartStabilize">Stabilize Preview</button><button data-motion="zoom">Dynamic Zoom</button><button data-motion="left">Pan Left</button><button data-motion="right">Pan Right</button><button data-motion="shake">Shake</button><div class="hint">True AI cutout, tracking, denoise आणि generative tools साठी server/model integration आवश्यक आहे.</div>';return}
 if(feature==="templatesPro"){tools.innerHTML='<b>🎬 Templates</b><button data-template-pro="cinematic">Cinematic</button><button data-template-pro="reel">Reel</button><button data-template-pro="vlog">Vlog</button><button data-template-pro="photo">Photo Story</button><button data-template-pro="beat">Beat Sync</button>';return}
 if(feature==="transformOverlay"){showOverlayTransformControls();return}
 if(feature==="stickers"){tools.innerHTML='<b>😀 Stickers</b><div class="sticker-grid"><button data-sticker="⭐">⭐</button><button data-sticker="❤️">❤️</button><button data-sticker="🔥">🔥</button><button data-sticker="✨">✨</button><button data-sticker="🎉">🎉</button><button data-sticker="👍">👍</button></div><label>Size <input id="stickerSize" type="range" min="30" max="180" value="70"></label><button id="clearSticker">Clear</button>';return}
 if(feature==="textanim"){tools.innerHTML='<b>🅰️ Text Animation</b><button data-textanim="none">None</button><button data-textanim="pop">Pop</button><button data-textanim="fade">Fade</button><button data-textanim="slide">Slide</button>';return}
 if(feature==="captions"){tools.innerHTML='<b>📝 Auto Captions</b><button id="captionStart">🎙️ Start Speech Captions</button><div class="hint">Browser speech recognition उपलब्ध असल्यास captions previewमध्ये दिसतील.</div>';return}
 if(feature==="chroma"){tools.innerHTML='<b>🟩 Chroma Key</b><label>Green removal strength <input id="chromaStrength" type="range" min="0" max="1" step=".05" value=".6"></label><div class="hint">Green-screen preview/export pipeline पुढील चरणात canvas keying वापरेल.</div>';return}
 if(feature==="mask"){tools.innerHTML='<b>🎭 Mask</b><button data-mask="circle">Circle</button><button data-mask="rect">Rectangle</button><button data-mask="none">None</button>';return}
}
function applyProColor(){
 const c=settings(),h=Number(c.hue||0),sat=Number(c.saturation||1),light=Number(c.lightness||1),temp=Number(c.temperature||0);
 c.hue=h;c.saturation=sat;c.lightness=light;c.temperature=temp;
 video.style.filter=(c.filter&&c.filter!=="none"?c.filter+" ":"")+"hue-rotate("+h+"deg) saturate("+sat+") brightness("+light+")";
 video.style.mixBlendMode=c.blendMode||"normal";
}
function addSmartTemplate(name){
 const c=settings();
 if(name==="cinematic"){c.filter="contrast(1.15) saturate(.9)";c.saturation=.9;c.lightness=.95;c.transition="fade";c.transitionDuration=.6}
 if(name==="reel"){c.saturation=1.2;c.lightness=1.05;c.transition="zoom";c.transitionDuration=.35}
 if(name==="vlog"){c.saturation=1.1;c.lightness=1.05;c.transition="slide";c.transitionDuration=.4}
 if(name==="photo"){c.saturation=1.08;c.lightness=1.03;c.transition="fade";c.transitionDuration=.5}
 if(name==="beat"){c.saturation=1.25;c.transition="flash";c.transitionDuration=.2}
 applyProColor();renderTransitionTracks();msg("Template preset लागू ✓");
}

document.querySelectorAll("[data-home-tool]").forEach(c=>c.addEventListener("click",()=>{openEditor();msg(c.textContent.trim()+" tool उघडला ✓")}));
function renderOverlayTracks(){setupMultiTrackRows();const rows=[["textTrack","TEXT"],["stickerTrack","STICKER"],["audioTrack","AUDIO"]];rows.forEach(([id,label])=>{const el=document.getElementById(id);if(!el)return;el.innerHTML="";el.style.position="relative";el.style.minHeight="28px";el.style.background="#151923";const clips=Array.isArray(files)?files:[];clips.forEach((f,i)=>{const c=(typeof clipSettings!=="undefined"&&clipSettings[i])||{};const st=(typeof settings==="function"&&i===currentIndex)?settings():c;let text="";if(id==="textTrack")text=st.text||c.text||"";if(id==="stickerTrack")text=st.sticker||c.sticker||"";if(id==="audioTrack")text=i===0&&typeof musicFile!=="undefined"&&musicFile?("🎵 "+musicFile.name):"";if(!text)return;const d=Number(c.duration||photoDuration||5),left=clips.slice(0,i).reduce((a,_,k)=>a+Math.max(.1,Number((clipSettings[k]||{}).duration||photoDuration||5)),0);const b=document.createElement("div");b.textContent=(id==="textTrack"?"T ":"")+(id==="stickerTrack"?"😀 ":"")+text;b.style.cssText="position:absolute;left:"+(left*32)+"px;width:"+Math.max(70,d*32)+"px;height:22px;line-height:22px;overflow:hidden;white-space:nowrap;padding:0 7px;border:1px solid #4c5568;border-radius:5px;background:#262d3a;color:#e9edf5;font-size:10px;box-sizing:border-box";el.appendChild(b)})})}
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
function act(a){
 if(!restoringHistory) pushHistory();
 if(!video.src && !currentImage){tools.innerHTML="<b>आधी Photo / Video निवडा.</b>";return}
  if(a==="keyframes"){tools.innerHTML="<b>Keyframe</b><button id=\"addKeyframe\">Add Keyframe</button><button id=\"clearKeyframes\">Clear Keyframes</button><div id=\"kfList\">Keyframes: "+keyframes.filter(k=>k.clip===currentIndex).length+"</div><div class=\"hint\">Timeline मधील ♦️ वर tap करून Zoom / Rotation / Opacity बदला.</div>";return;}
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
 if(a==="speed")tools.innerHTML='<b>⚡ Speed</b><button data-v=".5">0.5×</button><button data-v="1">1×</button><button data-v="1.5">1.5×</button><button data-v="2">2×</button><label>Custom <input id="speedCustom" type="range" min=".25" max="4" step=".05" value="'+settings().speed+'"></label><span id="speedVal">'+settings().speed+'×</span><hr><b>📈 Speed Curve</b><button data-curve="montage">Montage</button><button data-curve="bullet">Bullet</button><button data-curve="jump">Jump Cut</button><button data-curve="hero">Hero</button><button data-curve="flash">Flash</button><button data-curve="smooth">Smooth</button><button data-curve="none">Normal</button><button data-customcurve="1">⚙️ Custom</button><div class="hint">Videoच्या वेळेनुसार speed आपोआप बदलतो. Custom: 0.1×–4×.</div>';
 if(a==="transform")tools.innerHTML='<b>🎯 Transform</b><label>Zoom <input id="trZoom" type="range" min="1" max="3" step=".1" value="'+settings().zoom+'"></label><label>Rotation <input id="trRot" type="range" min="-180" max="180" value="'+settings().rotation+'"></label><label>Opacity <input id="trOpacity" type="range" min="0" max="1" step=".05" value="'+settings().opacity+'"></label><button id="mirrorBtn">🪞 Mirror</button>'; if(a==="adjust")tools.innerHTML='<b>🎨 Adjust</b><label>Brightness <input id="adjB" type="range" min=".3" max="2" step=".05" value="'+settings().brightness+'"></label><label>Contrast <input id="adjC" type="range" min=".3" max="2" step=".05" value="'+settings().contrast+'"></label><label>Saturation <input id="adjS" type="range" min="0" max="2" step=".05" value="'+settings().saturation+'"></label><label>Blur <input id="adjBlur" type="range" min="0" max="12" step=".5" value="'+settings().blur+'"></label>'; if(a==="zoom")tools.innerHTML='<b>🔍 Zoom</b><input id="zoom" type="range" min="1" max="2.5" step=".1" value="'+settings().zoom+'"><div class="hint">Preview मध्ये Zoom करा.</div>';
 if(a==="filter")tools.innerHTML='<button data-f="none">Original</button><button data-f="grayscale(1)">B&W</button><button data-f="sepia(1)">Sepia</button><button data-f="contrast(1.4) saturate(1.3)">Vivid</button>';
 if(a==="clipSettings")tools.innerHTML='<b>🎬 Clip Settings</b><label>Photo/Clip Duration <input id="clipDur" type="range" min="1" max="15" step=".5" value="'+settings().duration+'"></label><span id="clipDurVal">'+settings().duration+' sec</span><label>Transition <select id="clipTrans"><option value="none">None</option><option value="fade">Fade</option><option value="flash">Flash</option></select></label>';
 if(a==="photoDuration")tools.innerHTML='<b>🖼️ Photo Duration</b><input id="photoDur" type="range" min="1" max="15" step=".5" value="'+photoDuration+'"><span id="photoDurVal">'+photoDuration+' sec</span>';
 if(a==="musicFade")tools.innerHTML='<b>🎵 Music Fade</b><label>Fade In <input id="fadeIn" type="range" min="0" max="5" step=".5" value="'+musicFadeIn+'"></label><label>Fade Out <input id="fadeOut" type="range" min="0" max="5" step=".5" value="'+musicFadeOut+'"></label>';
 if(a==="volume")tools.innerHTML='<span>Video</span><input id="vol" type="range" min="0" max="1" step=".05" value="'+video.volume+'">';
 if(a==="clipSettings"){}
 if(a==="transition"){const tr=settings().transition||"none";const td=Number(settings().transitionDuration||0.45);tools.innerHTML='<b>🎞️ Transition</b><div class="sticker-grid"><button data-t="none">None</button><button data-t="fade">Fade</button><button data-t="flash">Flash</button><button data-t="zoom">Zoom</button><button data-t="slide">Slide</button><button data-t="wipe">Wipe</button><button data-t="spin">Spin</button><button data-t="blur">Blur</button></div><label>Duration <input id="trDuration" type="range" min="0.1" max="2" step="0.1" value="'+td+'"><span id="trDurationVal">'+td.toFixed(1)+'s</span></label><div class="hint">सध्याच्या clip च्या आधीचा transition. प्रत्येक clip साठी स्वतंत्र सेट करा.</div>';}
}

tools.onclick=e=>{
 var t=e.target; if(t.id==="applyExport"){exportConfig.width=$("#exQuality").value==="720"?720:1080;exportConfig.height=exportConfig.width===720?405:608;exportConfig.fps=+$("#exFps").value;exportConfig.bitrate=+$("#exBitrate").value;msg("Export settings लागू झाले ✓");} if(t.id==="addKeyframe"){const f=files[currentIndex],c=clipSettings[currentIndex]||{},isImage=f&&f.type.startsWith("image/"),time=isImage?Math.max(0,Math.min(Number(c.duration||photoDuration||5),Number(window.photoPreviewTime||0))):Math.max(Number(c.trimStart||0),Math.min(Number(c.trimEnd??video.duration),video.currentTime));const k={clip:currentIndex,time:time,zoom:settings().zoom,rotation:settings().rotation,opacity:settings().opacity};keyframes.push(k);keyframes.sort((a,b)=>a.clip-b.clip||a.time-b.time);selectedKeyframe=k;$("#kfList").textContent="Keyframes: "+keyframes.filter(k=>k.clip===currentIndex).length;renderKeyframeTracks();msg("Current Time वर Keyframe जोडला ✓")} if(t.id==="kfTime"&&selectedKeyframe){const f=files[selectedKeyframe.clip],c=clipSettings[selectedKeyframe.clip]||{},isImage=f&&f.type.startsWith("image/"),min=isImage?0:Number(c.trimStart||0),max=isImage?Number(c.duration||photoDuration||5):Math.max(min,Number(c.trimEnd??video.duration));selectedKeyframe.time=Math.max(min,Math.min(max,Number(t.value)||0));keyframes.sort((a,b)=>a.clip-b.clip||a.time-b.time);renderKeyframeTracks();if(selectedKeyframe.clip===currentIndex){if(isImage){window.photoPreviewTime=selectedKeyframe.time;applyKeyframePreview(selectedKeyframe.time)}else video.currentTime=selectedKeyframe.time}msg("Keyframe time updated ✓");return} if(["kfZoom","kfRotation","kfOpacity"].includes(t.id)&&selectedKeyframe){const v=Number(t.value);if(t.id==="kfZoom")selectedKeyframe.zoom=v;if(t.id==="kfRotation")selectedKeyframe.rotation=v;if(t.id==="kfOpacity")selectedKeyframe.opacity=v;applyKeyframePreview(selectedKeyframe.time);renderKeyframeTracks();return} if(t.id==="kfJump"&&selectedKeyframe){const tt=Number(selectedKeyframe.time||0),f=files[selectedKeyframe.clip];if(f&&f.type.startsWith("image/")){window.photoPreviewTime=tt;applyKeyframePreview(tt)}else if(selectedKeyframe.clip===currentIndex)video.currentTime=tt;msg("Keyframe वर Jump केले ✓");return} if(t.id==="kfDelete"&&selectedKeyframe){const n=keyframes.indexOf(selectedKeyframe);if(n>=0)keyframes.splice(n,1);selectedKeyframe=null;renderKeyframeTracks();act("keyframes");msg("Keyframe Delete ✓");return} if(t.id==="kfBack"){act("keyframes");return} if(t.id==="kfDuplicate"&&selectedKeyframe){const c=clipSettings[currentIndex]||{},isImage=files[currentIndex]&&files[currentIndex].type.startsWith("image/"),hi=isImage?Number(c.duration||photoDuration||5):Number(c.trimEnd??video.duration),copy={clip:selectedKeyframe.clip,time:Math.min(hi,Number(selectedKeyframe.time||0)+0.5),zoom:selectedKeyframe.zoom,rotation:selectedKeyframe.rotation,opacity:selectedKeyframe.opacity};if(copy.time<=selectedKeyframe.time)copy.time=Math.min(hi,Number(selectedKeyframe.time||0)+0.1);keyframes.push(copy);keyframes.sort((a,b)=>a.clip-b.clip||a.time-b.time);showKeyframeEditor(copy);renderKeyframeTracks();msg("Keyframe Duplicate ✓");return} if(t.dataset.sticker){settings().sticker=t.dataset.sticker;overlay.textContent=(overlay.textContent||"")+" "+t.dataset.sticker;renderOverlayTracks();msg("Sticker जोडला ✓")} if(t.dataset.textanim){settings().textAnimation=t.dataset.textanim;msg("Text animation: "+t.dataset.textanim+" ✓")} if(t.dataset.mask){settings().mask=t.dataset.mask;msg("Mask: "+t.dataset.mask+" ✓")} if(t.id==="clearSticker"){overlay.textContent="";msg("Sticker clear ✓")} if(t.id==="captionStart"){if(!("webkitSpeechRecognition" in window||"SpeechRecognition" in window)){msg("या browser मध्ये Speech Recognition उपलब्ध नाही.",true)}else{const R=window.SpeechRecognition||window.webkitSpeechRecognition,r=new R();r.lang="mr-IN";r.continuous=true;r.onresult=e=>{let x="";for(let i=e.resultIndex;i<e.results.length;i++)x+=e.results[i][0].transcript+" ";overlay.textContent=x.trim();settings().text=x.trim()};r.start();msg("Auto Caption सुरू ✓")}} if(t.id==="clearKeyframes"){for(let i=keyframes.length-1;i>=0;i--)if(keyframes[i].clip===currentIndex)keyframes.splice(i,1);$("#kfList").textContent="Keyframes: 0";msg("Keyframes clear ✓")}
 var t=e.target; if(t.id==="speedCustom"){settings().speed=+t.value;video.playbackRate=+t.value;$("#speedVal").textContent=t.value+"×"} if(t.id==="adjB"){settings().brightness=+t.value;applyVisualSettings()} if(t.id==="adjC"){settings().contrast=+t.value;applyVisualSettings()} if(t.id==="adjS"){settings().saturation=+t.value;applyVisualSettings()} if(t.id==="adjBlur"){settings().blur=+t.value;applyVisualSettings()}
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

exportConfig ={width:1280,height:720,fps:30,bitrate:6000000};
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
 const ctx=canvas.getContext("2d"),stream=canvas.captureStream(exportConfig.fps||30);const pipExportLayers=await preparePIPExport();let pipProjectTime=0;
 let audioCtx=null,dest=null,vs=null,musicEl=null;
 try{
   audioCtx=new(window.AudioContext||window.webkitAudioContext)();dest=audioCtx.createMediaStreamDestination();
   vs=audioCtx.createMediaElementSource(video);const vg=audioCtx.createGain();vg.gain.value=video.volume;vs.connect(vg).connect(dest);
   if(musicFile){musicEl=new Audio(URL.createObjectURL(musicFile));musicEl.loop=true;const ms=audioCtx.createMediaElementSource(musicEl);const mg=audioCtx.createGain();const baseVol=+($("#musicVol")?.value||.7);mg.gain.value=baseVol;ms.connect(mg).connect(dest);musicEl.onloadedmetadata=()=>{const d=musicEl.duration;const fi=Math.min(musicFadeIn,d/2);const fo=Math.min(musicFadeOut,d/2);mg.gain.cancelScheduledValues(audioCtx.currentTime);mg.gain.setValueAtTime(fi?0:baseVol,audioCtx.currentTime);if(fi)mg.gain.linearRampToValueAtTime(baseVol,audioCtx.currentTime+fi);if(fo&&isFinite(d)){mg.gain.setValueAtTime(baseVol,audioCtx.currentTime+Math.max(0,d-fo));mg.gain.linearRampToValueAtTime(0,audioCtx.currentTime+d)}}}
   dest.stream.getAudioTracks().forEach(t=>stream.addTrack(t));
 }catch(e){console.warn(e)}
 const recorderMime=(exportConfig.preferredMime&&MediaRecorder.isTypeSupported&&MediaRecorder.isTypeSupported(exportConfig.preferredMime))?exportConfig.preferredMime:mime; const rec=new MediaRecorder(stream,{mimeType:recorderMime,videoBitsPerSecond:exportConfig.bitrate}),chunks=[];
 rec.ondataavailable=e=>{if(e.data.size)chunks.push(e.data)};
 rec.onstop=()=>{
   const finalMime=recorderMime||mime;const blob=new Blob(chunks,{type:finalMime}),a=document.createElement("a");a.href=URL.createObjectURL(blob);a.download="AK-Video-"+Date.now()+"."+extFor(finalMime);a.click();
   if(audioCtx)audioCtx.close();if(musicEl){musicEl.pause();try{if(musicEl.src)URL.revokeObjectURL(musicEl.src)}catch(e){}}cleanupPIPExport(pipExportLayers);
   if(oldSrc){video.src=oldSrc;video.currentTime=oldTime} video.style.display=oldDisplay;msg("Multi-Clip Export पूर्ण झाले ✅");
 };
 if(audioCtx)await audioCtx.resume();if(musicEl)musicEl.play().catch(()=>{});
 rec.start(200);msg("Multi-Clip Export चालू आहे…");
 let first=true;
 for(let i=0;i<mediaFiles.length;i++){
   const f=mediaFiles[i],url=URL.createObjectURL(f);
   video.src=url;video.style.display="block";video.load();
   await new Promise((resolve,reject)=>{video.onloadedmetadata=resolve;video.onerror=reject});
   const cs=clipSettings[i]||settings();
   zoom=cs.zoom||1;video.style.filter=cs.filter||"none";overlay.textContent=cs.text||"";
   let startTime=0,endTime=video.duration;
   if(f.type.startsWith("image/")){
     const img=new Image();img.src=url;await new Promise((resolve,reject)=>{img.onload=resolve;img.onerror=reject});
     const until=performance.now()+(cs.duration||photoDuration)*1000;
     await new Promise(resolve=>{const drawPhoto=()=>{ctx.fillStyle="#000";ctx.fillRect(0,0,canvas.width,canvas.height);const src=img.width/img.height,dst=canvas.width/canvas.height;let dw=canvas.width,dh=canvas.height,dx=0,dy=0;if(src>dst){dh=canvas.height;dw=dh*src;dx=(canvas.width-dw)/2}else{dw=canvas.width;dh=dw/src;dy=(canvas.height-dh)/2}ctx.save();const pk=keyframeExportState(i,Math.max(0,(performance.now()-(until-(cs.duration||photoDuration)*1000))/1000));ctx.globalAlpha=Math.max(0,Math.min(1,Number(pk?.opacity??cs.opacity??1)));ctx.translate(canvas.width/2+(Number(pk?.x||cs.x||0)*canvas.width/100),canvas.height/2+(Number(pk?.y||cs.y||0)*canvas.height/100));ctx.rotate(Number(pk?.rotation||cs.rotation||0)*Math.PI/180);ctx.scale(Number(pk?.zoom||cs.zoom||1),Number(pk?.zoom||cs.zoom||1));const pm=cs.blendMode==="normal"||!cs.blendMode?"source-over":cs.blendMode;ctx.globalCompositeOperation=pm;ctx.drawImage(img,dx-canvas.width/2,dy-canvas.height/2,dw,dh);ctx.globalCompositeOperation="source-over";ctx.restore();if(overlay.textContent){ctx.font=Math.max(textSize,canvas.width*.055)+"px system-ui";ctx.textAlign="center";ctx.fillStyle="#fff";ctx.strokeStyle="#000";ctx.lineWidth=7;ctx.strokeText(overlay.textContent,canvas.width/2,canvas.height*textY/100);ctx.fillText(overlay.textContent,canvas.width/2,canvas.height*textY/100)}drawPIPLayersExport(ctx,canvas,pipExportLayers,pipProjectTime);if(performance.now()>=until){resolve();return}requestAnimationFrame(drawPhoto)};requestAnimationFrame(drawPhoto)});pipProjectTime+=Math.max(.25,Number(cs.duration||photoDuration||3));URL.revokeObjectURL(url);first=false;continue;
   }
   startTime=Math.max(0,cs.trimStart??0);endTime=Math.min(video.duration,cs.trimEnd??video.duration)
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
       const exportRate=curveSpeed(cs,video.currentTime,startTime,endTime);try{video.playbackRate=exportRate;video.preservesPitch=true}catch(e){} ctx.filter=video.style.filter||"none";const kf=keyframeExportState(i,video.currentTime);const kc=kf||{zoom:zoom||1,rotation:Number(cs.rotation||0),opacity:Number(cs.opacity??1),x:Number(cs.x||0),y:Number(cs.y||0)};ctx.save();ctx.globalAlpha=Math.max(0,Math.min(1,Number(kc.opacity??1)));ctx.translate(canvas.width/2+(Number(kc.x||0)*canvas.width/100),canvas.height/2+(Number(kc.y||0)*canvas.height/100));ctx.rotate(Number(kc.rotation||0)*Math.PI/180);ctx.scale(Number(kc.zoom||1),Number(kc.zoom||1));const mask=cs.mask||"none";if(mask==="circle"||mask==="oval"||mask==="rounded"||mask==="diamond"){ctx.beginPath();if(mask==="circle")ctx.arc(0,0,Math.min(canvas.width,canvas.height)*.47,0,Math.PI*2);else if(mask==="oval"){ctx.ellipse(0,0,canvas.width*.46,canvas.height*.42,0,0,Math.PI*2)}else if(mask==="diamond"){ctx.moveTo(0,-canvas.height/2);ctx.lineTo(canvas.width/2,0);ctx.lineTo(0,canvas.height/2);ctx.lineTo(-canvas.width/2,0);ctx.closePath()}else{const r=Math.min(canvas.width,canvas.height)*.07,w=canvas.width,h=canvas.height;if(typeof ctx.roundRect==="function")ctx.roundRect(-w/2,-h/2,w,h,r);else{ctx.moveTo(-w/2+r,-h/2);ctx.lineTo(w/2-r,-h/2);ctx.quadraticCurveTo(w/2,-h/2,w/2,-h/2+r);ctx.lineTo(w/2,h/2-r);ctx.quadraticCurveTo(w/2,h/2,w/2-r,h/2);ctx.lineTo(-w/2+r,h/2);ctx.quadraticCurveTo(-w/2,h/2,-w/2,h/2-r);ctx.lineTo(-w/2,-h/2+r);ctx.quadraticCurveTo(-w/2,-h/2,-w/2+r,-h/2)} }ctx.clip()}const bm=cs.blendMode==="normal"||!cs.blendMode?"source-over":cs.blendMode;ctx.globalCompositeOperation=bm;ctx.drawImage(video,dx-canvas.width/2,dy-canvas.height/2,dw,dh);ctx.globalCompositeOperation="source-over";ctx.restore();ctx.filter="none";
       if(overlay.textContent){ctx.font=Math.max(textSize,canvas.width*.055)+"px system-ui";ctx.textAlign="center";ctx.fillStyle="#fff";ctx.strokeStyle="#000";ctx.lineWidth=7;ctx.strokeText(overlay.textContent,canvas.width/2,canvas.height*.16);ctx.fillText(overlay.textContent,canvas.width/2,canvas.height*.16)}
       drawPIPLayersExport(ctx,canvas,pipExportLayers,pipProjectTime+(video.currentTime-startTime));
       if(video.currentTime>=endTime||video.ended){video.pause();resolve();return}
       requestAnimationFrame(draw)
     };requestAnimationFrame(draw)
   });
   pipProjectTime+=Math.max(0,endTime-startTime);
   URL.revokeObjectURL(url);
 }
 cleanupPIPExport(pipExportLayers);
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

document.querySelectorAll(".sidebar button[data-a]").forEach(b=>b.addEventListener("click",()=>act(b.dataset.a)));
document.querySelectorAll(".sidebar button[data-adv]").forEach(b=>b.addEventListener("click",()=>openAdvancedFeature(b.dataset.adv)));
document.addEventListener("input",e=>{
 var t=e.target;
 if(["proHue","proSat","proLight","proTemp"].includes(t.id)){if(t.id==="proHue")settings().hue=+t.value;if(t.id==="proSat")settings().saturation=+t.value;if(t.id==="proLight")settings().lightness=+t.value;if(t.id==="proTemp")settings().temperature=+t.value;applyProColor()}
 if(t.id==="proVol"){video.volume=+t.value}
 if(t.id==="proFadeIn")musicFadeIn=+t.value;
 if(t.id==="proFadeOut")musicFadeOut=+t.value;
});
document.addEventListener("change",e=>{if(e.target.id==="proBlend"){settings().blendMode=e.target.value;applyProColor()}});
document.addEventListener("click",e=>{
 var t=e.target;
 if(t.dataset.templatePro){addSmartTemplate(t.dataset.templatePro);return}
 if(t.id==="smartReframe"){ratio="9:16";preview.style.aspectRatio="9/16";msg("Auto Reframe: 9:16 preset ✓");return}
 if(t.id==="smartCaption"){const b=$("#captionStart");if(b)b.click();else msg("Captions panel उघडा.",true);return}
 if(t.id==="smartBg"){settings().chroma=true;settings().chromaStrength=.8;act("chroma");msg("Background Remove: Chroma fallback ON ✓");return}
 if(t.id==="smartTTS"){const text=settings().text||$("#txt")?.value||overlay.textContent||"";if(!text){msg("आधी Text लिहा.",true);return}if("speechSynthesis" in window){speechSynthesis.cancel();const u=new SpeechSynthesisUtterance(text);u.lang="mr-IN";speechSynthesis.speak(u);msg("Text-to-Speech preview सुरू ✓")}else msg("या browser मध्ये TTS उपलब्ध नाही.",true);return}
 if(t.id==="smartStabilize"){settings().stabilize=true;preview.style.willChange="transform";msg("Stabilize preview mode ON ✓");return}if(t.dataset.motion){addMotionPreset(t.dataset.motion);return}if(t.id==="audioClipTools"){openAudioClipTools();return} if(t.id==="addAudioBeat"){addAudioBeat();return} if(t.id==="detectAudioBeats"){detectAudioBeats();return} if(t.id==="autoBeatSync"){autoBeatSync();return} if(t.id==="beatSyncEffects"){beatSyncEffects();return} if(t.id==="applyBeatCut"){applyBeatCut();return} if(t.id==="acReset"){settings().audioVolume=.7;settings().audioFadeIn=0;settings().audioFadeOut=0;openAudioClipTools();msg("Audio reset ✓");return}
 if(t.id==="extractAudio"){msg("Current video audio export pipeline मध्ये वापरला जातो ✓");return}
 if(t.id==="voiceRecord"){const text=settings().text||"AK Video Editor voice preview";if("speechSynthesis" in window){const u=new SpeechSynthesisUtterance(text);u.lang="mr-IN";speechSynthesis.speak(u)}return}
});



function autoCaptionFromCurrentVideo(){
 const SR=window.SpeechRecognition||window.webkitSpeechRecognition;
 if(!SR){msg("Speech Recognition या browser मध्ये उपलब्ध नाही.",true);return}
 if(typeof video==="undefined"||!video.src){msg("आधी video preview मध्ये लोड करा.",true);return}
 if(window.__akCaptionRecognition){try{window.__akCaptionRecognition.stop()}catch(e){}}
 const rec=new SR();
 rec.continuous=true;rec.interimResults=false;rec.maxAlternatives=1;
 const lang=prompt("Caption भाषा निवडा: mr-IN = मराठी, hi-IN = हिंदी, en-IN = English",navigator.language||"mr-IN")||"mr-IN";
 rec.lang=lang;
 let activeStart=Number(video.currentTime||0),count=0,stream=null,track=null;
 const pushResult=(text,endHint)=>{
   const clean=String(text||"").trim(); if(!clean)return;
   const end=Math.max(activeStart+.8,Number(endHint||activeStart+Math.max(1.5,Math.min(4,clean.length/12))));
   captionState().push({text:clean,start:activeStart,end});
   activeStart=end;count++;
   captionState().sort((a,b)=>a.start-b.start);renderCaptions();renderOverlayTracks()
 };
 rec.onstart=()=>msg("🎤 Auto Caption सुरू ✓ — "+lang);
 rec.onresult=e=>{
   for(let i=e.resultIndex;i<e.results.length;i++){
     const result=e.results[i]; if(!result.isFinal)continue;
     const text=result[0]&&result[0].transcript;
     const now=Number(video.currentTime||activeStart+2);
     pushResult(text,now);
   }
 };
 rec.onerror=e=>msg("Caption error: "+e.error,true);
 rec.onend=()=>{
   try{if(track)track.stop()}catch(e){}
   try{if(stream)stream.getTracks().forEach(t=>t.stop())}catch(e){}
   window.__akCaptionRecognition=null;
   renderCaptions();renderOverlayTracks();
   msg("📝 Auto Captions तयार ✓ "+count+" lines");
 };
 window.__akCaptionRecognition=rec;
 try{
   if(typeof video.captureStream==="function"){
     stream=video.captureStream();
     track=stream.getAudioTracks()[0]||null;
     if(track) rec.start(track); else rec.start();
   }else if(typeof video.mozCaptureStream==="function"){
     stream=video.mozCaptureStream();
     track=stream.getAudioTracks()[0]||null;
     if(track) rec.start(track); else rec.start();
   }else{
     rec.start();
   }
   msg("🎤 Audio recognition सुरू… Video Play करा.");
 }catch(e){
   window.__akCaptionRecognition=null;
   msg("Auto Caption सुरू झाले नाही: "+(e.message||e),true);
 }
}
function clearAllCaptions(){const c=typeof settings==="function"?settings():{};c.captions=[];renderCaptions();renderOverlayTracks();msg("🗑️ Captions cleared")}
function applyChromaKeyFrame(srcCanvas,targetCtx,targetCanvas,threshold=85){try{targetCtx.clearRect(0,0,targetCanvas.width,targetCanvas.height);targetCtx.drawImage(srcCanvas,0,0,targetCanvas.width,targetCanvas.height);const im=targetCtx.getImageData(0,0,targetCanvas.width,targetCanvas.height),d=im.data,t=Math.max(20,Number(threshold)||85);for(let i=0;i<d.length;i+=4){const rr=d[i],gg=d[i+1],bb=d[i+2],mx=Math.max(rr,gg,bb),mn=Math.min(rr,gg,bb);if(gg>rr*1.18&&gg>bb*1.18&&(gg-mn)>t)d[i+3]=0}targetCtx.putImageData(im,0,0)}catch(e){console.warn("chroma frame",e)}}
function applyCanvasEffectPreset(ctx,type){if(!ctx)return;const f={none:"none",flash:"brightness(1.35) contrast(1.08)",blur:"blur(3px)",cinematic:"contrast(1.15) saturate(1.12) sepia(.04)",glitch:"contrast(1.2) saturate(1.35)",vignette:"brightness(.9) contrast(1.08)"}[type]||"none";try{ctx.filter=f}catch(e){}}
function addEffectPresetToCurrent(type){const c=typeof settings==="function"?settings():{};c.effectPreset=type;const filters={flash:"brightness(1.4) contrast(1.1)",blur:"blur(3px)",cinematic:"contrast(1.15) saturate(1.1) sepia(.05)",glitch:"contrast(1.2) saturate(1.4)",vignette:"contrast(1.08) brightness(.9)"};if(typeof video!=="undefined")video.style.filter=filters[type]||"none";msg("✨ "+type+" preset लागू ✓")}
function openTTSPanel(){const voices=typeof speechSynthesis!=="undefined"?speechSynthesis.getVoices():[];tools.innerHTML='<b>🗣️ Voice / TTS</b><textarea id="ttsText" rows="4" placeholder="Text लिहा…"></textarea><label>Language <select id="ttsVoice"></select></label><label>Rate <input id="ttsRate" type="range" min=".5" max="2" step=".1" value="1"></label><label>Pitch <input id="ttsPitch" type="range" min=".5" max="2" step=".1" value="1"></label><button id="ttsSpeak">▶ Speak</button><button id="ttsStop">■ Stop</button><small>Device/browser मध्ये उपलब्ध voices वापरल्या जातील.</small>';const sel=document.getElementById("ttsVoice"),vs=voices.length?voices:(typeof speechSynthesis!=="undefined"?speechSynthesis.getVoices():[]);vs.forEach(v=>{const o=document.createElement("option");o.value=v.name;o.textContent=v.name+" ("+v.lang+")";sel.appendChild(o)});document.getElementById("ttsSpeak").onclick=()=>{if(!("speechSynthesis"in window)){msg("TTS उपलब्ध नाही.",true);return}const u=new SpeechSynthesisUtterance(document.getElementById("ttsText").value.trim());if(!u.text)return;const v=speechSynthesis.getVoices().find(x=>x.name===sel.value);if(v)u.voice=v;u.rate=Number(document.getElementById("ttsRate").value);u.pitch=Number(document.getElementById("ttsPitch").value);speechSynthesis.cancel();speechSynthesis.speak(u);msg("🗣️ TTS सुरू ✓")};document.getElementById("ttsStop").onclick=()=>speechSynthesis.cancel();if("onvoiceschanged"in speechSynthesis)speechSynthesis.onvoiceschanged=()=>openTTSPanel()}
function aiAutoCut(){if(!files.length){msg("आधी media जोडा.",true);return}const beats=audioBeatMarkers();if(beats.length){applyBeatCut();beatSyncEffects();msg("🤖 Auto Cut: beat-based cuts + effects लागू ✓");return}const n=files.length;files.forEach((f,i)=>{const c=clipSettings[i]||(clipSettings[i]={});if(f.type.startsWith("image/"))c.duration=Number(c.duration||photoDuration||2)});renderOverlayTracks();renderTransitionTracks();msg("🤖 Auto Cut foundation लागू ✓")}
async function exportAIVideoBackground(){if(!files.length){msg("आधी video जोडा.",true);return}const f=files[currentIndex]||files[0];if(!f||!f.type.startsWith("video/")){msg("Video clip निवडा.",true);return}if(!window.bodySegmentation){msg("AI segmentation library लोड झाली नाही.",true);return}try{msg("🤖 AI Background Removal export सुरू…");const seg=await bodySegmentation.createSegmenter(bodySegmentation.SupportedModels.MediaPipeSelfieSegmentation,{runtime:"mediapipe",solutionPath:"https://cdn.jsdelivr.net/npm/@mediapipe/selfie_segmentation",modelType:"general"});const src=document.createElement("video");src.src=URL.createObjectURL(f);src.muted=true;src.playsInline=true;await new Promise((res,rej)=>{src.onloadedmetadata=res;src.onerror=rej});const c=document.createElement("canvas");c.width=src.videoWidth;c.height=src.videoHeight;const x=c.getContext("2d"),stream=c.captureStream(30),rec=new MediaRecorder(stream,{mimeType:"video/webm"}),chunks=[];rec.ondataavailable=e=>e.data.size&&chunks.push(e.data);rec.onstop=()=>{const b=new Blob(chunks,{type:"video/webm"}),a=document.createElement("a");a.href=URL.createObjectURL(b);a.download="AK-AI-Background-Removed.webm";a.click();URL.revokeObjectURL(a.href);try{seg.dispose()}catch(e){}msg("🤖 AI Background Removal export पूर्ण ✓")};rec.start(200);src.currentTime=0;await src.play();const end=src.duration;while(src.currentTime<end-0.03){x.drawImage(src,0,0,c.width,c.height);const people=await seg.segmentPeople(c);const mask=await bodySegmentation.toBinaryMask(people);const id=x.getImageData(0,0,c.width,c.height),md=mask.data||mask;for(let i=0,p=0;i<id.data.length;i+=4,p+=4)if(md[p]===0)id.data[i+3]=0;x.putImageData(id,0,0);await new Promise(requestAnimationFrame)}src.pause();rec.stop();URL.revokeObjectURL(src.src)}catch(e){console.error(e);msg("AI video export failed.",true)}}
async function aiVideoBackgroundPreview(){if(!files.length){msg("आधी video जोडा.",true);return}const f=files[currentIndex]||files[0];if(!f||!f.type.startsWith("video/")){msg("Video clip निवडा.",true);return}if(!window.bodySegmentation){msg("AI segmentation library लोड झाली नाही.",true);return}try{msg("🤖 AI video background model तयार होत आहे…");const model=bodySegmentation.SupportedModels.MediaPipeSelfieSegmentation;const seg=await bodySegmentation.createSegmenter(model,{runtime:"mediapipe",solutionPath:"https://cdn.jsdelivr.net/npm/@mediapipe/selfie_segmentation",modelType:"general"});const src=document.createElement("video");src.src=URL.createObjectURL(f);src.muted=true;src.playsInline=true;await new Promise((res,rej)=>{src.onloadedmetadata=res;src.onerror=rej});const c=document.createElement("canvas");c.width=src.videoWidth;c.height=src.videoHeight;const x=c.getContext("2d");let running=true;const draw=async()=>{if(!running)return;if(src.paused||src.ended){running=false;try{seg.dispose()}catch(e){}return}x.drawImage(src,0,0,c.width,c.height);const people=await seg.segmentPeople(c);const mask=await bodySegmentation.toBinaryMask(people);const id=x.getImageData(0,0,c.width,c.height),md=mask.data||mask;for(let i=0,p=0;i<id.data.length;i+=4,p+=4){if(md[p]===0)id.data[i+3]=0}x.putImageData(id,0,0);const overlay=document.getElementById("overlay");if(overlay){overlay.style.backgroundImage="url("+c.toDataURL("image/png")+")";overlay.style.backgroundSize="100% 100%";overlay.style.backgroundRepeat="no-repeat"}requestAnimationFrame(draw)};src.onplay=()=>draw();src.play();msg("🤖 AI Background Removal preview सुरू ✓")}catch(e){console.error(e);msg("AI video removal failed — Chroma Key वापरा.",true)}}
async function aiBackgroundRemove(){if(!files.length){msg("आधी photo/video जोडा.",true);return}if(!window.bodySegmentation){msg("AI segmentation library लोड झाली नाही.",true);return}try{msg("🤖 AI Background Removal model तयार होत आहे…");const model=bodySegmentation.SupportedModels.MediaPipeSelfieSegmentation;const seg=await bodySegmentation.createSegmenter(model,{runtime:"mediapipe",solutionPath:"https://cdn.jsdelivr.net/npm/@mediapipe/selfie_segmentation",modelType:"general"});const f=files[currentIndex]||files[0];if(f.type.startsWith("image/")){const img=new Image();img.src=URL.createObjectURL(f);await new Promise((res,rej)=>{img.onload=res;img.onerror=rej});const c=document.createElement("canvas");c.width=img.naturalWidth;c.height=img.naturalHeight;const x=c.getContext("2d");x.drawImage(img,0,0);const people=await seg.segmentPeople(c);const mask=await bodySegmentation.toBinaryMask(people);const out=document.createElement("canvas");out.width=c.width;out.height=c.height;const o=out.getContext("2d");o.drawImage(c,0,0);const id=o.getImageData(0,0,out.width,out.height),md=mask.data||mask;for(let i=0,p=0;i<id.data.length;i+=4,p+=4){if(md[p]===0)id.data[i+3]=0}o.putImageData(id,0,0);const blob=await new Promise(r=>out.toBlob(r,"image/png"));const nf=new File([blob],"AI-removed-"+f.name.replace(/\.[^.]+$/,"")+".png",{type:"image/png"});files[currentIndex]=nf;loadFile(nf,currentIndex);msg("🤖 AI Background Removed ✓")}else{msg("AI segmentation तयार आहे; video preview साठी frame-by-frame processing पुढच्या export pipeline मध्ये जोडता येईल.",true)}try{seg.dispose()}catch(e){}}catch(e){console.error(e);msg("AI Background Removal failed — Chroma Key वापरा.",true)}}
function chromaBackgroundRemove(){if(!files.length){msg("आधी media जोडा.",true);return}const c=typeof settings==="function"?settings():{};c.backgroundRemove="chroma";c.chromaEnabled=true;msg("🪄 Background Remove: Chroma Key mode ✓ — green/blue background निवडा")}
function openMultiTrackEditor(){tools.innerHTML='<b>🎚️ Multi-track</b><button id="mtRefresh">↻ Refresh Tracks</button><button id="mtDuplicate">＋ Duplicate Clip</button><button id="mtEarlier">← Move Earlier</button><small>Video, Text, Sticker, Audio, Caption आणि Effect tracks वेगळे दिसतात.</small>';document.getElementById("mtRefresh").onclick=()=>{multiTrackClipInfo();renderOverlayTracks()};document.getElementById("mtDuplicate").onclick=duplicateCurrentClipToTrack;document.getElementById("mtEarlier").onclick=moveCurrentClipEarlier;multiTrackClipInfo()}
\n
/* AK HISTORY STABILITY — undo/redo state helpers */
var historyStack=typeof historyStack!=="undefined"?historyStack:[];
var redoStack=typeof redoStack!=="undefined"?redoStack:[];
var restoringHistory=typeof restoringHistory!=="undefined"?restoringHistory:false;
function captureState(){
  const clone=v=>{try{return JSON.parse(JSON.stringify(v))}catch(e){return v}};
  return {clipSettings:clone(typeof clipSettings!=="undefined"?clipSettings:[]),keyframes:clone(typeof keyframes!=="undefined"?keyframes:[]),splitPoints:clone(typeof splitPoints!=="undefined"?splitPoints:[]),currentIndex:typeof currentIndex!=="undefined"?currentIndex:0,ratio:typeof ratio!=="undefined"?ratio:"16:9",photoDuration:typeof photoDuration!=="undefined"?photoDuration:5};
}
function restoreState(st){
  if(!st)return;
  if(typeof clipSettings!=="undefined"&&st.clipSettings)clipSettings=JSON.parse(JSON.stringify(st.clipSettings));
  if(typeof keyframes!=="undefined"&&st.keyframes)keyframes=JSON.parse(JSON.stringify(st.keyframes));
  if(typeof splitPoints!=="undefined"&&st.splitPoints)splitPoints=JSON.parse(JSON.stringify(st.splitPoints));
  if(typeof currentIndex!=="undefined"&&Number.isFinite(Number(st.currentIndex)))currentIndex=Number(st.currentIndex);
  if(typeof ratio!=="undefined"&&st.ratio)ratio=st.ratio;
  if(typeof photoDuration!=="undefined"&&st.photoDuration)photoDuration=Number(st.photoDuration);
}
function pushHistory(){
  if(restoringHistory)return;
  historyStack.push(captureState());
  if(historyStack.length>30)historyStack.shift();
  redoStack.length=0;
}

/* AK EDITOR COMPLETION PACK v1 — core stability + remaining editor features */
(function(){
  const AKH="ak-video-editor-autosave-v1";
  window.renderTimeline=window.renderTimeline||function(){
    const el=document.getElementById("track");if(!el)return;
    const list=Array.isArray(files)?files:[];
    if(!list.length){el.textContent="Media जोडल्यावर Timeline येथे दिसेल";return;}
    el.innerHTML="";
    list.forEach((f,i)=>{
      const c=(typeof clipSettings!=="undefined"&&clipSettings[i])||{};
      const b=document.createElement("div");b.className="clip-block";b.dataset.clip=i;
      b.textContent=(i===currentIndex?"▶ ":"")+((f&&f.name)||("Clip "+(i+1)));
      b.title="Clip "+(i+1)+" • "+(Number(c.trimStart||0).toFixed(1))+"s–"+(c.trimEnd!=null?Number(c.trimEnd).toFixed(1):"end");
      b.onclick=()=>{currentIndex=i;try{load(f)}catch(e){try{loadFile(f,i)}catch(x){}}};
      el.appendChild(b);
    });
    if(Array.isArray(splitPoints)&&splitPoints.length){const m=document.createElement("small");m.textContent="✂ Split: "+splitPoints.map(x=>fmt(x)).join(" • ");el.appendChild(m)}
  };
  window.renderKeyframeTracks=window.renderKeyframeTracks||function(){
    const el=document.getElementById("track");if(!el||!Array.isArray(keyframes))return;
    const n=keyframes.filter(k=>k.clip===currentIndex).length;
    el.dataset.keyframes=n;
  };
  window.renderTransitionTracks=window.renderTransitionTracks||function(){
    const el=document.getElementById("track");if(!el)return;
    el.dataset.transition=String((typeof settings==="function"?settings():{}).transition||"none");
  };
  function akSettings(){
    if(typeof clipSettings==="undefined") return {};
    if(!clipSettings[currentIndex]) clipSettings[currentIndex]={};
    return clipSettings[currentIndex];
  }
  window.settings=window.settings||akSettings;
  window.applyVisualSettings=window.applyVisualSettings||function(){
    const c=akSettings(),v=document.getElementById("video"); if(!v)return;
    const b=Number(c.brightness??1),co=Number(c.contrast??1),s=Number(c.saturation??1),h=Number(c.hue??0),l=Number(c.lightness??1),bl=Number(c.blur??0);
    let f=(c.filter&&c.filter!=="none"?c.filter+" ":"")+"brightness("+b+") contrast("+co+") saturate("+s+") hue-rotate("+h+"deg) brightness("+l+")";
    if(bl>0) f+=" blur("+bl+"px)";
    v.style.filter=f;
    v.style.transform="translate("+(Number(c.x||0))+"px,"+(Number(c.y||0))+"px) scale("+Number(c.zoom||1)+") rotate("+Number(c.rotation||0)+"deg)"+(c.mirror?" scaleX(-1)":"");
    v.style.opacity=Number(c.opacity??1);
    v.style.mixBlendMode=c.blendMode||"normal";
  };
  window.applyMaskPreview=window.applyMaskPreview||function(){
    const c=akSettings(),v=document.getElementById("video"); if(!v)return;
    const m=c.mask||"none";
    v.style.clipPath=m==="circle"?"circle(46% at 50% 50%)":m==="rect"?"inset(3% 3% 3% 3% round 4%)":"none";
  };
  window.saveProject=window.saveProject||async function(){
    const payload={version:2,createdAt:new Date().toISOString(),ratio,photoDuration,files:[],music:null,clipSettings,keyframes,splitPoints,exportConfig};
    for(const f of (files||[])){payload.files.push({name:f.name,type:f.type,size:f.size,lastModified:f.lastModified,data:await new Promise(res=>{const r=new FileReader();r.onload=()=>res(r.result);r.readAsDataURL(f)})});}
    if(typeof musicFile!=="undefined"&&musicFile)payload.music={name:musicFile.name,type:musicFile.type,size:musicFile.size,lastModified:musicFile.lastModified,data:await new Promise(res=>{const r=new FileReader();r.onload=()=>res(r.result);r.readAsDataURL(musicFile)})};
    const blob=new Blob([JSON.stringify(payload)],{type:"application/json"}),a=document.createElement("a");a.href=URL.createObjectURL(blob);a.download="AK-Video-Project.json";a.click();setTimeout(()=>URL.revokeObjectURL(a.href),1000);
    try{localStorage.setItem(AKH,JSON.stringify({...payload,files:[],music:null}))}catch(e){}
    msg("💾 Project Save झाला ✓");
  };
  window.undo=window.undo||function(){if(typeof historyStack==="undefined"||!historyStack.length){msg("Undo साठी बदल उपलब्ध नाही.",true);return}try{redoStack.push(captureState());const st=historyStack.pop();restoringHistory=true;restoreState(st);restoringHistory=false;renderTimeline();renderOverlayTracks();applyVisualSettings();applyMaskPreview();msg("↶ Undo ✓")}catch(e){restoringHistory=false;msg("Undo लागू झाले नाही.",true)}};
  window.redo=window.redo||function(){if(typeof redoStack==="undefined"||!redoStack.length){msg("Redo साठी बदल उपलब्ध नाही.",true);return}try{historyStack.push(captureState());const st=redoStack.pop();restoringHistory=true;restoreState(st);restoringHistory=false;renderTimeline();renderOverlayTracks();applyVisualSettings();applyMaskPreview();msg("↷ Redo ✓")}catch(e){restoringHistory=false;msg("Redo लागू झाले नाही.",true)}};
  function applyTextAnimation(){
    const o=document.getElementById("overlay"),c=akSettings();if(!o)return;
    o.classList.remove("ak-ta-pop","ak-ta-fade","ak-ta-slide","ak-ta-zoom","ak-ta-bounce");
    const n=String(c.textAnimation||"none");if(n!=="none")o.classList.add("ak-ta-"+n);
  }
  function refreshCompletionUI(){
    const t=document.getElementById("tools");if(!t)return;
    const b=document.createElement("div");b.className="ak-completion-panel";
    b.innerHTML='<b>🚀 Advanced</b><button data-ak-action="save-local">💾 Auto Save</button><button data-ak-action="clear-local">🗑️ Clear Auto Save</button><button data-ak-action="text-presets">🅰️ Text Animation</button><button data-ak-action="mask-presets">🎭 Mask</button><button data-ak-action="speed-curves">⏩ Speed Curve</button>';
    t.appendChild(b);
  }
  document.addEventListener("click",e=>{
    const a=e.target.closest("[data-ak-action]")?.dataset.akAction;if(!a)return;
    if(a==="save-local"){try{localStorage.setItem(AKH,JSON.stringify({version:2,ratio,photoDuration,clipSettings,keyframes,splitPoints,exportConfig,savedAt:new Date().toISOString()}));msg("💾 Auto Save ✓")}catch(x){msg("Auto Save failed.",true)}}
    if(a==="clear-local"){localStorage.removeItem(AKH);msg("Auto Save clear ✓")}
    if(a==="text-presets"){const n=prompt("Text animation: none / pop / fade / slide / zoom / bounce",akSettings().textAnimation||"pop");if(n&&["none","pop","fade","slide","zoom","bounce"].includes(n)){akSettings().textAnimation=n;applyTextAnimation();msg("🅰️ Text Animation: "+n+" ✓")}}
    if(a==="mask-presets"){const n=prompt("Mask: none / circle / rect",akSettings().mask||"none");if(n&&["none","circle","rect"].includes(n)){akSettings().mask=n;applyMaskPreview();msg("🎭 Mask: "+n+" ✓")}}
    if(a==="speed-curves"){const n=prompt("Speed Curve: normal / montage / hero / bullet / jump / flash / smooth",akSettings().speedCurvePreset||"smooth");if(n){setSpeedCurvePreset(n);applySpeedCurvePreview()}}
  });
  if(typeof video!=="undefined"){
    video.addEventListener("timeupdate",()=>{try{applySpeedCurvePreview();applyTextAnimation()}catch(e){}});
    video.addEventListener("loadedmetadata",()=>{try{applyVisualSettings();applyMaskPreview()}catch(e){}});
  }
  window.addEventListener("load",()=>setTimeout(refreshCompletionUI,300));
})();


/* AK EDITOR COMPLETION PACK v2 — Smart Auto Cut, Templates, Pro Mask/Blend, Export readiness, Mobile polish */
(function(){
  const $id=id=>document.getElementById(id);
  const cfg=()=>typeof settings==="function"?settings():(typeof clipSettings!=="undefined"?(clipSettings[currentIndex]||(clipSettings[currentIndex]={})):({}));
  function setStatus(t,err=false){if(typeof msg==="function")msg(t,err);}

  const templates={
    cinematic:{name:"Cinematic",ratio:"16:9",filter:"contrast(1.08) saturate(.86)",transition:"fade",speed:1,textAnimation:"fade",zoom:1.03,brightness:1,contrast:1.08,saturation:.9},
    reel:{name:"Reel",ratio:"9:16",filter:"contrast(1.05) saturate(1.12)",transition:"zoom",speed:1.08,textAnimation:"pop",zoom:1.04,brightness:1.02,contrast:1.05,saturation:1.12},
    beat:{name:"Beat Sync",ratio:"9:16",filter:"contrast(1.1) saturate(1.2)",transition:"flash",speed:1,textAnimation:"bounce",zoom:1.06,brightness:1,contrast:1.1,saturation:1.2},
    story:{name:"Story",ratio:"9:16",filter:"brightness(1.04) saturate(1.05)",transition:"slide",speed:1,textAnimation:"slide",zoom:1.02,brightness:1.04,contrast:1,saturation:1.05},
    youtube:{name:"YouTube",ratio:"16:9",filter:"contrast(1.04) saturate(1.03)",transition:"crossfade",speed:1,textAnimation:"fade",zoom:1,brightness:1,contrast:1.04,saturation:1.03}
  };
  function applyTemplate(key){
    const p=templates[key]; if(!p)return;
    const c=cfg(); Object.assign(c,{filter:p.filter,transition:p.transition,speed:p.speed,textAnimation:p.textAnimation,zoom:p.zoom,brightness:p.brightness,contrast:p.contrast,saturation:p.saturation,template:key});
    if(p.ratio){ratio=p.ratio;const pr=$id("preview");if(pr){pr.classList.toggle("video-916",ratio==="9:16");pr.classList.toggle("ratio-square",ratio==="1:1");pr.classList.toggle("ratio-wide",ratio==="16:9");}}
    try{applyVisualSettings();applyMaskPreview();applyTextAnimation&&applyTextAnimation();renderTransitionTracks&&renderTransitionTracks()}catch(e){}
    setStatus("🎬 "+p.name+" Template लागू ✓");
  }
  window.akApplyTemplate=applyTemplate;

  async function smartAutoCut(){
    if(!files||!files.length){setStatus("आधी video जोडा.",true);return}
    const f=files[currentIndex];
    if(!f||!f.type.startsWith("video/")){setStatus("Video clip निवडा.",true);return}
    if(!window.AudioContext&&!window.webkitAudioContext){setStatus("या browser मध्ये audio analysis उपलब्ध नाही.",true);return}
    setStatus("🤖 Smart Auto Cut: audio analysis सुरू…");
    try{
      const AC=window.AudioContext||window.webkitAudioContext, ac=new AC();
      const ab=await f.arrayBuffer(), buf=await ac.decodeAudioData(ab.slice(0));
      const ch=buf.numberOfChannels, sr=buf.sampleRate, win=Math.max(256,Math.floor(sr*.12));
      const rms=[];
      for(let s=0;s<buf.length;s+=win){
        let sum=0,n=0;
        for(let c=0;c<ch;c++){const d=buf.getChannelData(c);const end=Math.min(buf.length,s+win);for(let i=s;i<end;i+=2){const v=d[i];sum+=v*v;n++}}
        rms.push(Math.sqrt(sum/Math.max(1,n)));
      }
      const sorted=rms.slice().sort((a,b)=>a-b), floor=sorted[Math.floor(sorted.length*.28)]||0.01;
      const threshold=Math.max(.012,floor*1.35), minGap=1.15, points=[];
      let silence=0, startSilence=0;
      for(let i=0;i<rms.length;i++){
        if(rms[i]<threshold){if(!silence)startSilence=i;silence+=.12}
        else{
          if(silence>=.48){
            const p=startSilence*.12+silence*.5;
            if(p>0.35&&p<buf.duration-0.35&&(!points.length||p-points[points.length-1]>=minGap))points.push(Number(p.toFixed(2)));
          }
          silence=0;
        }
      }
      const cuts=points.slice(0,40);
      if(typeof splitPoints!=="undefined"){splitPoints.splice(0,splitPoints.length,...cuts);renderTimeline&&renderTimeline();renderTransitionTracks&&renderTransitionTracks()}
      if(typeof cfg==="function"){cfg().autoCut={mode:"silence",threshold,points:cuts,createdAt:new Date().toISOString()}}
      try{await ac.close()}catch(e){}
      setStatus("✂️ Smart Auto Cut पूर्ण ✓ — "+cuts.length+" cut points");
    }catch(e){console.error(e);setStatus("Auto Cut analysis failed. Video मध्ये usable audio track आहे का तपासा.",true)}
  }
  window.akSmartAutoCut=smartAutoCut;

  function setMask(name){
    const c=cfg(); c.mask=name;
    const v=$id("video"); if(!v)return;
    const maps={none:"none",circle:"circle(47% at 50% 50%)",rect:"inset(3% 3% 3% 3% round 4%)",rounded:"inset(2% 2% 2% 2% round 7%)",diamond:"polygon(50% 0%,100% 50%,50% 100%,0% 50%)",oval:"ellipse(46% 42% at 50% 50%)"};
    v.style.clipPath=maps[name]||"none";
    setStatus("🎭 Mask: "+name+" ✓");
  }
  function setBlend(name){
    const c=cfg(); c.blendMode=name;
    const v=$id("video"); if(v)v.style.mixBlendMode=name;
    setStatus("🌓 Blend: "+name+" ✓");
  }

  function exportReadiness(){
    const types=["video/mp4;codecs=avc1.42E01E,mp4a.40.2","video/mp4","video/webm;codecs=vp9,opus","video/webm;codecs=vp8,opus"];
    const supported=types.filter(x=>window.MediaRecorder&&MediaRecorder.isTypeSupported&&MediaRecorder.isTypeSupported(x));
    const mp4=supported.some(x=>x.startsWith("video/mp4"));
    if(typeof exportConfig!=="undefined")exportConfig.preferredMime=mp4?"video/mp4":(supported[0]||"video/webm");
    setStatus(mp4?"🎞️ MP4 recording capability उपलब्ध ✓":"🎞️ MP4 native recording नाही — WebM fallback वापरला जाईल.");
    return {mp4,supported};
  }

  function advancedPanel(){
    const t=$id("tools"); if(!t)return;
    const old=t.querySelector(".ak-v2-panel"); if(old)old.remove();
    const p=document.createElement("div"); p.className="ak-v2-panel";
    p.innerHTML='<div class="ak-v2-title">🚀 PRO COMPLETION</div>'+
      '<div class="ak-v2-row"><b>Templates</b><button data-ak2-template="cinematic">🎞️ Cinematic</button><button data-ak2-template="reel">📱 Reel</button><button data-ak2-template="beat">🥁 Beat</button><button data-ak2-template="story">📖 Story</button><button data-ak2-template="youtube">▶️ YouTube</button></div>'+
      '<div class="ak-v2-row"><b>Smart Cut</b><button id="akSmartCut">🤖 Auto Cut</button><button id="akExportCheck">🎞️ Export Check</button></div>'+
      '<div class="ak-v2-row"><b>Mask</b><button data-ak2-mask="none">None</button><button data-ak2-mask="circle">Circle</button><button data-ak2-mask="oval">Oval</button><button data-ak2-mask="rounded">Rounded</button><button data-ak2-mask="diamond">Diamond</button></div>'+
      '<div class="ak-v2-row"><b>Blend</b><button data-ak2-blend="normal">Normal</button><button data-ak2-blend="screen">Screen</button><button data-ak2-blend="multiply">Multiply</button><button data-ak2-blend="overlay">Overlay</button><button data-ak2-blend="soft-light">Soft Light</button></div>';
    t.appendChild(p);
    p.querySelectorAll("[data-ak2-template]").forEach(b=>b.onclick=()=>applyTemplate(b.dataset.ak2Template));
    p.querySelectorAll("[data-ak2-mask]").forEach(b=>b.onclick=()=>setMask(b.dataset.ak2Mask));
    p.querySelectorAll("[data-ak2-blend]").forEach(b=>b.onclick=()=>setBlend(b.dataset.ak2Blend));
    $id("akSmartCut").onclick=smartAutoCut; $id("akExportCheck").onclick=()=>{exportReadiness();return window.akExportSelfTest&&window.akExportSelfTest()};
  }

  window.addEventListener("load",()=>setTimeout(advancedPanel,450));
  document.addEventListener("click",e=>{
    const b=e.target.closest("[data-ak2-template]"); if(b&&$id("tools")&&!$id("tools").contains(b))applyTemplate(b.dataset.ak2Template);
  });
  window.akExportSelfTest=function(){
    const r={mediaRecorder:!!window.MediaRecorder,canvasStream:!!(window.HTMLCanvasElement&&HTMLCanvasElement.prototype.captureStream),mp4:false,webm:false,pip:typeof preparePIPExport==="function"&&typeof drawPIPLayersExport==="function",keyframes:typeof keyframeExportState==="function"};
    if(window.MediaRecorder&&MediaRecorder.isTypeSupported){r.mp4=MediaRecorder.isTypeSupported("video/mp4;codecs=avc1.42E01E,mp4a.40.2")||MediaRecorder.isTypeSupported("video/mp4");r.webm=MediaRecorder.isTypeSupported("video/webm;codecs=vp9,opus")||MediaRecorder.isTypeSupported("video/webm");}
    setStatus("🧪 Export Test: "+(r.mp4?"MP4":"WebM fallback")+" • Canvas "+(r.canvasStream?"OK":"Unavailable")+" • PIP/Keyframes ready");
    return r;
  };

})();


/* AK SAFE KEYFRAME PREVIEW v1 — live interpolation + editor */
var selectedKeyframe=typeof selectedKeyframe!=="undefined"?selectedKeyframe:null;
function applyKeyframePreview(time){
  if(!Array.isArray(keyframes)||!files.length)return;
  const clip=currentIndex, f=files[clip];
  const t=Number(time||0), k=keyframeExportState(clip,t);
  const c=(typeof clipSettings!=="undefined"&&clipSettings[clip])||{};
  const state=k||{zoom:Number(c.zoom||1),rotation:Number(c.rotation||0),opacity:Number(c.opacity??1),x:Number(c.x||0),y:Number(c.y||0)};
  const v=document.getElementById("video");
  if(v){
    v.style.transform="translate("+Number(state.x||0)+"px,"+Number(state.y||0)+"px) scale("+Number(state.zoom||1)+") rotate("+Number(state.rotation||0)+"deg)"+(c.mirror?" scaleX(-1)":"");
    v.style.opacity=Math.max(0,Math.min(1,Number(state.opacity??1)));
  }
  const o=document.getElementById("overlay");
  if(o){o.dataset.kfZoom=String(state.zoom);o.dataset.kfRotation=String(state.rotation);o.dataset.kfOpacity=String(state.opacity)}
  return state;
}
function showKeyframeEditor(k){
  if(!k)return;
  selectedKeyframe=k;
  const z=Number(k.zoom??1),r=Number(k.rotation||0),op=Number(k.opacity??1),tm=Number(k.time||0);
  tools.innerHTML='<b>🎯 Keyframe Editor</b>'+
    '<label>Time <input id="kfTime" type="range" min="0" max="'+Math.max(0.1,Number((clipSettings[currentIndex]||{}).duration||video.duration||5))+'" step="0.01" value="'+tm+'"></label>'+
    '<label>Zoom <input id="kfZoom" type="range" min="1" max="3" step="0.1" value="'+z+'"> <span id="kfZoomVal">'+z.toFixed(1)+'x</span></label>'+
    '<label>Rotation <input id="kfRotation" type="range" min="-180" max="180" step="1" value="'+r+'"> <span id="kfRotationVal">'+r.toFixed(0)+'°</span></label>'+
    '<label>Opacity <input id="kfOpacity" type="range" min="0" max="1" step="0.01" value="'+op+'"> <span id="kfOpacityVal">'+Math.round(op*100)+'%</span></label>'+
    '<button id="kfJump">▶ Jump</button><button id="kfDuplicate">＋ Duplicate</button><button id="kfDelete">🗑 Delete</button><button id="kfBack">← Back</button>';
}
if(typeof video!=="undefined"&&!video.dataset.kfPreviewBound){
  video.dataset.kfPreviewBound="1";
  video.addEventListener("timeupdate",()=>{try{applyKeyframePreview(video.currentTime)}catch(e){}});
  video.addEventListener("seeked",()=>{try{applyKeyframePreview(video.currentTime)}catch(e){}});
}


/* AK ADVANCED TIMELINE v1 — safe override */
(function(){
  function clipLen(i){
    const f=files&&files[i],c=(clipSettings&&clipSettings[i])||{};
    if(f&&f.type&&f.type.startsWith("image/"))return Math.max(.25,Number(c.duration||photoDuration||3));
    const a=Number(c.trimStart||0),b=Number(c.trimEnd??(f&&f.duration)||0);
    return Math.max(.25,b>a?b-a:Number(f&&f.duration||3));
  }
  function draw(){
    const el=document.getElementById("track"); if(!el)return;
    const list=Array.isArray(files)?files:[];
    el.innerHTML="";
    el.style.position="relative";el.style.minHeight="58px";el.style.overflowX="auto";
    if(!list.length){el.textContent="Media जोडल्यावर Timeline येथे दिसेल";return}
    list.forEach((f,i)=>{
      const c=(clipSettings&&clipSettings[i])||{},dur=clipLen(i);
      const b=document.createElement("div");b.className="clip-block";b.dataset.clip=i;
      b.style.position="relative";b.style.display="inline-flex";b.style.width=Math.max(130,dur*32)+"px";b.style.minHeight="34px";b.style.boxSizing="border-box";
      b.textContent=(i===currentIndex?"▶ ":"")+((f&&f.name)||("Clip "+(i+1)))+" • "+dur.toFixed(1)+"s";
      b.title="Clip "+(i+1)+" • "+dur.toFixed(1)+"s";
      b.onclick=()=>{currentIndex=i;try{load(f)}catch(e){try{loadFile(f,i)}catch(x){}}draw()};
      const lane=document.createElement("div");lane.style.cssText="position:absolute;left:0;right:0;bottom:-18px;height:18px;pointer-events:none";
      const ks=(Array.isArray(keyframes)?keyframes:[]).filter(k=>k.clip===i);
      ks.forEach(k=>{
        const m=document.createElement("button");m.type="button";m.className="ak-kf-marker";m.textContent="◆";
        const max=Math.max(.01,dur),rel=Math.max(0,Math.min(1,Number(k.time||0)/max));
        m.style.left=(rel*100)+"%";m.title="Keyframe "+Number(k.time||0).toFixed(2)+"s";
        m.onclick=e=>{e.stopPropagation();selectedKeyframe=k;showKeyframeEditor(k);applyKeyframePreview(k.time)};
        m.onpointerdown=e=>{
          e.stopPropagation();e.preventDefault();m.setPointerCapture(e.pointerId);
          const rect=b.getBoundingClientRect(),startX=e.clientX,old=Number(k.time||0),scale=Math.max(.01,dur/Math.max(1,rect.width));
          const move=q=>{const nt=Math.max(0,Math.min(dur,old+(q.clientX-startX)*scale));k.time=nt;m.style.left=(nt/dur*100)+"%";if(selectedKeyframe===k)applyKeyframePreview(nt)};
          const up=()=>{m.removeEventListener("pointermove",move);m.removeEventListener("pointerup",up);keyframes.sort((a,b)=>a.clip-b.clip||a.time-b.time);renderOverlayTracks();msg("◆ Keyframe time बदलला ✓")};
          m.addEventListener("pointermove",move);m.addEventListener("pointerup",up);
        };
        lane.appendChild(m);
      });
      b.appendChild(lane);el.appendChild(b);
    });
    if(Array.isArray(splitPoints)&&splitPoints.length){
      const m=document.createElement("small");m.style.display="block";m.textContent="✂ Split: "+splitPoints.map(x=>fmt(x)).join(" • ");el.appendChild(m)
    }
  }
  window.renderTimeline=draw;
  window.renderKeyframeTracks=draw;
  window.akAdvancedTimeline=draw;
  if(typeof video!=="undefined"){
    video.addEventListener("timeupdate",()=>{try{draw()}catch(e){}});
  }
  window.addEventListener("load",()=>setTimeout(draw,700));
})();


/* AK TIMELINE PLAYHEAD v1 */
(function(){
  function update(){
    const el=document.getElementById("track"); if(!el||!Array.isArray(files)||!files.length)return;
    let p=el.querySelector(".ak-timeline-playhead");
    if(!p){p=document.createElement("div");p.className="ak-timeline-playhead";p.style.cssText="position:absolute;top:0;bottom:0;width:2px;background:#ff3b30;z-index:20;pointer-events:none;transform:translateX(-1px)";el.appendChild(p)}
    const idx=Math.max(0,Math.min(files.length-1,Number(currentIndex||0)));
    const f=files[idx],c=(clipSettings&&clipSettings[idx])||{};
    const dur=f&&f.type&&f.type.startsWith("image/")?Number(c.duration||photoDuration||3):Math.max(.01,Number(c.trimEnd??(f&&f.duration)||3)-Number(c.trimStart||0));
    const now=f&&f.type&&f.type.startsWith("image/")?Number(window.photoPreviewTime||0):Number(video&&video.currentTime||0);
    const ratio=Math.max(0,Math.min(1,(now-Number(c.trimStart||0))/Math.max(.01,dur)));
    const blocks=el.querySelectorAll(".clip-block");
    let x=0; for(let i=0;i<idx;i++)x+=Math.max(130,((files[i]&&files[i].duration)||Number((clipSettings[i]||{}).duration||photoDuration||3))*32);
    const b=blocks[idx]; if(b)x+=ratio*b.getBoundingClientRect().width;
    p.style.left=x+"px";
  }
  window.akUpdateTimelinePlayhead=update;
  if(typeof video!=="undefined")video.addEventListener("timeupdate",update);
  window.addEventListener("load",()=>setTimeout(update,900));
})();


/* AK TIMELINE SEEK v1 */
(function(){
  function bind(){
    const el=document.getElementById("track"); if(!el||el.dataset.seekBound)return;
    el.dataset.seekBound="1";
    el.addEventListener("pointerdown",function(e){
      if(e.target.closest(".ak-kf-marker,.clip-block button,input,select"))return;
      const b=e.target.closest(".clip-block"); if(!b)return;
      const idx=Number(b.dataset.index);
      if(!Number.isFinite(idx))return;
      const rect=b.getBoundingClientRect(), ratio=Math.max(0,Math.min(1,(e.clientX-rect.left)/Math.max(1,rect.width)));
      if(typeof currentIndex!=="undefined")currentIndex=idx;
      const f=files[idx],c=(clipSettings&&clipSettings[idx])||{};
      const start=Number(c.trimStart||0);
      const dur=f&&f.type&&f.type.startsWith("image/")?Number(c.duration||photoDuration||3):Math.max(.01,Number(c.trimEnd??(f&&f.duration)||3)-start);
      const t=start+ratio*dur;
      if(f&&f.type&&f.type.startsWith("image/")){
        window.photoPreviewTime=t;
        if(typeof renderPreview==="function")try{renderPreview()}catch(_){}
      }else if(typeof video!=="undefined"&&video){
        try{video.currentTime=t}catch(_){}
      }
      if(typeof renderTimeline==="function")try{renderTimeline()}catch(_){}
      if(typeof akUpdateTimelinePlayhead==="function")akUpdateTimelinePlayhead();
    });
  }
  window.akBindTimelineSeek=bind;
  window.addEventListener("load",()=>setTimeout(bind,500));
  const oldRender=window.renderTimeline;
  if(typeof oldRender==="function"){
    window.renderTimeline=function(){const r=oldRender.apply(this,arguments);setTimeout(bind,0);return r};
  }
})();


/* AK TIMELINE SCRUB v1 */
(function(){
  function bind(){
    const el=document.getElementById("track"); if(!el||el.dataset.scrubBound)return;
    el.dataset.scrubBound="1";
    let active=false;
    const seek=e=>{
      const b=e.target.closest(".clip-block"); if(!b)return;
      const idx=Number(b.dataset.index); if(!Number.isFinite(idx)||!files[idx])return;
      const rect=b.getBoundingClientRect();
      const ratio=Math.max(0,Math.min(1,(e.clientX-rect.left)/Math.max(1,rect.width)));
      if(typeof currentIndex!=="undefined"&&currentIndex!==idx){
        currentIndex=idx;
        try{if(typeof loadFile==="function")loadFile(idx)}catch(_){}
      }
      const c=(clipSettings&&clipSettings[idx])||{},f=files[idx],start=Number(c.trimStart||0);
      const dur=f.type&&f.type.startsWith("image/")?Number(c.duration||photoDuration||3):Math.max(.01,Number(c.trimEnd??f.duration||3)-start);
      const t=start+ratio*dur;
      if(f.type&&f.type.startsWith("image/")){window.photoPreviewTime=t;try{if(typeof renderPreview==="function")renderPreview()}catch(_){}}
      else if(typeof video!=="undefined"&&video){try{video.currentTime=t}catch(_){}}
      if(typeof applyKeyframePreview==="function")try{applyKeyframePreview(t)}catch(_){}
      if(typeof akUpdateTimelinePlayhead==="function")akUpdateTimelinePlayhead();
    };
    el.addEventListener("pointerdown",e=>{
      if(e.target.closest(".ak-kf-marker,.clip-block button,input,select"))return;
      if(!e.target.closest(".clip-block"))return;
      active=true; try{el.setPointerCapture(e.pointerId)}catch(_){}
      seek(e);
    });
    el.addEventListener("pointermove",e=>{if(active)seek(e)});
    const stop=()=>{active=false};
    el.addEventListener("pointerup",stop);el.addEventListener("pointercancel",stop);el.addEventListener("lostpointercapture",stop);
  }
  window.akBindTimelineScrub=bind;
  window.addEventListener("load",()=>setTimeout(bind,700));
})();


/* AK TIMELINE ZOOM + SCROLL v1 */
(function(){
  let scale=1;
  function bind(){
    const el=document.getElementById("track"); if(!el||el.dataset.zoomBound)return;
    el.dataset.zoomBound="1";
    const host=el.parentElement;
    if(host){host.style.overflowX="auto";host.style.overflowY="visible";host.style.webkitOverflowScrolling="touch";}
    const controls=document.createElement("div");
    controls.className="ak-timeline-zoom";
    controls.innerHTML='<button type="button" id="akTlMinus">−</button><input id="akTlZoom" type="range" min="0.5" max="3" step="0.1" value="1"><button type="button" id="akTlPlus">+</button><span id="akTlZoomVal">100%</span>';
    el.parentElement&&el.parentElement.insertBefore(controls,el);
    const apply=()=>{
      const z=Math.max(.5,Math.min(3,scale));
      el.style.setProperty("--ak-timeline-scale",z);
      el.querySelectorAll(".clip-block").forEach(b=>{b.style.width=(parseFloat(b.dataset.baseWidth||"130")*z)+"px"});
      const inp=controls.querySelector("#akTlZoom"),val=controls.querySelector("#akTlZoomVal");
      if(inp)inp.value=z;if(val)val.textContent=Math.round(z*100)+"%";
      if(typeof akUpdateTimelinePlayhead==="function")akUpdateTimelinePlayhead();
    };
    controls.querySelector("#akTlMinus").onclick=()=>{scale=Math.max(.5,scale-.1);apply()};
    controls.querySelector("#akTlPlus").onclick=()=>{scale=Math.min(3,scale+.1);apply()};
    controls.querySelector("#akTlZoom").oninput=e=>{scale=Number(e.target.value)||1;apply()};
    window.akTimelineZoom=apply;
  }
  window.akBindTimelineZoom=bind;
  window.addEventListener("load",()=>setTimeout(bind,900));
  const old=window.renderTimeline;
  if(typeof old==="function")window.renderTimeline=function(){
    const r=old.apply(this,arguments);
    setTimeout(()=>{const el=document.getElementById("track");if(el){el.querySelectorAll(".clip-block").forEach(b=>{if(!b.dataset.baseWidth)b.dataset.baseWidth=parseFloat(b.style.width)||130})}bind();if(typeof akTimelineZoom==="function")akTimelineZoom()},0);
    return r;
  };
})();


/* AK TRACK LOCK + MUTE/SOLO v1 */
(function(){
  const state=window.akTrackState||{VIDEO1:{locked:false,muted:false,solo:false},VIDEO2:{locked:false,muted:false,solo:false},TEXT:{locked:false,muted:false,solo:false},AUDIO:{locked:false,muted:false,solo:false}};
  window.akTrackState=state;
  function ensure(){
    const host=document.getElementById("track"); if(!host)return;
    let bar=document.getElementById("akTrackControls");
    if(!bar){
      bar=document.createElement("div");bar.id="akTrackControls";bar.style.cssText="display:flex;gap:6px;flex-wrap:wrap;padding:6px;border-bottom:1px solid rgba(128,128,128,.25)";
      host.parentElement&&host.parentElement.insertBefore(bar,host);
    }
    bar.innerHTML="";
    Object.keys(state).forEach(name=>{
      const s=state[name],wrap=document.createElement("span");
      wrap.style.cssText="display:inline-flex;align-items:center;gap:3px;margin-right:5px";
      const label=document.createElement("b");label.textContent=name==="VIDEO1"?"VIDEO 1":name==="VIDEO2"?"VIDEO 2":name;label.style.fontSize="11px";
      const lock=document.createElement("button");lock.type="button";lock.textContent=s.locked?"🔒":"🔓";lock.title="Lock track";
      const mute=document.createElement("button");mute.type="button";mute.textContent=s.muted?"🔇":"🔊";mute.title="Mute track";
      const solo=document.createElement("button");solo.type="button";solo.textContent=s.solo?"S":"S";solo.title="Solo track";solo.style.fontWeight=s.solo?"700":"400";
      lock.onclick=()=>{s.locked=!s.locked;apply();};
      mute.onclick=()=>{s.muted=!s.muted;apply();};
      solo.onclick=()=>{s.solo=!s.solo;apply();};
      wrap.append(label,lock,mute,solo);bar.appendChild(wrap);
    });
    apply();
  }
  function apply(){
    const host=document.getElementById("track");if(!host)return;
    host.dataset.akTrackState=JSON.stringify(state);
    host.querySelectorAll(".clip-block").forEach(b=>{
      const i=Number(b.dataset.index),type=(files[i]&&files[i].type)||"";
      const key=type.startsWith("audio/")?"AUDIO":"VIDEO1";
      const st=state[key]||state.VIDEO1;
      b.style.opacity=st.muted?.45:1;
      b.style.pointerEvents=st.locked?"none":"";
      b.dataset.locked=st.locked?"1":"0";
    });
  }
  window.akTrackControls=ensure;
  window.akIsTrackLocked=function(key){return !!(state[key]&&state[key].locked)};
  window.addEventListener("load",()=>setTimeout(ensure,1100));
  const old=window.renderTimeline;
  if(typeof old==="function")window.renderTimeline=function(){const r=old.apply(this,arguments);setTimeout(ensure,0);return r};
})();


/* AK MULTI TRACK LANES v1 */
(function(){
  function renderLanes(){
    const host=document.getElementById("track"); if(!host)return;
    let lanes=document.getElementById("akMultiTrackLanes");
    if(!lanes){
      lanes=document.createElement("div");lanes.id="akMultiTrackLanes";
      lanes.style.cssText="display:flex;flex-direction:column;gap:3px;margin-top:6px";
      host.parentElement&&host.parentElement.appendChild(lanes);
    }
    const names=["VIDEO 1","VIDEO 2","TEXT","AUDIO"];
    lanes.innerHTML="";
    names.forEach((name,idx)=>{
      const row=document.createElement("div");
      row.dataset.track=name;
      row.style.cssText="position:relative;min-height:34px;border:1px solid rgba(128,128,128,.22);border-radius:5px;overflow:hidden";
      const label=document.createElement("div");
      label.textContent=name;
      label.style.cssText="position:absolute;left:4px;top:8px;font-size:10px;font-weight:700;opacity:.7;z-index:3;pointer-events:none";
      row.appendChild(label);
      const content=document.createElement("div");
      content.style.cssText="margin-left:58px;min-height:34px;display:flex;align-items:center;gap:3px;overflow:hidden";
      if(name==="VIDEO 1"){
        (Array.isArray(files)?files:[]).forEach((f,i)=>{
          const b=document.createElement("div");
          b.textContent=(f.name||("Clip "+(i+1))).slice(0,18);
          b.dataset.index=i;b.style.cssText="height:25px;min-width:90px;padding:5px 7px;box-sizing:border-box;border:1px solid rgba(128,128,128,.35);border-radius:4px;font-size:10px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;cursor:pointer";
          content.appendChild(b);
        });
      }else if(name==="TEXT"){
        const items=Array.isArray(texts)?texts:[];
        items.forEach((t,i)=>{const b=document.createElement("div");b.textContent="T "+(i+1);b.style.cssText="height:25px;min-width:70px;padding:5px 7px;border-radius:4px;border:1px solid rgba(128,128,128,.35);font-size:10px";content.appendChild(b)});
      }else if(name==="AUDIO"){
        const items=Array.isArray(audioTracks)?audioTracks:(Array.isArray(audioFiles)?audioFiles:[]);
        items.forEach((a,i)=>{const b=document.createElement("div");b.textContent="♫ "+(a.name||("Audio "+(i+1))).slice(0,16);b.style.cssText="height:25px;min-width:100px;padding:5px 7px;border-radius:4px;border:1px solid rgba(128,128,128,.35);font-size:10px";content.appendChild(b)});
      }else{
        const b=document.createElement("div");b.textContent="PIP / Overlay";b.style.cssText="height:25px;min-width:100px;padding:5px 7px;border-radius:4px;border:1px dashed rgba(128,128,128,.35);font-size:10px";content.appendChild(b);
      }
      row.appendChild(content);lanes.appendChild(row);
    });
  }
  window.akRenderMultiTrackLanes=renderLanes;
  window.addEventListener("load",()=>setTimeout(renderLanes,1300));
  const old=window.renderTimeline;
  if(typeof old==="function")window.renderTimeline=function(){const r=old.apply(this,arguments);setTimeout(renderLanes,0);return r};
})();


/* AK MULTI TRACK SAFETY FIX v1 */
(function(){
  const old=window.akRenderMultiTrackLanes;
  window.akRenderMultiTrackLanes=function(){
    try{
      if(typeof old==="function")old();
    }catch(e){
      const lanes=document.getElementById("akMultiTrackLanes"); if(!lanes)return;
      const host=document.getElementById("track"); if(!host)return;
      const filesSafe=Array.isArray(window.files)?window.files:[];
      lanes.innerHTML="";
      ["VIDEO 1","VIDEO 2","TEXT","AUDIO"].forEach(name=>{
        const row=document.createElement("div");row.dataset.track=name;
        row.style.cssText="position:relative;min-height:34px;border:1px solid rgba(128,128,128,.22);border-radius:5px;overflow:hidden";
        const label=document.createElement("div");label.textContent=name;
        label.style.cssText="position:absolute;left:4px;top:8px;font-size:10px;font-weight:700;opacity:.7;z-index:3";
        const content=document.createElement("div");content.style.cssText="margin-left:58px;min-height:34px;display:flex;align-items:center;gap:3px;overflow:hidden";
        if(name==="VIDEO 1")filesSafe.forEach((f,i)=>{const b=document.createElement("div");b.textContent=(f.name||("Clip "+(i+1))).slice(0,18);b.dataset.index=i;b.style.cssText="height:25px;min-width:90px;padding:5px 7px;box-sizing:border-box;border:1px solid rgba(128,128,128,.35);border-radius:4px;font-size:10px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis";content.appendChild(b)});
        else{const b=document.createElement("div");b.textContent=name==="VIDEO 2"?"PIP / Overlay":name==="TEXT"?"Text layer":"Audio layer";b.style.cssText="height:25px;min-width:100px;padding:5px 7px;border-radius:4px;border:1px dashed rgba(128,128,128,.35);font-size:10px";content.appendChild(b)}
        row.append(label,content);lanes.appendChild(row);
      });
    }
  };
  window.addEventListener("load",()=>setTimeout(()=>window.akRenderMultiTrackLanes(),1500));
})();


/* AK MULTI TRACK CLIP DRAG v1 */
(function(){
  function bind(){
    const lanes=document.getElementById("akMultiTrackLanes"); if(!lanes||lanes.dataset.dragBound)return;
    lanes.dataset.dragBound="1";
    let drag=null;
    lanes.addEventListener("pointerdown",e=>{
      const b=e.target.closest("[data-index]"); if(!b)return;
      const row=b.closest("[data-track]"); if(!row||row.dataset.track!=="VIDEO 1")return;
      const idx=Number(b.dataset.index); if(!Number.isFinite(idx)||!files[idx])return;
      drag={b,idx,startX:e.clientX,baseX:0};
      b.setPointerCapture?.(e.pointerId); b.style.cursor="grabbing"; e.preventDefault();
    });
    lanes.addEventListener("pointermove",e=>{
      if(!drag)return;
      const dx=e.clientX-drag.startX;
      drag.b.style.transform="translateX("+dx+"px)";
    });
    const stop=e=>{
      if(!drag)return;
      const dx=e.clientX-drag.startX;
      drag.b.style.transform="";
      const pxPerSec=32*Math.max(.5,Math.min(3,Number(window.akTimelineScale||1)));
      const shift=Math.round((dx/pxPerSec)*100)/100;
      const idx=drag.idx,c=(clipSettings&&clipSettings[idx])||{};
      c.timelineOffset=Math.max(0,Number(c.timelineOffset||0)+shift);
      if(clipSettings)clipSettings[idx]=c;
      drag.b.style.cursor="pointer";
      drag=null;
      try{if(typeof saveProject==="function")saveProject()}catch(_){}
      try{if(typeof renderTimeline==="function")renderTimeline()}catch(_){}
      try{if(typeof akRenderMultiTrackLanes==="function")setTimeout(akRenderMultiTrackLanes,0)}catch(_){}
    };
    lanes.addEventListener("pointerup",stop);lanes.addEventListener("pointercancel",()=>{if(drag){drag.b.style.transform="";drag=null}});
  }
  window.akBindMultiTrackDrag=bind;
  window.addEventListener("load",()=>setTimeout(bind,1700));
  const old=window.akRenderMultiTrackLanes;
  if(typeof old==="function")window.akRenderMultiTrackLanes=function(){const r=old.apply(this,arguments);setTimeout(bind,0);return r};
})();
