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
    pdf-to-jpg/   # orchestration for one tool
  lib/
    files/        # validation, naming, size formatting
    pdf/          # PDF.js loading and rendering
    image/        # canvas encoding, compression
    seo/          # metadata helpers, site URL config
  types/
```

Each tool under `features/` should reuse shared `lib/` processing rather than
duplicating pipelines.
