import { validateImageFile } from "@/lib/files/validation";
import { decodeImage, encodeBitmap } from "@/lib/image/decode";
import { ImageProcessingError, throwIfAborted } from "@/lib/image/errors";
import { EXIF_SCAN_BYTES, readJpegOrientation } from "@/lib/image/exif-orientation";

import type { ImageInputFormatConfig } from "./formats";
import type { SelectedImage } from "./types";

/** Longest side of a list thumbnail in pixels. */
export const THUMBNAIL_MAX_SIDE = 320;
const THUMBNAIL_QUALITY = 0.75;

let nextImageId = 1;

/**
 * Validates one file, decodes it once to learn its displayed dimensions and
 * draw a bounded thumbnail, then releases the bitmap. Throws an
 * ImageProcessingError with a user-safe message on any failure.
 */
export async function loadSelectedImage(
  file: File,
  format: ImageInputFormatConfig,
  signal?: AbortSignal,
): Promise<SelectedImage> {
  const validation = validateImageFile(file, format);
  if (!validation.ok) {
    throw new ImageProcessingError("wrong-format", validation.message);
  }

  const exifOrientation =
    format.id === "jpeg"
      ? readJpegOrientation(new Uint8Array(await file.slice(0, EXIF_SCAN_BYTES).arrayBuffer()))
      : null;
  throwIfAborted(signal);

  const bitmap = await decodeImage(file, signal);
  try {
    const thumbnail = await encodeBitmap(bitmap, {
      type: "image/jpeg",
      quality: THUMBNAIL_QUALITY,
      maxSide: THUMBNAIL_MAX_SIDE,
    });
    throwIfAborted(signal);
    return {
      id: `image-${nextImageId++}`,
      file,
      name: file.name,
      size: file.size,
      width: bitmap.width,
      height: bitmap.height,
      exifOrientation,
      preview: {
        objectUrl: URL.createObjectURL(thumbnail.blob),
        width: thumbnail.width,
        height: thumbnail.height,
      },
    };
  } finally {
    bitmap.close();
  }
}

/** The single cleanup path for image preview URLs. */
export function revokeSelectedImages(images: readonly SelectedImage[]): void {
  for (const image of images) {
    URL.revokeObjectURL(image.preview.objectUrl);
  }
}
