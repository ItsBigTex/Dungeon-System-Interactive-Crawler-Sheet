# Phase 3.2 — New GM Console Alpha

This release begins the new Content Engine driven GM Console.

## Workspaces
- Dashboard: live crawler cards, RAW 10-slot Health Bars, Dungeon Feed, active encounter phase control.
- GM Actions: private System messages, achievements, quests, GM notes, party progression, sealed loot boxes.
- Items: schema-aware Item Definition workshop, searchable local library, direct award to crawler Inventory.
- NPCs: NPC Definition workshop and directory.
- Encounters: Encounter Definition workshop, RAW Adversary Power guidance, deployable active encounter runtime.
- Tables: RAW Adversary Power reference and quick dice roller.

## Important storage note
Crawler state remains Supabase-backed exactly as before.
The new Content Library and Active Encounter runtime are LOCAL-BROWSER ALPHA storage in this release. This is deliberate: the normalized Content Engine SQL has not yet been approved/deployed. The next database migration will move these records to Supabase after the UI/workflow is validated.

## Combat model
The encounter controller uses Mob Phase → Crawler Phase. It does not impose D&D-style fixed initiative. Each crawler's runtime record starts each encounter with two Actions available per round; detailed action spending and Interrupt handling are the next combat-control increment.

## Safety
No AI generation is deployed from this console yet. Content generation will be reintroduced only after schema validation and GM review gates are connected.
