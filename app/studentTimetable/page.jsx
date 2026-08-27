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
    <main className="bg-[#f8fafc] text-ink min-h-screen">
      <Sidebar />

      <Topbar title="Academic Timetable">
        <div className="flex items-center gap-3">
          <div className="bg-slate-50 p-1 rounded-xl border border-slate-200 flex">
            <button className="px-4 py-1.5 rounded-lg bg-white shadow-sm text-xs font-bold text-navy-900 transition-all cursor-pointer">
              Weekly
            </button>
            <button className="px-4 py-1.5 rounded-lg text-xs font-bold text-ink-faint hover:text-ink-muted transition-all cursor-pointer">
              Daily
            </button>
          </div>

          <div className="h-8 w-px bg-slate-200 mx-2"></div>

          <button className="w-10 h-10 flex items-center justify-center rounded-xl border border-slate-200 text-ink-muted hover:bg-slate-50">
            <PrinterIcon className="cursor-pointer" size={18} />
          </button>

          <button className="w-10 h-10 flex items-center justify-center rounded-xl border border-slate-200 text-ink-muted hover:bg-slate-50">
            <DownloadIcon className="cursor-pointer" size={18} />
          </button>
        </div>
      </Topbar>

      {/* Content: offset for fixed Sidebar (280px) + fixed Topbar (72px) */}
      <div className="ml-[280px] mt-[72px] px-8 py-7 bg-white min-h-[calc(100vh-72px)]">
        <div className="max-w-[1400px] mx-auto border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
          {/* Calendar Header (Days) */}
          <div className="grid grid-cols-[80px_repeat(5,1fr)] bg-slate-50/80 border-b border-slate-200 sticky top-[72px] z-20 backdrop-blur-sm">
            <div className="px-4 py-4 border-r border-slate-200"></div>
            {days.map((day) => (
              <div
                key={day.label}
                className={`px-4 py-4 border-r border-slate-200 text-center last:border-r-0 ${
                  day.active ? "bg-brand-50/30" : ""
                }`}
              >
                <p
                  className={`text-[10px] font-bold uppercase tracking-widest mb-1 ${
                    day.active ? "text-brand-600" : "text-ink-faint"
                  }`}
                >
                  {day.label}
                </p>
                <p
                  className={`text-lg font-black ${
                    day.active ? "text-brand-700" : "text-navy-900"
                  }`}
                >
                  {day.date}
                </p>
              </div>
            ))}
          </div>

          {/* Calendar Content */}
          <div className="grid grid-cols-[80px_repeat(5,1fr)] relative">
            {/* Time Labels */}
            <div className="border-r border-slate-200 bg-slate-50/20">
              {timeSlots.map((time) => (
                <div
                  key={time}
                  className="h-[100px] border-b border-slate-100 px-2 py-4 text-right"
                >
                  <span className="text-[10px] font-bold text-ink-faint uppercase">
                    {time}
                  </span>
                </div>
              ))}
            </div>

            {/* Mon */}
            <div className="border-r border-slate-200 relative">
              {timeSlots.map((_, i) => (
                <div key={i} className="h-[100px] border-b border-slate-100"></div>
              ))}
              <div className="absolute top-0 left-0 right-0 p-1.5 h-[200px]">
                <div className="w-full h-full bg-navy-600 rounded-xl p-3 text-white border border-white/10 shadow-lg shadow-navy-900/10 hover:scale-[1.02] transition-transform cursor-pointer">
                  <p className="text-[9px] font-bold uppercase opacity-70 mb-1">
                    MAT311 • LT-02
                  </p>
                  <h4 className="text-xs font-black mb-1">Linear Algebra II</h4>
                  <p className="text-[9px] font-medium opacity-60">Prof. Hauwa Bello</p>
                </div>
              </div>
            </div>

            {/* Tue (Current Day) */}
            <div className="border-r border-slate-200 bg-brand-50/10 relative">
              {timeSlots.map((_, i) => (
                <div key={i} className="h-[100px] border-b border-slate-100"></div>
              ))}

              {/* Current Time Marker */}
              <div className="absolute top-[220px] left-0 right-0 z-10 flex items-center">
                <div className="w-2 h-2 rounded-full bg-red-500 absolute -left-1"></div>
                <div className="h-px w-full bg-red-500/50"></div>
              </div>

              <div className="absolute top-[200px] left-0 right-0 p-1.5 h-[200px]">
                <div className="w-full h-full bg-brand-600 rounded-xl p-3 text-white border border-white/10 shadow-lg shadow-brand-900/20 hover:scale-[1.02] transition-transform cursor-pointer">
                  <div className="flex justify-between items-start mb-1">
                    <p className="text-[9px] font-bold uppercase opacity-70">
                      CSC301 • Hall B-04
                    </p>
                    <span className="px-1.5 py-0.5 rounded bg-white/20 text-[8px] font-bold">
                      NOW
                    </span>
                  </div>
                  <h4 className="text-xs font-black mb-1">Advanced Algorithms</h4>
                  <p className="text-[9px] font-medium opacity-60">Dr. Yusuf Muhammad</p>
                </div>
              </div>
            </div>

            {/* Wed */}
            <div className="border-r border-slate-200 relative">
              {timeSlots.map((_, i) => (
                <div key={i} className="h-[100px] border-b border-slate-100"></div>
              ))}
              <div className="absolute top-[100px] left-0 right-0 p-1.5 h-[100px]">
                <div className="w-full h-full bg-slate-100 rounded-xl p-3 text-navy-900 border border-slate-200 shadow-sm hover:scale-[1.02] transition-transform cursor-pointer">
                  <p className="text-[9px] font-bold text-ink-faint uppercase mb-1">
                    GST301 • LT-01
                  </p>
                  <h4 className="text-xs font-black mb-1">Entrepreneurship</h4>
                  <p className="text-[9px] font-medium text-ink-muted">Dr. Ibrahim Musa</p>
                </div>
              </div>
            </div>

            {/* Thu */}
            <div className="border-r border-slate-200 relative">
              {timeSlots.map((_, i) => (
                <div key={i} className="h-[100px] border-b border-slate-100"></div>
              ))}
              <div className="absolute top-[300px] left-0 right-0 p-1.5 h-[200px]">
                <div className="w-full h-full bg-navy-600 rounded-xl p-3 text-white border border-white/10 shadow-lg shadow-navy-900/10 hover:scale-[1.02] transition-transform cursor-pointer">
                  <p className="text-[9px] font-bold uppercase opacity-70 mb-1">
                    CSC305 • LT-04
                  </p>
                  <h4 className="text-xs font-black mb-1">Operating Systems</h4>
                  <p className="text-[9px] font-medium opacity-60">Prof. Hauwa Bello</p>
                </div>
              </div>
            </div>

            {/* Fri */}
            <div className="relative">
              {timeSlots.map((_, i) => (
                <div key={i} className="h-[100px] border-b border-slate-100"></div>
              ))}
              <div className="absolute top-0 left-0 right-0 p-1.5 h-[200px]">
                <div className="w-full h-full bg-orange-600 rounded-xl p-3 text-white border border-white/10 shadow-lg shadow-orange-900/10 hover:scale-[1.02] transition-transform cursor-pointer">
                  <p className="text-[9px] font-bold uppercase opacity-70 mb-1">
                    CSC307 • Hall C-01
                  </p>
                  <h4 className="text-xs font-black mb-1">Software Engineering</h4>
                  <p className="text-[9px] font-medium opacity-60">Dr. Emeka Nwosu</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}