# Phase 3.6 Acceptance Test
1. Confirm Phase 3.5 Live Session still functions.
2. Start Ollama using the included launcher and confirm `llama3.2:3b` is installed.
3. Open GM Console → AI CONTENT STUDIO.
4. Generate an Adversary draft. Confirm AI_GENERATED provenance and GM REVIEW REQUIRED.
5. Confirm draft includes Health Bar, Level, Surprise, Evade, Move, DR, five Stats and at least one Attack.
6. Edit the JSON, click REVALIDATE, and confirm edits survive.
7. Deliberately remove `attacks`; REVALIDATE should block approval.
8. Restore the field and approve. Confirm the record appears in ADVERSARIES and in Supabase.
9. Generate a Moderate Encounter for the current party. Confirm party/floor context is reflected and scaling is presented as guidance.
10. Generate an NPC, Item, Quest, Achievement and Loot Box; approve one of each and confirm the appropriate cloud library.
11. Confirm no generated draft auto-deploys to a crawler or active encounter.
12. Stop Ollama and Generate. Confirm a clear LOCAL AI OFFLINE message appears and existing campaign data is unaffected.
13. Regression: realtime System Events, Live Session, Encounter Control, dice and crawler HUD still function.
