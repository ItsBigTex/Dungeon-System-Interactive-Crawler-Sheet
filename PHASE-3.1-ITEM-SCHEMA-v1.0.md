# The Descent — Item Schema v1.0

## Authority
Mechanical behavior is derived from the Dungeon Crawler Carl RPG Core Rulebook and Game Master's Campaign Toolkit. Application-only fields are explicitly structural rather than new game rules.

## Core model
**Item Definition** = reusable content-library record.
**Owned Item Instance** = one crawler's copy of that definition.

Inventory is authoritative ownership storage. Equipment and Hotlist reference owned instances; they do not create duplicate items.

## RAW-driven fields
- Gear Slot: Head, Torso, Arms, Hands/Holding, Legs, Feet, Accessories.
- Accessories supports up to 10 equipped items.
- Hands/Holding supports one held item per hand plus a pair of gloves; Two-Handed limitations can consume both held positions.
- Only equipped Gear Slot items grant their gear bonuses.
- Hotlist contains 10 quick-access entries and can reference items or Spells.
- Inventory item storage is weightless, but adding an item is constrained by the crawler's lifting ability and other RAW Inventory restrictions.
- Magic gear may alter Stats, Skills, DR, Evade, Health Bar slots, grant actions/passives, or impose limitations. Those effects are represented structurally instead of being only prose.
- Loot tier is represented independently from item category.

## Content Engine rule
AI may populate schema fields, descriptions, tags, and proposed mechanics, but a generated mechanic that cannot be validated against RAW is marked `gm_approval_required: true` and `source_authority: AI_GENERATED` or `HOMEBREW`.

## Important separation
`category` answers **what the item is**.
`gear_slot` answers **where equipped gear goes**.
`loot_tier` answers **the reward/rarity tier**.
These are not interchangeable.

## Next schemas
1. Spell / Skill effect primitives
2. NPC / Rival Crawler
3. Mob / Boss stat block
4. Encounter
5. Quest / Achievement / Loot Box
6. System Event / Communications
7. Random Table
