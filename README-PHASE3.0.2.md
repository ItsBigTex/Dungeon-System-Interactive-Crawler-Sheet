# The Descent — Phase 3.0.2

Cleanup hotfix built on the stable Phase 3.0.1 crawler sheet.

Adds explicit REMOVE controls for:
- Opened loot-box history (sealed boxes cannot be removed before opening)
- Quest records
- Achievement records

All removals require confirmation and persist through the existing Supabase crawler record. Removing opened loot history or an achievement does not reverse items/equipment already transferred elsewhere.
