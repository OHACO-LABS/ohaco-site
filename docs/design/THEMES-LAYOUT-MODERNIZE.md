# Design: 5-Theme System + Layout Modernization

**Date:** 2026-04-08  
**Author:** CC (Claude Code)  
**Branch:** `feat/themes-layout-modernize`  
**Status:** Implementation complete, pending visual review + PR

---

## Product mapping

| Field | Value |
|-------|-------|
| `product_id` | `semantic-memory` (marketing site surface) |
| `artifact_id` | n/a — ohaco-site is a separate repo, not yet cataloged |
| Upstream dependency | collab-memory `landing.html` themes (PR #72 by Cursor) |

**Note:** ohaco-site does not yet have its own `artifact_id` in `docs/PRODUCT-CATALOG.md`. Recommend adding `ohaco-site` as a surface under a new `product_id: ohaco-marketing` or as a surface of the org-level brand. Filing as open item.

---

## Goal

Port the 5-theme system from collab-memory's `landing.html` to the React-based ohaco-site, and modernize the homepage layout from centered-vertical to an asymmetric, AI-inspired design with micro-interactions.

### Done criteria

- [ ] 5 themes render correctly (Dark Matter, Light Studio, Nebula Bloom, Plasma Tide, Copper Orbit)
- [ ] Theme persists across page reloads (localStorage)
- [ ] Theme picker visible on desktop (nav dots) and mobile (drawer)
- [ ] FractalCanvas particles recolor on theme switch without position reset
- [ ] Site opens in Light Studio by default
- [ ] All original copy preserved verbatim (5 axioms, 6 products, hero text, signup tracks)
- [ ] All routes functional: `/`, `/signup`, `/investors`, `/about`, `/docs`, `/#thesis`, `/#products`
- [ ] 3 signup tracks preserved: customer, beta, volunteer
- [ ] OHACO logo has iridescent animation on hover
- [ ] Layout passes visual review on desktop + mobile viewport
- [ ] Build passes (`npm run build` or equivalent)

---

## Constraints

- **No copy changes** — layout only (explicit user instruction)
- **No product removals** — all 6 products must remain
- **No route changes** — all existing paths preserved
- **No new dependencies** — use existing Tailwind, Framer Motion, Lucide stack
- **P0 check:** No security surface touched (no auth, no API calls, no tenant data)
- **P1 check:** No schema changes, no backend changes

---

## Design decisions

### 1. Theme system architecture

**Pattern:** CSS custom properties on `[data-theme]` selector, matching collab-memory's approach.

| Theme | Class/Attribute | Dark mode? | Primary accent |
|-------|----------------|------------|----------------|
| Dark Matter | `data-theme="dark"` | Yes | oklch(0.65 0.24 275) — purple |
| Light Studio | `data-theme="light"` | No | oklch(0.45 0.24 275) — deep purple |
| Nebula Bloom | `data-theme="nebula"` | Yes | oklch(0.7 0.28 320) — magenta |
| Plasma Tide | `data-theme="plasma"` | Yes | oklch(0.75 0.18 170) — teal |
| Copper Orbit | `data-theme="copper"` | Yes | oklch(0.72 0.16 55) — warm orange |

**Rationale:** oklch for perceptual uniformity. Dark themes add `.dark` class for Tailwind `dark:` variant compat.

### 2. Layout changes

| Section | Before | After | Rationale |
|---------|--------|-------|-----------|
| Hero | Centered vertical stack | Split-panel: left brand/CTA + right floating signal cards | Breaks monotony, creates visual hierarchy, user-requested |
| Products | Centered grid | Horizontal snap-scroll rail (280-300px cards) | User explicitly wanted horizontal, non-typical layout |
| Thesis | Centered single-column | Asymmetric 2-column (number+statement left, body right) | Spatial, not listy — per user feedback |

### 3. Logo enhancement

Iridescent `conic-gradient` with oklch stops, `rotate-180` on group hover. Inner dark circle with gradient text "O". Intentionally subtle — placeholder upgraded, not replaced.

### 4. FractalCanvas theme responsiveness

`MutationObserver` on `document.documentElement` watching `data-theme` attribute changes. Recolors existing particles in-place without resetting animation state.

---

## Files modified (8)

| File | Change summary |
|------|---------------|
| `client/src/index.css` | +108 lines — 3 new theme CSS blocks (nebula, plasma, copper) |
| `client/src/contexts/ThemeContext.tsx` | Rewritten — 2→5 themes, `cycleTheme()`, typed exports |
| `client/src/components/Navbar.tsx` | Theme dot picker (desktop+mobile), iridescent logo mark |
| `client/src/components/FractalCanvas.tsx` | Per-theme color palettes, MutationObserver recolor |
| `client/src/App.tsx` | `defaultTheme="light"` |
| `client/src/components/sections/HeroSection.tsx` | Asymmetric split layout |
| `client/src/components/sections/ProductsSection.tsx` | Horizontal snap-scroll rail, 6 products |
| `client/src/components/sections/ThesisSection.tsx` | Asymmetric 2-column axiom layout |

---

## Risks

| Risk | Severity | Mitigation |
|------|----------|------------|
| oklch browser support | Low | oklch supported in all modern browsers (Chrome 111+, Safari 15.4+, Firefox 113+). Tailwind v4 already uses it. |
| Horizontal scroll discoverability | Medium | Scroll hint button + snap behavior. Mobile-natural gesture. |
| Copy drift | High (user-critical) | Verified all 5 axiom statements + bodies verbatim, all 6 product descriptions verbatim |
| Theme CSS specificity | Low | `[data-theme="x"]` selectors, no `!important` |

---

## Open items

- [ ] ohaco-site needs its own `artifact_id` in PRODUCT-CATALOG.md
- [ ] Visual review with user before merge
- [ ] Mobile viewport testing (drawer, horizontal scroll, theme dots)
