"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import DataTable from "@/components/admin/shared/DataTable";
import StatusBadge from "@/components/admin/shared/StatusBadge";
import ProgressBar from "@/components/admin/shared/ProgressBar";
import DropdownMenu from "@/components/admin/shared/DropdownMenu";
import EmptyState from "@/components/admin/shared/EmptyState";
import AdminButton from "@/components/admin/shared/AdminButton";
import Icon from "@/components/admin/shared/Icon";
import { PrevNext } from "@/components/ui/Pagination";
import { formatNumber } from "@/lib/admin/format";
import { ADMIN_CONFIG } from "@/lib/admin/config";
import InstitutionAvatar from "./InstitutionAvatar";

const PROGRESS_TONE = { active: "green", onboarding: "blue", suspended: "amber" };

const Pending = () => <span className="italic text-[#8a93a3]">Pending</span>;
const Num = ({ v }) => (v === null || v === undefined ? <Pending /> : <span className="text-[14px] text-[#0b1a30]">{formatNumber(v)}</span>);

export function institutionMenu(inst, onRequestStatus) {
  const items = [{ label: "View details", icon: "eye", href: `/admin/platform/institutions/${inst.id}` }];
  if (inst.status === "onboarding")
    items.push({ label: "Resume onboarding", icon: "onboarding", href: `/admin/platform/onboarding?institution=${inst.id}` });
  if (inst.id === "inst_buk") items.push({ label: "Open institution dashboard", icon: "building", href: "/admin/university" });
  if (inst.status === "active") items.push({ divider: true }, { label: "Suspend institution", icon: "xCircle", danger: true, onClick: () => onRequestStatus(inst, "suspended") });
  if (inst.status === "suspended") items.push({ divider: true }, { label: "Reactivate institution", icon: "checkCircle", onClick: () => onRequestStatus(inst, "active") });
  return items;
}

export default function InstitutionsTable({ data, loading, error, onRetry, sort, onSort, page, pageSize, onPage, onRequestStatus, onClearFilters, filtered }) {
  const router = useRouter();

  const columns = [
    {
      key: "name",
      header: "Institution Name",
      sortable: true,
      render: (i) => (
        <div className="flex items-center gap-3">
          <InstitutionAvatar abbr={i.abbr} status={i.status} />
          <div className="min-w-0">
            <Link href={`/admin/platform/institutions/${i.id}`} className="block truncate font-semibold text-[#0b1a30] hover:underline">{i.name}</Link>
            <p className="truncate text-[12px] text-[#6b7587]">
              {i.slug ? `${i.slug}.${ADMIN_CONFIG.platformDomain}` : <span className="italic">Slug not set</span>}
            </p>
          </div>
        </div>
      ),
    },
    { key: "code", header: "Code / Slug", render: (i) => <span className="rounded bg-[#f3f5f9] px-2 py-1 font-mono text-[11.5px] font-semibold text-[#6b7587]">{i.code}</span> },
    { key: "status", header: "Status", render: (i) => <StatusBadge status={i.status} /> },
    { key: "students", header: "Students", align: "right", sortable: true, render: (i) => <Num v={i.students} /> },
    { key: "lecturers", header: "Lecturers", align: "right", sortable: true, render: (i) => <Num v={i.lecturers} /> },
    {
      key: "progress",
      header: "Progress",
      width: 200,
      sortable: true,
      render: (i) => (
        <ProgressBar
          value={i.progress}
          tone={PROGRESS_TONE[i.status] || "green"}
          showValue
          label={`${i.name} progress`}
        />
      ),
    },
    {
      key: "actions",
      header: "Actions",
      align: "right",
      render: (i) => (
        <DropdownMenu
          items={institutionMenu(i, onRequestStatus)}
          renderTrigger={({ open, toggle }) => (
            <button onClick={toggle} aria-haspopup="menu" aria-expanded={open} aria-label={`Actions for ${i.name}`} className="rounded-lg p-1.5 text-[#6b7587] hover:bg-[#f3f5f9]">
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
      onRowClick={(i) => router.push(`/admin/platform/institutions/${i.id}`)}
      minWidth={900}
      empty={
        <EmptyState
          icon="building"
          title="No institutions found"
          message={filtered ? "No institution matches your search or filters." : "Create the first institution to get started."}
          action={
            filtered ? (
              <AdminButton size="sm" onClick={onClearFilters}>Clear filters</AdminButton>
            ) : (
              <AdminButton size="sm" variant="primary" icon="plus" href="/admin/platform/onboarding">Create Institution</AdminButton>
            )
          }
        />
      }
      footer={data ? <PrevNext page={page} pageSize={pageSize} total={data.total} noun="institutions" onChange={onPage} /> : null}
    />
  );
}