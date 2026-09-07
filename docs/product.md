# FileHush — Product

Source of truth for what the product is and why. Technical design lives in
[architecture.md](architecture.md); search strategy in [seo.md](seo.md).

## Brand and Domain

- Public brand: **FileHush**
- Production domain: **filehush.org** (`https://filehush.org`), supplied to
  the app only through `NEXT_PUBLIC_SITE_URL` (see D008 and D010 in
  [decisions.md](decisions.md))
- Repository, package and project folder: `file-converter-web`. This is a
  technical name and is not shown to users.

Core positioning:

> Free file tools. No sign-up. Your files never leave your device.

The three primary benefits:

1. Free to use
2. No sign-up required
3. File processing happens locally in the browser

This positioning is brand strategy, not page copy. On any single page each
benefit is stated once where it matters (the hero and the privacy section on
the homepage; the trust line and the dropzone note on tool pages), and the
full tagline is not repeated section by section. Each section has one job:
the hero explains the product, the tools section says what users can do,
the privacy section explains the privacy model, and the footer identifies
the brand.

Prefer "No sign-up required" over "No login required" in marketing copy.

## Product Purpose

FileHush is a free, privacy-first collection of browser-based file
conversion and compression tools. No account exists and none is required;
every current tool is free and adds no watermark.

Key differentiator: **Your files never leave your device.**

Conversions happen locally using browser capabilities whenever technically
possible. The product should feel substantially cleaner and more trustworthy
than spam-heavy converter websites.

## Core Product Principles

- browser-first
- privacy-first
- simple
- fast
- no unnecessary account creation
- no unnecessary uploads
- mobile-friendly
- SEO-friendly
- minimal infrastructure
- minimal operating cost
- trustworthy UI
- useful without registration

## Tool Categories

All ten tools below are implemented; see [roadmap.md](roadmap.md) for
build history and what comes next.

**PDF to Image**
- PDF → JPG
- PDF → PNG
- PDF → WebP

**Image to PDF**
- JPG → PDF
- PNG → PDF
- WebP → PDF
- eventually mixed images → PDF

**Compression**
- Compress JPG
- Compress PNG
- Compress WebP
- Compress PDF

## Possible Future Tools

Possibilities, not committed features:

- JPG → WebP
- PNG → WebP
- WebP → JPG
- PNG → JPG
- image resize
- image quality adjustment
- metadata removal

## Primary User Experience

A typical tool follows one linear flow:

```text
Land on tool page
→ select/drop file
→ configure a small number of understandable options
→ process locally
→ show progress
→ preview result
→ download result
```

No unnecessary wizard flows. No sign-up gates. No interstitials.

## Privacy

These are hard requirements, enforced by the browser-only rule in
[architecture.md](architecture.md):

- User file contents must not be sent to our server.
- User filenames should not be collected by analytics.
- Converted files should not be stored remotely.
- Temporary browser memory and object URLs must be released appropriately.
- If analytics are introduced later, they may track product usage (tool used,
  success/failure, coarse timing) but must not collect document contents or
  filenames.

## Monetization

**Phase 1 (current direction)**
- no ads
- no paid plan required
- focus on product quality and SEO

**Phase 2 (after traffic exists, not yet approved for implementation)**

Potential tasteful advertising. Ads must:

- remain outside critical converter controls
- never resemble download buttons
- never create misleading UI
- avoid accidental clicks
- avoid excessive layout shift
- remain limited in number
- not make the site feel spammy

Placement rules are in [ui-ux.md](ui-ux.md); performance rules in [seo.md](seo.md).

**Potential later monetization (not committed)**
- optional ad-free plan
- advanced batch functionality
- presets
- advanced compression controls

Do not assume these will be built.

## Product Positioning

Messaging themes:

- "Processed locally in your browser"
- "Your files never leave your device"
- "No file uploads"
- "FileHush does not send your files to our servers for processing"
- "Free to use", "No sign-up required"

Only use statements that remain technically accurate for the tool they appear
on. Avoid claims about browser or device internals that cannot be guaranteed
everywhere (for example "close the tab and nothing is left behind"); say what
FileHush does and does not do instead. If any future decision moves
processing off-device for a tool, that tool's messaging must change in the
same task.
