/**
 * Central site configuration. Product copy and navigation live here so that
 * layout, metadata, and SEO routes never hard-code them.
 */
export const siteConfig = {
  name: "File Converter Web",
  tagline: "Privacy-first browser-based file conversion and compression tools.",
  description:
    "Free file conversion and compression tools that run entirely in your browser. Your files never leave your device.",
  locale: "en_US",
  navigation: [{ label: "Home", href: "/" }],
} as const;
