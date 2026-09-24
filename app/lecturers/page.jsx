"use client";

import Sidebar, { lecturerSections } from "@/components/layout/Sidebar";
import Topbar from "@/components/layout/Topbar";
import MobileBottomNav from "@/components/layout/MobileBottomNav";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import Link from "next/link";
import Image from "next/image";
import {
  PlusCircle,
  Users,
  BookOpen,
  ClipboardList,
  CheckSquare,
  ChevronRight,
  Bell,
  ChevronDown,
  CalendarDays,
} from "lucide-react";

const statCards = [
  {
    label: "Total Students",
    value: "1,240",
    delta: "+4.2%",
    icon: Users,
    iconBg: "bg-bronze-deep/10",
    iconColor: "text-bronze-deep",
  },
  {
    label: "Active Courses",
    value: "4",
    icon: BookOpen,
    iconBg: "bg-paper",
    iconColor: "text-graphite",
  },
  {
    label: "Pending Tasks",
    value: "12",
    icon: ClipboardList,
    iconBg: "bg-bronze-soft/40",
    iconColor: "text-bronze-deep",
  },
  {
    label: "Attendance Rate",
    value: "88.5%",
    icon: CheckSquare,
    iconBg: "bg-moss-soft",
    iconColor: "text-moss",
  },
];

const courses = [
  {
    code: "CSC301",
    tagBg: "bg-charcoal",
    name: "Advanced Algorithms",
    meta: "320 Students • 2 Sessions/week",
    grade: "B+ (74%)",
  },
  {
    code: "CSC305",
    tagBg: "bg-bronze-deep",
    name: "Operating Systems",
    meta: "280 Students • 3 Sessions/week",
    grade: "A- (81%)",
  },
  {
    code: "CSC307",
    tagBg: "bg-moss",
    name: "Database Management",
    meta: "245 Students • 2 Sessions/week",
    grade: "B (69%)",
  },
  {
    code: "CSC309",
    tagBg: "bg-graphite",
    name: "Computer Networks",
    meta: "210 Students • 2 Sessions/week",
    grade: "A (84%)",
  },
];

const schedule = [
  {
    time: "Now • 10:00 - 12:00",
    title: "CSC301: Algorithms",
    meta: "Hall B-04 • 320 Registered",
    active: true,
  },
  {
    time: "14:00 - 15:30",
    title: "CSC305: OS Lab",
    meta: "Computer Lab 2 • 45 Registered",
    active: false,
  },
  {
    time: "16:00 - 17:00",
    title: "Faculty Meeting",
    meta: "Board Room • Admin Block",
    active: false,
  },
];

const pendingGradings = [
  {
    student: "David Okafor",
    avatar: "/avatar-placeholder.svg",
    course: "CSC301",
    assignment: "Lab 1: Sorting Algorithms",
  },
  {
    student: "Amina Bello",
    avatar: "/avatar-placeholder.svg",
    course: "CSC305",
    assignment: "OS Shell Scripting",
  },
];

