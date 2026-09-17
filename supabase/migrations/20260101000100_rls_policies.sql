-- Row-level security — Sprint 1
-- Public: read-only access to available vehicles.
-- All writes (vehicles, leads, form_submissions) go through server-side
-- API routes using the service-role key, which bypasses RLS entirely —
-- so no public insert/update policies are defined here. Authenticated
-- admin users (Supabase Auth, added in Sprint 4) get full access.

alter table vehicles enable row level security;
alter table leads enable row level security;
alter table form_submissions enable row level security;

create policy "public can read available vehicles"
  on vehicles for select
  to anon, authenticated
  using (status = 'available');

create policy "admins can read all vehicles"
  on vehicles for select
  to authenticated
  using (auth.role() = 'authenticated');

create policy "admins can write vehicles"
  on vehicles for all
  to authenticated
  using (auth.role() = 'authenticated')
  with check (auth.role() = 'authenticated');

create policy "admins can read leads"
  on leads for select
  to authenticated
  using (auth.role() = 'authenticated');

create policy "admins can write leads"
  on leads for all
  to authenticated
  using (auth.role() = 'authenticated')
  with check (auth.role() = 'authenticated');

create policy "admins can read form submissions"
  on form_submissions for select
  to authenticated
  using (auth.role() = 'authenticated');
