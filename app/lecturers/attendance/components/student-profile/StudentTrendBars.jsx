// Grouped bar chart, same hand-drawn approach as AttendanceTrendLine: no chart library.
const WIDTH = 320;
const HEIGHT = 190;
const PAD = { top: 16, right: 10, bottom: 26, left: 30 };
const SERIES = [
  { key: "present", className: "fill-moss", label: "Present" },
  { key: "late", className: "fill-bronze-deep", label: "Late" },
  { key: "absent", className: "fill-clay", label: "Absent" },
];

export default function StudentTrendBars({ data = [], loading = false }) {
  if (loading) {
    return <div aria-busy="true" className="h-56 animate-pulse rounded-md border border-line bg-paper" />;
  }

  const plotWidth = WIDTH - PAD.left - PAD.right;
  const plotHeight = HEIGHT - PAD.top - PAD.bottom;
  const maxValue = Math.max(1, ...data.flatMap((point) => SERIES.map((s) => point[s.key])));

  const groupWidth = plotWidth / Math.max(1, data.length);
  const barWidth = Math.min(14, groupWidth / (SERIES.length + 1.5));
  const yFor = (value) => plotHeight * (1 - value / maxValue);

  return (
    <section aria-labelledby="student-trend-heading" className="rounded-md border border-line bg-paper p-4">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h2 id="student-trend-heading" className="text-sm font-semibold text-charcoal">
          Attendance Trend
        </h2>
        <ul className="flex gap-3 text-xs text-graphite-soft">
          {SERIES.map((s) => (
            <li key={s.key} className="flex items-center gap-1">
              <span aria-hidden="true" className={`h-2 w-2 rounded-full ${s.className}`} />
              {s.label}
            </li>
          ))}
        </ul>
      </div>

      {data.length === 0 ? (
        <p className="py-10 text-center text-sm text-graphite-soft">No trend data yet.</p>
      ) : (
        <>
          <svg
            viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
            role="img"
            aria-label="Present, late and absent counts per week"
            className="mt-2 h-auto w-full"
          >
            <line
              x1={PAD.left}
              x2={WIDTH - PAD.right}
              y1={PAD.top + plotHeight}
              y2={PAD.top + plotHeight}
              className="stroke-line"
            />

            {data.map((point, groupIndex) => {
              const groupX = PAD.left + groupIndex * groupWidth + (groupWidth - SERIES.length * barWidth) / 2;

              return (
                <g key={point.label}>
                  {SERIES.map((s, seriesIndex) => {
                    const value = point[s.key];
                    const barHeight = plotHeight - yFor(value);
                    const x = groupX + seriesIndex * barWidth;

                    return (
                      <rect
                        key={s.key}
                        x={x}
                        y={PAD.top + yFor(value)}
                        width={barWidth - 2}
                        height={Math.max(1, barHeight)}
                        rx="1.5"
                        className={s.className}
                      />
                    );
                  })}
                  <text
                    x={groupX + (SERIES.length * barWidth) / 2}
                    y={HEIGHT - 8}
                    textAnchor="middle"
                    fontSize="9"
                    className="fill-graphite-soft"
                  >
                    {point.label}
                  </text>
                </g>
              );
            })}
          </svg>

          <ul className="sr-only">
            {data.map((point) => (
              <li key={point.label}>
                {point.label}: {point.present} present, {point.late} late, {point.absent} absent
              </li>
            ))}
          </ul>
        </>
      )}
    </section>
  );
}