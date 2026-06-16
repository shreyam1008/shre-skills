---
name: webgl
description: Raw WebGL / GPU rendering guidance — context setup, shaders, buffers, draw-call budgets, state management, and performance. Use when writing WebGL directly or debugging GPU rendering and frame cost.
---

# WebGL

Low-level GPU rendering in the browser. The mental model: minimize state changes and draw calls, move work to the GPU, and never block the main thread.

## Context setup

```js
const gl = canvas.getContext('webgl2', {
  alpha: false,              // skip compositing transparency if unneeded
  antialias: true,
  powerPreference: 'high-performance', // request discrete GPU
  desynchronized: true,      // lower-latency present where supported
  preserveDrawingBuffer: false, // true is slow; only for readback/screenshots
});
```

- Prefer **WebGL2** (instancing, VAOs, MRT, 3D textures are core). Fall back to WebGL1 only if you must.
- Handle context loss: listen for `webglcontextlost` / `webglcontextrestored` and recreate resources.

## Confirm which GPU you actually got

```js
const ext = gl.getExtension('WEBGL_debug_renderer_info');
console.log(gl.getParameter(ext.UNMASKED_RENDERER_WEBGL));
```

If this reports the integrated GPU when you wanted the discrete one, the `powerPreference` hint was ignored — check OS/browser GPU settings.

## DPR & viewport

```js
const dpr = Math.min(window.devicePixelRatio, 2); // clamp; full DPR is costly
canvas.width  = Math.floor(canvas.clientWidth  * dpr);
canvas.height = Math.floor(canvas.clientHeight * dpr);
gl.viewport(0, 0, canvas.width, canvas.height);
```

## The cost model (what to minimize, in order)

1. **Draw calls** — batch geometry, use instancing, sort by material to avoid redundant binds.
2. **State changes** — `useProgram`, `bindTexture`, `bindBuffer`, enabling/disabling are not free. Group draws that share state.
3. **Fragment shader work** — overdraw and expensive per-pixel math. Cull, depth-sort opaque front-to-back, avoid huge `discard` usage.
4. **Bandwidth** — texture size/format. Use mipmaps and compressed textures.

## Geometry & buffers

- Upload geometry once into VBOs; use **VAOs** to capture attribute state and rebind in one call.
- Use **indexed** drawing (`drawElements`) with element buffers.
- Use `gl.drawArraysInstanced` / `drawElementsInstanced` for repeated objects (one call, N copies).
- Set buffer usage hints correctly: `STATIC_DRAW` for immutable, `DYNAMIC_DRAW` for frequently updated.

## Shaders

- Compile/link programs once at init, never per frame. Cache uniform locations.
- Prefer `mediump` precision in fragment shaders unless you need `highp`.
- Minimize branching and dependent texture reads; avoid `discard` where possible (it defeats early-Z).
- Move constant math to the vertex shader or to the CPU as uniforms.

## Textures

- Power-of-two enables full mipmap/wrap support in WebGL1; WebGL2 relaxes this but mipmaps still help.
- Generate mipmaps for anything minified; set sensible min/mag filters.
- Use compressed formats (`WEBGL_compressed_texture_*`, KTX2/Basis) to cut VRAM and bandwidth.
- Use texture atlases to reduce binds and enable batching.

## The render loop

```js
function frame(t) {
  // update (use real delta time)
  // clear only what you need
  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
  // draw, grouped by program/material
  requestAnimationFrame(frame);
}
requestAnimationFrame(frame);
```

- Always drive with `requestAnimationFrame`. Skip rendering entirely when nothing changed (on-demand).
- Avoid synchronous GPU→CPU reads (`readPixels`, `getError` in hot paths) — they stall the pipeline.
- Offload heavy CPU prep to a worker; consider `OffscreenCanvas` for worker-side rendering.

## Debug & profile

- `gl.getError()` only while debugging (it forces a flush) — strip from hot paths.
- Use the browser's WebGL/Spector.js inspector to count draw calls and inspect state.
- Watch for: too many programs bound per frame, per-frame buffer reallocation, uncompressed large textures.

## When to step up

- Need compute, storage buffers, or modern GPU features → consider **WebGPU**.
- Building a full scene graph → use Three.js / React Three Fiber instead of hand-rolling (see the `react-three-fiber` skill).

## Reference

- MDN WebGL API; WebGL2 Fundamentals (webgl2fundamentals.org).
- Khronos WebGL best practices.
