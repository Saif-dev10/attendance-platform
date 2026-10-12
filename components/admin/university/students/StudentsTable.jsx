"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import DataTable from "@/components/admin/shared/DataTable";
import StatusBadge from "@/components/admin/shared/StatusBadge";
import DropdownMenu from "@/components/admin/shared/DropdownMenu";
import EmptyState from "@/components/admin/shared/EmptyState";
import AdminButton from "@/components/admin/shared/AdminButton";
import Icon from "@/components/admin/shared/Icon";
import { PrevNext } from "@/components/ui/Pagination";
import { initials } from "@/lib/admin/format";

/* ---- helpers shared with the detail page ---- */
export const levelLabel = (s) => (typeof s.level === "number" ? `LEVEL ${s.level}` : String(s.level).toUpperCase());

export const attendanceTone = (n) => (n === null || n === undefined ? "muted" : n < 70 ? "red" : n < 80 ? "amber" : "green");
export const TONE_TEXT = { red: "text-[#dc2626]", amber: "text-[#b45309]", green: "text-[#059669]", muted: "text-[#8a93a3]" };

export function StudentInitials({ name, size = "md" }) {
  const cls = size === "lg" ? "h-14 w-14 text-[16px]" : "h-9 w-9 text-[12px]";
  return (
    <span aria-hidden className={`flex shrink-0 items-center justify-center rounded-full bg-[#eceff4] font-bold text-[#4b5565] ${cls}`}>
      {initials(name)}
    </span>
  );
}

/** Row/action menu. `view: false` hides "View record" (used on the detail page itself). */
export function studentMenu(student, onRequestStatus, { view = true } = {}) {
  const items = [];
  if (view) items.push({ label: "View record", icon: "eye", href: `/admin/university/students/${student.id}` });
  items.push({ label: "Email student", icon: "mail", href: `mailto:${student.email}` });
  const s = student.status;
  if (s === "active") items.push({ divider: true }, { label: "Flag account", icon: "warning", onClick: () => onRequestStatus(student, "flagged") });
  if (s === "flagged") items.push({ divider: true }, { label: "Clear flag", icon: "checkCircle", onClick: () => onRequestStatus(student, "active") });
  if (s !== "suspended_account") items.push({ label: "Suspend account", icon: "xCircle", danger: true, onClick: () => onRequestStatus(student, "suspended_account") });
  else items.push({ divider: true }, { label: "Reactivate account", icon: "checkCircle", onClick: () => onRequestStatus(student, "active") });
  return items;
}

export default function StudentsTable({ data, loading, error, onRetry, sort, onSort, page, pageSize, onPage, onRequestStatus, filtered, onClear, onAdd }) {
  const router = useRouter();

  const columns = [
    {
      key: "fullName",
      header: "Student Name",
      sortable: true,
      render: (s) => (
        <div className="flex items-center gap-3">
          <StudentInitials name={s.fullName} />
          <div className="min-w-0">
            <Link href={`/admin/university/students/${s.id}`} onClick={(e) => e.stopPropagation()} className="block truncate font-semibold text-[#0b1a30] hover:underline">
              {s.fullName}
            </Link>
            <p className="truncate text-[12px] text-[#6b7587]">{s.email}</p>
          </div>
        </div>
      ),
    },
    { key: "matric", header: "Matric Number", render: (s) => <span className="rounded bg-[#f3f5f9] px-2 py-1 font-mono text-[11.5px] font-bold text-[#6b7587]">{s.matric}</span> },
    {
      key: "programme",
      header: "Programme / Level",
      render: (s) => (
        <div>
          <p className="text-[13.5px] text-[#0b1a30]">{s.programme}</p>
          <p className="text-[10.5px] font-bold uppercase tracking-wide text-[#6b7587]">{levelLabel(s)}</p>
        </div>
      ),
    },
    { key: "status", header: "Account Status", render: (s) => <StatusBadge status={s.status} /> },
    {
      key: "attendance",
      header: "Attendance Avg.",
      align: "right",
      sortable: true,
      render: (s) => {
        const tone = attendanceTone(s.attendance);
        return (
          <span className={`inline-flex items-center gap-1 text-[14px] font-bold ${TONE_TEXT[tone]}`}>
            {tone === "red" && <Icon name="warning" size={13} title="Below 70%" />}
            {s.attendance === null ? "—" : `${s.attendance}%`}
          </span>
        );
      },
    },
    {
      key: "actions",
      header: "Actions",
      align: "right",
      render: (s) => (
        <DropdownMenu
          items={studentMenu(s, onRequestStatus)}
          renderTrigger={({ open, toggle }) => (
            <button onClick={toggle} aria-haspopup="menu" aria-expanded={open} aria-label={`Actions for ${s.fullName}`} className="rounded-lg p-1.5 text-[#6b7587] hover:bg-[#f3f5f9]">
              <Icon name="more" size={18} />
            </button>
          )}
        />
      ),
    },
  ];

  return (
    <DataTable
      columns={columns}
      rows={data?.items || []}
      loading={loading}
      error={error}
      onRetry={onRetry}
      sort={sort}
      onSort={onSort}
      onRowClick={(s) => router.push(`/admin/university/students/${s.id}`)}
      minWidth={900}
      empty={
        <EmptyState
          icon="student"
          title="No students found"
          message={filtered ? "No student matches your search or filter." : "Add the first student to this directory."}
          action={filtered ? <AdminButton size="sm" onClick={onClear}>Clear filters</AdminButton> : <AdminButton size="sm" variant="primary" icon="plus" onClick={onAdd}>Add New Student</AdminButton>}
        />
      }
      footer={data ? <PrevNext page={page} pageSize={pageSize} total={data.total} noun="students" nextLabel="Next Page" onChange={onPage} /> : null}
    />
  );
}