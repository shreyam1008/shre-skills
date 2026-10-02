# shre-skills distribution log

Last checked: 2 October 2026 (UTC)

| Channel | Version | Status | Evidence / next action |
| --- | --- | --- | --- |
| GitHub repository | `main` (unreleased) | **Live** | 22 active skills, including Chrome/React `browser-devtools`, optional references, and install migration documentation. Google's Modern Web Guidance remains an upstream companion. |
| Product website | `main` (unreleased) | **Live** | Cloudflare Pages serves the canonical HTTPS catalog and [Browser DevTools usage guide](https://skills.shreyam1008.com.np/browser-devtools/). Every skill has a Copy prompt action for one-off use; static HTML and agent indexes expose the prompts. Metadata, robots, and sitemap expose the library to crawlers; indexing is determined by search engines. |
| CalVer release | — | **Planned** | No tag created by this review. Publish the first `YYYY.MM.DD` tag only after release checks pass on the integrated commit. |

GitHub Pages was retired on 9 September. See [hosting](cloudflare-hosting.md) and
[rollback](domain-release.md); the earlier certificate-pending state is obsolete.

## Whole-library discovery — 2 October 2026

All placements below promote the complete repository, including its 22 active
skills. Creator: Shreyam Adhikari (`shreyam1008`),
[personal website](https://shreyam1008.com.np/).

| Channel | Status | Evidence / next action |
| --- | --- | --- |
| Awesome Skills | **Publicly live** | [Repository listing](https://www.awesomeskills.dev/en/skill/shreyam1008-shre-skills) returned HTTP 200 without authentication and exposes the collection README, all 22 skill descriptions, and clickable catalog/creator links. This is one collection listing, not evidence of 22 separately indexed directory pages. |
| Skillboard | **Submitted / pending review** | Submitted `https://github.com/shreyam1008/shre-skills` through the [source form](https://www.skillboard.lol/submit); receipt: “Thanks – submitted for review.” No public listing URL yet. |
| Junminhong Awesome Agent Skills | **Submitted / pending maintainer** | [PR 61](https://github.com/junminhong/awesome-agent-skills/pull/61) adds the collection to both language READMEs at signed head `619602996c2a9447d03471ce1b7520b6d8214d0d`. Rendering, matching metadata, placement, links, and exact remote contents checked. No CI jobs configured; maintainer review required. |
| Kodus Awesome Agent Skills | **Submitted / pending maintainer** | [PR 132](https://github.com/kodustech/awesome-agent-skills/pull/132) adds the collection to Frontend Development at signed head `b9850005ed15386a1c42bfb932df6ed00bfabff9`. Exact one-row diff and rendered table checked; both Socket Security checks succeeded on that head. |
| SkillsMP | **Discovery enabled / listing unconfirmed** | Added GitHub topic `claude-skills`, preserving other accurate topics. The [official FAQ](https://skillsmp.com/docs/faq) documents daily GitHub synchronization; check the actual listing after synchronization. |
| Vercel skills.sh | **Automatic discovery route** | The [official FAQ](https://skills.sh/docs/faq) ties listing to real telemetry-enabled Skills CLI installations. There is no manual listing submission; installability alone does not establish a leaderboard entry. |

Existing [Agent Craft PR 16](https://github.com/open-agent-craft/awesome-agent-skills/pull/16)
and [Ezeafk PR 37](https://github.com/Ezeafk/awesome-agent-skills/pull/37) remain open;
the campaign did not duplicate them. Catalog Copy prompt actions support one-off
use without installing skills; agents still require URL access and task tools.
Submission, acceptance, public availability, and search indexing are separate states.
