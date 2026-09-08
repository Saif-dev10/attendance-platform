"use client";

import { useState } from "react";
import { KeyRound } from "lucide-react";

import Button from "@/components/ui/Button";

export default function ManualCodeEntry({
  isSubmitting,
  onSubmit,
  onCancel,
}) {
  const [code, setCode] = useState("");
  const [error, setError] = useState(null);

  function handleSubmit(e) {
    e.preventDefault();

    const trimmed = code.trim();

    if (!trimmed) {
      setError(
        "Enter the attendance code shown by your lecturer."
      );
      return;
    }

    if (trimmed.length < 4) {
      setError(
        "That code looks too short. Double-check and try again."
      );
      return;
    }

    setError(null);
    onSubmit(trimmed);
  }

  return (
    <div className="w-full max-w-sm mx-auto">
      <div className="mb-6 flex items-center gap-3">
        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-bronze-deep/10">
          <KeyRound className="h-5 w-5 text-bronze-deep" />
        </div>

        <div>
          <h1 className="text-lg font-semibold text-charcoal">
            Enter Code Manually
          </h1>

          <p className="text-sm text-graphite-soft">
            Use this if the camera can&apos;t scan the QR.
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-3">
        <div>
          <label
            htmlFor="attendance-code"
            className="sr-only"
          >
            Attendance code
          </label>

          <input
            id="attendance-code"
            type="text"
            inputMode="text"
            autoComplete="off"
            autoCapitalize="characters"
            placeholder="Enter attendance code"
            value={code}
            onChange={(e) => {
              setCode(e.target.value);

              if (error) {
                setError(null);
              }
            }}
            className="w-full rounded-2xl border border-line bg-paper px-4 py-3.5 text-center text-lg font-medium tracking-[0.2em] text-charcoal placeholder:tracking-normal placeholder:text-graphite-soft/70 focus:outline-none focus:ring-2 focus:ring-bronze-deep/40"
            aria-invalid={!!error}
            aria-describedby={
              error ? "code-error" : undefined
            }
          />

          {error && (
            <p
              id="code-error"
              className="mt-2 text-sm text-red-600"
            >
              {error}
            </p>
          )}
        </div>

        <div className="flex flex-col gap-3 pt-2">
          <Button
            type="submit"
            size="lg"
            disabled={isSubmitting}
            className="w-full"
          >
            {isSubmitting ? "Checking…" : "Submit"}
          </Button>

          <button
            type="button"
            onClick={onCancel}
            disabled={isSubmitting}
            className="text-sm font-medium text-graphite-soft hover:text-graphite transition-colors disabled:opacity-50"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}