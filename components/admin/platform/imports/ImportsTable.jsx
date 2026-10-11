"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import DataTable from "@/components/admin/shared/DataTable";
import StatusBadge from "@/components/admin/shared/StatusBadge";
import EmptyState from "@/components/admin/shared/EmptyState";
import AdminButton from "@/components/admin/shared/AdminButton";
import { PrevNext } from "@/components/ui/Pagination";
import { formatNumber } from "@/lib/admin/format";
import { formatUploaded } from "@/lib/admin/dates";
import { importTypeLabel } from "@/lib/mock/admin/imports";

export function FileTile({ name, failed }) {
  const ext = (name.split(".").pop() || "").toUpperCase().slice(0, 4);
  return (
    <span
      aria-hidden
      className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-[9px] font-extrabold ${
        failed ? "bg-[#fef2f2] text-[#dc2626]" : "bg-[#f3f5f9] text-[#6b7587]"
      }`}
    >
      {ext}
    </span>
  );
}

function Records({ job }) {
  return (
    <div className="text-right">
      <p className="text-[14px] font-bold text-[#0b1a30]">{formatNumber(job.total)} Total</p>
      {job.status === "validating" && <p className="text-[11.5px] text-[#6b7587]">Processing...</p>}
      {job.status === "failed" && <p className="text-[11.5px] font-bold text-[#dc2626]">{formatNumber(job.failed)} Errors</p>}
      {job.status === "completed_with_errors" && <p className="text-[11.5px] font-bold text-[#b45309]">{formatNumber(job.success)} S / {formatNumber(job.failed)} F</p>}
      {job.status === "completed" && <p className="text-[11.5px] text-[#047857]">All imported</p>}
    </div>
  );
}

export default function ImportsTable({ data, loading, error, onRetry, page, pageSize, onPage, filtered, onClear, onNew }) {
  const router = useRouter();
  const columns = [
    {
      key: "institution",
      header: "Institution",
      render: (j) => (
        <div>
          <p className="font-semibold text-[#0b1a30]">{j.institution.name}</p>
          <p className="text-[11.5px] text-[#6b7587]">{j.institution.code}</p>
        </div>
      ),
    },
    {
      key: "file",
      header: "File Details",
      render: (j) => (
        <div className="flex items-center gap-3">
          <FileTile name={j.fileName} failed={j.status === "failed"} />
          <div className="min-w-0">
            <p className="truncate text-[13.5px] font-medium text-[#0b1a30]">{j.fileName}</p>
            <p className="text-[10.5px] font-bold uppercase tracking-wide text-[#6b7587]">{importTypeLabel(j.type)}</p>
          </div>
        </div>
      ),
    },
    { key: "status", header: "Status", render: (j) => <StatusBadge status={j.status} /> },
    {
      key: "uploaded",
      header: "Uploaded",
      render: (j) => (
        <div>
          <p className="text-[13px] text-[#0b1a30]">{formatUploaded(j.uploadedAt)}</p>
          <p className="text-[11.5px] text-[#6b7587]">by {j.uploadedBy}</p>
        </div>
      ),
    },
    { key: "records", header: "Records (S/F)", align: "right", render: (j) => <Records job={j} /> },
    {
      key: "action",
      header: "Action",
      align: "right",
      render: (j) =>
        j.status === "failed" ? (
          <Link href={`/admin/platform/data-imports/${j.id}#errors`} onClick={(e) => e.stopPropagation()} className="inline-flex rounded-lg bg-[#fef2f2] px-3 py-1.5 text-[12.5px] font-bold text-[#b91c1c] hover:bg-[#fee2e2]">
            Review Errors
          </Link>
        ) : (
          <Link href={`/admin/platform/data-imports/${j.id}`} onClick={(e) => e.stopPropagation()} className="text-[12.5px] font-bold text-[#0b1a30] hover:underline">
            Details
          </Link>
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
      onRowClick={(j) => router.push(`/admin/platform/data-imports/${j.id}`)}
      rowClassName={(j) => (j.status === "validating" ? "bg-[#fffdf0]" : "")}
      minWidth={900}
      empty={
        <EmptyState
          icon="import"
          title="No imports found"
          message={filtered ? "No import matches your search or filters." : "Start by uploading a global import file."}
          action={filtered ? <AdminButton size="sm" onClick={onClear}>Reset filters</AdminButton> : <AdminButton size="sm" variant="primary" icon="upload" onClick={onNew}>New Global Import</AdminButton>}
        />
      }
      footer={data ? <PrevNext page={page} pageSize={pageSize} total={data.total} noun="imports" onChange={onPage} /> : null}
    />
  );
}