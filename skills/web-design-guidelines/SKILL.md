---
name: web-design-guidelines
description: The web "rules" for UI quality — where controls go, color and contrast, accessibility, responsive layout, and UX states. Use when reviewing or building web UI.
---

# Web Design Guidelines

The baseline rules for shipping a UI that looks right and works for everyone. Use for design reviews and before significant UI changes.

## Layout & placement

- Place the primary action consistently with the product, platform, reading direction, and form layout; there is no universal bottom-right rule.
- Destructive actions are visually separated and never the default focus.
- Keep a clear visual hierarchy: one primary action per view.
- Group related controls; use whitespace, not borders, as the first separator.
- Maintain a consistent spacing scale (e.g. 4 / 8 / 12 / 16).
- Don't reflow content as data loads — reserve space.

## Color & contrast

- Use design tokens, not random raw hex values.
- Text contrast: ≥ 4.5:1 for body, ≥ 3:1 for large text and UI/icon boundaries.
- **Color is never the only signal** — pair it with text, icon, or shape (status pills, errors).
- Use status colors consistently and distinguish them from brand/decorative color; red/green are not universally reserved meanings across products and cultures.

## Accessibility checklist

- Every interactive element is keyboard reachable and has a visible focus state.
- Buttons and inputs have accessible names (label, `aria-label`, or visible text).
- Modal dialogs/drawers contain focus, restore it on close, and support dismissal. Non-modal drawers must not trap keyboard focus.
- Hit targets are ≥ 24px (ideally 44px on touch).
- Respect `prefers-reduced-motion`.
- Images have `alt`; decorative images use empty `alt=""`.

## UX state checklist

- Every async surface has loading, empty, error, and success states.
- Destructive/irreversible actions require confirmation.
- Active filters/search are visibly reflected in the UI.
- Long lists/tables stay scannable with sticky headers/context.
- Copy is direct and operational — not vague marketing text.
- Dates, numbers, and statuses are formatted consistently.

## Responsive

- Design mobile-first; verify at common breakpoints.
- No horizontal scroll on small screens (except intentional carousels/tables).
- Tap targets and spacing scale up on touch.

## Workflow

1. For a formal review, optionally fetch the latest Vercel Web Interface Guidelines:
   `https://raw.githubusercontent.com/vercel-labs/web-interface-guidelines/main/command.md`
2. Apply rules to changed files; report findings by file/line.
3. Manually test the affected screens, including keyboard-only.

## Attribution

Inspired by **`vercel-labs/agent-skills`** `web-design-guidelines` (which fetches Vercel's **Web Interface Guidelines** at review time). Edit for this collection: made it a self-contained, offline checklist so it's useful without a network fetch, while keeping the live-fetch step as an option for the newest rules. For deep visual-system work (tokens/type/color), see the `design-language` skill.

## Reference

- Original skill: `https://github.com/vercel-labs/agent-skills/tree/main/skills/web-design-guidelines`
- Web Interface Guidelines: `https://raw.githubusercontent.com/vercel-labs/web-interface-guidelines/main/command.md`
- `GoogleChrome/modern-web-guidance` (UX/accessibility guides); W3C WAI / ARIA Authoring Practices.
