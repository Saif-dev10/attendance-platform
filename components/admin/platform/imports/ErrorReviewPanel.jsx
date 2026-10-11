"use client";
import { useState } from "react";
import DataTable from "@/components/admin/shared/DataTable";
import AdminButton from "@/components/admin/shared/AdminButton";
import { PrevNext } from "@/components/ui/Pagination";
import useAsync from "@/lib/admin/useAsync";
import { buildCsv, downloadText } from "@/lib/admin/csv";
import { getImportErrors } from "@/lib/services/admin/importsService";

const PER_PAGE = 10;

export default function ErrorReviewPanel({ job }) {
  const { data, loading, error, reload } = useAsync(() => getImportErrors(job.id, { pageSize: "all" }), [job.id, job.failed, job.status]);
  const [field, setField] = useState("all");
  const [page, setPage] = useState(1);

  const all = data?.items || [];
  const counts = all.reduce((m, e) => ({ ...m, [e.field]: (m[e.field] || 0) + 1 }), {});
  const filtered = field === "all" ? all : all.filter((e) => e.field === field);
  const rows = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  const download = () =>
    downloadText(
      `${job.fileName.replace(/\.[^.]+$/, "")}-errors.csv`,
      buildCsv(["row", "field", "value", "error"], filtered.map((e) => [e.row, e.field, e.value, e.message]))
    );

  const columns = [
    { key: "row", header: "Row", width: 80, render: (e) => <span className="font-mono text-[12.5px] text-[#4b5565]">{e.row}</span> },
    { key: "field", header: "Field", width: 170, render: (e) => <span className="rounded bg-[#f3f5f9] px-2 py-1 font-mono text-[11.5px] font-semibold text-[#4b5565]">{e.field}</span> },
    { key: "value", header: "Value", render: (e) => (e.value === "" ? <em className="text-[#8a93a3]">(empty)</em> : <span className="font-mono text-[12.5px]">{e.value}</span>) },
    { key: "message", header: "Problem", render: (e) => <span className="text-[13px] text-[#991b1b]">{e.message}</span> },
  ];

  return (
    <section id="errors" className="scroll-mt-24">
      <div className="mb-3 flex flex-wrap items-end justify-between gap-3">
        <div>
          <h2 className="skul-heading text-[17px] font-semibold text-[#0b1a30]">Error review</h2>
          <p className="text-[13px] text-[#6b7587]">{job.failed.toLocaleString()} record(s) failed validation. Fix them in the source file and re-upload.</p>
        </div>
        <AdminButton icon="download" size="sm" onClick={download} disabled={!filtered.length}>Download error report</AdminButton>
      </div>

      {all.length > 0 && (
        <div className="mb-3 flex flex-wrap gap-2" role="group" aria-label="Filter errors by field">
          {[["all", all.length], ...Object.entries(counts)].map(([f, n]) => (
            <button key={f} aria-pressed={field === f} onClick={() => {
              setField(f);
              setPage(1);
            }} className={`rounded-full border px-3 py-1 text-[12px] font-semibold ${field === f ? "border-[#071a33] bg-[#071a33] text-white" : "border-[#e5e8ee] bg-white text-[#4b5565] hover:bg-[#f3f5f9]"}`}>
              {f === "all" ? "All fields" : f} · {n}
            </button>
          ))}
        </div>
      )}

      <DataTable
        columns={columns}
        rows={rows}
        loading={loading && !data}
        error={error}
        onRetry={reload}
        minWidth={620}
        footer={<PrevNext page={page} pageSize={PER_PAGE} total={filtered.length} noun="errors" onChange={setPage} />}
      />
      {data?.truncated && (
        <p className="mt-2 text-[11.5px] text-[#8a93a3]">Showing the first {all.length} of {data.errorCount.toLocaleString()} errors. Sample mode stores a capped list.</p>
      )}
    </section>
  );
}