# HTML-in-Canvas skill scope and source review

## Ownership decision

Add `html-in-canvas` for implementing live DOM in a canvas. It spans 2D, WebGL,
and WebGPU and has its own lifecycle and interaction contract. Keep
`low-level-web-rendering` as the architecture router, `html` for semantics, and
the existing GPU skills for their pipelines. Do not create another general
modern-web skill or vendor Google's feature library.

The entry point owns support/fallback, drawable boundaries, paint ordering,
geometry, and verification. An optional reference holds context-specific
allocation, upload, sizing, and worker notes. The public catalog category is
Graphics; installation and one-off prompts use the existing distribution paths.

## Evidence and limits

- Reviewed Chrome's [overview](https://developer.chrome.com/docs/web-platform/html-in-canvas), [concepts](https://developer.chrome.com/docs/web-platform/html-in-canvas/concepts), and [2D](https://developer.chrome.com/docs/web-platform/html-in-canvas/2d), [WebGL](https://developer.chrome.com/docs/web-platform/html-in-canvas/webgl), and [WebGPU](https://developer.chrome.com/docs/web-platform/html-in-canvas/webgpu) guides. The pages use current `content="drawable"` and texture API names and identify Chrome 157 support.
- [Chrome Status](https://chromestatus.com/release-notes/157) still labels 157 Beta and schedules full Stable for 3 November 2026. WICG's pinned explainer still says flag-enabled. Record those limits rather than claiming universal stable availability or carrying forward the September lab-only restriction.
- Reviewed the WICG explainer and Chrome demo/awesome list at the revisions in [source-baselines.json](source-baselines.json). The list distinguishes community demos from the Chrome team's own examples; neither establishes target-device behavior.
- Reviewed the pinned Modern Web Guidance HTML media-export guide. It still contains contradictory support statements and snapshot sizing based on `ElementImage.width/height`. Prefer the newer Chrome context guides' `getElementImageDefaultSize()`; the existing broader Modern Web Guidance corpus pin is unchanged.
- The supplied [video](https://www.youtube.com/watch?v=mB0eWkWubuk) could not be fetched for direct review. No transcript or video-specific claim is used as technical evidence.

This is an instruction/catalog update, not an application integration. Repository
checks verify metadata, packaging, installation, links, generated catalog output,
and existing executable examples. They do not establish HTML-in-Canvas behavior
on Windows/Linux GPU drivers, a browser rollout, or any engine adapter. Those
remain implementation-time checks explicitly required by the skill.
