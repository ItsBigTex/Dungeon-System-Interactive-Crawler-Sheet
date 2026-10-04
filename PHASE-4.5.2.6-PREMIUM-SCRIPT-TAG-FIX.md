# Phase 4.5.2.6 — Premium Script Tag Fix

Root cause identified in 4.5.2.5: the standalone premium script tag was inserted into the wrong position in `gm.html`, so the browser requested a malformed/nonexistent script path instead of cleanly loading `js/premium-voice.js`.

Fix:
- clean standalone `<script src="./js/premium-voice.js?v=4.5.2.6"></script>`;
- loaded before legacy audio-engine.js;
- diagnostics now check `window.DescentPremiumVoice` directly;
- visible marker `UI 4.5.2.6`;
- existing saved premium configuration remains compatible;
- no SQL migration.
