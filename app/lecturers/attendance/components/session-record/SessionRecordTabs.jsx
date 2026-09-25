const TABS = [
  { value: "students", label: "Students" },
  { value: "exceptions", label: "Exceptions" },
  { value: "details", label: "Session Details" },
];

export default function SessionRecordTabs({ active, onChange, exceptionCount = 0 }) {
  return (
    <div role="tablist" aria-label="Session record sections" className="flex gap-1 border-b border-line px-4">
      {TABS.map((tab) => {
        const isActive = active === tab.value;
        return (
          <button
            key={tab.value}
            type="button"
            role="tab"
            aria-selected={isActive}
            onClick={() => onChange(tab.value)}
            className={`-mb-px border-b-2 px-3 py-2.5 text-sm font-medium ${
              isActive
                ? "border-bronze-deep text-charcoal"
                : "border-transparent text-graphite-soft hover:text-charcoal"
            }`}
          >
            {tab.label}
            {tab.value === "exceptions" && exceptionCount > 0 && ` (${exceptionCount})`}
          </button>
        );
      })}
    </div>
  );
}
