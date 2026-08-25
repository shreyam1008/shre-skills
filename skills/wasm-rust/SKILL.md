---
name: wasm-rust
description: Move hot computation to Rust + WebAssembly with wasm-bindgen / wasm-pack. Use when offloading CPU-heavy work (parsing, image/audio, simulation, crypto, math) from JS to WASM, and for the JS<->WASM boundary.
---

# Rust + WebAssembly

Run near-native Rust in the browser. WASM wins for **compute-heavy, long-running** work — not for DOM-bound or trivial tasks where the JS↔WASM boundary cost dominates.

## When WASM is worth it

- ✅ Heavy number crunching: image/audio/video processing, physics, simulation, compression, crypto, parsers, geometry.
- ✅ Workloads that run for milliseconds+ per call and touch large typed-array buffers.
- ✅ Code you want to share with a native/Rust backend.
- ❌ Small/occasional ops where boundary marshaling > the compute saved.
- ❌ DOM-heavy logic (WASM can't touch the DOM directly; it calls back into JS).

Rule of thumb: **fewer, bigger calls** beat many tiny calls.

WASM and WebGPU solve different bottlenecks. WASM runs CPU kernels in browser-managed linear memory; WebGPU submits sandboxed work to a browser-managed GPU device. Neither is “GPU Direct.” Profile first, keep transfer boundaries coarse, and preserve a JavaScript/CPU fallback when the support contract requires it. Use `low-level-web-rendering` to choose the renderer and `webgpu` for GPU pipelines.

## Toolchain

```bash
rustup target add wasm32-unknown-unknown
cargo install wasm-pack       # bundles wasm + JS glue + TS types

wasm-pack build --target web --release
# outputs pkg/: .wasm, JS bindings, .d.ts
```

- `--target web` → native ESM import; `--target bundler` → for webpack/Vite; `--target nodejs` for Node.
- `wasm-bindgen` generates the JS glue and TypeScript types automatically.

## Minimal crate

```toml
# Cargo.toml
[lib]
crate-type = ["cdylib"]

[dependencies]
wasm-bindgen = "0.2"

[profile.release]
opt-level = 3
lto = true          # smaller, faster binary
codegen-units = 1
```

```rust
use wasm_bindgen::prelude::*;

#[wasm_bindgen]
pub fn sum(data: &[f32]) -> f32 {   // &[f32] maps to a JS Float32Array view
    data.iter().sum()
}
```

```js
import init, { sum } from './pkg/my_crate.js';
await init();
sum(new Float32Array([1, 2, 3]));   // 6
```

## The boundary is the bottleneck — minimize copies

- Passing JS arrays as `&[T]` / `Vec<T>` **copies** data across the boundary. For big/hot buffers, keep data in WASM linear memory and operate in place.
- Pattern: allocate a buffer once in WASM, hand JS a typed-array **view** over `memory.buffer`, mutate in place, avoid re-copying each frame.
- Don't call a tiny WASM function in a tight JS loop — move the loop into Rust.
- Strings cost encoding/decoding; prefer numeric buffers for hot paths.

```rust
#[wasm_bindgen]
pub fn process_in_place(buf: &mut [u8]) { /* mutate, no return copy */ }
```

## Go faster: SIMD & threads

- **SIMD**: build with `RUSTFLAGS="-C target-feature=+simd128"` for 4–16x on vectorizable loops. Widely supported in modern browsers.
- **Threads**: `wasm-bindgen-rayon` + shared memory needs cross-origin isolation headers:
  - `Cross-Origin-Opener-Policy: same-origin`
  - `Cross-Origin-Embedder-Policy: require-corp`
- Run WASM in a **Web Worker** to keep the main thread responsive; `OffscreenCanvas` if it renders.

## Size & loading

- `wasm-opt` (via wasm-pack) shrinks output; enable `lto` + `opt-level = "z"`/`3`.
- Use `wee_alloc` or the default allocator depending on size vs speed needs.
- Serve `.wasm` with `Content-Type: application/wasm` so streaming compilation (`instantiateStreaming`) works.
- Lazy-load the module; `await init()` before first use.

## Debugging

- `console_error_panic_hook` to surface Rust panics in the JS console.
- `web-sys` / `js-sys` for typed access to browser/JS APIs from Rust.
- Profile with the browser Performance panel; confirm the boundary isn't the cost (look for many short WASM calls).

## Reference

- The `wasm-bindgen` book; `wasm-pack` docs; Rust and WebAssembly book (rustwasm.github.io).
- Vite: `vite-plugin-wasm` / `vite-plugin-top-level-await` for clean integration.
