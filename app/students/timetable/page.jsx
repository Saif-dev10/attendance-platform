"use client";

import { useState } from "react";
import Topbar from "@/components/layout/Topbar";
import Sidebar from "@/components/layout/Sidebar";
import { PrinterIcon, DownloadIcon } from "lucide-react";

const days = [
  { label: "Mon", date: 22, active: false },
  { label: "Tue", date: 23, active: true },
  { label: "Wed", date: 24, active: false },
  { label: "Thu", date: 25, active: false },
  { label: "Fri", date: 26, active: false },
];

const timeSlots = [
  "08:00 AM",
  "09:00 AM",
  "10:00 AM",
  "11:00 AM",
  "12:00 PM",
  "01:00 PM",
  "02:00 PM",
  "03:00 PM",
];

export default function StudentTimetable() {
  const [viewMode, setViewMode] = useState("weekly");

  return (
    <main className="min-h-screen bg-paper text-charcoal overflow-x-hidden">
      <Sidebar />

  {/* Weekly and daily views share the same timetable data and grid. */}
      <Topbar title="Academic Timetable">
        <div className="flex items-center gap-2 sm:gap-3">
          <div className="flex rounded-xl border border-line bg-cream p-1">
            <button
              type="button"
              aria-pressed={viewMode === "weekly"}
              onClick={() => setViewMode("weekly")}
              className={`rounded-lg px-3 py-1.5 text-xs font-bold transition-all sm:px-4 ${
                viewMode === "weekly"
                  ? "bg-white text-charcoal shadow-sm"
                  : "text-graphite-soft hover:text-charcoal"
              }`}
            >
              Weekly
            </button>

            <button
              type="button"
              aria-pressed={viewMode === "daily"}
              onClick={() => setViewMode("daily")}
              className={`rounded-lg px-3 py-1.5 text-xs font-bold transition-all sm:px-4 ${
                viewMode === "daily"
                  ? "bg-white text-charcoal shadow-sm"
                  : "text-graphite-soft hover:text-charcoal"
              }`}
            >
              Daily
            </button>
          </div>

          <div className="mx-1 h-7 w-px bg-line sm:mx-2" />

          <button
            type="button"
            aria-label="Print timetable"
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-line text-graphite-soft transition-colors hover:bg-cream"
          >
            <PrinterIcon size={16} />
          </button>

          <button
            type="button"
            aria-label="Download timetable"
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-line text-graphite-soft transition-colors hover:bg-cream"
          >
            <DownloadIcon size={16} />
          </button>
        </div>
      </Topbar>

      <section className="ml-0 md:ml-[280px] min-h-screen pt-[72px]">
        <div className="w-full px-3 py-4 sm:px-6 sm:py-6 lg:px-8 lg:py-7">

          {/* Calendar grid: day headers, time labels, and scheduled classes. */}
          <div className="mx-auto w-full max-w-[1500px] overflow-x-auto rounded-2xl border border-line bg-white shadow-sm">
            <div className="min-w-[720px] overflow-hidden">

            <div className={`grid border-b border-line bg-cream/80 ${
              viewMode === "daily"
                ? "grid-cols-[56px_minmax(0,1fr)] sm:grid-cols-[64px_minmax(0,1fr)]"
                : "grid-cols-[56px_repeat(5,minmax(0,1fr))] sm:grid-cols-[64px_repeat(5,minmax(0,1fr))]"
            }`}>

              <div className="border-r border-line" />

              {days.map((day, index) => (
                <div
                  key={day.label}
                  className={`min-w-0 border-r border-line px-2 py-3 text-center sm:px-3 sm:py-4 ${
                    index === days.length - 1 ? "border-r-0" : ""
                  } ${day.active ? "bg-bronze-deep/10" : ""} ${
                    viewMode === "daily" && !day.active ? "hidden" : ""
                  }`}
                >
                  <p
                    className={`mb-1 text-[9px] font-bold uppercase tracking-widest sm:text-[10px] ${
                      day.active
                        ? "text-bronze-deep"
                        : "text-graphite-soft"
                    }`}
                  >
                    {day.label}
                  </p>

                  <p
                    className={`text-base font-black sm:text-lg ${
                      day.active
                        ? "text-bronze-deep"
                        : "text-charcoal"
                    }`}
                  >
                    {day.date}
                  </p>
                </div>
              ))}
            </div>

            <div className={`grid ${
              viewMode === "daily"
                ? "grid-cols-[56px_minmax(0,1fr)] sm:grid-cols-[64px_minmax(0,1fr)]"
                : "grid-cols-[56px_repeat(5,minmax(0,1fr))] sm:grid-cols-[64px_repeat(5,minmax(0,1fr))]"
            }`}>

              <div className="border-r border-line bg-cream/30">

                {timeSlots.map((time) => (
                  <div
                    key={time}
                    className="flex h-[88px] items-start justify-end border-b border-line px-2 pt-3 sm:h-[100px]"
                  >
                    <span className="whitespace-nowrap text-[9px] font-bold uppercase text-graphite-soft sm:text-[10px]">
                      {time}
                    </span>
                  </div>
                ))}

              </div>

              <div className={`relative min-w-0 border-r border-line ${viewMode === "daily" ? "hidden" : ""}`}>

                {timeSlots.map((_, i) => (
                  <div
                    key={i}
                    className="h-[88px] border-b border-line sm:h-[100px]"
                  />
                ))}

                <div className="absolute left-0 right-0 top-0 h-[200px] p-1 sm:p-1.5">
                  <div className="h-full w-full overflow-hidden rounded-xl bg-charcoal p-2.5 text-cream shadow-lg shadow-charcoal/10 transition-transform hover:scale-[1.01] sm:p-3">

                    <p className="mb-1 truncate text-[8px] font-bold uppercase opacity-70 sm:text-[9px]">
                      MAT311 • LT-02
                    </p>

                    <h4 className="truncate text-[10px] font-black sm:text-xs">
                      Linear Algebra II
                    </h4>

                    <p className="mt-1 truncate text-[8px] font-medium opacity-60 sm:text-[9px]">
                      Prof. Hauwa Bello
                    </p>

                  </div>
                </div>
              </div>

              <div className="relative min-w-0 border-r border-line bg-bronze-deep/5">

                {timeSlots.map((_, i) => (
                  <div
                    key={i}
                    className="h-[88px] border-b border-line sm:h-[100px]"
                  />
                ))}

                <div className="absolute left-0 right-0 top-[220px] z-10 flex items-center">
                  <div className="absolute -left-1 h-2 w-2 rounded-full bg-red-500" />
                  <div className="h-px w-full bg-red-500/50" />
                </div>

                <div className="absolute left-0 right-0 top-[200px] h-[200px] p-1 sm:p-1.5">
                  <div className="h-full w-full overflow-hidden rounded-xl bg-bronze-deep p-2.5 text-cream shadow-lg shadow-bronze-deep/20 transition-transform hover:scale-[1.01] sm:p-3">

                    <div className="mb-1 flex min-w-0 items-start justify-between gap-1">
                      <p className="truncate text-[8px] font-bold uppercase opacity-70 sm:text-[9px]">
                        CSC301 • Hall B-04
                      </p>

                      <span className="shrink-0 rounded bg-white/20 px-1 py-0.5 text-[7px] font-bold sm:px-1.5 sm:text-[8px]">
                        NOW
                      </span>
                    </div>

                    <h4 className="truncate text-[10px] font-black sm:text-xs">
                      Advanced Algorithms
                    </h4>

                    <p className="mt-1 truncate text-[8px] font-medium opacity-60 sm:text-[9px]">
                      Dr. Yusuf Muhammad
                    </p>

                  </div>
                </div>
              </div>

              <div className={`relative min-w-0 border-r border-line ${viewMode === "daily" ? "hidden" : ""}`}>

                {timeSlots.map((_, i) => (
                  <div
                    key={i}
                    className="h-[88px] border-b border-line sm:h-[100px]"
                  />
                ))}

                <div className="absolute left-0 right-0 top-[100px] h-[100px] p-1 sm:p-1.5">
                  <div className="h-full w-full overflow-hidden rounded-xl border border-line bg-cream p-2.5 text-charcoal shadow-sm transition-transform hover:scale-[1.01] sm:p-3">

                    <p className="mb-1 truncate text-[8px] font-bold uppercase text-graphite-soft sm:text-[9px]">
                      GST301 • LT-01
                    </p>

                    <h4 className="truncate text-[10px] font-black sm:text-xs">
                      Entrepreneurship
                    </h4>

                    <p className="mt-1 truncate text-[8px] font-medium text-graphite-soft sm:text-[9px]">
                      Dr. Ibrahim Musa
                    </p>

                  </div>
                </div>
              </div>

              <div className={`relative min-w-0 border-r border-line ${viewMode === "daily" ? "hidden" : ""}`}>

                {timeSlots.map((_, i) => (
                  <div
                    key={i}
                    className="h-[88px] border-b border-line sm:h-[100px]"
                  />
                ))}

                <div className="absolute left-0 right-0 top-[300px] h-[200px] p-1 sm:p-1.5">
                  <div className="h-full w-full overflow-hidden rounded-xl bg-charcoal p-2.5 text-cream shadow-lg shadow-charcoal/10 transition-transform hover:scale-[1.01] sm:p-3">

                    <p className="mb-1 truncate text-[8px] font-bold uppercase opacity-70 sm:text-[9px]">
                      CSC305 • LT-04
                    </p>

                    <h4 className="truncate text-[10px] font-black sm:text-xs">
                      Operating Systems
                    </h4>

                    <p className="mt-1 truncate text-[8px] font-medium opacity-60 sm:text-[9px]">
                      Prof. Hauwa Bello
                    </p>

                  </div>
                </div>
              </div>

              <div className={`relative min-w-0 ${viewMode === "daily" ? "hidden" : ""}`}>

                {timeSlots.map((_, i) => (
                  <div
                    key={i}
                    className="h-[88px] border-b border-line sm:h-[100px]"
                  />
                ))}

                <div className="absolute left-0 right-0 top-0 h-[200px] p-1 sm:p-1.5">
                  <div className="h-full w-full overflow-hidden rounded-xl bg-moss p-2.5 text-cream shadow-lg shadow-moss/10 transition-transform hover:scale-[1.01] sm:p-3">

                    <p className="mb-1 truncate text-[8px] font-bold uppercase opacity-70 sm:text-[9px]">
                      CSC307 • Hall C-01
                    </p>

                    <h4 className="truncate text-[10px] font-black sm:text-xs">
                      Software Engineering
                    </h4>

                    <p className="mt-1 truncate text-[8px] font-medium opacity-60 sm:text-[9px]">
                      Dr. Emeka Nwosu
                    </p>

                  </div>
                </div>
              </div>

            </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}