# shre-skills distribution log

Last checked: 23 September 2026 (UTC)

| Channel | Version | Status | Evidence / next action |
| --- | --- | --- | --- |
| GitHub repository | `main` (unreleased) | **Live** | Public repository contains 21 active skills, optional references, and install migration documentation. The published candidate keeps ask-first decisions, adds strict database guardrails, removes the desktop-surface review, and tracks Google's Modern Web Guidance as an upstream source. |
| Product website | `main` (unreleased) | **Live** | Cloudflare Pages serves the custom domain over verified HTTPS; HTTP redirects, metadata/assets work, and unknown paths return 404. See [review](review-2026-09-09.md). |
| CalVer release | — | **Planned** | No tag created by this review. Publish the first `YYYY.MM.DD` tag only after release checks pass on the integrated commit. |

GitHub Pages was retired on 9 September. See [hosting](cloudflare-hosting.md) and
[rollback](domain-release.md); the earlier certificate-pending state is obsolete.
