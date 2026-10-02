# Phase 3.7.7 — Deployment Cache Bust

Phase 3.7.6 source was inspected and confirmed to contain no Party Message notification call. Its realtime Party subscription only stores the message and refreshes COMMS.

If a deployed browser still produced `PARTY MESSAGE` popups, it was executing an older cached JavaScript asset.

3.7.7:
- keeps Party messaging silent;
- adds `?v=3.7.7` to local JS/CSS references in all HTML entry points so GitHub Pages/browser caches request fresh assets;
- exposes `window.DESCENT_CRAWLER_BUILD = '3.7.7'` for deployment verification;
- exposes `window.DESCENT_GM_BUILD = '3.7.7'` in the GM console.

No SQL migration is required.
