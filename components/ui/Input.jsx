"use client";
import { useId } from "react";

export default function Input({
  label,
  hint,
  error,
  suffix,
  rightSlot,
  labelRight,
  className = "",
  inputClassName = "",
  mono = false,
  ...rest
}) {
  const id = useId();
  return (
    <div className={className}>
      {(label || labelRight) && (
        <div className="mb-1.5 flex items-center justify-between">
          <label htmlFor={id} className="skul-eyebrow">{label}</label>
          {labelRight}
        </div>
      )}
      <div className="relative">
        <input
          id={id}
          aria-invalid={!!error}
          aria-describedby={error || hint ? `${id}-d` : undefined}
          className={`h-11 w-full rounded-lg border bg-white px-3.5 text-[14px] text-[#0b1a30] placeholder:text-[#9aa3b2] disabled:bg-[#f3f5f9] disabled:text-[#6b7587] ${
            mono ? "font-mono" : ""
          } ${error ? "border-[#dc2626]" : "border-[#e5e8ee]"} ${suffix || rightSlot ? "pr-20" : ""} ${inputClassName}`}
          {...rest}
        />
        {suffix && (
          <span className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-[12px] font-medium text-[#6b7587]">
            {suffix}
          </span>
        )}
        {rightSlot && <span className="absolute right-3 top-1/2 -translate-y-1/2">{rightSlot}</span>}
      </div>
      {(error || hint) && (
        <p id={`${id}-d`} className={`mt-1.5 text-[11.5px] ${error ? "text-[#dc2626]" : "text-[#8a93a3] italic"}`}>
          {error || hint}
        </p>
      )}
    </div>
  );
}