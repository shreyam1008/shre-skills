---
name: design-language
description: Build and apply a coherent visual design language — design tokens, color, typography, spacing, elevation, and motion systems. Use when establishing a design system, theming, choosing type/color scales, or making a UI feel intentional rather than templated.
---

# Design Language

A design language is the **system** behind a UI: a small set of repeatable decisions (tokens) that make everything feel like one product. Consistency comes from systems, not from styling each screen by hand. (For per-screen review rules — placement, a11y, UX states — see `web-design-guidelines`; for distinctive aesthetic direction, see project briefs.)

## Tokens are the foundation

Express every visual decision as a named token, then build components only from tokens. Three tiers:

- **Primitive** (raw scale): `blue-500`, `space-4`, `font-size-2`.
- **Semantic** (intent): `color-bg-surface`, `color-text-muted`, `space-inset-md`, `radius-control`.
- **Component** (optional): `button-bg`, `card-shadow`.

Components reference *semantic* tokens, never raw values — so theming/dark mode is just swapping the primitive→semantic mapping.

```css
:root {
  --blue-600: oklch(0.55 0.16 255);     /* primitive */
  --color-accent: var(--blue-600);       /* semantic  */
  --color-text: #16181d; --color-bg: #fff;
}
[data-theme="dark"] { --color-text: #e7e9ee; --color-bg: #0d0f12; }
```

## Color system

- Build from roles, not random hues: background/surface, text (default/muted/inverse), border, accent/brand, and states (success/warning/danger/info).
- Use a perceptual color space (OKLCH/LCH) so steps look evenly spaced and you can derive tints/shades systematically.
- Define light **and** dark from the same semantic roles. Verify contrast (≥ 4.5:1 body, ≥ 3:1 large/UI). Color is never the only signal.

## Typography

- Pick a small set of families (often one display + one body; a mono for data). Pair deliberately — type carries personality.
- Define a **modular type scale** (e.g. 1.2–1.25 ratio) and a matching line-height/leading scale; tighter leading for headings, looser for body.
- Limit weights/sizes to the scale. Set sensible measure (~45–75 chars/line). Use `clamp()` for fluid headings.

## Spacing, sizing & shape

- One **spacing scale** (e.g. 4-based: 4/8/12/16/24/32…) used for margin, padding, and gap — everywhere. This single rule removes most "off by a few pixels" inconsistency.
- Consistent **radius** and **border** tokens; sizes (control heights, container widths) on a scale too.

## Elevation & depth

- A small set of elevation tokens (shadow + surface tint) mapped to meaning: resting, raised (cards), overlay (menus), modal. Don't invent one-off shadows.

## Motion

- Tokenize **durations** (e.g. 100/200/300ms) and **easings** (standard, decelerate, accelerate). Short for small UI feedback, longer for larger transitions.
- Motion should clarify cause/effect and continuity, not decorate. Always honor `prefers-reduced-motion`.

## Make it real

- Store tokens once (CSS custom properties, or a tokens file → Style Dictionary → CSS/TS/Tailwind). One source of truth feeds code and design tools.
- Document the system (a living style guide / Storybook) so the team applies it consistently.
- When extending: add to the scale, don't introduce off-system one-offs.

## Quick audit

- [ ] Every color/space/type value comes from a token, not a literal.
- [ ] Light + dark derive from the same semantic roles; contrast checked.
- [ ] Type sizes/weights and spacing all sit on their scales.
- [ ] Elevation and motion use the defined sets.
- [ ] One documented source of truth for tokens.

## Reference

- Google **Material Design 3** (m3.material.io) — tokens, color roles, type scale, elevation, motion.
- Google **HEART** framework (UX metrics); **Web Interface Guidelines** (vercel-labs).
- "Refactoring UI" (Wathan & Schoger); W3C Design Tokens Community Group format; Amazon Style Dictionary.
