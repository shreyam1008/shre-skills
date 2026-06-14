---
name: web-performance
description: Make web apps load fast and run at a smooth 60fps. Use for Core Web Vitals (LCP/INP/CLS), frame-budget/jank work, main-thread scheduling, loading optimization, and game-dev-grade rendering loops. Use whenever a page feels slow, janky, or fails a Lighthouse/Vitals check.
---

# Web Performance (60fps)

Two distinct problems: **load fast** (get to interactive quickly) and **stay smooth** (never miss a frame). Measure first — optimize the dominant cost, not what's easy. The platform is fast; jank is almost always self-inflicted by main-thread work.

## Core Web Vitals (the targets)

- **LCP** (Largest Contentful Paint) ≤ 2.5s — largest element visible. Fix: optimize the hero image/font, preconnect, reduce render-blocking CSS/JS, server response time.
- **INP** (Interaction to Next Paint) ≤ 200ms — responsiveness. Fix: break up long tasks, yield to the main thread, defer non-urgent work.
- **CLS** (Cumulative Layout Shift) ≤ 0.1 — visual stability. Fix: set `width`/`height`/`aspect-ratio` on media, reserve space for dynamic content, preload fonts.

## The frame budget

At 60fps you have **~16.7ms per frame** (and ~8ms at 120Hz). Everything — JS, style, layout, paint, composite — must fit. Miss it and the frame drops → visible jank.

```
JS → Style → Layout → Paint → Composite
            (skip layout+paint by animating transform/opacity)
```

## Load fast

- Ship less JS: code-split by route, lazy-load below-the-fold and heavy libs, tree-shake, audit the bundle.
- Don't block the critical path: `defer`/`module` scripts, inline critical CSS, lazy non-critical CSS.
- Prioritize the LCP resource: `fetchpriority="high"`, `preload` the hero/font, `preconnect` to required origins.
- Images: right-sized, modern formats (AVIF/WebP), `srcset`/`<picture>`, `loading="lazy"` off-screen.
- Fonts: `font-display: swap`, preload, subset; avoid layout shift from late fonts.
- Stream/SSR where possible so first paint has content.

## Stay smooth (60fps)

- **Animate only `transform`/`opacity`** — they skip layout & paint (GPU composite). Never animate width/top/left in a loop.
- Drive visual updates with **`requestAnimationFrame`**, never `setInterval`/`setTimeout`. Use the rAF timestamp / a fixed timestep; don't assume 60Hz.
- **Avoid layout thrash**: batch DOM reads, then writes. Reading `offsetWidth`/`getBoundingClientRect` after a write forces synchronous layout.
- Keep per-frame work tiny and allocation-free (no `new`/array creation in the loop) to avoid GC pauses — this is the "cracked game dev" discipline: object pools, typed arrays, reuse.

## Don't block the main thread (this is what INP measures)

- Break long tasks (>50ms) into chunks; **yield** between them:
  - `await scheduler.yield()` (where supported), or `await new Promise(r => setTimeout(r))`.
  - `scheduler.postTask()` with priorities; `requestIdleCallback` for truly idle work.
- Move heavy compute to a **Web Worker** (parsing, image/audio, physics, search indexing). Use `OffscreenCanvas` to render in a worker.
- For near-native hot loops, push to **WebAssembly** (see `wasm-rust`); for thousands of objects/3D, use the GPU (see `webgl` / `react-three-fiber`).
- Debounce/throttle scroll/resize/pointer handlers; use passive event listeners.

## Game-loop pattern

```js
let last = performance.now();
function loop(now) {
  const dt = (now - last) / 1000; // seconds; use dt for motion
  last = now;
  update(dt);   // simulate (fixed-step if physics-sensitive)
  render();     // mutate transforms / draw to canvas
  requestAnimationFrame(loop);
}
requestAnimationFrame(loop);
```

## Measure (don't guess)

- **Lighthouse** / PageSpeed for load + Vitals lab scores.
- **Performance panel**: record an interaction, find long tasks, forced reflows, dropped frames; check the FPS/GPU track.
- **web-vitals** library for real-user (field) INP/LCP/CLS.
- DevTools Performance Monitor for live CPU/DOM/listener counts.

## Triage checklist

- [ ] Measured; dominant cost identified (load vs runtime).
- [ ] LCP resource preloaded/prioritized; render-blocking JS/CSS minimized.
- [ ] Animations on transform/opacity; updates via rAF.
- [ ] No layout thrash (reads batched before writes).
- [ ] Long tasks split/yielded; heavy compute in a worker/WASM.
- [ ] Media sized to prevent CLS.

## Reference

- web.dev: Core Web Vitals, "Optimize long tasks", "Rendering performance", RAIL.
- `GoogleChrome/modern-web-guidance` (performance guides); Addy Osmani's web performance writing.
- MDN: `requestAnimationFrame`, `OffscreenCanvas`, Performance API.
- Chrome for Developers: `scheduler.postTask`/`scheduler.yield`, Web Workers.
