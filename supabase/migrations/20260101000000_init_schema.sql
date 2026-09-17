-- Edgeline Exports — schema v1 (Sprint 1)
-- Tables: vehicles, leads, form_submissions

create extension if not exists "pgcrypto";

create type vehicle_status as enum ('draft', 'available', 'reserved', 'sold');
create type lead_status as enum ('new', 'contacted', 'active', 'closed');
create type lead_source as enum ('sourcing', 'sell', 'contact');

create table vehicles (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  make text not null,
  model text not null,
  year integer not null,
  price numeric(12, 2) not null,
  mileage integer not null,
  color text,
  status vehicle_status not null default 'draft',
  badge text, -- e.g. Featured, Rare
  description text,
  specs jsonb not null default '{}'::jsonb, -- engine, transmission, drivetrain, 0-60, etc.
  images jsonb not null default '[]'::jsonb, -- [{ url, thumbUrl, alt, sortOrder }]
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index vehicles_status_idx on vehicles (status);
create index vehicles_make_idx on vehicles (make);
create index vehicles_price_idx on vehicles (price);

create table leads (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  phone text,
  source lead_source not null,
  status lead_status not null default 'new',
  notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index leads_status_idx on leads (status);
create index leads_source_idx on leads (source);

create table form_submissions (
  id uuid primary key default gen_random_uuid(),
  type lead_source not null,
  payload jsonb not null,
  lead_id uuid references leads (id) on delete set null,
  created_at timestamptz not null default now()
);

create index form_submissions_lead_id_idx on form_submissions (lead_id);

-- keep updated_at current on row changes
create or replace function set_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger vehicles_set_updated_at
  before update on vehicles
  for each row execute function set_updated_at();

create trigger leads_set_updated_at
  before update on leads
  for each row execute function set_updated_at();
