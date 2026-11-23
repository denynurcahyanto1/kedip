# Kedip Animated Landing Page Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build an animated Kedip landing page with an accessible interactive gallery for 2R, 4R, and Polaroid photo-strip designs.

**Architecture:** Use a small Vite vanilla-JavaScript app. Keep strip metadata in a testable module, render the selected format into semantic HTML, and isolate GSAP scroll reveals from the gallery controls. Use the existing Kedip logo assets and keep all content local.

**Tech Stack:** Vite, vanilla JavaScript, CSS, GSAP with ScrollTrigger, Node.js built-in test runner.

**Spec:** `docs/superpowers/specs/2026-11-23-kedip-animated-landing-design.md`

## Global Constraints

- Keep the Kedip palette from the approved design: Plum `#2A1A33`, Cream `#FFF4EA`, Butter `#FFC857`, and Coral `#FF5A6E`.
- Preserve eight 2R styles; add eight 4R compositions and seven Polaroid compositions.
- Use Kedip assets and original photo-related ornaments. Do not copy the Fotoimoet logo or identity.
- No camera, upload, editor, auth, WebRTC, persistence, download, payment, or backend behavior.
- No fabricated photos, testimonials, statistics, pricing, or customer claims.
- All content must remain visible if JavaScript does not run; honor `prefers-reduced-motion`.
- Navigation and controls must have real behavior, accessible names, keyboard operation, visible focus, and responsive layouts.

## Review Focus

- **Unknown format selection:** gallery state must throw `RangeError` for unsupported formats. Pin this in `tests/gallery-state.test.js` in Task 2.
- **Missing or unavailable logo assets:** show a readable text wordmark if the logo image fails. In Task 4, force the image URL to fail and verify the fallback is visible.
- **Reduced-motion preference:** reveal animation must not hide content or continue moving when reduced motion is enabled. In Task 3, emulate the preference and verify all content remains visible without motion.
- **Small screens:** no strip preview or navigation may overflow at 375px. In Task 4, assert `scrollWidth <= innerWidth` at 375px and inspect desktop width.
- **Keyboard-only use:** all format/template controls and navigation must work with Tab and Enter/Space, with visible focus. In Task 4, navigate the gallery without a pointer and verify the active state changes.

---

### Task 1: Create the strip catalog and tests

**Files:**
- Create: `package.json`
- Create: `src/templates.js`
- Test: `tests/templates.test.js`

**Interfaces:**
- Produces `TEMPLATE_CATALOG`, an array of records with `id`, `format`, `name`, `photoCount`, and `style`.
- Produces `getTemplatesByFormat(format)`, returning the catalog records for `2r`, `4r`, or `polaroid`.

- [ ] **Step 1: Add failing catalog tests**

  Add `package.json` with `type: "module"` and a `test` script using `node --test`. In `tests/templates.test.js`, test that `getTemplatesByFormat` returns 8 2R records, 8 4R records, and 7 Polaroid records. Assert IDs are unique and every record has a non-empty name and style.

- [ ] **Step 2: Run the tests and confirm they fail because the catalog module is missing**

  Run: `node --test tests/templates.test.js`
  Expected: FAIL with the missing `src/templates.js` module.

- [ ] **Step 3: Add the catalog module**

  Populate `TEMPLATE_CATALOG` with the exact format counts and export `getTemplatesByFormat(format)`.

- [ ] **Step 4: Run the catalog tests**

  Run: `npm test`
  Expected: PASS for format counts, unique IDs, and required fields.

### Task 2: Build the responsive landing page and format gallery

**Files:**
- Create: `index.html`
- Create: `src/main.js`
- Create: `src/gallery-state.js`
- Create: `src/gallery-view.js`
- Create: `src/styles.css`
- Test: `tests/gallery-state.test.js`
- Test: `tests/gallery-view.test.js`
- Create: `public/assets/` for the supplied Kedip logo files and strip artwork, extracted from the user-provided archive/template.
- Modify: `package.json` with the Vite scripts and dependency.

**Interfaces:**
- Consumes `getTemplatesByFormat(format)` from Task 1.
- Produces `getGallerySelection(format, selectedId)` from `src/gallery-state.js`. It returns `{ format, templates, selectedTemplate }`; an ID from another format selects the first template in the requested format, and an unsupported format throws `RangeError`.
- Produces `renderGallery(selection)` from `src/gallery-view.js`, returning accessible markup with one selected format and one selected template.
- Produces semantic page sections with IDs `home`, `story`, and `formats`.
- Produces format buttons with `data-format` values `2r`, `4r`, and `polaroid`, and template selection controls with a synchronized active state.

