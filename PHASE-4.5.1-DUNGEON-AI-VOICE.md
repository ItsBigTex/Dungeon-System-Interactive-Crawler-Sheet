# Phase 4.5.1 — Dungeon AI Voice

Adds a dedicated Dungeon AI Voice layer while preserving the 4.3 audio engine.

- Automatically scores/selects a strong available English browser voice.
- Manual voice selector for every voice exposed by the browser/OS.
- Profiles: SYSTEM, ACHIEVEMENT, QUEST, LOOT, WARNING, BOSS.
- Rate and pitch shaping.
- Synthetic two-oscillator pre-roll cue.
- TEST VOICE control.
- Settings persist in localStorage key `descentDungeonVoiceV4_5_1`.
- No API key, external TTS provider, or cloned voice.
- Existing audio remains fallback-safe.

Important: browser SpeechSynthesis does not provide raw speech audio to Web Audio, so this pass can shape voice selection/rate/pitch and layer cues, but cannot apply true reverb/distortion/EQ directly to the synthesized voice. A future premium voice pass should use a TTS service that returns audio buffers if that level of processing is desired.
