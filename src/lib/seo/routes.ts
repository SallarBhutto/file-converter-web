/**
 * Registry of public, indexable routes. sitemap.xml is generated from this
 * list, so only add a route here once the page genuinely exists.
 */
export interface SiteRoute {
  path: string;
  changeFrequency: "daily" | "weekly" | "monthly" | "yearly";
  priority: number;
}

export const siteRoutes: readonly SiteRoute[] = [
  { path: "/", changeFrequency: "weekly", priority: 1 },
];
