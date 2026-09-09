---
name: code-quality
description: General programming conventions and code-quality discipline — what to do and what to avoid when writing, reviewing, or refactoring code in any language. Use when authoring features, reviewing diffs, or before handoff.
---

# Code Quality

Language-agnostic conventions that hold up over time. Optimize for the next person reading the code (often future you). Favor clarity over cleverness.

## Core principles

- Prefer the **smallest change that fixes the root cause**, not the symptom.
- Make code obvious: clear names, one responsibility per function, early returns over deep nesting.
- Keep functions small enough to understand on one screen unless complexity is inherent and well-structured.
- Separate concerns: parsing, validation, business decisions, and side effects should not be tangled together.
- Don't add abstraction until duplication or a real domain concept demands it (rule of three). Avoid speculative generality (YAGNI). See the `minimalism` skill for the full "write less" discipline.
- No magic strings/numbers in core logic — promote repeated values to named constants or typed enums.
- Remove obsolete code introduced or superseded by the change after checking callers; leave unrelated files and user work alone.
- Avoid broad refactors during bug fixes unless the refactor is required to fix the bug safely.

## Correctness & data

- Treat all external input as untrusted: request bodies, query params, webhooks, env vars, third-party responses. Validate at the boundary.
- Make invalid states unrepresentable — model with narrow types / unions rather than loose flags.
- **Fail closed** for auth, access control, config selection, and verification. Default to deny/safe.
- Don't swallow errors silently. Return a typed error, log structured context, or isolate the failure with a test.
- Avoid global mutable state. Module-level caching is fine only when it is explicitly cache/single-flight behavior.
- Prefer pure functions for logic; push I/O and side effects to the edges.
- Prefer immutability; avoid mutating shared inputs.

## Types (TypeScript / typed languages)

- Keep the strict type-checker clean. No suppressions without a local, justified reason.
- Avoid `any`; use `unknown` and narrow it. Prefer typed shapes over loose `Record<string, unknown>` once validated.
- Put explicit return types on exported/public functions.
- Use exhaustive `switch` over status/protocol unions (with a `never` default) so new cases fail at compile time.
- Keep imports at the top of the file.
- Handle possibly-undefined array/map access (`noUncheckedIndexedAccess` mindset).

## Naming & structure

- Names reveal intent: `isExpired`, `retryCount` — not `flag`, `tmp`, `data2`.
- Booleans read as predicates; functions are verbs; collections are plural.
- Keep modules cohesive — group by feature/domain, not by technical layer alone.
- Keep public surfaces small; export only what callers need.

## Comments & docs

- Comment **why**, not **what** — the code already says what.
- Delete comments that restate code or have gone stale.
- Document non-obvious invariants, edge cases, and trade-offs.

## Security & secrets

- Never commit secrets, passwords, tokens, private dumps, or connection URLs. Keep them in a secret manager / env, not source.
- Don't log secrets, bearer tokens, raw passwords, or full auth headers.
- Use parameterized queries; never string-concatenate untrusted input into SQL/commands.
- Use constant-time comparison for secrets/tokens.
- Keep auth checks before data access. Sanitize test fixtures.

## Tests

- Add/update tests when changed behavior or failure risk warrants them; use existing checks or direct verification for low-impact edits. Cover meaningful edge and failure paths.
- A test should fail for one clear reason; keep them deterministic (no real time/network/randomness unless controlled).
- Don't weaken or delete tests to make a change pass — fix the cause.
- Prefer behavior-level tests over asserting implementation details.

## Dependencies

- Add a dependency only when it clearly beats a small in-house solution; check size, maintenance, and license.
- Pin/lock versions and commit the lockfile.
- Prefer the platform/standard library when it suffices.

## Review checklist before handoff

- [ ] Smallest reasonable change; root cause addressed.
- [ ] Appropriate tests or direct checks pass; required type-check/build/lint clean for touched code.
- [ ] No `any`/suppressions sneaking in; invalid states unrepresentable.
- [ ] Inputs validated; errors handled, not swallowed.
- [ ] No secrets in code, logs, or fixtures.
- [ ] No dead code, stray files, or stale comments/docs.
- [ ] No unrelated formatting churn.
- [ ] New dependencies justified with lockfile update.

## Reference

- "The Pragmatic Programmer"; "A Philosophy of Software Design" (Ousterhout); Google Engineering Practices (code review).
