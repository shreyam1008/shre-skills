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
| SkillMD | All 22 individual skill folders | **22 of 22 submitted / pending review.** [My skills](https://skillmd.com/my-skills) was checked against all 22 unique source names. Names and descriptions came from the source frontmatter; Browser DevTools retained its seven companion files. The first 20 use the original `shreyam-adhikari` skill namespace. After correcting the public profile to [`shreyam1008`](https://skillmd.com/u/shreyam1008), cooldown retries accepted `shreyam1008/webgpu` and `shreyam1008/webview2-winui`. Submission does not establish publication. |

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

## Retry and identity history

- **SkillMD:** the first campaign accepted 20 skills, then rate limited WebGPU
  and WebView2. An initial WebGPU cooldown retry was also rate limited. A later
  retry of each remaining skill succeeded after the profile correction: WebGPU
  at 15:07 UTC and WebView2 at 15:08 UTC on 2 October. The dashboard check at
  15:08 UTC contains all 22 unique names, all in review; no accepted entry
  was duplicated. The site did not supply a reset time.
- **SkillMD identity:** the signup default was `shreyam-adhikari`; the requested
  public username is now `shreyam1008`, with display name Shreyam Adhikari.
  Profile settings explicitly warn that old profile links stop working and
  existing skill URLs are unaffected. The existing 20 namespaces were observed
  unchanged after the rename. The skill-content editor does not expose a
  namespace field; moving those entries would need a supported migration route,
  not duplicate submissions.
- **AgentHub:** GitHub bulk intake gave no acceptance receipt. The manual,
  repository-backed collection succeeded; its summary was corrected and the
  22-skill package verified. Its public page still says `draft`.
- **Other failures:** MCP Market's two additional skill attempts, Agent-Skills.md,
  OmniSkill, and Skills Directory have the errors recorded above. There is no
  later success receipt for those attempts. Keep the error history when retrying;
  replace a current status only after an actual receipt or public listing appears.

## Website-link audit — 2 October 2026, 15:08 UTC

The product destination is the [skill catalog](https://skills.shreyam1008.com.np/);
the creator destination is the [personal site](https://shreyam1008.com.np/).
Both are included where the destination supports them. A repository link, a
plain-text URL, an unpublished submission, and a public clickable website link
are different outcomes.

| Destination | Skill catalog | Personal site | Observed evidence |
| --- | --- | --- | --- |
| Awesome Skills | Public clickable links | Public clickable links | [Live collection](https://www.awesomeskills.dev/en/skill/shreyam1008-shre-skills) links the catalog and Browser DevTools guide, plus the creator homepage and project anchor. Observed website anchors have no `nofollow`. |
| askill | No direct website link verified | No direct website link verified | All 22 public listings link their GitHub source; neither owned website appeared in the checked public HTML. |
| AgentHub | Plain-text URL | Plain-text URL | [Collection](https://www.agentskillsmarket.space/skill/shre-skills-22-agent-skills) mentions both URLs, but no direct website anchors were found in checked public HTML. The repository is clickable; the collection remains draft. |
| SkillMD | Plain-text bio URL | Plain-text bio URL | [Renamed public profile](https://skillmd.com/u/shreyam1008) shows both URLs as text, without direct website anchors. All 22 submissions await review. |
| Skillstore | No public website backlink verified | No public website backlink verified | [Status page](https://skillstore.io/submissions/dedfe130-b8d5-4fd0-b8d0-280a4c409b6d) links the repository and processing workflow. Still Processing; audit job remains in progress. |
| AgenticSkills | Supplied in submission Website field | No public website backlink verified | Editorial receipt exists; no published listing yet. The receipt does not reproduce the form payload. |
| Skillboard | No public website backlink verified | No public website backlink verified | Repository intake is pending review; no listing URL. |
| MCP Market | No public website backlink verified | No public website backlink verified | Browser DevTools source-folder intake is queued; no listing URL. |
| Junminhong PR 61 / Kodus PR 132 | Public PR-description links | Public PR-description links | [PR 61](https://github.com/junminhong/awesome-agent-skills/pull/61) and [PR 132](https://github.com/kodustech/awesome-agent-skills/pull/132) link both websites in their descriptions, with GitHub's `nofollow`. Proposed README entries link the repository only; maintainer placement remains pending. |
| Agent Craft PR 16 | PR-description and proposed-entry links | No link verified | [PR 16](https://github.com/open-agent-craft/awesome-agent-skills/pull/16) links the catalog; proposed README/data placement remains pending. |
| Ezeafk PR 37 | Proposed README link | No link verified | [PR 37](https://github.com/Ezeafk/awesome-agent-skills/pull/37) proposes a catalog `docs` link. No owned-website anchor was found in the PR description; merge remains pending. |
| Agent-Skills.md / OmniSkill / Skills Directory | No accepted backlink | No accepted backlink | The attempts failed, as recorded above. |
| SkillsMP / Vercel skills.sh | Unconfirmed | Unconfirmed | Automatic discovery routes; no actual listing or outbound website link confirmed. |

These checks establish link visibility, not Google/Bing indexing, referral traffic,
or ranking gains. Keep public PR links distinct from merged curated entries.

## Submission-format preflight — 2 October 2026

All 22 source skills passed the skill-creator validator and SkillMD's published
CLI `skillmds@1.3.3` (`skillmd lint skills --format json`): **22 passed, zero
errors**. YAML starts at byte zero, required name/description values parse,
names match folders and the stricter [Agent Skills specification](https://agentskills.io/specification)
limits, and local reference targets exist. The largest SKILL.md is 9,367 bytes;
the longest is 224 lines. Companion files fit the observed GitHub-intake limits.

The only SkillMD diagnostic is optional `license` warning `SK011`. The repository
already has an MIT license; [SkillMD's rules](https://skillmd.com/docs/format#SK011)
explicitly say warnings do not block publishing. No mandatory format correction
was found, so queued submissions were not duplicated or reset for this audit.
Repository validation, catalog build and all 15 regression tests also passed.

Individual folders match SkillMD/MCP Market intake; whole-repository URLs match
the collection routes recorded above. [Skillstore's developer guide](https://skillstore.io/docs/developers)
and [AgenticSkills' inclusion criteria](https://agenticskills.io/methodology)
still require audit/editorial review. Format conformance does not establish
moderation approval; unexplained intake errors remain unresolved errors.

## Metadata refinement — 2 October 2026

Each of the 22 skills now explicitly declares `license: MIT`, matching the
repository license. Skill instructions and reference files are unchanged.
SkillMD's published `skillmds@1.3.3` strict lint passes all 22 with **zero errors
and zero warnings**. The repository parser accepts the standard license field,
rejects duplicate fields even when their first value is empty, and keeps unknown
metadata rejected. Repository validation, production build and all 16 regression
tests passed locally on Windows before publication.

Existing queued submissions are updated in place where the directory offers an
editor. Namespace changes and new duplicate entries are not used to refresh
metadata; moderation remains separate from source-format checks.

All 22 existing SkillMD entries were subsequently saved in place and reopened
through the account editor. Their raw SKILL.md text matches the committed source
after the editor's whitespace trimming and newline normalization. MIT metadata
is present in every saved entry. Browser DevTools retains all seven companion
files; the React and design skills retain their reference files. The queue still
contains exactly 22 entries, with no duplicates, all in review. The public
profile remains `shreyam1008`; 20 older submission namespaces still retain
`shreyam-adhikari`, while the last two retain `shreyam1008`. Their existing slugs
were preserved rather than recreated under another namespace. Public skill
count zero remains consistent with pending moderation.

## Profile cleanup and another collection contribution — 2 October 2026

The public GitHub profile uses `shreyam1008`, the name Shreyam Adhikari, a concise
developer bio and the HTTPS personal homepage. The repository description now
states its web-development scope and one-off prompts; its homepage remains the
skill catalog.

AgentHub's existing collection has a clear 22-skill description and a verified
replacement ZIP from commit `97f59e0aebf0edfaf200bd5e5f0cf1ba58ae8bfa`:
69 files, including every SKILL.md and supporting reference, with SHA256
`74340912d4d1d862539b9ad1854c0fd94229cdf053ffacd2f06e1053e46dfe35`.
The downloaded public package matches that hash. Its creator Website anchor
now links the personal homepage. Catalog/guide URLs remain plain text because
its description renderer does not render inline Markdown links. The collection
still says `draft`. The profile shows a generic Los Angeles location, but its
editor offers no location field; that site placeholder is not verified creator
information.

[Awesome Codex CLI PR 354](https://github.com/RoggeOhta/awesome-codex-cli/pull/354)
proposes the **whole collection** in the existing Skills collections section.
The [contribution rules](https://github.com/RoggeOhta/awesome-codex-cli/blob/main/CONTRIBUTING.md)
allow clearly useful Codex projects without a minimum star count. The README
change adds one factual entry and updates the actual resource count 271 to 272.
The PR discloses maintainership and Codex assistance, and links both owned sites
in its body. `awesome-lint@2.3.0`, whitespace, duplicate URLs, badge target,
resource count and Markdown-render checks passed on head
`bb0c96ff2d336bcfa4f4a76f44bd699289f597d6`. No CI/check/status jobs were
configured or observed for that head; their absence is not a passing CI result.
The PR is open and awaiting maintainer review.

The four earlier collection PRs remain open and unmerged. Kodus PR 132 has two
successful Socket checks on its unchanged head. The others have no reported
checks; Junminhong PR 61 also requires review. Skillstore discovery succeeded,
but its audit workflow still processes the earlier submitted `ba9787f41` source.

Larger lists were screened before contributing:

- [VoltAgent](https://github.com/VoltAgent/awesome-agent-skills/blob/main/CONTRIBUTING.md)
  requires demonstrated community adoption.
- [travisvn](https://github.com/travisvn/awesome-claude-skills/blob/main/CONTRIBUTING.md)
  requires 10 stars and excludes AI-assisted submissions.
- BehiSecc's maintainer applies a 60-star minimum, including collections, in
  [PR 493](https://github.com/BehiSecc/awesome-claude-skills/pull/493) and
  [PR 494](https://github.com/BehiSecc/awesome-claude-skills/pull/494).
- [JackyST0](https://github.com/JackyST0/awesome-agent-skills/blob/main/CONTRIBUTING.md)
  requires 64 stars.
- [hesreallyhim](https://github.com/hesreallyhim/awesome-claude-code/blob/main/CONTRIBUTING.md)
  uses human-only website recommendations.
- [karanb192](https://github.com/karanb192/awesome-claude-skills/blob/main/CONTRIBUTING.md)
  requires actual Claude testing in its submission checklist.
- heilcheng's two-examples-per-skill quality rule remains unverified for this
  collection, so no PR was submitted there.

No unsupported testing/adoption claims were made to satisfy these conditions.

Metadata commit `97f59e0` passed [CI run 37028503936](https://github.com/shreyam1008/shre-skills/actions/runs/37028503936)
on both Windows and Ubuntu, with all 16 tests passing, and Cloudflare deployed
that exact commit. All 22 production skill files and official GitHub raw source
files return 200 and match normalized committed contents. Canonical metadata,
assets, catalog, robots, sitemap, HTTPS redirection and real 404 checks passed.
GitHub's HTML source pages separately returned a common 503 error during the
probe; recheck those HTML links when GitHub recovers. Available raw files are
not counted as an HTML availability pass.
