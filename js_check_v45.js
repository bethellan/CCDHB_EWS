
'use strict';
const APP_VERSION='v45';
const SCREENS=['mainMenu','ageMenu','entryScreen','summaryScreen'];
const $=id=>document.getElementById(id);
let config=null, activeSystem=null, activeAgeBand=null, activeParameters=[], currentStep=0, entries=[], lastSummary=null;
function escapeHtml(value){return String(value ?? '').replace(/[&<>\"]/g,ch=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[ch]));}
function showScreen(id){SCREENS.forEach(screenId=>$(screenId).classList.toggle('active',screenId===id));}
function setBodyZone(zone){document.body.className='zone-'+(zone||'white');}
async function loadConfig(){try{const res=await fetch('./data/ews-config.json?v='+encodeURIComponent(APP_VERSION),{cache:'no-store'});if(!res.ok)throw new Error('HTTP '+res.status);return await res.json();}catch(err){return JSON.parse($('embedded-config').textContent.trim());}}
function getSystem(id){return config.systems.find(s=>s.id===id);}function emergencyLabel(system){return system?.scoreBehaviour?.emergencyDisplayLabel||(system?.patientGroup==='paediatric'?'PET':'MET');}function scoreText(score,system){return score==='blue'?emergencyLabel(system):String(score);}function zoneRank(zone){return ({white:0,yellow:1,orange:2,red:3,blue:4})[zone]??0;}function scoreNumber(score){return score==='blue'?0:Number(score||0);}
function displayRange(range,parameter){if(range.display)return range.display;const min=range.min,max=range.max;if(min==null&&max==null)return 'Any value';if(min==null)return '≤'+max;if(max==null)return '≥'+min;return min+'–'+max;}
function selectedValueLabel(entry){const p=entry.parameter;if(entry.choice.kind==='range')return `${p.label} ${displayRange(entry.choice.item,p)}${p.unit?' '+p.unit:''}`;return `${p.label} = ${entry.choice.item.label}`;}
function chooseAction(system,summary){const bands=system.escalationBands||[];if(summary.emergency){return bands.find(b=>b.trigger||b.colour==='blue')||{colour:'blue',actionText:`Mandatory Action: ${emergencyLabel(system)}`};}if(system.id==='adult-ews'&&summary.highestZone==='red'){const red=bands.find(b=>b.colour==='red');if(red)return red;}return bands.find(b=>{if(b.trigger)return false;const min=b.minScore??-Infinity,max=b.maxScore??Infinity;return summary.total>=min&&summary.total<=max;})||{colour:'white',actionText:'Mandatory Action: —'};}
function calculateSummary(system=activeSystem,ageBand=activeAgeBand,sourceEntries=entries){const scored=sourceEntries.filter(Boolean);let total=0,emergency=false,highestZone='white',blueCount=0;scored.forEach(e=>{const score=e.choice.item.score;total+=scoreNumber(score);if(score==='blue'){emergency=true;blueCount++;}if(zoneRank(e.choice.item.zone)>zoneRank(highestZone))highestZone=e.choice.item.zone;});const threshold=system?.scoreBehaviour?.metScoreThreshold;if(threshold!=null&&total>=Number(threshold))emergency=true;const provisional={total,emergency,highestZone,blueCount,entered:scored.length,totalRequired:activeParameters.length};const action=chooseAction(system,provisional);const finalZone=emergency?'blue':(action.colour||highestZone||'white');return {...provisional,action,finalZone,timestamp:new Date()};}
function resetEntry(system,ageBand){activeSystem=system;activeAgeBand=ageBand;activeParameters=[...(ageBand.parameters||[])];entries=new Array(activeParameters.length).fill(null);currentStep=0;lastSummary=null;}
function startAdult(){const sys=getSystem('adult-ews');resetEntry(sys,sys.ageBands[0]);renderEntry();showScreen('entryScreen');}function startPaediatricAgeMenu(){renderAgeMenu();showScreen('ageMenu');}function startPaediatric(ageBandId){const sys=getSystem('nz-pews');const age=sys.ageBands.find(a=>a.id===ageBandId);resetEntry(sys,age);renderEntry();showScreen('entryScreen');}
function renderAgeMenu(){const sys=getSystem('nz-pews');$('ageGrid').innerHTML=(sys.ageBands||[]).map(a=>{const src=a.graphic?.src||'';const fallback=a.graphic?.emojiFallback||'◻';return `<button class="age-card" type="button" data-age-id="${escapeHtml(a.id)}"><div class="age-icon-shell">${src?`<img class="age-icon-img" src="${escapeHtml(src)}" alt="${escapeHtml(a.graphic?.alt||a.shortLabel||a.label)}" onerror="this.style.display='none';this.nextElementSibling.style.display='block'">`:''}<span class="age-emoji">${escapeHtml(fallback)}</span></div><div class="age-label">${escapeHtml(a.shortLabel||a.label)}</div><div class="age-range">${escapeHtml(a.label)}</div></button>`;}).join('');$('ageGrid').querySelectorAll('[data-age-id]').forEach(btn=>btn.addEventListener('click',()=>startPaediatric(btn.dataset.ageId)));}
function renderEntry(){setBodyZone('white');const isAdult=activeSystem.id==='adult-ews';const titleEl=$('entryTitle');titleEl.classList.remove('header-adult','header-paediatric');titleEl.classList.add(isAdult?'header-adult':'header-paediatric');titleEl.textContent=isAdult?'NZ Adult EWS':`NZ Paediatric EWS - ${activeAgeBand.label}`;const stepCard=$('stepCard');stepCard.classList.remove('parameter-adult','parameter-paediatric');stepCard.classList.add(isAdult?'parameter-adult':'parameter-paediatric');const bottomBar=$('bottomBar');bottomBar.classList.remove('adult-nav','paediatric-nav');bottomBar.classList.add(isAdult?'adult-nav':'paediatric-nav');const param=activeParameters[currentStep];$('stepCount').textContent=`Item ${currentStep+1} of ${activeParameters.length}`;$('parameterTitle').textContent=param.label;const choices=parameterChoices(param);$('optionList').innerHTML=choices.map(choice=>renderChoiceButton(param,choice)).join('');$('optionList').querySelectorAll('[data-choice-index]').forEach(btn=>btn.addEventListener('click',()=>selectChoice(Number(btn.dataset.choiceIndex))));}
function parameterChoices(param){return param.type==='option'?(param.options||[]).map(item=>({kind:'option',item})):(param.ranges||[]).map(item=>({kind:'range',item}));}
function renderChoiceButton(param,choice){const item=choice.item,zone=item.zone||'white';const label=choice.kind==='range'?displayRange(item,param):(item.label||item.id);const sub=choice.kind==='range'?(param.unit||''):(item.reason||'');const score=scoreText(item.score,activeSystem);const choices=parameterChoices(param);const index=choices.findIndex(c=>c.item===item);return `<button class="range-button b-${escapeHtml(zone)}" type="button" data-choice-index="${index}"><span class="range-main"><span class="range-display">${escapeHtml(label)}</span>${sub?`<span class="range-sub">${escapeHtml(sub)}</span>`:''}</span><span class="score-pill">${escapeHtml(score)}</span></button>`;}
function selectChoice(choiceIndex){const param=activeParameters[currentStep];const choice=parameterChoices(param)[choiceIndex];entries[currentStep]={parameter:param,choice};if(currentStep<activeParameters.length-1){currentStep++;renderEntry();}else{renderSummary();showScreen('summaryScreen');}}
function goEntryBack(){if(activeSystem?.id==='adult-ews'){setBodyZone('white');showScreen('mainMenu');return;}setBodyZone('white');showScreen('ageMenu');}
function goMainMenu(){setBodyZone('white');showScreen('mainMenu');}
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
function rowClass(entry){return 'zone-'+(entry.choice.item.zone||'white');}
function renderSummary(){
  lastSummary=calculateSummary();
  setBodyZone(lastSummary.finalZone);
  const label=emergencyLabel(activeSystem),isPaed=activeSystem.patientGroup==='paediatric';
  $('summaryResult').className='result-box '+(lastSummary.emergency?'met-alert':'');
  $('summaryResult').textContent=lastSummary.emergency?label:((isPaed?'PEWS: ':'EWS: ')+lastSummary.total);
  $('summaryAction').textContent=lastSummary.action?.actionText||'Mandatory Action: —';
  if(lastSummary.emergency){
    $('summaryDetails').innerHTML=`<div class="emergency-banner" role="alert" aria-live="assertive"><div class="emergency-title">${escapeHtml(label)}</div><div class="emergency-subtitle">Emergency escalation criteria met</div><div class="emergency-note">Review the highlighted blue row(s) below.</div></div>`;
  }else{
    $('summaryDetails').innerHTML=`<div class="detail-box"><div class="detail-label">Numeric total</div><div class="detail-value">${lastSummary.total}</div></div><div class="detail-box"><div class="detail-label">Emergency status</div><div class="detail-value">No</div></div><div class="detail-box"><div class="detail-label">Observations entered</div><div class="detail-value">${lastSummary.entered} of ${lastSummary.totalRequired}</div></div><div class="detail-box"><div class="detail-label">Calculated</div><div class="detail-value">${lastSummary.timestamp.toLocaleTimeString([],{hour:'2-digit',minute:'2-digit'})}</div></div>`;
  }
  $('summaryRows').innerHTML=entries.filter(Boolean).map(e=>`<tr class="${rowClass(e)}"><td><b>${escapeHtml(e.parameter.label)}</b></td><td>${escapeHtml(selectedValueLabel(e))}</td><td class="summary-score">${escapeHtml(scoreText(e.choice.item.score,activeSystem))}</td></tr>`).join('');
  renderSummaryActions();
}
function renderSummaryActions(){const host=$('summaryActions');if(activeSystem.id==='adult-ews'){host.className='summary-actions two';host.innerHTML='<button class="nav-button" id="againBtn" type="button">Begin again</button><button class="nav-button" id="mainBtn" type="button">Main menu</button>';$('againBtn').onclick=()=>startAdult();$('mainBtn').onclick=()=>{setBodyZone('white');showScreen('mainMenu');};}else{host.className='summary-actions three';host.innerHTML='<button class="nav-button" id="againBtn" type="button">Enter again for same age group</button><button class="nav-button" id="ageAgainBtn" type="button">Choose another age group</button><button class="nav-button" id="mainBtn" type="button">Main menu</button>';$('againBtn').onclick=()=>startPaediatric(activeAgeBand.id);$('ageAgainBtn').onclick=()=>{setBodyZone('white');startPaediatricAgeMenu();};$('mainBtn').onclick=()=>{setBodyZone('white');showScreen('mainMenu');};}}
function renderHelp(){const system=activeSystem,age=activeAgeBand;$('helpTitle').textContent=system.id==='adult-ews'?'NZ Adult EWS Help':`NZ Paediatric EWS Help - ${age.label}`;const parameters=(age.parameters||[]).map(param=>renderLegendParam(param)).join('');$('helpBody').innerHTML=`<div class="legend-section"><h4>Scoring table</h4>${parameters}</div><div class="legend-section"><h4>Mandatory actions</h4>${renderEscalationLegend(system)}</div><div class="legend-section clinical-notice"><h4>Clinical safety notice</h4><p>This tool is designed to assist with rapid calculation of New Zealand EWS/PEWS scoring systems using configurable JSON-based scoring tables derived from publicly available guidance.</p><p>This software is not sanctioned, endorsed, certified, or maintained by Te Tāhū Hauora Health Quality &amp; Safety Commission or any other governing organisation.</p><p>Users must refer to the latest official NZ EWS/PEWS charts, policies, and published guidelines for authoritative and current scoring, escalation, and clinical decision-making requirements.</p></div>`;$('helpModal').classList.add('open');}
function renderLegendParam(param){let rows='';if(param.type==='option'){rows=(param.options||[]).map(o=>`<tr class="zone-${escapeHtml(o.zone||'white')}"><td>${escapeHtml(o.label)}</td><td>${escapeHtml(scoreText(o.score,activeSystem))}</td></tr>`).join('');}else{rows=(param.ranges||[]).map(r=>`<tr class="zone-${escapeHtml(r.zone||'white')}"><td>${escapeHtml(displayRange(r,param))}${param.unit?' '+escapeHtml(param.unit):''}</td><td>${escapeHtml(scoreText(r.score,activeSystem))}</td></tr>`).join('');}return `<h4>${escapeHtml(param.label)}</h4><table class="legend-table"><thead><tr><th>Range / option</th><th>Score</th></tr></thead><tbody>${rows}</tbody></table>`;}
function renderEscalationLegend(system){return `<table class="legend-table"><thead><tr><th>Trigger</th><th>Mandatory action</th></tr></thead><tbody>${(system.escalationBands||[]).map(b=>`<tr class="zone-${escapeHtml(b.colour||'white')}"><td>${escapeHtml(b.label||b.id)}</td><td>${escapeHtml(b.actionText||'')}</td></tr>`).join('')}</tbody></table>`;}
function closeHelp(){$('helpModal').classList.remove('open');}
function blockZoomGestures(){document.addEventListener('gesturestart',e=>e.preventDefault());document.addEventListener('gesturechange',e=>e.preventDefault());document.addEventListener('gestureend',e=>e.preventDefault());let lastTouch=0;document.addEventListener('touchend',e=>{const now=Date.now();if(now-lastTouch<350)e.preventDefault();lastTouch=now;},{passive:false});}
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
async function init(){config=await loadConfig();$('adultBtn').addEventListener('click',startAdult);$('paedBtn').addEventListener('click',startPaediatricAgeMenu);attachLongPressBack($('ageBackBtn'),goMainMenu,goMainMenu);attachLongPressBack($('entryBackBtn'),goEntryBack,goMainMenu);$('helpBtn').addEventListener('click',renderHelp);$('closeHelpBtn').addEventListener('click',closeHelp);$('helpModal').addEventListener('click',e=>{if(e.target===$('helpModal'))closeHelp();});blockZoomGestures();blockTextSelectionAndCallout();showScreen('mainMenu');}
document.addEventListener('DOMContentLoaded',init);
