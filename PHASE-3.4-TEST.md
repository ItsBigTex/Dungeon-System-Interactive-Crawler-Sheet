# Phase 3.4 Acceptance Test
1. Run `supabase/phase-3.4-system-event-ack-hotfix.sql` after the working Phase 3.3 migration.
2. Deploy the Phase 3.4 site files.
3. Sign into one crawler HUD and leave it open.
4. From GM Console, deploy an Achievement to that crawler. Confirm a live `NEW ACHIEVEMENT!` overlay appears without refreshing.
5. Acknowledge it. Confirm the matching `system_events.status` becomes `acknowledged`.
6. Refresh the crawler HUD. Confirm that acknowledged event does not replay.
7. Deploy a Quest. Confirm `NEW QUEST!` appears.
8. Deploy a standalone Loot Box. Confirm `LOOT BOX RECEIVED!` appears and the box remains available in the crawler Loot workspace.
9. Use GM Actions → System Announcement. Confirm every crawler receives a recipient-specific structured event; an open crawler HUD displays `SYSTEM ANNOUNCEMENT`.
10. Trigger multiple rewards quickly. Confirm they queue and display one at a time rather than overlapping.
11. Confirm existing private System Messages still work.
12. Regression: stat rolls, Dice tab, Health, Inventory, Adversaries, Encounter Control and Phase 3.3 cloud libraries still work.
