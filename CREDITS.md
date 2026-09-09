# Credits

Maintained by **Shreyam Adhikari** ("buggythegret") — [shreyam1008.com.np](https://shreyam1008.com.np).

Most skills here are original syntheses written from primary sources (MDN, web.dev, official framework docs). A few are derived from or inspired by other people's excellent work — credited below. If your work is here and you'd like the wording changed, open an issue.

## Skills derived from / inspired by others

| Skill | Source | What we changed |
|---|---|---|
| `react-best-practices` | [`vercel-labs/agent-skills`](https://github.com/vercel-labs/agent-skills) — `react-best-practices` (MIT) | Distilled 70 rules into a single-file checklist; dropped Next.js-specific items; merged in view transitions; added a React 19 section. |
| `web-design-guidelines` | [`vercel-labs/agent-skills`](https://github.com/vercel-labs/agent-skills) — `web-design-guidelines` + [Web Interface Guidelines](https://github.com/vercel-labs/web-interface-guidelines) | Turned the fetch-at-runtime reviewer into a self-contained offline checklist (live fetch kept as an option). |
| `minimalism` | [`DietrichGebert/ponytail`](https://github.com/DietrichGebert/ponytail) (MIT) | Adapted the "ladder" + "when not to be lazy" framing; extended to cover prose verbosity, not just code. |
| `vgpu` | [`vercel-labs/vgpu`](https://github.com/vercel-labs/vgpu), its documentation, and upstream skill (MIT) | Version-aware documentation routing plus original guidance for visual direction, 3D, accessible application integration, and rendering verification. Not an official Vercel skill. |

## Format & method

- Skill structure (frontmatter, progressive disclosure, "pushy" descriptions, explain-*why*) follows [`anthropics/skills`](https://github.com/anthropics/skills) `skill-creator` guidance.
- `css` / `html` / `javascript` / `web-performance` cross-reference [`GoogleChrome/modern-web-guidance-src`](https://github.com/GoogleChrome/modern-web-guidance-src).
- `webgpu` and the rendering decision guidance are synthesized from the [GPU for the Web specifications](https://github.com/gpuweb/gpuweb), [Khronos WebGL](https://github.com/KhronosGroup/WebGL), and the [WICG HTML-in-Canvas proposal](https://github.com/WICG/html-in-canvas). HTML-in-Canvas remains explicitly experimental.

## Primary references used across skills

- **MDN Web Docs**, **web.dev** / **Chrome for Developers** (Google).
- **OWASP** Cheat Sheet Series (security).
- **TanStack** docs + TkDodo's "Practical React Query".
- **React** docs & v19 release notes.
- **Workbox** (service workers); HTTP caching writing by Jono Alderson.
- **Material Design 3**, Google **HEART**, "Refactoring UI" (design-language).
- Three.js / R3F / drei docs; WebGL2 Fundamentals; the Rust & WebAssembly book.

## Discovery

Reference collections browsed while curating: `VoltAgent/awesome-agent-skills`, `obra/superpowers`, `hesreallyhim/awesome-claude-code`.

Each skill also lists its own sources in its `## Reference` section.
Pinned revisions for fast-moving web-platform sources are recorded in [`docs/source-baselines.json`](docs/source-baselines.json). A pin records what was reviewed; it does not imply that the upstream project stopped changing.
