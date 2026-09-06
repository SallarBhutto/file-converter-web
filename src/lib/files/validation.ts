export type PdfFileValidation =
  | { ok: true }
  | { ok: false; reason: "empty" | "not-pdf"; message: string };

const PDF_MIME_TYPES = new Set(["application/pdf", "application/x-pdf"]);

function hasPdfExtension(name: string): boolean {
  return /\.pdf$/i.test(name.trim());
}

/**
 * Cheap pre-check before handing a file to PDF.js. It rejects obviously wrong
 * files but deliberately trusts a `.pdf` extension when the browser reports
 * no MIME type or a generic one, because PDF.js performs the real validation
 * when it parses the document.
 */
export function validatePdfFile(
  file: Pick<File, "name" | "type" | "size">,
): PdfFileValidation {
  if (file.size === 0) {
    return { ok: false, reason: "empty", message: "This file is empty." };
  }

  const mime = file.type.trim().toLowerCase();
  if (PDF_MIME_TYPES.has(mime)) return { ok: true };
  if (hasPdfExtension(file.name)) return { ok: true };

  return {
    ok: false,
    reason: "not-pdf",
    message: "Please choose a PDF file.",
  };
}
