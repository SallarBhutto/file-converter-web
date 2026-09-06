import { Button } from "@/components/ui/button";
import { formatFileSize } from "@/lib/files/formatting";

import type { SelectedPdf } from "../types";

interface SelectedFileCardProps {
  file: SelectedPdf;
  /** Null until the document has been parsed. */
  pageCount: number | null;
  /** Replaces the page count while the document is still being read. */
  statusText?: string;
  onRemove: () => void;
  removeDisabled?: boolean;
}

export function SelectedFileCard({
  file,
  pageCount,
  statusText,
  onRemove,
  removeDisabled = false,
}: SelectedFileCardProps) {
  const pageText =
    pageCount === null ? null : `${pageCount} ${pageCount === 1 ? "page" : "pages"}`;
  const meta = [formatFileSize(file.size), statusText ?? pageText].filter(Boolean).join(" · ");

  return (
    <div className="flex items-center gap-4 rounded-lg border border-zinc-200 bg-zinc-50 p-4">
      <div
        aria-hidden="true"
        className="flex size-11 shrink-0 items-center justify-center rounded-md bg-white text-xs font-semibold text-accent ring-1 ring-zinc-200"
      >
        PDF
      </div>
      <div className="min-w-0 flex-1">
        <p className="truncate font-medium text-zinc-900" title={file.name}>
          {file.name}
        </p>
        <p className="mt-0.5 text-sm text-zinc-600" aria-live="polite">
          {meta}
        </p>
      </div>
      <Button variant="ghost" onClick={onRemove} disabled={removeDisabled} className="shrink-0">
        Remove
      </Button>
    </div>
  );
}
