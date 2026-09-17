-- Auto-generate a URL slug from year-make-model on insert when one isn't
-- supplied (e.g. from the future admin CRUD in Sprint 4). Duplicates get a
-- numeric suffix: 2023-porsche-911-gt3, 2023-porsche-911-gt3-2, ...

create or replace function slugify(value text)
returns text as $$
  select trim(both '-' from regexp_replace(lower(trim(value)), '[^a-z0-9]+', '-', 'g'));
$$ language sql immutable;

create or replace function set_vehicle_slug()
returns trigger as $$
declare
  base_slug text;
  candidate_slug text;
  suffix integer := 1;
begin
  if new.slug is not null and length(trim(new.slug)) > 0 then
    return new;
  end if;

  base_slug := slugify(new.year || '-' || new.make || '-' || new.model);
  candidate_slug := base_slug;

  while exists (
    select 1 from vehicles
    where slug = candidate_slug and id is distinct from new.id
  ) loop
    suffix := suffix + 1;
    candidate_slug := base_slug || '-' || suffix;
  end loop;

  new.slug := candidate_slug;
  return new;
end;
$$ language plpgsql;

create trigger vehicles_set_slug
  before insert on vehicles
  for each row execute function set_vehicle_slug();
