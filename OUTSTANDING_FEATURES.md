# Outstanding Features

Running list of things that are deliberately deferred, simplified, or not yet
verified live, by the sprint they came up in. Updated as each sprint lands.

## Light/Dark Mode + EN/FR Translation

- [x] Full light/dark theme toggle, defaulting to light. Cookie-based
      (`theme` cookie, read server-side via `next/headers` in
      `lib/theme/server.ts`), so there's no flash on first paint — the
      `<html>` tag already carries the right class before hydration.
      Semantic `surface`/`muted`/`card` color tokens (Tailwind, backed by
      CSS variables in `app/globals.css`) let components opt into
      theme-awareness; the literal `edgeline-black`/`edgeline-white`
      brand colors stay fixed on purpose anywhere the contrast is
      independent of site theme (white text on a red button, status
      badges and gallery arrows overlaid on vehicle photos).
- [x] EN/FR language toggle, defaulting to English. Same cookie pattern
      (`locale` cookie, `lib/i18n/server.ts`). Translation dictionary
      (`lib/i18n/dictionary.ts`) covers all static UI copy — nav, footer,
      hero, page headers, forms, buttons, modals, 404 page.
- [ ] Translation is intentionally scoped to static site copy only.
      Anything pulled from Supabase — vehicle make/model/description,
      testimonial quotes and names, admin-composed emails — is
      user-generated content and is NOT translated. A French-speaking
      visitor will see the UI chrome in French but vehicle listings and
      testimonials in whatever language they were originally entered in.
      Real translation of DB content would need either a translation
      service integrated into the admin forms or a parallel `_fr` column
      per translatable field — out of scope for this pass.
- [ ] The admin dashboard was deliberately left out of both the theme
      toggle and translation. It's an internal tool, not customer-facing,
      and keeps its existing fixed dark UI regardless of what a visitor
      has the public site set to.
- [ ] Theme/locale cookies read via `cookies()` force several pages that
      were previously static/ISR (`/`, `/about`, `/contact`,
      `/source-a-car`, `/sell-your-car`) to render dynamically on every
      request instead. This is an inherent tradeoff of per-request
      cookie-based theming — a future optimization could move the theme
      read to middleware + a response header instead, but that's a
      bigger change not attempted here.
- [x] Initially wired the toggle buttons with `router.refresh()`, which
      turned out to not reliably pick up a cookie set in the same click
      (stale Router Cache payload — confirmed via a live click test that
      showed the nav still in the old language despite the cookie being
      set correctly). Fixed by switching both toggles to a full
      `window.location.reload()`, verified via a live round-trip test.

## Sprint 1 — Foundation & Scaffolding

- [x] Supabase Storage bucket (`vehicle-images`) — created in Sprint 4 along
      with the admin upload flow.
- [ ] Footer's Privacy Policy / Terms of Service links point to `#` — no
      actual pages exist yet.
- [x] No real logo — resolved in the brand refactor (see below); nav,
      footer, admin, favicon, OG images, and emails all use the real logo.
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

- [x] Admin testimonials CRUD — `/admin/testimonials` (list, add, edit,
      publish/unpublish, delete), done post-Sprint-5.
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

## Post-Sprint-5

- [x] The three requested brand fonts (Know, Salty Ages, Lust) were paid
      marketplace fonts — used free Google Fonts stand-ins (Plus Jakarta
      Sans, Fraunces, Permanent Marker) until the brand refactor below
      replaced the display/accent fonts with the client's follow-up font
      picks, which are real Google Fonts (no substitution needed).
- [x] Admin branded email composer — `/admin/email`, sends to any
      client address with a sent-history log (`sent_emails` table).
- [ ] Can't literally send "from" edgelineexports@gmail.com — Resend
      requires a verified domain to send from, and gmail.com isn't one.
      The composer sends from the existing `RESEND_FROM_EMAIL` with
      `EDGELINE_REPLY_TO_EMAIL` (edgelineexports@gmail.com) as Reply-To
      instead, so replies still land in that inbox.
- [ ] Sending to arbitrary client addresses from the composer won't
      actually deliver until Resend is out of sandbox mode (a real
      domain is verified) — same sandbox restriction as every other
      email in the app.

## Brand Refactor (logo + fonts)

- [x] Real logo supplied by the client (black/red wordmark + car-swoosh
      icon) is now used everywhere: `Logo` component in Nav, Footer,
      AdminSidebar, and the admin login screen; a cropped icon mark for
      `app/icon.png`/`app/apple-icon.png` (replacing the placeholder
      stylized "E"); and the full logo embedded in both OG images and
      the transactional email header.
- [x] Three asset variants were derived from the client's single PNG
      (true-transparency light version, a white-recolored dark-bg
      version for use on the site's black surfaces, and a square icon
      crop) — see `public/logo.png`, `public/logo-dark-bg.png`,
      `public/icon-mark.png`.
- [x] Font system replaced per the client's explicit request: Abril
      Fatface (`font-display` — homepage hero, numeric/stat displays,
      prices), Yeseva One (`font-heading` — interior page titles via
      the shared `PageHeader`), Rock Salt (`font-accent` — small brand
      flourishes, e.g. the footer tagline). Bebas Neue, Fraunces, and
      Permanent Marker were retired; Plus Jakarta Sans (body) and
      Barlow Condensed (labels/nav) are unchanged.
- [ ] The request also asked to take design inspiration from four
      external sites (jadedmedia.ca, fastandfound.com, jakesdetailing.ca,
      heronaiapp.com). None were reachable from this sandbox (DNS/network
      policy blocks arbitrary outbound domains) and a Vercel-API workaround
      for the one site hosted on this account's own Vercel org also failed
      (403 on alias resolution). Per the client's explicit go-ahead ("use
      your own judgment"), the redesign proceeded on the logo's own visual
      language and the three named fonts alone — worth a follow-up pass if
      the client wants closer alignment with those specific references.

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
