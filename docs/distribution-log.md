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

## Additional website submissions — 2 October 2026

The Google query `agent skills marketplace submit` surfaced AgentHub,
AgenticSkills, and MCP Market. Other candidates were checked against their own
submission documentation. The shortlist prioritizes free, relevant intake for
the whole library; it is not a traffic-ranking claim. Earlier placements were
not submitted again.

| Channel | Scope | Verified state / next action |
| --- | --- | --- |
| askill | All 22 skills | **Publicly live.** Repository intake returned “Found and indexed 22 skills.” Listing IDs `704458` through `704479` each returned anonymous HTTP 200 with the expected skill name, author, canonical page and GitHub source. Example: [Browser DevTools](https://askill.sh/skills/704459). This proves directory publication, not Google indexing. |
| AgentHub | One collection containing all 22 skills | **Public page / draft status.** [Collection page](https://www.agentskillsmarket.space/skill/shre-skills-22-agent-skills) is anonymously accessible, retains the source-repository link and describes the whole library. Its ZIP contains all 22 expected SKILL.md files and Browser DevTools references. SHA-256: `b44782c8829a76cd207670baacb1ac8f6ecadf09202b0c23cec5d29546c834cb`. The page still says `draft`; moderation approval is unverified. GitHub bulk intake gave no acceptance receipt; the manual repository-backed collection route succeeded. |
| Skillstore | All 22 skills | **Accepted / processing.** Intake detected 22 skills. [Submission status](https://skillstore.io/submissions/dedfe130-b8d5-4fd0-b8d0-280a4c409b6d) links [processing run 37020600946](https://github.com/aiskillstore/marketplace/actions/runs/37020600946), using source revision `ba9787f41c2fe1be1062eeb6322bc339a1026383`. Audit, review and publication remain external pending steps. |
| AgenticSkills | Whole repository collection | **Submitted / editorial review.** [Submission form](https://agenticskills.io/submit) returned “Skill Submitted!” and a weekly review-queue receipt. No submission ID or public listing URL supplied. |
| SkillMD | Individual skill folders | **20 of 22 submitted / 2 rate limited.** [My skills](https://skillmd.com/my-skills) shows 20 submissions under the site's `shreyam-adhikari` namespace, all in review. Names and descriptions came from the source frontmatter; Browser DevTools retained its seven companion files. `webgpu` and `webview2-winui` each returned “rate limited” and remain unaccepted. Resume their prepared folder submissions after the site's limit resets; its reset time was not supplied by the UI. |

Additional routes with incomplete outcomes:

- [MCP Market](https://mcpmarket.com/submit?type=skill) accepted Browser DevTools
  into its **free** queue (displayed estimate: 4–6 weeks). Ask Don't Assume and
  Caching both returned “Failed to submit skill.” The other 21 skills have no
  accepted submission; the failure cause is unconfirmed. No paid placement was
  purchased.
- [Agent-Skills.md](https://agent-skills.md/submit) returned “Internal server
  error” for the skills-folder URL. No acceptance confirmed.
- [OmniSkill](https://omniskill.online/) returned a network/JSON parsing error.
  No acceptance confirmed.
- [Skills Directory](https://www.skillsdirectory.com/submit) authenticated through
  GitHub, then the repository scan returned “Couldn't submit this skill / Something
  went wrong. Please try again.” No acceptance confirmed.

Keep receipts and existing submission identities when checking publication or
feedback. Do not duplicate queued entries, infer acceptance from a spinner, or
purchase placement to resolve an unexplained failure.
