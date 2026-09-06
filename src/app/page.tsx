import type { Metadata } from "next";
import Link from "next/link";

import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { buildPageMetadata } from "@/lib/seo/metadata";
import { siteConfig } from "@/lib/seo/site-config";
import {
  getToolsByCategory,
  plannedTools,
  toolCategories,
  toolCategoryLabels,
} from "@/lib/tools";

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

const liveCategories = toolCategories.filter((category) => getToolsByCategory(category).length > 0);
const plannedCategories = toolCategories.filter((category) => plannedTools[category].length > 0);

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

      <section aria-labelledby="tools-heading" className="border-b border-zinc-200 bg-zinc-50">
        <Container className="py-16 sm:py-20">
          <SectionHeading
            id="tools-heading"
            title="Tools"
            description="Each tool gets its own page here as it becomes available. More converters are on the way."
          />
          {liveCategories.map((category) => (
            <div key={category} className="mt-10">
              <h3 className="text-sm font-semibold uppercase tracking-wide text-zinc-500">
                {toolCategoryLabels[category]}
              </h3>
              <ul className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {getToolsByCategory(category).map((tool) => (
                  <li key={tool.slug}>
                    <Link
                      href={tool.path}
                      className="block rounded-lg border border-zinc-200 bg-white p-5 transition-colors hover:border-zinc-400"
                    >
                      <span className="block text-base font-semibold text-zinc-900">{tool.name}</span>
                      <span className="mt-1 block text-sm text-zinc-600">{tool.description}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {plannedCategories.length > 0 ? (
            <>
              <h3 className="mt-12 text-sm font-semibold uppercase tracking-wide text-zinc-500">
                Planned
              </h3>
              <div className="mt-4 grid gap-6 sm:grid-cols-3">
                {plannedCategories.map((category) => (
                  <div key={category}>
                    <p className="text-sm font-medium text-zinc-700">{toolCategoryLabels[category]}</p>
                    <ul className="mt-2 space-y-1 text-sm text-zinc-500">
                      {plannedTools[category].map((name) => (
                        <li key={name}>{name}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </>
          ) : null}
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
    </>
  );
}
