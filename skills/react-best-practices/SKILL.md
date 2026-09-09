---
name: react-best-practices
description: "React performance and maintainability guidelines. Use when writing, reviewing, or refactoring React code: data fetching, rendering, state, hooks, and bundle size."
---

# React Best Practices

Apply when authoring or reviewing React components.

## 1. Eliminate waterfalls

- Start independent async work early; await as late as possible.
- Parallelize independent requests with `Promise.all`.
- Avoid serial fetching caused by nested components each fetching their own data.
- Hoist data requirements up so they can be requested together.

## 2. Control bundle size

- Prefer direct imports over barrel (`index.ts`) imports from large packages.
- Lazy-load heavy or rarely-opened UI: charts, editors, large drawers, admin tools.
- Keep heavy chart/visualization libs out of the initial route chunk.
- Re-check the build output after adding any dependency.

## 3. Server state belongs in a query library

- Prefer the project's framework loaders, server components, or query library for API data. If an effect is the appropriate integration point, handle cancellation/races, errors, and loading explicitly; do not add a library merely to avoid one effect.
- Use stable, serializable query keys.
- Set `staleTime` / refetch intervals intentionally.
- Always render loading, empty, error, and stale states.

## 4. Avoid unnecessary re-renders

- Never define components inside other components.
- Include every reactive dependency in effects and memo hooks. Reduce unnecessary object/function dependencies by restructuring the code, never by omitting values to silence the linter.
- Derive state during render instead of syncing it with effects.
- Use functional `setState` updates to keep callbacks stable.
- Use refs for transient, high-frequency values that shouldn't trigger renders.
- Memoize only when it protects real work or stabilizes a child's props — not by default.

```tsx
// derive, don't sync
const fullName = `${first} ${last}`; // not useState + useEffect
```

## 5. Effects: use sparingly

- An effect is for synchronizing with an external system (DOM, network, subscriptions).
- If you can compute it during render, you don't need an effect.
- Always provide a cleanup function for subscriptions/timers.
- Prefer loaders/query caches for fetching. Derive render data during render and respond to user events in their handlers.

## 5b. React 19+ (check your version first)

- **Actions**: pass an async function to `<form action={fn}>`; React manages pending/error/reset. Pair with `useActionState` (form lifecycle) and `useFormStatus` (child pending state).
- **`useOptimistic`** for instant mutation feedback (must run inside a transition or action).
- **`use()`** reads a promise/context and can be called conditionally within a component or hook. For client Suspense reads, use a stable promise supplied by a framework/cache or server component; creating a fetch promise on every render is unsupported.
- **`ref` is a prop** — drop `forwardRef` on new components (`function Input({ ref, ...p }) {}`).
- **React Compiler** auto-memoizes; where it's enabled, stop hand-writing most `useMemo`/`useCallback`/`memo`.

## 6. Rendering & interaction

- Use `useTransition` / `startTransition` for non-urgent updates that block input.
- Virtualize or paginate lists when mounting all rows is expensive; an overflow/scroll container alone does not reduce mounted DOM or React work.
- Preserve keyboard and focus behavior.
- Avoid layout shift in loading states (reserve space / skeletons).

## 7. Motion & view transitions

Add motion only when it helps users keep context (drawer open/close, selected-row focus, list reorder) — never on urgent status changes or where it slows scanning.

- React's `<ViewTransition>` is experimental — confirm the installed React version supports it before using it. Otherwise use the native `document.startViewTransition` API or plain CSS transitions.
- Never call `document.startViewTransition` directly while using React's `<ViewTransition>` (they conflict).
- React view transitions trigger on transition boundaries (`startTransition`), not ordinary `setState`.
- Choose transition boundaries around the DOM whose change should be animated; follow the installed version's nesting and enter/exit behavior.
- Always respect `prefers-reduced-motion`; animate `transform`/`opacity`, not layout.
- Don't pull in a full animation library for a single transition.

```css
@media (prefers-reduced-motion: reduce) {
  ::view-transition-group(*) { animation: none; }
}
```

## Verification

- Run the project's lint, type-check, build, and tests.
- Inspect build output for chunk shape after adding heavy imports.

## Attribution

Distilled from **`vercel-labs/agent-skills`** `react-best-practices` (MIT, 70 rules across 8 categories) into a single-file checklist. Edits for this collection: condensed to high-signal rules, dropped Next.js-specific items (RSC/`after()`), merged in view transitions, and added the React 19 section above. See the original for the full rule set and per-rule examples.

## Reference

- Original skill: `https://github.com/vercel-labs/agent-skills/tree/main/skills/react-best-practices`
- React docs: "You Might Not Need an Effect"; React 19 release notes (Actions, `use`, `useOptimistic`, ref-as-prop, Compiler).
