# Phase 3.3 Acceptance Test
1. Run `supabase/phase-3.3-content-engine-migration.sql` in Supabase SQL Editor.
2. Deploy the Phase 3.3 website and sign in as GM.
3. Dashboard should say `SUPABASE CONTENT ENGINE`.
4. Existing Phase 3.2 local definitions should seed if the cloud library was empty.
5. Confirm matching rows in Supabase `content_*` tables.
6. Create an Item, NPC, Adversary, Encounter, Quest, Achievement, and Loot Box; refresh and confirm persistence.
7. Open a second GM browser/device; reload and confirm the same shared definitions.
8. Delete a test definition and confirm its cloud row disappears.
9. Deploy an Encounter; refresh and confirm Active Encounter, round, phase, adversary Health and Actions survive.
10. Deploy Quest/Achievement/Loot Box; confirm existing crawler-owned state still works.
11. Confirm structured System Events write to `system_events`.
12. Non-GM account: reusable content should be readable, but author/delete operations should be blocked by RLS.
13. Regression: crawler HUD, stat/dice rolls, Health, Items, NPCs, Adversaries, Encounters and Rewards still work.
