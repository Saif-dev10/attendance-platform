"use client";

import { LayoutGrid, BookOpen, Bus, MessageCircle, UserCircle } from "lucide-react";

/**
 * Mobile-only bottom navigation bar.
 * Colors migrated to the landing page's charcoal/paper/cream/bronze system.
 *
 * Swap the `href`s below for real routes (or wire up next/link + usePathname
 * for real active-state detection) once your routing is finalized.
 */
export default function MobileBottomNav({ active = "home" }) {
  const items = [
    { key: "home", label: "Home", icon: LayoutGrid, href: "/dashboard" },
    { key: "academic", label: "Academic", icon: BookOpen, href: "/students/courses" },
    { key: "support", label: "Support", icon: MessageCircle, href: "/complaints" },
    { key: "profile", label: "Profile", icon: UserCircle, href: "/students" },
  ];

  return (
    <nav
      className="
        md:hidden fixed bottom-0 left-0 right-0 h-[84px]
        bg-white border-t border-line flex items-center justify-around
        px-2 z-50
      "
    >
      <NavItem item={items[0]} isActive={active === "home"} />

      <NavItem item={items[1]} isActive={active === "academic"} />

      
        <a href="/campus-ride"
        className="relative -mt-8 flex flex-col items-center"
        aria-label="Campus Ride"
      >
        <span
          className="
            w-14 h-14 rounded-2xl bg-charcoal text-cream
            shadow-xl shadow-charcoal/30 flex items-center justify-center
            border-4 border-paper
          "
        >
          <Bus size={24} strokeWidth={2} />
        </span>
        <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-[10px] font-bold text-graphite-soft whitespace-nowrap">
          Ride
        </span>
      </a>

      <NavItem item={items[2]} isActive={active === "support"} />

      <NavItem item={items[3]} isActive={active === "profile"} />
    </nav>
  );
}

function NavItem({ item, isActive }) {
  const Icon = item.icon;
  return (
    
      <a href={item.href}
      className={`flex flex-col items-center gap-1 ${
        isActive ? "text-bronze-deep" : "text-graphite-soft"
      }`}
    >
      <Icon size={24} strokeWidth={isActive ? 2.5 : 2} />
      <span className="text-[10px] font-bold">{item.label}</span>
    </a>
  );
}