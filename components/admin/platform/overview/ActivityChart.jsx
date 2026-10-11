"use client";
import { useState } from "react";
import LineChart from "@/components/admin/shared/LineChart";

const DEFS = [
  { id: "logins", name: "Logins", color: "#071a33", axis: "left", key: "logins" },
  { id: "attendance", name: "Attendance %", color: "#f5c400", axis: "right", dashed: true, key: "attendance" },
];

export default function ActivityChart({ activity }) {
  const [hidden, setHidden] = useState([]);

  const toggle = (id) =>
    setHidden((h) => {
      if (h.includes(id)) return h.filter((x) => x !== id);
      return h.length === DEFS.length - 1 ? h : [...h, id]; // always keep one series visible
    });

  const series = DEFS.filter((d) => !hidden.includes(d.id)).map((d) => ({
    name: d.name,
    color: d.color,
    axis: d.axis,
    dashed: d.dashed,
    values: activity[d.key],
  }));

  return (
    <section className="skul-card p-6" aria-labelledby="activity-title">
      <div className="mb-4 flex flex-wrap items-start justify-between gap-3">
        <div>
          <h2 id="activity-title" className="skul-heading text-[17px] font-semibold text-[#0b1a30]">System Activity &amp; Attendance</h2>
          <p className="mt-0.5 text-[13px] text-[#6b7587]">Weekly login volume and average attendance across all institutions</p>
        </div>
        <div className="flex items-center gap-4" role="group" aria-label="Toggle chart series">
          {DEFS.map((d) => {
            const on = !hidden.includes(d.id);
            return (
              <button key={d.id} onClick={() => toggle(d.id)} aria-pressed={on} className={`flex items-center gap-1.5 text-[12px] ${on ? "text-[#4b5565]" : "text-[#a3abb9] line-through"}`}>
                <span className="h-2 w-2 rounded-full" style={{ background: on ? d.color : "#cfd5df" }} />
                {d.name}
              </button>
            );
          })}
        </div>
      </div>
      <LineChart labels={activity.labels} series={series} leftMax={6000} rightMax={90} ticks={6} ariaLabel="Weekly logins and average attendance" height={320} />
      <p className="mt-2 text-[11.5px] text-[#8a93a3]">Logins use the left axis; attendance % uses the right axis. Hover a day for exact values.</p>
    </section>
  );
}