# File Converter Web

Free, privacy-first file conversion and compression tools that run entirely in
the browser. **Your files never leave your device.** Nothing is uploaded,
processed on a server, or stored.

## Status

Foundation only. The Next.js application shell, layout, homepage, and SEO
infrastructure exist. **No converter is implemented yet.** The first tool,
PDF to JPG, is next; see [docs/roadmap.md](docs/roadmap.md).

## Stack

- Next.js 16 (App Router, Server Components by default)
- React 19
- TypeScript (strict)
- Tailwind CSS 4
- ESLint
- npm

## Local development

```bash
npm install
npm run dev
```

Open http://localhost:3000.

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
npm run build
```

Run all three before considering a change complete. There is no test suite
yet; one will be added when the first pure utility logic lands (see
[docs/testing.md](docs/testing.md)).

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
