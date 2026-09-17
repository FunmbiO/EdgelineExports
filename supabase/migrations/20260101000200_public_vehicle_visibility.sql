-- Sprint 2 — the inventory filter bar (All/Available/Sold) and status tags
-- (Sold/Reserved) require those vehicles to be publicly browsable, not just
-- 'available' as the Sprint 1 policy restricted. Only 'draft' (still being
-- prepared by an admin) stays hidden from the public.

drop policy "public can read available vehicles" on vehicles;

create policy "public can read non-draft vehicles"
  on vehicles for select
  to anon, authenticated
  using (status <> 'draft');
