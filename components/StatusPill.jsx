/**
 * Small status badge used for live or attention states in mockup UI.
 * It keeps the visual language consistent across attendance and session screens.
 */
export default function StatusPill({ label = "Session live", tone = "live" }) {
  const dotColor = tone === "live" ? "bg-moss" : "bg-bronze";
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-line-strong bg-paper px-3 py-1.5 text-xs font-medium text-graphite">
      <span className="relative flex h-2 w-2">
        <span
          className={`absolute inline-flex h-full w-full animate-pulse-soft rounded-full ${dotColor}`}
        />
        <span className={`relative inline-flex h-2 w-2 rounded-full ${dotColor}`} />
      </span>
      {label}
    </span>
  );
}
