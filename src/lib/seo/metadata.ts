import type { Metadata } from "next";

import { siteConfig } from "./site-config";

interface PageMetadataInput {
  title: string;
  description: string;
  /** Site-relative path used for the canonical URL, e.g. "/pdf-to-jpg". */
  path: string;
}

/**
 * Builds per-page metadata with a canonical URL and Open Graph fields.
 * Relative URLs resolve against `metadataBase` set in the root layout.
 */
export function buildPageMetadata({
  title,
  description,
  path,
}: PageMetadataInput): Metadata {
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      title,
      description,
      url: path,
      siteName: siteConfig.name,
      type: "website",
      locale: siteConfig.locale,
    },
  };
}
