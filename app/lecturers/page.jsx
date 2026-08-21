import Sidebar from "@/components/layout/Sidebar";
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
    iconBg: "bg-[#e8f4fd]",
    iconColor: "text-[#0274c7]",
  },
  {
    label: "Active Courses",
    value: "4",
    icon: BookOpen,
    iconBg: "bg-orange-50",
    iconColor: "text-orange-600",
  },
  {
    label: "Pending Tasks",
    value: "12",
    icon: ClipboardList,
    iconBg: "bg-blue-50",
    iconColor: "text-blue-600",
  },
  {
    label: "Attendance Rate",
    value: "88.5%",
    icon: CheckSquare,
    iconBg: "bg-purple-50",
    iconColor: "text-purple-600",
  },
];

const courses = [
  {
    code: "CSC301",
    tagBg: "bg-[#0274c7]",
    name: "Advanced Algorithms",
    meta: "320 Students • 2 Sessions/week",
    grade: "B+ (74%)",
  },
  {
    code: "CSC305",
    tagBg: "bg-[#0e91e9]",
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
    avatar: "/avatar-placeholder.jpg",
    course: "CSC301",
    assignment: "Lab 1: Sorting Algorithms",
  },
  {
    student: "Amina Bello",
    avatar: "/avatar-placeholder.jpg",
    course: "CSC305",
    assignment: "OS Shell Scripting",
  },
];

export default function Lecturer() {
  return (
    <>
      <Sidebar />
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
            bg-[#1a365d]
            text-white
            hover:bg-[#2c3e5d]
            transition-all
            shadow-md
            cursor-pointer
          "
        >
          <PlusCircle size={18} />
          <span className="text-[13px] font-bold">New Material</span>
        </Button>
      </Topbar>

      <main className="ml-[280px] pt-[72px] h-screen overflow-y-auto">
        <div className="max-w-[1250px] mx-auto space-y-6 px-6 py-7">

          {/* Stats Overview */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 min-w-0">
            {statCards.map(({ label, value, delta, icon: Icon, iconBg, iconColor }) => (
              <Card
                key={label}
                className="min-w-0 rounded-2xl border border-slate-200 bg-white p-6"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className={`w-10 h-10 rounded-xl ${iconBg} flex items-center justify-center ${iconColor} shrink-0`}>
                    <Icon size={20} />
                  </div>
                  <span className="text-sm font-bold text-slate-600 truncate">
                    {label}
                  </span>
                </div>

                <div className="flex items-end gap-2">
                  <span className="text-3xl font-black text-[#0c426e]">
                    {value}
                  </span>
                  {delta && (
                    <span className="text-emerald-600 text-xs font-bold mb-1">
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
            <Card className="lg:col-span-2 min-w-0 rounded-2xl border border-slate-200 bg-white flex flex-col overflow-hidden p-0">
              <div className="px-6 py-5 border-b border-slate-100 flex items-center justify-between">
                <h3 className="font-bold text-[#0c426e]">Current Courses</h3>
                <button className="px-3 py-1 rounded-lg bg-slate-50 text-slate-600 text-xs font-bold hover:bg-slate-100 transition-all">
                  Session 2023/24
                </button>
              </div>

              <div className="divide-y divide-slate-100">
                {courses.map(({ code, tagBg, name, meta, grade }) => (
                  <div
                    key={code}
                    className="p-6 flex items-center justify-between hover:bg-slate-50 transition-all group"
                  >
                    <div className="flex items-center gap-4 min-w-0">
                      <div className={`w-12 h-12 rounded-xl ${tagBg} flex items-center justify-center text-white font-black text-xs shrink-0`}>
                        {code}
                      </div>
                      <div className="min-w-0">
                        <h4 className="font-bold text-[#0c426e] truncate">{name}</h4>
                        <p className="text-xs text-slate-600 truncate">{meta}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-6 shrink-0">
                      <div className="text-right">
                        <p className="text-[10px] font-bold text-slate-400 uppercase mb-1">
                          Average Grade
                        </p>
                        <p className="font-bold text-[#0c426e]">{grade}</p>
                      </div>
                      <button className="w-8 h-8 rounded-lg border border-slate-200 flex items-center justify-center text-slate-400 group-hover:border-[#7cc2ef] group-hover:text-[#0274c7] transition-colors cursor-pointer">
                        <ChevronRight size={16} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            {/* Today's Schedule */}
            <Card className="lg:col-span-1 min-w-0 rounded-2xl border border-slate-200 bg-white flex flex-col p-0">
              <div className="px-6 py-5 border-b border-slate-100">
                <h3 className="font-bold text-[#0c426e]">Today's Schedule</h3>
              </div>

              <div className="p-5 space-y-4 flex-1">
                {schedule.map(({ time, title, meta, active }) => (
                  <div
                    key={title}
                    className={`relative pl-6 border-l-2 py-1 ${
                      active ? "border-[#0274c7]" : "border-slate-200"
                    }`}
                  >
                    <p
                      className={`text-[10px] font-bold uppercase mb-0.5 ${
                        active ? "text-[#0274c7]" : "text-slate-400"
                      }`}
                    >
                      {time}
                    </p>
                    <h4 className="font-bold text-[#0c426e] text-sm">{title}</h4>
                    <p className="text-xs text-slate-600">{meta}</p>
                  </div>
                ))}
              </div>

              <div className="mt-auto p-5 border-t border-slate-100">
                <button className="w-full py-3 rounded-xl border-2 border-[#1a365d] text-[#1a365d] font-bold text-sm hover:bg-[#eef3f8] transition-all cursor-pointer">
                  Full Calendar
                </button>
              </div>
            </Card>
          </div>

          {/* Pending Gradings */}
          <Card className="min-w-0 rounded-2xl border border-slate-200 bg-white overflow-hidden p-0">
            <div className="px-6 py-5 border-b border-slate-100 flex items-center justify-between">
              <h3 className="font-bold text-[#0c426e]">Pending Gradings</h3>
              <span className="px-2 py-0.5 rounded-full bg-red-50 text-red-600 text-[10px] font-bold uppercase tracking-widest">
                {pendingGradings.length} NEW
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left min-w-[600px]">
                <thead>
                  <tr className="text-[11px] font-bold text-slate-400 uppercase tracking-wider border-b border-slate-50">
                    <th className="px-6 py-4">Student</th>
                    <th className="px-6 py-4">Course</th>
                    <th className="px-6 py-4">Assignment</th>
                    <th className="px-6 py-4 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50 text-sm">
                  {pendingGradings.map(({ student, avatar, course, assignment }) => (
                    <tr key={student} className="hover:bg-slate-50/50 transition-all">
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
                      <td className="px-6 py-4 text-slate-600 font-medium">{course}</td>
                      <td className="px-6 py-4 text-slate-600">{assignment}</td>
                      <td className="px-6 py-4 text-right">
                        <button className="text-[#0274c7] font-bold hover:underline cursor-pointer">
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