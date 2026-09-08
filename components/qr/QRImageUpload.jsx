"use client";

import { useCallback, useRef, useState } from "react";
import {
  AlertCircle,
  ImageUp,
  RefreshCcw,
  UploadCloud,
} from "lucide-react";

import Button from "@/components/ui/Button";

export default function QRImageUpload({
  isScanning,
  onScan,
  onCancel,
}) {
  const inputRef = useRef(null);

  const [preview, setPreview] = useState(null);
  const [file, setFile] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState(null);

  const handleFile = useCallback((incoming) => {
    if (!incoming) return;

    if (!incoming.type.startsWith("image/")) {
      setError(
        "That file isn't an image. Upload a screenshot or photo of the QR code."
      );
      return;
    }

    setError(null);
    setFile(incoming);
    setPreview(URL.createObjectURL(incoming));
  }, []);

  function reset() {
    setFile(null);
    setPreview(null);
    setError(null);
  }

  return (
    <div className="w-full max-w-sm mx-auto">
      <div className="mb-6 flex items-center gap-3">
        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-bronze-deep/10">
          <ImageUp className="h-5 w-5 text-bronze-deep" />
        </div>

        <div>
          <h1 className="text-lg font-semibold text-charcoal">
            Upload QR Image
          </h1>

          <p className="text-sm text-graphite-soft">
            Select a photo or screenshot of the QR code.
          </p>
        </div>
      </div>

      {!preview ? (
        <div
          onDragOver={(e) => {
            e.preventDefault();
            setIsDragging(true);
          }}
          onDragLeave={() => setIsDragging(false)}
          onDrop={(e) => {
            e.preventDefault();
            setIsDragging(false);
            handleFile(e.dataTransfer.files?.[0]);
          }}
          onClick={() => inputRef.current?.click()}
          role="button"
          tabIndex={0}
          onKeyDown={(e) =>
            e.key === "Enter" && inputRef.current?.click()
          }
          className={`flex flex-col items-center justify-center gap-3 rounded-2xl border-2 border-dashed px-6 py-12 text-center transition-colors cursor-pointer ${
            isDragging
              ? "border-bronze-deep bg-bronze-deep/5"
              : "border-line bg-paper"
          }`}
        >
          <UploadCloud className="h-8 w-8 text-bronze-deep" />

          <div>
            <p className="text-sm font-medium text-charcoal">
              Drag and drop an image, or tap to browse
            </p>

            <p className="mt-1 text-xs text-graphite-soft">
              PNG or JPG, up to 10MB
            </p>
          </div>

          <input
            ref={inputRef}
            type="file"
            accept="image/*"
            className="sr-only"
            onChange={(e) =>
              handleFile(e.target.files?.[0] ?? undefined)
            }
          />
        </div>
      ) : (
        <div className="overflow-hidden rounded-2xl border border-line bg-white">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={preview}
            alt="Selected QR code preview"
            className="h-56 w-full object-contain bg-paper"
          />

          <button
            onClick={reset}
            className="flex w-full items-center justify-center gap-2 border-t border-line py-3 text-sm font-medium text-graphite-soft hover:text-graphite transition-colors"
          >
            <RefreshCcw className="h-3.5 w-3.5" />
            Choose a different image
          </button>
        </div>
      )}

      {error && (
        <p className="mt-3 flex items-center gap-1.5 text-sm text-red-600">
          <AlertCircle className="h-4 w-4 shrink-0" />
          {error}
        </p>
      )}

      <div className="mt-6 flex flex-col gap-3">
        <Button
          size="lg"
          disabled={!file || isScanning}
          onClick={() => file && onScan(file)}
          className="w-full"
        >
          {isScanning ? "Scanning image…" : "Scan Image"}
        </Button>

        <button
          onClick={onCancel}
          disabled={isScanning}
          className="text-sm font-medium text-graphite-soft hover:text-graphite transition-colors disabled:opacity-50"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}