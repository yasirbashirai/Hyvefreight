# HYVE Freight Services — Website

Conversion-focused marketing site for **HYVE Freight Services**, a freight brokerage in Litchfield Park, AZ that operates like a freight partner.

**Live domain:** hyvedelivers.com

## Brand
- Neon lime green (#9fe80f / #8bcf06) · white · light gray · charcoal (#070707)
- Hexagon identity ("HYVE" hive) — HEXpertise · HEXecution · HEXcellence
- **The company name is always written `HYVE Freight Services`** — never "Hyve". Applies to
  copy, headings, titles, metadata, alt text and the footer.
- Headline treatment: Freight ~~Brokers~~ *Partners*. "Brokers" is struck through by **two**
  bold **black** marker strokes (`.strike-line .s1`/`.s2`, drawn on by GSAP) — deliberate and
  hand-drawn, not a scribble, and the word must stay readable under them.
  Black, not white: white type over the grayscale plate meant white strokes muddied the word
  and read as a highlight. Black keeps BROKERS legible AND reads instantly as a cross-out.
  A white halo around the black strokes just makes them glow — the edge stays clean. "Partners" is
  handwritten Caveat in neon green with a neon underline.
- The six standards: HEXpertise · HEXecution · HEXcellence · HEXperience · HEXchange · HEXpectation
- Taglines: "Every Side Connected. Every Load Delivered." · "Stronger Connections. Seamless Deliveries."

## Structure (5 pages, static — all in /public)
- `index.html` — home: grayscale hero w/ two-stroke cross-out, trust bar, Who We Are
  ("The Name Says Broker. The Work Says Partner."), interactive HEX Standard hexagon,
  services accordion, "Stronger Connections. Seamless Deliveries." second hero, quote section
- `shippers.html` — services detail (FTL, LTL, reefer, flatbed, expedited, specialized) + process + stats
- `carriers.html` — carrier benefits, requirements, carrier packet form
- `industries.html` — 6 verticals + coverage
- `about.html` — story, HEX standard, contact + forms

## Features
- Logo lockup collapses to H-hexagon on scroll (Dynamo-style). The mark is the supplied
  hexagon-H (`images/logo-mark.png`) shown as-is; do NOT re-apply a CSS hexagon clip-path
  around it or it reads as a hexagon inside a hexagon.
- Footer carries the **full lockup** (hexagon + HYVE / FREIGHT SERVICES), not the bare mark —
  same treatment as the header, recoloured for the dark ground (`.footer-lockup`).
- **The HEX Standard** is one large hexagon with six live points (`.hexos`): the H sits at the
  centre, each vertex carries a pulsing dot + label, and hovering/focusing a point opens a
  card explaining that standard. Under 1160px the cards are replaced by a single readout
  card beneath the hexagon, driven by the same JS. Markup is duplicated in `index.html`
  and `about.html`, styles live under "THE HEX STANDARD" in `style.css`.
- HEX Standard sizing is deliberate and Ben-approved: stage `min(418px, 41vw)`, labels
  `1.14rem`, dots `26px`. `.hexos` padding-top is the clearance the **top pop-up card** needs —
  drop it further and the HEXpertise card lands on the section sub-headline. The top and bottom
  cards are `566px` wide precisely so they wrap to two lines and stay short enough to fit.
- Under 1160px the HEX Standard is **tap-to-open**: the hover binding is skipped when
  `(hover: hover) and (pointer: fine)` is false, each dot carries a 46px `::before` hit area,
  and the readout card below flashes on every tap so the change gets noticed.
- Scroll "journey rail": truck rides a route down the right edge, hex waypoints light up (desktop)
- GSAP + ScrollTrigger (vendored in `public/js/vendor/`) — strike-draw, parallax, reveals
- Quote modal on every page + inline forms
- Forms currently compose an email to sales@hyvedelivers.com (mailto). TODO: wire a form backend/SMTP before launch.
- **SMS / mobile-data consent notice** (`.form-disclaimer`) sits in fine print at the very
  bottom of every quote-request form (the `#quote` section form on the home page and the quote
  modal on all 5 pages) and the About page's "Send Us a Message" form — client-supplied wording,
  matching the pattern on midasfreight.com/contact. It is deliberately NOT on the carrier-packet
  form on `carriers.html`; Ben scoped it to the quote and message forms.
- SEO: unique titles/descriptions/keywords, OG tags, JSON-LD (LocalBusiness, Service, AboutPage)
- Phone number intentionally NOT displayed (client requirement)

## Deploy
Static site — deploy `public/` as root (Vercel auto-serves `public/`).

## Photography
- **Home hero**: `hero-road-bw.jpg` (2600x1139, desktop) and `hero-road-bw-portrait.jpg`
  (1040x1400, phones) swapped by a `<picture>` media query at 720px. The phone crop trims the
  foreground road (source y 0–700) so the truck lands in the lower third and the headline gets
  clear sky; the wide crop uses `object-position: 62% 52%` to keep the truck in frame.
- The hero scrim is dark and **left-weighted** (96deg, .84 → 0 by 82%) so the words have contrast
  without a flat overlay across the truck and the range. Headline and tagline are white and
  the two strike strokes are black; only "Partners" and the tagline accents carry the neon.
- Statement panel: same grayscale rule as the heroes.
- Capabilities strip: the client's own US truck photos (`~/long usa truck images`), one per
  service — `svc-ftl` (Dry-Van-Trailer-2), `svc-ltl` (long trucks for freigt),
  `svc-reefer` (refrigerated truck), `svc-flatbed` (Flatbed Truck image),
  `svc-expedited` (white long truck), `svc-specialized` (Dump truck).
  All output 1600x900. The flatbed (650px) and dump (700px) sources are upscaled and get an
  unsharp pass; they are the two soft ones and would benefit from higher-res originals.
  Note: the LTL shot carries another fleet's magenta decals on all four cabs — normal for a
  broker showing carrier equipment, but it cannot be cropped out without cutting the cabs.
- Carriers / Industries heroes: Pexels (free commercial licence) — `hero-carriers-cab`,
  `hero-industries-job`.
- About "Our Story": `story-arizona.jpg` (Superstition Mountains, east of Phoenix).
- **All inner-page heroes render grayscale** (`.page-hero .hero-media img`) so the neon
  green and the typography carry the frame. The statement section's photo is knocked back
  the same way so the type stays the subject.
- The older `client-*.jpg` copies are still in `images/` but unused; the Capabilities strip
  now builds from the originals in `~/long usa truck images`.

## Regenerating the hero images
Both crops come from one source frame with the same recipe (Pillow): grayscale ->
`autocontrast(cutoff=(0.4, 0.2))` -> LANCZOS resize -> `UnsharpMask(radius=1.6, percent=62-70,
threshold=4)` -> `Contrast(1.04)` -> JPEG q90 progressive. Keep the unsharp percent low; at 150%
the mountain texture goes crunchy.

## The H mark
`images/logo-mark.png` (998x1120) is the supplied hexagon-H, thickened: the crisp line is isolated
from its glow (alpha remapped from 110-250), dilated by a **1.9px disk at 1x** (~7px stroke ->
~11px), then the neon is rebuilt as a solid lime line plus a Gaussian bloom. Do not wrap it in a
CSS hexagon, it already is one. The same file is the header mark, the footer mark and the core of
the HEX Standard graphic, so thickening it once covered all three.

## Type
- `--font-head` Montserrat · `--font-body` Inter
- `--font-script` Caveat — the hand-marker voice ("Partners")
- `--font-flow` **Kaushan Script** — the smooth semi-handwritten voice ("Seamless Deliveries.",
  `.statement h2 .l2` and `.cta-band h2 .flow`). Deliberately not a classic cursive.

## Vertical rhythm
Ben asked for the whole site to run 5–10% tighter without crowding anything. The levers, all in
`style.css` — change these rather than padding individual sections:
- `.section` padding and `.section-head` margin-bottom (the two that move every page)
- `.section:has(+ .statement)` — the light section before the full-bleed dark statement panel
  gets a much smaller bottom pad. The dark panel separates itself; a full pad above it just
  produced the band of white Ben flagged between Capabilities and "Stronger Connections."
- `.statement` min-height, `.trust-bar`, `.site-footer`, `.page-hero`

Measured with the probe below (document height, committed vs working): index −6.8%, about −6.5%,
shippers −5.2%, carriers −4.2%, industries −4.1%. In `?noanim` the heroes are pinned at 860px,
which understates the section-only reduction — excluding the pinned hero every page lands 5–8%.

## QA harness
`python3 -m http.server 8788` in `public/`. **Headless Chrome floors its viewport at 500px**, so
phone widths must be driven over CDP (`Emulation.setDeviceMetricsOverride`) — a `--window-size=390`
screenshot silently renders at 500px and lies. Append `?noanim` to freeze motion and `?debugw` to
list overflow offenders in `document.title`.

`Page.captureScreenshot` **hangs** with `captureBeyondViewport: true` on current Chrome — scroll
the page and clip inside the viewport instead. And a reused `--user-data-dir` serves a **cached
stylesheet**, so CSS edits look like no-ops; send `Network.setCacheDisabled` on every run.
