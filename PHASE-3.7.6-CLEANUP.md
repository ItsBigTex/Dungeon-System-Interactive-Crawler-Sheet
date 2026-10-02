# Phase 3.7.6 — Party Comms + Test Notification Cleanup

## Party communications
Party messages are silent again. Realtime messages continue to appear in COMMS, but they no longer create a popup or banner notification.

## Residual test notifications
Old test Loot Box / Achievement notifications are persistent `system_events` records, separate from the crawler tabs. This package does not silently delete database history. Use the supplied SQL cleanup script to acknowledge only the explicitly named test notifications.

No schema migration is required.
