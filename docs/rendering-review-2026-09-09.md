# Rendering references and vgpu skill

Reviewed on 9 September 2026.

## New skill

Added `vgpu` for Vercel's WebGPU library: shader effects, visual UI integration,
procedural materials, 3D depth and presentation passes, performance, and
verification. The existing `webgpu` skill remains the raw browser API guide;
`low-level-web-rendering` routes between renderers.

The npm registry's stable tag resolved to **0.4.1**; `next` resolved to
`0.4.0-rc.0`. The repository's canary branch was
`ca13ef1f456f4db4bf46391f769f3af4f88889ca`.
Stable bundled docs use different WGSL loader/type entry points from the
development branch. The skill therefore resolves the project's selected version
and reads its own documentation instead of combining current web examples with
an older installation. The stable package integrity is recorded in
`source-baselines.json`.

## Reference findings

| Source | Finding and action |
|---|---|
| GPU for the Web | Two changes since the previous pin: optional compressed-texture alignment support and WGSL swizzle indexing clarification. Updated the reviewed pin; existing feature/limit checks remain appropriate. |
| HTML-in-Canvas | Reviewed the current explainer and updated three skills. WebGL now uses `texElementSubImage2D`; WebGPU uses `GPUQueue.drawElementImageToTexture`. Added drawable snapshots, geometry synchronization, worker transfer, and paint-order caveats. |
| Chromium experiment | Rechecked the extension discussion: the recorded trial extends through M154. An experimental API remains distinct from ordinary WebGPU or vgpu rendering. |
| Khronos WebGL | Two pixel-local-storage conformance test changes. Updated the pin; no new general renderer requirements. |
| wasm-bindgen | Reviewed release 0.2.128 notes, including new OffscreenCanvas texture-upload overloads. Updated the pin and version-compatibility guidance. |
| WebCodecs | Reviewed four changes concerning shared audio input, RGB frame copying, decoder promises, and an editorial reference. Updated the pin; no change to renderer-selection guidance. |
| CSS Houdini | No upstream commit change since the previous pin. Reconfirmed the existing baseline. |
| Modern Web Guidance | Observed 33 upstream commits and reviewed relevant layout guidance. Added the warning against masking layout problems with clipping. Retained the broader corpus pin and recorded the newer observed revision separately. |
| MDN | Observed 208 upstream commits and inspected relevant Canvas documentation corrections. Retained the broader corpus pin; this was not a complete re-review of all MDN content. |
| W3C ARIA | Observed five editorial/formatting changes. Retained the existing semantic guidance baseline and recorded the newer observed revision. |

The per-source `reviewScope` / `checkScope` fields state what was checked.
Observed upstream heads do not mean every guide in a large repository was adopted.

## Validation

The stable vgpu CLI successfully served its documentation index, getting-started,
two-pass rendering, scene-tree, and bundler guides, plus shader-checker and
example-discovery help. These checks validate the skill's documentation routes;
they are not GPU render or performance benchmarks.

Repository validation, the static-site build, nine regression tests, and skill
frontmatter validation are run before publication. The generated human catalog,
JSON-LD, JSON index, llms.txt, and raw Markdown all derive from the same 22 skills.

## Sources

- [vgpu project and upstream skill](https://github.com/vercel-labs/vgpu)
- [Exact stable package metadata](https://registry.npmjs.org/vgpu/0.4.1)
- [HTML-in-Canvas explainer](https://github.com/WICG/html-in-canvas)
- [Chromium trial extension](https://groups.google.com/a/chromium.org/g/blink-dev/c/BpWbzJ9P22s)
- [Pinned sources and scoped checks](source-baselines.json)
