# Phase 4.5.2 — Premium Dungeon AI

## What changed
- Optional premium TTS path through a GM-controlled server-side proxy.
- ElevenLabs-compatible proxy template included at `supabase/functions/dungeon-voice/index.ts`.
- API key is read from the server-side `ELEVENLABS_API_KEY` secret and is never stored in browser code.
- Premium settings: proxy URL, voice ID, model, stability, similarity, style.
- Browser receives MP3 audio and runs it through a Web Audio Dungeon FX chain:
  low shelf -> presence EQ -> compressor -> dry/wet delay -> output.
- Automatic fallback to the 4.5.1 browser voice if premium generation fails.
- No voice cloning is included.

## Setup
1. Create/reuse an ElevenLabs account and choose a voice from your own available Voice Library.
2. Create an API key restricted to text-to-speech with an appropriate credit limit.
3. Add it as a Supabase Edge Function secret named `ELEVENLABS_API_KEY`.
4. Deploy `supabase/functions/dungeon-voice`.
5. In GM Portal -> PREMIUM AI VOICE, enter the deployed Edge Function URL and the selected ElevenLabs Voice ID.
6. Enable Premium Voice and run TEST PREMIUM.

Do not put the ElevenLabs API key in `supabase-config.js`, localStorage, GitHub, or any browser JavaScript.
