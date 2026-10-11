"use client";
import { useEffect, useState } from "react";
import AdminTopbar, { PageBody } from "@/components/admin/shared/AdminTopbar";
import AdminButton from "@/components/admin/shared/AdminButton";
import { useShell } from "@/components/admin/shared/AdminShell";
import { useToast } from "@/components/ui/Toast";
import useAsync from "@/lib/admin/useAsync";
import { downloadCsv } from "@/lib/admin/format";
import { listAuditEvents, exportAuditEvents } from "@/lib/services/admin/auditService";
import AuditFilters from "@/components/admin/platform/audit/AuditFilters";
import AuditTable from "@/components/admin/platform/audit/AuditTable";

export default function AuditLogsPage() {
  const { openMenu } = useShell();
  const toast = useToast();
  const [q, setQ] = useState("");
  const [debouncedQ, setDebouncedQ] = useState("");
  const [action, setAction] = useState("all");
  const [range, setRange] = useState("24h");
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(20);
  const [exporting, setExporting] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => { setDebouncedQ(q); setPage(1); }, 250);
    return () => clearTimeout(t);
  }, [q]);

  const { data, loading, error, reload } = useAsync(
    () => listAuditEvents({ q: debouncedQ, action, range, page, pageSize }),
    [debouncedQ, action, range, page, pageSize]
  );

  const filtered = !!debouncedQ || action !== "all" || range !== "24h";
  const clear = () => { setQ(""); setDebouncedQ(""); setAction("all"); setRange("24h"); setPage(1); };

  const exportCsv = async () => {
    setExporting(true);
    try {
      const { rows } = await exportAuditEvents({ q: debouncedQ, action, range });
      if (!rows.length) return toast.push({ tone: "info", title: "Nothing to export", message: "No events match the current filters." });
      downloadCsv(`skul-activity-log-${new Date().toISOString().slice(0, 10)}.csv`, rows);
      toast.push({ title: "Export ready", message: `${rows.length} events exported with the current filters.` });
    } catch (err) {
      toast.push({ tone: "error", title: "Export failed", message: err.message });
    } finally {
      setExporting(false);
    }
  };

  return (
    <>
      <AdminTopbar
        onMenu={openMenu}
        breadcrumb={[{ label: "Platform Admin", href: "/admin/platform" }, { label: "Audit Logs" }]}
        title="Platform Activity Log"
        actions={<AdminButton icon="upload" loading={exporting} onClick={exportCsv}>Export CSV</AdminButton>}
      />
      <PageBody>
        <AuditFilters
          q={q} onQ={setQ}
          action={action} onAction={(v) => { setAction(v); setPage(1); }}
          range={range} onRange={(v) => { setRange(v); setPage(1); }}
          stats={data?.stats}
        />
        <div className={loading && data ? "opacity-60 transition-opacity" : ""}>
          <AuditTable
            data={data}
            loading={loading && !data}
            error={error}
            onRetry={reload}
            page={page}
            pageSize={pageSize}
            onPage={setPage}
            onPageSize={(s) => { setPageSize(s); setPage(1); }}
            filtered={filtered}
            onClear={clear}
          />
        </div>
        {data?.source === "mock" && <p className="mt-4 text-center text-[11.5px] text-[#8a93a3]">Sample data: “Daily events” is an illustrative platform-wide figure; the list shows locally generated events plus your actions in this session.</p>}
      </PageBody>
    </>
  );
}