/**
 * Central site configuration. Product copy lives here so that layout,
 * metadata, and SEO routes never hard-code it. Navigation derives from the
 * tool registry in `src/lib/tools.ts`, so it only ever points at live routes.
 *
 * "FileHush" is the public brand. The repository and package keep the
 * technical name `file-converter-web`. The production origin is not stored
 * here; it comes from `NEXT_PUBLIC_SITE_URL` via `getSiteUrl()`.
 */
export const siteConfig = {
  name: "FileHush",
  tagline: "Free file tools. No sign-up. Your files never leave your device.",
  /** Homepage and default document title. */
  title: "FileHush – Free File Converter & Compressor",
  description:
    "Convert and compress PDFs and images for free with FileHush. No sign-up or file uploads. Your files are processed locally in your browser.",
  /** Short line for the footer. */
  footerLine: "Private, browser-based file tools.",
  locale: "en_US",
} as const;
