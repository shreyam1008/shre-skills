# Context implementation notes

Read only the section for the selected renderer, alongside its current official guide. The following calls illustrate integration points, not complete application setup. Keep the working DOM path until initialization succeeds and restore it on failure.

## Canvas 2D

Use the [2D guide](https://developer.chrome.com/docs/web-platform/html-in-canvas/2d).

- Acquire the context and feature-check `ctx.drawElementImage` before activating the enhanced layout.
- Inside `paint`, clear/rebuild the needed frame and draw the drawable element. Initial drawing before a snapshot exists can throw.
- By default the drawing operation synchronizes geometry using its destination and current 2D transform. If preserving geometry explicitly, own its updates yourself.
- Set a CSS display size and size the backing store from a `ResizeObserver`, using `devicePixelContentBoxSize` when available, otherwise measured CSS dimensions and DPR. Update dimensions only when changed; a resize clears pixels and resets context state.
- Drawing destinations are canvas grid pixels; source crop coordinates and DOM measurements are CSS pixels. Derive horizontal/vertical scale from the actual backing-store-to-CSS-size ratios and apply each conversion once. Clamped render resolution changes those ratios.
- For image/video export, wait for the required content and its paint before `toBlob()` or `captureStream()`. Treat export as a separate requirement with its own unsupported-browser behavior.

## WebGL

Use the [WebGL guide](https://developer.chrome.com/docs/web-platform/html-in-canvas/webgl).

Feature-check `gl.texElementSubImage2D`. Bind a texture and reserve storage before upload; get its dimensions during `paint` with `canvas.getElementImageDefaultSize(element)`, round up, and reject zero/oversized dimensions. Allocate again when size changes, not on each paint. Set appropriate filtering/wrapping; a level-zero-only texture needs a non-mipmap minification filter unless mipmaps are generated.

Inside `paint`, after allocating compatible storage:

```js
gl.bindTexture(gl.TEXTURE_2D, texture);
gl.texElementSubImage2D(gl.TEXTURE_2D, 0, 0, 0, element, { width, height });
```

Here `width` and `height` are the allocated texture dimensions. Draw the scene using that texture, then synchronize the DOM geometry to the rendered surface. Reuse unchanged pixels when only the camera moves, while updating geometry. On context restoration recreate resources and schedule an upload; release old resources on teardown.

## WebGPU

Use the [WebGPU guide](https://developer.chrome.com/docs/web-platform/html-in-canvas/webgpu).

Secure-context WebGPU availability, adapter/device creation, and HTML-in-Canvas support are separate gates. Check the actual queue's `drawElementImageToTexture` method. Size the texture from `canvas.getElementImageDefaultSize(element)` during `paint`, round up, and check device limits before allocation. Use `rgba8unorm` with the usages needed for this sampled upload path:

```js
const texture = device.createTexture({
  size: { width, height },
  format: 'rgba8unorm',
  usage: GPUTextureUsage.TEXTURE_BINDING |
    GPUTextureUsage.COPY_DST |
    GPUTextureUsage.RENDER_ATTACHMENT,
});
```

Upload inside `paint`, then draw the scene and update its DOM geometry:

```js
device.queue.drawElementImageToTexture(
  { source: element },
  { texture, size: { width, height } },
);
```

Pass explicit upload size for the selected resolution. Resize by recreating the texture and rebuilding dependent bindings; destroy superseded resources. Inspect WebGPU validation errors as well as JavaScript failures. Recover from device loss or restore the usable DOM path.

## Snapshots and workers

When off-main-thread drawing is needed, check `captureElementImage` and the chosen worker/context methods separately. Capture during `paint`, transfer the resulting `ElementImage` to the renderer, and release snapshots after consumption. Bound outstanding snapshots so a slow worker cannot accumulate memory. DOM state/layout/input remain on the main thread. Coordinate backing-store resize and returned geometry updates with it; offscreen rendering does not make the DOM worker-owned. See the [WICG worker example](https://github.com/WICG/html-in-canvas#offscreencanvas-example).
