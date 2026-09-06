/**
 * Copies the PDF.js worker and its on-demand support assets from node_modules
 * into public/pdfjs so Next.js serves them as static files. Runs before
 * `next dev` and `next build`. The output directory is git-ignored and is
 * regenerated from the installed pdfjs-dist version on every run, so the
 * files can never drift from the library that requests them.
 *
 * Directory → getDocument() option that references it:
 *   cmaps/           cMapUrl              predefined CMaps for CJK fonts
 *   standard_fonts/  standardFontDataUrl  fallbacks for non-embedded fonts
 *   iccs/            iccUrl               CMYK ICC profile for colour conversion
 *   wasm/            wasmUrl              OpenJPEG (JPX), JBIG2 and qcms (ICC)
 *                                         decoders plus their no-WASM fallbacks
 *
 * quickjs-eval.* in wasm/ belongs to the optional scripting sandbox
 * (pdf.sandbox), which this application does not load, so it is skipped.
 */
import { cpSync, mkdirSync, readdirSync, rmSync, writeFileSync } from "node:fs";
import { createRequire } from "node:module";
import path from "node:path";

const require = createRequire(import.meta.url);
const packageRoot = path.dirname(require.resolve("pdfjs-dist/package.json"));
const { version } = require("pdfjs-dist/package.json");
const outputDir = path.resolve("public/pdfjs");

const SUPPORT_DIRECTORIES = ["cmaps", "standard_fonts", "iccs"];
const WASM_EXCLUDE = /^quickjs-eval\./;

rmSync(outputDir, { recursive: true, force: true });
mkdirSync(outputDir, { recursive: true });

cpSync(
  path.join(packageRoot, "build/pdf.worker.min.mjs"),
  path.join(outputDir, "pdf.worker.min.mjs"),
);

for (const dir of SUPPORT_DIRECTORIES) {
  cpSync(path.join(packageRoot, dir), path.join(outputDir, dir), {
    recursive: true,
  });
}

mkdirSync(path.join(outputDir, "wasm"));
for (const file of readdirSync(path.join(packageRoot, "wasm"))) {
  if (WASM_EXCLUDE.test(file)) continue;
  cpSync(path.join(packageRoot, "wasm", file), path.join(outputDir, "wasm", file));
}

writeFileSync(path.join(outputDir, "VERSION"), `${version}\n`);

console.log(`Copied pdfjs-dist ${version} worker and support assets to public/pdfjs`);
