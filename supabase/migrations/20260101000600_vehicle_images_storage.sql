-- Sprint 4 — Storage bucket for vehicle photos, deferred from Sprint 1
-- until the admin panel that actually uploads to it existed.

insert into storage.buckets (id, name, public, file_size_limit)
values ('vehicle-images', 'vehicle-images', true, 10485760)
on conflict (id) do nothing;

create policy "public can read vehicle images"
  on storage.objects for select
  to anon, authenticated
  using (bucket_id = 'vehicle-images');

create policy "admins can upload vehicle images"
  on storage.objects for insert
  to authenticated
  with check (bucket_id = 'vehicle-images');

create policy "admins can update vehicle images"
  on storage.objects for update
  to authenticated
  using (bucket_id = 'vehicle-images')
  with check (bucket_id = 'vehicle-images');

create policy "admins can delete vehicle images"
  on storage.objects for delete
  to authenticated
  using (bucket_id = 'vehicle-images');
