"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  LayoutGrid,
  CalendarClock,
  BookOpen,
  FileText,
  ClipboardCheck,
  Bus,
  AlertTriangle,
  Files,
  GraduationCap,
} from "lucide-react";

// DEFAULT STUDENT SIDEBAR

export const studentSections = [
  {
    title: "My Academic",
    links: [
      {
        label: "Timetable",
        href: "/studentTimetable",
        icon: CalendarClock,
      },
      {
        label: "My Courses",
        href: "/courses",
        icon: BookOpen,
      },
      {
        label: "Assignments",
        href: "/assignments",
        icon: FileText,
      },
      {
        label: "Exam Result",
        href: "/exam-result",
        icon: ClipboardCheck,
      },
    ],
  },

  {
    title: "Campus Life",
    links: [
      {
        label: "Campus Ride",
        href: "/campus-ride",
        icon: Bus,
      },
      {
        label: "Complaints",
        href: "/complaints",
        icon: AlertTriangle,
      },
      {
        label: "Documents",
        href: "/documents",
        icon: Files,
      },
    ],
  },
];

// LECTURER SIDEBAR

export const lecturerSections = [
  {
    title: "Teaching",
    links: [
      {
        label: "My Classes",
        href: "/lecturer/classes",
        icon: BookOpen,
      },
      {
        label: "Attendance",
        href: "/lecturer/attendance",
        icon: ClipboardCheck,
      },
      {
        label: "Assignments",
        href: "/lecturer/assignments",
        icon: FileText,
      },
      {
        label: "Students",
        href: "/lecturer/students",
        icon: GraduationCap,
      },
    ],
  },

  {
    title: "Campus Life",
    links: [
      {
        label: "Campus Ride",
        href: "/lecturer/campus-ride",
        icon: Bus,
      },
      {
        label: "Complaints",
        href: "/lecturer/complaints",
        icon: AlertTriangle,
      },
      {
        label: "Documents",
        href: "/lecturer/documents",
        icon: Files,
      },
    ],
  },
];

// NAVIGATION LINK COMPONENT

function NavLink({ href, icon: Icon, label, active }) {
  return (
    <Link
      href={href}
      className={`flex items-center gap-3 px-3 py-2 rounded-lg text-[13.5px] transition-colors ${
        active
          ? "bg-bronze-deep/10 text-charcoal font-semibold"
          : "text-graphite hover:bg-paper"
      }`}
    >
      <Icon
        size={18}
        className={active ? "text-bronze-deep" : "text-graphite-soft"}
        strokeWidth={active ? 2.25 : 1.75}
      />

      {label}
    </Link>
  );
}

// REUSABLE SIDEBAR

export default function Sidebar({
  sections = studentSections,
  dashboardHref = "/dashboard",

  user = {
    name: "Your Name",
    role: "Student • 300L",
    avatar: "/avatar-placeholder.jpg",
  },
}) {
  const pathname = usePathname();

  return (
    <aside className="hidden md:fixed md:left-0 md:top-0 md:w-[280px] md:bg-paper md:border-r md:border-line md:flex-shrink-0 md:flex md:flex-col md:h-screen md:z-20">
      
      {/* LOGO */}

      <div className="h-[72px] px-6 flex items-center gap-2.5 border-b border-line shrink-0">
        <div className="w-8 h-8 rounded-lg bg-charcoal flex items-center justify-center text-cream shadow-lg shadow-charcoal/20">
          <GraduationCap size={18} />
        </div>

        <span className="font-bold text-xl tracking-tight text-charcoal">
          UniFlow
        </span>
      </div>

      {/* SCROLLABLE NAVIGATION */}

      <div className="flex-1 overflow-y-auto py-6 px-4 space-y-8">

        {/* Dashboard */}

        <div>
          <NavLink
            href={dashboardHref}
            icon={LayoutGrid}
            label="Dashboard"
            active={
              pathname === dashboardHref ||
              pathname.startsWith(`${dashboardHref}/`)
            }
          />
        </div>

        {/* Dynamic Sections */}

        {sections.map((section) => (
          <div key={section.title}>

            <h3 className="px-3 text-[11px] font-bold text-graphite-soft uppercase tracking-[0.05em] mb-3">
              {section.title}
            </h3>

            <ul className="space-y-1">
              {section.links.map((link) => (
                <li key={link.href}>
                  <NavLink
                    {...link}
                    active={
                      pathname === link.href ||
                      pathname.startsWith(`${link.href}/`)
                    }
                  />
                </li>
              ))}
            </ul>

          </div>
        ))}
      </div>

      {/* USER PROFILE */}

      <div className="p-4 border-t border-line bg-cream">

        <div className="flex items-center gap-3 p-2 rounded-xl bg-paper border border-line shadow-sm cursor-pointer hover:bg-white transition-colors">

          <Image
            src={user.avatar}
            alt={user.name}
            width={40}
            height={40}
            className="rounded-lg object-cover ring-2 ring-line"
          />

          <div className="flex-1 min-w-0">

            <p className="text-[13px] font-bold text-charcoal truncate">
              {user.name}
            </p>

            <p className="text-[11px] font-semibold text-bronze-deep truncate uppercase tracking-wider">
              {user.role}
            </p>

          </div>
        </div>

      </div>
    </aside>
  );
}