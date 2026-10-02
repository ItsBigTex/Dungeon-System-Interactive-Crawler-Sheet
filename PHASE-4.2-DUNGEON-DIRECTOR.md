# Phase 4.2 — Dungeon Director

The Dungeon Director connects the 4.0/4.1 Homecoming content into a GM-facing advisory layer.

## Director Pulse
A pulse reads:
- current Homecoming escalation state
- average crawler Health Slots
- active quest assignment count
- whether an encounter is already active
- existing Homecoming encounters, quests, achievements, and 4.1 reaction tables

It then surfaces:
- two context-appropriate reaction tables
- up to two existing encounters
- up to two existing quest threads
- up to two achievements worth watching
- pacing/pressure notes

## GM authority
The Director is advisory only. It does NOT automatically:
- deploy encounters
- award achievements or loot
- assign quests
- send System messages
- advance escalation

The GM chooses what becomes real.

## RAW guardrail
The existing RAW encounter-power reference remains unchanged. Director pressure notes are pacing guidance, not a replacement for encounter scaling or GM judgment.

No SQL migration required.
