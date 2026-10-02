# Phase 3.5 Acceptance Test

1. Sign in as GM and open LIVE SESSION.
2. Confirm all crawlers appear with Health, Level, Floor, Mana, and HUD links.
3. Send a System Announcement to PARTY; confirm open crawler HUDs receive it live.
4. Send a Notification to one crawler; confirm only that crawler receives it.
5. Deploy a saved Quest from Quick Reward to one crawler.
6. Toggle a Quest objective; confirm QUEST UPDATED appears live and survives refresh.
7. Complete the Quest; confirm status changes and QUEST COMPLETE appears.
8. Deploy a saved Achievement with a Loot Box; confirm both crawler records and live HUD notifications.
9. During an active encounter Crawler Phase, spend an Action from LIVE SESSION and confirm Active Encounter state updates.
10. Open Encounter Resolution. Select an optional linked Quest and Achievement. Review the confirmation text, then resolve.
11. Confirm the encounter clears only after confirmation, linked active Quest instances complete, and selected Achievement deploys to the party.
12. Confirm Session Log contains the major actions from the test.
13. Refresh GM Console and crawler HUDs; verify cloud state persists and acknowledged events do not replay.
14. Regression: stat dice, Dice tab, Health controls, Items, NPCs, Adversaries, Encounters, Quest/Reward Library, and Phase 3.4 realtime events still function.
