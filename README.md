<div align="center">

# shre-skills

**Battle-tested agent skills for shipping fast, correct web apps.**

HTML/CSS/JS · React + TanStack · performance · caching · security · GPU/WASM rendering

[![skills](https://img.shields.io/badge/skills-19-6C5CE7?style=for-the-badge)](#-skills)
[![license](https://img.shields.io/badge/license-MIT-00B894?style=for-the-badge)](LICENSE)
[![refreshed](https://img.shields.io/badge/refreshed-monthly-0984E3?style=for-the-badge)](#)
[![by](https://img.shields.io/badge/by-buggythegret-FD79A8?style=for-the-badge)](https://shreyam1008.com.np)

[**Quick start**](#-quick-start) · [**Skills**](#-skills) · [**Install options**](#-install-options) · [**Credits**](CREDITS.md)

</div>

---

One place to pull consistent, opinionated guidance instead of re-searching every time. Portable Markdown in `.agents/skills/`, read by **Cascade/Windsurf, Claude Code, Codex, Devin**. Each skill is short, example-light, and ends with a `## Reference`. Maintained by [Shreyam Adhikari](https://shreyam1008.com.np) ("buggythegret") and **refreshed ~monthly** as the web moves.

## ⚡ Quick start

Add the whole collection with one command (hover the block → click the copy icon):

```bash
npx skills add shreyam1008/shre-skills
```

Want just one? Append `@<skill>` — the slug is the skill's name from the table below:

```bash
npx skills add shreyam1008/shre-skills@webgl
```

<details open>
<summary><b>📋 Copy all 19 one-liners</b></summary>

```bash
npx skills add shreyam1008/shre-skills@minimalism
npx skills add shreyam1008/shre-skills@code-quality
npx skills add shreyam1008/shre-skills@html
npx skills add shreyam1008/shre-skills@css
npx skills add shreyam1008/shre-skills@javascript
npx skills add shreyam1008/shre-skills@git
npx skills add shreyam1008/shre-skills@react-best-practices
npx skills add shreyam1008/shre-skills@react-rendering-performance
npx skills add shreyam1008/shre-skills@tanstack
npx skills add shreyam1008/shre-skills@web-performance
npx skills add shreyam1008/shre-skills@caching
npx skills add shreyam1008/shre-skills@service-worker
npx skills add shreyam1008/shre-skills@security
npx skills add shreyam1008/shre-skills@react-three-fiber
npx skills add shreyam1008/shre-skills@webgl
npx skills add shreyam1008/shre-skills@wasm-rust
npx skills add shreyam1008/shre-skills@low-level-web-rendering
npx skills add shreyam1008/shre-skills@design-language
npx skills add shreyam1008/shre-skills@web-design-guidelines
```
</details>

## 🧩 Skills

> Auto-loads when a task matches the skill's `description`, or summon it by name (`@webgl` in Cascade).

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

## 🛠️ Install options

Skills live in your project's `.agents/skills/` — no build step, just files.

```bash
# 1 · Skills CLI (recommended) — installs straight from GitHub
npx skills add shreyam1008/shre-skills            # all
npx skills add shreyam1008/shre-skills@webgl      # one

# 2 · Bundled script (clone this repo first)
./install.sh                      # all → ./.agents/skills
./install.sh webgl ~/code/my-app  # one → target project

# 3 · By hand
cp -R skills/webgl my-app/.agents/skills/
```

<details>
<summary><b>📋 All 19 install commands (again, for the road)</b></summary>

```bash
npx skills add shreyam1008/shre-skills@minimalism
npx skills add shreyam1008/shre-skills@code-quality
npx skills add shreyam1008/shre-skills@html
npx skills add shreyam1008/shre-skills@css
npx skills add shreyam1008/shre-skills@javascript
npx skills add shreyam1008/shre-skills@git
npx skills add shreyam1008/shre-skills@react-best-practices
npx skills add shreyam1008/shre-skills@react-rendering-performance
npx skills add shreyam1008/shre-skills@tanstack
npx skills add shreyam1008/shre-skills@web-performance
npx skills add shreyam1008/shre-skills@caching
npx skills add shreyam1008/shre-skills@service-worker
npx skills add shreyam1008/shre-skills@security
npx skills add shreyam1008/shre-skills@react-three-fiber
npx skills add shreyam1008/shre-skills@webgl
npx skills add shreyam1008/shre-skills@wasm-rust
npx skills add shreyam1008/shre-skills@low-level-web-rendering
npx skills add shreyam1008/shre-skills@design-language
npx skills add shreyam1008/shre-skills@web-design-guidelines
```
</details>

## 📎 Notes

- **Structure:** `skills/<name>/SKILL.md` — frontmatter (`name` + `description`) then guidance. Only the description loads until the skill triggers (progressive disclosure).
- **Credits:** see [CREDITS.md](CREDITS.md). A few skills are derived from others (Vercel; `minimalism` from ponytail) and say so in an Attribution note; the rest are original syntheses from primary docs.
- **Roadmap:** `webgpu`, `shaders-glsl`, `web-animations`, `accessibility-audit`, `testing`.

MIT — see [LICENSE](LICENSE).
