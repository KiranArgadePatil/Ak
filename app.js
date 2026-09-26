tools.onclick=e=>{\n const t=e.target; if(t.dataset.chroma){settings().chroma=t.dataset.chroma==="on";msg("Chroma Key "+(settings().chroma?"ON":"OFF")+" ✓")}  if(t.dataset.effect){settings().effect=t.dataset.effect;applyEffectPreview();msg("Effect: "+t.dataset.effect+" ✓")} if(t.dataset.mask){settings().mask=t.dataset.mask;applyMaskPreview();msg("Mask: "+t.dataset.mask+" ✓")}  if(t.id==="applyExport"){exportConfig.width=$("#exQuality").value==="720"?720:1080;exportConfig.height=exportConfig.width===720?405:608;exportConfig.fps=+$("#exFps").value;exportConfig.bitrate=+$("#exBitrate").value;msg("Export settings लागू झाले ✓");} if(t.id==="addKeyframe"){const f=files[currentIndex],c=clipSettings[currentIndex]||{},isImage=f&&f.type.startsWith("image/"),time=isImage?Math.max(0,Math.min(Number(c.duration||photoDuration||5),Number(window.photoPreviewTime||0))):Math.max(Number(c.trimStart||0),Math.min(Number(c.trimEnd??video.duration),video.currentTime));const k={clip:currentIndex,time:time,zoom:settings().zoom,rotation:settings().rotation,opacity:settings().opacity};keyframes.push(k);keyframes.sort((a,b)=>a.clip-b.clip||a.time-b.time);selectedKeyframe=k;$("#kfList").textContent="Keyframes: "+keyframes.filter(k=>k.clip===currentIndex).length;renderKeyframeTracks();msg("Current Time वर Keyframe जोडला ✓")} if(t.dataset.sticker){settings().sticker=t.dataset.sticker;overlay.textContent=(overlay.textContent||"")+" "+t.dataset.sticker;renderOverlayTracks();msg("Sticker जोडला ✓")} if(t.dataset.textanim){settings().textAnimation=t.dataset.textanim;msg("Text animation: "+t.dataset.textanim+" ✓")} if(t.dataset.mask){settings().mask=t.dataset.mask;applyMaskPreview();msg("Mask: "+t.dataset.mask+" ✓")} if(t.id==="clearSticker"){overlay.textContent="";msg("Sticker clear ✓")} if(t.id==="captionStart"){if(!("webkitSpeechRecognition" in window||"SpeechRecognition" in window)){msg("या browser मध्ये Speech Recognition उपलब्ध नाही.",true)}else{const R=window.SpeechRecognition||window.webkitSpeechRecognition,r=new R();r.lang="mr-IN";r.continuous=true;r.onresult=e=>{let x="";for(let i=e.resultIndex;i<e.results.length;i++)x+=e.results[i][0].transcript+" ";overlay.textContent=x.trim();settings().text=x.trim();};r.start();msg("Auto Caption सुरू ✓")}} if(t.id==="kfTime"&&selectedKeyframe){const f=files[selectedKeyframe.clip],c=clipSettings[selectedKeyframe.clip]||{},isImage=f&&f.type.startsWith("image/"),min=isImage?0:Number(c.trimStart||0),max=isImage?Number(c.duration||photoDuration||5):Math.max(min,Number(c.trimEnd??video.duration));selectedKeyframe.time=Math.max(min,Math.min(max,Number(t.value)||0));keyframes.sort((a,b)=>a.clip-b.clip||a.time-b.time);renderKeyframeTracks();if(selectedKeyframe.clip===currentIndex){if(isImage){window.photoPreviewTime=selectedKeyframe.time;applyKeyframePreview(selectedKeyframe.time)}else video.currentTime=selectedKeyframe.time}msg("Keyframe time updated ✓");return} if(["kfZoom","kfRotation","kfOpacity"].includes(t.id)&&selectedKeyframe){const v=Number(t.value);if(t.id==="kfZoom"){$("#kfZoomVal").textContent=v.toFixed(1)+"x";selectedKeyframe.zoom=v}if(t.id==="kfRotation"){$("#kfRotationVal").textContent=v.toFixed(0)+"°";selectedKeyframe.rotation=v}if(t.id==="kfOpacity"){$("#kfOpacityVal").textContent=Math.round(v*100)+"%";selectedKeyframe.opacity=v}applyKeyframePreview(selectedKeyframe.time);renderKeyframeTracks();return} if(t.id==="kfJump"&&selectedKeyframe){const f=files[selectedKeyframe.clip],c=clipSettings[selectedKeyframe.clip]||{},tt=Number(selectedKeyframe.time||0);if(f&&f.type.startsWith("image/")){window.photoPreviewTime=tt;applyKeyframePreview(tt)}else if(selectedKeyframe.clip===currentIndex){video.currentTime=tt}msg("Keyframe वर Jump केले ✓");return} if(t.id==="kfDelete"&&selectedKeyframe){const n=keyframes.indexOf(selectedKeyframe);if(n>=0)keyframes.splice(n,1);selectedKeyframe=null;renderKeyframeTracks();act("keyframes");msg("Keyframe Delete ✓");return} if(t.id==="kfBack"){act("keyframes");return} if(t.id==="kfDuplicate"&&selectedKeyframe){const c=clipSettings[currentIndex]||{},isImage=files[currentIndex]&&files[currentIndex].type.startsWith("image/"),hi=isImage?Number(c.duration||photoDuration||5):Number(c.trimEnd??video.duration),copy={clip:selectedKeyframe.clip,time:Math.min(hi,Number(selectedKeyframe.time||0)+0.5),zoom:selectedKeyframe.zoom,rotation:selectedKeyframe.rotation,opacity:selectedKeyframe.opacity};if(copy.time<=selectedKeyframe.time)copy.time=Math.min(hi,Number(selectedKeyframe.time||0)+0.1);keyframes.push(copy);keyframes.sort((a,b)=>a.clip-b.clip||a.time-b.time);showKeyframeEditor(copy);renderKeyframeTracks();msg("Keyframe Duplicate ✓");return} if(t.id==="kfZoom"&&selectedKeyframe){selectedKeyframe.zoom=+t.value;applyKeyframePreview(selectedKeyframe.time)} if(t.id==="kfRotation"&&selectedKeyframe){selectedKeyframe.rotation=+t.value;applyKeyframePreview(selectedKeyframe.time)} if(t.id==="kfOpacity"&&selectedKeyframe){selectedKeyframe.opacity=+t.value;applyKeyframePreview(selectedKeyframe.time)} if(t.id==="clearKeyframes"){for(let i=keyframes.length-1;i>=0;i--)if(keyframes[i].clip===currentIndex)keyframes.splice(i,1);msg("Keyframes clear ✓");act("keyframes")}
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
async 


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
function setupMultiTrackRows(){const root=document.getElementById("overlayTracks");if(!root)return;["VIDEO 1","VIDEO 2","TEXT","STICKER","AUDIO","CAPTION","EFFECT"].forEach(label=>{if(root.querySelector('[data-track="'+label+'"]'))return;const r=document.createElement("div");r.className="track-row";r.dataset.track=label;r.innerHTML="<b>"+label+"</b><div style=\"position:relative;min-height:28px;background:#151923\"></div>";root.appendChild(r)})}
function splitCaptionAtPlayhead(){const now=typeof video!=="undefined"?Number(video.currentTime||0):0;const a=captionState();const x=a.find(x=>now>x.start&&now<x.end);if(!x)return;const old=x.end;x.end=now;a.push({text:x.text,start:now,end:old});a.sort((p,q)=>p.start-q.start);renderCaptions();msg("Caption split ✓")}
function advancedEditorPack(){
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
 const p={normal:[1,1,1,1,1],montage:[1,1.5,.7,1.5,1],hero:[.5,.7,1,1.5,2],bullet:[1,2,2,2,1],smooth:[.8,1,1.2,1,0.8]};
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
function detectAudioBeats(){if(typeof musicFile==="undefined"||!musicFile){msg("आधी Audio जोडा.",true);return}try{const C=window.AudioContext||window.webkitAudioContext;if(!C)return;msg("Audio beats शोधत आहे…");const ctx=new C(),buf=await ctx.decodeAudioData(await musicFile.arrayBuffer()),data=buf.getChannelData(0),rate=buf.sampleRate,win=Math.floor(rate*.05),hop=Math.floor(rate*.025),energy=[];for(let i=0;i+win<data.length;i+=hop){let sum=0;for(let j=0;j<win;j+=8){const v=data[i+j]||0;sum+=v*v}energy.push(Math.sqrt(sum/Math.max(1,Math.floor(win/8))))}const beats=[],avg=energy.reduce((a,b)=>a+b,0)/Math.max(1,energy.length);for(let i=2;i<energy.length-2;i++){const e=energy[i],thr=avg*1.45;if(e>thr&&e>=energy[i-1]&&e>=energy[i+1]){const t=i*hop/rate;if(!beats.length||t-beats[beats.length-1]>.28)beats.push(t)}}const a=audioTimelineState();a.beats=beats.slice(0,300);try{ctx.close()}catch(e){}renderAudioBeats();msg(beats.length+" beat markers सापडले ✓")}catch(e){console.warn(e);msg("Beat detection failed",true)}}
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
async async function buildAudioExportStream(baseStream,duration){if(typeof musicFile==="undefined"||!musicFile)return baseStream;try{const C=window.AudioContext||window.webkitAudioContext;if(!C)return baseStream;const ctx=new C(),dest=ctx.createMediaStreamDestination(),au=new Audio();au.src=URL.createObjectURL(musicFile);au.preload="auto";await new Promise((res,rej)=>{au.oncanplay=res;au.onerror=rej});const src=ctx.createMediaElementSource(au),gain=ctx.createGain();src.connect(gain);gain.connect(dest);gain.connect(ctx.destination);const out=new MediaStream();baseStream.getVideoTracks().forEach(t=>out.addTrack(t));dest.stream.getAudioTracks().forEach(t=>out.addTrack(t));const a=audioTimelineState(),start=Number(a.start||0),offset=Number(a.offset||0),end=a.end==null?au.duration:Number(a.end),clipDur=Math.max(.05,end-start);au.currentTime=Math.min(start,Math.max(0,au.duration-.01));const tick=()=>{const elapsed=Math.max(0,performance.now()/1000-(window.__audioExportT||performance.now()/1000));const local=start+elapsed;gain.gain.value=audioEnvelope(local);if(local>=end||elapsed>=duration){au.pause();try{ctx.close()}catch(e){}}else requestAnimationFrame(tick)};window.__audioExportT=performance.now()/1000+offset;await ctx.resume();au.play();tick();return out}catch(e){console.warn("Audio export mix fallback",e);return baseStream}}
function setupAudioPreview(){if(typeof musicFile==="undefined"||!musicFile)return;const el=document.getElementById("audioPreview");if(!el)return;el.src=URL.createObjectURL(musicFile);el.style.display="none";el.onloadedmetadata=()=>{const a=audioTimelineState();if(a.end==null)a.end=el.duration;};el.ontimeupdate=()=>{const a=audioTimelineState(),t=el.currentTime;el.volume=audioEnvelope(t);if(t>=Number(a.end??Infinity)){el.pause();el.currentTime=Number(a.start||0)}}}
function syncTimelineAudio(){const aEl=document.getElementById("audioPreview");if(!aEl||typeof video==="undefined"||!video)return;const a=audioTimelineState(),pos=Number(a.offset||0),start=Number(a.start||0),end=a.end==null?Infinity:Number(a.end),vt=Number(video.currentTime||0),at=start+(vt-pos);if(at>=start&&at<end){if(Math.abs(aEl.currentTime-at)>.12)try{aEl.currentTime=Math.min(at,Math.max(0,aEl.duration-.01))}catch(e){}aEl.volume=audioEnvelope(at)}else{aEl.pause();aEl.volume=0}}
function bindTimelineAudioSync(){if(typeof video==="undefined"||video.dataset.audioSync)return;video.dataset.audioSync="1";["play","pause","seeking","seeked","timeupdate"].forEach(ev=>video.addEventListener(ev,()=>{const aEl=document.getElementById("audioPreview");if(ev==="play"){if(aEl) aEl.play().catch(()=>{})}else if(ev==="pause"&&aEl)aEl.pause();syncTimelineAudio()}));const tick=()=>{if(!video.paused)syncTimelineAudio();requestAnimationFrame(tick)};requestAnimationFrame(tick)}
function syncAudioPreview(){const el=document.getElementById("audioPreview");if(!el||typeof musicFile==="undefined"||!musicFile)return;const a=audioTimelineState(),target=Number(a.start||0)+Math.max(0,(typeof video!=="undefined"?video.currentTime:0)-Number(a.offset||0));if(target>=Number(a.start||0)&&target<Number(a.end??Infinity))el.currentTime=Math.min(target,Math.max(0,el.duration-.01));el.volume=audioEnvelope(el.currentTime)}
function audioEnvelope(t){const c=typeof settings==="function"?settings():{},a=audioTimelineState(),v=Math.max(0,Math.min(1,Number(c.audioVolume??.7)));const start=Number(a.start||0),end=a.end==null?Infinity:Number(a.end),fi=Math.max(0,Number(c.audioFadeIn||0)),fo=Math.max(0,Number(c.audioFadeOut||0));if(t<start||t>=end)return 0;let g=1;if(fi)g=Math.min(g,Math.max(0,(t-start)/fi));if(fo&&end<Infinity)g=Math.min(g,Math.max(0,(end-t)/fo));return v*g}
function exportVideo(){
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
   if(f.type.startsWith("image/")){\n     const img=new Image();img.src=url;await new Promise((resolve,reject)=>{img.onload=resolve;img.onerror=reject});\n     const until=performance.now()+(cs.duration||photoDuration)*1000;\n     await new Promise(resolve=>{const drawPhoto=()=>{ctx.fillStyle="#000";ctx.fillRect(0,0,canvas.width,canvas.height);const src=img.width/img.height,dst=canvas.width/canvas.height;let dw=canvas.width,dh=canvas.height,dx=0,dy=0;if(src>dst){dh=canvas.height;dw=dh*src;dx=(canvas.width-dw)/2}else{dw=canvas.width;dh=dw/src;dy=(canvas.height-dh)/2}chromaCtx.clearRect(0,0,chromaCanvas.width,chromaCanvas.height);chromaCtx.filter="none";chromaCtx.drawImage(img,0,0,chromaCanvas.width,chromaCanvas.height);applyChromaCanvas(chromaCtx,chromaCanvas,cs.chromaStrength);ctx.save();if(cs.mask==="circle"){ctx.beginPath();ctx.arc(canvas.width/2,canvas.height/2,Math.min(canvas.width,canvas.height)*.46,0,Math.PI*2);ctx.clip()}else if(cs.mask==="rect"){ctx.beginPath();ctx.roundRect(canvas.width*.05,canvas.height*.05,canvas.width*.9,canvas.height*.9,18);ctx.clip()}const kfPhoto=keyframeExportState(i,(performance.now()-(until-(cs.duration||photoDuration||5)*1000))/1000)||{zoom:1,rotation:0,opacity:1};ctx.globalAlpha=kfPhoto.opacity;ctx.save();ctx.translate(canvas.width/2,canvas.height/2);ctx.rotate(Number(kfPhoto.rotation||0)*Math.PI/180);ctx.scale(kfPhoto.zoom,kfPhoto.zoom);ctx.drawImage(chromaCanvas,dx-canvas.width/2,dy-canvas.height/2,dw,dh);ctx.restore();ctx.globalAlpha=1;if(overlay.textContent){const tx=((cs.textX??50)/100)*canvas.width,ty=((cs.textY??textY)/100)*canvas.height,sc=Number(cs.textScale||1),rot=Number(cs.textRotation||0),dur=Math.max(.2,Number(cs.duration||photoDuration||5)),p=Math.max(0,Math.min(1,(performance.now()-until+(dur*1000))/(dur*1000))),a=animationProgress(cs.textAnimation||"none",Math.min(1,p/.35));ctx.save();ctx.globalAlpha=a.opacity;ctx.translate(tx,ty+(a.y*canvas.height));ctx.rotate(rot*Math.PI/180);ctx.scale(sc*a.scale,sc*a.scale);ctx.font=Math.max(textSize,canvas.width*.055)+"px system-ui";ctx.textAlign="center";ctx.fillStyle="#fff";ctx.strokeStyle="#000";ctx.lineWidth=7;ctx.strokeText(overlay.textContent,0,0);ctx.fillText(overlay.textContent,0,0);ctx.restore()}if(performance.now()>=until){resolve();return}requestAnimationFrame(drawPhoto)};requestAnimationFrame(drawPhoto)});URL.revokeObjectURL(url);first=false;continue;\n   }\n   startTime=Math.max(0,cs.trimStart??0);endTime=Math.min(video.duration,cs.trimEnd??video.duration)
   video.currentTime=startTime;await new Promise(r=>video.addEventListener("seeked",r,{once:true}));
   const transition=Math.max(.1,Math.min(2,Number(cs.transitionDuration||.45)));
   if(!first){
     if(cs.transition==="fade" || window.transitionType==="fade"){
       ctx.fillStyle="#000";ctx.fillRect(0,0,canvas.width,canvas.height);
       const steps=Math.max(4,Math.round(transition*24));for(let a=0;a<steps;a++){ctx.globalAlpha=a/Math.max(1,steps-1);const kf=keyframeExportState(i,video.currentTime);drawKeyframedVideo(ctx,video,canvas,kf);await new Promise(r=>setTimeout(r,transition*1000/steps))}
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
       const kfNow=keyframeExportState(i,video.currentTime)||{zoom:zoom,rotation:0,opacity:1};ctx.save();if(csNow.mask==="circle"){ctx.beginPath();ctx.arc(canvas.width/2,canvas.height/2,Math.min(canvas.width,canvas.height)*.46,0,Math.PI*2);ctx.clip()}else if(csNow.mask==="rect"){ctx.beginPath();ctx.roundRect(canvas.width*.05,canvas.height*.05,canvas.width*.9,canvas.height*.9,18);ctx.clip()}ctx.globalAlpha=kfNow.opacity;ctx.filter=video.style.filter||"none";ctx.translate(canvas.width/2,canvas.height/2);ctx.rotate(Number(kfNow.rotation||0)*Math.PI/180);ctx.scale(kfNow.zoom,kfNow.zoom);ctx.drawImage(chromaCanvas,dx-canvas.width/2,dy-canvas.height/2,dw,dh);ctx.restore();ctx.filter="none";ctx.globalAlpha=1;
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
let selectedKeyframe=null;
function showKeyframeEditor(k){selectedKeyframe=k;tools.innerHTML='<b>Keyframe Editor</b><label>Time <input id="kfTime" type="number" min="0" step=".1" value="'+Number(k.time||0).toFixed(1)+'"></label><label>Zoom <input id="kfZoom" type="range" min=".2" max="4" step=".1" value="'+Number(k.zoom??1)+'"><span id="kfZoomVal">'+Number(k.zoom??1).toFixed(1)+'x</span></label><label>Rotation <input id="kfRotation" type="range" min="-360" max="360" step="1" value="'+Number(k.rotation??0)+'"><span id="kfRotationVal">'+Number(k.rotation??0).toFixed(0)+'°</span></label><label>Opacity <input id="kfOpacity" type="range" min="0" max="1" step=".01" value="'+Number(k.opacity??1)+'"><span id="kfOpacityVal">'+Math.round(Number(k.opacity??1)*100)+'%</span></label><div class="hint">Slider बदलताना Preview लगेच अपडेट होईल.</div><button id="kfDuplicate">Duplicate Keyframe</button><button id="kfJump">Jump to Keyframe</button><button id="kfDelete">Delete Keyframe</button><button id="kfBack">← Keyframes</button>';}
function renderKeyframeTracks(){const lane=document.querySelector("#timeline");if(!lane)return;document.querySelectorAll(".keyframe-marker").forEach(x=>x.remove());const pxPerSec=32,c=clipSettings[currentIndex]||{},isImage=files[currentIndex]&&files[currentIndex].type.startsWith("image/"),trimStart=Number(c.trimStart||0),clipStart=files.slice(0,currentIndex).reduce((a,_,k)=>a+Math.max(.1,(clipSettings[k]||{}).duration||photoDuration||5),0),dur=isImage?Number(c.duration||photoDuration||5):Math.max(.1,Number(c.trimEnd??video.duration)-trimStart);keyframes.filter(k=>k.clip===currentIndex).sort((a,b)=>a.time-b.time).forEach((k,n)=>{const local=isImage?Number(k.time||0):Number(k.time||0)-trimStart,x=document.createElement("div");x.className="keyframe-marker";x.style.left=((clipStart+Math.max(0,Math.min(dur,local)))*pxPerSec)+"px";x.title="Keyframe "+(n+1)+" • "+fmt(Math.max(0,local));x.style.pointerEvents="auto";x.style.touchAction="none";x.onclick=e=>{e.stopPropagation();showKeyframeEditor(k)};x.onpointerdown=e=>{e.stopPropagation();x.setPointerCapture(e.pointerId);const sx=e.clientX,st=local;x.onpointermove=m=>{const next=Math.max(0,Math.min(dur,Math.round((st+(m.clientX-sx)/pxPerSec)*10)/10));k.time=isImage?next:trimStart+next;x.style.left=((clipStart+next)*pxPerSec)+"px"};x.onpointerup=x.onpointercancel=()=>{x.onpointermove=null;keyframes.sort((a,b)=>a.clip-b.clip||a.time-b.time);renderKeyframeTracks()}};lane.appendChild(x)});}
function applyKeyframePreview(time){
 const list=typeof keyframes==="undefined"?[]:keyframes.filter(k=>k.clip===currentIndex).sort((a,b)=>a.time-b.time);
 if(!list.length)return;
 let a=list[0],b=list[list.length-1];
 if(time<=a.time)b=a; else if(time>=b.time)a=list[list.length-1]; else{
  for(let i=0;i<list.length-1;i++)if(time>=list[i].time&&time<=list[i+1].time){a=list[i];b=list[i+1];break}
 }
 const span=Math.max(.001,b.time-a.time),raw=a===b?0:Math.max(0,Math.min(1,(time-a.time)/span)),p=raw*raw*(3-2*raw);
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
if(feature==="transformOverlay"){showOverlayTransformControls();return}\n if(feature==="stickers"){tools.innerHTML='<b>😀 Stickers</b><div class="sticker-grid"><button data-sticker="⭐">⭐</button><button data-sticker="❤️">❤️</button><button data-sticker="🔥">🔥</button><button data-sticker="✨">✨</button><button data-sticker="🎉">🎉</button><button data-sticker="👍">👍</button></div><label>Size <input id="stickerSize" type="range" min="30" max="180" value="70"></label><button id="clearSticker">Clear</button>';return}
 if(feature==="textanim"){tools.innerHTML='<b>🅰️ Text Animation</b><button data-textanim="none">None</button><button data-textanim="pop">Pop</button><button data-textanim="fade">Fade</button><button data-textanim="slide">Slide</button>';return}
 if(feature==="captions"){tools.innerHTML='<b>📝 Auto Captions</b><button id="captionStart">🎙️ Start Speech Captions</button><div class="hint">Browser speech recognition उपलब्ध असल्यास captions previewमध्ये दिसतील.</div>';return}
 if(feature==="chroma"){tools.innerHTML='<b>🟩 Chroma Key</b><label>Green removal strength <input id="chromaStrength" type="range" min="0" max="1" step=".05" value=".6"></label><div class="hint">Green-screen preview/export pipeline पुढील चरणात canvas keying वापरेल.</div>';return}
 if(feature==="mask"){tools.innerHTML='<b>🎭 Mask</b><button data-mask="circle">Circle</button><button data-mask="rect">Rectangle</button><button data-mask="none">None</button>';return}
}
function act(a){\n if(!restoringHistory) pushHistory();
 if(!video.src && !currentImage){tools.innerHTML="<b>आधी Photo / Video निवडा.</b>";return}
  if(a==="keyframes"){tools.innerHTML="<b>Keyframe</b><button id=\"addKeyframe\">Add Keyframe</button><button id=\"clearKeyframes\">Clear Keyframes</button><div id=\"kfList\">Keyframes: "+keyframes.filter(k=>k.clip===currentIndex).length+"</div><div class=\"hint\">Timeline मधील ♦️ वर tap करून Zoom / Rotation / Opacity बदला.</div>";return;}\nif(a==="trim"){
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

tools.onclick=e=>{\n const t=e.target; if(t.id==="applyExport"){exportConfig.width=$("#exQuality").value==="720"?720:1080;exportConfig.height=exportConfig.width===720?405:608;exportConfig.fps=+$("#exFps").value;exportConfig.bitrate=+$("#exBitrate").value;msg("Export settings लागू झाले ✓");} if(t.id==="addKeyframe"){const f=files[currentIndex],c=clipSettings[currentIndex]||{},isImage=f&&f.type.startsWith("image/"),time=isImage?Math.max(0,Math.min(Number(c.duration||photoDuration||5),Number(window.photoPreviewTime||0))):Math.max(Number(c.trimStart||0),Math.min(Number(c.trimEnd??video.duration),video.currentTime));const k={clip:currentIndex,time:time,zoom:settings().zoom,rotation:settings().rotation,opacity:settings().opacity};keyframes.push(k);keyframes.sort((a,b)=>a.clip-b.clip||a.time-b.time);selectedKeyframe=k;$("#kfList").textContent="Keyframes: "+keyframes.filter(k=>k.clip===currentIndex).length;renderKeyframeTracks();msg("Current Time वर Keyframe जोडला ✓")} if(t.id==="kfTime"&&selectedKeyframe){const f=files[selectedKeyframe.clip],c=clipSettings[selectedKeyframe.clip]||{},isImage=f&&f.type.startsWith("image/"),min=isImage?0:Number(c.trimStart||0),max=isImage?Number(c.duration||photoDuration||5):Math.max(min,Number(c.trimEnd??video.duration));selectedKeyframe.time=Math.max(min,Math.min(max,Number(t.value)||0));keyframes.sort((a,b)=>a.clip-b.clip||a.time-b.time);renderKeyframeTracks();if(selectedKeyframe.clip===currentIndex){if(isImage){window.photoPreviewTime=selectedKeyframe.time;applyKeyframePreview(selectedKeyframe.time)}else video.currentTime=selectedKeyframe.time}msg("Keyframe time updated ✓");return} if(["kfZoom","kfRotation","kfOpacity"].includes(t.id)&&selectedKeyframe){const v=Number(t.value);if(t.id==="kfZoom")selectedKeyframe.zoom=v;if(t.id==="kfRotation")selectedKeyframe.rotation=v;if(t.id==="kfOpacity")selectedKeyframe.opacity=v;applyKeyframePreview(selectedKeyframe.time);renderKeyframeTracks();return} if(t.id==="kfJump"&&selectedKeyframe){const tt=Number(selectedKeyframe.time||0),f=files[selectedKeyframe.clip];if(f&&f.type.startsWith("image/")){window.photoPreviewTime=tt;applyKeyframePreview(tt)}else if(selectedKeyframe.clip===currentIndex)video.currentTime=tt;msg("Keyframe वर Jump केले ✓");return} if(t.id==="kfDelete"&&selectedKeyframe){const n=keyframes.indexOf(selectedKeyframe);if(n>=0)keyframes.splice(n,1);selectedKeyframe=null;renderKeyframeTracks();act("keyframes");msg("Keyframe Delete ✓");return} if(t.id==="kfBack"){act("keyframes");return} if(t.id==="kfDuplicate"&&selectedKeyframe){const c=clipSettings[currentIndex]||{},isImage=files[currentIndex]&&files[currentIndex].type.startsWith("image/"),hi=isImage?Number(c.duration||photoDuration||5):Number(c.trimEnd??video.duration),copy={clip:selectedKeyframe.clip,time:Math.min(hi,Number(selectedKeyframe.time||0)+0.5),zoom:selectedKeyframe.zoom,rotation:selectedKeyframe.rotation,opacity:selectedKeyframe.opacity};if(copy.time<=selectedKeyframe.time)copy.time=Math.min(hi,Number(selectedKeyframe.time||0)+0.1);keyframes.push(copy);keyframes.sort((a,b)=>a.clip-b.clip||a.time-b.time);showKeyframeEditor(copy);renderKeyframeTracks();msg("Keyframe Duplicate ✓");return} if(t.dataset.sticker){settings().sticker=t.dataset.sticker;overlay.textContent=(overlay.textContent||"")+" "+t.dataset.sticker;renderOverlayTracks();msg("Sticker जोडला ✓")} if(t.dataset.textanim){settings().textAnimation=t.dataset.textanim;msg("Text animation: "+t.dataset.textanim+" ✓")} if(t.dataset.mask){settings().mask=t.dataset.mask;msg("Mask: "+t.dataset.mask+" ✓")} if(t.id==="clearSticker"){overlay.textContent="";msg("Sticker clear ✓")} if(t.id==="captionStart"){if(!("webkitSpeechRecognition" in window||"SpeechRecognition" in window)){msg("या browser मध्ये Speech Recognition उपलब्ध नाही.",true)}else{const R=window.SpeechRecognition||window.webkitSpeechRecognition,r=new R();r.lang="mr-IN";r.continuous=true;r.onresult=e=>{let x="";for(let i=e.resultIndex;i<e.results.length;i++)x+=e.results[i][0].transcript+" ";overlay.textContent=x.trim();settings().text=x.trim()};r.start();msg("Auto Caption सुरू ✓")}} if(t.id==="clearKeyframes"){for(let i=keyframes.length-1;i>=0;i--)if(keyframes[i].clip===currentIndex)keyframes.splice(i,1);$("#kfList").textContent="Keyframes: 0";msg("Keyframes clear ✓")}
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

document.querySelectorAll(".sidebar button[data-a]").forEach(b=>b.addEventListener("click",()=>act(b.dataset.a)));
document.querySelectorAll(".sidebar button[data-adv]").forEach(b=>b.addEventListener("click",()=>openAdvancedFeature(b.dataset.adv)));
document.addEventListener("input",e=>{
 const t=e.target;
 if(["proHue","proSat","proLight","proTemp"].includes(t.id)){if(t.id==="proHue")settings().hue=+t.value;if(t.id==="proSat")settings().saturation=+t.value;if(t.id==="proLight")settings().lightness=+t.value;if(t.id==="proTemp")settings().temperature=+t.value;applyProColor()}
 if(t.id==="proVol"){video.volume=+t.value}
 if(t.id==="proFadeIn")musicFadeIn=+t.value;
 if(t.id==="proFadeOut")musicFadeOut=+t.value;
});
document.addEventListener("change",e=>{if(e.target.id==="proBlend"){settings().blendMode=e.target.value;applyProColor()}});
document.addEventListener("click",e=>{
 const t=e.target;
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
 const rec=new SR();rec.continuous=true;rec.interimResults=false;rec.maxAlternatives=1;rec.lang=navigator.language||"mr-IN";
 let activeStart=Number(video.currentTime||0),count=0;
 rec.onstart=()=>msg("🎤 Auto Caption listening…");
 rec.onresult=e=>{for(let i=e.resultIndex;i<e.results.length;i++){if(!e.results[i].isFinal)continue;const text=e.results[i][0].transcript.trim();if(!text)continue;const end=Math.max(activeStart+.8,Number(video.currentTime||activeStart+2));captionState().push({text,start:activeStart,end});activeStart=end;count++}captionState().sort((a,b)=>a.start-b.start);renderCaptions();renderOverlayTracks()};
 rec.onerror=e=>msg("Caption error: "+e.error,true);
 rec.onend=()=>{renderCaptions();msg("📝 Auto Captions तयार ✓ "+count+" lines")};
 try{rec.start()}catch(e){msg("Auto Caption सुरू झाले नाही.",true)}
}
function clearAllCaptions(){const c=typeof settings==="function"?settings():{};c.captions=[];renderCaptions();renderOverlayTracks();msg("🗑️ Captions cleared")}
function addEffectPresetToCurrent(type){const c=typeof settings==="function"?settings():{};c.effectPreset=type;const filters={flash:"brightness(1.4) contrast(1.1)",blur:"blur(3px)",cinematic:"contrast(1.15) saturate(1.1) sepia(.05)",glitch:"contrast(1.2) saturate(1.4)",vignette:"contrast(1.08) brightness(.9)"};if(typeof video!=="undefined")video.style.filter=filters[type]||"none";msg("✨ "+type+" preset लागू ✓")}
function openTTSPanel(){const voices=typeof speechSynthesis!=="undefined"?speechSynthesis.getVoices():[];tools.innerHTML='<b>🗣️ Voice / TTS</b><textarea id="ttsText" rows="4" placeholder="Text लिहा…"></textarea><label>Language <select id="ttsVoice"></select></label><label>Rate <input id="ttsRate" type="range" min=".5" max="2" step=".1" value="1"></label><label>Pitch <input id="ttsPitch" type="range" min=".5" max="2" step=".1" value="1"></label><button id="ttsSpeak">▶ Speak</button><button id="ttsStop">■ Stop</button><small>Device/browser मध्ये उपलब्ध voices वापरल्या जातील.</small>';const sel=document.getElementById("ttsVoice"),vs=voices.length?voices:(typeof speechSynthesis!=="undefined"?speechSynthesis.getVoices():[]);vs.forEach(v=>{const o=document.createElement("option");o.value=v.name;o.textContent=v.name+" ("+v.lang+")";sel.appendChild(o)});document.getElementById("ttsSpeak").onclick=()=>{if(!("speechSynthesis"in window)){msg("TTS उपलब्ध नाही.",true);return}const u=new SpeechSynthesisUtterance(document.getElementById("ttsText").value.trim());if(!u.text)return;const v=speechSynthesis.getVoices().find(x=>x.name===sel.value);if(v)u.voice=v;u.rate=Number(document.getElementById("ttsRate").value);u.pitch=Number(document.getElementById("ttsPitch").value);speechSynthesis.cancel();speechSynthesis.speak(u);msg("🗣️ TTS सुरू ✓")};document.getElementById("ttsStop").onclick=()=>speechSynthesis.cancel();if("onvoiceschanged"in speechSynthesis)speechSynthesis.onvoiceschanged=()=>openTTSPanel()}
function aiAutoCut(){if(!files.length){msg("आधी media जोडा.",true);return}const beats=audioBeatMarkers();if(beats.length){applyBeatCut();beatSyncEffects();msg("🤖 Auto Cut: beat-based cuts + effects लागू ✓");return}const n=files.length;files.forEach((f,i)=>{const c=clipSettings[i]||(clipSettings[i]={});if(f.type.startsWith("image/"))c.duration=Number(c.duration||photoDuration||2)});renderOverlayTracks();renderTransitionTracks();msg("🤖 Auto Cut foundation लागू ✓")}
function chromaBackgroundRemove(){if(!files.length){msg("आधी media जोडा.",true);return}const c=typeof settings==="function"?settings():{};c.backgroundRemove="chroma";c.chromaEnabled=true;msg("🪄 Background Remove: Chroma Key mode ✓ — green/blue background निवडा")}
function openMultiTrackEditor(){tools.innerHTML='<b>🎚️ Multi-track</b><button id="mtRefresh">↻ Refresh Tracks</button><button id="mtDuplicate">＋ Duplicate Clip</button><button id="mtEarlier">← Move Earlier</button><small>Video, Text, Sticker, Audio, Caption आणि Effect tracks वेगळे दिसतात.</small>';document.getElementById("mtRefresh").onclick=()=>{multiTrackClipInfo();renderOverlayTracks()};document.getElementById("mtDuplicate").onclick=duplicateCurrentClipToTrack;document.getElementById("mtEarlier").onclick=moveCurrentClipEarlier;multiTrackClipInfo()}
