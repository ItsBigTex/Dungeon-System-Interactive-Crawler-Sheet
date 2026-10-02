# Phase 3.3 — Supabase Content Engine
Phase 3.3 promotes the GM Content Library from browser-only alpha storage to shared Supabase persistence.

Cloud-backed definitions: Items, NPCs, Adversaries, Encounters, Quests, Achievements, Loot Boxes, System Events, Active Encounters, plus Content Packs foundation.

RLS: authenticated users may read reusable content; only `profiles.role = 'gm'` can author/delete content and mutate System Events/Active Encounters. The browser continues using the publishable/anon key; never use service_role in the site.

Migration behavior: run `supabase/phase-3.3-content-engine-migration.sql`, then reload. Supabase becomes authoritative and localStorage remains a cache. If cloud content is empty and the GM browser contains Phase 3.2 definitions, the console seeds those definitions once. If migration is unavailable, the existing local library remains usable.

This does not replace the existing crawlers, profiles, activity_feed, or private_messages architecture.
