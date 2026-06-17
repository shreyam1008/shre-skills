---
name: web-design-guidelines
description: The web "rules" for UI quality — where controls go, color and contrast, accessibility, responsive layout, and UX states. Use when reviewing or building web UI.
---

# Web Design Guidelines

The baseline rules for shipping a UI that looks right and works for everyone. Use for design reviews and before significant UI changes.

## Layout & placement

- Primary action goes bottom-right of a form/dialog; secondary/cancel to its left.
- Destructive actions are visually separated and never the default focus.
- Keep a clear visual hierarchy: one primary action per view.
- Group related controls; use whitespace, not borders, as the first separator.
- Maintain a consistent spacing scale (e.g. 4 / 8 / 12 / 16).
- Don't reflow content as data loads — reserve space.

## Color & contrast

- Use design tokens, not random raw hex values.
- Text contrast: ≥ 4.5:1 for body, ≥ 3:1 for large text and UI/icon boundaries.
- **Color is never the only signal** — pair it with text, icon, or shape (status pills, errors).
- Limit accent colors; reserve red/green strictly for error/success.

## Accessibility checklist

- Every interactive element is keyboard reachable and has a visible focus state.
- Buttons and inputs have accessible names (label, `aria-label`, or visible text).
- Modals/drawers trap focus and restore it on close; `Esc` closes.
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
