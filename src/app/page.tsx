import type { Metadata } from "next";

import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { buildPageMetadata } from "@/lib/seo/metadata";
import { siteConfig } from "@/lib/seo/site-config";

export const metadata: Metadata = buildPageMetadata({
  // The root layout title template does not apply to the root segment, so the
  // homepage sets its full title explicitly.
  title: `Convert and compress files in your browser · ${siteConfig.name}`,
  description: siteConfig.description,
  path: "/",
});

const principles = [
  {
    title: "Runs in your browser",
    body: "Conversion and compression happen on your own device using built-in browser capabilities. There is no server doing the work.",
  },
  {
    title: "No uploads, no storage",
    body: "Your files are never sent to us and never stored anywhere. Close the tab and nothing is left behind.",
  },
  {
    title: "Free, with no account",
    body: "Open a tool, pick a file, download the result. No sign-up, no watermarks, no waiting in a queue.",
  },
];

const plannedTools = [
  { category: "PDF to image", items: ["PDF to JPG", "PDF to PNG", "PDF to WebP"] },
  { category: "Image to PDF", items: ["JPG to PDF", "PNG to PDF", "WebP to PDF"] },
  {
    category: "Compression",
    items: ["Compress JPG", "Compress PNG", "Compress WebP", "Compress PDF"],
  },
];

export default function HomePage() {
  return (
    <>
      <section aria-labelledby="hero-heading" className="border-b border-zinc-200">
        <Container className="py-20 sm:py-28">
          <p className="text-sm font-medium text-accent">{siteConfig.name}</p>
          <h1
            id="hero-heading"
            className="mt-3 max-w-3xl text-4xl font-semibold tracking-tight text-zinc-900 sm:text-5xl"
          >
            Convert and compress files without uploading them.
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-zinc-600">
            {siteConfig.tagline} Every tool runs locally in your browser, so your
            files never leave your device.
          </p>
        </Container>
      </section>

      <section aria-labelledby="privacy-heading">
        <Container className="py-16 sm:py-20">
          <SectionHeading
            id="privacy-heading"
            title="Private by design"
            description="Most online converters upload your document to a server, process it there, and keep a copy for a while. This site is built so that step never happens."
          />
          <ul className="mt-10 grid gap-8 sm:grid-cols-3">
            {principles.map((principle) => (
              <li key={principle.title}>
                <h3 className="text-base font-semibold text-zinc-900">
                  {principle.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-zinc-600">
                  {principle.body}
                </p>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <section aria-labelledby="tools-heading" className="border-t border-zinc-200 bg-zinc-50">
        <Container className="py-16 sm:py-20">
          <SectionHeading
            id="tools-heading"
            title="Tools"
            description="The first tool, PDF to JPG, is in development. Each tool gets its own page here as it becomes available."
          />
          <div className="mt-10 grid gap-8 sm:grid-cols-3">
            {plannedTools.map((group) => (
              <div key={group.category}>
                <h3 className="text-sm font-semibold uppercase tracking-wide text-zinc-500">
                  {group.category}
                </h3>
                <ul className="mt-3 space-y-1.5 text-sm text-zinc-700">
                  {group.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
