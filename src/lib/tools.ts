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
];

export const toolCategoryLabels: Record<ToolCategory, string> = {
  "pdf-to-image": "PDF to image",
  "image-to-pdf": "Image to PDF",
  compression: "Compression",
};

/** Committed tools that have no route yet. Names only, never links. */
export const plannedTools: Record<ToolCategory, readonly string[]> = {
  "pdf-to-image": ["PDF to PNG", "PDF to WebP"],
  "image-to-pdf": ["JPG to PDF", "PNG to PDF", "WebP to PDF"],
  compression: ["Compress JPG", "Compress PNG", "Compress WebP", "Compress PDF"],
};

export function getRelatedTools(currentPath: string): readonly ToolDefinition[] {
  return tools.filter((tool) => tool.path !== currentPath);
}
