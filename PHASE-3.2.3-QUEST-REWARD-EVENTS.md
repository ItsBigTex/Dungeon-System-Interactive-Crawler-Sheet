# Phase 3.2.3 — Quest + Achievement + Loot Box + System Events

Adds a QUESTS + REWARDS workspace and formal schemas for all four connected systems.

## RAW-driven structure
Achievements preserve Name, Description, Reward and GM-only Contents. A tangible reward is commonly a Loot Box, but rewardless/troll achievements remain possible.
Loot Boxes use the six standard tiers Bronze through Celestial and are delivered to crawler Inventory as digital rewards.
Quests support Individual and Group scope, structured objectives and reward notes.
System Events model the HUD delivery layer for announcements, notifications, achievements, quests, loot and messages.

## Workflow
Create reusable Quest/Achievement/Loot Box definitions in the Content Library, then DEPLOY to one crawler or PARTY.
Deployment creates crawler-owned runtime records, sends a System message, and writes a structured System Event.
Achievements with a configured Loot Box automatically stage a sealed box for that crawler.

## Event Queue
Events track recipient, priority, presentation, acknowledgement requirement, status, related object and timestamp. Phase 3.2.3 records and displays the queue; richer player-side popup acknowledgement comes next.

## Storage
Content Library and System Event Queue remain local-browser alpha storage. Crawler-owned Quests, Achievements and Loot Boxes continue through the existing Supabase-backed crawler state.
