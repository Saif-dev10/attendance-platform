"use client";

/** Pill segmented control (ALL / ACTIVE / ONBOARDING, ALL / UNDERGRADUATE / POSTGRADUATE). */
export default function SegmentedControl({ options, value, onChange, label = "Filter" }) {
  return (
    <div role="group" aria-label={label} className="inline-flex rounded-lg border border-[#e5e8ee] bg-[#f3f5f9] p-1">
      {options.map((o) => {
        const opt = typeof o === "string" ? { value: o, label: o } : o;
        const active = opt.value === value;
        return (
          <button
            key={opt.value}
            aria-pressed={active}
            onClick={() => onChange(opt.value)}
            className={`rounded-md px-3.5 py-1.5 text-[11.5px] font-bold uppercase tracking-wide transition-colors ${
              active ? "bg-[#071a33] text-white shadow-sm" : "text-[#6b7587] hover:text-[#0b1a30]"
            }`}
          >
            {opt.label}
          </button>
        );
      })}
    </div>
  );
}