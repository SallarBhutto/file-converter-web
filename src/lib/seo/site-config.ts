/**
 * Central site configuration. Product copy lives here so that layout,
 * metadata, and SEO routes never hard-code it. Navigation derives from the
 * tool registry in `src/lib/tools.ts`, so it only ever points at live routes.
 */
export const siteConfig = {
  name: "File Converter Web",
  tagline: "Privacy-first browser-based file conversion and compression tools.",
  description:
    "Free file conversion and compression tools that run entirely in your browser. Your files never leave your device.",
  locale: "en_US",
} as const;
