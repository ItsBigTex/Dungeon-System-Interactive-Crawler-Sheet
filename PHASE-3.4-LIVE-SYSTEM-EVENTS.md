# Phase 3.4 — Live Crawler HUD System Events

Phase 3.4 connects the Phase 3.3 `system_events` table to the crawler HUD in realtime.

## Presentation
The Core Rulebook describes System messages as HUD elements that automatically pop up for announcements, notifications, and achievements. Notifications can also be presented in different ways. Phase 3.4 implements the visual/browser portion as popup or banner presentation while preserving `presentation` metadata for future voice/audio work.

Supported labels include NEW ACHIEVEMENT!, NEW QUEST!, LOOT BOX RECEIVED!, SYSTEM ANNOUNCEMENT, SYSTEM MESSAGE, LEVEL GAINED!, FLOOR UPDATE, HEALTH WARNING, MANA WARNING, ITEM RECEIVED!, and a generic SYSTEM NOTIFICATION fallback.

## Realtime + acknowledgement
Crawler HUDs load pending events addressed to that crawler and subscribe to new/updated `system_events` rows. Events are queued so simultaneous rewards appear one at a time. Acknowledging an event updates its cloud status to `acknowledged`; acknowledged events do not replay on refresh.

Phase 3.4 adds a narrow RLS policy allowing a crawler to update only System Event rows addressed to the crawler mapped to their authenticated profile. GMs retain full control.

## Compatibility
The existing crawler-record detection and private System Message popup remain in place as compatibility/fallback behavior. Phase 3.4 does not remove the working Phase 3.3 crawler, reward, or private-message paths.
