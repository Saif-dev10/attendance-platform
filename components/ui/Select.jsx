"use client";
import { useId } from "react";
import Icon from "@/components/admin/shared/Icon";

/** options: [{ value, label }] or strings. `compact` gives the muted pill style used in table toolbars. */
export default function Select({ label, options = [], error, hint, compact = false, className = "", ...rest }) {
  const id = useId();
  const opts = options.map((o) => (typeof o === "string" ? { value: o, label: o } : o));
  return (
    <div className={className}>
      {label && (
        <label htmlFor={id} className="skul-eyebrow mb-1.5 block">
          {label}
        </label>
      )}
      <div className="relative">
        <select
          id={id}
          aria-invalid={!!error}
          className={`w-full appearance-none rounded-lg border pr-9 text-[#0b1a30] ${
            compact
              ? "h-9 border-transparent bg-[#f3f5f9] pl-3 text-[13px] font-medium"
              : "h-11 border-[#e5e8ee] bg-white pl-3.5 text-[14px]"
          } ${error ? "border-[#dc2626]" : ""}`}
          {...rest}
        >
          {opts.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>
        <Icon name="chevronDown" size={15} className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[#6b7587]" />
      </div>
      {(error || hint) && (
        <p className={`mt-1.5 text-[11.5px] ${error ? "text-[#dc2626]" : "text-[#8a93a3] italic"}`}>{error || hint}</p>
      )}
    </div>
  );
}