# Product domain and release contract

The canonical catalog is **https://skills.shreyam1008.com.np/**, hosted by
Cloudflare Pages project `skills`. HTTPS and the public catalog were verified on
9 September 2026 (UTC). See [hosting configuration](cloudflare-hosting.md).

## Publication

1. Validate skills, build the catalog, and run regression tests on the proposed commit.
2. Publish through the repository's `main` flow. The existing Cloudflare Git integration builds and publishes `_site`.
3. Verify that the public response contains the changed catalog content, then check HTTP-to-HTTPS redirection, assets, source links, robots, sitemap, and a missing URL.
4. Keep `product.json`, distribution records, and release notes consistent with the observed state. A deployment is not a CalVer release; tags require the release checks.

Canonical, Open Graph, JSON-LD, robots, and sitemap must use the same HTTPS origin.
The build defaults to that origin; `PAGES_BASE_URL` allows an explicit HTTPS preview
origin/base path. It must not change the production canonical accidentally.

## Rollback

Use Cloudflare Pages' previous successful production deployment, or revert the
offending commit and let the Git integration rebuild. Verify the public URL again.
Keep DNS and the canonical origin unchanged during an ordinary content rollback.

GitHub Pages and its workflow were retired on 9 September 2026. The legacy
`github.io/shre-skills/` URL is not a supported distribution channel. Returning to
GitHub Pages requires restoring a deployment workflow, successfully publishing,
claiming the custom domain, and verifying DNS/TLS before switching traffic.
Changing DNS alone cannot restore a retired host.

## Public checks

```bash
curl -sSIL http://skills.shreyam1008.com.np/
curl -fsSIL https://skills.shreyam1008.com.np/
curl -fsSL https://skills.shreyam1008.com.np/robots.txt
curl -fsSL https://skills.shreyam1008.com.np/sitemap.xml
curl -sS -o /dev/null -w '%{http_code}' https://skills.shreyam1008.com.np/nonexistent-review-page
```

Pass criteria: HTTP redirects to HTTPS, valid TLS and a 200 home page, canonical
metadata agrees, stylesheet/script/icon load, all catalog source links work, and
unknown paths return 404. Test search, copying, keyboard access, and small-screen
layout before publishing UI changes.
