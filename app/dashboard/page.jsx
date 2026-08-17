"use client";

import Sidebar from "@/components/layout/Sidebar";
import Topbar from "@/components/layout/Topbar";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import { GraduationCap } from "lucide-react";

export default function DashboardPage() {
  return (
    <>
      <Sidebar />
      <Topbar />

      <main className="ml-[280px] pt-[72px] h-screen overflow-y-auto">
        <div className="max-w-[1250px] mx-auto space-y-6 px-6 py-7">

          {/* Dashboard Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 min-w-0">

            {/* WELCOME CARD */}
            <Card
              className="
                md:col-span-2
                min-w-0
                rounded-2xl
                bg-[#1a365d]
                p-7
                text-white
                relative
                overflow-hidden
                flex
                items-center
                justify-between
              "
            >
              {/* Main Content */}
              <div className="relative z-10 min-w-0 pr-6">

                <h2 className="text-2xl lg:text-3xl font-bold mb-2">
                  Hello, Saifullah! 👋
                </h2>

                <p className="text-blue-100 text-base lg:text-lg opacity-90 max-w-2xl">
                  You have 2 assignments due this week and your next class is
                  CSC301 at 10:00 AM.
                </p>

                {/* Buttons */}
                <div className="mt-5 flex flex-wrap gap-3">

                  <Button
                    className="
                      px-5
                      py-2.5
                      rounded-xl
                      bg-[#0274c7]
                      hover:bg-[#0e91e9]
                      text-white
                      font-bold
                      text-sm
                      transition-all
                      shadow-lg
                      shadow-[#0c426e]/20
                      cursor-pointer
                      hover:opacity-90
                      active:opacity-75
                    "
                  >
                    View Timetable
                  </Button>

                  <Button
                    className="
                      px-5
                      py-2.5
                      rounded-xl
                      bg-white/10
                      hover:bg-white/20
                      text-white
                      font-bold
                      text-sm
                      transition-all
                      backdrop-blur-sm
                      border
                      border-white/20
                      cursor-pointer
                      active:opacity-75
                    "
                  >
                    Campus Ride
                  </Button>

                </div>
              </div>

              {/* Decorative Graduation Cap */}
              <div
                className="
                  absolute
                  right-0
                  top-0
                  h-full
                  w-1/3
                  bg-gradient-to-l
                  from-white/10
                  to-transparent
                  flex
                  items-center
                  justify-center
                  pointer-events-none
                "
              >
                <GraduationCap
                  size={160}
                  strokeWidth={1}
                  className="text-white/5 rotate-12"
                />
              </div>
            </Card>


            {/* CGPA CARD */}
            <Card
              className="
                md:col-span-1
                min-w-0
                rounded-2xl
                border
                border-slate-200
                bg-white
                p-6
                flex
                flex-col
                justify-between
              "
            >

              {/* Header */}
              <div className="flex items-center justify-between gap-3 mb-4">

                <h3 className="text-sm font-bold text-[#0c426e] uppercase tracking-wider">
                  Current CGPA
                </h3>

                <span className="shrink-0 px-2 py-1 rounded-md bg-emerald-50 text-emerald-600 text-[10px] font-bold">
                  TOP 5%
                </span>

              </div>


              {/* Big Stat */}
              <div className="flex items-end gap-2 mb-6 min-w-0">

                <span className="text-4xl sm:text-5xl font-black text-[#0c426e] tracking-tighter">
                  4.62
                </span>

                <span className="text-slate-400 font-bold text-base sm:text-lg mb-1">
                  / 5.0
                </span>

              </div>


              {/* Progress */}
              <div className="space-y-3">

                <div className="flex items-center justify-between gap-2 text-xs font-semibold">

                  <span className="text-slate-600">
                    Academic Progress
                  </span>

                  <span className="text-[#0c426e] shrink-0">
                    72%
                  </span>

                </div>

                <div className="h-2 bg-slate-100 rounded-full overflow-hidden">

                  <div className="h-full w-[72%] bg-[#0274c7] rounded-full" />

                </div>

              </div>

            </Card>

          </div>

          <div className="grid gap-4 grid-cols-1  md:grid-cols-3 lg:grid-cols-4">

            <Card className="border rounded-md p-4 flex flex-col items-center justify-center gap-4 bg-white">
              <p className="uppercase text-slate-500 ">Attendance</p>

              <p className="font-semibold text-2xl">92%</p>
            </Card>

            <Card className="border rounded-md p-4 flex flex-col items-center justify-center gap-4 bg-white">
              <p className="uppercase text-slate-500 ">Cources</p>

              <p className="font-semibold text-2xl">8</p>

              <p className="font-semibold text-2xl">Active</p>
            </Card>

            <Card className="border rounded-md p-4 flex flex-col items-center justify-center gap-4 bg-white">
              <p className="uppercase text-slate-500 ">Credits</p>

              <p className="font-semibold text-2xl">22</p>

              <p className="font-semibold text-2xl">units</p>
            </Card>

            <Card className="border rounded-md p-4 flex flex-col items-center justify-center gap-4 bg-white">
              <p className="uppercase text-slate-500 ">Campus Balance</p>

              <p className="font-semibold text-2xl">N4,250</p>
            </Card>
          </div>

        </div>
      </main>
    </>
  )
}