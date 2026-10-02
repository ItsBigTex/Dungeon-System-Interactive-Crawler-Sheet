# Phase 3.7.5 — Proven Notification Pointer Fix

Browser runtime inspection showed the visible notification hierarchy was:

- `#eventPopup` → `pointer-events: none`
- `.popupbox` → `pointer-events: none`
- `#eventAck` → `pointer-events: none`

A live browser override setting all three to `pointer-events: auto !important` restored physical clicking of DISMISS.

This hotfix permanently applies that proven behavior whenever `#eventPopup` is visible.

No SQL migration is required.
