import Link from "next/link";

import { Container } from "@/components/ui/container";
import { siteConfig } from "@/lib/seo/site-config";

export function SiteHeader() {
  return (
    <header className="border-b border-zinc-200 bg-white">
      <Container className="flex h-14 items-center justify-between">
        <Link
          href="/"
          className="-mx-2 inline-flex min-h-11 items-center rounded-sm px-2 text-base font-semibold tracking-tight text-zinc-900"
        >
          {siteConfig.name}
        </Link>
        <nav aria-label="Primary">
          <ul className="flex items-center gap-6 text-sm">
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
      </Container>
    </header>
  );
}
