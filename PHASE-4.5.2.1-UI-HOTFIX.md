# Phase 4.5.2.1 — GM UI Hotfix

Fixes the non-responsive controls reported after 4.5.2.

Root causes fixed:
- `audio-engine.js` was not loaded by `gm.html`, so both Dungeon AI Voice objects were unavailable on the GM Console.
- Phase 4.5 added a second static Session Mode on top of the portal's existing dynamic Live Session workspace, creating conflicting `data-workspace="session"` behavior.
- The static quick buttons searched button labels heuristically instead of routing to the portal's real workspaces.

Changes:
- GM Console now loads `audio-engine.js`.
- Removed duplicate static Session Mode UI.
- Preserved the original Live Session workspace and added explicit quick-action routing.
- System Message -> Live Session composer.
- Quest / Achievement / Loot -> Quests + Rewards.
- GM Actions -> GM Actions.
- Director Pulse -> Dungeon Director.
- Voice button initialization now works whether the script runs before or after DOMContentLoaded.
- No SQL migration and no Supabase schema change.
