# Phase 3.7.1 — HUD Hotfix

## Party message banners
Incoming realtime Party messages now create a compact top-of-HUD banner and remain stored in COMMS. The sender does not get a duplicate banner for their own message. No additional SQL migration is required if the Phase 3.7 migration was already run.

## Equipped item stat modifiers
GM-awarded Content Engine items now preserve the complete `mechanics` object and a definition snapshot on the owned Inventory item. This fixes `mechanics.stat_modifiers` being lost during award.

Enhanced Stats are recalculated on every HUD render from Unenhanced Stat + permanent enhancements + equipped structured gear modifiers. The left-side card now displays `ENH` whenever gear changes the Stat.

Items awarded before this hotfix may already have lost their mechanics when the owned instance was created. Re-award those existing test items after deploying 3.7.1.
