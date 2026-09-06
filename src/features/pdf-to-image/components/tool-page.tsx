import Link from "next/link";

import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { getRelatedTools } from "@/lib/tools";

import { getRasterFormat, type RasterOutputFormat } from "../formats";
import { PdfToImageConverter } from "./pdf-to-image-converter";

export interface ToolPageFaq {
  question: string;
  answer: string;
}

export interface ToolPagePoint {
  title: string;
  body: string;
}

export interface PdfToImageToolPageProps {
  path: string;
  format: RasterOutputFormat;
  heading: string;
  intro: string;
  steps: readonly string[];
  privacy: string;
  /** Format-specific explanation. Quality presets are listed automatically when the format has them. */
  formatSection: {
    title: string;
    description: string;
    points?: readonly ToolPagePoint[];
  };
  faqs: readonly ToolPageFaq[];
}

/**
 * Server-rendered layout shared by the PDF-to-image tool pages. Every piece
 * of SEO content arrives as props from the route, so each page stays
 * explicit while the structure, converter island, and related links are
 * defined once.
 */
export function PdfToImageToolPage({
  path,
  format,
  heading,
  intro,
  steps,
  privacy,
  formatSection,
  faqs,
}: PdfToImageToolPageProps) {
  const config = getRasterFormat(format);
  const relatedTools = getRelatedTools(path);

  return (
    <>
      <section aria-labelledby="page-heading" className="border-b border-zinc-200">
        <Container className="py-12 sm:py-16">
          <h1
            id="page-heading"
            className="max-w-3xl text-3xl font-semibold tracking-tight text-zinc-900 sm:text-4xl"
          >
            {heading}
          </h1>
          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-zinc-600">{intro}</p>
        </Container>
      </section>

      <section aria-label={`PDF to ${config.label} converter`} className="bg-zinc-50">
        <Container className="py-10 sm:py-14">
          <PdfToImageConverter format={format} />
        </Container>
      </section>

      <section aria-labelledby="how-to-heading">
        <Container className="py-14 sm:py-16">
          <SectionHeading id="how-to-heading" title={`How to convert PDF to ${config.label}`} />
          <ol className="mt-6 max-w-2xl list-decimal space-y-3 pl-6 text-base leading-relaxed text-zinc-700">
            {steps.map((step) => (
              <li key={step}>{step}</li>
            ))}
          </ol>
        </Container>
      </section>

      <section aria-labelledby="privacy-heading" className="border-t border-zinc-200">
        <Container className="py-14 sm:py-16">
          <SectionHeading id="privacy-heading" title="Private PDF conversion" description={privacy} />
        </Container>
      </section>

      <section aria-labelledby="format-heading" className="border-t border-zinc-200">
        <Container className="py-14 sm:py-16">
          <SectionHeading
            id="format-heading"
            title={formatSection.title}
            description={formatSection.description}
          />
          {formatSection.points ? (
            <dl className="mt-8 grid gap-6 sm:grid-cols-3">
              {formatSection.points.map((point) => (
                <div key={point.title}>
                  <dt className="font-semibold text-zinc-900">{point.title}</dt>
                  <dd className="mt-1 text-sm leading-relaxed text-zinc-600">{point.body}</dd>
                </div>
              ))}
            </dl>
          ) : null}
          {config.qualityPresets ? (
            <dl className="mt-8 grid gap-6 sm:grid-cols-3">
              {config.qualityPresets.map((preset) => (
                <div key={preset.id}>
                  <dt className="font-semibold text-zinc-900">{preset.label}</dt>
                  <dd className="mt-1 text-sm leading-relaxed text-zinc-600">{preset.description}</dd>
                </div>
              ))}
            </dl>
          ) : null}
        </Container>
      </section>

      <section aria-labelledby="faq-heading" className="border-t border-zinc-200">
        <Container className="py-14 sm:py-16">
          <SectionHeading id="faq-heading" title="Frequently asked questions" />
          <dl className="mt-8 max-w-3xl space-y-8">
            {faqs.map((faq) => (
              <div key={faq.question}>
                <dt className="text-base font-semibold text-zinc-900">{faq.question}</dt>
                <dd className="mt-2 leading-relaxed text-zinc-600">{faq.answer}</dd>
              </div>
            ))}
          </dl>
        </Container>
      </section>

      <section aria-labelledby="more-tools-heading" className="border-t border-zinc-200 bg-zinc-50">
        <Container className="py-14 sm:py-16">
          <SectionHeading
            id="more-tools-heading"
            title="Related tools"
            description="Other converters that run in your browser."
          />
          <ul className="mt-6 flex flex-wrap gap-3">
            {relatedTools.map((tool) => (
              <li key={tool.slug}>
                <Link
                  href={tool.path}
                  className="inline-flex min-h-11 items-center rounded-md border border-zinc-300 bg-white px-4 text-sm font-medium text-zinc-900 hover:bg-zinc-100"
                >
                  {tool.name}
                </Link>
              </li>
            ))}
          </ul>
          <p className="mt-6">
            <Link href="/" className="text-sm font-medium text-accent underline-offset-4 hover:underline">
              See all tools
            </Link>
          </p>
        </Container>
      </section>
    </>
  );
}
