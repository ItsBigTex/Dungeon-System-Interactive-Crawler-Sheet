# Phase 4.5.2.3 — Premium Controls Hotfix

Fixes SAVE / TEST PREMIUM / ADVANCED SETTINGS inside the Premium Dungeon AI dialog.

The controls now use a small inline `DescentVoiceUI` controller loaded directly in `gm.html`, so:
- SAVE works independently of the main GM script and audio engine.
- TEST PREMIUM gives a visible BLOCKED/FAILED/SUCCESS status instead of silently doing nothing.
- ADVANCED SETTINGS explicitly reports when the premium engine is unavailable.
- Missing Proxy URL and Voice ID are identified separately.
- Existing 4.5.2 premium localStorage configuration remains compatible.
- Visible build marker is now `UI 4.5.2.3`.
- No SQL migration.
