"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Icon from "./Icon";

/**
 * Config-driven sidebar used by BOTH environments (each passes its own nav + theme).
 * nav: [{ title?, items: [{ label, href, icon, exact? }] }]
 * theme: "dark" (platform) | "light" (university)
 */
export function SkulLogo({ size = 36 }) {
  return (
    <span className="flex items-center justify-center rounded-lg bg-[#f5c400] text-[#071a33]" style={{ width: size, height: size }}>
      <Icon name="student" size={size * 0.6} />
    </span>
  );
}

function isActive(pathname, item) {
  return item.exact ? pathname === item.href : pathname === item.href || pathname.startsWith(`${item.href}/`);
}

export default function AdminSidebar({ nav, theme = "dark", brand, footer, open = false, onClose, progress }) {
  const pathname = usePathname();
  const dark = theme === "dark";

  const body = (
    <div className={`flex h-full w-[236px] flex-col ${dark ? "bg-[#071a33] text-white" : "border-r border-[#e5e8ee] bg-white text-[#0b1a30]"}`}>
      <div className={`flex h-[65px] shrink-0 items-center px-5 ${dark ? "" : "border-b border-[#e5e8ee]"}`}>{brand}</div>
      <nav aria-label="Primary" className="flex-1 overflow-y-auto px-3 py-4">
        {nav.map((section, si) => (
          <div key={si} className={si > 0 ? "mt-6" : ""}>
            {section.title && (
              <p className={`px-3 pb-2 text-[10.5px] font-semibold uppercase tracking-[0.1em] ${dark ? "text-[#8fa0b8]" : "text-[#8a93a3]"}`}>{section.title}</p>
            )}
            <ul className="space-y-1">
              {section.items.map((item) => {
                const active = isActive(pathname, item);
                const cls = dark
                  ? active ? "bg-[#12294a] text-[#f5c400]" : "text-[#b8c4d6] hover:bg-[#0e2544] hover:text-white"
                  : active ? "bg-[#f3f5f9] font-semibold text-[#0b1a30] shadow-[inset_-3px_0_0_#071a33]" : "text-[#4b5565] hover:bg-[#f8f9fb]";
                return (
                  <li key={item.href}>
                    <Link href={item.href} onClick={onClose} aria-current={active ? "page" : undefined} className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-[13.5px] font-medium transition-colors ${cls}`}>
                      <Icon name={item.icon} size={18} />
                      {item.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </nav>
      {progress}
      {footer}
    </div>
  );

  return (
    <>
      <aside className="sticky top-0 hidden h-screen shrink-0 lg:block">{body}</aside>
      {open && (
        <div className="fixed inset-0 z-40 lg:hidden" role="dialog" aria-modal="true" aria-label="Navigation">
          <div className="absolute inset-0 bg-[#071a33]/50" onClick={onClose} />
          <div className="relative h-full w-[236px]">{body}</div>
        </div>
      )}
    </>
  );
}

/** Footer profile block (avatar + name + role). `dark` toggles colours. */
export function SidebarProfile({ name, role, dark = true, avatar }) {
  return (
    <div className={`flex items-center gap-3 px-5 py-4 ${dark ? "border-t border-white/10" : "border-t border-[#e5e8ee]"}`}>
      <span className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-[12px] font-bold ${dark ? "bg-[#f5c400] text-[#071a33]" : "bg-[#071a33] text-white"}`}>
        {avatar || name.split(" ").map((p) => p[0]).slice(0, 2).join("")}
      </span>
      <div className="min-w-0 flex-1">
        <p className={`truncate text-[13px] font-semibold ${dark ? "text-white" : "text-[#0b1a30]"}`}>{name}</p>
        <p className={`truncate text-[11px] ${dark ? "text-[#8fa0b8]" : "text-[#6b7587] uppercase font-semibold"}`}>{role}</p>
      </div>
      <Icon name={dark ? "chevronRight" : "more"} size={15} className={dark ? "text-[#8fa0b8]" : "text-[#8a93a3]"} />
    </div>
  );
}