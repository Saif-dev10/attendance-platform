"use client";

import MobileBottomNav from "@/components/layout/MobileBottomNav";
import StatusBadge from "../StatusBadge/page";
import { CheckCircle2, XCircle, Clock3 } from "lucide-react";

const STATS = [
  { label: "Present", value: 26, icon: CheckCircle2, tone: "positive" },
  { label: "Absent", value: 4, icon: XCircle, tone: "negative" },
  { label: "Late", value: 2, icon: Clock3, tone: "attention" },
];

const STATUS_TONE = {
  Present: "positive",
  Absent: "negative",
  Late: "attention",
};

const HISTORY = [
  { date: "Sep 02", topic: "Dynamic Programming", status: "Present" },
  { date: "Aug 30", topic: "Graph Algorithms", status: "Present" },
  { date: "Aug 27", topic: "Complexity Analysis", status: "Late" },
  { date: "Aug 23", topic: "Greedy Algorithms", status: "Absent" },
  { date: "Aug 19", topic: "Dynamic Programming Foundations", status: "Present" },
  { date: "Aug 16", topic: "Divide and Conquer", status: "Present" },
  { date: "Aug 12", topic: "Algorithm Analysis", status: "Present" },
];

// Compact September calendar. Day → status, kept in sync with the history above.
const CALENDAR_DAYS = [
  { day: 1, status: null },
  { day: 2, status: "Present" },
  { day: 3, status: null },
  { day: 4, status: null },
  { day: 5, status: null },
];

const CALENDAR_PREVIOUS_MONTH = [
  { day: 12, status: "Present" },
  { day: 16, status: "Present" },
  { day: 19, status: "Present" },
  { day: 23, status: "Absent" },
  { day: 27, status: "Late" },
  { day: 30, status: "Present" },
];

const DOT_COLOR = {
  Present: "bg-emerald-600",
  Absent: "bg-rose-600",
  Late: "bg-amber-600",
};

function AttendanceCalendar() {
  const markedDays = new Map([
    ...CALENDAR_PREVIOUS_MONTH.map((d) => [d.day, d.status]),
    ...CALENDAR_DAYS.filter((d) => d.status).map((d) => [d.day, d.status]),
  ]);

  return (
    <div className="rounded-2xl border border-line bg-white p-5 sm:p-6">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-sm font-bold text-charcoal">August–September</h3>
        <div className="flex items-center gap-3 text-[10px] font-bold uppercase text-graphite-soft">
          <span className="flex items-center gap-1">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-600" /> Present
          </span>
          <span className="flex items-center gap-1">
            <span className="h-1.5 w-1.5 rounded-full bg-amber-600" /> Late
          </span>
          <span className="flex items-center gap-1">
            <span className="h-1.5 w-1.5 rounded-full bg-rose-600" /> Absent
          </span>
        </div>
      </div>

      <div className="grid grid-cols-7 gap-1.5 text-center">
        {["S", "M", "T", "W", "T", "F", "S"].map((d, i) => (
          <p key={`${d}-${i}`} className="pb-1 text-[10px] font-bold text-graphite-soft">
            {d}
          </p>
        ))}

        {Array.from({ length: 31 }, (_, i) => i + 1).map((day) => {
          const status = markedDays.get(day);
          const isToday = day === 3;

          return (
            <div
              key={day}
              className={`flex aspect-square flex-col items-center justify-center rounded-lg text-[11px] ${
                isToday
                  ? "border-2 border-bronze-deep font-bold text-bronze-deep"
                  : "border border-transparent text-graphite"
              }`}
            >
              <span>{day}</span>
              {status && <span className={`mt-0.5 h-1 w-1 rounded-full ${DOT_COLOR[status]}`} />}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default function CourseAttendance() {
  return (
    <>
      <div className="mx-auto max-w-[1100px] space-y-8">
        <div>
          <h2 className="text-lg font-bold text-charcoal">Attendance</h2>
          <p className="mt-1 text-sm text-graphite-soft">
            Your class attendance record for CSC301 this semester.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          <div className="rounded-2xl border border-line bg-white p-6 text-center lg:col-span-1">
            <p className="text-4xl font-bold text-bronze-deep">87%</p>
            <p className="mt-2 text-xs text-graphite-soft">26 of 30 classes attended</p>

            <div className="mt-5 h-1.5 w-full overflow-hidden rounded-full bg-cream">
              <div className="h-full rounded-full bg-bronze-deep" style={{ width: "87%" }} />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3 lg:col-span-2">
            {STATS.map((stat) => (
              <div key={stat.label} className="flex flex-col items-center justify-center rounded-2xl border border-line bg-white p-5 text-center">
                <stat.icon size={18} className="mb-2 text-graphite-soft" strokeWidth={2} />
                <p className="text-xl font-bold text-charcoal">{stat.value}</p>
                <p className="mt-1 text-[11px] font-bold uppercase tracking-wide text-graphite-soft">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          <section className="lg:col-span-2">
            <h3 className="mb-3 text-sm font-bold uppercase tracking-widest text-charcoal">
              Attendance History
            </h3>

            <div className="overflow-hidden rounded-2xl border border-line bg-white">
              <div className="hidden grid-cols-[100px_1fr_120px] gap-4 border-b border-line bg-cream px-5 py-3 text-[10px] font-bold uppercase tracking-wide text-graphite-soft sm:grid">
                <span>Date</span>
                <span>Topic</span>
                <span>Status</span>
              </div>

              <div className="divide-y divide-line">
                {HISTORY.map((row) => (
                  <div
                    key={`${row.date}-${row.topic}`}
                    className="flex flex-col gap-2 px-5 py-3.5 sm:grid sm:grid-cols-[100px_1fr_120px] sm:items-center sm:gap-4"
                  >
                    <span className="text-xs font-bold text-charcoal">{row.date}</span>
                    <span className="text-sm text-graphite">{row.topic}</span>
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

          <section>
            <h3 className="mb-3 text-sm font-bold uppercase tracking-widest text-charcoal">
              Calendar
            </h3>
            <AttendanceCalendar />
          </section>
        </div>
      </div>
      <MobileBottomNav active="academic" />
    </>
  );
}