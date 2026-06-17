# shre-skills

Curated **agent skills** for modern web dev — HTML/CSS/JS, React + TanStack, performance, caching, security, and GPU/WASM rendering. One place for my team and me to pull battle-tested guidance instead of re-searching.

By [Shreyam Adhikari](https://shreyam1008.com.np) ("buggythegret"). **Ever-evolving — refreshed ~monthly** as the web moves. Portable Markdown in `.agents/skills/`, read by Cascade/Windsurf, Claude Code, Codex, Devin. Each skill is short, opinionated, and ends with a `## Reference`.

## Skills (19)

| Skill | For |
|---|---|
| [`minimalism`](skills/minimalism/SKILL.md) | Write less code *and* less prose; kill over-engineering. |
| [`code-quality`](skills/code-quality/SKILL.md) | Conventions, types, tests, handoff — any language. |
| [`html`](skills/html/SKILL.md) | Semantic markup, forms, a11y, metadata. |
| [`css`](skills/css/SKILL.md) | Grid/flex, container queries, `:has()`/`@scope`, tokens. |
| [`javascript`](skills/javascript/SKILL.md) | Modern JS/TS: async, immutability, footguns. |
| [`git`](skills/git/SKILL.md) | Commits, branching, rebase/merge, recovery. |
| [`react-best-practices`](skills/react-best-practices/SKILL.md) | React data/render/state/bundle; React 19 APIs. |
| [`react-rendering-performance`](skills/react-rendering-performance/SKILL.md) | Jank, slow lists, re-render diagnosis. |
| [`tanstack`](skills/tanstack/SKILL.md) | Query/Router/Table/Form/Start; no `useEffect` fetching. |
| [`web-performance`](skills/web-performance/SKILL.md) | Core Web Vitals, 60fps, scheduling, load speed. |
| [`caching`](skills/caching/SKILL.md) | Cache-Control/CDN/browser/SW/query, invalidation. |
| [`service-worker`](skills/service-worker/SKILL.md) | PWA, offline, caching strategies, updates. |
| [`security`](skills/security/SKILL.md) | Validation, encoding, auth, secrets, XSS/CSRF/injection. |
| [`react-three-fiber`](skills/react-three-fiber/SKILL.md) | 3D with `@react-three/fiber` + `drei`. |
| [`webgl`](skills/webgl/SKILL.md) | Raw WebGL/GPU, shaders, draw-call budgets. |
| [`wasm-rust`](skills/wasm-rust/SKILL.md) | Hot paths to Rust + WebAssembly. |
| [`low-level-web-rendering`](skills/low-level-web-rendering/SKILL.md) | Canvas 2D, OffscreenCanvas, DPR, render pipeline. |
| [`design-language`](skills/design-language/SKILL.md) | Tokens, color/type/spacing/motion systems. |
| [`web-design-guidelines`](skills/web-design-guidelines/SKILL.md) | UI "rules": placement, contrast, a11y, UX states. |

## Install

Skills go in your project's `.agents/skills/` — just copy a folder, no build step.

```bash
# Skills CLI — installs from GitHub, no npm publish needed
npx skills add shreyam1008/shre-skills            # all
npx skills add shreyam1008/shre-skills@webgl      # one

# or the script (clone this repo first)
./install.sh                      # all → ./.agents/skills
./install.sh webgl ~/code/my-app  # one → target project

# or by hand
cp -R skills/webgl my-app/.agents/skills/
```

Agents auto-load a skill when the task matches its `description`, or summon it by name (`@webgl` in Cascade).

## Notes

- **Structure:** `skills/<name>/SKILL.md` — frontmatter (`name` + `description`) then guidance. Only the description loads until the skill triggers (progressive disclosure).
- **Credits:** see [CREDITS.md](CREDITS.md). A few skills are derived from others (Vercel; `minimalism` from ponytail) and say so in an Attribution note; the rest are original syntheses from primary docs.
- **Roadmap:** `webgpu`, `shaders-glsl`, `web-animations`, `accessibility-audit`, `testing`.

MIT — see [LICENSE](LICENSE).
