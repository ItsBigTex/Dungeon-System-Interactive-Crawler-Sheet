# Phase 3.1 Acceptance Test
1. Sign in to an existing Phase 3.0.2 crawler and verify no Inventory entries disappear.
2. Confirm old Equipment entries appear in Inventory under Equipment and are not silently auto-equipped.
3. Verify Health displays exactly 10 slots and +/- changes one slot at a time.
4. Verify Total Health = Enhanced CON Mod × 10.
5. Verify Max Mana = Enhanced INT score.
6. Verify each Stat shows Unenhanced value, Enhanced value when different, and Mod.
7. On Floor 3+, allocate a banked Stat Point and confirm Unenhanced/Enhanced/Mod update.
8. Add an Equipment item to Inventory, choose a RAW Gear Slot, EQUIP it, and verify it appears in Equipment.
9. UNEQUIP it and confirm it remains in Inventory.
10. Fill/access Hotlist entries from Inventory and Spells; confirm maximum 10 slots.
11. Confirm Loot opening now transfers generated gear into Inventory rather than a separate Equipment list.
12. Confirm Quests, Achievements, cleanup buttons, Communications, dice, realtime GM updates and Supabase persistence still work.
