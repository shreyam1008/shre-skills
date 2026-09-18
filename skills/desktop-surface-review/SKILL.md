---
name: desktop-surface-review
description: "Reviews local desktop UI architecture for memory, startup, input, and OS integration, comparing external-browser BUI, embedded WebView, and native surfaces. Use before choosing or optimizing a local/web desktop shell; not a replacement for framework-specific implementation skills."
---

# Desktop surface review

Choose a desktop surface from measured workload and platform requirements. Treat
Browser User Interface (BUI), an embedded webview, and a native UI as different
resource and lifecycle architectures, not interchangeable labels.

## Establish comparable evidence

- Name every process in the proposed experience: backend, browser or webview
  group, GPU/helper processes, external engines, and the native shell.
- Define the workload and budgets before comparing frameworks. At minimum record
  cold and warm start, idle, representative interaction, large-document or
  large-job behavior, teardown, and a second-instance case when relevant.
- Capture process-group working set, private bytes or committed memory, and PSS
  where the platform exposes it. Also record CPU, GPU, first-input latency, and
  binary/package size; package size is not runtime memory.
- Use the same release configuration, content, window size, DPI, and wait time for
  each candidate. Report build failures, early exits, missing probes, and
  browser memory exclusions as unknowns rather than treating them as wins.

## Choose the surface

### External-browser BUI

Use a local backend that serves a narrow authenticated API to an already-installed
browser when the tool is occasional inspection, configuration, monitoring, or
download work. It avoids shipping a browser engine, but the browser's processes
still count toward the user's resource cost and its tab lifecycle is independent
of the backend. Bind narrowly, authorize every command, protect loopback state
against cross-site requests, and define startup, shutdown, and stale-job behavior.

### Embedded webview

Use an embedded webview when a native shell needs tighter window, menu, packaging,
or OS integration while retaining a web UI. Count the complete browser process
group, not just the host process. Share one environment where supported, avoid
duplicate controls and user-data folders, suspend or lower the target for
inactive views, keep messages small and batched, and profile the actual page.
Load framework-specific WebView2 guidance for Windows implementation details.

### Native UI

Prefer a native surface for an all-day editor, strict memory floor, low-latency
text input, deep accessibility, or platform behavior that is central to the
product. Native does not mean identical pixels across operating systems; retain
shared tokens and behavior while allowing native menus, input, scaling, and
dialogs.

### HTA

Treat HTA as a legacy or archival experiment only. Its old trusted HTML
application model is not a modern security, rendering, packaging, or memory
baseline. Do not select it as the production answer to a high-RAM webview.

## Choose the implementation layer

- Keep an existing product core unless a measured boundary requires a rewrite.
  UI memory is dominated by the surface and its renderer; adding Rust, Go, C++,
  or another service does not make a browser process disappear.
- On Windows, C# or C++ are direct WinUI 3 paths; Win32 remains appropriate when
  a lower-level native surface is the requirement. Rust through `windows-rs` is
  reasonable when the core, ownership model, or existing platform layer justifies
  the interop cost. Go is a good local backend or service choice, not an
  automatic native-UI choice. Do not choose C3 or any other niche layer for a
  memory promise without a supported UI stack and a measured benefit.
- Keep capability-heavy file, printer, process, and network work behind a small
  native boundary. Give the web side narrow commands and explicit cancellation;
  do not expose an object graph or ambient filesystem access.

## One review gate

Before implementation, write one short decision record containing the target
surface, workload and budgets, measured baseline, selected layer, rejected
alternatives, security/lifecycle boundary, and the next falsifiable experiment.
After that review, run the smallest useful prototype and revise only when new
measurements change the decision.

## Report

Report process identity, measurement method, comparable scenarios, missing data,
and the recommendation separately. A backend-only number is not a BUI total;
an early process exit is not a low-memory result; and a smaller executable is not
proof of a smaller working set.

## Reference

- [BUI: The UI Solution We Already Had](https://shreyam1008.com.np/log/local-web-surfaces/)
- [WebView2 performance best practices](https://learn.microsoft.com/en-us/microsoft-edge/webview2/concepts/performance)
- [WebView2 process model](https://learn.microsoft.com/en-us/microsoft-edge/webview2/concepts/process-model)
- [Windows app development](https://learn.microsoft.com/en-us/windows/apps/)
- [HTA:APPLICATION object](https://learn.microsoft.com/en-us/previous-versions/ms536495%28v%3Dvs.85%29)
