---
name: low-level-web-rendering
description: How the browser turns markup into pixels, plus Canvas 2D / OffscreenCanvas rendering. Use for the render pipeline (style, layout, paint, composite), DOM-vs-canvas decisions, DPR scaling, and canvas performance.
---

# Low-Level Web Rendering

Understand how pixels actually get on screen, then pick the right tool: DOM, Canvas 2D, or GPU (WebGL/WebGPU).

## The browser render pipeline

Each frame the browser may run, in order:

1. **JS** — your handlers/animations mutate the DOM/styles.
2. **Style** — compute which CSS rules apply (recalc styles).
3. **Layout (reflow)** — compute geometry/positions. Triggered by size/position/text changes.
4. **Paint** — fill pixels for each layer (text, colors, images, borders).
5. **Composite** — the GPU assembles layers into the final image.

Cheapest path: change only **composite** (transform/opacity). Most expensive: trigger **layout** every frame.

```css
/* GPU-composited, skips layout & paint */
.move { transform: translateX(100px); will-change: transform; }
/* AVOID animating these — they relayout/repaint */
.bad  { left: 100px; width: 50%; }
```

## Avoid layout thrashing

Interleaving reads and writes forces synchronous layout ("forced reflow"):

```js
// BAD: read, write, read, write -> multiple forced layouts
el.style.height = el.offsetHeight + 10 + 'px';
// GOOD: batch reads, then batch writes
const h = el.offsetHeight;          // read phase
el.style.height = h + 10 + 'px';    // write phase
```

Layout-triggering reads include `offsetTop/Width/Height`, `getBoundingClientRect()`, `scrollTop`, `getComputedStyle()`.

## DOM vs Canvas vs GPU — choosing

- **DOM/CSS**: accessible, text, forms, modest interactivity. Let the browser optimize. Default choice.
- **Canvas 2D**: many custom shapes, charts, freeform drawing, games where DOM nodes would explode. No built-in accessibility — add ARIA/fallbacks.
- **WebGL/WebGPU**: thousands of objects, 3D, shaders, heavy effects. See `webgl` / `react-three-fiber` skills.

Rough guide: hundreds of dynamic visual elements → consider canvas; thousands or 3D/shaders → GPU.

## Canvas 2D setup with correct DPR

Canvas looks blurry on HiDPI unless you scale the backing store:

```js
const dpr = window.devicePixelRatio || 1;
const rect = canvas.getBoundingClientRect();
canvas.width  = Math.round(rect.width  * dpr);  // backing store px
canvas.height = Math.round(rect.height * dpr);
canvas.style.width  = `${rect.width}px`;         // CSS px
canvas.style.height = `${rect.height}px`;
const ctx = canvas.getContext('2d', { alpha: false }); // opaque = faster
ctx.scale(dpr, dpr);                              // draw in CSS px units
```

## Canvas 2D performance rules

- **Render only differences** — clear/redraw dirty regions, not the whole canvas, when feasible.
- **Layer canvases**: static background, dynamic gameplay, rarely-changing UI on separate stacked `<canvas>` elements. Redraw only the layer that changed.
- **Pre-render** repeated sprites/primitives to an offscreen canvas once, then `drawImage` them.
- **Integer coordinates** — `Math.floor` positions to avoid sub-pixel anti-aliasing cost.
- **Don't scale in `drawImage`** every frame — cache pre-scaled sizes.
- **Batch path ops** (one `stroke()` for a polyline, not many) and minimize `ctx` state changes.
- Avoid `shadowBlur` and excessive text rendering in hot loops.
- Use a static CSS/`<img>` background instead of redrawing it each tick.
- Drive animation with `requestAnimationFrame`, never `setInterval`.

## OffscreenCanvas + Web Workers

Move rendering off the main thread (great past ~1000 dynamic objects/frame):

```js
// main thread
const offscreen = canvas.transferControlToOffscreen();
worker.postMessage({ canvas: offscreen }, [offscreen]);
// worker: getContext('2d' | 'webgl2') on the transferred canvas, render in the worker
```

Keeps scrolling/input smooth while heavy drawing runs in the worker. (Safari support landed in iOS 16.4.)

## Scaling tricks

- Prefer CSS `transform: scale()` (GPU) over redrawing at a new resolution.
- Better to draw a smaller canvas and scale **up** than a big canvas scaled down.

## Reference

- MDN: "Optimizing canvas", "Canvas API".
- web.dev: "OffscreenCanvas", "Rendering performance", "Avoid large, complex layouts and layout thrashing".
