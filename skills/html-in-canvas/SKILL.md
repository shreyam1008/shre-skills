---
name: html-in-canvas
description: "Implements or debugs live HTML drawn inside Canvas 2D, WebGL, or WebGPU using HTML-in-Canvas. Use for drawable DOM, paint synchronization, HTML textures, and interaction geometry; ordinary HTML, static DOM screenshots, and renderer selection have separate workflows."
license: MIT
---

# HTML-in-Canvas

Keep real HTML controls and layout while drawing their appearance into a canvas. Use this for interactive scene panels, rich canvas labels, or shader effects on HTML. Ordinary pages should keep DOM/CSS unless this drawing capability serves the requested experience. HTML-in-Canvas does not remove DOM layout cost or automatically improve performance.

## Check support and the chosen stack

Read the [Chrome overview](https://developer.chrome.com/docs/web-platform/html-in-canvas) and the implementation guide for the selected context. Check the actual browser/runtime and installed engine version before adapting a demo. Three.js, PixiJS, PlayCanvas, and Babylon.js integrations differ; verify their current APIs and fallback behavior rather than treating an engine name as proof of support.

Review baseline: **26 October 2026**. Chrome's docs describe Chrome 157 support, but [Chrome Status](https://chromestatus.com/release-notes/157) still schedules full stable availability for 3 November. The WICG explainer retains trial/flag wording. These sources describe different stages; do not infer availability in every Chrome installation, other browser, or embedded WebView. Recheck status when implementing; normal users must not need development flags or trial enrollment.

Probe the current surface before moving usable HTML under a canvas:

```js
function supportsHtmlInCanvas(canvas) {
  return 'content' in canvas &&
    typeof canvas.requestPaint === 'function' &&
    typeof canvas.updateElementGeometry === 'function';
}
```

Also check the selected context and its drawing method from the table below. On the unsupported or initialization-failure path, keep the content visible as ordinary DOM outside the canvas, or use an existing DOM overlay. Preserve values, listeners, focus, and one semantic representation when moving content. Ordinary canvas fallback children alone stay invisible in browsers that support canvas but lack HTML-in-Canvas.

## Prepare and paint

1. Set `content="drawable"` on the canvas. Mark each independently drawn descendant with `drawable`; keep native labels, forms, buttons, and semantic structure.
2. A nested `drawable` subtree is excluded from its drawable ancestor's image. Draw each boundary separately, or leave nested content unmarked when it belongs in one image.
3. Register `paint` before calling `requestPaint()`. Draw or capture after the first snapshot is available. Put DOM mutations in event handlers or `requestAnimationFrame`; DOM changes inside `paint` are visible on a subsequent rendering update.
4. Use `event.changedElements` to identify fresh HTML snapshots and avoid unnecessary texture uploads. Request additional paints while scene motion needs them. When clearing a complete 2D frame, redraw all visible layers, including unchanged ones. Stop continuous work when idle or hidden.

| Context | Drawing entry point | Interaction geometry |
|---|---|---|
| Canvas 2D | `ctx.drawElementImage(element, x, y)` | Updated by default by drawing; custom handling must keep it aligned. |
| WebGL | `gl.texElementSubImage2D(...)` | Update explicitly after drawing the textured surface. |
| WebGPU | `device.queue.drawElementImageToTexture(...)` | Update explicitly after drawing the textured surface. |

For the selected path, read [context implementation notes](references/contexts.md). Check and use `canvas.getElementImageDefaultSize(element)` when snapshot dimensions are needed; do not mix older examples using `layoutsubtree`, `texElementImage2D()`, `copyElementImageToTexture()`, or `ElementImage.width/height` with the current API.

## Keep interaction aligned

For GPU paths, map the element's border box to its displayed surface with `canvas.updateElementGeometry(element, { canvasTransform })`. Use **CSS pixels** for this transform. Resynchronize as the camera, object, scroll, or layout changes, even when the HTML texture has not changed. A texture upload alone does not relocate click targets or accessibility bounds.

Use the geometry/clip options for the actual visible region and stacking order; clear stale geometry when an element stops being drawn. Also remove or hide unused views appropriately: clearing geometry alone does not remove their semantics. A single matrix cannot describe arbitrary shader deformation; retain an accessible DOM interaction path when the effect cannot keep inputs aligned.

Keep backing-store pixels separate from DOM coordinates. Observe size/DPR changes, avoid redundant canvas resets, and request a new paint after a programmatic buffer reset. Dispose observers, handlers, snapshots, and GPU resources on teardown.

## Verify the experience

- Confirm real pixels and input in the target browser without development flags; test the unsupported path and failed context/device initialization too.
- Test typing, selection, tab order, visible focus, labels, find-in-page, and accessibility bounds after movement and resize. Check reduced motion, text zoom, and relevant touch/IME behavior.
- Check texture resize, hidden/removed elements, context/device recovery, and cleanup. If embedded in a native app, test that actual runtime separately.
- Compare DOM layout, paint, upload cost, and frame time with the ordinary DOM path on representative hardware before claiming a performance improvement.

## Sources and task routing

- [Chrome technical concepts](https://developer.chrome.com/docs/web-platform/html-in-canvas/concepts) and [WICG explainer](https://github.com/WICG/html-in-canvas): lifecycle, geometry, and readback restrictions. This API does not bypass cross-origin or browser-private rendering rules.
- [Chrome team's demos](https://github.com/GoogleChromeLabs/css-web-ui-demos/tree/main/html-in-canvas) and [awesome list](https://github.com/GoogleChromeLabs/css-web-ui-demos/blob/main/html-in-canvas/awesome-html-in-canvas.md): implementation ideas; inspect source/version requirements. Community entries are not conformance or compatibility evidence.
- [Modern Web Guidance](https://developer.chrome.com/docs/modern-web-guidance): complementary feature guidance. Use its current HTML-in-Canvas material when available, resolving conflicts against current browser docs and observed APIs; installing it is not required for this skill.
- Renderer choice belongs to `low-level-web-rendering`; raw pipeline work belongs to `webgl` or `webgpu`. These companion skills are optional, not installation dependencies.
