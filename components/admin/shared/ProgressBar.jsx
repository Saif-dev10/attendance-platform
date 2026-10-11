const TONES = {
  green: "bg-[#10b981]",
  blue: "bg-[#3b82f6]",
  amber: "bg-[#e0b000]",
  navy: "bg-[#071a33]",
  yellow: "bg-[#f5c400]",
  red: "bg-[#dc2626]",
};

export default function ProgressBar({ value, max = 100, tone = "green", label, showValue = false, height = "h-1.5", className = "" }) {
  const pct = Math.max(0, Math.min(100, (value / max) * 100));
  return (
    <div className={`flex items-center gap-2.5 ${className}`}>
      <div
        role="progressbar"
        aria-valuenow={Math.round(pct)}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={label}
        className={`w-full overflow-hidden rounded-full bg-[#eceff4] ${height}`}
      >
        <div className={`${height} rounded-full ${TONES[tone]}`} style={{ width: `${pct}%` }} />
      </div>
      {showValue && <span className="w-10 shrink-0 text-[11.5px] font-bold text-[#0b1a30]">{Math.round(pct)}%</span>}
    </div>
  );
}