"use client";

import { LayoutGrid, BookOpen, Bus, MessageCircle, UserCircle } from "lucide-react";

/**
 * Mobile-only bottom navigation bar.
 * Visually based on the supplied HTML reference:
 * - fixed to bottom, white surface, thin top border, h-[84px], z-50
 * - 5 positions, icons above labels
 * - active Home in brand blue, inactive items muted slate
 * - center "Ride" button elevated above the bar in dark navy
 *
 * Swap the `href`s below for real routes (or wire up next/link + usePathname
 * for real active-state detection) once your routing is finalized.
 */
export default function MobileBottomNav({ active = "home" }) {
  const items = [
    { key: "home", label: "Home", icon: LayoutGrid, href: "/dashboard" },
    { key: "academic", label: "Academic", icon: BookOpen, href: "/courses" },
    // "ride" is rendered separately as the elevated center action
    { key: "support", label: "Support", icon: MessageCircle, href: "/complaints" },
    { key: "profile", label: "Profile", icon: UserCircle, href: "/students" },
  ];

  return (
    <nav
      className="
        md:hidden fixed bottom-0 left-0 right-0 h-[84px]
        bg-white border-t border-slate-200 flex items-center justify-around
        px-2 z-50
      "
    >
      {/* Home */}
      <NavItem item={items[0]} isActive={active === "home"} />

      {/* Academic */}
      <NavItem item={items[1]} isActive={active === "academic"} />

      {/* Center elevated Ride action */}
      
        <a href="/campus-ride"
        className="relative -mt-8 flex flex-col items-center"
        aria-label="Campus Ride"
      >
        <span
          className="
            w-14 h-14 rounded-2xl bg-[#1a365d] text-white
            shadow-xl shadow-[#0c426e]/30 flex items-center justify-center
            border-4 border-slate-50
          "
        >
          <Bus size={24} strokeWidth={2} />
        </span>
        <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-[10px] font-bold text-slate-400 whitespace-nowrap">
          Ride
        </span>
      </a>

      {/* Support */}
      <NavItem item={items[2]} isActive={active === "support"} />

      {/* Profile */}
      <NavItem item={items[3]} isActive={active === "profile"} />
    </nav>
  );
}

function NavItem({ item, isActive }) {
  const Icon = item.icon;
  return (
    
      <a href={item.href}
      className={`flex flex-col items-center gap-1 ${
        isActive ? "text-[#0e91e9]" : "text-slate-400"
      }`}
    >
      <Icon size={24} strokeWidth={isActive ? 2.5 : 2} />
      <span className="text-[10px] font-bold">{item.label}</span>
    </a>
  );
}