# Phase 3.2.2 — Adversary Library

Adds a dedicated ADVERSARIES workspace to the GM Console.

## Authoring
Profiles capture the RAW stat-block shape already established in the schema:
- Name / classification / species or type / size
- Level and Health Bar slots
- Surprise, Evade, Move, DR
- STR, INT, CON, DEX, CHA
- Attack name, To-Hit Difficulty, damage, damage type, range, attack effect
- Special rules / notes
- AI/System announcement
- Source authority and GM-review flag

## Reuse
Saved adversaries can be pushed directly into the Encounter Workshop. Encounter Definitions reference the saved definition ID and snapshot the current combat template so later library edits do not silently mutate an already-authored encounter.

## Runtime
Deploying an encounter instantiates each copy independently. The live combat card now retains Level, classification, Surprise, Move, Stats, all saved attacks and special rules. If multiple attacks exist in imported/extended definitions, the GM can choose the attack from a selector.

## Authority
The UI preserves expressions such as `+F` and `+S` rather than guessing their resolved values. Source authority remains explicit. AI/HOMEBREW records automatically require GM review.

## Storage
The Content Library remains local-browser alpha storage pending approval of the normalized Supabase migration.
