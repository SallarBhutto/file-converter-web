import { tools } from "@/lib/tools";

/**
 * Registry of public, indexable routes. sitemap.xml is generated from this
 * list. Tool routes come from the tool registry, so a tool is only listed
 * once it genuinely exists.
 */
export interface SiteRoute {
  path: string;
  changeFrequency: "daily" | "weekly" | "monthly" | "yearly";
  priority: number;
}

export const siteRoutes: readonly SiteRoute[] = [
  { path: "/", changeFrequency: "weekly", priority: 1 },
  ...tools.map<SiteRoute>((tool) => ({
    path: tool.path,
    changeFrequency: "monthly",
    priority: 0.9,
  })),
];
