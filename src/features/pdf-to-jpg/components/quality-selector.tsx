import { useId } from "react";

import {
  JPEG_QUALITY_PRESETS,
  getJpegQualityPreset,
  isJpegQualityPreset,
  type JpegQualityPreset,
} from "../quality-presets";

interface QualitySelectorProps {
  value: JpegQualityPreset;
  onChange: (preset: JpegQualityPreset) => void;
  disabled?: boolean;
}

/** Three-way segmented radio group. Native radios keep keyboard behaviour free. */
export function QualitySelector({ value, onChange, disabled = false }: QualitySelectorProps) {
  const name = useId();
  const selected = getJpegQualityPreset(value);

  return (
    <fieldset disabled={disabled} className="min-w-0">
      <legend className="text-sm font-medium text-zinc-900">JPG quality</legend>
      <div className="mt-2 grid grid-cols-3 gap-2">
        {JPEG_QUALITY_PRESETS.map((preset) => (
          <label key={preset.id} className="cursor-pointer">
            <input
              type="radio"
              name={name}
              value={preset.id}
              checked={preset.id === value}
              onChange={(event) => {
                if (isJpegQualityPreset(event.target.value)) onChange(event.target.value);
              }}
              className="peer sr-only"
            />
            <span className="flex min-h-11 items-center justify-center rounded-md border border-zinc-300 bg-white px-2 text-center text-sm font-medium text-zinc-700 transition-colors peer-checked:border-accent peer-checked:bg-accent-soft peer-checked:text-accent peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-accent peer-disabled:cursor-not-allowed peer-disabled:opacity-50">
              {preset.label}
            </span>
          </label>
        ))}
      </div>
      <p className="mt-2 text-sm text-zinc-600">{selected.description}</p>
    </fieldset>
  );
}
