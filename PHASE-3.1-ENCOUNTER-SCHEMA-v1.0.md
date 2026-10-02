# The Descent — Encounter Schema v1.0

## Core architecture
`Encounter Definition` is reusable authored content.
`Active Encounter` is a deployed runtime instance.
`Encounter Participant` stores the live state of each crawler/NPC/adversary.

This prevents combat damage, conditions, trigger state, and round state from modifying the reusable content library.

## RAW-driven combat assumptions
- Structured combat gives each crawler two Actions per round.
- Mobs act first unless crawlers surprise them.
- Crawlers can take their Actions cooperatively/in any order during their side of the round; this is not a traditional fixed per-crawler initiative model.
- Interrupt Actions are supported separately by the action system.
- Encounter deployment therefore tracks **phase + Actions remaining**, not a mandatory D&D-style initiative order.
- The schema retains optional ordering data only where a particular scene needs it.

## Encounter scaling
The RAW Adversary Power reference is included as structured data for party sizes 2–7 and Weak/Moderate/Strong/Overwhelming bands. It is advisory, not an automatic difficulty guarantee. RAW explicitly tells the GM to adjust based on party tactics, loot, story choices, reinforcements, interceding crawlers, and similar circumstances.

## Encounter composition
An encounter may contain:
- adversaries, NPCs, crawlers, or dynamically spawned participants
- environment/zones/cover
- hazards and traps
- interactable objects
- visible or hidden objectives
- conditional triggers
- reinforcements/escalation stages
- alternate success/failure/escape resolutions
- conditional rewards
- Quest/Achievement links
- System announcement text

## Boss encounters
Boss encounters are not reduced to “kill the monster.” The schema can represent exposed weaknesses, environment interactions, conditional vulnerabilities, reinforcements, special attacks, phase changes, alternate objectives and conditional reward outcomes.

## Traps
Traps are encounter-capable hazards rather than automatically adversaries. They can have detection/trigger/effect/escape logic in `environment.traps` and may exist inside mixed encounters.

## Safety
Generated encounter content carries `safety.tags`, `requires_gm_review`, and `blocked_crawler_ids`. Personal-history material must be GM-reviewed before deployment.

## Next
Quest + Achievement + Loot Box + System Event schemas should be built together because the official game links them through rewards and HUD notifications.
