# Phase 3.7.3 — Notification + Quest Persistence Hotfix

## Party message dismiss
3.7.3 removes the pointer-event pass-through technique entirely for Party message banners. The event overlay, banner card, and DISMISS button all explicitly accept pointer input. The compact banner remains positioned at the top of the HUD.

## Removed quest replay
Two causes are guarded against:
1. Removing a quest now writes the crawler record to Supabase immediately rather than relying only on the normal 120ms debounced state save.
2. On page load/realtime ingestion, a pending `quest_received` System Event is ignored if its related quest is no longer assigned to that crawler. The client also attempts to acknowledge that stale event so it does not keep returning.

This specifically prevents an old quest notification from resurrecting visually after the quest has been removed.

No new SQL migration is required.
