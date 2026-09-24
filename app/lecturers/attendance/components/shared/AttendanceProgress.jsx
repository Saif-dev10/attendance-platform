const TONE_CLASS = {
  moss: "text-moss",
  bronze: "text-bronze-deep",
  clay: "text-clay",
};

// Linear bar used in the active session card.
export function ProgressBar({ value, label, tone = "moss" }) {
  const clamped = Math.min(100, Math.max(0, value));

  return (
    <div
      role="progressbar"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={clamped}
      aria-label={label}
      className="h-2 w-full overflow-hidden rounded-full bg-line"
    >
      <div
        className={`h-full rounded-full bg-current ${TONE_CLASS[tone]}`}
        style={{ width: `${clamped}%` }}
      />
    </div>
  );
}

// Circular gauge used for Attendance Rate and Overall Attendance.
// Pass children to replace the default "73.1%" text in the middle.
export function ProgressRing({
  value,
  size = 72,
  strokeWidth = 7,
  tone = "moss",
  label,
  children,
}) {
  const clamped = Math.min(100, Math.max(0, value));
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference * (1 - clamped / 100);

  return (
    <div
      role="img"
      aria-label={label ?? `${clamped}%`}
      className="relative shrink-0"
      style={{ width: size, height: size }}
    >
      <svg width={size} height={size} className="-rotate-90" aria-hidden="true">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          strokeWidth={strokeWidth}
          stroke="currentColor"
          className="text-line"
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          stroke="currentColor"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          className={TONE_CLASS[tone]}
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center text-sm font-semibold text-charcoal">
        {children ?? `${clamped}%`}
      </div>
    </div>
  );
}