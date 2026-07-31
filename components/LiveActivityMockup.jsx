import StatusPill from "./StatusPill";

const rows = [
  { name: "Priya Shah", id: "PS-2214", time: "09:31:04", status: "Verified" },
  { name: "Daniel Cho", id: "DC-1187", time: "09:31:11", status: "Verified" },
  { name: "Femi Adeyemi", id: "FA-3302", time: "09:31:19", status: "Verified" },
  { name: "Lucia Torres", id: "LT-0965", time: "09:31:24", status: "Outside area" },
  { name: "Owen Bailey", id: "OB-4471", time: "09:31:30", status: "Verified" },
];

export default function LiveActivityMockup() {
  return (
    <div className="overflow-hidden rounded-2xl border border-line-strong bg-paper shadow-[0_24px_50px_-28px_rgba(32,30,27,0.3)]">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-line px-6 py-4">
        <div>
          <p className="font-mono text-[0.68rem] uppercase tracking-[0.18em] text-graphite-soft">
            Live activity
          </p>
          <h3 className="font-display text-base text-charcoal">Seminar B &middot; Room 4.12</h3>
        </div>
        <StatusPill label="Updating" />
      </div>

      <div className="divide-y divide-line">
        {rows.map((row) => (
          <div
            key={row.id}
            className="flex items-center justify-between gap-4 px-6 py-3 text-sm transition-colors duration-200 hover:bg-cream"
          >
            <div className="flex items-center gap-3">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-charcoal font-display text-xs text-cream">
                {row.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </span>
              <div>
                <p className="text-charcoal">{row.name}</p>
                <p className="font-mono text-xs text-graphite-soft">{row.id}</p>
              </div>
            </div>
            <div className="flex items-center gap-3 text-xs">
              <span className="font-mono text-graphite-soft">{row.time}</span>
              <span
                className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 ${
                  row.status === "Verified"
                    ? "bg-moss-soft text-moss"
                    : "bg-bronze-soft/40 text-bronze-deep"
                }`}
              >
                <span
                  className={`h-1.5 w-1.5 rounded-full ${
                    row.status === "Verified" ? "bg-moss" : "bg-bronze-deep"
                  }`}
                />
                {row.status}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
