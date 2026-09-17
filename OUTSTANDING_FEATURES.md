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
- [ ] Dynamic OG image generation (per-vehicle social share images) not
      done — explicitly Sprint 5 scope; only basic meta tags exist now.
- [ ] Never visually verified with real photos, only placeholder/empty
      states.

## Sprint 3 — Source & Sell Forms

- [ ] Resend email sending has never been tested end-to-end with a live
      API key — only verified it degrades gracefully without one.
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

## Cross-cutting

- [x] Admin auth — added in Sprint 4 (Supabase Auth + middleware gating
      `/admin/*` and `/api/admin/*`).
- [ ] No test suite anywhere (unit or e2e).
- [ ] Commits aren't cryptographically signed (shows "Unverified" on
      GitHub) — cosmetic only, requires a signing key on the user's machine
      to resolve.
