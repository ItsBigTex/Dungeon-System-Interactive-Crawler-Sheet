# Phase 3.7 — Complete Crawler HUD

Phase 3.7 promotes the player HUD from record viewer to rules-aware play surface.

## Added
- RAW damage entry: DR is subtracted, then damage consumes enough Health Bar slots to meet/exceed remaining damage; sub-slot remainder is ignored.
- Dying state at 0% Health, with Dying round counter initialized from CON Mod and HUD/action lock presentation.
- Heal Spell control: self-only, 2 Mana, restores 2 Health Bar slots.
- Active Encounter display: current round, phase and Actions remaining are shown on the crawler Actions/HUD.
- Hotlist activation controls with 10-slot model, Mana/consumable handling and combat-phase guardrails.
- Structured equipped-gear Stat modifiers: only equipped item `mechanics.stat_modifiers` / snapshot modifiers affect Enhanced Stats.
- Realtime Party HUD Chat backed by Supabase `party_messages`.
- Existing private System messages remain separate and compatible.

## Important adjudication boundaries
Phase 3.7 does not guess ambiguous item text. Automatic gear bonuses require structured `mechanics.stat_modifiers`.
The GM Console remains authoritative for shared encounter Action counts. Player Hotlist activation logs use but do not directly mutate the active encounter row.
Dying cleanup decrement/damage-while-Dying decrement remains GM/Encounter Control adjudication for this phase.
External fist-bump contact linking is not yet automated.
