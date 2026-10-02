# Phase 3.7.2 — Party Banner Dismiss Hotfix

The Phase 3.7.1 banner CSS disabled pointer events on the full-screen notification overlay so the banner would not block the rest of the HUD. It attempted to restore pointer events on `.event-card`, but the actual notification container in `character.html` is `.popupbox`.

Phase 3.7.2 corrects that selector. The banner remains at the top of the HUD, the surrounding overlay remains non-blocking, and the DISMISS button is clickable.

No SQL migration is required.
