const TONES = {
  neutral: "bg-cream text-graphite",
  present: "bg-moss/10 text-moss",
  late: "bg-bronze-deep/10 text-bronze-deep",
  absent: "bg-clay/10 text-clay",
};

export default function AttendanceStatCard({
  icon: Icon,
  label,
  value,
  subtext,
  tone = "neutral",
  loading = false,
}) {
  if (loading) {
    return (
      <div
        aria-busy="true"
        className="h-[76px] animate-pulse rounded-md border border-line bg-paper"
      />
    );
  }

  return (
    <div className="flex items-center gap-3 rounded-md border border-line bg-paper p-3">
      <span
        className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full ${TONES[tone]}`}
      >
        <Icon aria-hidden="true" className="h-4 w-4" />
      </span>
      <div className="min-w-0">
        <p className="text-xs text-graphite-soft">{label}</p>
        <p className="text-xl font-semibold leading-tight text-charcoal">{value}</p>
        {subtext && <p className="text-xs text-graphite-soft">{subtext}</p>}
      </div>
    </div>
  );
}