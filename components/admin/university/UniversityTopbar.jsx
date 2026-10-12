"use client";
import AdminTopbar from "@/components/admin/shared/AdminTopbar";
import AdminButton from "@/components/admin/shared/AdminButton";
import DropdownMenu from "@/components/admin/shared/DropdownMenu";
import Icon from "@/components/admin/shared/Icon";
import { useShell } from "@/components/admin/shared/AdminShell";
import { timeAgoLong } from "@/lib/admin/dates";

/** University Overview header: session pill, campus, notifications, Quick Action. */
export default function UniversityTopbar({ profile, recent = [], onAddStudent, onBulkEnrollment }) {
  const { openMenu } = useShell();
  const items = [
    { label: "Add Student", icon: "plusCircle", onClick: onAddStudent },
    { label: "Add Lecturer", icon: "userPlus", href: "/admin/university/lecturers" },
    { label: "Bulk Enrollment", icon: "import", onClick: onBulkEnrollment },
  ];

  return (
    <AdminTopbar onMenu={openMenu}>
      <div className="flex min-w-0 items-center rounded-lg border border-[#e5e8ee] bg-[#f3f5f9] px-3 py-1.5 text-[12.5px]">
        <span className="hidden font-semibold text-[#0b1a30] sm:inline">Current Session:</span>
        <span className="rounded bg-[#071a33] px-2 py-0.5 font-bold text-[#f5c400] sm:ml-2">{profile?.session ?? "—"}</span>
        <span className="ml-2 truncate text-[10.5px] font-bold uppercase text-[#6b7587]">{profile?.semester}</span>
      </div>

      <div className="flex shrink-0 items-center gap-3">
        <span className="hidden items-center gap-2 text-[11.5px] font-bold uppercase tracking-wide text-[#6b7587] md:flex">
          <Icon name="building" size={16} />
          {profile?.campus ?? ""}
        </span>
        <span className="hidden h-7 w-px bg-[#e5e8ee] md:block" aria-hidden />

        <DropdownMenu
          width={320}
          renderTrigger={({ open, toggle }) => (
            <button
              onClick={toggle}
              aria-haspopup="menu"
              aria-expanded={open}
              aria-label="Recent activity notifications"
              className="relative flex h-10 w-10 items-center justify-center rounded-full border border-[#e5e8ee] bg-white text-[#4b5565] hover:bg-[#f3f5f9]"
            >
              <Icon name="bell" size={18} />
              {recent.length > 0 && <span className="absolute right-2.5 top-2.5 h-2 w-2 rounded-full bg-[#f5c400] ring-2 ring-white" />}
            </button>
          )}
        >
          {() => (
            <div className="p-1.5">
              <p className="skul-eyebrow px-2 pb-2 pt-1">Recent activity</p>
              {recent.length === 0 ? (
                <p className="px-2 py-3 text-[13px] text-[#6b7587]">Nothing yet.</p>
              ) : (
                recent.map((r) => (
                  <div key={r.id} className="rounded-lg px-2 py-2 hover:bg-[#f8f9fb]">
                    <p className="text-[13px] font-semibold text-[#0b1a30]">{r.title}</p>
                    <p className="text-[12px] text-[#6b7587]">{r.detail}</p>
                    <p className="mt-0.5 text-[11px] text-[#8a93a3]">{timeAgoLong(r.at)}</p>
                  </div>
                ))
              )}
            </div>
          )}
        </DropdownMenu>

        <DropdownMenu
          items={items}
          renderTrigger={({ open, toggle }) => (
            <AdminButton variant="primary" onClick={toggle} aria-haspopup="menu" aria-expanded={open}>Quick Action</AdminButton>
          )}
        />
      </div>
    </AdminTopbar>
  );
}