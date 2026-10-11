"use client";

/** Underline tabs (Global Configuration). tabs: [{ id, label, dirty? }] */
export default function Tabs({ tabs, value, onChange, className = "" }) {
  return (
    <div role="tablist" className={`flex gap-6 border-b border-[#e5e8ee] ${className}`}>
      {tabs.map((t) => {
        const active = t.id === value;
        return (
          <button
            key={t.id}
            role="tab"
            id={`tab-${t.id}`}
            aria-selected={active}
            aria-controls={`panel-${t.id}`}
            onClick={() => onChange(t.id)}
            className={`relative -mb-px whitespace-nowrap border-b-2 pb-3 text-[13.5px] font-semibold transition-colors ${
              active ? "border-[#071a33] text-[#071a33]" : "border-transparent text-[#6b7587] hover:text-[#0b1a30]"
            }`}
          >
            {t.label}
            {t.dirty && <span className="ml-1.5 inline-block h-1.5 w-1.5 rounded-full bg-[#f5c400]" title="Unsaved changes" />}
          </button>
        );
      })}
    </div>
  );
}