export type JpegQualityPreset = "smaller" | "balanced" | "best";

export interface JpegQualityPresetDefinition {
  id: JpegQualityPreset;
  label: string;
  description: string;
  /** JPEG encoder quality passed to canvas.toBlob, in [0, 1]. */
  quality: number;
}

export const JPEG_QUALITY_PRESETS: readonly JpegQualityPresetDefinition[] = [
  {
    id: "smaller",
    label: "Smaller File",
    description: "Noticeably smaller files. Fine for sharing, previews, and email.",
    quality: 0.6,
  },
  {
    id: "balanced",
    label: "Balanced",
    description: "Sharp images at a sensible size. The right choice for most documents.",
    quality: 0.8,
  },
  {
    id: "best",
    label: "Best Quality",
    description: "Maximum detail with larger files. Use for print or fine artwork.",
    quality: 0.92,
  },
];

export const DEFAULT_JPEG_QUALITY_PRESET: JpegQualityPreset = "balanced";

export function isJpegQualityPreset(value: string): value is JpegQualityPreset {
  return JPEG_QUALITY_PRESETS.some((preset) => preset.id === value);
}

export function getJpegQualityPreset(id: JpegQualityPreset): JpegQualityPresetDefinition {
  const preset = JPEG_QUALITY_PRESETS.find((candidate) => candidate.id === id);
  if (!preset) throw new Error(`Unknown JPEG quality preset: ${id}`);
  return preset;
}

/** Maps a preset to the encoder quality value. */
export function getJpegQuality(id: JpegQualityPreset): number {
  return getJpegQualityPreset(id).quality;
}
