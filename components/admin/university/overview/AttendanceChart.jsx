"use client";
import { useState } from "react";
import BarChart from "@/components/admin/shared/BarChart";
import ErrorState from "@/components/admin/shared/ErrorState";
import Select from "@/components/ui/Select";
import useAsync from "@/lib/admin/useAsync";
import { getAttendanceActivity, ATTENDANCE_RANGES } from "@/lib/services/admin/metricsService";

const UNIT = { "7d": "day", "30d": "week", semester: "month" };

// Rounds the axis maximum up to a "nice" value (5k, 10k, 20k …) with `ticks` equal steps.
function niceMax(max, ticks = 4) {
  const raw = Math.max(max, 1) / ticks;
  const pow = 10 ** Math.floor(Math.log10(raw));
  const n = raw / pow;
  return (n <= 1 ? 1 : n <= 2 ? 2 : n <= 5 ? 5 : 10) * pow * ticks;
}
const formatY = (v) => (v >= 1000 ? `${v / 1000}k` : String(v));

export default function AttendanceChart() {
  const [range, setRange] = useState("7d");
  const { data, loading, error, reload } = useAsync(() => getAttendanceActivity(range), [range]);

  const chart = data ? data.labels.map((label, i) => ({ label, value: data.values[i] })) : [];
  const total = data ? data.values.reduce((a, b) => a + b, 0) : 0;

  return (
    <section className="skul-card p-6" aria-labelledby="att-title">
      <div className="mb-4 flex items-start justify-between gap-3">
        <div>
          <h2 id="att-title" className="skul-heading text-[17px] font-semibold text-[#0b1a30]">Attendance Activity</h2>
          <p className="mt-0.5 text-[13px] text-[#6b7587]">QR scan volume per {UNIT[range]}</p>
        </div>
        <Select compact aria-label="Time range" options={ATTENDANCE_RANGES} value={range} onChange={(e) => setRange(e.target.value)} />
      </div>

      {error ? (
        <ErrorState error={error} onRetry={reload} />
      ) : !data ? (
        <div className="h-[300px] animate-pulse rounded-xl bg-[#f3f5f9]" aria-hidden />
      ) : (
        <div className={loading ? "opacity-60 transition-opacity" : ""}>
          <BarChart data={chart} yMax={niceMax(Math.max(...data.values))} ticks={4} formatY={formatY} ariaLabel={`QR scan volume per ${UNIT[range]}`} />
          <p className="mt-2 text-[11.5px] text-[#8a93a3]">
            {total.toLocaleString()} scans in this period. Hover a bar for its exact value. Sample data.
          </p>
        </div>
      )}
    </section>
  );
}