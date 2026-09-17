-- Sprint 4 — testimonials for the homepage and About page.

create table testimonials (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  quote text not null,
  location text,
  featured boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index testimonials_featured_idx on testimonials (featured);

create trigger testimonials_set_updated_at
  before update on testimonials
  for each row execute function set_updated_at();

alter table testimonials enable row level security;

create policy "public can read featured testimonials"
  on testimonials for select
  to anon, authenticated
  using (featured = true);

create policy "admins can read all testimonials"
  on testimonials for select
  to authenticated
  using (auth.role() = 'authenticated');

create policy "admins can write testimonials"
  on testimonials for all
  to authenticated
  using (auth.role() = 'authenticated')
  with check (auth.role() = 'authenticated');
