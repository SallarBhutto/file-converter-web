import type { ExifOrientation } from "@/lib/image/exif-orientation";

import type { PageSettings } from "./layout";

/** One accepted image. The original File is kept for PDF generation. */
export interface SelectedImage {
  id: string;
  file: File;
  name: string;
  size: number;
  /** Displayed (orientation-corrected) pixel dimensions. */
  width: number;
  height: number;
  /** EXIF orientation for JPEGs; null when absent or not a JPEG. */
  exifOrientation: ExifOrientation | null;
  /** Small JPEG used only for on-screen display. Owns one object URL. */
  preview: { objectUrl: string; width: number; height: number };
}

/** The finished PDF. Owns one object URL. */
export interface GeneratedPdf {
  blob: Blob;
  objectUrl: string;
  filename: string;
  size: number;
  pageCount: number;
}

export interface GenerationProgress {
  current: number;
  total: number;
}

export type ConverterPhase = "idle" | "ready" | "generating" | "complete" | "error";

export interface ImageToPdfState {
  phase: ConverterPhase;
  images: readonly SelectedImage[];
  settings: PageSettings;
  /** Number of files still being decoded after a selection. */
  pendingCount: number;
  /** Messages for files that were skipped during selection. */
  notices: readonly string[];
  progress: GenerationProgress | null;
  result: GeneratedPdf | null;
  error: string | null;
}
