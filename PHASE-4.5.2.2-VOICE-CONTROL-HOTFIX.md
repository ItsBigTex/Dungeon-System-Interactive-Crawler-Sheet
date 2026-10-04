# Phase 4.5.2.2 — Voice Control Hotfix

The voice launch controls no longer depend on JavaScript event binding.

- DUNGEON AI VOICE and PREMIUM AI VOICE now open native HTML `<dialog>` windows directly from the button `onclick`.
- If the audio engine fails to load, the dialog still opens and explicitly reports ENGINE OFFLINE instead of silently doing nothing.
- The premium dialog can save Proxy URL, Voice ID, model, and enabled state directly to the existing 4.5.2 localStorage configuration.
- Test controls call the 4.5.1/4.5.2 engines only after the UI has proven responsive.
- Build label `UI 4.5.2.2` is visible beside the voice buttons so deployment/cache state is obvious.
- No SQL migration.
