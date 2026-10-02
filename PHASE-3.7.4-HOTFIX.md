# Phase 3.7.4 — Notification Pipeline Hotfix

This hotfix changes the notification behavior rather than applying another CSS-only patch.

## Party banner
- DISMISS is handled by a capture-phase delegated click handler.
- The handler no longer depends on a per-render `onclick` assignment.
- Transient Party banners also auto-dismiss after 8 seconds.
- The banner overlay/card/button explicitly accept pointer events.

## Legacy Test Quest replay
Older reward deployment created TWO notifications for structured quests:
1. a `system_events` quest event, and
2. a separate unread `private_messages` row containing `NEW QUEST! // ...`.

Removing the quest only affected the crawler quest record, so the unread legacy private message could reappear on every refresh.

3.7.4:
- marks legacy `NEW QUEST! // <name>` private messages read on startup when that quest is no longer assigned;
- retains the stale `system_events` suppression from 3.7.3;
- stops creating duplicate private messages for structured Quest, Achievement, and Loot Box deployment going forward. Their structured System Event is now the notification source.

No SQL migration is required.
