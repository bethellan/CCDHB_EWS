## v72

- Silences MET/PET alarm when returning to the main menu from the summary screen.
- Adds a respiratory distress long-press guide hint under the paediatric respiratory distress options.
- No scoring logic changes.

# EWS working local v46

NZ Adult EWS + NZ Paediatric PEWS calculator.

## v46 changes

- Paediatric age-group graphics now use PNG icons instead of the earlier SVG placeholders.
- `data/ews-config.json` now points to:
  - `assets/age-groups/infant.png`
  - `assets/age-groups/preschool.png`
  - `assets/age-groups/child.png`
  - `assets/age-groups/adolescent.png`
- Old paediatric SVG icon files have been removed from the package.
- Adult EWS, PEWS scoring data, and calculator logic were not intentionally changed.

- v46 consolidates the emergency final summary: if MET/PET criteria are met, only one enlarged pulsating MET/PET box is shown, with no duplicated emergency label or numeric detail boxes.


v48: Adds a gentle repeating emergency alarm for MET/PET final summaries with a Silence alarm control. The large single pulsating emergency banner remains.


## v52

Adds the Te Wao Nui Child Health Service paediatric mandatory escalation pathway to `data/ews-config.json`; PEWS Help and final summary mandatory action now use the local pathway text.

## v48
- Increased the gentle emergency alarm volume.
- Made the single MET/PET final-screen emergency banner flash more clearly.


## v52
- Selected MET/PET emergency alarm changed to a gentle chime pattern.
- Alarm repeat interval slightly relaxed to reduce harshness while remaining noticeable.
- No scoring logic changes.


## v53

- Updated local Te Wao Nui PEWS chart ranges for all four paediatric age groups.
- Added paediatric respiratory distress long-press assessment guide.
- Respiratory distress helper applies the highest selected severity and then advances to oxygen requirement.


## v59

- Added explicit source-code attribution: Copyright © Andrew Bethell. All rights reserved.
- Added source-code note that the application was created by Andrew Bethell in his own time using AI-assisted development.
- Added matching attribution comments to the patient-facing app and external JSON editor.
- Updated app marker/cache version to v59.

Suggested next checks before wider use:
- Verify all adult EWS and local Te Wao Nui PEWS ranges against current official/local charts.
- Run test cases for normal score, high score, MET, PET, respiratory distress long-press guide, and alarm silence.
- Confirm local governance/approval expectations before clinical deployment.


## v59

- Respiratory distress long-press guide now shows a live suggested respiratory distress level above Continue.
- Highest selected severity still determines the applied Mild/Moderate/Severe score.
- No scoring range changes.


## v59

- Replaced the generated MET/PET alarm with a pre-rendered soft triple-beep WAV file.
- Added Android vibration support where the browser allows `navigator.vibrate`.
- Kept scoring logic and visual layout unchanged.


## v72

Fixes embedded fallback JSON so the app can load when opened locally/offline if the external JSON fetch fails. No scoring, colour, or layout logic intentionally changed.


v64: Final summary action buttons now use adult/paediatric system colours; PEWS high-risk 777/PET prompt is not repeated in the action line when already shown in the red result box.
