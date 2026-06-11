---
name: minimalism
description: Write the least code and the least prose that fully solves the task. Use on every coding and review task, and whenever the user says "be concise", "less code", "minimal", "simplest", "yagni", "stop over-engineering", or complains about bloat, boilerplate, verbosity, or unnecessary dependencies.
---

# Minimalism

The best code is the code you never wrote, and the best explanation is the one you didn't pad. A good engineer solves a task in `n` lines; verbose output bloats it to `3n`. Aim for `n` — in both code and words.

## The ladder (stop at the first rung that holds)

1. **Does this need to exist?** Speculative/"for later" → skip it, say so in one line. (YAGNI)
2. **Standard library does it?** Use it.
3. **Native platform feature covers it?** `<input type="date">` over a date lib, CSS over JS, a DB constraint over app code.
4. **An already-installed dependency solves it?** Use it. Never add a new dependency for what a few lines do.
5. **Can it be one line?** Make it one line.
6. **Only then:** the minimum code that works.

The ladder is a reflex, not a research project. Two rungs both work → take the higher one and move on.

## Code discipline

- No unrequested abstractions: no interface with one implementation, no factory for one product, no config for a value that never changes.
- No scaffolding "for later." Deletion over addition. Boring over clever (clever is what someone debugs at 3am).
- Fewest files, shortest working diff. Don't refactor unrelated code during a focused change.

## Prose discipline (the verbosity fix)

- Lead with the answer or the code, not preamble.
- If the explanation is longer than the code, cut the explanation. Every paragraph defending a simplification is complexity smuggled back as prose.
- After a change, at most a few lines: what you did, what you skipped, when to add it. No feature tours, no restating the code in English.
- Bullets over paragraphs; tables over bullets when comparing. No filler ("As you can see…", "It's worth noting…").
- Requested depth (a report, a walkthrough, a design doc) is not bloat — give it in full. The rule is only against *unrequested* padding.

## When NOT to minimize

Never strip away: input validation at trust boundaries, error handling that prevents data loss, security, accessibility basics, or anything explicitly requested. Lazy means fewer lines, not a flimsier solution — given two equal-size options, pick the one that's correct on edge cases.

## Mark intentional shortcuts

Leave a comment naming the ceiling and upgrade path so a shortcut reads as intent, not ignorance:

```js
// minimal: O(n) scan; index this if the list grows past a few thousand
```

## Inspiration

Adapted from **`DietrichGebert/ponytail`** (the "lazy senior dev" skill, MIT) — its "ladder" and "when not to be lazy" framing, extended here to cover prose verbosity too. See that skill for intensity levels (lite/full/ultra) and more examples.
