"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import AdminTopbar from "@/components/admin/shared/AdminTopbar";
import AdminButton from "@/components/admin/shared/AdminButton";
import DropdownMenu from "@/components/admin/shared/DropdownMenu";
import Icon from "@/components/admin/shared/Icon";
import { SearchInput } from "@/components/admin/shared/TableToolbar";
import { useShell } from "@/components/admin/shared/AdminShell";
import QuickActionsMenu from "../QuickActionsMenu";

/** Platform Overview header (search + bell + Quick Actions + New Institution), per reference. */
export default function OverviewTopbar({ alerts = [] }) {
  const [q, setQ] = useState("");
  const router = useRouter();
  const { openMenu } = useShell();

  // Global search currently resolves against institutions only; there is no user directory yet.
  const submit = (e) => {
    e.preventDefault();
    const term = q.trim();
    router.push(`/admin/platform/institutions${term ? `?q=${encodeURIComponent(term)}` : ""}`);
  };

  return (
    <AdminTopbar onMenu={openMenu}>
      <form onSubmit={submit} role="search" className="min-w-0 flex-1 sm:max-w-[320px]">
        <SearchInput value={q} onChange={setQ} placeholder="Search institutions, users..." />
      </form>
      <div className="flex shrink-0 items-center gap-2.5">
        <DropdownMenu
          width={320}
          renderTrigger={({ open, toggle }) => (
            <button
              onClick={toggle}
              aria-haspopup="menu"
              aria-expanded={open}
              aria-label={`Notifications${alerts.length ? `, ${alerts.length} active alerts` : ""}`}
              className="relative flex h-10 w-10 items-center justify-center rounded-lg border border-[#e5e8ee] bg-white text-[#4b5565] hover:bg-[#f3f5f9]"
            >
              <Icon name="bell" size={18} />
              {alerts.length > 0 && <span className="absolute right-2.5 top-2.5 h-2 w-2 rounded-full bg-[#dc2626] ring-2 ring-white" />}
            </button>
          )}
        >
          {(close) => (
            <div className="p-1.5">
              <p className="skul-eyebrow px-2 pb-2 pt-1">Active alerts</p>
              {alerts.length === 0 ? (
                <p className="px-2 py-3 text-[13px] text-[#6b7587]">No active alerts.</p>
              ) : (
                alerts.map((a) => (
                  <div key={a.id} className="rounded-lg px-2 py-2 hover:bg-[#f8f9fb]">
                    <p className="text-[13px] font-semibold text-[#0b1a30]">{a.title}</p>
                    <p className="text-[12px] text-[#6b7587]">{a.message}</p>
                  </div>
                ))
              )}
              <Link href="/admin/platform/audit-logs" onClick={close} className="mt-1 block rounded-lg px-2 py-2 text-[12.5px] font-semibold text-[#071a33] hover:bg-[#f3f5f9]">
                View activity log
              </Link>
            </div>
          )}
        </DropdownMenu>
        <span className="hidden sm:block"><QuickActionsMenu /></span>
        <AdminButton variant="primary" icon="plus" href="/admin/platform/onboarding">
          <span className="hidden sm:inline">New Institution</span>
          <span className="sm:hidden">New</span>
        </AdminButton>
      </div>
    </AdminTopbar>
  );
}