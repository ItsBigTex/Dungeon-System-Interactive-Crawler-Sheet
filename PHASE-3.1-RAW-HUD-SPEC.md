# THE DESCENT — Phase 3.1 RAW HUD Foundation

Mechanical authority: Dungeon Crawler Carl RPG Core Rulebook + Game Master's Campaign Toolkit.

## Implemented in 3.1
- RAW 10-slot Health Bar. Total Health representation = Enhanced CON Mod × 10.
- Max Mana = Enhanced Intelligence score.
- Split Stats into Unenhanced, Enhanced, and derived Mod.
- Level-earned stat allocation changes Unenhanced Stats.
- 10-slot Hotlist.
- Inventory is authoritative ownership storage.
- RAW Gear Slot model: Head, Torso, Arms, Hands/Holding, Legs, Feet, Accessories (max 10).
- Equipment is now slot assignment of Inventory items rather than a second storage list.
- Existing legacy Equipment entries are migrated into Inventory without deletion.
- Added Actions workspace.
- Messages renamed Communications while retaining current private System message compatibility.
- Existing Loot, Quest, Achievement, Supabase realtime, and dice systems retained.

## Migration behavior
The first Phase 3.1 load creates RAW fields from the Phase 3.0.2 crawler record:
- current Stats become Unenhanced Stats
- gear/spell/buff enhancement deltas start at 0
- old numeric HP percentage is converted to the nearest upward Health Bar slot count
- legacy Equipment entries are copied into Inventory as Equipment with no guessed Gear Slot
- existing Inventory is preserved
- Hotlist begins empty unless already present

No legacy gear is silently assigned to a RAW slot; the player/GM selects its slot explicitly.

## Authority labels
RAW = directly modeled from the two official books
CAMPAIGN = deliberate The Descent override
HOMEBREW = new mechanic requiring GM approval
UI = presentation/workflow only
