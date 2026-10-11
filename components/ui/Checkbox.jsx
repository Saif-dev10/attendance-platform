"use client";
import { useId } from "react";
import Icon from "@/components/admin/shared/Icon";

/** Checkbox card matching the reference (title + description in a bordered row). */
export default function Checkbox({ checked, onChange, title, description, disabled = false, children }) {
  const id = useId();
  return (
    <label
      htmlFor={id}
      className={`flex cursor-pointer items-start gap-3.5 rounded-xl border bg-white px-4 py-3.5 ${
        checked ? "border-[#cfd8e6]" : "border-[#e5e8ee]"
      } ${disabled ? "opacity-60" : ""}`}
    >
      <span className="relative mt-0.5">
        <input
          id={id}
          type="checkbox"
          checked={checked}
          disabled={disabled}
          onChange={(e) => onChange(e.target.checked)}
          className="peer sr-only"
        />
        <span
          className={`flex h-[18px] w-[18px] items-center justify-center rounded border peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-[#f5c400] ${
            checked ? "border-[#2563eb] bg-[#2563eb] text-white" : "border-[#8a93a3] bg-white"
          }`}
        >
          {checked && <Icon name="check" size={13} />}
        </span>
      </span>
      <span className="min-w-0 flex-1">
        <span className="block text-[13.5px] font-semibold text-[#0b1a30]">{title}</span>
        {description && <span className="mt-0.5 block text-[12.5px] text-[#6b7587]">{description}</span>}
        {children}
      </span>
    </label>
  );
}