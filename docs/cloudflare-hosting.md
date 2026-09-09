# Website hosting

Cloudflare Pages project `skills` publishes https://skills.shreyam1008.com.np/.
The GitHub integration watches `main`, with build command
`node scripts/validate-repository.mjs && node scripts/build-site.mjs` and output
directory `_site`. Set `SKIP_DEPENDENCY_INSTALL=true`; the build uses Node's
standard library. Changes under `skills/`, `site/` and `scripts/` trigger builds.

Keep the custom-domain canonical URL and generated sitemap. `site/404.html` is
copied into the build so unknown paths return a real HTTP 404.

The builder fingerprints CSS and JavaScript filenames from their normalized
contents. Keep those filenames in the generated HTML: reusing fixed asset URLs
previously let a browser combine new markup with a cached, incompatible stylesheet.
`site/_headers` sets revalidation and content types for HTML and catalog resources.

The same source skills generate the grouped HTML catalog, JSON-LD ItemList,
`skills.json`, `llms.txt`, and `skills/<name>/SKILL.md` files. The full catalog
and links are present without JavaScript. JavaScript enhances category filtering,
search, command copying, and the global bunx/npx choice; bunx is the default.

SEO metadata includes a descriptive title and description, canonical URL,
Open Graph and Twitter text previews, and WebSite/CollectionPage/ItemList
structured data. The sitemap lists the canonical HTML page. Markdown and JSON
are supplementary agent resources, not separate HTML landing pages.
These technical measures do not guarantee search indexing or rankings.

GitHub Pages hosting and its deployment workflow were disabled on 9 September 2026.

For ordinary rollback, restore a previous successful Cloudflare deployment or
revert the faulty commit and rebuild. Returning to GitHub Pages would require
re-enabling and successfully deploying it before restoring its DNS target;
changing DNS alone is not sufficient. Retiring GitHub Pages also retires the old
github.io-hosted URLs and redirects. See [release contract](domain-release.md).