export default function Lecturer() {
  return (
    <>
      <Sidebar
        sections={lecturerSections}
        dashboardHref="/lecturers"
        user={{
          name: "Dr. Ibrahim",
          role: "Lecturer",
          avatar: "/avatar-placeholder.svg",
        }}
      />

      <Topbar
        title="Lecturer Workspace"
        subtitle="Teaching overview and academic activity"
      >

        {/* Current academic session */}
        <div className="hidden items-center gap-2 rounded-xl border border-line bg-paper px-3 py-2 xl:flex">
          <CalendarDays
            size={16}
            className="text-graphite-soft"
            aria-hidden="true"
          />

          <div>
            <p className="text-[9px] font-bold uppercase tracking-wider text-graphite-soft">
              Academic Session
            </p>

            <p className="text-xs font-bold text-charcoal">
              2023/24
            </p>
          </div>
        </div>

        {/* Notifications */}
        <Link
          href="/notifications?role=lecturer"
          aria-label="View lecturer notifications"
          className="relative flex h-10 w-10 shrink-0 cursor-pointer items-center justify-center rounded-xl text-graphite transition-colors hover:bg-paper focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-bronze"
        >
          <Bell size={20} />

          <span
            className="absolute right-2.5 top-2.5 h-2 w-2 rounded-full border-2 border-paper bg-bronze-deep"
            aria-hidden="true"
          />
        </Link>

        {/* New material */}
        <Button
          type="button"
          className="
            flex
            h-10
            items-center
            gap-2
            rounded-xl
            bg-charcoal
            px-3
            text-cream
            shadow-md
            transition-all
            hover:bg-bronze-deep
            cursor-pointer
            sm:px-4
          "
        >
          <PlusCircle size={17} />

          <span className="hidden text-[13px] font-bold sm:inline">
            New Material
          </span>

          <span className="text-[13px] font-bold sm:hidden">
            New
          </span>
        </Button>
      </Topbar>

      <main className="ml-0 min-h-screen bg-paper pt-[72px] md:ml-[280px]">
        <div className="mx-auto max-w-[1250px] space-y-6 px-4 py-5 pb-28 sm:px-6 sm:py-7 sm:pb-24 md:pb-10">

          {/* Mobile course/session context.
              The information hidden from the desktop topbar is still
              available to smaller screens here. */}
          <section
            aria-label="Current teaching context"
            className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:hidden"
          >
            <div className="flex min-w-0 items-center gap-3 rounded-xl border border-line bg-white p-3">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-bronze-deep/10 text-bronze-deep">
                <BookOpen size={17} />
              </div>

              <div className="min-w-0">
                <p className="text-[9px] font-bold uppercase tracking-wider text-graphite-soft">
                  Current Course
                </p>

                <p className="truncate text-xs font-bold text-charcoal">
                  CSC301 — Advanced Algorithms
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 rounded-xl border border-line bg-white p-3">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-paper text-graphite">
                <CalendarDays size={17} />
              </div>

              <div>
                <p className="text-[9px] font-bold uppercase tracking-wider text-graphite-soft">
                  Academic Session
                </p>

                <p className="text-xs font-bold text-charcoal">
                  2023/24
                </p>
              </div>
            </div>
          </section>

          {/* Overview statistics */}
          <div className="grid min-w-0 grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-4">
            {statCards.map(
              ({
                label,
                value,
                delta,
                icon: Icon,
                iconBg,
                iconColor,
              }) => (
                <Card
                  key={label}
                  className="min-w-0 rounded-2xl border border-line bg-white p-6"
                >
                  <div className="mb-4 flex items-center gap-3">
                    <div
                      className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${iconBg} ${iconColor}`}
                    >
                      <Icon size={20} />
                    </div>

                    <span className="truncate text-sm font-bold text-graphite">
                      {label}
                    </span>
                  </div>

                  <div className="flex items-end gap-2">
                    <span className="text-3xl font-black text-charcoal">
                      {value}
                    </span>

                    {delta && (
                      <span className="mb-1 text-xs font-bold text-moss">
                        {delta}
                      </span>
                    )}
                  </div>
                </Card>
              )
            )}
          </div>

          {/* Courses and schedule */}
          <div className="grid min-w-0 grid-cols-1 gap-5 lg:grid-cols-3">
            <Card className="flex min-w-0 flex-col overflow-hidden rounded-2xl border border-line bg-white p-0 lg:col-span-2">
              <div className="flex items-center justify-between border-b border-line px-6 py-5">
                <div>
                  <h3 className="font-bold text-charcoal">
                    Current Courses
                  </h3>

                  <p className="mt-1 text-xs text-graphite-soft">
                    Courses currently assigned to you.
                  </p>
                </div>

                <button
                  type="button"
                  className="flex items-center gap-1.5 rounded-lg bg-paper px-3 py-2 text-xs font-bold text-graphite transition-all hover:bg-cream"
                >
                  <CalendarDays size={13} />
                  Session 2023/24
                </button>
              </div>

              <div className="divide-y divide-line">
                {courses.map(
                  ({ code, tagBg, name, meta, grade }) => (
                    <div
                      key={code}
                      className="group flex items-center justify-between p-6 transition-all hover:bg-paper"
                    >
                      <div className="flex min-w-0 items-center gap-4">
                        <div
                          className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${tagBg} text-xs font-black text-white`}
                        >
                          {code}
                        </div>

                        <div className="min-w-0">
                          <h4 className="truncate font-bold text-charcoal">
                            {name}
                          </h4>

                          <p className="truncate text-xs text-graphite">
                            {meta}
                          </p>
                        </div>
                      </div>

                      <div className="flex shrink-0 items-center gap-6">
                        <div className="hidden text-right sm:block">
                          <p className="mb-1 text-[10px] font-bold uppercase text-graphite-soft">
                            Average Grade
                          </p>

                          <p className="font-bold text-charcoal">
                            {grade}
                          </p>
                        </div>

                        <button
                          type="button"
                          aria-label={`Open ${name}`}
                          className="flex h-8 w-8 items-center justify-center rounded-lg border border-line text-graphite-soft transition-colors group-hover:border-bronze group-hover:text-bronze-deep"
                        >
                          <ChevronRight size={16} />
                        </button>
                      </div>
                    </div>
                  )
                )}
              </div>
            </Card>

            <Card className="flex min-w-0 flex-col rounded-2xl border border-line bg-white p-0 lg:col-span-1">
              <div className="border-b border-line px-6 py-5">
                <h3 className="font-bold text-charcoal">
                  Today&apos;s Schedule
                </h3>
              </div>

              <div className="flex-1 space-y-4 p-5">
                {schedule.map(
                  ({ time, title, meta, active }) => (
                    <div
                      key={title}
                      className={`relative border-l-2 py-1 pl-6 ${
                        active
                          ? "border-bronze-deep"
                          : "border-line"
                      }`}
                    >
                      <p
                        className={`mb-0.5 text-[10px] font-bold uppercase ${
                          active
                            ? "text-bronze-deep"
                            : "text-graphite-soft"
                        }`}
                      >
                        {time}
                      </p>

                      <h4 className="text-sm font-bold text-charcoal">
                        {title}
                      </h4>

                      <p className="text-xs text-graphite">
                        {meta}
                      </p>
                    </div>
                  )
                )}
              </div>

              <div className="mt-auto border-t border-line p-5">
                <button
                  type="button"
                  className="w-full cursor-pointer rounded-xl border-2 border-charcoal py-3 text-sm font-bold text-charcoal transition-all hover:bg-paper"
                >
                  Full Calendar
                </button>
              </div>
            </Card>
          </div>

          {/* Pending grading */}
          <Card className="min-w-0 overflow-hidden rounded-2xl border border-line bg-white p-0">
            <div className="flex items-center justify-between border-b border-line px-6 py-5">
              <div>
                <h3 className="font-bold text-charcoal">
                  Pending Gradings
                </h3>

                <p className="mt-1 text-xs text-graphite-soft">
                  Assignments that still need your attention.
                </p>
              </div>

              <span className="rounded-full bg-clay/10 px-2 py-0.5 text-[10px] font-bold uppercase tracking-widest text-clay">
                {pendingGradings.length} NEW
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full min-w-[600px] text-left">
                <thead>
                  <tr className="border-b border-line text-[11px] font-bold uppercase tracking-wider text-graphite-soft">
                    <th className="px-6 py-4">Student</th>
                    <th className="px-6 py-4">Course</th>
                    <th className="px-6 py-4">Assignment</th>
                    <th className="px-6 py-4 text-right">
                      Action
                    </th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-line text-sm">
                  {pendingGradings.map(
                    ({
                      student,
                      avatar,
                      course,
                      assignment,
                    }) => (
                      <tr
                        key={student}
                        className="transition-all hover:bg-paper"
                      >
                        <td className="flex items-center gap-3 px-6 py-4 font-medium">
                          <Image
                            src={avatar}
                            alt={student}
                            width={32}
                            height={32}
                            className="rounded-lg object-cover"
                          />

                          <span>{student}</span>
                        </td>

                        <td className="px-6 py-4 font-medium text-graphite">
                          {course}
                        </td>

                        <td className="px-6 py-4 text-graphite">
                          {assignment}
                        </td>

                        <td className="px-6 py-4 text-right">
                          <button
                            type="button"
                            className="cursor-pointer font-bold text-bronze-deep hover:underline"
                          >
                            Grade Now
                          </button>
                        </td>
                      </tr>
                    )
                  )}
                </tbody>
              </table>
            </div>
          </Card>

          {/* Extra breathing room so the final content never sits
              directly underneath the mobile navigation. */}
          <div className="h-4 md:hidden" aria-hidden="true" />
        </div>
      </main>

      {/* Mobile navigation stays fixed at the bottom.
          The page above has extra bottom padding so content is not hidden behind it. */}
      <MobileBottomNav active="academic" />
    </>
  );
}