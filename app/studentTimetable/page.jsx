"use client";

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
  return (
    <main className="min-h-screen bg-[#f8fafc] text-ink overflow-x-hidden">
      <Sidebar />

      <Topbar title="Academic Timetable">
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Weekly / Daily */}
          <div className="flex rounded-xl border border-slate-200 bg-slate-50 p-1">
            <button className="rounded-lg bg-white px-3 sm:px-4 py-1.5 text-xs font-bold text-[#0f172a] shadow-sm transition-all">
              Weekly
            </button>

            <button className="rounded-lg px-3 sm:px-4 py-1.5 text-xs font-bold text-[#94a3b8] transition-all hover:text-[#64748b]">
              Daily
            </button>
          </div>

          {/* Divider */}
          <div className="mx-1 h-7 w-px bg-slate-200 sm:mx-2" />

          {/* Print */}
          <button
            type="button"
            aria-label="Print timetable"
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-slate-200 text-[#64748b] transition-colors hover:bg-slate-50"
          >
            <PrinterIcon size={16} />
          </button>

          {/* Download */}
          <button
            type="button"
            aria-label="Download timetable"
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-slate-200 text-[#64748b] transition-colors hover:bg-slate-50"
          >
            <DownloadIcon size={16} />
          </button>
        </div>
      </Topbar>

      {/* =====================================================
          PAGE CONTENT
      ===================================================== */}

      <section className="ml-[280px] min-h-screen pt-[72px]">
        <div className="w-full px-4 py-5 sm:px-6 sm:py-6 lg:px-8 lg:py-7">

          {/* Timetable container */}
          <div className="mx-auto w-full max-w-[1500px] overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">

            {/* =================================================
                DAYS HEADER
            ================================================= */}

            <div className="grid grid-cols-[64px_repeat(5,minmax(0,1fr))] border-b border-slate-200 bg-slate-50/80">

              {/* Empty time column */}
              <div className="border-r border-slate-200" />

              {days.map((day, index) => (
                <div
                  key={day.label}
                  className={`min-w-0 border-r border-slate-200 px-2 py-3 text-center sm:px-3 sm:py-4 ${
                    index === days.length - 1 ? "border-r-0" : ""
                  } ${day.active ? "bg-brand-50/30" : ""}`}
                >
                  <p
                    className={`mb-1 text-[9px] font-bold uppercase tracking-widest sm:text-[10px] ${
                      day.active
                        ? "text-brand-600"
                        : "text-[#94a3b8]"
                    }`}
                  >
                    {day.label}
                  </p>

                  <p
                    className={`text-base font-black sm:text-lg ${
                      day.active
                        ? "text-brand-700"
                        : "text-[#0f172a]"
                    }`}
                  >
                    {day.date}
                  </p>
                </div>
              ))}
            </div>

            {/* =================================================
                CALENDAR BODY
            ================================================= */}

            <div className="grid grid-cols-[64px_repeat(5,minmax(0,1fr))]">

              {/* =================================================
                  TIME COLUMN
              ================================================= */}

              <div className="border-r border-slate-200 bg-slate-50/30">

                {timeSlots.map((time) => (
                  <div
                    key={time}
                    className="flex h-[88px] items-start justify-end border-b border-slate-100 px-2 pt-3 sm:h-[100px]"
                  >
                    <span className="whitespace-nowrap text-[9px] font-bold uppercase text-[#94a3b8] sm:text-[10px]">
                      {time}
                    </span>
                  </div>
                ))}

              </div>

              {/* =================================================
                  MONDAY
              ================================================= */}

              <div className="relative min-w-0 border-r border-slate-200">

                {timeSlots.map((_, i) => (
                  <div
                    key={i}
                    className="h-[88px] border-b border-slate-100 sm:h-[100px]"
                  />
                ))}

                <div className="absolute left-0 right-0 top-0 h-[200px] p-1 sm:p-1.5">
                  <div className="h-full w-full overflow-hidden rounded-xl bg-[#0c426e] p-2.5 text-white shadow-lg shadow-navy-900/10 transition-transform hover:scale-[1.01] sm:p-3">

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

              {/* =================================================
                  TUESDAY
              ================================================= */}

              <div className="relative min-w-0 border-r border-slate-200 bg-brand-50/10">

                {timeSlots.map((_, i) => (
                  <div
                    key={i}
                    className="h-[88px] border-b border-slate-100 sm:h-[100px]"
                  />
                ))}

                {/* Current time */}
                <div className="absolute left-0 right-0 top-[220px] z-10 flex items-center">
                  <div className="absolute -left-1 h-2 w-2 rounded-full bg-red-500" />
                  <div className="h-px w-full bg-red-500/50" />
                </div>

                {/* Class */}
                <div className="absolute left-0 right-0 top-[200px] h-[200px] p-1 sm:p-1.5">
                  <div className="h-full w-full overflow-hidden rounded-xl bg-[#0274c7] p-2.5 text-white shadow-lg shadow-brand-900/20 transition-transform hover:scale-[1.01] sm:p-3">

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

              {/* =================================================
                  WEDNESDAY
              ================================================= */}

              <div className="relative min-w-0 border-r border-slate-200">

                {timeSlots.map((_, i) => (
                  <div
                    key={i}
                    className="h-[88px] border-b border-slate-100 sm:h-[100px]"
                  />
                ))}

                <div className="absolute left-0 right-0 top-[100px] h-[100px] p-1 sm:p-1.5">
                  <div className="h-full w-full overflow-hidden rounded-xl border border-slate-200 bg-slate-100 p-2.5 text-[#0f172a] shadow-sm transition-transform hover:scale-[1.01] sm:p-3">

                    <p className="mb-1 truncate text-[8px] font-bold uppercase text-[#94a3b8] sm:text-[9px]">
                      GST301 • LT-01
                    </p>

                    <h4 className="truncate text-[10px] font-black sm:text-xs">
                      Entrepreneurship
                    </h4>

                    <p className="mt-1 truncate text-[8px] font-medium text-[#64748b] sm:text-[9px]">
                      Dr. Ibrahim Musa
                    </p>

                  </div>
                </div>
              </div>

              {/* =================================================
                  THURSDAY
              ================================================= */}

              <div className="relative min-w-0 border-r border-slate-200">

                {timeSlots.map((_, i) => (
                  <div
                    key={i}
                    className="h-[88px] border-b border-slate-100 sm:h-[100px]"
                  />
                ))}

                <div className="absolute left-0 right-0 top-[300px] h-[200px] p-1 sm:p-1.5">
                  <div className="h-full w-full overflow-hidden rounded-xl bg-[#0c426e] p-2.5 text-white shadow-lg shadow-navy-900/10 transition-transform hover:scale-[1.01] sm:p-3">

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

              {/* =================================================
                  FRIDAY
              ================================================= */}

              <div className="relative min-w-0">

                {timeSlots.map((_, i) => (
                  <div
                    key={i}
                    className="h-[88px] border-b border-slate-100 sm:h-[100px]"
                  />
                ))}

                <div className="absolute left-0 right-0 top-0 h-[200px] p-1 sm:p-1.5">
                  <div className="h-full w-full overflow-hidden rounded-xl bg-orange-600 p-2.5 text-white shadow-lg shadow-orange-900/10 transition-transform hover:scale-[1.01] sm:p-3">

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
      </section>
    </main>
  );
}