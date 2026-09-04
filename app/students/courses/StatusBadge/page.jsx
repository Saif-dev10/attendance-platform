const DOT_TONES = {
  bronze: "bg-bronze-deep",
  charcoal: "bg-charcoal",
  positive: "bg-emerald-600",
  attention: "bg-amber-600",
  negative: "bg-rose-600",
  muted: "bg-graphite-soft",
};

const TEXT_TONES = {
  bronze: "text-bronze-deep",
  charcoal: "text-charcoal",
  positive: "text-emerald-700",
  attention: "text-amber-700",
  negative: "text-rose-700",
  muted: "text-graphite-soft",
};

/**
 * A small dot + label used to communicate status (Due Soon, Present, Graded, etc.)
 * without turning an entire card into a colored block. Keep `tone` limited to the
 * options above so status color stays restrained across the app.
 */
export default function StatusBadge({ label, tone = "muted", className = "" }) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border border-line bg-cream px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide ${TEXT_TONES[tone]} ${className}`}
    >
      <span className={`h-1.5 w-1.5 rounded-full ${DOT_TONES[tone]}`} />
      {label}
    </span>
  );
}