# File Converter Web — Architecture

Technical source of truth. Product intent is in [product.md](product.md);
coding rules in [coding-standards.md](coding-standards.md).

## Intended Stack

When implementation begins:

- Next.js (App Router)
- React
- TypeScript
- Tailwind CSS
- npm

Do not pin exact versions in this document. Use the latest stable, mutually
compatible releases at implementation time and record any notable version
constraints in [decisions.md](decisions.md).

## High-Level Architecture

```text
Next.js application

Server-rendered layer
├── page structure
├── SEO content
├── metadata
├── navigation
├── informational content
└── related tool links

Client-side tool layer
├── uploader
├── validation
├── processing controls
├── progress
├── preview
└── downloads

Browser processing layer
├── PDF.js
├── Canvas / OffscreenCanvas where useful
├── Web Workers where useful
├── Blob
├── Object URLs
└── ZIP generation when required
```

## Browser-Only Rule

File conversion and compression happen inside the browser. This is a hard
architectural rule (see D001 in [decisions.md](decisions.md)).

Do not build:

- upload APIs
- processing servers
- background conversion workers on servers
- cloud object storage
- database-backed conversion jobs

unless a future decision in `decisions.md` explicitly approves it.

## No Backend By Default

Next.js server capabilities (Server Components, static rendering, metadata,
sitemap/robots routes) are used for rendering and SEO infrastructure only.
They must not receive, store, or process user documents.

If a Route Handler or Server Action is ever added, it must not accept file
bodies from the converter UI.

## PDF Processing

Use Mozilla PDF.js (`pdfjs-dist`) for PDF page rendering.

Conceptual pipeline:

```text
File
→ validate
→ PDF.js
→ page
→ canvas
→ encode target format
→ Blob
→ downloadable result
```

PDF libraries must be lazy-loaded (dynamic import) so they stay out of the
initial page bundle. The PDF.js worker must be configured to run as a real
Web Worker, not the main-thread fallback.

### How PDF.js is wired (implemented)

- `src/lib/pdf/loader.ts` is the only module that imports `pdfjs-dist`, and
  it does so with a dynamic `import()` inside `openPdfDocument()`. The
  library therefore lives in its own chunk that is fetched the first time a
  user selects a PDF, never on page load and never on unrelated routes.
- `scripts/copy-pdfjs-assets.mjs` runs before `next dev` and `next build`
  and copies the worker plus every support directory PDF.js fetches on
  demand from `node_modules` into the git-ignored `public/pdfjs/`. Each
  directory maps to one `getDocument()` option:

  | Directory | Option | Purpose |
  | --- | --- | --- |
  | `cmaps/` | `cMapUrl` (+ `cMapPacked`) | predefined CMaps for CJK fonts |
  | `standard_fonts/` | `standardFontDataUrl` | fallbacks for non-embedded fonts |
  | `iccs/` | `iccUrl` | CMYK ICC profile for colour conversion |
  | `wasm/` | `wasmUrl` | OpenJPEG (JPX), JBIG2 and qcms (ICC) decoders |

  `workerSrc` points at `/pdfjs/pdf.worker.min.mjs`, so the worker is a real
  module Worker served by Next.js. The `quickjs-eval.*` files belong to the
  optional scripting sandbox and are not copied. No CDN is involved.
- `src/lib/pdf/canvas-limits.ts` decides output size. Pages render at
  150 DPI relative to the PDF's 72 pt/inch, subject to two independent caps:
  `MAX_CANVAS_PIXELS` (16,777,216 px of *area*, the size of a 4096 × 4096
  square, any shape) and `MAX_CANVAS_SIDE` (8192 px per side). The scale is
  reduced uniformly until both hold, so aspect ratio is preserved and
  ordinary pages are untouched. Device pixel ratio is ignored because the
  output is a file.
- `src/lib/pdf/renderer.ts` renders one page into a caller-owned canvas,
  encodes it with `canvas.toBlob` for any raster format, and optionally
  draws a downscaled JPEG preview from the same canvas before it is reused.
  It rejects the result if the browser silently substituted PNG for an
  encoder it lacks (older Safari and WebP), surfacing an "unsupported"
  product error instead of a mislabelled file.
