import Link from "next/link";

import { Container } from "@/components/ui/container";
import { siteConfig } from "@/lib/seo/site-config";
import { getToolsByCategory, toolCategories, toolCategoryLabels } from "@/lib/tools";

import { MobileNav, type MobileNavGroup } from "./mobile-nav";

/** Registry-derived groups for the mobile menu; categories with no live tool are skipped. */
function buildMobileGroups(): MobileNavGroup[] {
  return toolCategories
    .map((category) => ({
      label: toolCategoryLabels[category],
      links: getToolsByCategory(category).map((tool) => ({ label: tool.name, href: tool.path })),
    }))
    .filter((group) => group.links.length > 0);
}

/**
 * Site header. The brand link and the desktop row are server-rendered; the
 * compact menu for narrow screens is the only client-side piece and receives
 * its links as props, so both views derive from the same tool registry.
 */
export function SiteHeader() {
  return (
    <header className="relative border-b border-zinc-200 bg-white">
      <Container className="flex h-14 items-center justify-between gap-6">
        <Link
          href="/"
          className="-mx-2 inline-flex min-h-11 items-center rounded-sm px-2 text-base font-semibold tracking-tight text-zinc-900"
        >
          {siteConfig.name}
        </Link>
        <nav aria-label="Primary" className="hidden lg:block">
          <ul className="flex items-center gap-x-5 text-sm">
            {siteConfig.navigation.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="-mx-2 inline-flex min-h-11 items-center rounded-sm px-2 text-zinc-600 transition-colors hover:text-zinc-900"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <MobileNav groups={buildMobileGroups()} />
      </Container>
    </header>
  );
}
