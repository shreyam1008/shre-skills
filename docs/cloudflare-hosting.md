# Website hosting

Cloudflare Pages project `skills` publishes https://skills.shreyam1008.com.np/.
The GitHub integration watches `main`, with build command
`node scripts/validate-repository.mjs && node scripts/build-site.mjs` and output
directory `_site`. Set `SKIP_DEPENDENCY_INSTALL=true`; the build uses Node's
standard library. Changes under `skills/`, `site/` and `scripts/` trigger builds.

Keep the custom-domain canonical URL and generated sitemap. `site/404.html` is
copied into the build so unknown paths return a real HTTP 404.

GitHub Pages hosting and its deployment workflow were disabled on 9 September 2026.

For ordinary rollback, restore a previous successful Cloudflare deployment or
revert the faulty commit and rebuild. Returning to GitHub Pages would require
re-enabling and successfully deploying it before restoring its DNS target;
changing DNS alone is not sufficient. Retiring GitHub Pages also retires the old
github.io-hosted URLs and redirects. See [release contract](domain-release.md).
