# The Descent — Adversary & NPC Schema v1.0

## Design decision
NPC identity/story state and combat mechanics are separate records.

- **NPC Definition**: identity, role, behavior, restrictions, dialogue, faction/location/status, hooks and inventory references.
- **Adversary Definition**: the RAW truncated combat stat block used for Mobs, Bosses and other combat-capable entities.
- `combat_profile_id` links an NPC to an Adversary Definition when needed.
- **Encounter Participant**: runtime state such as current Health Bar, initiative, conditions and temporary modifiers. It never mutates the reusable definition.

This prevents a vendor, Game Guide, quest giver, or rival crawler from needing a fake monster stat block merely to exist in the directory.

## RAW Toolkit stat-block model
Adversaries preserve:
- name/type/classification/size
- Health Bar
- Level, Surprise, Evade, Move and DR
- STR, INT, CON, DEX and CHA
- attacks with to-hit Difficulty, damage dice/type and range
- attack-triggered effects, including Evade failure effects
- special Notes/rules
- source flavor/AI announcement where useful

Expressions such as `+F` and `+S` are stored as expressions rather than prematurely converted to fixed numbers. The Encounter Engine will resolve them using the current Floor and applicable Size context.

## Boss flexibility
Bosses can have unequal Health Bar slot values/counts and complex special rules. The schema therefore does not force crawler-style ten equal Health slots onto adversaries.

## Rival crawlers
Rival crawlers may use an NPC identity record plus either:
1. a full crawler-compatible sheet, or
2. an Adversary combat profile,
depending on what the official source supplies. We will not invent missing crawler fields.

## Runtime rule
Definitions are immutable library content during combat. Active Encounter Participants hold current Health, initiative, conditions and temporary modifiers.

## Next schema target
Encounter Definition v1.0 will compose crawler participants, Adversary definitions, NPC references, hazards, objectives, triggers, escalation, rewards, loot, quests, and source-driven encounter balancing.