- [ ] **Step 1: Add failing gallery-state tests**

  Test that a valid template ID remains selected, switching to a different format selects that format's first template, and an unsupported format throws `RangeError`.

- [ ] **Step 2: Run the tests and confirm they fail because the gallery-state module is missing**

  Run: `node --test tests/gallery-state.test.js`
  Expected: FAIL with the missing `src/gallery-state.js` module.

- [ ] **Step 3: Implement gallery selection state**

  Implement `getGallerySelection(format, selectedId)` using `getTemplatesByFormat` and add it to the format and template event handlers.

- [ ] **Step 4: Add failing gallery-render tests**

  In `tests/gallery-view.test.js`, assert rendered markup marks the requested format and template as selected and includes that template's name. Verify the three supported format controls appear once.

- [ ] **Step 5: Run the tests and confirm they fail because the gallery-view module is missing**

  Run: `node --test tests/gallery-view.test.js`
  Expected: FAIL with the missing `src/gallery-view.js` module.

- [ ] **Step 6: Implement the accessible gallery renderer and landing page**

  Implement `renderGallery(selection)` with native buttons and `aria-pressed` states. Add a distinct hero, a product-story section based on the PRD flow, and an interactive format gallery. Use clear photo placeholders, the supplied Kedip logo, and original film/photo-related side ornaments. Set dimensions or aspect ratios on all media.

- [ ] **Step 7: Add the responsive visual system**

  Implement the approved palette and type pairing. Provide mobile navigation, visible focus, hover/active/disabled states, adequate touch targets, and a layout that does not overflow at 375px.

- [ ] **Step 8: Run tests and inspect the gallery in a browser**

  Run: `npm test`
  Expected: PASS for catalog counts and gallery selection.

  Verify each format button and template control updates the preview and selected state, keyboard activation works, and all navigation anchors resolve to real sections.

### Task 3: Add GSAP scroll reveals and reduced-motion behavior

**Files:**
- Create: `src/animations.js`
- Test: `tests/animations.test.js`
- Modify: `src/main.js`
- Modify: `src/styles.css`
- Modify: `package.json` with GSAP and ScrollTrigger dependency.

**Interfaces:**
- `initScrollReveals(root = document)` registers `ScrollTrigger` once and animates only elements marked `data-reveal`.
- `applyScrollReveals(root, prefersReducedMotion, animate)` skips animation callbacks when reduced motion is enabled and returns the number of animated targets.

- [ ] **Step 1: Add failing reduced-motion tests**

  In `tests/animations.test.js`, assert `applyScrollReveals` does not call the animation callback when reduced motion is enabled, and calls it once per `[data-reveal]` target otherwise.

- [ ] **Step 2: Run the tests and confirm they fail because the animation module is missing**

  Run: `node --test tests/animations.test.js`
  Expected: FAIL with the missing `src/animations.js` module.

- [ ] **Step 3: Implement reduced-motion gating and GSAP reveals**

  Implement `applyScrollReveals` and `initScrollReveals`. Add GSAP, register `ScrollTrigger` once, and use short, small-offset reveals for below-the-fold sections. Keep native anchor smooth scrolling; do not pin sections or hijack wheel/touch scroll. In reduced-motion mode, render content immediately and skip reveal setup.

- [ ] **Step 4: Run tests, build, and verify in a browser**

  Run: `npm test`
  Expected: PASS for catalog, gallery state, and reduced-motion gating.

  Run: `npm run build`
  Expected: Vite production build completes without errors.

  In normal mode, verify marked sections reveal as they enter the viewport. Emulate `prefers-reduced-motion: reduce` and verify all content is visible without non-essential movement or hidden initial states.

### Task 4: Verify the completed page

**Files:**
- Modify only files that fail these checks.

- [ ] **Step 1: Run tests and production build**

  Run: `npm test`
  Expected: PASS.

  Run: `npm run build`
  Expected: Vite production build completes without errors.

- [ ] **Step 2: Exercise interactions in the browser**

  Verify each format button, template selection, in-page navigation link, and mobile menu individually. Record what each control does and confirm there are no console errors.

- [ ] **Step 3: Verify responsive and accessibility behavior**

  Check at 375px and desktop width, keyboard-only navigation, visible focus, and reduced-motion mode. Confirm no horizontal overflow and that page content remains readable without JavaScript.