- Page background is chosen by `src/lib/pdf/background.ts`. PDF.js paints
  opaque white behind every page by default and the PDF imaging model treats
  a page as opaque paper, so every format, PNG included, renders on white.
  A "transparent" plan exists for a deliberate future option, not because
  PDF pages are transparent.
- The three PDF-to-image tools share `src/features/pdf-to-image/`: one hook,
  one page loop, one converter island, and one server-rendered page layout.
  `formats.ts` holds the only per-format differences (MIME type, extension,
  quality presets and their encoder values, background). Adding a raster
  format means adding one config entry, one route with its content, and one
  registry entry in `src/lib/tools.ts`.
- Result previews are separate small JPEGs (longest side 480 px, quality
  0.7), never the full-size download image, so the browser only decodes
  thumbnails for display. Each result owns two object URLs, one per image,
  revoked together on reset, replacement, cancellation, restart and unmount.
- Library exceptions are mapped to product errors by name in
  `src/lib/pdf/errors.ts`; UI code never sees PDF.js error types.

## Image Processing

Prefer native browser APIs first:

- Canvas
- OffscreenCanvas
- `createImageBitmap`
- Blob
- Object URLs

Add third-party libraries only where they provide a clear benefit the platform
cannot (for example, better PNG compression than `canvas.toBlob` offers).
Follow the dependency checklist in [coding-standards.md](coding-standards.md).

### ZIP downloads (implemented)

Multi-file downloads use `fflate`, imported dynamically only when the user
clicks "Download All". Entries are stored rather than deflated because
JPEG/PNG/WebP data does not compress further, and files are fed in one at a
time so at most one page's bytes are duplicated while the archive is built.

## Image → PDF

A lightweight client-side PDF library such as `pdf-lib` may be used when
implementation reaches this feature. This is not locked in. Verify current
suitability, maintenance status, and bundle size at implementation time and
record the choice in `decisions.md`.

## Memory Management

Browser memory is the main constraint of the browser-only model. Rules:

- Never process an unlimited number of pages simultaneously.
- Prefer sequential or controlled-concurrency processing.
- Avoid unnecessary duplicate ArrayBuffers (do not read the same file twice,
  do not copy buffers to pass them around when transfer is possible).
- Avoid base64 for large binary content.
- Prefer Blob and Object URLs.
- Revoke object URLs when no longer needed (on result removal, reset, unmount).
- Release canvas resources where possible (size canvases to 0 or drop
  references after encoding).
- Avoid retaining full-resolution previews. Previews should be downscaled.
- Large files may require limits or user guidance rather than silent failure.
- A large conversion must not freeze the entire UI.

Every processing feature must be reasoned through against this list before it
is considered complete.

## Web Workers

The architecture should support moving CPU-heavy work into Web Workers.
Workers are especially relevant for:

- PDF rendering
- image transformations
- compression
- batch processing

Do not move everything into workers prematurely if it makes implementation
unnecessarily complex. Start with the main thread plus PDF.js's own worker,
keep processing code free of DOM dependencies, and migrate to workers when
measurements show UI blocking.

## Component Boundaries

```text
UI components
        ↓
feature orchestration
        ↓
processing services/utilities
        ↓
browser APIs/libraries
```

React components should not contain large amounts of low-level PDF or image
processing code. Processing code should be callable without React and should
not know about component state.

## Suggested Project Structure

Guidance, not an immutable structure:

```text
src/
  app/            # routes, layouts, metadata, sitemap, robots
  components/
    layout/       # header, footer, navigation
    tool/         # dropzone, progress, results (shared tool UI)
    ui/           # small primitives (button, select)
  features/
    pdf-to-image/ # shared PDF → JPG/PNG/WebP feature, format config per tool
  lib/
    files/        # validation, naming, size formatting
    pdf/          # PDF.js loading and rendering
    image/        # canvas encoding, compression
    seo/          # metadata helpers, site URL config
  types/
```

Each tool under `features/` should reuse shared `lib/` processing rather than
duplicating pipelines.
