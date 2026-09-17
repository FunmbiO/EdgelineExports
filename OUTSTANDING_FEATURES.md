# Outstanding Features

Running list of things that are deliberately deferred, simplified, or not yet
verified live, by the sprint they came up in. Updated as each sprint lands.

## Sprint 1 — Foundation & Scaffolding

- [ ] Supabase Storage bucket (`vehicle-images`) was never actually created —
      the schema references image URLs but there's no bucket/policies set up.
- [ ] Footer's Privacy Policy / Terms of Service links point to `#` — no
      actual pages exist yet.
- [ ] No real logo — nav/footer use styled text ("EDGELINE EXPORTS").
- [ ] Vercel deployment documented in the README but never actually
      connected/verified live.

## Sprint 2 — Inventory & Car Detail

- [ ] Vehicles show a placeholder gradient instead of real photos — image
      upload has nowhere to go until the Storage bucket + admin panel exist.
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

## Cross-cutting

- [ ] No test suite anywhere (unit or e2e).
- [ ] Admin auth doesn't exist yet — every form/inventory write currently
      goes through the service-role key with no login gate, which is only
      safe because there's no admin UI yet to gate.
- [ ] Commits aren't cryptographically signed (shows "Unverified" on
      GitHub) — cosmetic only, requires a signing key on the user's machine
      to resolve.
