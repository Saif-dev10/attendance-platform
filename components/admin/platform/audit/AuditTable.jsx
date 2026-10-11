"use client";
import DataTable from "@/components/admin/shared/DataTable";
import StatusBadge from "@/components/admin/shared/StatusBadge";
import EmptyState from "@/components/admin/shared/EmptyState";
import AdminButton from "@/components/admin/shared/AdminButton";
import Icon from "@/components/admin/shared/Icon";
import { NumberedPagination } from "@/components/ui/Pagination";
import { initials, timeAgo } from "@/lib/admin/format";

const CATEGORY_ICON = {
  auth: { icon: "shield", tile: "bg-[#eff6ff] text-[#2563eb]" },
  onboarding: { icon: "onboarding", tile: "bg-[#f5f3ff] text-[#7c3aed]" },
  import: { icon: "import", tile: "bg-[#fef9c3] text-[#a16207]" },
  config: { icon: "settings", tile: "bg-[#f3f5f9] text-[#4b5565]" },
  user: { icon: "users", tile: "bg-[#eff6ff] text-[#2563eb]" },
  system: { icon: "settings", tile: "bg-[#f3f5f9] text-[#4b5565]" },
};
const RESULT_BADGE = {
  success: { status: "success", label: "Success" },
  warning: { status: "warning", label: "Warning" },
  failure: { status: "error", label: "Failure" },
};

function ActionCell({ e }) {
  // Warnings and failures get an alert glyph so the outcome is visible before reading the badge.
  const t = e.result === "success" ? CATEGORY_ICON[e.category] : e.result === "warning" ? { icon: "alert", tile: "bg-[#fef9c3] text-[#a16207]" } : { icon: "xCircle", tile: "bg-[#fef2f2] text-[#dc2626]" };
  return (
    <div className="flex items-center gap-3">
      <span aria-hidden className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${t.tile}`}><Icon name={t.icon} size={17} /></span>
      <div className="min-w-0">
        <p className="truncate font-semibold text-[#0b1a30]">{e.title}</p>
        <p className="truncate text-[12px] text-[#6b7587]">{e.detail}</p>
      </div>
    </div>
  );
}

function InstitutionCell({ e }) {
  if (e.institution)
    return (
      <div>
        <p className="font-semibold text-[#0b1a30]">{e.institution.name}</p>
        <p className="font-mono text-[10.5px] font-bold tracking-wide text-[#6b7587]">{e.institution.code}</p>
      </div>
    );
  return <span className="text-[11px] font-bold uppercase tracking-wide text-[#9aa3b2]">{e.scope === "system" ? "System" : "Platform Global"}</span>;
}

function ActorCell({ actor }) {
  const system = actor.type === "system";
  return (
    <div className="flex items-center gap-2.5">
      <span aria-hidden className={`flex h-6 w-6 items-center justify-center rounded-full text-[9px] font-bold ${system ? "bg-[#eceff4] text-[#4b5565]" : "bg-[#071a33] text-white"}`}>
        {system ? "SY" : initials(actor.name)}
      </span>
      <span className="text-[13.5px] text-[#0b1a30]">{actor.name}</span>
    </div>
  );
}

export default function AuditTable({ data, loading, error, onRetry, page, pageSize, onPage, onPageSize, filtered, onClear }) {
  const columns = [
    { key: "action", header: "Action & Details", width: "34%", render: (e) => <ActionCell e={e} /> },
    { key: "inst", header: "Affected Institution", render: (e) => <InstitutionCell e={e} /> },
    { key: "actor", header: "Actor", render: (e) => <ActorCell actor={e.actor} /> },
    { key: "result", header: "Result", render: (e) => <StatusBadge status={RESULT_BADGE[e.result].status} label={RESULT_BADGE[e.result].label} /> },
    { key: "at", header: "Timestamp", render: (e) => <time dateTime={new Date(e.at).toISOString()} title={new Date(e.at).toLocaleString()} className="text-[13px] text-[#6b7587]">{timeAgo(e.at)}</time> },
  ];
  return (
    <DataTable
      columns={columns}
      rows={data?.items || []}
      loading={loading}
      error={error}
      onRetry={onRetry}
      minWidth={900}
      empty={
        <EmptyState
          icon="history"
          title="No events found"
          message={filtered ? "No activity matches this search, action or time range." : "No activity has been recorded yet."}
          action={filtered ? <AdminButton size="sm" onClick={onClear}>Clear filters</AdminButton> : null}
        />
      }
      footer={data ? <NumberedPagination page={data.page} pageCount={data.pageCount} pageSize={pageSize} onChange={onPage} onPageSize={onPageSize} /> : null}
    />
  );
}