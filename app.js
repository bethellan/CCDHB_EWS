{"schemaVersion":"1.0","configId":"nz-ews-config","configVersion":"2026-05-23-draft-v61","displayName":"NZ Adult EWS and Paediatric PEWS Configuration","status":"draft","country":"NZ","clinicalSafetyNotice":"Draft configuration for application development and local verification. Do not use for clinical decision-making until checked against the current local chart and policy.","sourceNotes":[{"id":"adult-nzews-hqsc-chart","systemId":"adult-ews","title":"Adult Vital Signs Chart with New Zealand Early Warning Score","publisher":"Te Tāhū Hauora Health Quality & Safety Commission","dateAccessed":"2026-05-23","url":"https://www.hqsc.govt.nz/resources/resource-library/vital-signs-chart-with-new-zealand-early-warning-score/","notes":"Adult non-maternity NZEWS chart. Local escalation action text remains configurable."},{"id":"pews-user-guide-2023","systemId":"nz-pews","title":"Aotearoa New Zealand national paediatric early warning system and paediatric vital signs chart: User guide","publisher":"Te Tāhū Hauora Health Quality & Safety Commission","dateAccessed":"2026-05-23","url":"https://www.hqsc.govt.nz/assets/Our-work/Improved-service-delivery/Patient-deterioration/Publications-resources/Paediatric-vital-signs-chart-user-guide-2023.pdf","notes":"Defines the four paediatric age-based PVSCs and seven scoring parameters."},{"id":"pews-reminders-2025","systemId":"nz-pews","title":"Reminders for the Paediatric Early Warning System","publisher":"Te Tāhū Hauora Health Quality & Safety Commission","dateAccessed":"2026-05-23","url":"https://www.hqsc.govt.nz/assets/Our-work/Improved-service-delivery/Patient-deterioration/Publications-resources/PEWS-toolkit/Reminders-paediatric-early-warning-system.pdf","notes":"Applies current updates to 5–11 years lower systolic BP and 12+ years upper heart rate and lower systolic BP."},{"id":"te-wao-nui-pews-pathway-photo","systemId":"nz-pews","title":"Mandatory escalation pathway - Te Wao Nui Child Health Service","publisher":"Local paediatric flow sheet / Te Wao Nui Child Health Service","dateAccessed":"2026-05-24","url":"","notes":"Local paediatric mandatory escalation pathway transcribed from user-provided PEWS flow sheet image. Requires local verification before clinical use."},{"id":"te-wao-nui-local-pews-charts-2024","systemId":"nz-pews","title":"Te Wao Nui Child Health Service local paediatric vital signs charts","publisher":"Te Wao Nui Child Health Service / Health New Zealand Te Whatu Ora","dateAccessed":"2026-05-25","url":"","notes":"Local PEWS vital sign scoring ranges transcribed from user-provided chart photographs for 0–11 months, 1–4 years, 5–11 years and 12+ years. Requires local verification before clinical use."}],"display":{"theme":"clinical-friendly","zoneColours":{"white":"#ffffff","yellow":"#fff3a6","orange":"#ffd59e","red":"#f7b5c7","blue":"#cfe3ff"}},"systems":[{"id":"adult-ews","label":"NZ Adult EWS","shortLabel":"Adult EWS","description":"New Zealand adult EWS scoring matched to the previous adult-only CCDHB EWS app baseline.","patientGroup":"adult","sourceNoteIds":["adult-nzews-hqsc-chart"],"ageSelection":{"method":"single-band"},"scoreBehaviour":{"blueZoneOverridesTotal":true,"redZoneCanEscalateRegardlessOfTotal":true,"incompleteScoreSuffix":"+","nonScoringObservationsAllowed":true,"metScoreThreshold":10,"requireCompleteDefault":false,"emergencyDisplayLabel":"MET"},"ageBands":[{"id":"adult","label":"Adult","shortLabel":"Adult","minAgeMonths":null,"maxAgeMonths":null,"graphic":{"type":"local-svg","src":"assets/age-groups/adult.svg","emojiFallback":"🧑","alt":"Adult age group"},"parameters":[{"id":"respiratory-rate","label":"Resp Rate","shortLabel":"RR","type":"numeric","unit":"/min","scored":true,"usualMin":0,"usualMax":80,"ranges":[{"id":"rr-blue-low","min":null,"max":4,"score":"blue","zone":"blue","display":"<5","reason":"RR <5"},{"id":"rr-low-3","min":5,"max":8,"score":3,"zone":"red","display":"5–8","reason":"RR 5–8"},{"id":"rr-low-1","min":9,"max":11,"score":1,"zone":"yellow","display":"9–11","reason":"RR 9–11"},{"id":"rr-normal","min":12,"max":20,"score":0,"zone":"white","display":"12–20","reason":"RR 12–20"},{"id":"rr-high-2","min":21,"max":24,"score":2,"zone":"orange","display":"21–24","reason":"RR 21–24"},{"id":"rr-high-3","min":25,"max":35,"score":3,"zone":"red","display":"25–35","reason":"RR 25–35"},{"id":"rr-blue-high","min":36,"max":null,"score":"blue","zone":"blue","display":">35","reason":"RR >35"}]},{"id":"oxygen-supplementation","label":"Sup O₂","shortLabel":"O₂","type":"option","unit":"","scored":true,"options":[{"id":"no","label":"No","score":0,"zone":"white","reason":"No supplemental O₂"},{"id":"yes","label":"Yes","score":2,"zone":"orange","reason":"Supplemental O₂"}]},{"id":"oxygen-saturation","label":"SpO₂ %","shortLabel":"SpO₂","type":"numeric","unit":"%","scored":true,"usualMin":0,"usualMax":100,"ranges":[{"id":"spo2-low-3","min":null,"max":91,"score":3,"zone":"red","display":"≤91%","reason":"SpO₂ ≤91%"},{"id":"spo2-low-2","min":92,"max":93,"score":2,"zone":"orange","display":"92–93%","reason":"SpO₂ 92–93%"},{"id":"spo2-low-1","min":94,"max":95,"score":1,"zone":"yellow","display":"94–95%","reason":"SpO₂ 94–95%"},{"id":"spo2-normal","min":96,"max":null,"score":0,"zone":"white","display":"≥96%","reason":"SpO₂ ≥96%"}]},{"id":"temperature","label":"Temp (°C)","shortLabel":"Temp","type":"numeric","unit":"°C","scored":true,"usualMin":25,"usualMax":45,"ranges":[{"id":"temp-low-2","min":null,"max":34.9,"score":2,"zone":"orange","display":"≤34.9","reason":"Temp ≤34.9°C"},{"id":"temp-low-1","min":35.0,"max":35.9,"score":1,"zone":"yellow","display":"35.0–35.9","reason":"Temp 35.0–35.9°C"},{"id":"temp-normal","min":36.0,"max":37.9,"score":0,"zone":"white","display":"36.0–37.9","reason":"Temp 36.0–37.9°C"},{"id":"temp-high-1","min":38.0,"max":38.9,"score":1,"zone":"yellow","display":"38.0–38.9","reason":"Temp 38.0–38.9°C"},{"id":"temp-high-2","min":39.0,"max":null,"score":2,"zone":"orange","display":"≥39.0","reason":"Temp ≥39.0°C"}]},{"id":"systolic-blood-pressure","label":"Systolic BP","shortLabel":"SBP","type":"numeric","unit":"mmHg","scored":true,"usualMin":0,"usualMax":300,"ranges":[{"id":"sbp-blue-low","min":null,"max":69,"score":"blue","zone":"blue","display":"≤69","reason":"SBP ≤69"},{"id":"sbp-low-3","min":70,"max":89,"score":3,"zone":"red","display":"70–89","reason":"SBP 70–89"},{"id":"sbp-low-2","min":90,"max":99,"score":2,"zone":"orange","display":"90–99","reason":"SBP 90–99"},{"id":"sbp-low-1","min":100,"max":109,"score":1,"zone":"yellow","display":"100–109","reason":"SBP 100–109"},{"id":"sbp-normal","min":110,"max":219,"score":0,"zone":"white","display":"110–219","reason":"SBP 110–219"},{"id":"sbp-high-3","min":220,"max":null,"score":3,"zone":"red","display":"≥220","reason":"SBP ≥220"}]},{"id":"heart-rate","label":"Heart Rate","shortLabel":"HR","type":"numeric","unit":"/min","scored":true,"usualMin":0,"usualMax":300,"ranges":[{"id":"hr-blue-low","min":null,"max":39,"score":"blue","zone":"blue","display":"≤39","reason":"HR ≤39"},{"id":"hr-low-2","min":40,"max":49,"score":2,"zone":"orange","display":"40–49","reason":"HR 40–49"},{"id":"hr-normal","min":50,"max":89,"score":0,"zone":"white","display":"50–89","reason":"HR 50–89"},{"id":"hr-high-1","min":90,"max":110,"score":1,"zone":"yellow","display":"90–110","reason":"HR 90–110"},{"id":"hr-high-2","min":111,"max":129,"score":2,"zone":"orange","display":"111–129","reason":"HR 111–129"},{"id":"hr-high-3","min":130,"max":139,"score":3,"zone":"red","display":"130–139","reason":"HR 130–139"},{"id":"hr-blue-high","min":140,"max":null,"score":"blue","zone":"blue","display":"≥140","reason":"HR ≥140"}]},{"id":"level-of-consciousness","label":"LOC","shortLabel":"LOC","type":"option","unit":"","scored":true,"options":[{"id":"alert","label":"Alert","score":0,"zone":"white","reason":"Alert"},{"id":"voice-or-pain","label":"Voice or Pain","score":3,"zone":"red","reason":"Responds to voice or pain"},{"id":"unresponsive-fitting","label":"Unresponsive/fitting","score":"blue","zone":"blue","reason":"Unresponsive/fitting"}]}],"nonScoringObservations":[{"id":"patient-family-staff-concern","label":"Patient/family/staff concern","type":"option","scored":false,"safetyOverride":true,"options":[{"id":"no","label":"No concern"},{"id":"yes","label":"Concern present","action":"Escalate regardless of vital signs or EWS."}]}]}],"escalationBands":[{"id":"ews-0","minScore":0,"maxScore":0,"label":"EWS 0","colour":"white","actionTitle":"No mandatory action","actionText":"Mandatory Action: —"},{"id":"ews-1-5","minScore":1,"maxScore":5,"label":"EWS 1–5","colour":"yellow","actionTitle":"Increase monitoring","actionText":"Mandatory Action: Manage pain/fever/distress, increase monitoring frequency"},{"id":"ews-6-7","minScore":6,"maxScore":7,"label":"EWS 6–7","colour":"orange","actionTitle":"House officer review","actionText":"Mandatory Action: House officer review within 60 min, inform nurse in charge, refer to PAR nurse"},{"id":"ews-8-9-or-red","minScore":8,"maxScore":9,"label":"EWS 8–9 or any red parameter","colour":"red","actionTitle":"Registrar review","actionText":"Mandatory Action: Registrar review within 20 min, consider ICU referral"},{"id":"ews-10-plus-or-blue","minScore":10,"maxScore":null,"trigger":"score-10-plus-or-any-blue-zone","label":"EWS ≥10 or blue-zone trigger","colour":"blue","actionTitle":"MET call","actionText":"Mandatory Action: Dial 777, call MET, support ABC"}]},{"id":"nz-pews","label":"NZ Paediatric EWS","shortLabel":"PEWS","description":"Aotearoa New Zealand national paediatric early warning system with four age-banded paediatric vital signs charts.","patientGroup":"paediatric","sourceNoteIds":["pews-user-guide-2023","pews-reminders-2025","te-wao-nui-pews-pathway-photo","te-wao-nui-local-pews-charts-2024"],"ageSelection":{"method":"age-band","unit":"months"},"scoreBehaviour":{"blueZoneOverridesTotal":true,"incompleteScoreSuffix":"+","nonScoringObservationsAllowed":true,"emergencyDisplayLabel":"PET","escalationPrompt":"Escalate care for any patient you or their whānau are worried about, regardless of vital signs or PEWS."},"ageBands":[{"id":"infant-0-11-months","label":"0–11 months","shortLabel":"Infant","minAgeMonths":0,"maxAgeMonths":11,"graphic":{"type":"local-png","src":"assets/age-groups/infant.png","emojiFallback":"👶","alt":"Infant age group"},"parameters":[{"id":"respiratory-rate","label":"Respiratory rate","shortLabel":"RR","type":"numeric","unit":"/min","scored":true,"ranges":[{"id":"rr-blue-low","min":null,"max":9,"score":"blue","zone":"blue","display":"≤9","reason":"≤9"},{"id":"rr-low-4","min":10,"max":19,"score":4,"zone":"red","display":"10–19","reason":"10–19"},{"id":"rr-low-2","min":20,"max":24,"score":2,"zone":"orange","display":"20–24","reason":"20–24"},{"id":"rr-low-1","min":25,"max":29,"score":1,"zone":"yellow","display":"25–29","reason":"25–29"},{"id":"rr-normal","min":30,"max":49,"score":0,"zone":"white","display":"30–49","reason":"30–49"},{"id":"rr-high-1","min":50,"max":54,"score":1,"zone":"yellow","display":"50–54","reason":"50–54"},{"id":"rr-high-2","min":55,"max":69,"score":2,"zone":"orange","display":"55–69","reason":"55–69"},{"id":"rr-high-4","min":70,"max":null,"score":4,"zone":"red","display":"≥70","reason":"≥70"}]},{"id":"respiratory-distress","label":"Respiratory distress","shortLabel":"WOB","type":"option","scored":true,"options":[{"id":"nil","label":"Nil","score":0,"zone":"white"},{"id":"mild","label":"Mild","score":1,"zone":"yellow"},{"id":"moderate","label":"Moderate","score":2,"zone":"orange"},{"id":"severe","label":"Severe","score":4,"zone":"red"}],"assessmentGuide":{"title":"Assessment of respiratory distress guide","scoringRule":"Score at the level of severest sign.","note":"Note that not all features are relevant to all conditions.","columns":[{"id":"mild","label":"Mild","scoreOptionId":"mild"},{"id":"moderate","label":"Moderate","scoreOptionId":"moderate"},{"id":"severe","label":"Severe","scoreOptionId":"severe"}],"rows":[{"id":"airway","label":"Airway","mild":["Stridor on exertion or crying","Wheeze present"],"moderate":["Some stridor at rest","Wheeze marked"],"severe":["Stridor at rest","New onset of stridor","Wheeze severe","Silent chest"]},{"id":"behaviour-feeding","label":"Behaviour and feeding","mild":["Normal","Talks in sentences"],"moderate":["Some or intermittent irritability","Difficulty talking or crying","Difficulty feeding or eating"],"severe":["Increased irritability and/or lethargy","Looks exhausted","Unable to talk or cry","Unable to feed or eat"]},{"id":"accessory-muscle-use","label":"Accessory muscle use","mild":["Mild intercostal and suprasternal recession"],"moderate":["Moderate intercostal and suprasternal recession","Tracheal tug","Nasal flaring","Head bobbing"],"severe":["Marked intercostal and suprasternal recession"]},{"id":"other","label":"Other","mild":[],"moderate":["May have brief apnoea"],"severe":["Gasping, grunting","Extreme pallor, cyanosis","Increasingly frequent or prolonged apnoea"]}]}},{"id":"oxygen-requirement","label":"Oxygen requirement","shortLabel":"O₂","type":"option","scored":true,"options":[{"id":"room-air","label":"Room air / no respiratory support","score":0,"zone":"white"},{"id":"low-flow-or-hf-under-35","label":"<4 L/min oxygen or high flow FiO₂ <35%","score":2,"zone":"orange"},{"id":"four-plus-or-hf-35-plus","label":"≥4 L/min oxygen or high flow FiO₂ ≥35%","score":4,"zone":"red"}]},{"id":"oxygen-saturation","label":"Oxygen saturation","shortLabel":"SpO₂","type":"numeric","unit":"%","scored":true,"ranges":[{"id":"spo2-low-2","min":null,"max":90,"score":2,"zone":"orange","display":"≤90"},{"id":"spo2-low-1","min":91,"max":94,"score":1,"zone":"yellow","display":"91–94"},{"id":"spo2-normal","min":95,"max":null,"score":0,"zone":"white","display":"≥95"}]},{"id":"heart-rate","label":"Heart rate","shortLabel":"HR","type":"numeric","unit":"/min","scored":true,"ranges":[{"id":"hr-blue-low","min":null,"max":59,"score":"blue","zone":"blue","display":"≤59"},{"id":"hr-low-4","min":60,"max":79,"score":4,"zone":"red","display":"60–79"},{"id":"hr-low-2","min":80,"max":89,"score":2,"zone":"orange","display":"80–89"},{"id":"hr-low-1","min":90,"max":109,"score":1,"zone":"yellow","display":"90–109"},{"id":"hr-normal","min":110,"max":159,"score":0,"zone":"white","display":"110–159"},{"id":"hr-high-1","min":160,"max":169,"score":1,"zone":"yellow","display":"160–169"},{"id":"hr-high-2","min":170,"max":179,"score":2,"zone":"orange","display":"170–179"},{"id":"hr-high-4","min":180,"max":null,"score":4,"zone":"red","display":"≥180"}]},{"id":"central-capillary-refill","label":"Central capillary refill","shortLabel":"CRT","type":"option","scored":true,"options":[{"id":"under-3-sec","label":"<3 sec","score":0,"zone":"white"},{"id":"3-sec-or-more","label":"≥3 sec","score":4,"zone":"red"}],"unit":"sec"},{"id":"systolic-blood-pressure","label":"Systolic blood pressure","shortLabel":"SBP","type":"numeric","unit":"mmHg","scored":true,"ranges":[{"id":"sbp-blue-low","min":null,"max":49,"score":"blue","zone":"blue","display":"≤49","reason":"≤49"},{"id":"sbp-low-4","min":50,"max":54,"score":4,"zone":"red","display":"50–54","reason":"50–54"},{"id":"sbp-low-2","min":55,"max":64,"score":2,"zone":"orange","display":"55–64","reason":"55–64"},{"id":"sbp-low-1","min":65,"max":74,"score":1,"zone":"yellow","display":"65–74","reason":"65–74"},{"id":"sbp-normal","min":75,"max":99,"score":0,"zone":"white","display":"75–99","reason":"75–99"},{"id":"sbp-high-1","min":100,"max":119,"score":1,"zone":"yellow","display":"100–119","reason":"100–119"},{"id":"sbp-high-2","min":120,"max":149,"score":2,"zone":"orange","display":"120–149","reason":"120–149"},{"id":"sbp-high-4","min":150,"max":null,"score":4,"zone":"red","display":"≥150","reason":"≥150"}]}],"nonScoringObservations":[{"id":"whanau-concern","label":"Whānau concern","type":"option","scored":false,"safetyOverride":true,"options":[{"id":"no","label":"No concern"},{"id":"yes","label":"Concern present","action":"Escalate regardless of PEWS score."},{"id":"absent","label":"Whānau absent"}]},{"id":"level-of-consciousness","label":"Level of consciousness","type":"option","scored":false,"options":[{"id":"alert","label":"Alert"},{"id":"voice","label":"Voice"},{"id":"pain","label":"Pain"},{"id":"unresponsive","label":"Unresponsive"},{"id":"asleep","label":"Asleep"}]},{"id":"temperature","label":"Temperature","type":"numeric","unit":"°C","scored":false},{"id":"pain-score","label":"Pain score","type":"numeric","unit":"/10","scored":false}]},{"id":"preschool-1-4-years","label":"1–4 years","shortLabel":"Preschool","minAgeMonths":12,"maxAgeMonths":59,"graphic":{"type":"local-png","src":"assets/age-groups/preschool.png","emojiFallback":"🧸","alt":"Preschool age group"},"parameters":[{"id":"respiratory-rate","label":"Respiratory rate","shortLabel":"RR","type":"numeric","unit":"/min","scored":true,"ranges":[{"id":"rr-blue-low","min":null,"max":4,"score":"blue","zone":"blue","display":"≤4","reason":"≤4"},{"id":"rr-low-4","min":5,"max":14,"score":4,"zone":"red","display":"5–14","reason":"5–14"},{"id":"rr-low-2","min":15,"max":17,"score":2,"zone":"orange","display":"15–17","reason":"15–17"},{"id":"rr-low-1","min":18,"max":19,"score":1,"zone":"yellow","display":"18–19","reason":"18–19"},{"id":"rr-normal","min":20,"max":39,"score":0,"zone":"white","display":"20–39","reason":"20–39"},{"id":"rr-high-1","min":40,"max":44,"score":1,"zone":"yellow","display":"40–44","reason":"40–44"},{"id":"rr-high-2","min":45,"max":54,"score":2,"zone":"orange","display":"45–54","reason":"45–54"},{"id":"rr-high-4","min":55,"max":null,"score":4,"zone":"red","display":"≥55","reason":"≥55"}]},{"id":"respiratory-distress","label":"Respiratory distress","shortLabel":"WOB","type":"option","scored":true,"options":[{"id":"nil","label":"Nil","score":0,"zone":"white"},{"id":"mild","label":"Mild","score":1,"zone":"yellow"},{"id":"moderate","label":"Moderate","score":2,"zone":"orange"},{"id":"severe","label":"Severe","score":4,"zone":"red"}],"assessmentGuide":{"title":"Assessment of respiratory distress guide","scoringRule":"Score at the level of severest sign.","note":"Note that not all features are relevant to all conditions.","columns":[{"id":"mild","label":"Mild","scoreOptionId":"mild"},{"id":"moderate","label":"Moderate","scoreOptionId":"moderate"},{"id":"severe","label":"Severe","scoreOptionId":"severe"}],"rows":[{"id":"airway","label":"Airway","mild":["Stridor on exertion or crying","Wheeze present"],"moderate":["Some stridor at rest","Wheeze marked"],"severe":["Stridor at rest","New onset of stridor","Wheeze severe","Silent chest"]},{"id":"behaviour-feeding","label":"Behaviour and feeding","mild":["Normal","Talks in sentences"],"moderate":["Some or intermittent irritability","Difficulty talking or crying","Difficulty feeding or eating"],"severe":["Increased irritability and/or lethargy","Looks exhausted","Unable to talk or cry","Unable to feed or eat"]},{"id":"accessory-muscle-use","label":"Accessory muscle use","mild":["Mild intercostal and suprasternal recession"],"moderate":["Moderate intercostal and suprasternal recession","Tracheal tug","Nasal flaring","Head bobbing"],"severe":["Marked intercostal and suprasternal recession"]},{"id":"other","label":"Other","mild":[],"moderate":["May have brief apnoea"],"severe":["Gasping, grunting","Extreme pallor, cyanosis","Increasingly frequent or prolonged apnoea"]}]}},{"id":"oxygen-requirement","label":"Oxygen requirement","shortLabel":"O₂","type":"option","scored":true,"options":[{"id":"room-air","label":"Room air / no respiratory support","score":0,"zone":"white"},{"id":"low-flow-or-hf-under-35","label":"<4 L/min oxygen or high flow FiO₂ <35%","score":2,"zone":"orange"},{"id":"four-plus-or-hf-35-plus","label":"≥4 L/min oxygen or high flow FiO₂ ≥35%","score":4,"zone":"red"}]},{"id":"oxygen-saturation","label":"Oxygen saturation","shortLabel":"SpO₂","type":"numeric","unit":"%","scored":true,"ranges":[{"id":"spo2-low-2","min":null,"max":90,"score":2,"zone":"orange","display":"≤90"},{"id":"spo2-low-1","min":91,"max":94,"score":1,"zone":"yellow","display":"91–94"},{"id":"spo2-normal","min":95,"max":null,"score":0,"zone":"white","display":"≥95"}]},{"id":"heart-rate","label":"Heart rate","shortLabel":"HR","type":"numeric","unit":"/min","scored":true,"ranges":[{"id":"hr-blue-low","min":null,"max":59,"score":"blue","zone":"blue","display":"≤59","reason":"≤59"},{"id":"hr-low-4","min":60,"max":69,"score":4,"zone":"red","display":"60–69","reason":"60–69"},{"id":"hr-low-2","min":70,"max":79,"score":2,"zone":"orange","display":"70–79","reason":"70–79"},{"id":"hr-low-1","min":80,"max":89,"score":1,"zone":"yellow","display":"80–89","reason":"80–89"},{"id":"hr-normal","min":90,"max":139,"score":0,"zone":"white","display":"90–139","reason":"90–139"},{"id":"hr-high-1","min":140,"max":149,"score":1,"zone":"yellow","display":"140–149","reason":"140–149"},{"id":"hr-high-2","min":150,"max":159,"score":2,"zone":"orange","display":"150–159","reason":"150–159"},{"id":"hr-high-4","min":160,"max":null,"score":4,"zone":"red","display":"≥160","reason":"≥160"}]},{"id":"central-capillary-refill","label":"Central capillary refill","shortLabel":"CRT","type":"option","scored":true,"options":[{"id":"under-3-sec","label":"<3 sec","score":0,"zone":"white"},{"id":"3-sec-or-more","label":"≥3 sec","score":4,"zone":"red"}],"unit":"sec"},{"id":"systolic-blood-pressure","label":"Systolic blood pressure","shortLabel":"SBP","type":"numeric","unit":"mmHg","scored":true,"ranges":[{"id":"sbp-blue-low","min":null,"max":54,"score":"blue","zone":"blue","display":"≤54","reason":"≤54"},{"id":"sbp-low-4","min":55,"max":64,"score":4,"zone":"red","display":"55–64","reason":"55–64"},{"id":"sbp-low-2","min":65,"max":74,"score":2,"zone":"orange","display":"65–74","reason":"65–74"},{"id":"sbp-low-1","min":75,"max":89,"score":1,"zone":"yellow","display":"75–89","reason":"75–89"},{"id":"sbp-normal","min":90,"max":109,"score":0,"zone":"white","display":"90–109","reason":"90–109"},{"id":"sbp-high-1","min":110,"max":124,"score":1,"zone":"yellow","display":"110–124","reason":"110–124"},{"id":"sbp-high-2","min":125,"max":159,"score":2,"zone":"orange","display":"125–159","reason":"125–159"},{"id":"sbp-high-4","min":160,"max":null,"score":4,"zone":"red","display":"≥160","reason":"≥160"}]}],"nonScoringObservations":[{"id":"whanau-concern","label":"Whānau concern","type":"option","scored":false,"safetyOverride":true,"options":[{"id":"no","label":"No concern"},{"id":"yes","label":"Concern present","action":"Escalate regardless of PEWS score."},{"id":"absent","label":"Whānau absent"}]},{"id":"level-of-consciousness","label":"Level of consciousness","type":"option","scored":false,"options":[{"id":"alert","label":"Alert"},{"id":"voice","label":"Voice"},{"id":"pain","label":"Pain"},{"id":"unresponsive","label":"Unresponsive"},{"id":"asleep","label":"Asleep"}]},{"id":"temperature","label":"Temperature","type":"numeric","unit":"°C","scored":false},{"id":"pain-score","label":"Pain score","type":"numeric","unit":"/10","scored":false}]},{"id":"child-5-11-years","label":"5–11 years","shortLabel":"Child","minAgeMonths":60,"maxAgeMonths":143,"graphic":{"type":"local-png","src":"assets/age-groups/child.png","emojiFallback":"🎒","alt":"Child age group"},"parameters":[{"id":"respiratory-rate","label":"Respiratory rate","shortLabel":"RR","type":"numeric","unit":"/min","scored":true,"ranges":[{"id":"rr-blue-low","min":null,"max":4,"score":"blue","zone":"blue","display":"≤4","reason":"≤4"},{"id":"rr-low-4","min":5,"max":11,"score":4,"zone":"red","display":"5–11","reason":"5–11"},{"id":"rr-low-2","min":12,"max":14,"score":2,"zone":"orange","display":"12–14","reason":"12–14"},{"id":"rr-low-1","min":15,"max":19,"score":1,"zone":"yellow","display":"15–19","reason":"15–19"},{"id":"rr-normal","min":20,"max":29,"score":0,"zone":"white","display":"20–29","reason":"20–29"},{"id":"rr-high-1","min":30,"max":34,"score":1,"zone":"yellow","display":"30–34","reason":"30–34"},{"id":"rr-high-2","min":35,"max":44,"score":2,"zone":"orange","display":"35–44","reason":"35–44"},{"id":"rr-high-4","min":45,"max":null,"score":4,"zone":"red","display":"≥45","reason":"≥45"}]},{"id":"respiratory-distress","label":"Respiratory distress","shortLabel":"WOB","type":"option","scored":true,"options":[{"id":"nil","label":"Nil","score":0,"zone":"white"},{"id":"mild","label":"Mild","score":1,"zone":"yellow"},{"id":"moderate","label":"Moderate","score":2,"zone":"orange"},{"id":"severe","label":"Severe","score":4,"zone":"red"}],"assessmentGuide":{"title":"Assessment of respiratory distress guide","scoringRule":"Score at the level of severest sign.","note":"Note that not all features are relevant to all conditions.","columns":[{"id":"mild","label":"Mild","scoreOptionId":"mild"},{"id":"moderate","label":"Moderate","scoreOptionId":"moderate"},{"id":"severe","label":"Severe","scoreOptionId":"severe"}],"rows":[{"id":"airway","label":"Airway","mild":["Stridor on exertion or crying","Wheeze present"],"moderate":["Some stridor at rest","Wheeze marked"],"severe":["Stridor at rest","New onset of stridor","Wheeze severe","Silent chest"]},{"id":"behaviour-feeding","label":"Behaviour and feeding","mild":["Normal","Talks in sentences"],"moderate":["Some or intermittent irritability","Difficulty talking or crying","Difficulty feeding or eating"],"severe":["Increased irritability and/or lethargy","Looks exhausted","Unable to talk or cry","Unable to feed or eat"]},{"id":"accessory-muscle-use","label":"Accessory muscle use","mild":["Mild intercostal and suprasternal recession"],"moderate":["Moderate intercostal and suprasternal recession","Tracheal tug","Nasal flaring","Head bobbing"],"severe":["Marked intercostal and suprasternal recession"]},{"id":"other","label":"Other","mild":[],"moderate":["May have brief apnoea"],"severe":["Gasping, grunting","Extreme pallor, cyanosis","Increasingly frequent or prolonged apnoea"]}]}},{"id":"oxygen-requirement","label":"Oxygen requirement","shortLabel":"O₂","type":"option","scored":true,"options":[{"id":"room-air","label":"Room air / no respiratory support","score":0,"zone":"white"},{"id":"low-flow-or-hf-under-35","label":"<4 L/min oxygen or high flow FiO₂ <35%","score":2,"zone":"orange"},{"id":"four-plus-or-hf-35-plus","label":"≥4 L/min oxygen or high flow FiO₂ ≥35%","score":4,"zone":"red"}]},{"id":"oxygen-saturation","label":"Oxygen saturation","shortLabel":"SpO₂","type":"numeric","unit":"%","scored":true,"ranges":[{"id":"spo2-low-2","min":null,"max":90,"score":2,"zone":"orange","display":"≤90"},{"id":"spo2-low-1","min":91,"max":94,"score":1,"zone":"yellow","display":"91–94"},{"id":"spo2-normal","min":95,"max":null,"score":0,"zone":"white","display":"≥95"}]},{"id":"heart-rate","label":"Heart rate","shortLabel":"HR","type":"numeric","unit":"/min","scored":true,"ranges":[{"id":"hr-blue-low","min":null,"max":49,"score":"blue","zone":"blue","display":"≤49","reason":"≤49"},{"id":"hr-low-4","min":50,"max":59,"score":4,"zone":"red","display":"50–59","reason":"50–59"},{"id":"hr-low-2","min":60,"max":69,"score":2,"zone":"orange","display":"60–69","reason":"60–69"},{"id":"hr-low-1","min":70,"max":79,"score":1,"zone":"yellow","display":"70–79","reason":"70–79"},{"id":"hr-normal","min":80,"max":129,"score":0,"zone":"white","display":"80–129","reason":"80–129"},{"id":"hr-high-1","min":130,"max":139,"score":1,"zone":"yellow","display":"130–139","reason":"130–139"},{"id":"hr-high-2","min":140,"max":154,"score":2,"zone":"orange","display":"140–154","reason":"140–154"},{"id":"hr-high-4","min":155,"max":null,"score":4,"zone":"red","display":"≥155","reason":"≥155"}]},{"id":"central-capillary-refill","label":"Central capillary refill","shortLabel":"CRT","type":"option","scored":true,"options":[{"id":"under-3-sec","label":"<3 sec","score":0,"zone":"white"},{"id":"3-sec-or-more","label":"≥3 sec","score":4,"zone":"red"}],"unit":"sec"},{"id":"systolic-blood-pressure","label":"Systolic blood pressure","shortLabel":"SBP","type":"numeric","unit":"mmHg","scored":true,"ranges":[{"id":"sbp-blue-low","min":null,"max":54,"score":"blue","zone":"blue","display":"≤54","reason":"≤54"},{"id":"sbp-low-4","min":55,"max":69,"score":4,"zone":"red","display":"55–69","reason":"55–69"},{"id":"sbp-low-2","min":70,"max":79,"score":2,"zone":"orange","display":"70–79","reason":"70–79"},{"id":"sbp-low-1","min":80,"max":89,"score":1,"zone":"yellow","display":"80–89","reason":"80–89"},{"id":"sbp-normal","min":90,"max":119,"score":0,"zone":"white","display":"90–119","reason":"90–119"},{"id":"sbp-high-1","min":120,"max":139,"score":1,"zone":"yellow","display":"120–139","reason":"120–139"},{"id":"sbp-high-2","min":140,"max":169,"score":2,"zone":"orange","display":"140–169","reason":"140–169"},{"id":"sbp-high-4","min":170,"max":null,"score":4,"zone":"red","display":"≥170","reason":"≥170"}]}],"nonScoringObservations":[{"id":"whanau-concern","label":"Whānau concern","type":"option","scored":false,"safetyOverride":true,"options":[{"id":"no","label":"No concern"},{"id":"yes","label":"Concern present","action":"Escalate regardless of PEWS score."},{"id":"absent","label":"Whānau absent"}]},{"id":"level-of-consciousness","label":"Level of consciousness","type":"option","scored":false,"options":[{"id":"alert","label":"Alert"},{"id":"voice","label":"Voice"},{"id":"pain","label":"Pain"},{"id":"unresponsive","label":"Unresponsive"},{"id":"asleep","label":"Asleep"}]},{"id":"temperature","label":"Temperature","type":"numeric","unit":"°C","scored":false},{"id":"pain-score","label":"Pain score","type":"numeric","unit":"/10","scored":false}]},{"id":"adolescent-12-plus-years","label":"12+ years","shortLabel":"Adolescent","minAgeMonths":144,"maxAgeMonths":null,"graphic":{"type":"local-png","src":"assets/age-groups/adolescent.png","emojiFallback":"🧑‍🎧","alt":"Adolescent age group"},"parameters":[{"id":"respiratory-rate","label":"Respiratory rate","shortLabel":"RR","type":"numeric","unit":"/min","scored":true,"ranges":[{"id":"rr-blue-low","min":null,"max":4,"score":"blue","zone":"blue","display":"≤4","reason":"≤4"},{"id":"rr-low-4","min":5,"max":9,"score":4,"zone":"red","display":"5–9","reason":"5–9"},{"id":"rr-low-2","min":10,"max":11,"score":2,"zone":"orange","display":"10–11","reason":"10–11"},{"id":"rr-low-1","min":12,"max":14,"score":1,"zone":"yellow","display":"12–14","reason":"12–14"},{"id":"rr-normal","min":15,"max":24,"score":0,"zone":"white","display":"15–24","reason":"15–24"},{"id":"rr-high-1","min":25,"max":29,"score":1,"zone":"yellow","display":"25–29","reason":"25–29"},{"id":"rr-high-2","min":30,"max":34,"score":2,"zone":"orange","display":"30–34","reason":"30–34"},{"id":"rr-high-4","min":35,"max":null,"score":4,"zone":"red","display":"≥35","reason":"≥35"}]},{"id":"respiratory-distress","label":"Respiratory distress","shortLabel":"WOB","type":"option","scored":true,"options":[{"id":"nil","label":"Nil","score":0,"zone":"white"},{"id":"mild","label":"Mild","score":1,"zone":"yellow"},{"id":"moderate","label":"Moderate","score":2,"zone":"orange"},{"id":"severe","label":"Severe","score":4,"zone":"red"}],"assessmentGuide":{"title":"Assessment of respiratory distress guide","scoringRule":"Score at the level of severest sign.","note":"Note that not all features are relevant to all conditions.","columns":[{"id":"mild","label":"Mild","scoreOptionId":"mild"},{"id":"moderate","label":"Moderate","scoreOptionId":"moderate"},{"id":"severe","label":"Severe","scoreOptionId":"severe"}],"rows":[{"id":"airway","label":"Airway","mild":["Stridor on exertion or crying","Wheeze present"],"moderate":["Some stridor at rest","Wheeze marked"],"severe":["Stridor at rest","New onset of stridor","Wheeze severe","Silent chest"]},{"id":"behaviour-feeding","label":"Behaviour and feeding","mild":["Normal","Talks in sentences"],"moderate":["Some or intermittent irritability","Difficulty talking or crying","Difficulty feeding or eating"],"severe":["Increased irritability and/or lethargy","Looks exhausted","Unable to talk or cry","Unable to feed or eat"]},{"id":"accessory-muscle-use","label":"Accessory muscle use","mild":["Mild intercostal and suprasternal recession"],"moderate":["Moderate intercostal and suprasternal recession","Tracheal tug","Nasal flaring","Head bobbing"],"severe":["Marked intercostal and suprasternal recession"]},{"id":"other","label":"Other","mild":[],"moderate":["May have brief apnoea"],"severe":["Gasping, grunting","Extreme pallor, cyanosis","Increasingly frequent or prolonged apnoea"]}]}},{"id":"oxygen-requirement","label":"Oxygen requirement","shortLabel":"O₂","type":"option","scored":true,"options":[{"id":"room-air","label":"Room air / no respiratory support","score":0,"zone":"white"},{"id":"low-flow-or-hf-under-35","label":"<4 L/min oxygen or high flow FiO₂ <35%","score":2,"zone":"orange"},{"id":"four-plus-or-hf-35-plus","label":"≥4 L/min oxygen or high flow FiO₂ ≥35%","score":4,"zone":"red"}]},{"id":"oxygen-saturation","label":"Oxygen saturation","shortLabel":"SpO₂","type":"numeric","unit":"%","scored":true,"ranges":[{"id":"spo2-low-2","min":null,"max":90,"score":2,"zone":"orange","display":"≤90"},{"id":"spo2-low-1","min":91,"max":94,"score":1,"zone":"yellow","display":"91–94"},{"id":"spo2-normal","min":95,"max":null,"score":0,"zone":"white","display":"≥95"}]},{"id":"heart-rate","label":"Heart rate","shortLabel":"HR","type":"numeric","unit":"/min","scored":true,"ranges":[{"id":"hr-blue-low","min":null,"max":39,"score":"blue","zone":"blue","display":"≤39","reason":"≤39"},{"id":"hr-low-4","min":40,"max":49,"score":4,"zone":"red","display":"40–49","reason":"40–49"},{"id":"hr-low-2","min":50,"max":59,"score":2,"zone":"orange","display":"50–59","reason":"50–59"},{"id":"hr-low-1","min":60,"max":64,"score":1,"zone":"yellow","display":"60–64","reason":"60–64"},{"id":"hr-normal","min":65,"max":109,"score":0,"zone":"white","display":"65–109","reason":"65–109"},{"id":"hr-high-1","min":110,"max":119,"score":1,"zone":"yellow","display":"110–119","reason":"110–119"},{"id":"hr-high-2","min":120,"max":134,"score":2,"zone":"orange","display":"120–134","reason":"120–134"},{"id":"hr-high-4","min":135,"max":null,"score":4,"zone":"red","display":"≥135","reason":"≥135"}]},{"id":"central-capillary-refill","label":"Central capillary refill","shortLabel":"CRT","type":"option","scored":true,"options":[{"id":"under-3-sec","label":"<3 sec","score":0,"zone":"white"},{"id":"3-sec-or-more","label":"≥3 sec","score":4,"zone":"red"}],"unit":"sec"},{"id":"systolic-blood-pressure","label":"Systolic blood pressure","shortLabel":"SBP","type":"numeric","unit":"mmHg","scored":true,"ranges":[{"id":"sbp-blue-low","min":null,"max":64,"score":"blue","zone":"blue","display":"≤64","reason":"≤64"},{"id":"sbp-low-4","min":65,"max":69,"score":4,"zone":"red","display":"65–69","reason":"65–69"},{"id":"sbp-low-2","min":70,"max":84,"score":2,"zone":"orange","display":"70–84","reason":"70–84"},{"id":"sbp-low-1","min":85,"max":99,"score":1,"zone":"yellow","display":"85–99","reason":"85–99"},{"id":"sbp-normal","min":100,"max":134,"score":0,"zone":"white","display":"100–134","reason":"100–134"},{"id":"sbp-high-1","min":135,"max":149,"score":1,"zone":"yellow","display":"135–149","reason":"135–149"},{"id":"sbp-high-2","min":150,"max":189,"score":2,"zone":"orange","display":"150–189","reason":"150–189"},{"id":"sbp-high-4","min":190,"max":null,"score":4,"zone":"red","display":"≥190","reason":"≥190"}]}],"nonScoringObservations":[{"id":"whanau-concern","label":"Whānau concern","type":"option","scored":false,"safetyOverride":true,"options":[{"id":"no","label":"No concern"},{"id":"yes","label":"Concern present","action":"Escalate regardless of PEWS score."},{"id":"absent","label":"Whānau absent"}]},{"id":"level-of-consciousness","label":"Level of consciousness","type":"option","scored":false,"options":[{"id":"alert","label":"Alert"},{"id":"voice","label":"Voice"},{"id":"pain","label":"Pain"},{"id":"unresponsive","label":"Unresponsive"},{"id":"asleep","label":"Asleep"}]},{"id":"temperature","label":"Temperature","type":"numeric","unit":"°C","scored":false},{"id":"pain-score","label":"Pain score","type":"numeric","unit":"/10","scored":false}]}],"escalationBands":[{"id":"pews-1-3","minScore":1,"maxScore":3,"label":"PEWS 1–3","colour":"yellow","actionTitle":"PEWS 1–3","actionText":"Optimise appropriate treatment as prescribed.
Manage pain, anxiety or distress.
Observations at least 4 hourly or more frequently if required.
Review oxygen requirement.
Consider informing ACNM/Nurse in Charge."},{"id":"pews-4-5","minScore":4,"maxScore":5,"label":"PEWS 4–5","colour":"orange","actionTitle":"PEWS 4–5","actionText":"Notify ACNM/Nurse in Charge.
HO review within 60 minutes.
Calculate full PEWS.
Optimise treatment.
Re-calculate full PEWS after interventions.
Document plan, including timeframe, criteria for review and frequency of vital signs.
Communicate plan to whānau."},{"id":"pews-6-7","minScore":6,"maxScore":7,"label":"PEWS 6–7","colour":"red","actionTitle":"PEWS 6–7","actionText":"Notify ACNM/Nurse in Charge.
HO/Registrar review within 30 minutes.
Consider Paediatric Medical & PAR team referral #6785.
Consider ICU referral.
Re-calculate full PEWS after interventions.
Document plan, including timeframe, criteria for review and frequency of vital signs.
Communicate plan to whānau."},{"id":"pews-8-plus","minScore":8,"maxScore":null,"label":"PEWS 8+","colour":"red","actionTitle":"PEWS 8+","actionText":"CONSIDER 777 PET CALL.
Notify ACNM/Nurse in Charge.
Immediate Paediatric Registrar + PAR review.
Primary team review.
Continuous monitoring.
Monitor ABCD.
Document plan as above.
Re-calculate full PEWS after interventions.
Consider transfer to ICU.
Communicate plan to whānau."},{"id":"blue-zone","trigger":"any-blue-zone","label":"Any vital sign in the blue zone","colour":"blue","actionTitle":"PET / Paediatric medical emergency","actionText":"DIAL 777 and STATE PAEDIATRIC MEDICAL EMERGENCY.
Support ABC + check blood glucose.

Dial 777 immediately if:
Respiratory or cardiac arrest imminent or major bleeding."}],"escalationPathwayTitle":"Mandatory escalation pathway - Te Wao Nui Child Health Service"}],"developmentNotes":["Application created by Andrew Bethell in his own time using AI-assisted development. Copyright © Andrew Bethell. All rights reserved."]}

'use strict';
const APP_VERSION='v61';
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
