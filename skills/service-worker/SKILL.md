---
name: service-worker
description: Build service workers and PWAs — offline support, caching strategies, background sync, installability, and updates. Use when adding offline/PWA capability, intercepting fetches, precaching assets, or debugging a stale/broken service worker.
---

# Service Worker & PWA

A service worker is a network proxy that runs in its own thread, independent of pages. It enables offline, fine-grained caching, push, and background sync — but it's powerful and easy to footgun (stale content, "won't update"). Treat versioning and updates as first-class.

## Lifecycle (internalize this)

`register → install → activate → (controls pages) → update`

- **install**: precache the app shell. Call `self.skipWaiting()` to activate immediately (only if you handle updates gracefully).
- **activate**: clean up old caches. Call `self.clients.claim()` to control existing pages.
- A new SW **waits** until all old tabs close unless you `skipWaiting()`. This is why "my change didn't show up".
- Scope = the SW's directory and below. Serve it from the root to control the whole origin.

```js
navigator.serviceWorker.register('/sw.js'); // page side

// sw.js
const VERSION = 'v3';
self.addEventListener('install', (e) => {
  e.waitUntil(caches.open(VERSION).then((c) => c.addAll(SHELL_ASSETS)));
});
self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== VERSION).map((k) => caches.delete(k))),
    ),
  );
});
```

## Caching strategies — match to content type

| Strategy | Use for | Behavior |
|---|---|---|
| **Cache-first** | hashed static assets, fonts | serve cache, fall back to network |
| **Network-first** | HTML/navigations, fresh-critical API | try network, fall back to cache offline |
| **Stale-while-revalidate** | API JSON, avatars, mixed content | serve cache instantly, refresh in background |
| **Network-only / Cache-only** | non-GET, analytics / pure offline assets | bypass or only-cache |

- **Never serve stale HTML forever** — use network-first or SWR for documents so users discover updates.
- Only cache `GET`. Don't cache responses to mutations.
- Version cache names; delete old versions on `activate`.

```js
self.addEventListener('fetch', (e) => {
  const { request } = e;
  if (request.method !== 'GET') return;
  if (request.mode === 'navigate') {
    e.respondWith(fetch(request).catch(() => caches.match('/offline.html')));
  }
});
```

## Background sync & updates

- **Background Sync** (`sync` event): queue failed writes (e.g. in IndexedDB) and retry when connectivity returns — great for offline form submits. Periodic Background Sync for content refresh (limited support).
- Tell users when a new SW is ready ("Refresh to update") rather than silently swapping, to avoid mid-session breakage.

## Installable PWA

- Ship a **web app manifest** (`name`, `icons` incl. maskable, `start_url`, `display: standalone`, `theme_color`).
- Requirements: HTTPS, manifest, a registered service worker. Handle `beforeinstallprompt` to offer install at a good moment.

## Use Workbox unless you have a reason not to

- Hand-written SWs get complex fast. **Workbox** gives battle-tested routing, strategies, precaching with revision manifests, and cleanup. Prefer it for non-trivial apps.

## Footgun checklist

- [ ] Cache names versioned; old caches deleted on `activate`.
- [ ] HTML is network-first / SWR, not cache-first.
- [ ] Only `GET` cached; mutations always hit network.
- [ ] Update flow handled (skipWaiting + user prompt) so changes ship.
- [ ] Tested offline and on a slow network in DevTools → Application → Service Workers.

## Reference

- MDN: Service Worker API, Web App Manifest, Background Sync.
- web.dev "Learn PWA"; Chrome for Developers: Workbox + "Caching strategies overview".
