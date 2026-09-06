# File Converter Web

Free, privacy-first file conversion and compression tools that run entirely in
the browser. **Your files never leave your device.** Nothing is uploaded,
processed on a server, or stored.

## Status

**Three PDF-to-image tools are implemented:** `/pdf-to-jpg`, `/pdf-to-png`,
and `/pdf-to-webp`. Pick a PDF, choose a quality preset where the format has
one, and download each page as an image or all pages as a ZIP. Everything
runs in the browser with PDF.js; the three tools share one converter and
differ only by a small format configuration.

No image-to-PDF or compression tool exists yet. See
[docs/roadmap.md](docs/roadmap.md) for the order the remaining tools will be
built in.

## Stack

- Next.js 16 (App Router, Server Components by default)
- React 19
- TypeScript (strict)
- Tailwind CSS 4
- PDF.js (`pdfjs-dist`) for PDF rendering, loaded on demand
- fflate for in-browser ZIP creation, loaded on demand
- Vitest for unit tests
- ESLint, npm

## Local development

```bash
npm install
npm run dev
```

Open http://localhost:3000.

`npm run dev` and `npm run build` first run `scripts/copy-pdfjs-assets.mjs`,
which copies the PDF.js worker, CMaps, standard fonts, ICC profile, and WASM
decoders from `node_modules` into the git-ignored `public/pdfjs/` directory. Next.js serves
them as static files; nothing is fetched from a CDN.

Copy `.env.example` to `.env.local` if you need to override the site origin.

The public site origin drives canonical URLs, Open Graph URLs, `robots.txt`,
and `sitemap.xml`. It resolves from `NEXT_PUBLIC_SITE_URL`, then Vercel's
`VERCEL_PROJECT_PRODUCTION_URL` and `VERCEL_URL`, then `http://localhost:3000`.
`NEXT_PUBLIC_SITE_URL` must be set to the real canonical domain once a custom
production domain is chosen; it always takes precedence over Vercel-generated
domains. These variables are not secrets.

## Quality commands

```bash
npm run lint
npm run typecheck
npm test
npm run build
```

Run all four before considering a change complete. Tests cover pure logic
only: file validation, size formatting, filename generation, raster format
configuration and quality presets, progress, canvas background planning, and
render-dimension safeguards. See
[docs/testing.md](docs/testing.md).

## Project knowledge base

`CLAUDE.md` is the entry point for project rules and imports the documents in
`docs/`:

- [product.md](docs/product.md) — what the product is and why
- [architecture.md](docs/architecture.md) — browser-only processing, stack, boundaries
- [seo.md](docs/seo.md) — routes, metadata, sitemap rules
- [coding-standards.md](docs/coding-standards.md)
- [ui-ux.md](docs/ui-ux.md)
- [testing.md](docs/testing.md)
- [roadmap.md](docs/roadmap.md)
- [decisions.md](docs/decisions.md) — decision log

`AGENTS.md` holds a block that Next.js manages automatically; it is not part
of the project knowledge base.
