# Phase 3.1.1 Hotfix
Fixed missing click listeners for the Health Bar `- SLOT` and `+ SLOT` controls.

Acceptance:
- `- SLOT` decrements `healthSlotsRemaining` by exactly 1, minimum 0.
- `+ SLOT` increments by exactly 1, maximum 10.
- the HUD redraws immediately.
- the change persists to Supabase through the existing `persist()` path.
- an Activity Feed entry is generated for each slot change.

This package also introduces the design-only Item Definition and Crawler Item Instance JSON Schemas. It does not yet migrate the Supabase database to normalized content tables.
