# Hyve Freight Services — Website

Conversion-focused marketing site for **Hyve Freight Services**, a freight brokerage in Litchfield Park, AZ that operates like a freight partner.

**Live domain:** hyvedelivers.com

## Brand
- Neon lime green (#9fe80f / #8bcf06) · white · light gray · charcoal (#070707)
- Hexagon identity ("HYVE" hive) — HEXpertise · HEXecution · HEXcellence
- Headline treatment: Freight ~~Brokers~~ *Partners*. "Brokers" is scrubbed out by five
  overlapping neon marker passes (`.strike-line .s1`–`.s5`, drawn on by GSAP); "Partners"
  is handwritten Caveat in neon green. The word must stay readable under the scribble.
- The six standards: HEXpertise · HEXecution · HEXcellence · HEXperience · HEXchange · HEXpectation
- Taglines: "Every Side Connected. Every Load Delivered." · "Stronger Connections. Seamless Deliveries."

## Structure (5 pages, static — all in /public)
- `index.html` — home: hero w/ hand-scribbled cross-out, trust bar, Who We Are
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
- **The HEX Standard** is one large hexagon with six live points (`.hexos`): the H sits at the
  centre, each vertex carries a pulsing dot + label, and hovering/focusing a point opens a
  card explaining that standard. Under 1160px the cards are replaced by a single readout
  card beneath the hexagon, driven by the same JS. Markup is duplicated in `index.html`
  and `about.html`, styles live under "THE HEX STANDARD" in `style.css`.
- Scroll "journey rail": truck rides a route down the right edge, hex waypoints light up (desktop)
- GSAP + ScrollTrigger (vendored in `public/js/vendor/`) — strike-draw, parallax, reveals
- Quote modal on every page + inline forms
- Forms currently compose an email to sales@hyvedelivers.com (mailto). TODO: wire a form backend/SMTP before launch.
- SEO: unique titles/descriptions/keywords, OG tags, JSON-LD (LocalBusiness, Service, AboutPage)
- Phone number intentionally NOT displayed (client requirement)

## Deploy
Static site — deploy `public/` as root (Vercel auto-serves `public/`).

## Photography
- Home hero + statement: client-supplied Hyve truck renders.
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
