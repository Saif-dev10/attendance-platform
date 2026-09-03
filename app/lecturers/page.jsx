import Sidebar, { lecturerSections } from "@/components/layout/Sidebar";
import Topbar from "@/components/layout/Topbar";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import Image from "next/image";
import {
  PlusCircle,
  Users,
  BookOpen,
  ClipboardList,
  CheckSquare,
  ChevronRight,
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
        user={{
          name: "Dr. Ibrahim",
          role: "Lecturer",
          avatar: "/avatar-placeholder.svg",
        }}
      />
      <Topbar title="Lecturer Console">
        <Button
          type="button"
          className="
            flex
            items-center
            gap-2.5
            px-4
            py-2
            rounded-xl
            bg-charcoal
            text-cream
            hover:bg-bronze-deep
            transition-all
            shadow-md
            cursor-pointer
          "
        >
          <PlusCircle size={18} />
          <span className="text-[13px] font-bold">New Material</span>
        </Button>
      </Topbar>

      <main className="ml-0 md:ml-[280px] pt-[72px] h-screen overflow-y-auto bg-paper">
        <div className="max-w-[1250px] mx-auto space-y-6 px-4 sm:px-6 py-5 sm:py-7">

          {/* Stats Overview */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 min-w-0">
            {statCards.map(({ label, value, delta, icon: Icon, iconBg, iconColor }) => (
              <Card
                key={label}
                className="min-w-0 rounded-2xl border border-line bg-white p-6"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className={`w-10 h-10 rounded-xl ${iconBg} flex items-center justify-center ${iconColor} shrink-0`}>
                    <Icon size={20} />
                  </div>
                  <span className="text-sm font-bold text-graphite truncate">
                    {label}
                  </span>
                </div>

                <div className="flex items-end gap-2">
                  <span className="text-3xl font-black text-charcoal">
                    {value}
                  </span>
                  {delta && (
                    <span className="text-moss text-xs font-bold mb-1">
                      {delta}
                    </span>
                  )}
                </div>
              </Card>
            ))}
          </div>

          {/* Courses + Schedule */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 min-w-0">

            {/* Current Courses */}
            <Card className="lg:col-span-2 min-w-0 rounded-2xl border border-line bg-white flex flex-col overflow-hidden p-0">
              <div className="px-6 py-5 border-b border-line flex items-center justify-between">
                <h3 className="font-bold text-charcoal">Current Courses</h3>
                <button className="px-3 py-1 rounded-lg bg-paper text-graphite text-xs font-bold hover:bg-cream transition-all">
                  Session 2023/24
                </button>
              </div>

              <div className="divide-y divide-line">
                {courses.map(({ code, tagBg, name, meta, grade }) => (
                  <div
                    key={code}
                    className="p-6 flex items-center justify-between hover:bg-paper transition-all group"
                  >
                    <div className="flex items-center gap-4 min-w-0">
                      <div className={`w-12 h-12 rounded-xl ${tagBg} flex items-center justify-center text-white font-black text-xs shrink-0`}>
                        {code}
                      </div>
                      <div className="min-w-0">
                        <h4 className="font-bold text-charcoal truncate">{name}</h4>
                        <p className="text-xs text-graphite truncate">{meta}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-6 shrink-0">
                      <div className="text-right">
                        <p className="text-[10px] font-bold text-graphite-soft uppercase mb-1">
                          Average Grade
                        </p>
                        <p className="font-bold text-charcoal">{grade}</p>
                      </div>
                      <button className="w-8 h-8 rounded-lg border border-line flex items-center justify-center text-graphite-soft group-hover:border-bronze group-hover:text-bronze-deep transition-colors cursor-pointer">
                        <ChevronRight size={16} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            {/* Today's Schedule */}
            <Card className="lg:col-span-1 min-w-0 rounded-2xl border border-line bg-white flex flex-col p-0">
              <div className="px-6 py-5 border-b border-line">
                <h3 className="font-bold text-charcoal">Today&apos;s Schedule</h3>
              </div>

              <div className="p-5 space-y-4 flex-1">
                {schedule.map(({ time, title, meta, active }) => (
                  <div
                    key={title}
                    className={`relative pl-6 border-l-2 py-1 ${
                      active ? "border-bronze-deep" : "border-line"
                    }`}
                  >
                    <p
                      className={`text-[10px] font-bold uppercase mb-0.5 ${
                        active ? "text-bronze-deep" : "text-graphite-soft"
                      }`}
                    >
                      {time}
                    </p>
                    <h4 className="font-bold text-charcoal text-sm">{title}</h4>
                    <p className="text-xs text-graphite">{meta}</p>
                  </div>
                ))}
              </div>

              <div className="mt-auto p-5 border-t border-line">
                <button className="w-full py-3 rounded-xl border-2 border-charcoal text-charcoal font-bold text-sm hover:bg-paper transition-all cursor-pointer">
                  Full Calendar
                </button>
              </div>
            </Card>
          </div>

          {/* Pending Gradings */}
          <Card className="min-w-0 rounded-2xl border border-line bg-white overflow-hidden p-0">
            <div className="px-6 py-5 border-b border-line flex items-center justify-between">
              <h3 className="font-bold text-charcoal">Pending Gradings</h3>
              <span className="px-2 py-0.5 rounded-full bg-clay/10 text-clay text-[10px] font-bold uppercase tracking-widest">
                {pendingGradings.length} NEW
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left min-w-[600px]">
                <thead>
                  <tr className="text-[11px] font-bold text-graphite-soft uppercase tracking-wider border-b border-line">
                    <th className="px-6 py-4">Student</th>
                    <th className="px-6 py-4">Course</th>
                    <th className="px-6 py-4">Assignment</th>
                    <th className="px-6 py-4 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-line text-sm">
                  {pendingGradings.map(({ student, avatar, course, assignment }) => (
                    <tr key={student} className="hover:bg-paper transition-all">
                      <td className="px-6 py-4 flex items-center gap-3 font-medium">
                        <Image
                          src={avatar}
                          alt={student}
                          width={32}
                          height={32}
                          className="rounded-lg object-cover"
                        />
                        <span>{student}</span>
                      </td>
                      <td className="px-6 py-4 text-graphite font-medium">{course}</td>
                      <td className="px-6 py-4 text-graphite">{assignment}</td>
                      <td className="px-6 py-4 text-right">
                        <button className="text-bronze-deep font-bold hover:underline cursor-pointer">
                          Grade Now
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>

        </div>
      </main>
    </>
  );
}