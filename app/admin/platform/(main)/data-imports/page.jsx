"use client";
import { useEffect, useState } from "react";
import AdminTopbar, { PageBody } from "@/components/admin/shared/AdminTopbar";
import AdminButton from "@/components/admin/shared/AdminButton";
import { useShell } from "@/components/admin/shared/AdminShell";
import useAsync from "@/lib/admin/useAsync";
import { listImports, getImportSummary } from "@/lib/services/admin/importsService";
import ImportSummaryCards from "@/components/admin/platform/imports/ImportSummaryCards";
import ImportFilters from "@/components/admin/platform/imports/ImportFilters";
import ImportsTable from "@/components/admin/platform/imports/ImportsTable";
import TemplatesMenu from "@/components/admin/platform/imports/TemplatesMenu";
import NewImportModal from "@/components/admin/platform/imports/NewImportModal";

const PAGE_SIZE = 8;
const EMPTY = { q: "", type: "all" };

export default function DataImportsPage() {
  const { openMenu } = useShell();
  const [draft, setDraft] = useState(EMPTY);
  const [applied, setApplied] = useState(EMPTY);
  const [page, setPage] = useState(1);
  const [tick, setTick] = useState(0);
  const [newOpen, setNewOpen] = useState(false);

  const list = useAsync(() => listImports({ ...applied, page, pageSize: PAGE_SIZE }), [applied, page, tick]);
  const summary = useAsync(() => getImportSummary(), [tick]);

  // While any listed file is still validating, refresh so its final status appears without a manual reload.
  const processing = !!list.data?.items.some((j) => j.status === "validating");
  useEffect(() => {
    if (!processing) return;
    const t = setInterval(() => setTick((x) => x + 1), 3000);
    return () => clearInterval(t);
  }, [processing]);

  const apply = () => { setApplied(draft); setPage(1); };
  const reset = () => { setDraft(EMPTY); setApplied(EMPTY); setPage(1); };
  const filtered = applied.q.trim() !== "" || applied.type !== "all";

  return (
    <>
      <AdminTopbar
        onMenu={openMenu}
        breadcrumb={[{ label: "Platform Admin", href: "/admin/platform" }, { label: "Data Imports" }]}
        title="Global Import Queue"
        actions={
          <>
            <span className="hidden sm:block"><TemplatesMenu /></span>
            <AdminButton variant="primary" icon="upload" onClick={() => setNewOpen(true)}>New Global Import</AdminButton>
          </>
        }
      />
      <PageBody>
        <ImportSummaryCards summary={summary.data} />
        <div className="mt-6">
          <ImportFilters draft={draft} onDraft={setDraft} onApply={apply} onReset={reset} />
          <ImportsTable
            data={list.data}
            loading={list.loading && !list.data}
            error={list.error}
            onRetry={list.reload}
            page={page}
            pageSize={PAGE_SIZE}
            onPage={setPage}
            filtered={filtered}
            onClear={reset}
            onNew={() => setNewOpen(true)}
          />
        </div>
        {list.data?.source === "mock" && <p className="mt-4 text-center text-[11.5px] text-[#8a93a3]">Sample data: summary totals are illustrative; new imports settle a few seconds after upload (simulated).</p>}
      </PageBody>

      {newOpen && (
        <NewImportModal
          onClose={() => setNewOpen(false)}
          onCreated={() => { reset(); setTick((x) => x + 1); }}
        />
      )}
    </>
  );
}