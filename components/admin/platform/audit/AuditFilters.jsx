"use client";
import TableToolbar, { SearchInput } from "@/components/admin/shared/TableToolbar";
import Select from "@/components/ui/Select";
import { AUDIT_CATEGORIES, AUDIT_RANGES } from "@/lib/services/admin/auditService";
import { formatNumber } from "@/lib/admin/format";

export default function AuditFilters({ q, onQ, action, onAction, range, onRange, stats }) {
  return (
    <TableToolbar className="!px-5 !py-4">
      <SearchInput className="min-w-[200px] flex-1 sm:max-w-[300px]" value={q} onChange={onQ} placeholder="Search actor or institution..." />
      <span className="hidden h-8 w-px bg-[#e5e8ee] sm:block" aria-hidden />
      <Select compact aria-label="Filter by action" options={AUDIT_CATEGORIES} value={action} onChange={(e) => onAction(e.target.value)} />
      <Select compact aria-label="Time range" options={AUDIT_RANGES} value={range} onChange={(e) => onRange(e.target.value)} />
      <div className="ml-auto flex items-center gap-5">
        <div className="text-right" title="Sample platform-wide figure">
          <p className="skul-eyebrow !text-[9.5px]">Daily events</p>
          <p className="skul-heading text-[18px] font-bold leading-tight text-[#0b1a30]">{stats ? formatNumber(stats.dailyEvents) : "—"}</p>
        </div>
        <span className="h-8 w-px bg-[#e5e8ee]" aria-hidden />
        <div className="text-right">
          <p className="skul-eyebrow !text-[9.5px]">Anomalies</p>
          <p className="skul-heading text-[18px] font-bold leading-tight text-[#ef4444]">{stats ? stats.anomalies : "—"}</p>
        </div>
      </div>
    </TableToolbar>
  );
}