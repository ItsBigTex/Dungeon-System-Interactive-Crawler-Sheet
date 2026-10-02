# Phase 3.5 — Live Session Control

Phase 3.5 turns the GM Console into a session-running surface instead of requiring the GM to jump between authoring workspaces for common live actions.

## Live Session workspace
- Party overview with Health slots, Level, Floor, Mana readout, crawler HUD links, and crawler Action spending during the Crawler Phase.
- System Event Composer with Party or individual recipients, event type, priority, popup/banner presentation, title, and body. Events flow through the Phase 3.4 Supabase System Event pipeline.
- Active Quest Control with structured objective checkboxes plus Complete and Fail controls. Quest changes create live System Events.
- Quick Reward deployment for saved Quests, Achievements, and Loot Boxes without text prompts.
- Encounter Resolution workflow that lets the GM explicitly choose an optional linked Quest completion and/or Achievement award before resolving the encounter. Nothing is awarded until the GM confirms.
- Session Log built from the existing campaign activity feed.

## RAW guardrails
Phase 3.5 does not automatically decide whether an encounter deserves a Quest completion, Achievement, or reward. The GM selects and confirms those outcomes. This preserves the rulebook's GM-facing discretion around Achievements and rewards while automating delivery and bookkeeping.

## Cloud behavior
No new database migration is required beyond the successful Phase 3.3 Content Engine and Phase 3.4 System Event acknowledgement migration. Phase 3.5 reuses crawler persistence, System Events, Content Library definitions, Active Encounter persistence, and Supabase Realtime.
