# Phase 3.2.1 Acceptance Test
1. Open any crawler HUD and click STR/INT/CON/DEX/CHA. Confirm dice overlay opens and total = d20 + displayed Stat Mod.
2. Open DICE tab. Test quick d4/d6/d8/d10/d12/d20.
3. Test 2d6 and 1d100 with the builder; confirm result and detail render.
4. Create an encounter with 2+ adversaries and save it.
5. Deploy it. Dashboard should show each adversary as a separate card.
6. Change one adversary Health slot. Confirm only that adversary changes.
7. Add/remove a condition.
8. Click ATTACK; confirm d20 result and stored damage expression are shown/logged.
9. Advance Mob Phase → Crawler Phase.
10. Spend crawler Actions from 2 → 1 → 0; verify it cannot go below 0.
11. Advance to next round. Confirm phase returns to Mobs and every crawler resets to 2 Actions.
12. Resolve encounter and confirm runtime clears.
13. Refresh during an encounter and confirm local encounter state survives.
