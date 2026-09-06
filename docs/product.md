# File Converter Web — Product

Source of truth for what the product is and why. Technical design lives in
[architecture.md](architecture.md); search strategy in [seo.md](seo.md).

## Product Purpose

File Converter Web is a free, privacy-first collection of browser-based file
conversion and compression tools.

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

## Initial Tool Categories

These are the committed tool set. None are implemented yet; see
[roadmap.md](roadmap.md) for build order.

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

- "Processed securely in your browser"
- "Your files never leave your device"
- "No uploads"
- "No file storage"

Only use statements that remain technically accurate for the tool they appear
on. If any future decision moves processing off-device for a tool, that tool's
messaging must change in the same task.
