# Releases

First release proposal: [2026.09.14 readiness and rollback checklist](release-readiness-2026-09-14.md).
This is a review candidate, not a published release.

The repository will use CalVer tags in `YYYY.MM.DD` form. A tag is created only after repository validation, catalog generation, installation tests, and a review of every changed skill.

No CalVer release has been published yet. The current public GitHub repository remains the distribution authority until the first verified tag is created. The custom-domain catalog is live on Cloudflare Pages with verified HTTPS; a live catalog is distinct from a tagged release.

## 2026-10-02 — Chrome and React Browser DevTools (main, untagged)

Added `browser-devtools` for focused Chrome network, console, storage, source,
trace, memory, and React investigations. Native `agent-browser` with installed
Chrome handles routine work; official Chrome DevTools supplies advanced analysis.
The skill reads installed help/schemas and loads detailed references only as needed.

Added a short HTML usage guide, linked it from the catalog and sitemap, and updated
the README and 22-skill machine-readable catalog. Windows Chrome smoke tests covered
request failures, storage, console stacks, CPU trace evidence, and genuine React
development/production inspection. React render aggregates and unavailable timings
are distinguished from full DevTools Profiler output. This update creates no CalVer tag.

Added a standalone **Copy prompt** action for every skill and the Browser DevTools
guide. Each prompt describes the action, accepts task context, and links public
guidance for one-off use without installing the skill. Prompts are readable in
static HTML and included in `skills.json`, `llms.txt`, and catalog search.

## 2026-09-23 — database guardrails and Modern Web Guidance routing

Added the ask-first database guardrails skill to the release candidate, removed
the desktop-surface review, and tracked Google's Modern Web Guidance source for
the existing HTML, CSS, JavaScript, performance, design, and security skills.
The upstream feature library is not vendored as another broad skill.

Fast-moving web-platform guidance must update [`source-baselines.json`](source-baselines.json) to the primary-source revision actually reviewed. The validator checks the baseline schema and required rendering-skill coverage; the review still decides whether upstream changes materially alter the guidance.

## 2026-09-09 — catalog review (main, untagged)

Corrected React scheduling, WebView2 APIs and message validation, service-worker cache isolation and installability, WASM copy semantics, GPU fallbacks, TanStack guidance, and overly broad skill defaults. Added catalog search and copy controls, clarified installation, aligned hosting records with Cloudflare Pages, and added behavioral regression checks. See [review evidence](review-2026-09-09.md).

Added version-aware vgpu guidance and refreshed rendering references. Consolidated 22 skills into 19: minimalism into code-quality, React rendering performance into React best practices, and design language into web design guidelines. Retained specialist material as optional references, narrowed discovery descriptions, and added installer aliases and website redirects. See [rendering review](rendering-review-2026-09-09.md) and [consolidation details](skill-consolidation-2026-09-09.md).
