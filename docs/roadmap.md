# File Converter Web — Roadmap

Roadmap items are directional and can change. Nothing below is implemented
unless stated. Phase boundaries exist to enforce D007 (build incrementally)
in [decisions.md](decisions.md).

## Phase 0 — Foundation (current)

- knowledge base (this directory) ✔
- Next.js project initialization ✔
- design foundation (layout, typography, Tailwind setup) ✔
- SEO foundation (metadata defaults, sitemap, robots, site URL config) ✔
- processing architecture (lib boundaries, lazy-loading pattern) — established with the first tool

## Phase 1 — First Vertical Slice: PDF → JPG

The first complete tool. It must establish the patterns every later tool
reuses:

- browser-only file handling
- PDF.js integration (lazy-loaded, real worker)
- progress
- preview
- downloads (single page and ZIP)
- memory-management pattern (see [architecture.md](architecture.md))
- responsive UX
- SEO tool-page pattern (see [seo.md](seo.md))

## Phase 2 — PDF to Image

- PDF → PNG
- PDF → WebP

Reuse the shared PDF rendering pipeline. These should be thin variants of the
Phase 1 tool, differing only in encoder and content.

## Phase 3 — Image to PDF

- JPG → PDF
- PNG → PDF
- WebP → PDF
- eventually mixed image batches

Include where useful:

- reorder
- page sizing
- orientation
- margins

## Phase 4 — Image Compression

- Compress JPG
- Compress PNG
- Compress WebP

Use preset-based controls (see [ui-ux.md](ui-ux.md)) and show before/after
sizes.

## Phase 5 — PDF Compression

Investigate appropriate browser-side techniques before committing to an
approach. PDF compression is more nuanced than image compression.

Potential modes:

- light optimization
- balanced
- maximum/rasterized

Aggressive compression may affect:

- selectable text
- links
- vector content
- forms

The UI must warn about these trade-offs. Do not implement this incorrectly
just to satisfy the roadmap. If a good browser-side approach is not viable,
record that in `decisions.md` rather than shipping a misleading tool.

## Phase 6 — SEO Expansion

After tools work:

- strengthen internal linking
- refine tool-specific content
- monitor Search Console
- add genuinely useful tool pages based on demand
- improve page performance based on real measurements

## Phase 7 — Monetization

After meaningful traffic:

- limited advertising
- tasteful placements
- no fake download UI
- preserve Core Web Vitals

Potential optional paid offering later. Requires a new decision entry before
implementation.

## Future

Possible, not committed:

- image conversion utilities (JPG ↔ WebP, PNG ↔ JPG)
- resizing
- batch workflows
- presets
- metadata tools
- offline/PWA capabilities

Do not build future items prematurely.
