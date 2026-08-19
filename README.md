# Hyve Freight Services — Website

Conversion-focused marketing site for **Hyve Freight Services**, a freight brokerage in Litchfield Park, AZ that operates like a freight partner.

**Live domain:** hyvedelivers.com

## Brand
- Neon lime green (#9fe80f / #8bcf06) · white · light gray · charcoal (#070707)
- Hexagon identity ("HYVE" hive) — HEXpertise · HEXecution · HEXcellence
- Headline treatment: Freight ~~Brokers~~ *Partners* (script, neon green)
- Taglines: "Every Side Connected. Every Load Delivered." · "Stronger Connections. Seamless Deliveries."

## Structure (5 pages, static — all in /public)
- `index.html` — home: hero w/ animated strikethrough, trust bar, Who We Are, HEX Standard, services accordion, statement, quote section
- `shippers.html` — services detail (FTL, LTL, reefer, flatbed, expedited, specialized) + process + stats
- `carriers.html` — carrier benefits, requirements, carrier packet form
- `industries.html` — 6 verticals + coverage
- `about.html` — story, HEX standard, contact + forms

## Features
- Logo lockup collapses to H-hexagon on scroll (Dynamo-style)
- Scroll "journey rail": truck rides a route down the right edge, hex waypoints light up (desktop)
- GSAP + ScrollTrigger (vendored in `public/js/vendor/`) — strike-draw, parallax, reveals
- Quote modal on every page + inline forms
- Forms currently compose an email to sales@hyvedelivers.com (mailto). TODO: wire a form backend/SMTP before launch.
- SEO: unique titles/descriptions/keywords, OG tags, JSON-LD (LocalBusiness, Service, AboutPage)
- Phone number intentionally NOT displayed (client requirement)

## Deploy
Static site — deploy `public/` as root (Vercel auto-serves `public/`).

## Photography
Unsplash (free commercial license) — desert/golden-hour trucking to match brand direction.
