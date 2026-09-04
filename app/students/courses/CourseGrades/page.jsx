"use client";

import MobileBottomNav from "@/components/layout/MobileBottomNav";
import StatusBadge from "../StatusBadge/page";

const CONTEXT = [
  { label: "Course Average", value: "72%" },
  { label: "Your Average", value: "78%" },
  { label: "Class Position", value: "14 / 320" },
];

const STATUS_TONE = {
  Graded: "positive",
  Pending: "muted",
  Current: "bronze",
  Upcoming: "muted",
};

const BREAKDOWN = [
  { assessment: "Assignment 1", score: "18 / 20", weight: "10%", status: "Graded", pct: 90 },
  { assessment: "Assignment 2", score: "Pending", weight: "10%", status: "Pending", pct: null },
  { assessment: "Mid-Semester Test", score: "24 / 30", weight: "20%", status: "Graded", pct: 80 },
  { assessment: "Attendance", score: "87%", weight: "5%", status: "Current", pct: 87 },
  { assessment: "Final Examination", score: "—", weight: "55%", status: "Upcoming", pct: null },
];

function PerformanceChart() {
  const scored = BREAKDOWN.filter((row) => row.pct !== null);

  return (
    <div className="rounded-2xl border border-line bg-white p-5 sm:p-6">
      <h3 className="mb-6 text-sm font-bold uppercase tracking-widest text-charcoal">
        Performance by Assessment
      </h3>

      <div className="flex items-end justify-between gap-4 sm:gap-8" style={{ height: 160 }}>
        {scored.map((row) => (
          <div key={row.assessment} className="flex flex-1 flex-col items-center gap-2">
            <p className="text-xs font-bold text-charcoal">{row.pct}%</p>
            <div className="flex h-[110px] w-full max-w-[44px] items-end rounded-lg bg-cream">
              <div
                className="w-full rounded-lg bg-bronze-deep"
                style={{ height: `${row.pct}%` }}
              />
            </div>
            <p className="text-center text-[10px] font-bold uppercase leading-tight text-graphite-soft">
              {row.assessment}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function CourseGrades() {
  return (
    <>
      <div className="mx-auto max-w-[1000px] space-y-8">
        <div>
          <h2 className="text-lg font-bold text-charcoal">Grades</h2>
          <p className="mt-1 text-sm text-graphite-soft">
            Your academic performance for CSC301 this semester.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          <div className="rounded-2xl border border-line bg-white p-6 text-center lg:col-span-1">
            <p className="text-[11px] font-bold uppercase tracking-wide text-graphite-soft">
              Current Grade
            </p>
            <p className="mt-2 text-4xl font-bold text-bronze-deep">78%</p>
            <p className="mt-1 text-sm font-bold text-charcoal">B+</p>
          </div>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-3 lg:col-span-2">
            {CONTEXT.map((item) => (
              <div key={item.label} className="flex flex-col justify-center rounded-2xl border border-line bg-white p-5">
                <p className="text-[11px] font-bold uppercase tracking-wide text-graphite-soft">
                  {item.label}
                </p>
                <p className="mt-2 text-xl font-bold text-charcoal">{item.value}</p>
              </div>
            ))}
          </div>
        </div>

        <section>
          <h3 className="mb-3 text-sm font-bold uppercase tracking-widest text-charcoal">
            Grade Breakdown
          </h3>

          <div className="overflow-hidden rounded-2xl border border-line bg-white">
            <div className="hidden grid-cols-[1fr_120px_90px_120px] gap-4 border-b border-line bg-cream px-5 py-3 text-[10px] font-bold uppercase tracking-wide text-graphite-soft sm:grid">
              <span>Assessment</span>
              <span>Score</span>
              <span>Weight</span>
              <span>Status</span>
            </div>

            <div className="divide-y divide-line">
              {BREAKDOWN.map((row) => (
                <div
                  key={row.assessment}
                  className="flex flex-col gap-2 px-5 py-3.5 sm:grid sm:grid-cols-[1fr_120px_90px_120px] sm:items-center sm:gap-4"
                >
                  <span className="text-sm font-bold text-charcoal">{row.assessment}</span>
                  <span className="text-sm text-graphite">{row.score}</span>
                  <span className="text-sm text-graphite">{row.weight}</span>
                  <StatusBadge
                    label={row.status}
                    tone={STATUS_TONE[row.status]}
                    className="w-fit"
                  />
                </div>
              ))}
            </div>
          </div>
        </section>

        <PerformanceChart />
      </div>
      <MobileBottomNav active="academic" />
    </>
  );
}