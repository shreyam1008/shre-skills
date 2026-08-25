# shre-skills distribution log

Last checked: 25 August 2026

| Channel | Version | Status | Evidence / next action |
| --- | --- | --- | --- |
| GitHub repository | `main` (unreleased) | **Live** | The public repository is the distribution authority; this change raises the validated catalog to 21 skills when merged. |
| Product website | `main` (unreleased) | **DNS configured; certificate pending** | Pages deployment and the DNS-only CNAME are present. GitHub still serves a `*.github.io` certificate, verified HTTPS fails, and HTTPS enforcement is disabled. Do not call the custom domain Live yet. |
| CalVer release | — | **Planned** | Publish the first `YYYY.MM.DD` tag only after the installer security test and repository validator pass on the integrated commit. |

Do not call a generated catalog or local manifest live until its public URL works without authentication.
