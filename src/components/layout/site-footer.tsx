import { Container } from "@/components/ui/container";
import { siteConfig } from "@/lib/seo/site-config";

export function SiteFooter() {
  return (
    <footer className="border-t border-zinc-200 bg-white">
      <Container className="flex flex-col gap-2 py-8 text-sm text-zinc-500 sm:flex-row sm:items-center sm:justify-between">
        <p className="font-medium text-zinc-700">{siteConfig.name}</p>
        <p>Built to process files in your browser, not on a server.</p>
      </Container>
    </footer>
  );
}
