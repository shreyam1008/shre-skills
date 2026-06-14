---
name: tanstack
description: Build React apps the TanStack way — Query for server state, Router for routing/data loading, Table/Form/Virtual for UI, Start for SSR. Use when fetching data, managing server state, routing, large tables/lists, or replacing ad-hoc useEffect/useState data code.
---

# TanStack

A cohesive, type-safe stack that replaces most hand-rolled data plumbing. The guiding rule: **stop syncing server data into component state.** `useEffect` + `useState` for fetching is the anti-pattern this stack exists to remove.

## The core mental model

- **Server state ≠ client state.** Data owned by the server (lives in a DB, can change, is shared) belongs in **TanStack Query**, not `useState`.
- Reserve `useState`/`useReducer` for true UI state (open/closed, input draft, selection).
- Reserve `useEffect` for synchronizing with external systems (subscriptions, non-React widgets) — *not* for fetching.

## TanStack Query (server state)

- `useQuery` for reads; it handles caching, dedup, background refetch, loading/error states.
- Use stable, structured query keys (`['todos', { status }]`). Keys are the cache identity.
- Set `staleTime` intentionally — how long data is "fresh" before background refetch. Default 0 refetches often; raise it for stable data.
- Co-locate query options in a factory so keys/fns stay consistent and reusable across components and route loaders.

```ts
const todosQuery = (status: string) => ({
  queryKey: ['todos', { status }],
  queryFn: ({ signal }) => fetchTodos(status, signal), // pass signal for cancellation
  staleTime: 60_000,
});
useQuery(todosQuery(status));
```

### Mutations + optimistic updates

- `useMutation` for writes. After success, **invalidate** affected queries to refetch truth.
- Optimistic update via `onMutate`: cancel in-flight queries, snapshot, write the optimistic value; **roll back in `onError`** using the snapshot; reconcile in `onSettled` by invalidating.

```ts
useMutation({
  mutationFn: updateTodo,
  onMutate: async (next) => {
    await qc.cancelQueries({ queryKey: ['todos'] });
    const prev = qc.getQueryData(['todos']);
    qc.setQueryData(['todos'], (old) => applyOptimistic(old, next));
    return { prev };
  },
  onError: (_e, _next, ctx) => qc.setQueryData(['todos'], ctx?.prev), // rollback
  onSettled: () => qc.invalidateQueries({ queryKey: ['todos'] }),     // reconcile
});
```

- Prefetch on intent (hover/route enter) with `queryClient.prefetchQuery` to kill waterfalls.
- React 19 note: `useOptimistic` + Actions give *transient* optimistic UI for a single form/mutation; Query's `onMutate` updates the *shared cache* so every component reading that key reflects it. Use Query's approach when the optimistic value must persist across components/navigation.

## TanStack Router (routing + data)

- File/code-based routes are fully type-safe: typed params, search params, and links.
- Treat **search params as state** — Router validates/serializes them (great for filters, pagination, tabs). Don't duplicate them in `useState`.
- Load data in route **loaders** and integrate with Query (`ensureQueryData`) so navigation prefetches and avoids component-mount waterfalls.

## TanStack Start (SSR/full-stack)

- Use Start when you need SSR/streaming, server functions, and shared Query hydration between server and client.
- Prefetch in loaders on the server, dehydrate, and hydrate on the client so the first paint has data and no refetch flash.
- For pure SPA (no SSR needs), Router + Query alone is enough.

## TanStack Table / Form / Virtual

- **Table**: headless — you own markup/styling; it manages sorting/filtering/pagination/grouping. Keep `columns` referentially stable (define outside render or `useMemo`).
- **Virtual**: virtualize long lists/tables (`useVirtualizer`) so only visible rows render — essential past a few hundred rows.
- **Form**: type-safe, headless form state + validation (pairs with a schema lib). Avoids re-rendering the whole form on each keystroke.

## Do / Don't

- Do: server data in Query, URL state in Router search params, UI state in `useState`.
- Don't: fetch in `useEffect`, store fetched data in `useState`, or derive a second copy of server data into local state.
- Don't: use unstable query keys or recreate `columns`/`queryFn` inline every render.

## Reference

- TanStack docs: Query (Caching, Mutations, Optimistic Updates), Router (Search Params, Data Loading), Start, Table, Form, Virtual — `tanstack.com`.
- TkDodo's blog "Practical React Query" (the canonical Query best-practices series).
