// app/students/assignments/page.jsx
import { Search, SlidersHorizontal, Clock, MessageSquare } from "lucide-react";
import Link from "next/link";
import Sidebar from "@/components/layout/Sidebar";
import MobileBottomNav from "@/components/layout/MobileBottomNav";

const dueToday = [
  {
    id: "csc301-lab4",
    course: "CSC 301",
    title: "Lab 4: Implementation of Dijkstra's Algorithm",
    description:
      "Complete the implementation of Dijkstra's algorithm for finding the shortest path in a weighted graph.",
    time: "11:59 PM",
    status: "Not Submitted",
    avatars: 2,
    extra: 14,
  },
];

const dueThisWeek = [
  {
    id: "csc305-a2",
    course: "CSC 305",
    title: "Assignment 2: Shell Scripting & Automation",
    description:
      "Write a shell script that automates the backup process of a specific directory to a remote server.",
    time: "Thursday, 2:00 PM",
    status: "Draft Saved",
    file: "submission_draft.zip",
  },
  {
    id: "csc309-paper",
    course: "CSC 309",
    title: "Research Paper: Ethical Hacking & Security",
    description:
      "A comprehensive research paper on modern penetration testing methodologies and ethical considerations.",
    time: "Friday, 11:59 PM",
    status: "Not Started",
    avatars: 2,
  },
];

const gradedItems = [
  {
    id: "csc307-proposal",
    course: "CSC307",
    title: "Project Proposal: SaaS Architecture",
    date: "Graded on Aug 15, 2024",
    score: "18",
    outOf: "20",
  },
  {
    id: "csc311-quiz",
    course: "CSC311",
    title: "Mid-Semester Quiz: Database Systems",
    date: "Graded on Aug 12, 2024",
    score: "9.5",
    outOf: "10",
  },
];

export default function AssignmentsPage() {
  return (
    <div className="min-h-screen bg-paper">
      <Sidebar />

      <main className="md:ml-[280px] pb-[84px] md:pb-0">
        {/* Header */}
        <header className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between px-5 sm:px-8 py-5 bg-white border-b border-line">
          <div>
            <h1 className="text-xl font-bold text-charcoal">Assignments</h1>
            <p className="text-sm text-graphite-soft">Track and manage your coursework deadlines</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="relative flex-1 sm:flex-none">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-graphite-soft" />
              <input
                type="text"
                placeholder="Search course or assignment..."
                className="pl-9 pr-4 py-2 text-sm rounded-lg border border-line bg-paper w-full sm:w-72 text-charcoal placeholder:text-graphite-soft focus:outline-none focus:ring-2 focus:ring-bronze-deep/40"
              />
            </div>
            <button className="p-2 rounded-lg border border-line hover:bg-paper shrink-0">
              <SlidersHorizontal size={16} className="text-graphite-soft" />
            </button>
          </div>
        </header>

        <div className="p-5 sm:p-8 space-y-8">
          {/* Immediate deadline banner */}
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between bg-cream border border-line rounded-xl px-5 sm:px-6 py-4">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-sm shrink-0">
                <Clock size={18} className="text-bronze-deep" />
              </div>
              <div>
                <p className="font-semibold text-charcoal text-sm">Immediate Deadline</p>
                <p className="text-sm text-graphite">
                  CSC 301 Lab Implementation is due in{" "}
                  <span className="text-bronze-deep font-semibold">6 hours</span>
                </p>
              </div>
            </div>
            <Link
              href="/students/assignments/csc301-lab4"
              className="bg-charcoal hover:bg-charcoal/90 text-cream text-sm font-semibold px-4 py-2 rounded-lg text-center"
            >
              Submit Final Files
            </Link>
          </div>

          {/* Due Today */}
          <Section label="DUE TODAY">
            {dueToday.map((item) => (
              <AssignmentCard key={item.id} item={item} />
            ))}
          </Section>

          {/* Due This Week */}
          <Section label="DUE THIS WEEK">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {dueThisWeek.map((item) => (
                <AssignmentCard key={item.id} item={item} />
              ))}
            </div>
          </Section>

          {/* Recently Graded */}
          <Section label="RECENTLY GRADED">
            <div className="bg-white rounded-xl border border-line divide-y divide-line">
              {gradedItems.map((item) => (
                <Link
                  href={`/students/assignments/${item.id}`}
                  key={item.id}
                  className="flex items-center justify-between gap-3 px-4 sm:px-5 py-4 hover:bg-paper transition-colors min-w-0"
                >
                  <div className="flex items-center gap-4 min-w-0">
                    <div className="w-9 h-9 rounded-lg bg-cream flex items-center justify-center text-[11px] font-semibold text-graphite-soft shrink-0">
                      {item.course}
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm font-semibold text-charcoal truncate">{item.title}</p>
                      <p className="text-xs text-graphite-soft italic">{item.date}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 shrink-0">
                    <div className="text-right">
                      <p className="text-[10px] text-graphite-soft tracking-wide">GRADE</p>
                      <p className="text-sm font-bold text-charcoal">
                        {item.score}
                        <span className="text-graphite-soft font-normal">/{item.outOf}</span>
                      </p>
                    </div>
                    <div className="w-8 h-8 rounded-lg border border-line flex items-center justify-center">
                      <MessageSquare size={14} className="text-graphite-soft" />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </Section>
        </div>
      </main>

      <MobileBottomNav active="academic" />
    </div>
  );
}

function Section({ label, children }) {
  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2">
        <span className="w-1.5 h-1.5 rounded-full bg-bronze-deep" />
        <p className="text-[11px] font-bold tracking-wider text-graphite-soft uppercase">{label}</p>
      </div>
      {children}
    </div>
  );
}

function AssignmentCard({ item }) {
  return (
    <Link
      href={`/students/assignments/${item.id}`}
      className="block bg-white rounded-xl border border-line p-5 hover:border-bronze-deep/40 hover:shadow-sm transition-all min-w-0"
    >
      <div className="flex items-center justify-between mb-3">
        <span className="text-[11px] font-semibold bg-cream text-graphite px-2 py-1 rounded">
          {item.course}
        </span>
        <span
          className={`text-xs font-semibold ${
            item.status === "Not Submitted" ? "text-red-500" : "text-graphite-soft"
          }`}
        >
          {item.time}
        </span>
      </div>
      <h3 className="font-semibold text-charcoal mb-1">{item.title}</h3>
      <p className="text-sm text-graphite mb-4 line-clamp-2">{item.description}</p>
      <div className="flex items-center justify-between">
        {item.file ? (
          <span className="text-xs text-graphite-soft truncate">{item.file}</span>
        ) : item.avatars ? (
          <div className="flex -space-x-2">
            {Array.from({ length: item.avatars }).map((_, i) => (
              <div key={i} className="w-6 h-6 rounded-full bg-cream border-2 border-white" />
            ))}
            {item.extra && (
              <div className="w-6 h-6 rounded-full bg-line border-2 border-white flex items-center justify-center text-[9px] text-graphite-soft">
                +{item.extra}
              </div>
            )}
          </div>
        ) : (
          <span />
        )}
        <span
          className={`text-xs font-semibold ${
            item.status === "Draft Saved" ? "text-green-600" : "text-graphite-soft"
          }`}
        >
          {item.status}
        </span>
      </div>
    </Link>
  );
}