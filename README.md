<div align="center">

# shre-skills

Official source and install links: [shre-skills distribution tracker](https://shreyam1008.com.np/projects/#distribution-shre-skills). GitHub and the Skills CLI are the supported channels; OS app stores are not applicable.

Public catalog and release state are recorded in [`product.json`](product.json) and [`docs/distribution-log.md`](docs/distribution-log.md).

**Battle-tested agent skills for shipping fast, correct web apps.**

HTML/CSS/JS · React + TanStack · performance · caching · security · GPU/WASM rendering

[![skills](https://img.shields.io/badge/skills-22-6C5CE7?style=for-the-badge)](#-skills)
[![license](https://img.shields.io/badge/license-MIT-00B894?style=for-the-badge)](LICENSE)
[![sources](https://img.shields.io/badge/sources-pinned_primary-0984E3?style=for-the-badge)](docs/source-baselines.json)
[![by](https://img.shields.io/badge/by-buggythegret-FD79A8?style=for-the-badge)](https://shreyam1008.com.np)

[**Quick start**](#-quick-start) · [**Skills**](#-skills) · [**Install options**](#-install-options) · [**Credits**](CREDITS.md)

</div>

---

One place to pull consistent, opinionated guidance instead of re-searching every time. Portable Markdown installed to the paths supported by your coding agent through the Skills CLI. Each skill is a focused Markdown file with guidance and references. Maintained by [Shreyam Adhikari](https://shreyam1008.com.np) ("buggythegret"); moving web-platform sources are pinned in [`docs/source-baselines.json`](docs/source-baselines.json) and reviewed before refreshes.

Product site: [skills.shreyam1008.com.np](https://skills.shreyam1008.com.np/) — live on Cloudflare Pages, HTTPS verified 9 September 2026. Browse and search the catalog, read the source, or copy an install command.

## ⚡ Quick start

Run from your target project with Bun and Node.js installed. Select all skills, then choose your agent in the CLI. Prefer npm? Replace `bunx` with `npx` in any command:

```bash
bunx skills add shreyam1008/shre-skills --skill '*'
```

Want just one? Use `--skill <name>` from the table below:

```bash
bunx skills add shreyam1008/shre-skills --skill webgl
```

<details open>
<summary><b>📋 Copy all 22 one-liners</b></summary>

```bash
bunx skills add shreyam1008/shre-skills --skill minimalism
bunx skills add shreyam1008/shre-skills --skill code-quality
bunx skills add shreyam1008/shre-skills --skill html
bunx skills add shreyam1008/shre-skills --skill css
bunx skills add shreyam1008/shre-skills --skill javascript
bunx skills add shreyam1008/shre-skills --skill git
bunx skills add shreyam1008/shre-skills --skill react-best-practices
bunx skills add shreyam1008/shre-skills --skill react-rendering-performance
bunx skills add shreyam1008/shre-skills --skill tanstack
bunx skills add shreyam1008/shre-skills --skill web-performance
bunx skills add shreyam1008/shre-skills --skill caching
bunx skills add shreyam1008/shre-skills --skill service-worker
bunx skills add shreyam1008/shre-skills --skill security
bunx skills add shreyam1008/shre-skills --skill react-three-fiber
bunx skills add shreyam1008/shre-skills --skill webgl
bunx skills add shreyam1008/shre-skills --skill webgpu
bunx skills add shreyam1008/shre-skills --skill vgpu
bunx skills add shreyam1008/shre-skills --skill wasm-rust
bunx skills add shreyam1008/shre-skills --skill low-level-web-rendering
bunx skills add shreyam1008/shre-skills --skill design-language
bunx skills add shreyam1008/shre-skills --skill web-design-guidelines
bunx skills add shreyam1008/shre-skills --skill webview2-winui
```
</details>

## 🧩 Skills

> Agent-specific discovery and invocation depend on your client. Each skill provides a `name` and `description` so compatible agents can select it for matching tasks.

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
| [`tanstack`](skills/tanstack/SKILL.md) | Query/Router/Table/Form/Start; cache keys, mutations, and route data. |
| [`web-performance`](skills/web-performance/SKILL.md) | Core Web Vitals, adaptive frame budgets, scheduling, load speed. |
| [`caching`](skills/caching/SKILL.md) | Cache-Control/CDN/browser/SW/query, invalidation. |
| [`service-worker`](skills/service-worker/SKILL.md) | PWA, offline, caching strategies, updates. |
| [`security`](skills/security/SKILL.md) | Validation, encoding, auth, secrets, XSS/CSRF/injection. |
| [`react-three-fiber`](skills/react-three-fiber/SKILL.md) | 3D with `@react-three/fiber` + `drei`. |
| [`webgl`](skills/webgl/SKILL.md) | Raw WebGL/GPU, shaders, draw-call budgets. |
| [`webgpu`](skills/webgpu/SKILL.md) | Browser WebGPU/WGSL, compute, device loss, measured fallbacks. |
| [`vgpu`](skills/vgpu/SKILL.md) | Vercel vgpu: shader effects, procedural materials, 3D, visual UI, and version-aware docs. |
| [`wasm-rust`](skills/wasm-rust/SKILL.md) | Hot paths to Rust + WebAssembly. |
| [`low-level-web-rendering`](skills/low-level-web-rendering/SKILL.md) | Production router for DOM, SVG, Canvas, GPU, WASM, and rendering labs. |
| [`design-language`](skills/design-language/SKILL.md) | Tokens, color/type/spacing/motion systems. |
| [`web-design-guidelines`](skills/web-design-guidelines/SKILL.md) | UI "rules": placement, contrast, a11y, UX states. |
| [`webview2-winui`](skills/webview2-winui/SKILL.md) | WebView2 in WinUI 3: virtual host mapping, SPA integration, messaging. |

## 🛠️ Install options

Skills are Markdown files with no build step. The CLI selects the supported directory for your agent; the bundled Bash script copies into `.agents/skills/`.

```bash
# 1 · Skills CLI (recommended) — installs straight from GitHub
bunx skills add shreyam1008/shre-skills --skill '*' # all skills; choose agent
bunx skills add shreyam1008/shre-skills --skill webgl      # one

# 2 · Bundled script (clone this repo first)
./install.sh                      # all → ./.agents/skills
./install.sh webgl ~/code/my-app  # one → target project

# 3 · By hand
mkdir -p my-app/.agents/skills
cp -R skills/webgl my-app/.agents/skills/
```

To inspect the catalog before installing:

```bash
bunx skills add shreyam1008/shre-skills --list
```

To target one agent without affecting other clients, add `--agent <agent-name>`.
Add `--global` for a user-level install. Review the destination before confirming.
To refresh skills installed through the CLI, run `bunx skills update` and choose the scope.
The bundled script replaces the selected skill folder, including any local edits; back up customizations before rerunning it.
On Windows, run `install.sh` from Git Bash or WSL.

See the [Skills CLI documentation](https://github.com/vercel-labs/skills) for agent names and supported options.

## 📎 Notes

- **Structure:** `skills/<name>/SKILL.md` — frontmatter (`name` + `description`) then guidance. Only the description loads until the skill triggers (progressive disclosure).
- **Source baselines:** [`docs/source-baselines.json`](docs/source-baselines.json) records the primary-source revision used for fast-moving platform guidance; validation rejects unknown skills, duplicate sources, insecure URLs, and missing rendering coverage.
- **Credits:** see [CREDITS.md](CREDITS.md). A few skills are derived from others (Vercel; `minimalism` from ponytail) and say so in an Attribution note; the rest are original syntheses from primary docs.
- **Latest review:** [9 September 2026 findings and verification](docs/review-2026-09-09.md).
- **Rendering update:** [vgpu and current GPU/rendering reference checks](docs/rendering-review-2026-09-09.md).
- **Release contract:** see [docs/domain-release.md](docs/domain-release.md) before changing Pages or DNS status.
- **Roadmap:** `shaders-glsl`, `web-animations`, `accessibility-audit`, `testing`.

MIT — see [LICENSE](LICENSE).
