# Edgeline Exports

Online-only dealership website. Next.js 14 (App Router) + TypeScript + Tailwind CSS, backed by Supabase (Postgres, Auth, Storage), transactional email via Resend, hosted on Vercel.

Built against the 6-sprint / 12-week plan. This is **Sprint 1 — Foundation & Scaffolding**: design system, global layout, homepage hero/stats, all 7 page routes, and the v1 database schema + seed data.

## Getting started

```bash
npm install
cp .env.example .env.local   # fill in the values below
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## What you need to supply

The app builds and runs locally without any of these, but pages that touch the database (from Sprint 2 onward) need real values in `.env.local`:

| Variable | Where to get it |
| --- | --- |
| `NEXT_PUBLIC_SUPABASE_URL` / `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Create a project at [supabase.com](https://supabase.com) → Project Settings → API |
| `SUPABASE_SERVICE_ROLE_KEY` | Same page — **server-only**, never expose to the client |
| `RESEND_API_KEY` | [resend.com/api-keys](https://resend.com/api-keys), once you own/verify a sending domain |
| `RESEND_FROM_EMAIL`, `EDGELINE_TEAM_EMAIL` | Your real sending address and the inbox that should receive lead notifications |

For production you'll also want:
- A **Vercel** project linked to this repo, with the same env vars set for the Production environment.
- A **custom domain** pointed at Vercel, with SPF/DKIM/DMARC configured for Resend (Sprint 6).

None of this blocks Sprint 1 work — it's needed starting Sprint 2 (live inventory) and Sprint 3 (forms + email).

## Database

Schema and seed data live in `supabase/`:

- `supabase/migrations/` — run these against your Supabase project (via the SQL editor, or `supabase db push` if you use the Supabase CLI).
- `supabase/seed.sql` — 10 sample vehicles matching the plan's mockup data. Run after migrations for local/staging.

## Project structure

```
app/                  Routes (App Router) — one folder per page
components/layout/     Nav, Footer, PageHeader
components/home/       Hero, StatsBar
lib/supabase/          Browser / server / admin Supabase clients
supabase/               SQL migrations + seed data
```

## Deploying

Standard Vercel flow: import the repo, set the env vars above, deploy. Preview deployments are created automatically for PR branches.
