import type { Metadata } from "next";
import Link from "next/link";

import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { PdfToJpgConverter } from "@/features/pdf-to-jpg/components/pdf-to-jpg-converter";
import { JPEG_QUALITY_PRESETS } from "@/features/pdf-to-jpg/quality-presets";
import { buildPageMetadata } from "@/lib/seo/metadata";
import { getRelatedTools } from "@/lib/tools";

const PATH = "/pdf-to-jpg";

export const metadata: Metadata = buildPageMetadata({
  title: "PDF to JPG Converter – Free & Private",
  description:
    "Convert PDF pages to high-quality JPG images directly in your browser. Free, private, and no file uploads required.",
  path: PATH,
});

const steps = [
  "Select your PDF, or drag it onto the page.",
  "Choose a JPG quality: Smaller File, Balanced, or Best Quality.",
  "Convert the document. Each page is rendered one at a time.",
  "Download individual pages, or download all JPGs as a ZIP.",
];

const faqs = [
  {
    question: "Is my PDF uploaded?",
    answer:
      "No. The PDF is opened and rendered by your browser using PDF.js. This site has no upload endpoint, and the document's contents never leave your device.",
  },
  {
    question: "Can I convert a multi-page PDF?",
    answer:
      "Yes. Every page is converted into its own JPG. Pages are processed one after another so long documents stay within your browser's memory, and you can download them individually or as one ZIP file.",
  },
  {
    question: "Can I choose JPG quality?",
    answer:
      "Yes. Pick Smaller File, Balanced, or Best Quality before converting. You can change the setting and convert again without reselecting the file.",
  },
  {
    question: "Does this work on mobile?",
    answer:
      "Yes. On phones and tablets the Choose PDF button opens the normal file picker. Very large documents may be slower on mobile devices because they have less memory available.",
  },
  {
    question: "What happens to my file after conversion?",
    answer:
      "Nothing is stored. The PDF and the JPG images exist only in your browser's memory while this page is open. Choosing another file, pressing Remove, or closing the tab releases them.",
  },
  {
    question: "Can I convert a password-protected PDF?",
    answer:
      "Not yet. Encrypted PDFs are detected and reported with a clear message. Remove the password in your PDF application first, then convert the unlocked copy.",
  },
];

export default function PdfToJpgPage() {
  const relatedTools = getRelatedTools(PATH);

  return (
    <>
      <section aria-labelledby="page-heading" className="border-b border-zinc-200">
        <Container className="py-12 sm:py-16">
          <h1
            id="page-heading"
            className="max-w-3xl text-3xl font-semibold tracking-tight text-zinc-900 sm:text-4xl"
          >
            Convert PDF to JPG Online
          </h1>
          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-zinc-600">
            Turn each page of a PDF into a JPG image. The conversion runs inside your browser, so
            this site never receives or uploads your document.
          </p>
        </Container>
      </section>

      <section aria-label="PDF to JPG converter" className="bg-zinc-50">
        <Container className="py-10 sm:py-14">
          <PdfToJpgConverter />
        </Container>
      </section>

      <section aria-labelledby="how-to-heading">
        <Container className="py-14 sm:py-16">
          <SectionHeading id="how-to-heading" title="How to convert PDF to JPG" />
          <ol className="mt-6 max-w-2xl list-decimal space-y-3 pl-6 text-base leading-relaxed text-zinc-700">
            {steps.map((step) => (
              <li key={step}>{step}</li>
            ))}
          </ol>
        </Container>
      </section>

      <section aria-labelledby="privacy-heading" className="border-t border-zinc-200">
        <Container className="py-14 sm:py-16">
          <SectionHeading
            id="privacy-heading"
            title="Private PDF conversion"
            description="Most online converters send your file to a server. This tool does not. Your browser reads the PDF, draws each page onto a canvas, and encodes the JPG locally. There is no upload, no queue, and no copy kept anywhere. Once you close the tab, the files are gone."
          />
        </Container>
      </section>

      <section aria-labelledby="quality-heading" className="border-t border-zinc-200">
        <Container className="py-14 sm:py-16">
          <SectionHeading
            id="quality-heading"
            title="JPG quality"
            description="JPG is a lossy format: lower quality settings discard more fine detail in exchange for smaller files. Pages are rendered at 150 DPI, so the setting changes compression, not resolution."
          />
          <dl className="mt-8 grid gap-6 sm:grid-cols-3">
            {JPEG_QUALITY_PRESETS.map((preset) => (
              <div key={preset.id}>
                <dt className="font-semibold text-zinc-900">{preset.label}</dt>
                <dd className="mt-1 text-sm leading-relaxed text-zinc-600">{preset.description}</dd>
              </div>
            ))}
          </dl>
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
            title="More tools"
            description={
              relatedTools.length > 0
                ? "Other converters that run in your browser."
                : "PDF to JPG is the first tool on File Converter Web. More converters are on the way, each with its own page as it ships."
            }
          />
          {relatedTools.length > 0 ? (
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
          ) : null}
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
