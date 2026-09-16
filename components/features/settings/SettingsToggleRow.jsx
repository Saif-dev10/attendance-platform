/** Labeled row with an accessible on/off switch. */
export default function SettingsToggleRow({
  label,
  description,
  checked,
  onChange,
  disabled = false,
  last = false,
}) {
  return (
    <div
      className={`flex items-start justify-between gap-4 px-4 py-4 sm:px-5 ${
        last ? "" : "border-b border-line"
      }`}
    >
      <div className="min-w-0">
        <p className="text-sm font-semibold text-charcoal">{label}</p>
        <p className="mt-0.5 text-xs text-graphite-soft">{description}</p>
      </div>

      <button
        type="button"
        role="switch"
        aria-checked={checked}
        aria-label={label}
        disabled={disabled}
        onClick={() => onChange(!checked)}
        className={`relative h-6 w-11 shrink-0 rounded-full border transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-bronze disabled:cursor-not-allowed disabled:opacity-50 ${
          checked ? "border-bronze-deep bg-bronze-deep" : "border-line bg-line"
        }`}
      >
        <span
          className={`absolute top-1/2 h-4.5 w-4.5 -translate-y-1/2 rounded-full bg-white shadow-sm transition-[left] duration-150 ease-out ${
            checked ? "left-[22px]" : "left-1"
          }`}
        />
      </button>
    </div>
  );
}