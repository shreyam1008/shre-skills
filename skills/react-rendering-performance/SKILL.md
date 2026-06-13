---
name: react-rendering-performance
description: Diagnose and fix React rendering performance — dropped frames, jank, slow lists, expensive re-renders, and slow interactions. Use when a React UI feels slow or profiling shows long renders.
---

# React Rendering Performance

A focused playbook for making React UIs feel instant. Measure first, then fix the dominant cost.

## Measure before you optimize

- Use **React DevTools Profiler**: record an interaction, find components that render often or render long.
- Use the browser **Performance** panel: look for long tasks (>50ms), layout thrashing, and scripting spikes.
- Turn on "Highlight updates" in React DevTools to see what re-renders on each interaction.
- Don't memoize blindly — confirm the cost is real first.

## The three causes of slow React

1. **Rendering too often** — a parent re-renders, cascading to children.
2. **Rendering too much** — large trees / long lists rendered at once.
3. **Each render does too much work** — heavy computation or allocation in render.

## Fix: render less often

- Lift state down, not up — keep fast-changing state in the smallest component.
- Split components so a frequently-changing piece doesn't re-render static siblings.
- Pass stable references: wrap callbacks in `useCallback`, derive memoized objects with `useMemo`, only when they feed memoized children.
- `React.memo` a child whose props are stable but whose parent re-renders often.
- If the **React Compiler** (React 19+) is enabled, it auto-memoizes — stop hand-writing most `useMemo`/`useCallback`/`memo` and let it work; reserve manual memoization for cases it can't see.
- Prefer uncontrolled inputs or refs for high-frequency values (mouse, scroll, text typing) when you don't need each keystroke in state.

```tsx
// transient value via ref — no re-render per move
const xRef = useRef(0);
const onMove = (e: React.PointerEvent) => { xRef.current = e.clientX; };
```

## Fix: render less

- **Virtualize** long lists/tables (`@tanstack/react-virtual`, `react-window`). Never render 10k rows.
- Paginate or windowed-load large datasets.
- Defer offscreen/below-the-fold work; mount on intersection.
- Use `content-visibility: auto` in CSS for long static sections.

## Fix: cheaper renders

- Move heavy computation out of render — `useMemo`, web worker, or precompute.
- Don't allocate new arrays/objects/functions in render paths that feed memoized children.
- Keep keys stable and unique; never use array index as key for reorderable lists.

## Keep interactions responsive (concurrent React)

- Wrap non-urgent updates in `startTransition` / `useTransition` so typing/clicking stays smooth.
- Use `useDeferredValue` to let an expensive view lag behind a fast input.

```tsx
const [isPending, startTransition] = useTransition();
const onChange = (q: string) => {
  setQuery(q);                       // urgent: input value
  startTransition(() => setResults(filter(q))); // non-urgent: heavy filter
};
```

## Avoid layout thrash

- Batch DOM reads then writes; don't interleave (`offsetWidth` then style then `offsetWidth`).
- Animate `transform`/`opacity`, not `top`/`left`/`width`/`height`.
- Use `requestAnimationFrame` for visual updates, never `setInterval`.

## Mount/unmount cost

- Avoid mounting/unmounting large subtrees repeatedly; toggle visibility or use transitions.
- Lazy-load heavy routes/components with `React.lazy` + `Suspense`.

## Quick triage checklist

- [ ] Profiled and identified the dominant cost?
- [ ] Long list virtualized?
- [ ] Fast-changing state isolated / kept in a ref?
- [ ] Heavy filter/sort wrapped in a transition or memoized?
- [ ] Animations on transform/opacity only?
- [ ] No new object/array/fn allocations feeding memoized children?

## Reference

- React docs: `useTransition`, `useDeferredValue`, `useMemo`, `memo`.
- web.dev: "Optimize long tasks", "Rendering performance".
