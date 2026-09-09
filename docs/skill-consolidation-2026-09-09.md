# Skill consolidation — 9 September 2026

The active library was reduced from 22 to 19 skills. The audit compared task ownership, trigger descriptions, duplicated rules, useful examples, and installation behavior. Related technologies were not merged merely because they share vocabulary.

## Authoring basis

The [OpenAI skill guide](https://learn.chatgpt.com/docs/build-skills) recommends focused tasks, explicit descriptions, concise instructions, and checking realistic trigger prompts. [Claude's authoring guidance](https://platform.claude.com/docs/en/agents-and-tools/agent-skills/best-practices) similarly emphasizes concise instructions, specific discovery metadata, progressive disclosure, and evaluation. These principles informed the decisions below; they do not certify the library or guarantee a model will select a particular skill.

## Merges

| Retired entry | Surviving skill | Reason and retained material |
|---|---|---|
| `minimalism` | `code-quality` | Both reviewed complexity and abstractions. Keep evidence-based simplification and correctness in one review workflow. Remove global prose-style demands and the assumption that fewer lines are always better. Ponytail attribution remains. |
| `react-rendering-performance` | `react-best-practices` | Both covered state, effects, memoization, transitions, and render cost. Keep component correctness in the entry point; load `references/rendering-performance.md` for profiler-driven investigations. |
| `design-language` | `web-design-guidelines` | Both covered hierarchy, tokens, typography, themes, spacing, and motion. Keep interface review and creation together; load `references/design-system.md` for shared visual systems. |

Descriptions for every remaining skill now identify its concrete workload and boundaries. Generic review guidance is not presented as a mandatory checklist for every small edit. TanStack guidance preserves justified effect integrations, virtualizing lists depends on measured cost, R3F no longer invents a universal draw-call ceiling, and performance diagnosis preserves an existing renderer unless evidence supports changing it.

At baseline commit `2ecb6a2`, the 22 entry points contained 16,090 whitespace-separated words. The 19 revised entry points contain 13,859, a reduction of 2,231 (13.9%). These counts include frontmatter and code examples; they are not token counts. Two optional reference documents retain detailed material outside the default entry points.

## Boundaries retained and manually reviewed routing cases

The following are manual checks against the descriptions and content, and reusable prompts for future agent evaluations. They are not executions or benchmarks of Codex or Claude skill selection. A task can legitimately need more than one skill; the table identifies its primary owner.

| Example request | Primary owner | Boundary |
|---|---|---|
| Review this module and remove unnecessary abstractions. | `code-quality` | Requested review/refactor; does not mandate unrelated edits. |
| Repair this form's labels and native input semantics. | `html` | Markup and native controls. |
| Fix this container-query layout at narrow widths. | `css` | Stylesheet implementation, not a whole visual-system redesign. |
| Fix this promise race and event-listener cleanup. | `javascript` | JavaScript/TypeScript runtime behavior. |
| Resolve this merge while preserving both changes. | `git` | Repository history and operations. |
| Diagnose this React screen's repeated slow renders. | `react-best-practices` | Load its profiling reference; browser/network costs can involve `web-performance`. |
| Repair a TanStack Query optimistic mutation. | `tanstack` | Selected library APIs; no automatic introduction of TanStack. |
| Improve LCP and investigate this long browser task. | `web-performance` | Page loading and browser execution. |
| Design CDN freshness and invalidation for these responses. | `caching` | Cache ownership, freshness, invalidation across layers. |
| Fix this service worker's update and offline fallback. | `service-worker` | Worker registration, lifecycle, events, and offline behavior. |
| Review this endpoint's authorization and output encoding. | `security` | Trust boundaries and concrete threats. |
| Optimize this existing React Three Fiber scene. | `react-three-fiber` | R3F/drei scene and frame-loop APIs. |
| Debug this raw WebGL shader and framebuffer. | `webgl` | WebGL state and GLSL contracts. |
| Repair this WebGPU compute pipeline and WGSL layout. | `webgpu` | Raw browser WebGPU and WGSL. |
| Add a material effect using the installed Vercel vgpu package. | `vgpu` | Version-aware vgpu APIs; do not substitute unrelated GPU abstractions. |
| Move this measured numeric kernel to Rust/WASM. | `wasm-rust` | CPU computation, memory, and JavaScript interop. |
| Choose between SVG, Canvas, and GPU for a diagram editor. | `low-level-web-rendering` | Architecture selection; implementation belongs to the selected renderer's skill. |
| Review this interface and make its themes consistent. | `web-design-guidelines` | Load the design-system reference when shared tokens/themes are in scope. |
| Secure the bridge between WinUI and embedded web content. | `webview2-winui` | Windows host, virtual origins, and messaging. |

Negative checks: changing one label does not require a broad code review; a generic React task does not introduce TanStack; a CSS task does not introduce vgpu; an R3F scene does not require rewriting it in raw WebGPU. Graphics implementations share performance concerns but have distinct resource, shader, and lifecycle contracts. HTTP caching and service-worker execution also remain distinct jobs.

## Migration and discovery

- `skill-migrations.tsv` is the shared mapping for the bundled installer and generated site.
- `install.sh <retired-name>` installs the canonical replacement. Existing retired folders are preserved and reported so users can review local modifications before removing or disabling them.
- The external Skills CLI lists the 19 active names. It does not discover retired aliases; use the replacement names documented in the README.
- Published retired `/skills/<name>/SKILL.md` URLs receive permanent redirects. Homepage anchors map to the new cards, and search accepts the old names.
- Installation and publishing copy entire skill folders so relative reference links resolve. No duplicate stub skills remain to compete during discovery.
- Static catalog content, category counts, JSON-LD, `skills.json`, and `llms.txt` derive from the same active library. Attribution and pinned source mappings follow the merged names.

## Validation

All 19 skill folders passed the skill-creator format validator. Repository validation and the static build passed. All 11 automated tests passed, including complete reference copying, old-name installation, preservation of customized retired copies, website redirects, catalog consistency, installer path protections, and executable examples.

Local browser checks verified a retired React anchor resolves to the surviving card, searching `minimalism` shows `code-quality`, and selecting npx updates all 20 install commands. These checks establish format, packaging, and browser behavior; they do not measure improvement in model task completion. Earlier platform-source research remains recorded in the rendering review and source baselines.
