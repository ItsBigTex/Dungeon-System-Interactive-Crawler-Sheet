-- Phase 3.1 Content Engine foundation scaffold.
-- REVIEW before applying. Existing crawler JSON remains authoritative in this release.

create table if not exists public.content_packs (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  description text,
  source_authority text not null default 'THE_DESCENT',
  tags text[] not null default '{}',
  created_at timestamptz not null default now()
);

create table if not exists public.content_items (
  id uuid primary key default gen_random_uuid(),
  pack_id uuid references public.content_packs(id) on delete set null,
  name text not null,
  category text not null,
  subcategory text,
  gear_slot text,
  tier text,
  floor_min integer,
  data jsonb not null default '{}'::jsonb,
  source_authority text not null default 'THE_DESCENT',
  created_at timestamptz not null default now()
);

create table if not exists public.content_npcs (
  id uuid primary key default gen_random_uuid(),
  pack_id uuid references public.content_packs(id) on delete set null,
  name text not null,
  npc_type text,
  floor_min integer,
  data jsonb not null default '{}'::jsonb,
  source_authority text not null default 'THE_DESCENT',
  created_at timestamptz not null default now()
);

create table if not exists public.content_encounters (
  id uuid primary key default gen_random_uuid(),
  pack_id uuid references public.content_packs(id) on delete set null,
  name text not null,
  floor_min integer,
  data jsonb not null default '{}'::jsonb,
  source_authority text not null default 'THE_DESCENT',
  created_at timestamptz not null default now()
);
