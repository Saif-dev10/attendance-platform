"use client";

import Sidebar from "@/components/layout/Sidebar";
import Topbar from "@/components/layout/Topbar";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import { Search, Bell, Bus, Navigation } from "lucide-react";
import {
  GraduationCap,
  CheckCircle2,
  BookOpen,
  BarChart3,
  Wallet,
} from "lucide-react";

const statCards = [
  {
    label: "Attendance",
    value: "92%",
    icon: CheckCircle2,
    iconBg: "bg-[#e8f4fd]",
    iconColor: "text-[#0274c7]",
  },
  {
    label: "Courses",
    value: "8 Active",
    icon: BookOpen,
    iconBg: "bg-slate-50",
    iconColor: "text-slate-600",
  },
  {
    label: "Credits",
    value: "22 Units",
    icon: BarChart3,
    iconBg: "bg-slate-50",
    iconColor: "text-slate-600",
  },
  {
    label: "Campus Balance",
    value: "₦4,250",
    icon: Wallet,
    iconBg: "bg-emerald-50",
    iconColor: "text-emerald-600",
  },
];

const todaysLectures = [
  {
    time: "10:00",
    period: "AM",
    course: "CSC301: Advanced Algorithms",
    meta: "Dr. Yusuf Muhammad • Hall B-04",
    status: "IN 15 MINS",
    statusStyle: "bg-blue-50 text-blue-600",
    completed: false,
  },
  {
    time: "08:00",
    period: "AM",
    course: "MAT311: Linear Algebra II",
    meta: "Prof. Hauwa Bello • LT-02",
    status: "Completed",
    statusStyle: "bg-slate-100 text-slate-500 uppercase tracking-widest",
    completed: true,
  },
];

