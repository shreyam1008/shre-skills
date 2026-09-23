# First CalVer release readiness

> Update 23 September 2026: this branch now includes the new
> `ask-dont-assume` and `database-guardrails` skills. It also tracks Google's
> Modern Web Guidance as an upstream source baseline rather than adding a broad
> duplicate skill. The earlier 19-skill and 21-skill candidates described below
> are superseded; rerun the checks and record the resulting full SHA before tagging.

Status: proposed, publication awaiting explicit owner approval. Proposed tag:
`2026.09.14` (no `v` prefix). If approval/publication occurs on another UTC date,
choose that day's `YYYY.MM.DD` tag and repeat the collision and candidate checks.
Never reuse or move a published tag.

Branch: `release/readiness-2026.09.14`.
Reviewed source baseline: `89b18974f889acc286cfd66a6d2e90b616da2290`.
The candidate is the final reviewed commit on this branch, recorded by full SHA
in its CI run. If merging changes the commit, validate the resulting commit and
wait for its checks before tagging it. The existing skill reviews are linked
from `releases.md`; any subsequent skill change requires a new review before
publication.

## Reproducible checks

Run from a clean checkout of the candidate:

```bash
node scripts/validate-repository.mjs
node scripts/build-site.mjs
node --test scripts/repository.test.mjs
git diff --check
git status --short
```

The generated `_site` is ignored and is the production catalog build. The
validator and behavioral tests cover the 21-skill inventory, metadata, complete
references, generated catalog consistency, hashed assets, clean one-skill and
all-skill installs, stale-file replacement, sibling preservation, retired aliases,
and unsafe destinations. CI runs these checks on Linux and Windows (Git Bash).
Tests derive the expected installed inventory from source rather than freezing
an old count. No third-party runtime dependencies or package lock are required;
there are no separate lint, formatting, or type-check commands in this repository.

## Pinning rehearsal and post-publication verification

Use the bundled installer from a detached checkout for an exact Git pin. These
commands are for Bash, including Git Bash on Windows. Replace the placeholder
with the full approved candidate SHA for rehearsal. After publication, use the
tag and verify its resolved SHA equals that approved SHA before installing.

```bash
git clone https://github.com/shreyam1008/shre-skills.git shre-skills-pinned
cd shre-skills-pinned
git checkout --detach <approved-full-commit-sha>
git rev-parse HEAD
node scripts/validate-repository.mjs
node scripts/build-site.mjs
node --test scripts/repository.test.mjs
bash install.sh webgl ../clean-one-skill-project
bash install.sh all ../clean-all-skills-project
```

After publication, `git fetch origin tag 2026.09.14` and
`git checkout --detach 2026.09.14` select the proposed release. Record
`git rev-parse HEAD` alongside the installation. The automated clean-install
tests compare every copied file byte for byte with the selected source.
The unversioned catalog and quick-start CLI commands continue to track main;
they are not evidence of a pinned install. External Skills CLI pin semantics
are not certified by the bundled installer tests. Use the detached checkout
above for the reproducible release path.

## Publication checklist — only after explicit approval

- Record the approved full SHA and UTC CalVer date. Confirm neither the local
  nor remote tag nor a GitHub release already uses that date.
- Run all checks on that exact commit and confirm both platform CI jobs pass.
  Review the complete diff and preserve any unrelated work.
- Create an annotated tag at the approved SHA, push that tag, and create a
  GitHub release targeting the existing tag. Include the full SHA, the 21-skill
  inventory, review links, pinned installation steps, and this rollback policy.
  Do not use an implicit branch head as the release target.
- Fetch the remote tag into a fresh clone, verify its peeled commit SHA, and run
  the validation, catalog build, and clean-install tests again. Record the tag,
  SHA, release URL, and CI URLs in `releases.md` and distribution records.
- Mark the CalVer channel released only after those observations. Keep website
  deployment identity separate: it follows main through Cloudflare Pages.
  Do not relabel a main deployment as the tag without evidence. Any main merge
  must pass the website verification contract in `domain-release.md`.

## Rollback checklist

- Before upgrading, record the installed source SHA and back up each affected
  skill directory, including local edits and references. The installer replaces
  selected directories; it does not retain its temporary backups after success.
- For this first release there is no previous release tag. Restore the saved
  pre-install directories, or reinstall a recorded known-good full commit SHA
  from a detached checkout. Do not substitute the moving main branch.
- For later releases, fetch and check out the previous verified tag, verify its
  recorded SHA, then run `bash install.sh <skill> <target>` or `all` in the same
  project scope. Check local edits before replacement. Preserve unrelated skills.
- An all-skill downgrade does not remove skills introduced by a newer release.
  Compare inventories and remove only confirmed release-added directories after
  backing them up. On first-install rollback, remove only directories that were
  absent before installation; restore any overwritten directories from backup.
- Compare restored files with the selected source or saved backup and verify
  agent discovery in the consuming project. Reapply customizations deliberately.
- Keep published tags immutable. Explain a faulty release in its notes and issue
  a new date tag for a fix; do not silently repoint existing pins. Website rollback
  uses the previous successful Cloudflare deployment or a reviewed revert as
  described in `domain-release.md`, followed by public checks.
