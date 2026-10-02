# Phase 3.2.1 — Encounter Control

## Dice hotfix
The crawler sheet rendered dice controls but the functions `doDice()` and `showDiceRoll()` were absent from the Phase 3.2 build. This broke both left-side Stat Checks and the Dice tab. Both functions are restored. Stat checks use d20 + the crawler's derived Stat Mod. Generic dice support quantity + d4/d6/d8/d10/d12/d20/d100 and quick rolls.

## Encounter Control
Encounter Definitions can now include a deployable adversary template:
- name
- Health Bar slot count
- Evade expression
- DR
- primary attack name
- damage expression

Deploying an encounter instantiates each adversary independently. The GM Dashboard now provides:
- per-adversary Health Bar slot controls
- DR / Evade display
- conditions
- attack roller
- crawler Actions remaining
- Mob Phase → Crawler Phase → next Round progression
- automatic reset to 2 crawler Actions when a new round begins
- encounter event log storage

This remains an alpha runtime. Attack resolution deliberately does not invent missing RAW modifiers: the console rolls the d20 and shows the stored damage expression; richer attack definitions will come from the Adversary Library.

## Storage
Active Encounter and Content Library remain local-browser alpha storage until the normalized Supabase migration is approved.
