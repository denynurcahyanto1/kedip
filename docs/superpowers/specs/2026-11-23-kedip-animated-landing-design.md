# Kedip Animated Landing Page Design

## Intent

Create a warm, animated Kedip landing page for Indonesian long-distance couples that presents photo-strip layouts as the product's main visual proof.

## Scope update

This design records the landing-page scope before the later MVP PRD was provided. Email/password and Google authentication now live on a separate `/auth.html` page. The remaining booth, partner-linking, editor, gallery, storage, and payment flows are still outside this landing-page implementation.

## Approaches

- **Interactive landing page with a layout gallery (selected):** introduce Kedip, show the strip formats, and let visitors switch previews. This matches the requested landing-page scope and demonstrates the core product without pretending the backend exists.
- **Full photobooth MVP:** add sign-in, camera capture, WebRTC, editing, and persistence. This is outside the chosen landing-page scope and requires services not present in the supplied files.
- **Static strip catalog:** display the template art without interaction. This does not meet the request for an animated, smooth-scrolling web experience.

## Goals

- Build a responsive landing page with a real, accessible layout selector for 2R, 4R, Polaroid, 6x2, and 6x4.
- Retain the eight 2R strip styles from the supplied `Kedip — Template Strip.html`.
- Create eight 4R and seven Polaroid compositions, using the supplied layout sheets as structural references.
- Add eight 6x2 and seven 6x4 compositions based on the user's additional strip-layout reference.
- Use Kedip's supplied logo and brand direction. Create original film/photo-related side ornaments; do not copy the Fotoimoet identity shown in layout references.
- Use GSAP ScrollTrigger for restrained reveal motion and native smooth scrolling for in-page links.
- Respect keyboard interaction and `prefers-reduced-motion`.

## Non-goals

- No real camera access, user photo upload, strip editor, WebRTC, partner linking, photo persistence, download, or payment.
- Authentication is implemented separately and requires a configured Supabase project; this landing page does not imply the remaining MVP flows are available.
- No invented testimonials, statistics, pricing, or customer claims.
- No fabricated final photographs. Layout previews use clearly illustrative photo placeholders.

## Direction and design decisions

Reading this as: a product landing page for Indonesian LDR couples, in a warm and playful photo-keepsake style, dial ENERGY 2 / RHYTHM 2 / MOTION 2.

- Use Kedip's Plum `#2A1A33` and Cream `#FFF4EA` as core colors, with Butter `#FFC857` and Coral `#FF5A6E` as restrained accents, because these colors are defined in the supplied PRD.
- Use Fredoka for display text and Nunito for body text because their friendly shapes suit Kedip while Nunito stays legible in longer copy.
- Give the hero, process explanation, and strip gallery different compositions so the page's rhythm remains varied without adding template filler.
- Use the strip frame and film-perforation motif as the repeated product-specific identity. Any additional side ornament must relate to photography.
- Keep reveal motion small and brief to direct attention to the gallery without taking control of page scrolling.

## Interaction and content

- Navigation links point to real page sections.
- The five-format selector updates the visible design set and selected state. Template controls can switch the active preview.
- The primary CTA scrolls to the format gallery. No control implies that a real strip can already be created or saved.
- All controls have accessible names, visible focus, and clear hover/active states.
- UI copy must not contain em dashes. Do not include decorative emoji or unsupported product claims.

## Implementation and verification

- Use Vite, semantic HTML, CSS, vanilla JavaScript, and the locally installed GSAP/ScrollTrigger packages.
- Keep rendered content visible without JavaScript and disable non-essential motion when reduced motion is requested.
- Run the unit tests and production build. Verify all five formats, navigation, keyboard operation, narrow mobile layout, and reduced-motion behavior in a browser.
