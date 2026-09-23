# Outstanding Features

Running list of things that are deliberately deferred, simplified, or not yet
verified live, by the sprint they came up in. Updated as each sprint lands.

## Sprint 1 — Foundation & Scaffolding

- [x] Supabase Storage bucket (`vehicle-images`) — created in Sprint 4 along
      with the admin upload flow.
- [ ] Footer's Privacy Policy / Terms of Service links point to `#` — no
      actual pages exist yet.
- [ ] No real logo — nav/footer use styled text ("EDGELINE EXPORTS").
- [ ] Vercel deployment documented in the README but never actually
      connected/verified live.

## Sprint 2 — Inventory & Car Detail

- [ ] The upload pipeline exists now (Sprint 4), but no real vehicle photos
      have actually been uploaded — seeded vehicles still show the
      placeholder gradient until someone uploads real photos via the admin
      panel.
- [ ] Uploaded images are stored as-is — no separate thumbnail generation
      (the sprint plan called for a 400px thumbnail alongside the original).
- [ ] Pagination is simple offset-based (`page` query param), not true
      keyset/cursor pagination as the sprint plan specified — a reasonable
      simplification for a small catalog, but worth knowing.
- [x] Dynamic OG image generation — done in Sprint 5 (site default +
      per-vehicle, via next/og).
- [ ] Never visually verified with real photos, only placeholder/empty
      states.

## Sprint 3 — Source & Sell Forms

- [x] Resend email sending is wired up and confirmed working live (client +
      team emails both deliver) — see the new "Email" note below for the
      caveats that still apply.
- [ ] Admin notification webhook (Slack/Discord) — skipped, it's P2/optional
      in the plan.
- [ ] No CAPTCHA — intentional per the plan's risk register (Phase 2 if
      spam becomes a real problem).

## Sprint 4 — Content Pages & Admin CMS

- [ ] Testimonials table + public API exist, but there's no admin UI to add
      them — for now they can only be inserted directly in Supabase. The
      homepage/About testimonials sections correctly hide themselves when
      empty, so this isn't breaking anything, just a manual step.
- [ ] Contact form only stores a `form_submission`, not a `lead` — a
      deliberate scope choice (a general contact message isn't necessarily a
      sales lead), but worth confirming that's the intended behavior.
- [ ] Admin auth is minimal: no password reset flow, no "remember me", and
      no way to create additional admin users from the UI — new admins have
      to be added directly in the Supabase Auth dashboard.
- [ ] Admin CRUD forms (vehicle add/edit) use plain React state, not
      react-hook-form + zod like the public forms — less polished live
      validation, acceptable for an internal tool but inconsistent with the
      rest of the codebase.
- [ ] `/inventory`'s list page can't be statically cached via ISR — it reads
      `searchParams` for filtering/pagination, which Next.js always treats
      as a dynamic API regardless of a `revalidate` export. True ISR only
      applies to Home, About, and vehicle detail pages.
- [ ] The vehicle detail page's "Inquire Now" and "Request Report" modals
      have no real customer sign-in to check for — the site only has admin
      auth. Name/email/phone are remembered via `localStorage` after a
      first submission instead, which is the closest equivalent without
      building a full customer account system. Revisit if real accounts
      are ever wanted.
- [x] Inquiry and report-request confirmation emails redesigned to match
      the site's black/red/white theme (checkmark badge, vehicle summary
      card, full submitted-details table, "View This Vehicle" button) and
      confirmed delivering live through Resend.

## Sprint 5 — Polish, Performance & SEO

- [x] `metadataBase`, a title template, and default OpenGraph/Twitter card
      metadata added to the root layout; every page's title de-duplicated
      against the new template.
- [x] `robots.txt` and a dynamic `sitemap.xml` (static routes + every
      non-draft vehicle, pulled live from Supabase).
- [x] JSON-LD structured data: an `Organization` schema site-wide
      (mirrors the footer's contact info exactly) and a `Vehicle`/`Offer`
      schema on every vehicle detail page.
- [x] Dynamic OG images — a branded site default and a per-vehicle one
      showing year/make/model, mileage, and price, generated via
      `next/og`.
- [x] Branded favicon + apple-touch-icon — a stylized red "E" mark on
      black, since there's still no real logo (see Sprint 1).
- [x] A custom 404 page matching the site's theme, plus loading skeletons
      for `/inventory` and `/inventory/[slug]` so navigation doesn't
      flash blank while data loads.
- [ ] No Lighthouse/Core Web Vitals audit was actually run — the above
      are the standard high-value SEO/polish items, not a measured
      performance pass. Worth running once the site is live on a real
      domain.
- [ ] No analytics wired up (no Google Analytics / Vercel Analytics —
      no keys/account to wire them to yet).
- [ ] No accessibility audit — alt text and semantic markup were done
      in passing where touched, not systematically reviewed site-wide.
- [ ] The sitemap and per-vehicle OG images depend on live Supabase
      data. Verified structurally (they degrade gracefully — empty
      vehicle list / fallback image — when the DB is unreachable, which
      is all that could be tested in this sandbox) but never checked
      against real vehicle records.

## Cross-cutting

- [x] Admin auth — added in Sprint 4 (Supabase Auth + middleware gating
      `/admin/*` and `/api/admin/*`).
- [ ] No test suite anywhere (unit or e2e).
- [ ] Commits aren't cryptographically signed (shows "Unverified" on
      GitHub) — cosmetic only, requires a signing key on the user's machine
      to resolve.
- [ ] Leads created *before* the `status` default was changed from `new` to
      `active` are still sitting at `new` in the live DB — the default only
      applies to new inserts. A one-time bulk update would be needed to
      bring existing leads in line, if wanted.
- [ ] `npm audit` flags several vulnerabilities in Next.js 14.2.35
      (one critical) — the fix requires a major-version bump to Next 16,
      which is a breaking change (App Router / React version implications)
      deliberately not attempted as a drive-by fix. Deserves its own
      dedicated upgrade-and-test pass.

## Email

- [ ] Resend is running in **sandbox mode** — no domain has been registered
      yet. Sending works, but two things are locked down until a domain is
      bought and verified in Resend:
      - `RESEND_FROM_EMAIL` is stuck at Resend's shared `onboarding@resend.dev`
        address (can't send from `@edgelineexports.com` without a verified
        domain).
      - Every email (client + team) can only actually be *delivered* to the
        Resend account's own signup address, regardless of who submitted the
        form — fine for testing, not usable for real customers yet.
- [ ] The "View This Vehicle" button in confirmation emails links to
      `NEXT_PUBLIC_SITE_URL`, which defaults to `https://edgelineexports.com`
      — a placeholder, since that domain isn't registered/live yet. The link
      will 404 until either the real domain goes live or `NEXT_PUBLIC_SITE_URL`
      is pointed at wherever the site is actually deployed (e.g. a Vercel
      preview URL) in the meantime.
