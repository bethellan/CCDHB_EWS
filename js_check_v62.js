
'use strict';
const APP_VERSION='v62';
const SCREENS=['mainMenu','ageMenu','entryScreen','summaryScreen'];
const $=id=>document.getElementById(id);
let config=null, activeSystem=null, activeAgeBand=null, activeParameters=[], currentStep=0, entries=[], lastSummary=null;
function escapeHtml(value){return String(value ?? '').replace(/[&<>\"]/g,ch=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[ch]));}

let audioCtx=null,alarmTimer=null,vibrateTimer=null,alarmSilenced=false,alarmPrimed=false,alarmAudio=null;
function getAlarmAudio(){
  if(!alarmAudio){
    alarmAudio=new Audio('assets/audio/met-pet-alarm.wav?v='+encodeURIComponent(APP_VERSION));
    alarmAudio.preload='auto';
    alarmAudio.loop=true;
    alarmAudio.volume=1.0;
  }
  return alarmAudio;
}
function primeAlarmAudio(){
  if(alarmPrimed) return;
  alarmPrimed=true;
  try{ getAlarmAudio().load(); }catch(e){}
  try{
    const Ctx=window.AudioContext||window.webkitAudioContext;
    if(Ctx && !audioCtx){audioCtx=new Ctx();}
  }catch(e){audioCtx=null;}
}
function playSoftTripleAlarmPulse(){
  // Fallback only: used if the browser refuses the pre-rendered audio file.
  try{
    const Ctx=window.AudioContext||window.webkitAudioContext;
    if(!audioCtx && Ctx) audioCtx=new Ctx();
    if(!audioCtx) return;
    if(audioCtx.state==='suspended') audioCtx.resume();

    const now=audioCtx.currentTime;
    const master=audioCtx.createGain();
    master.gain.setValueAtTime(0.0001,now);
    master.gain.exponentialRampToValueAtTime(0.95,now+0.025);
    master.gain.exponentialRampToValueAtTime(0.0001,now+0.95);
    master.connect(audioCtx.destination);

    [0,0.24,0.48].forEach(offset=>{
      [660,990].forEach((freq,idx)=>{
        const osc=audioCtx.createOscillator();
        const gain=audioCtx.createGain();
        const start=now+offset;
        const end=start+0.18;
        osc.type='sine';
        osc.frequency.setValueAtTime(freq,start);
        gain.gain.setValueAtTime(0.0001,start);
        gain.gain.exponentialRampToValueAtTime(idx?0.35:0.9,start+0.016);
        gain.gain.exponentialRampToValueAtTime(0.0001,end);
        osc.connect(gain).connect(master);
        osc.start(start);
        osc.stop(end+0.03);
      });
    });
  }catch(e){}
}
function vibrateEmergency(){
  try{ if(navigator.vibrate) navigator.vibrate([220,90,220,650]); }catch(e){}
}
function startEmergencyAlarm(){
  if(alarmSilenced) return;
  stopEmergencyAlarm(false);
  vibrateEmergency();
  vibrateTimer=setInterval(vibrateEmergency,5200);
  try{
    const audio=getAlarmAudio();
    audio.pause();
    audio.currentTime=0;
    audio.volume=1.0;
    const playPromise=audio.play();
    if(playPromise && typeof playPromise.catch==='function'){
      playPromise.catch(()=>{
        playSoftTripleAlarmPulse();
        alarmTimer=setInterval(playSoftTripleAlarmPulse,4200);
      });
    }
  }catch(e){
    playSoftTripleAlarmPulse();
    alarmTimer=setInterval(playSoftTripleAlarmPulse,4200);
  }
}
function stopEmergencyAlarm(markSilenced=true){
  if(alarmTimer){clearInterval(alarmTimer);alarmTimer=null;}
  if(vibrateTimer){clearInterval(vibrateTimer);vibrateTimer=null;}
  try{ if(navigator.vibrate) navigator.vibrate(0); }catch(e){}
  try{ if(alarmAudio){alarmAudio.pause(); alarmAudio.currentTime=0;} }catch(e){}
  if(markSilenced) alarmSilenced=true;
}
function resetEmergencyAlarm(){
  stopEmergencyAlarm(false);
  alarmSilenced=false;
}

function showScreen(id){SCREENS.forEach(screenId=>$(screenId).classList.toggle('active',screenId===id));}
function setBodyZone(zone){document.body.className='zone-'+(zone||'white');}
async function loadConfig(){try{const res=await fetch('./data/ews-config.json?v='+encodeURIComponent(APP_VERSION),{cache:'no-store'});if(!res.ok)throw new Error('HTTP '+res.status);return await res.json();}catch(err){return JSON.parse($('embedded-config').textContent.trim());}}
function getSystem(id){return config.systems.find(s=>s.id===id);}function emergencyLabel(system){return system?.scoreBehaviour?.emergencyDisplayLabel||(system?.patientGroup==='paediatric'?'PET':'MET');}function scoreText(score,system){return score==='blue'?emergencyLabel(system):String(score);}function zoneRank(zone){return ({white:0,yellow:1,orange:2,red:3,blue:4})[zone]??0;}function scoreNumber(score){return score==='blue'?0:Number(score||0);}
function displayRange(range,parameter){if(range.display)return range.display;const min=range.min,max=range.max;if(min==null&&max==null)return 'Any value';if(min==null)return '≤'+max;if(max==null)return '≥'+min;return min+'–'+max;}
function selectedValueLabel(entry){const p=entry.parameter;if(entry.choice.kind==='range')return `${p.label} ${displayRange(entry.choice.item,p)}${p.unit?' '+p.unit:''}`;return `${p.label} = ${entry.choice.item.label}`;}
function chooseAction(system,summary){const bands=system.escalationBands||[];if(summary.emergency){return bands.find(b=>b.trigger||b.colour==='blue')||{colour:'blue',actionText:`Mandatory Action: ${emergencyLabel(system)}`};}if(system.id==='adult-ews'&&summary.highestZone==='red'){const red=bands.find(b=>b.colour==='red');if(red)return red;}return bands.find(b=>{if(b.trigger)return false;const min=b.minScore??-Infinity,max=b.maxScore??Infinity;return summary.total>=min&&summary.total<=max;})||{colour:'white',actionText:'Mandatory Action: —'};}
function calculateSummary(system=activeSystem,ageBand=activeAgeBand,sourceEntries=entries){const scored=sourceEntries.filter(Boolean);let total=0,emergency=false,highestZone='white',blueCount=0;scored.forEach(e=>{const score=e.choice.item.score;total+=scoreNumber(score);if(score==='blue'){emergency=true;blueCount++;}if(zoneRank(e.choice.item.zone)>zoneRank(highestZone))highestZone=e.choice.item.zone;});const threshold=system?.scoreBehaviour?.metScoreThreshold;if(threshold!=null&&total>=Number(threshold))emergency=true;const provisional={total,emergency,highestZone,blueCount,entered:scored.length,totalRequired:activeParameters.length};const action=chooseAction(system,provisional);const finalZone=emergency?'blue':(action.colour||highestZone||'white');return {...provisional,action,finalZone,timestamp:new Date()};}
function resetEntry(system,ageBand){activeSystem=system;activeAgeBand=ageBand;activeParameters=[...(ageBand.parameters||[])];entries=new Array(activeParameters.length).fill(null);currentStep=0;lastSummary=null;}
function startAdult(){resetEmergencyAlarm();const sys=getSystem('adult-ews');resetEntry(sys,sys.ageBands[0]);renderEntry();showScreen('entryScreen');}function startPaediatricAgeMenu(){resetEmergencyAlarm();renderAgeMenu();showScreen('ageMenu');}function startPaediatric(ageBandId){const sys=getSystem('nz-pews');const age=sys.ageBands.find(a=>a.id===ageBandId);resetEntry(sys,age);renderEntry();showScreen('entryScreen');}
function renderAgeMenu(){const sys=getSystem('nz-pews');$('ageGrid').innerHTML=(sys.ageBands||[]).map(a=>{const src=a.graphic?.src||'';const fallback=a.graphic?.emojiFallback||'◻';return `<button class="age-card" type="button" data-age-id="${escapeHtml(a.id)}"><div class="age-icon-shell">${src?`<img class="age-icon-img" src="${escapeHtml(src)}" alt="${escapeHtml(a.graphic?.alt||a.shortLabel||a.label)}" onerror="this.style.display='none';this.nextElementSibling.style.display='block'">`:''}<span class="age-emoji">${escapeHtml(fallback)}</span></div><div class="age-label">${escapeHtml(a.shortLabel||a.label)}</div><div class="age-range">${escapeHtml(a.label)}</div></button>`;}).join('');$('ageGrid').querySelectorAll('[data-age-id]').forEach(btn=>btn.addEventListener('click',()=>startPaediatric(btn.dataset.ageId)));}
function renderEntry(){setBodyZone('white');const isAdult=activeSystem.id==='adult-ews';const titleEl=$('entryTitle');titleEl.classList.remove('header-adult','header-paediatric');titleEl.classList.add(isAdult?'header-adult':'header-paediatric');titleEl.textContent=isAdult?'NZ Adult EWS':`NZ Paediatric EWS - ${activeAgeBand.label}`;const stepCard=$('stepCard');stepCard.classList.remove('parameter-adult','parameter-paediatric');stepCard.classList.add(isAdult?'parameter-adult':'parameter-paediatric');const bottomBar=$('bottomBar');bottomBar.classList.remove('adult-nav','paediatric-nav');bottomBar.classList.add(isAdult?'adult-nav':'paediatric-nav');const param=activeParameters[currentStep];$('stepCount').textContent=`Item ${currentStep+1} of ${activeParameters.length}`;$('parameterTitle').textContent=param.label;const choices=parameterChoices(param);const hint=(activeSystem?.id==='nz-pews'&&param.id==='respiratory-distress'&&param.assessmentGuide)?'<div class="entry-hint"><strong>Tip:</strong> Long-press any respiratory distress option to open the Respiratory Distress Guide.</div>':'';$('optionList').innerHTML=choices.map(choice=>renderChoiceButton(param,choice)).join('')+hint;attachChoiceHandlers(param);}
function parameterChoices(param){return param.type==='option'?(param.options||[]).map(item=>({kind:'option',item})):(param.ranges||[]).map(item=>({kind:'range',item}));}
function renderChoiceButton(param,choice){const item=choice.item,zone=item.zone||'white';const label=choice.kind==='range'?displayRange(item,param):(item.label||item.id);const sub=choice.kind==='range'?(param.unit||''):(item.reason||'');const score=scoreText(item.score,activeSystem);const choices=parameterChoices(param);const index=choices.findIndex(c=>c.item===item);return `<button class="range-button b-${escapeHtml(zone)}" type="button" data-choice-index="${index}"><span class="range-main"><span class="range-display">${escapeHtml(label)}</span>${sub?`<span class="range-sub">${escapeHtml(sub)}</span>`:''}</span><span class="score-pill">${escapeHtml(score)}</span></button>`;}
function selectChoice(choiceIndex){const param=activeParameters[currentStep];const choice=parameterChoices(param)[choiceIndex];entries[currentStep]={parameter:param,choice};if(currentStep<activeParameters.length-1){currentStep++;renderEntry();}else{renderSummary();showScreen('summaryScreen');}}
function goEntryBack(){if(activeSystem?.id==='adult-ews'){goMainMenu();return;}setBodyZone('white');showScreen('ageMenu');}
function goMainMenu(){resetEmergencyAlarm();setBodyZone('white');showScreen('mainMenu');}
function attachLongPressBack(button, tapHandler, longHandler){
  const LONG_PRESS_MS=650;
  let timer=null;
  let longFired=false;
  function clearTimer(){if(timer){clearTimeout(timer);timer=null;}}
  function start(e){
    longFired=false;
    clearTimer();
    timer=setTimeout(()=>{longFired=true;timer=null;longHandler();},LONG_PRESS_MS);
  }
  function cancel(){clearTimer();}
  function end(e){
    clearTimer();
    if(longFired){
      e.preventDefault();
      e.stopPropagation();
      return;
    }
    tapHandler();
  }
  button.addEventListener('pointerdown',start);
  button.addEventListener('pointerup',end);
  button.addEventListener('pointercancel',cancel);
  button.addEventListener('pointerleave',cancel);
  button.addEventListener('contextmenu',e=>e.preventDefault());
}

function attachChoiceHandlers(param){
  $('optionList').querySelectorAll('[data-choice-index]').forEach(btn=>{
    const index=Number(btn.dataset.choiceIndex);
    if(activeSystem?.id==='nz-pews' && param.id==='respiratory-distress' && param.assessmentGuide){
      attachRespiratoryDistressLongPress(btn,index,param);
    }else{
      btn.addEventListener('click',()=>selectChoice(index));
    }
  });
}
function attachRespiratoryDistressLongPress(button, choiceIndex, param){
  const LONG_PRESS_MS=650;
  let timer=null;
  let longFired=false;
  function clearTimer(){if(timer){clearTimeout(timer);timer=null;}}
  button.addEventListener('pointerdown',e=>{
    longFired=false;
    clearTimer();
    timer=setTimeout(()=>{longFired=true;timer=null;openRespiratoryDistressGuide(param);},LONG_PRESS_MS);
  });
  button.addEventListener('pointerup',e=>{
    clearTimer();
    e.preventDefault();
    e.stopPropagation();
    if(!longFired) selectChoice(choiceIndex);
  });
  button.addEventListener('pointercancel',clearTimer);
  button.addEventListener('pointerleave',clearTimer);
  button.addEventListener('contextmenu',e=>e.preventDefault());
  button.addEventListener('click',e=>{e.preventDefault();e.stopPropagation();});
}
let respGuideSelections=new Set();
function openRespiratoryDistressGuide(param){
  respGuideSelections=new Set();
  const guide=param.assessmentGuide;
  if(!guide) return;
  $('respDistressGuideTitle').textContent=guide.title||'Assessment of respiratory distress guide';
  const cols=guide.columns||[];
  const rows=guide.rows||[];
  const head=`<tr><th>Feature</th>${cols.map(c=>`<th>${escapeHtml(c.label||c.id)}</th>`).join('')}</tr>`;
  const body=rows.map(row=>`<tr><td class="guide-row-label">${escapeHtml(row.label||row.id)}</td>${cols.map(col=>renderGuideCell(row,col)).join('')}</tr>`).join('');
  const rule=guide.scoringRule||'Score at the level of severest sign.';
  const note=guide.note||'';
  $('respGuideBody').innerHTML=`<p class="guide-intro">Select the signs that apply. The suggested respiratory distress level updates as boxes are selected.</p><table class="distress-guide-table"><thead>${head}</thead><tbody>${body}</tbody></table><div class="guide-note">${escapeHtml(rule)}${note?'<br>'+escapeHtml(note):''}</div><div id="respGuideSuggestion" class="guide-suggestion none"><div class="suggestion-label">Suggested respiratory distress</div><div class="suggestion-value">Select signs above</div></div><div class="guide-actions"><button id="respGuideCancelBtn" class="nav-button guide-cancel" type="button">Cancel</button><button id="respGuideContinueBtn" class="nav-button guide-continue" type="button">Continue</button></div>`;
  $('respGuideBody').querySelectorAll('.guide-cell:not(.empty)').forEach(cell=>cell.addEventListener('click',()=>toggleGuideCell(cell)));
  updateRespGuideSuggestion();
  bindTap($('respGuideCancelBtn'),closeRespiratoryDistressGuide);
  bindTap($('respGuideContinueBtn'),applyRespiratoryDistressGuide);
  $('respDistressGuideModal').classList.add('open');
}
function renderGuideCell(row,col){
  const items=row[col.id]||[];
  if(!items.length) return `<td class="guide-cell empty severity-${escapeHtml(col.id)}">—</td>`;
  const key=`${row.id}:${col.id}`;
  return `<td class="guide-cell severity-${escapeHtml(col.id)}" data-severity="${escapeHtml(col.id)}" data-guide-key="${escapeHtml(key)}"><ul>${items.map(item=>`<li>${escapeHtml(item)}</li>`).join('')}</ul></td>`;
}
function toggleGuideCell(cell){
  const key=cell.dataset.guideKey;
  if(respGuideSelections.has(key)){respGuideSelections.delete(key);cell.classList.remove('selected');}
  else{respGuideSelections.add(key);cell.classList.add('selected');}
  updateRespGuideSuggestion();
}
function currentRespGuideSeverity(){
  const severities=[...respGuideSelections].map(k=>k.split(':')[1]);
  if(severities.includes('severe')) return 'severe';
  if(severities.includes('moderate')) return 'moderate';
  if(severities.includes('mild')) return 'mild';
  return null;
}
function updateRespGuideSuggestion(){
  const el=$('respGuideSuggestion');
  if(!el) return;
  const severity=currentRespGuideSeverity();
  const labels={mild:'Mild',moderate:'Moderate',severe:'Severe'};
  el.className='guide-suggestion '+(severity||'none');
  const value=el.querySelector('.suggestion-value');
  if(value) value.textContent=severity?labels[severity]:'Select signs above';
}
function closeRespiratoryDistressGuide(){
  $('respDistressGuideModal').classList.remove('open');
  respGuideSelections=new Set();
}
function applyRespiratoryDistressGuide(){
  const selectedSeverity=currentRespGuideSeverity();
  if(!selectedSeverity){closeRespiratoryDistressGuide();return;}
  const param=activeParameters[currentStep];
  const choices=parameterChoices(param);
  const choiceIndex=choices.findIndex(c=>String(c.item.id).toLowerCase()===selectedSeverity || String(c.item.label).toLowerCase()===selectedSeverity);
  closeRespiratoryDistressGuide();
  if(choiceIndex>=0) selectChoice(choiceIndex);
}

function rowClass(entry){return 'zone-'+(entry.choice.item.zone||'white');}
function renderSummary(){
  lastSummary=calculateSummary();
  setBodyZone(lastSummary.finalZone);
  const label=emergencyLabel(activeSystem),isPaed=activeSystem.patientGroup==='paediatric';
  const isPewsHighRisk=isPaed && !lastSummary.emergency && lastSummary.total>=8;
  $('summaryResult').className='result-box '+(lastSummary.emergency?'met-alert emergency-mega':(isPewsHighRisk?'high-risk':''));
  if(lastSummary.emergency){
    $('summaryResult').textContent=label;
  }else if(isPewsHighRisk){
    $('summaryResult').innerHTML=`<span class="high-risk-main">PEWS: ${lastSummary.total}</span><span class="high-risk-sub">High risk escalation</span><span class="high-risk-note">Consider 777 PET call</span>`;
  }else{
    $('summaryResult').textContent=(isPaed?'PEWS: ':'EWS: ')+lastSummary.total;
  }
  $('summaryAction').textContent=lastSummary.action?.actionText||'Mandatory Action: —';
  if(lastSummary.emergency){
    $('summaryDetails').classList.add('hidden');
    $('summaryDetails').innerHTML='';
    $('silenceAlarmBtn').classList.toggle('hidden',alarmSilenced);
    startEmergencyAlarm();
  }else{
    stopEmergencyAlarm(false);
    alarmSilenced=false;
    $('silenceAlarmBtn').classList.add('hidden');
    $('summaryDetails').classList.remove('hidden');
    $('summaryDetails').innerHTML=`<div class="detail-box"><div class="detail-label">Numeric total</div><div class="detail-value">${lastSummary.total}</div></div><div class="detail-box"><div class="detail-label">Emergency status</div><div class="detail-value">${isPewsHighRisk?'High risk':'No'}</div></div><div class="detail-box"><div class="detail-label">Observations entered</div><div class="detail-value">${lastSummary.entered} of ${lastSummary.totalRequired}</div></div><div class="detail-box"><div class="detail-label">Calculated</div><div class="detail-value">${lastSummary.timestamp.toLocaleTimeString([],{hour:'2-digit',minute:'2-digit'})}</div></div>`;
  }
  $('summaryRows').innerHTML=entries.filter(Boolean).map(e=>`<tr class="${rowClass(e)}"><td><b>${escapeHtml(e.parameter.label)}</b></td><td>${escapeHtml(selectedValueLabel(e))}</td><td class="summary-score">${escapeHtml(scoreText(e.choice.item.score,activeSystem))}</td></tr>`).join('');
  renderSummaryActions();
}
function renderSummaryActions(){const host=$('summaryActions');if(activeSystem.id==='adult-ews'){host.className='summary-actions two';host.innerHTML='<button class="nav-button" id="againBtn" type="button">Begin again</button><button class="nav-button" id="mainBtn" type="button">Main menu</button>';bindAppTap($('againBtn'),startAdult);bindAppTap($('mainBtn'),goMainMenu);}else{host.className='summary-actions three';host.innerHTML='<button class="nav-button" id="againBtn" type="button">Enter again for same age group</button><button class="nav-button" id="ageAgainBtn" type="button">Choose another age group</button><button class="nav-button" id="mainBtn" type="button">Main menu</button>';bindAppTap($('againBtn'),()=>startPaediatric(activeAgeBand.id));bindAppTap($('ageAgainBtn'),startPaediatricAgeMenu);bindAppTap($('mainBtn'),goMainMenu);}}
function renderHelp(){const system=activeSystem||getSystem('adult-ews'),age=activeAgeBand||(system?.ageBands?.[0]);$('helpTitle').textContent=system.id==='adult-ews'?'NZ Adult EWS Help':`NZ Paediatric EWS Help - ${age.label}`;const parameters=(age.parameters||[]).map(param=>renderLegendParam(param)).join('');const prompt=system.scoreBehaviour?.escalationPrompt?`<div class="escalation-prompt">${escapeHtml(system.scoreBehaviour.escalationPrompt)}</div>`:'';const pathwayTitle=system.escalationPathwayTitle||'Mandatory actions';$('helpBody').innerHTML=`<div class="legend-section"><h4>Scoring table</h4>${parameters}</div><div class="legend-section"><h4>${escapeHtml(pathwayTitle)}</h4>${prompt}${renderEscalationLegend(system)}</div><div class="legend-section clinical-notice"><h4>Clinical safety notice</h4><p>This tool is designed to assist with rapid calculation of New Zealand EWS/PEWS scoring systems using configurable JSON-based scoring tables derived from publicly available guidance.</p><p>This software is not sanctioned, endorsed, certified, or maintained by Te Tāhū Hauora Health Quality &amp; Safety Commission or any other governing organisation.</p><p>Users must refer to the latest official NZ EWS/PEWS charts, policies, and published guidelines for authoritative and current scoring, escalation, and clinical decision-making requirements.</p></div>`;$('helpModal').classList.add('open');}
function renderLegendParam(param){let rows='';if(param.type==='option'){rows=(param.options||[]).map(o=>`<tr class="zone-${escapeHtml(o.zone||'white')}"><td>${escapeHtml(o.label)}</td><td>${escapeHtml(scoreText(o.score,activeSystem))}</td></tr>`).join('');}else{rows=(param.ranges||[]).map(r=>`<tr class="zone-${escapeHtml(r.zone||'white')}"><td>${escapeHtml(displayRange(r,param))}${param.unit?' '+escapeHtml(param.unit):''}</td><td>${escapeHtml(scoreText(r.score,activeSystem))}</td></tr>`).join('');}return `<h4>${escapeHtml(param.label)}</h4><table class="legend-table"><thead><tr><th>Range / option</th><th>Score</th></tr></thead><tbody>${rows}</tbody></table>`;}
function renderEscalationLegend(system){return `<table class="legend-table"><thead><tr><th>Trigger</th><th>Mandatory action</th></tr></thead><tbody>${(system.escalationBands||[]).map(b=>`<tr class="zone-${escapeHtml(b.colour||'white')}"><td>${escapeHtml(b.label||b.id)}</td><td>${escapeHtml(b.actionText||'')}</td></tr>`).join('')}</tbody></table>`;}
function closeHelp(){$('helpModal').classList.remove('open');}
function isInteractiveTarget(target){return !!target.closest('button, a, input, textarea, select, [role=button]');}
function blockZoomGestures(){
  document.addEventListener('gesturestart',e=>e.preventDefault());
  document.addEventListener('gesturechange',e=>e.preventDefault());
  document.addEventListener('gestureend',e=>e.preventDefault());
  let lastTouch=0;
  document.addEventListener('touchend',e=>{
    const now=Date.now();
    if(!isInteractiveTarget(e.target) && now-lastTouch<350) e.preventDefault();
    lastTouch=now;
  },{passive:false});
}
function bindTap(el,handler){
  if(!el) return;
  let lastRun=0;
  const run=e=>{
    const now=Date.now();
    if(now-lastRun<450) return;
    lastRun=now;
    handler(e);
  };
  el.addEventListener('click',run);
  el.addEventListener('touchend',e=>{ e.preventDefault(); run(e); },{passive:false});
}
function blockTextSelectionAndCallout(){
  document.addEventListener('selectstart',e=>{
    if(!e.target.closest('input, textarea')) e.preventDefault();
  });
  document.addEventListener('dragstart',e=>{
    if(!e.target.closest('input, textarea')) e.preventDefault();
  });
  document.addEventListener('contextmenu',e=>{
    if(!e.target.closest('input, textarea')) e.preventDefault();
  });
}
function bindAppTap(el,handler){
  if(!el) return;
  let lastRun=0;
  const run=e=>{
    const now=Date.now();
    if(now-lastRun<380){
      if(e){e.preventDefault(); e.stopPropagation();}
      return;
    }
    lastRun=now;
    if(e){e.preventDefault(); e.stopPropagation();}
    try{ handler(e); }catch(err){ console.error('Control handler failed',err); }
  };
  // Android Chrome/WebView can miss pointerup on fixed-position controls;
  // bind touchend, pointerup and click, then de-duplicate by timestamp.
  el.addEventListener('touchend',run,{passive:false});
  el.addEventListener('pointerup',run);
  el.addEventListener('click',run);
  el.addEventListener('keyup',e=>{ if(e.key==='Enter'||e.key===' '){ run(e); } });
}
async function init(){
  try{config=await loadConfig();}
  catch(err){
    console.error('Config load failed',err);
    alert('EWS configuration failed to load.');
    return;
  }
  document.addEventListener('pointerdown',primeAlarmAudio,{once:true,passive:true});
  bindAppTap($('adultBtn'),startAdult);
  bindAppTap($('paedBtn'),startPaediatricAgeMenu);
  attachLongPressBack($('ageBackBtn'),goMainMenu,goMainMenu);
  attachLongPressBack($('entryBackBtn'),goEntryBack,goMainMenu);
  bindAppTap($('helpBtn'),renderHelp);
  bindAppTap($('silenceAlarmBtn'),()=>{stopEmergencyAlarm(true);$('silenceAlarmBtn').classList.add('hidden');});
  bindAppTap($('closeHelpBtn'),closeHelp);
  bindAppTap($('closeRespGuideBtn'),closeRespiratoryDistressGuide);
  $('helpModal').addEventListener('click',e=>{if(e.target===$('helpModal'))closeHelp();});
  $('respDistressGuideModal').addEventListener('click',e=>{if(e.target===$('respDistressGuideModal'))closeRespiratoryDistressGuide();});
  blockZoomGestures();
  blockTextSelectionAndCallout();
  showScreen('mainMenu');
}
document.addEventListener('DOMContentLoaded',init);
