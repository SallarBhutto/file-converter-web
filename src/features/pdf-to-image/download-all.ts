import type { PageResult } from "./types";

/**
 * Packs the page results into a ZIP entirely in the browser. fflate is
 * imported on demand so it only loads when someone clicks "Download All".
 *
 * Entries are stored, not deflated: JPEG, PNG and WebP data do not compress
 * further, and skipping deflate keeps the work to a CRC pass. Files are read
 * one at a time so at most one page's bytes are duplicated while the archive
 * is assembled.
 */
export async function buildImageArchive(results: readonly PageResult[]): Promise<Blob> {
  const { Zip, ZipPassThrough } = await import("fflate");

  const chunks: BlobPart[] = [];
  let finish!: () => void;
  let fail!: (error: unknown) => void;
  const done = new Promise<void>((resolve, reject) => {
    finish = resolve;
    fail = reject;
  });

  const archive = new Zip((error, data, final) => {
    if (error) {
      fail(error);
      return;
    }
    // fflate types its output over ArrayBufferLike, but it only ever allocates
    // plain ArrayBuffers, which is what Blob requires.
    chunks.push(data as Uint8Array<ArrayBuffer>);
    if (final) finish();
  });

  for (const result of results) {
    const entry = new ZipPassThrough(result.download.filename);
    entry.mtime = new Date();
    archive.add(entry);
    const bytes = new Uint8Array(await result.download.blob.arrayBuffer());
    entry.push(bytes, true);
  }
  archive.end();

  await done;
  return new Blob(chunks, { type: "application/zip" });
}
