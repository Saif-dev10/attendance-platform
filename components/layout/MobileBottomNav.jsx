"use client";

import { useState } from "react";
import Link from "next/link";
import {
  LayoutGrid,
  BookOpen,
  Bus,
  MessageCircle,
  Menu,
  X,
  CalendarClock,
  FileText,
  ClipboardCheck,
  AlertTriangle,
  Files,
  UserCircle,
  Settings,
} from "lucide-react";

export default function MobileBottomNav({ active = "home" }) {
  const [moreOpen, setMoreOpen] = useState(false);

  /**
   * Primary quick actions that stay visible in the mobile tab bar.
   * These are the actions students use most often, keeping the layout uncluttered
   * while still giving quick access to key parts of the app.
   */
  const items = [
    {
      key: "home",
      label: "Home",
      icon: LayoutGrid,
      href: "/dashboard",
    },
    {
      key: "academic",
      label: "Academic",
      icon: BookOpen,
      href: "/students/courses",
    },
    {
      key: "support",
      label: "Support",
      icon: MessageCircle,
      href: "/complaints",
    },
  ];

  /**
   * Secondary links grouped inside the overflow menu.
   * We keep less frequently used screens here so the main nav remains focused and
   * easier to scan on smaller devices.
   */
  const moreSections = [
    {
      title: "Account",
      links: [
        {
          label: "Profile",
          href: "/students/profile",
          icon: UserCircle,
        },
        {
          label: "Settings",
          href: "/students/settings",
          icon: Settings,
        },
      ],
    },
    {
      title: "My Academic",
      links: [
        {
          label: "Timetable",
          href: "/students/timetable",
          icon: CalendarClock,
        },
        {
          label: "Assignments",
          href: "/students/assignments",
          icon: FileText,
        },
        {
          label: "Exam Result",
          href: "/students/exam-result",
          icon: ClipboardCheck,
        },
      ],
    },
    {
      title: "Campus Life",
      links: [
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

  return (
    <>
      {/*
        * Dimmed backdrop for the overflow drawer.
        * This keeps the menu visually separate from the content underneath and
        * makes the mobile interaction feel deliberate and easy to dismiss.
        */}
      {moreOpen && (
        <div
          className="fixed inset-0 z-[60] bg-charcoal/30 backdrop-blur-[2px] md:hidden"
          onClick={() => setMoreOpen(false)}
          aria-hidden="true"
        />
      )}

      {/*
        * Expanded menu of secondary actions.
        * This drawer groups profile, timetable, documents, and support links that
        * are useful but not essential enough to live in the main bottom tab strip.
        */}
      <div
        className={`fixed bottom-0 left-0 right-0 z-[70] rounded-t-3xl border-t border-line bg-paper px-4 pb-6 pt-3 shadow-2xl transition-transform duration-300 md:hidden ${
          moreOpen ? "translate-y-0" : "translate-y-full"
        }`}
      >
        <div className="mx-auto mb-4 h-1 w-10 rounded-full bg-line" />

        <div className="mb-5 flex items-center justify-between px-1">
          <div>
            <h2 className="text-base font-bold text-charcoal">More</h2>
            <p className="mt-0.5 text-xs text-graphite-soft">
              More options and services
            </p>
          </div>

          <button
            type="button"
            onClick={() => setMoreOpen(false)}
            aria-label="Close more menu"
            className="flex h-9 w-9 items-center justify-center rounded-xl border border-line bg-white text-graphite-soft transition-colors hover:bg-cream hover:text-charcoal"
          >
            <X size={17} />
          </button>
        </div>

        <div className="max-h-[65vh] space-y-6 overflow-y-auto">
          {moreSections.map((section) => (
            <section key={section.title}>
              <h3 className="mb-2 px-1 text-[10px] font-bold uppercase tracking-widest text-graphite-soft">
                {section.title}
              </h3>

              <div className="overflow-hidden rounded-2xl border border-line bg-white">
                {section.links.map((link, index) => {
                  const Icon = link.icon;

                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setMoreOpen(false)}
                      className={`flex items-center gap-3 px-4 py-3.5 text-graphite transition-colors hover:bg-paper ${
                        index !== section.links.length - 1
                          ? "border-b border-line"
                          : ""
                      }`}
                    >
                      <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-cream text-graphite-soft">
                        <Icon size={17} strokeWidth={1.9} />
                      </span>

                      <span className="flex-1 text-sm font-semibold">
                        {link.label}
                      </span>

                      <span className="text-xs text-graphite-soft">
                        →
                      </span>
                    </Link>
                  );
                })}
              </div>
            </section>
          ))}
        </div>
      </div>

      {/*
        * Mobile navigation bar.
        * This is intentionally kept to a compact, touch-friendly layout on small
        * screens so core student actions remain easy to reach with one hand.
        */}
      <nav
        className="
          fixed bottom-0 left-0 right-0 z-50
          flex h-[84px] items-center justify-around
          border-t border-line bg-white px-2
          md:hidden
        "
      >
        <NavItem
          item={items[0]}
          isActive={active === "home"}
        />

        <NavItem
          item={items[1]}
          isActive={active === "academic"}
        />

        {/* Campus ride is promoted as a quick action because it is a high-frequency need. */}
        <Link
          href="/campus-ride"
          className="relative -mt-8 flex flex-col items-center"
          aria-label="Campus Ride"
        >
          <span
            className="
              flex h-14 w-14 items-center justify-center
              rounded-2xl border-4 border-paper
              bg-charcoal text-cream
              shadow-xl shadow-charcoal/30
            "
          >
            <Bus size={24} strokeWidth={2} />
          </span>

          <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 whitespace-nowrap text-[10px] font-bold text-graphite-soft">
            Ride
          </span>
        </Link>

        <NavItem
          item={items[2]}
          isActive={active === "support"}
        />

        {/* The overflow button keeps the primary nav compact without hiding less common options. */}
        <button
          type="button"
          onClick={() => setMoreOpen(true)}
          aria-label="Open more menu"
          aria-expanded={moreOpen}
          className={`flex flex-col items-center gap-1 transition-colors ${
            moreOpen
              ? "text-bronze-deep"
              : "text-graphite-soft"
          }`}
        >
          <Menu
            size={24}
            strokeWidth={moreOpen ? 2.5 : 2}
          />

          <span className="text-[10px] font-bold">
            More
          </span>
        </button>
      </nav>
    </>
  );
}

function NavItem({ item, isActive }) {
  const Icon = item.icon;

  return (
    <Link
      href={item.href}
      className={`flex flex-col items-center gap-1 transition-colors ${
        isActive
          ? "text-bronze-deep"
          : "text-graphite-soft"
      }`}
    >
      <Icon
        size={24}
        strokeWidth={isActive ? 2.5 : 2}
      />

      <span className="text-[10px] font-bold">
        {item.label}
      </span>
    </Link>
  );
}