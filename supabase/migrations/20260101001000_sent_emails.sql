-- Log of branded ad-hoc emails sent to clients from the admin dashboard.

create table sent_emails (
  id uuid primary key default gen_random_uuid(),
  recipient_email text not null,
  subject text not null,
  message text not null,
  status text not null default 'sent',
  error text,
  created_at timestamptz not null default now()
);

create index sent_emails_created_at_idx on sent_emails (created_at desc);

alter table sent_emails enable row level security;

create policy "admins can read sent emails"
  on sent_emails for select
  to authenticated
  using (auth.role() = 'authenticated');

create policy "admins can write sent emails"
  on sent_emails for insert
  to authenticated
  with check (auth.role() = 'authenticated');
