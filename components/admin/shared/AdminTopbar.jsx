"use client";
import Link from "next/link";
import Icon from "./Icon";

/**
 * Page header. Two modes:
 *  - breadcrumb + title + right-aligned actions (most pages)
 *  - children: free-form content (Platform Overview search bar, University session pill)
 * `onMenu` shows a hamburger below the lg breakpoint.
 */
export default function AdminTopbar({ breadcrumb = [], title, actions, onMenu, children }) {
  return (
    <header className="sticky top-0 z-20 flex min-h-[65px] items-center gap-3 border-b border-[#e5e8ee] bg-white px-4 py-2 sm:px-8">
      {onMenu && (
        <button onClick={onMenu} aria-label="Open navigation" className="rounded-lg p-2 text-[#4b5565] hover:bg-[#f3f5f9] lg:hidden">
          <Icon name="menu" size={20} />
        </button>
      )}
      {children ? (
        <div className="flex min-w-0 flex-1 items-center justify-between gap-3">{children}</div>
      ) : (
        <>
          <div className="min-w-0 flex-1">
            {breadcrumb.length > 0 && (
              <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-[12px] text-[#6b7587]">
                {breadcrumb.map((b, i) => (
                  <span key={b.label} className="flex items-center gap-1.5">
                    {i > 0 && <Icon name="chevronRight" size={11} />}
                    {b.href ? <Link href={b.href} className="hover:text-[#0b1a30]">{b.label}</Link> : b.label}
                  </span>
                ))}
              </nav>
            )}
            <h1 className="skul-heading truncate text-[20px] font-semibold text-[#0b1a30]">{title}</h1>
          </div>
          {actions && <div className="flex shrink-0 items-center gap-2.5">{actions}</div>}
        </>
      )}
    </header>
  );
}

/** Standard content container used inside every page. */
export function PageBody({ children, narrow = false, className = "" }) {
  return <div className={`mx-auto w-full px-4 py-6 sm:px-8 ${narrow ? "max-w-[820px]" : "max-w-[1280px]"} ${className}`}>{children}</div>;
}