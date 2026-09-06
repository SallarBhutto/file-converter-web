import { describe, expect, it } from "vitest";

import {
  DEFAULT_JPEG_QUALITY_PRESET,
  JPEG_QUALITY_PRESETS,
  getJpegQuality,
  isJpegQualityPreset,
} from "./quality-presets";

describe("JPEG quality presets", () => {
  it("exposes exactly three presets in ascending quality order", () => {
    expect(JPEG_QUALITY_PRESETS.map((preset) => preset.id)).toEqual([
      "smaller",
      "balanced",
      "best",
    ]);
    const qualities = JPEG_QUALITY_PRESETS.map((preset) => preset.quality);
    expect(qualities).toEqual([...qualities].sort((a, b) => a - b));
  });

  it("maps each preset to a sensible encoder quality", () => {
    expect(getJpegQuality("smaller")).toBe(0.6);
    expect(getJpegQuality("balanced")).toBe(0.8);
    expect(getJpegQuality("best")).toBe(0.92);
  });

  it("defaults to Balanced", () => {
    expect(DEFAULT_JPEG_QUALITY_PRESET).toBe("balanced");
  });

  it("guards unknown values", () => {
    expect(isJpegQualityPreset("balanced")).toBe(true);
    expect(isJpegQualityPreset("ultra")).toBe(false);
  });
});
