import { Container } from "@/components/ui/container";
import { siteConfig } from "@/lib/seo/site-config";

/** Minimal footer: wordmark and one descriptive line. Links are added only once their routes exist. */
export function SiteFooter() {
  return (
    <footer className="border-t border-zinc-200 bg-white">
      <Container className="py-8 text-sm text-zinc-500">
        <p className="font-semibold tracking-tight text-zinc-900">{siteConfig.name}</p>
        <p className="mt-1">{siteConfig.footerLine}</p>
      </Container>
    </footer>
  );
}
