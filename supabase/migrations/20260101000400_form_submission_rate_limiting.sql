-- Sprint 3 — rate limiting needs to know which IP a submission came from.
-- Writes go through the service-role client (bypasses RLS), so no new
-- policy is needed here.

alter table form_submissions add column ip_address text;

create index form_submissions_ip_created_idx
  on form_submissions (ip_address, created_at);
