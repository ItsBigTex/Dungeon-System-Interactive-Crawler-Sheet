# Phase 3.6 — AI Content Engine

Adds AI CONTENT STUDIO to the GM Console using the existing local Ollama architecture.

## Authority model
The generator is an authoring assistant, not a rules authority. Every generated object is forcibly tagged `AI_GENERATED` and `gm_approval_required: true` while in draft review. The generator is instructed not to silently invent mechanics and to place uncertainty/invention in `review_flags`.

Only the GM can approve a draft. Approval creates a new Content Engine ID, records `gm_approved` / `gm_approved_at`, and writes it through the existing Phase 3.3 Supabase Content Engine.

## Supported drafts
Adversary, Encounter, NPC, Item, Quest, Achievement, Loot Box.

## RAW guardrails
Adversary drafts follow the existing stat-block shape. `+F` and `+S` formulas are preserved rather than guessed. Encounter generation receives the current party size/floor and the RAW Adversary Power reference. Achievements use Name/Description/Reward/Contents structure. Loot Boxes are restricted to the six standard tiers.

## Local AI
Default endpoint: `http://localhost:11434`
Default model: `llama3.2:3b`
Both are editable in AI CONTENT STUDIO and stored only in that browser. Use the included Ollama launcher so the GitHub Pages origin is allowed.

No AI draft auto-deploys to crawlers or encounters.
