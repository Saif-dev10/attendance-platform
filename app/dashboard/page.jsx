"use client";

import { useState } from "react";
import Sidebar, { studentSections } from "@/components/layout/Sidebar";
import Topbar from "@/components/layout/Topbar";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import Link from "next/link";
import { useRouter } from "next/navigation";
import MobileBottomNav from "@/components/layout/MobileBottomNav";
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
    iconBg: "bg-bronze-deep/10",
    iconColor: "text-bronze-deep",
  },
  {
    label: "Courses",
    value: "8 Active",
    icon: BookOpen,
    iconBg: "bg-paper",
    iconColor: "text-graphite",
  },
  {
    label: "Credits",
    value: "22 Units",
    icon: BarChart3,
    iconBg: "bg-paper",
    iconColor: "text-graphite",
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
    statusStyle: "bg-bronze-deep/10 text-bronze-deep",
    completed: false,
  },
  {
    time: "08:00",
    period: "AM",
    course: "MAT311: Linear Algebra II",
    meta: "Prof. Hauwa Bello • LT-02",
    status: "Completed",
    statusStyle: "bg-line text-graphite-soft uppercase tracking-widest",
    completed: true,
  },
];

export default function DashboardPage() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [searchOpen, setSearchOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);

  const filteredLectures = todaysLectures.filter(({ course, meta }) =>
    `${course} ${meta}`.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <>
      {/* The dashboard puts search, alerts, and the next few academic actions within reach. */}
      <Sidebar
        sections={studentSections}
        user={{
          name: "David Okafor",
          role: "Student • 300L",
          avatar: "/avatar-placeholder.svg",
        }}
      />

      <Topbar title="Student Dashboard">
        {/* Desktop search, mobile search trigger, and notification menu. */}
        <div className="relative w-40 sm:w-64 mr-2 sm:mr-4 hidden sm:block">
          <Search
            size={16}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-graphite-soft"
          />
          <input
            type="text"
            placeholder="Search courses, materials..."
            value={searchQuery}
            onChange={(event) => setSearchQuery(event.target.value)}
            className="
              w-full pl-9 pr-4 py-2 bg-paper border border-line
              rounded-lg text-xs outline-none focus:ring-2 focus:ring-bronze-deep/20
            "
          />
        </div>

        <button
          type="button"
          aria-label="Search"
          aria-expanded={searchOpen}
          onClick={() => setSearchOpen((isOpen) => !isOpen)}
          className="
            sm:hidden w-10 h-10 flex items-center justify-center rounded-xl
            text-graphite hover:bg-paper transition-colors mr-1
          "
        >
          <Search size={20} />
        </button>

        <button
          type="button"
          aria-label="Notifications"
          aria-expanded={notificationsOpen}
          onClick={() => setNotificationsOpen((isOpen) => !isOpen)}
          className="
            w-10 h-10 flex items-center justify-center rounded-xl
            text-graphite hover:bg-paper transition-colors relative
          "
        >
          <Bell size={20} />
          <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white" />
        </button>

        {searchOpen && (
          <input
            type="search"
            aria-label="Search courses and materials"
            placeholder="Search..."
            value={searchQuery}
            onChange={(event) => setSearchQuery(event.target.value)}
            className="sm:hidden absolute top-[72px] left-4 right-4 w-auto px-4 py-3 bg-white border border-line rounded-lg text-sm shadow-lg outline-none focus:ring-2 focus:ring-bronze-deep/20"
            autoFocus
          />
        )}

        {notificationsOpen && (
          <div className="absolute top-[60px] right-4 w-64 rounded-xl border border-line bg-white p-4 text-sm text-graphite shadow-lg">
            You have no new notifications.
          </div>
        )}
      </Topbar>

      <main className="ml-0 h-screen overflow-y-auto pt-[72px] md:ml-[280px] bg-paper">
        <div className="max-w-[1250px] mx-auto space-y-5 sm:space-y-6 px-4 sm:px-6 py-5 sm:py-7 pb-28 md:pb-7 min-w-0">

          {/* Welcome message, quick actions, and current CGPA. */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5 min-w-0">

            <Card
              className="
                md:col-span-2 min-w-0 rounded-2xl bg-charcoal p-5 sm:p-7 text-cream
                relative overflow-hidden flex items-center justify-between
              "
            >
              <div className="relative z-10 min-w-0 pr-0 sm:pr-6">
                <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-2">
                  Hello, David Okafor! 👋
                </h2>
                <p className="text-cream/70 text-sm sm:text-base lg:text-lg max-w-2xl">
                  You have 2 assignments due this week and your next class is
                  CSC301 at 10:00 AM.
                </p>

                <div className="mt-5 flex flex-col sm:flex-row flex-wrap gap-3">
                  <Button
                    onClick={() => router.push("/students/timetable")}
                    className="
                      w-full sm:w-auto px-5 py-2.5 rounded-xl bg-bronze-deep hover:bg-bronze-deep/90
                      text-cream font-bold text-sm transition-all shadow-lg
                      shadow-charcoal/20 cursor-pointer hover:opacity-90 active:opacity-75
                    "
                  >
                    View Timetable
                  </Button>
                  <Button
                    onClick={() => router.push("/campus-ride")}
                    className="
                      w-full sm:w-auto px-5 py-2.5 rounded-xl bg-cream/10 hover:bg-cream/20
                      text-cream font-bold text-sm transition-all backdrop-blur-sm
                      border border-cream/20 cursor-pointer active:opacity-75
                    "
                  >
                    Campus Ride
                  </Button>
                </div>
              </div>

              <div
                className="
                  hidden sm:flex absolute right-0 top-0 h-full w-1/3 bg-gradient-to-l
                  from-cream/10 to-transparent items-center justify-center
                  pointer-events-none
                "
              >
                <GraduationCap size={160} strokeWidth={1} className="text-cream/5 rotate-12" />
              </div>
            </Card>

            <Card
              className="
                md:col-span-1 min-w-0 rounded-2xl border border-line
                bg-white p-5 sm:p-6 flex flex-col justify-between
              "
            >
              <div className="flex items-center justify-between gap-3 mb-4">
                <h3 className="text-sm font-bold text-charcoal uppercase tracking-wider">
                  Current CGPA
                </h3>
                <span className="shrink-0 px-2 py-1 rounded-md bg-emerald-50 text-emerald-600 text-[10px] font-bold">
                  TOP 5%
                </span>
              </div>

              <div className="flex items-end gap-2 mb-6 min-w-0">
                <span className="text-4xl sm:text-5xl font-black text-charcoal tracking-tighter">
                  4.62
                </span>
                <span className="text-graphite-soft font-bold text-base sm:text-lg mb-1">
                  / 5.0
                </span>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between gap-2 text-xs font-semibold">
                  <span className="text-graphite">Academic Progress</span>
                  <span className="text-charcoal shrink-0">72%</span>
                </div>
                <div className="h-2 bg-line rounded-full overflow-hidden">
                  <div className="h-full w-[72%] bg-bronze-deep rounded-full" />
                </div>
              </div>
            </Card>
          </div>

          {/* At-a-glance attendance, course, credit, and campus balance metrics. */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5">
            {statCards.map(({ label, value, icon: Icon, iconBg, iconColor }) => (
              <Card
                key={label}
                className="rounded-2xl border border-line bg-white p-4 sm:p-5 min-w-0"
              >
                <p className="text-[10px] sm:text-xs font-bold text-graphite-soft uppercase tracking-widest mb-2 sm:mb-3 truncate">
                  {label}
                </p>
                <div className="flex items-center justify-between gap-2">
                  <span className="text-lg sm:text-2xl font-bold text-charcoal truncate">
                    {value}
                  </span>
                  {/* Metric icon. */}
                  <div className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full ${iconBg} flex items-center justify-center ${iconColor} shrink-0`}>
                    <Icon size={18} className="sm:hidden" strokeWidth={2} />
                    <Icon size={20} className="hidden sm:block" strokeWidth={2} />
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {/* Today&apos;s lectures and the current campus ride status. */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-5 min-w-0">

            {/* Lecture list with completion and upcoming-session states. */}
            <Card className="lg:col-span-2 min-w-0 rounded-2xl border border-line bg-white flex flex-col p-0">
              <div className="px-4 sm:px-6 py-4 sm:py-5 border-b border-line flex items-center justify-between gap-2">
                <h3 className="font-bold text-charcoal">Today&apos;s Lectures</h3>
                <Link href="/students/timetable" className="text-xs font-bold text-bronze-deep hover:underline shrink-0">
                  Full Schedule
                </Link>
              </div>

              <div className="p-3 sm:p-4 space-y-3">
                {filteredLectures.map(({ time, period, course, meta, status, statusStyle, completed }) => (
                  <div
                    key={course}
                    className={`p-3 sm:p-4 rounded-xl border border-line flex items-center gap-3 sm:gap-4 min-w-0 group hover:border-bronze-deep/40 transition-all ${
                      completed ? "bg-white opacity-60" : "bg-paper/50"
                    }`}
                  >
                    <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-lg bg-white border border-line flex flex-col items-center justify-center shrink-0">
                      <span className="text-[9px] sm:text-[10px] font-bold text-graphite-soft uppercase">
                        {time}
                      </span>
                      <span className="text-xs sm:text-sm font-black text-charcoal uppercase">
                        {period}
                      </span>
                    </div>

                    <div className="flex-1 min-w-0">
                      <h4 className="font-bold text-charcoal truncate text-sm sm:text-base">{course}</h4>
                      <p className="text-xs text-graphite truncate">{meta}</p>
                    </div>

                    <span className={`px-2 sm:px-3 py-1 rounded-full text-[9px] sm:text-[10px] font-bold shrink-0 ${statusStyle}`}>
                      {status}
                    </span>
                  </div>
                ))}
              </div>
            </Card>

            {/* Campus ride card with the next shuttle estimate. */}
            <Card className="lg:col-span-1 min-w-0 rounded-2xl border border-line bg-white flex flex-col p-0">
              <div className="px-4 sm:px-6 py-4 sm:py-5 border-b border-line flex items-center justify-between">
                <h3 className="font-bold text-charcoal">Campus Ride</h3>
                <Link href="/campus-ride" aria-label="Open campus ride" className="w-8 h-8 rounded-lg bg-paper flex items-center justify-center text-graphite">
                  <Bus size={16} />
                </Link>
              </div>

              <div className="p-5 sm:p-6 flex-1 flex flex-col items-center justify-center text-center">
                <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-bronze-deep/10 flex items-center justify-center text-bronze-deep mb-4 shadow-inner shadow-bronze-deep/10">
                  <Navigation size={24} className="sm:hidden" />
                  <Navigation size={28} className="hidden sm:block" />
                </div>
                <h4 className="font-bold text-charcoal mb-1">Gate A Shuttle arriving</h4>
                <p className="text-sm text-graphite mb-6">
                  Approx. 4 mins to Library bus stop
                </p>
                <Button onClick={() => router.push("/campus-ride")} className="w-full py-3 rounded-xl bg-charcoal text-cream font-bold text-sm hover:bg-charcoal/90 transition-all ">
                  Book Ride
                </Button>
              </div>
            </Card>
          </div>

        </div>
      </main>

      <MobileBottomNav active="home" />
    </>
  );
}