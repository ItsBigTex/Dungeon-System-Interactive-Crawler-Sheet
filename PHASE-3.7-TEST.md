# Phase 3.7 Acceptance Test
1. Run `supabase/phase-3.7-party-comms-migration.sql`.
2. Deploy the entire Phase 3.7 package.
3. Sign in as a crawler. Confirm Health is 10 slots and Max Mana equals Enhanced INT.
4. Enter incoming damage below one Health-slot threshold; confirm no slot is lost.
5. Enter damage above the threshold; confirm the minimum number of whole slots meeting/exceeding damage is lost after DR.
6. Reduce Health to 0; confirm DYING appears and Heal/Hotlist/Comms player actions are blocked.
7. Restore at least one slot externally/manual control; confirm Dying clears.
8. With 2+ Mana, use HEAL; confirm exactly 2 Mana and 2 Health slots are restored.
9. Equip an item with structured `mechanics.stat_modifiers`; confirm Enhanced Stat and Max Mana/Health-derived values recalculate. Unequip it and confirm reversal.
10. Confirm inventory-only gear grants no bonus.
11. Put an item and spell on Hotlist; activate each and confirm quantity/Mana changes.
12. Deploy an encounter from GM Console. Confirm crawler HUD shows round/phase and Action count from active encounter.
13. Open two crawler sessions. Send a Party message from one; confirm realtime appearance on the other.
14. Confirm private System messages still appear separately.
15. Confirm Phase 3.4 live System Events, Phase 3.5 Live Session, Phase 3.6 AI Content Studio, dice, quests, achievements and loot still function.
