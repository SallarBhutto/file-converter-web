export type ToolCategory = "pdf-to-image" | "image-to-pdf" | "compression";

export interface ToolDefinition {
  slug: string;
  path: `/${string}`;
  name: string;
  description: string;
  category: ToolCategory;
}

/**
 * Registry of tools that genuinely exist. Navigation, the homepage, related
 * tool links, and the sitemap all derive from this list, so a tool appears
 * everywhere at once and nothing links to a route that is not live.
 */
export const tools: readonly ToolDefinition[] = [
  {
    slug: "pdf-to-jpg",
    path: "/pdf-to-jpg",
    name: "PDF to JPG",
    description: "Turn every page of a PDF into a JPG image.",
    category: "pdf-to-image",
  },
  {
    slug: "pdf-to-png",
    path: "/pdf-to-png",
    name: "PDF to PNG",
    description: "Turn every page of a PDF into a lossless PNG image.",
    category: "pdf-to-image",
  },
  {
    slug: "pdf-to-webp",
    path: "/pdf-to-webp",
    name: "PDF to WebP",
    description: "Turn every page of a PDF into a compact WebP image.",
    category: "pdf-to-image",
  },
  {
    slug: "jpg-to-pdf",
    path: "/jpg-to-pdf",
    name: "JPG to PDF",
    description: "Combine one or more JPG photos into a PDF.",
    category: "image-to-pdf",
  },
  {
    slug: "png-to-pdf",
    path: "/png-to-pdf",
    name: "PNG to PDF",
    description: "Combine PNG images into a PDF without losing quality.",
    category: "image-to-pdf",
  },
  {
    slug: "webp-to-pdf",
    path: "/webp-to-pdf",
    name: "WebP to PDF",
    description: "Turn WebP images into a standard PDF document.",
    category: "image-to-pdf",
  },
];

export const toolCategoryLabels: Record<ToolCategory, string> = {
  "pdf-to-image": "PDF to image",
  "image-to-pdf": "Image to PDF",
  compression: "Compression",
};

export const toolCategories: readonly ToolCategory[] = ["pdf-to-image", "image-to-pdf", "compression"];

/** Committed tools that have no route yet. Names only, never links. */
export const plannedTools: Record<ToolCategory, readonly string[]> = {
  "pdf-to-image": [],
  "image-to-pdf": [],
  compression: ["Compress JPG", "Compress PNG", "Compress WebP", "Compress PDF"],
};

export function getToolsByCategory(category: ToolCategory): readonly ToolDefinition[] {
  return tools.filter((tool) => tool.category === category);
}

/** Tools in the same family first, then everything else. */
export function getRelatedTools(currentPath: string): readonly ToolDefinition[] {
  const current = tools.find((tool) => tool.path === currentPath);
  const others = tools.filter((tool) => tool.path !== currentPath);
  if (!current) return others;
  return [
    ...others.filter((tool) => tool.category === current.category),
    ...others.filter((tool) => tool.category !== current.category),
  ];
}
