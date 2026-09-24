// Small hand-drawn SVG chart. One line, five gridlines, no library.
const WIDTH = 320;
const HEIGHT = 170;
const PAD = { top: 12, right: 14, bottom: 26, left: 38 };
const TICKS = [0, 25, 50, 75, 100];
const THRESHOLD_TICK = 75;

export default function AttendanceTrendLine({ data = [], loading = false }) {
  if (loading) {
    return (
      <div
        aria-busy="true"
        className="h-56 animate-pulse rounded-md border border-line bg-paper"
      />
    );
  }

  const plotWidth = WIDTH - PAD.left - PAD.right;
  const plotHeight = HEIGHT - PAD.top - PAD.bottom;

  const xFor = (index) =>
    data.length > 1 ? PAD.left + (index / (data.length - 1)) * plotWidth : PAD.left + plotWidth / 2;
  const yFor = (rate) => PAD.top + plotHeight * (1 - rate / 100);

  const path = data
    .map((point, index) => `${index === 0 ? "M" : "L"}${xFor(index)},${yFor(point.rate)}`)
    .join(" ");

  return (
    <section
      aria-labelledby="attendance-trend-heading"
      className="rounded-md border border-line bg-paper p-4"
    >
      <h2 id="attendance-trend-heading" className="text-sm font-semibold text-charcoal">
        Attendance Trend
      </h2>

      {data.length === 0 ? (
        <p className="py-10 text-center text-sm text-graphite-soft">No sessions to chart yet.</p>
      ) : (
        <>
          <svg
            viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
            role="img"
            aria-label="Attendance rate across recent sessions"
            className="mt-2 h-auto w-full"
          >
            {TICKS.map((tick) => (
              <g key={tick}>
                <line
                  x1={PAD.left}
                  x2={WIDTH - PAD.right}
                  y1={yFor(tick)}
                  y2={yFor(tick)}
                  strokeWidth="1"
                  strokeDasharray={tick === THRESHOLD_TICK ? "4 3" : undefined}
                  className={tick === THRESHOLD_TICK ? "stroke-graphite-soft" : "stroke-line"}
                />
                <text
                  x={PAD.left - 6}
                  y={yFor(tick) + 3}
                  textAnchor="end"
                  fontSize="9"
                  className="fill-graphite-soft"
                >
                  {tick}%
                </text>
              </g>
            ))}

            <path d={path} fill="none" strokeWidth="2" strokeLinejoin="round" className="stroke-moss" />

            {data.map((point, index) => (
              <g key={point.label}>
                <circle cx={xFor(index)} cy={yFor(point.rate)} r="3" className="fill-moss" />
                <text
                  x={xFor(index)}
                  y={HEIGHT - 8}
                  textAnchor="middle"
                  fontSize="9"
                  className="fill-graphite-soft"
                >
                  {point.label}
                </text>
              </g>
            ))}
          </svg>

          {/* Screen readers get the numbers instead of the drawing. */}
          <ul className="sr-only">
            {data.map((point) => (
              <li key={point.label}>
                {point.label}: {point.rate}%
              </li>
            ))}
          </ul>
        </>
      )}
    </section>
  );
}