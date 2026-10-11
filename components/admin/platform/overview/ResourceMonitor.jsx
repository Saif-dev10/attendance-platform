import ProgressBar from "@/components/admin/shared/ProgressBar";

const tone = (pct, base) => (pct >= 90 ? "red" : base);

function Meter({ label, value, note, tone: t }) {
  return (
    <div>
      <div className="mb-1.5 flex items-baseline justify-between text-[12.5px]">
        <span className="text-[#4b5565]">{label}</span>
        <span className="font-bold text-[#0b1a30]">{value}%</span>
      </div>
      <ProgressBar value={value} tone={tone(value, t)} label={label} />
      <p className="mt-1.5 text-[10.5px] text-[#8a93a3]">{note}</p>
    </div>
  );
}

/** Values are SAMPLE data (see metricsService); the badge says so instead of "LIVE". */
export default function ResourceMonitor({ resources }) {
  const { cpu, memory, db, isSample } = resources;
  const dbPct = Math.round((db.used / db.max) * 100);
  return (
    <section className="skul-card p-6" aria-labelledby="res-title">
      <div className="mb-5 flex items-center justify-between">
        <h2 id="res-title" className="skul-heading text-[17px] font-semibold text-[#0b1a30]">System Resource Monitor</h2>
        <span className="flex items-center gap-1.5 text-[10.5px] font-bold uppercase tracking-wide text-[#6b7587]">
          <span className="h-1.5 w-1.5 rounded-full bg-[#9aa3b2]" />
          {isSample ? "Sample" : "Live"}
        </span>
      </div>
      <div className="grid gap-5 sm:grid-cols-2">
        <Meter label="Server CPU Load" value={cpu.percent} note={cpu.note} tone="navy" />
        <Meter label="Memory Usage" value={memory.percent} note={memory.note} tone="yellow" />
      </div>
      <div className="mt-5 border-t border-[#eef0f4] pt-5">
        <div className="mb-1.5 flex items-baseline justify-between text-[12.5px]">
          <span className="text-[#4b5565]">Database Connections</span>
          <span className="font-bold text-[#0b1a30]">{db.used} / {db.max}</span>
        </div>
        <ProgressBar value={dbPct} tone={tone(dbPct, "navy")} label="Database connections" />
      </div>
      {isSample && <p className="mt-4 text-[11px] text-[#8a93a3]">Illustrative values, not live telemetry.</p>}
    </section>
  );
}