export default function DashboardPage() {
  return (
    <>
      <Sidebar />

      <Topbar title="Student Dashboard">
        <div className="relative w-64 mr-4">
          <Search
            size={16}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
          />
          <input
            type="text"
            placeholder="Search courses, materials..."
            className="
              w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200
              rounded-lg text-xs outline-none focus:ring-2 focus:ring-[#0e91e9]/20
            "
          />
        </div>

        <button
          type="button"
          className="
            w-10 h-10 flex items-center justify-center rounded-xl
            text-slate-600 hover:bg-slate-50 transition-colors relative
          "
        >
          <Bell size={20} />
          <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white" />
        </button>
      </Topbar>

      <main className="ml-[280px] pt-[72px] h-screen overflow-y-auto">
        <div className="max-w-[1250px] mx-auto space-y-6 px-6 py-7">

          {/* Dashboard Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 min-w-0">

            {/* WELCOME CARD */}
            <Card
              className="
                md:col-span-2 min-w-0 rounded-2xl bg-[#1a365d] p-7 text-white
                relative overflow-hidden flex items-center justify-between
              "
            >
              <div className="relative z-10 min-w-0 pr-6">
                <h2 className="text-2xl lg:text-3xl font-bold mb-2">
                  Hello, Saifullah! 👋
                </h2>
                <p className="text-blue-100 text-base lg:text-lg opacity-90 max-w-2xl">
                  You have 2 assignments due this week and your next class is
                  CSC301 at 10:00 AM.
                </p>

                <div className="mt-5 flex flex-wrap gap-3">
                  <Button
                    className="
                      px-5 py-2.5 rounded-xl bg-[#0274c7] hover:bg-[#0e91e9]
                      text-white font-bold text-sm transition-all shadow-lg
                      shadow-[#0c426e]/20 cursor-pointer hover:opacity-90 active:opacity-75
                    "
                  >
                    View Timetable
                  </Button>
                  <Button
                    className="
                      px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/20
                      text-white font-bold text-sm transition-all backdrop-blur-sm
                      border border-white/20 cursor-pointer active:opacity-75
                    "
                  >
                    Campus Ride
                  </Button>
                </div>
              </div>

              <div
                className="
                  absolute right-0 top-0 h-full w-1/3 bg-gradient-to-l
                  from-white/10 to-transparent flex items-center justify-center
                  pointer-events-none
                "
              >
                <GraduationCap size={160} strokeWidth={1} className="text-white/5 rotate-12" />
              </div>
            </Card>

            {/* CGPA CARD */}
            <Card
              className="
                md:col-span-1 min-w-0 rounded-2xl border border-slate-200
                bg-white p-6 flex flex-col justify-between
              "
            >
              <div className="flex items-center justify-between gap-3 mb-4">
                <h3 className="text-sm font-bold text-[#0c426e] uppercase tracking-wider">
                  Current CGPA
                </h3>
                <span className="shrink-0 px-2 py-1 rounded-md bg-emerald-50 text-emerald-600 text-[10px] font-bold">
                  TOP 5%
                </span>
              </div>

              <div className="flex items-end gap-2 mb-6 min-w-0">
                <span className="text-4xl sm:text-5xl font-black text-[#0c426e] tracking-tighter">
                  4.62
                </span>
                <span className="text-slate-400 font-bold text-base sm:text-lg mb-1">
                  / 5.0
                </span>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between gap-2 text-xs font-semibold">
                  <span className="text-slate-600">Academic Progress</span>
                  <span className="text-[#0c426e] shrink-0">72%</span>
                </div>
                <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full w-[72%] bg-[#0274c7] rounded-full" />
                </div>
              </div>
            </Card>
          </div>

          {/* STAT CARDS */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {statCards.map(({ label, value, icon: Icon, iconBg, iconColor }) => (
              <Card
                key={label}
                className="rounded-2xl border border-slate-200 bg-white p-5 min-w-0"
              >
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">
                  {label}
                </p>
                <div className="flex items-center justify-between gap-2">
                  <span className="text-2xl font-bold text-[#0c426e] truncate">
                    {value}
                  </span>
                  <div className={`w-10 h-10 rounded-full ${iconBg} flex items-center justify-center ${iconColor} shrink-0`}>
                    <Icon size={20} strokeWidth={2} />
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {/* Today's Lectures + Campus Ride */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 min-w-0">

            {/* Today's Lectures */}
            <Card className="lg:col-span-2 min-w-0 rounded-2xl border border-slate-200 bg-white flex flex-col p-0">
              <div className="px-6 py-5 border-b border-slate-100 flex items-center justify-between">
                <h3 className="font-bold text-[#0c426e]">Today&apos;s Lectures</h3>
                <button className="text-xs font-bold text-[#0274c7] hover:underline">
                  Full Schedule
                </button>
              </div>

              <div className="p-4 space-y-3">
                {todaysLectures.map(({ time, period, course, meta, status, statusStyle, completed }) => (
                  <div
                    key={course}
                    className={`p-4 rounded-xl border border-slate-100 flex items-center gap-4 group hover:border-[#7cc2ef] transition-all ${
                      completed ? "bg-white opacity-60" : "bg-slate-50/50"
                    }`}
                  >
                    <div className="w-12 h-12 rounded-lg bg-white border border-slate-200 flex flex-col items-center justify-center shrink-0">
                      <span className="text-[10px] font-bold text-slate-400 uppercase">
                        {time}
                      </span>
                      <span className="text-sm font-black text-[#0c426e] uppercase">
                        {period}
                      </span>
                    </div>

                    <div className="flex-1 min-w-0">
                      <h4 className="font-bold text-[#0c426e] truncate">{course}</h4>
                      <p className="text-xs text-slate-600 truncate">{meta}</p>
                    </div>

                    <span className={`px-3 py-1 rounded-full text-[10px] font-bold shrink-0 ${statusStyle}`}>
                      {status}
                    </span>
                  </div>
                ))}
              </div>
            </Card>

            {/* Campus Ride Status */}
            <Card className="lg:col-span-1 min-w-0 rounded-2xl border border-slate-200 bg-white flex flex-col p-0">
              <div className="px-6 py-5 border-b border-slate-100 flex items-center justify-between">
                <h3 className="font-bold text-[#0c426e]">Campus Ride</h3>
                <button className="w-8 h-8 rounded-lg bg-slate-50 flex items-center justify-center text-slate-600">
                  <Bus size={16} />
                </button>
              </div>

              <div className="p-6 flex-1 flex flex-col items-center justify-center text-center">
                <div className="w-16 h-16 rounded-2xl bg-[#e8f4fd] flex items-center justify-center text-[#0274c7] mb-4 shadow-inner shadow-[#0274c7]/10">
                  <Navigation size={28} />
                </div>
                <h4 className="font-bold text-[#0c426e] mb-1">Gate A Shuttle arriving</h4>
                <p className="text-sm text-slate-600 mb-6">
                  Approx. 4 mins to Library bus stop
                </p>
                <Button className="w-full py-3 rounded-xl bg-[#1a365d] text-white font-bold text-sm hover:bg-[#0c426e] transition-all ">
                  Book Ride
                </Button>
              </div>
            </Card>
          </div>

        </div>
      </main>
    </>
  );
}