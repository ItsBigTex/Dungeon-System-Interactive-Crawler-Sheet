# Phase 4.5.2.5 — Standalone Premium Engine

The runtime result from 4.5.2.4 proved `audio-engine.js` downloads successfully but fails before exporting `DescentPremiumVoice`.

Rather than continue coupling premium TTS to the legacy 4.3 audio initialization, this release splits Premium Dungeon AI into its own `js/premium-voice.js`.

- Premium TTS no longer depends on legacy audio-engine initialization.
- Existing Proxy URL / Voice ID / model settings are preserved.
- Web Audio FX chain is included in the standalone engine.
- Detailed HTTP/proxy errors are surfaced in the Premium dialog.
- The legacy audio engine remains in place for existing campaign audio.
- Visible marker: `UI 4.5.2.5`.
- No SQL migration.
