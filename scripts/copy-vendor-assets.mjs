/**
 * Copies browser codec files from node_modules into public/ so Next.js
 * serves them as static files. Runs before `next dev` and `next build`. The
 * output directories are git-ignored and regenerated from the installed
 * package versions on every run, so the files can never drift from the
 * JavaScript that uses them.
 *
 * public/pdfjs — PDF.js worker and on-demand support assets:
 *   cmaps/           cMapUrl              predefined CMaps for CJK fonts
 *   standard_fonts/  standardFontDataUrl  fallbacks for non-embedded fonts
 *   iccs/            iccUrl               CMYK ICC profile for colour conversion
 *   wasm/            wasmUrl              OpenJPEG (JPX), JBIG2 and qcms (ICC)
 *                                         decoders plus their no-WASM fallbacks
 *   quickjs-eval.* belongs to the optional scripting sandbox, which this
 *   application does not load, so it is skipped.
 *
 * public/oxipng — the single-threaded OxiPNG wasm-bindgen module from
 *   @jsquash/oxipng. It is imported at runtime by URL rather than bundled:
 *   the generated glue assigns to `import.meta.url`, which bundlers cannot
 *   process, and the multi-threaded build needs a Worker plus cross-origin
 *   isolation this site does not use.
 */
import { cpSync, mkdirSync, readdirSync, rmSync, writeFileSync } from "node:fs";
import { createRequire } from "node:module";
import path from "node:path";

const require = createRequire(import.meta.url);

function packageRoot(name) {
  return path.dirname(require.resolve(`${name}/package.json`));
}

function resetDir(dir) {
  rmSync(dir, { recursive: true, force: true });
  mkdirSync(dir, { recursive: true });
}

function copyPdfjs() {
  const root = packageRoot("pdfjs-dist");
  const { version } = require("pdfjs-dist/package.json");
  const out = path.resolve("public/pdfjs");
  resetDir(out);

  cpSync(path.join(root, "build/pdf.worker.min.mjs"), path.join(out, "pdf.worker.min.mjs"));
  for (const dir of ["cmaps", "standard_fonts", "iccs"]) {
    cpSync(path.join(root, dir), path.join(out, dir), { recursive: true });
  }
  mkdirSync(path.join(out, "wasm"));
  for (const file of readdirSync(path.join(root, "wasm"))) {
    if (/^quickjs-eval\./.test(file)) continue;
    cpSync(path.join(root, "wasm", file), path.join(out, "wasm", file));
  }
  writeFileSync(path.join(out, "VERSION"), `${version}\n`);
  return version;
}

function copyOxipng() {
  const root = packageRoot("@jsquash/oxipng");
  const { version } = require("@jsquash/oxipng/package.json");
  const out = path.resolve("public/oxipng");
  resetDir(out);

  for (const file of ["squoosh_oxipng.js", "squoosh_oxipng_bg.wasm"]) {
    cpSync(path.join(root, "codec/pkg", file), path.join(out, file));
  }
  writeFileSync(path.join(out, "VERSION"), `${version}\n`);
  return version;
}

const pdfjsVersion = copyPdfjs();
const oxipngVersion = copyOxipng();
console.log(
  `Copied pdfjs-dist ${pdfjsVersion} to public/pdfjs and @jsquash/oxipng ${oxipngVersion} to public/oxipng`,
);
