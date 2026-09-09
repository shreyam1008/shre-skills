# Releases

The repository will use CalVer tags in `YYYY.MM.DD` form. A tag is created only after repository validation, catalog generation, installation tests, and a review of every changed skill.

No CalVer release has been published yet. The current public GitHub repository remains the distribution authority until the first verified tag is created. The custom-domain catalog is live on Cloudflare Pages with verified HTTPS; a live catalog is distinct from a tagged release.

Fast-moving web-platform guidance must update [`source-baselines.json`](source-baselines.json) to the primary-source revision actually reviewed. The validator checks the baseline schema and required rendering-skill coverage; the review still decides whether upstream changes materially alter the guidance.

## 2026-09-09 — catalog review (main, untagged)

Corrected React scheduling, WebView2 APIs and message validation, service-worker cache isolation and installability, WASM copy semantics, GPU fallbacks, TanStack guidance, and overly broad skill defaults. Added catalog search and copy controls, clarified installation, aligned hosting records with Cloudflare Pages, and added behavioral regression checks. See [review evidence](review-2026-09-09.md).
