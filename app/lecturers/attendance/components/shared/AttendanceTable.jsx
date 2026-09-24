"use client";

import Link from "next/link";
import { useEffect, useId, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, MoreVertical } from "lucide-react";
import { formatTime } from "@/lib/mock/attendanceUtils";
import AttendanceStatusBadge from "./AttendanceStatusBadge";
import StudentAvatar from "./StudentAvatar";

const menuItemClass =
  "flex w-full items-center px-3 py-2 text-left text-sm text-charcoal hover:bg-cream focus-visible:bg-cream focus-visible:outline-none";

// Kebab menu for a row. Items are { label, href } for navigation or { label, onSelect } for actions.
export function RowActionsMenu({ label, items }) {
  const [open, setOpen] = useState(false);
  const containerRef = useRef(null);
  const buttonRef = useRef(null);
  const menuId = useId();

  useEffect(() => {
    if (!open) return undefined;

    const handlePointerDown = (event) => {
      if (!containerRef.current?.contains(event.target)) setOpen(false);
    };
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setOpen(false);
        buttonRef.current?.focus();
      }
    };

    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [open]);

  return (
    <div ref={containerRef} className="relative inline-block text-left">
      <button
        ref={buttonRef}
        type="button"
        aria-label={label}
        aria-expanded={open}
        aria-controls={menuId}
        onClick={() => setOpen((value) => !value)}
        className="flex h-9 w-9 items-center justify-center rounded-md text-graphite hover:bg-cream focus:outline-none focus-visible:ring-2 focus-visible:ring-bronze-deep"
      >
        <MoreVertical aria-hidden="true" className="h-4 w-4" />
      </button>

      {open && (
        <ul
          id={menuId}
          className="absolute right-0 top-full z-20 mt-1 w-48 rounded-md border border-line bg-paper py-1 shadow-md"
        >
          {items.map((item) => (
            <li key={item.label}>
              {item.href ? (
                <Link href={item.href} onClick={() => setOpen(false)} className={menuItemClass}>
                  {item.label}
                </Link>
              ) : (
                <button
                  type="button"
                  onClick={() => {
                    setOpen(false);
                    item.onSelect?.();
                  }}
                  className={menuItemClass}
                >
                  {item.label}
                </button>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function TablePagination({ pagination }) {
  const { page, totalPages, from, to, total, onPageChange } = pagination;
  const buttonClass =
    "flex h-8 w-8 items-center justify-center rounded-md border border-line text-graphite hover:bg-cream focus:outline-none focus-visible:ring-2 focus-visible:ring-bronze-deep disabled:cursor-not-allowed disabled:opacity-40";

  return (
    <div className="flex flex-wrap items-center justify-between gap-2 border-t border-line px-3 py-2 text-xs text-graphite-soft">
      <p aria-live="polite">
        Showing {from}–{to} of {total}
      </p>
      <div className="flex items-center gap-2">
        <button
          type="button"
          aria-label="Previous page"
          disabled={page <= 1}
          onClick={() => onPageChange(page - 1)}
          className={buttonClass}
        >
          <ChevronLeft aria-hidden="true" className="h-4 w-4" />
        </button>
        <span>
          Page {page} of {totalPages}
        </span>
        <button
          type="button"
          aria-label="Next page"
          disabled={page >= totalPages}
          onClick={() => onPageChange(page + 1)}
          className={buttonClass}
        >
          <ChevronRight aria-hidden="true" className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}

// Used by Live Attendance and the Session Record. From md up it is a normal table;
// below that each row becomes a stacked card so nothing needs sideways scrolling.
export default function AttendanceTable({
  rows,
  loading = false,
  showIndex = false,
  startIndex = 0,
  getRowActions,
  selectedRowId,
  pagination,
  caption = "Student attendance",
  emptyMessage = "No students match the current filters.",
}) {
  if (loading) {
    return (
      <div aria-busy="true" className="space-y-2 p-3">
        {[0, 1, 2, 3, 4].map((key) => (
          <div key={key} className="h-10 animate-pulse rounded-md bg-cream" />
        ))}
      </div>
    );
  }

  if (rows.length === 0) {
    return <p className="px-4 py-8 text-center text-sm text-graphite-soft">{emptyMessage}</p>;
  }

  const headerClass = "px-3 py-2 text-left text-xs font-medium text-graphite-soft";

  return (
    <div>
      {/* md and up: table */}
      <table className="hidden w-full border-collapse text-sm md:table">
        <caption className="sr-only">{caption}</caption>
        <thead>
          <tr className="border-b border-line">
            {showIndex && (
              <th scope="col" className={`${headerClass} w-10`}>
                #
              </th>
            )}
            <th scope="col" className={headerClass}>
              Student
            </th>
            <th scope="col" className={headerClass}>
              Matric Number
            </th>
            <th scope="col" className={headerClass}>
              Check-in Time
            </th>
            <th scope="col" className={headerClass}>
              Status
            </th>
            {getRowActions && (
              <th scope="col" className={`${headerClass} text-right`}>
                Actions
              </th>
            )}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, index) => (
            <tr
              key={row.id}
              className={`border-b border-line last:border-b-0 ${
                row.id === selectedRowId ? "bg-cream" : ""
              }`}
            >
              {showIndex && <td className="px-3 py-2.5 text-graphite-soft">{startIndex + index + 1}</td>}
              <td className="px-3 py-2.5">
                <div className="flex items-center gap-2">
                  <StudentAvatar name={row.studentName} />
                  <span className="font-medium text-charcoal">{row.studentName}</span>
                </div>
              </td>
              <td className="px-3 py-2.5 text-graphite">{row.matricNumber}</td>
              <td className="px-3 py-2.5 text-graphite">{formatTime(row.checkInTime)}</td>
              <td className="px-3 py-2.5">
                <AttendanceStatusBadge status={row.status} />
              </td>
              {getRowActions && (
                <td className="px-3 py-1 text-right">
                  <RowActionsMenu
                    label={`Actions for ${row.studentName}`}
                    items={getRowActions(row)}
                  />
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>

      {/* below md: cards */}
      <ul className="divide-y divide-line md:hidden">
        {rows.map((row) => (
          <li
            key={row.id}
            className={`flex items-start gap-3 p-3 ${row.id === selectedRowId ? "bg-cream" : ""}`}
          >
            <StudentAvatar name={row.studentName} size="md" />
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium text-charcoal">{row.studentName}</p>
              <p className="text-xs text-graphite-soft">
                {row.matricNumber} ·{" "}
                {row.checkInTime ? `Checked in ${formatTime(row.checkInTime)}` : "No check-in"}
              </p>
              <div className="mt-1.5">
                <AttendanceStatusBadge status={row.status} />
              </div>
            </div>
            {getRowActions && (
              <RowActionsMenu label={`Actions for ${row.studentName}`} items={getRowActions(row)} />
            )}
          </li>
        ))}
      </ul>

      {pagination && <TablePagination pagination={pagination} />}
    </div>
  );
}